const { Request, Response } = require("express");
const path = require('path');
const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

// MySQL connection setup
const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
        connection.release();
    } 
});

function giveToken(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
}

// Middleware to check the token
const tokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];  // Get the Authorization header
    const secretToken = process.env.SECRET_TOKEN;      // The token stored securely as an env variable

    if (!authHeader || authHeader !== `Bearer ${secretToken}`) {
        return res.status(403).json({ error: 'Access forbidden: Invalid token' });
    }

    // If token is valid, continue to the next middleware or route handler
    next();
};

function getGeoJsons(req, res) {
    const geoJsonDir = path.join(__dirname, '..', '..', 'public', 'geojson', 'regions');
    
    fs.readdir(geoJsonDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ error: 'Failed to read directory' });
        }

        // Filter files to include only .geojson files
        const geoJsonUrls = files
            .filter(file => file.endsWith('.geojson'))
            .map(file => `/geojson/regions/${file}`);

        res.json(geoJsonUrls); // Send the array of URLs as JSON
    });
}



function getData(req, res) {
    const sqlQuery = "SELECT EuropeanRegions.Name AS FullName, EuropeanRegions.Country, myRegions.Name AS MyName, DATE_FORMAT(myRegions.FirstHad, '%Y-%m-%d') AS FirstHad, myRegions.idRegion, JSON_EXTRACT(myRegions.RealRegion, '$') AS RealRegion, JSON_EXTRACT(myRegions.ISO3166_2, '$') AS ISO3166_2 FROM myRegions RIGHT JOIN EuropeanRegions ON myRegions.RealRegionID=EuropeanRegions.idEuropeanRegion ORDER BY EuropeanRegions.Country, EuropeanRegions.Name;";
    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Database query error' });
            return;
        }
        res.json(results);
    });
}

// const repo = new RestaurantsRepo(path.join(__dirname, "../data/data.txt"));

function getRegionById(req, res) {
    const id = req.params.id; 
    const sqlQuery = "SELECT EuropeanRegions.Name AS FullName, EuropeanRegions.Country, myRegions.Name AS MyName, myRegions.FirstHad FROM myRegions RIGHT JOIN EuropeanRegions ON myRegions.RealRegionID=EuropeanRegions.idEuropeanRegion WHERE EuropeanRegions.idEuropeanRegion = " + id + ";";
    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Database query error' });
            return;
        }
        res.json(results);
    });
}

function getRegionByName(req, res) {
    const name = req.query.name; //query from URL
    const sqlQuery = "SELECT EuropeanRegions.Name AS FullName, EuropeanRegions.Country, myRegions.Name AS MyName, myRegions.FirstHad FROM myRegions RIGHT JOIN EuropeanRegions ON myRegions.RealRegionID=EuropeanRegions.idEuropeanRegion WHERE EuropeanRegions.Name = '" + name + "';";
    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Database query error' });
            return;
        }
        res.json(results);
    });
}

function addRegion(req, res) { 
    const sqlGetQuery = "SELECT idEuropeanRegion, Country FROM EuropeanRegions WHERE Name = ?;";
    const sqlGetAlternativeQuery = "SELECT idEuropeanRegion, Country FROM EuropeanRegions WHERE JSON_CONTAINS(OtherRegion, JSON_QUOTE(?));";
    // First query: get information about the region
    pool.query(sqlGetQuery, [req.body.regionName], (err, getResults) => {
        if (err) {
            console.error("Error executing SELECT query:", err);
            res.status(500).json({ error: "Database query error" });
            return;
        }
        if (getResults.length > 0) {
            // Region found in the primary query
            processRegion(getResults[0], req, res);
        }

        else {
            pool.query(sqlGetAlternativeQuery, [req.body.regionName], (err, altResults) => {
                if (err) {
                    console.error("Error executing SELECT query for alternative name:", err);
                    res.status(500).json({ error: "Database query error" });
                    return;
                }
                if (altResults.length > 0) {
                    // Region found in the alternative query
                    processRegion(altResults[0], req, res);
                } else {
                    // Region not found in either query
                    console.error("Region not found");
                    res.status(404).json({ error: "Region not found" });
                }
            });
        }
    });
}

