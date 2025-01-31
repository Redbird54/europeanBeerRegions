const { Router } = require('express');
const {
    giveToken,
    tokenMiddleware,
    getData,
    getRegionById,
    getRegionByName,
    addRegion,
    deleteMyRegionById,
    editDataById,
    mergeAndDelete,
    getGeoJsons
} = require("./routeFunctions");

const r = Router();

r.get('/', giveToken);
r.get('/api/data', tokenMiddleware, getData);
r.get('/geojson-files', getGeoJsons);
r.get('/regions/:id', getRegionById); //Currently do not have access to id, but we could put new query in?
r.get('/regions', getRegionByName); //e.g. ?name=London
r.post('/regions', addRegion);
r.delete('/regions/:id', deleteMyRegionById); //Deletes a region from the table given the myRegion id
r.patch('/regions/merge-and-delete', mergeAndDelete); //Appends old value of now duplicate rows to RealRegion JSON_ARRAY of original row. Deletes current row.
r.patch('/regions/:id(\\d+)', editDataById); //\\d+ only allows for numeric values

module.exports = r;