// Helper function to process the region and insert into the database
function processRegion(regionData, req, res) {
    // Extract the required fields from the first query result
    const { idEuropeanRegion, Country } = regionData;

    // Second query: insert data into `myRegions` table
    const sqlInsertQuery = `
        INSERT INTO myRegions (Name, Country, FirstHad, RealRegion, RealRegionID, ISO3166_2)
        VALUES (?, ?, ?, ?, ?, ?);`;
        const isoCodeArray = req.body.isoCode instanceof Array ? req.body.isoCode : [req.body.isoCode];
        const regionArray = req.body.regionName instanceof Array ? req.body.regionName : [req.body.regionName];
    const insertValues = [
        req.body.myName,                // Name
        Country,                        // Country from first query
        req.body.firstHad || null,      // FirstHad (or NULL if not provided)
        JSON.stringify(regionArray),    // RealRegion
        idEuropeanRegion,               // RealRegionID from first query
        JSON.stringify(isoCodeArray)    // isoCode of the region to match with map  
    ];

    pool.query(sqlInsertQuery, insertValues, (err, insertResults) => {
        if (err) {
            console.error("Error executing INSERT query:", err);
            res.status(500).json({ error: "Database query error" });
            return;
        }

        // Respond with the success message or inserted data
        res.json({
            message: "Region added successfully",
            insertId: insertResults.insertId,
        });
    });
}

function deleteMyRegionById(req, res) {
    const id = req.params.id;
    const sqlDeleteQuery = "DELETE FROM myRegions WHERE idRegion = ?";

    pool.query(sqlDeleteQuery, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Database query error' });
            return;
        }

        res.json({ success: true, message: `Row with ID ${id} deleted.` });
    });
}

function editDataById(req, res) {
    const id = req.params.id;
    const field = Object.keys(req.body)[0];
    const value = req.body[field];

    const sqlUpdateQuery = "UPDATE myRegions SET ?? = ? WHERE idRegion = ?";

    pool.query(sqlUpdateQuery, [field, value, id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Database query error' });
            return;
        }

        res.json({ success: true, message: `Row with ID ${id} updated.` });
    });
}

function mergeAndDelete(req, res) {
    const { matchingRowId, realRegionArray, currentRowId, date } = req.body;

    try {
        // Iterate over each region in the realRegionArray and update the RealRegion column
        for (const region of realRegionArray) {
            const updateQuery = `
                UPDATE myRegions
                SET RealRegion = JSON_ARRAY_APPEND(
                    IFNULL(RealRegion, JSON_ARRAY()), '$', ?
                ),
                FirstHad = ?
                WHERE idRegion = ?
            `;

            pool.query(updateQuery, [region, date, matchingRowId], (err, updateResult) => {
                if (err) {
                    console.error('Error updating RealRegion:', err);
                    return res.status(500).json({ error: 'Failed to update RealRegion' });
                }
                // console.log('RealRegion updated successfully:', updateResult);
            });
        }

        // Now delete the current row after updating RealRegion
        const deleteQuery = `DELETE FROM myRegions WHERE idRegion = ?`;
        pool.query(deleteQuery, [currentRowId], (err, deleteResult) => {
            if (err) {
                console.error('Error deleting row:', err);
                return res.status(500).json({ error: 'Failed to delete row' });
            }
            // console.log('Row deleted successfully:', deleteResult);
            res.json({ message: 'Rows merged and deleted successfully' });
        });

    } catch (error) {
        console.error('Error merging and deleting rows:', error);
        res.status(500).json({ error: 'Failed to merge and delete rows' });
    }
}




module.exports = { giveToken, getGeoJsons, getData, getRegionById, addRegion, getRegionByName, deleteMyRegionById, editDataById, mergeAndDelete, tokenMiddleware, pool };