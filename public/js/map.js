import dependentRegions from './utils/dependentRegions.js';
let geoJsonLayer;
let pendingMessages = [];
const greenRegions = new Set(); // Set of all of the regions with values in myRegions
const regionKey = (name, country) => `${name}, ${country}`;

function initializeMap() {
    // Create a Leaflet map centered on Scotland (adjust coordinates if needed)
    return L.map('map', {
        center: [53, 15],  
        zoom: 4,                      // Zoom level
        zoomControl: false,           // Disable zoom controls
        attributionControl: false     // Disable attribution control
    });
}

function addTileLayer(map) {
    // Set the entire map background to white by adding a tile layer with no tiles
    L.tileLayer('', {
        minZoom: 4, //FIX THIS LATER
        maxZoom: 13
    }).addTo(map);
}

function setupMessageListener() {
    window.addEventListener('message', event => {
        if (event.data.tableData) {
            // If geoJsonLayer is ready, process the message
            if (geoJsonLayer) {
                highlightMapRegions(event.data.tableData);
            } else {
                // Otherwise, queue the message
                pendingMessages.push(event.data.tableData);
            }
        }
    });
}

function fetchGeoJSON(map, geoJsonUrls) {
    // Fetch both GeoJSON files
    Promise.all(geoJsonUrls.map(url => fetch(url).then(res => res.json())))
    .then(dataSets => {
        // Merge both datasets into one array of features
        const allRegions = dataSets.reduce((features, data) => [...features, ...data.features], []);

        // Function to add tooltips to each region
        function onEachFeature(feature, layer) {
            if (feature.properties && feature.properties.name) {
                layer.bindTooltip(feature.properties.name, { sticky: true }); // Show name on hover

                // Attach the click listener
                setupLayerClick(layer, feature.properties.name, feature.properties.country, feature.properties["ISO3166-2"]);
            }
        }
    
        // Add all regions to the map
        geoJsonLayer = L.geoJSON({ type: "FeatureCollection", features: allRegions }, {
            style: {
                color: "black",   // Uniform outline color
                weight: 1,        // Uniform border weight
                fillColor: 'rgb(209, 219, 221)', // Uniform fill color rgb(209, 219, 221)
                fillOpacity: 1    // Fully opaque
            },
            onEachFeature: onEachFeature // Attach tooltips
        }).addTo(map);

        // Process any pending messages
        pendingMessages.forEach(tableData => highlightMapRegions(tableData));
        pendingMessages = []; // Clear the queue
    })
    .catch(error => console.error('Error loading GeoJSON:', error));

    // Load preprocessed country boundaries
    fetch(`../geojson/countryOutlines.geojson`)
    .then(res => res.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: 'black',   // Country border color
                weight: 2,        // Country border thickness
                fillOpacity: 0    // Transparent fill
            },
            interactive: false // Not sure if needed since using lines now
        }).addTo(map);
    })
    .catch(error => console.error('Error loading CountriesGeoJSON:', error));
}

function highlightMapRegions(tableData) {
    geoJsonLayer.eachLayer(layer => {
        const regionName = layer.feature.properties.name;
        const country = layer.feature.properties.country;
        const isoCode = layer.feature.properties["ISO3166-2"];
        const regionKeyValue = regionKey(regionName, country); // Combine name and country

        // const regionInTable = tableData.find(item => item.RealRegion === regionName && item.Country === country);
        const regionInTable = tableData.find(item => {
            if (item.RealRegion) {
                // Ensure RealRegion is an array
                const regions = Array.isArray(item.RealRegion)
                    ? item.RealRegion // Already parsed
                    : JSON.parse(item.RealRegion); // Parse if it's a string
                return regions.includes(regionName); // Replace targetRegion with the value you're searching for
            }
        });
        // const regionInTable = tableData.find(item => item.ISO3166_2 === isoCode); // if using ISO codes, but makes POSTing outside of map annoying (must add in all ISO-codes)
        

        if (regionInTable && (regionInTable.MyName || regionInTable.FirstHad)) {
            layer.setStyle({ color: 'black', fillColor: 'green', fillOpacity: 1 });
            greenRegions.add(regionKeyValue);
            // greenRegions.add(isoCode);
        } else {
            layer.setStyle({ color: 'black', fillColor: 'rgb(209, 219, 221)', fillOpacity: 1 });
        }
    });
    colorRelatedRegions(greenRegions);
}

function colorRelatedRegions(greenRegions) {
    for (const [group, data] of Object.entries(dependentRegions)) {
        const { regions, country, isoCodes } = data;
        // Check if any region in the group is green
        const groupHasGreen = regions.some(region => greenRegions.has(regionKey(region, country)));
        // const groupHasGreen = isoCodes.some(isoCode => greenRegions.has(isoCode));

        if (groupHasGreen) {
            geoJsonLayer.eachLayer(layer => {
                const regionName = layer.feature.properties.name;
                const regionCountry = layer.feature.properties.country;
                const isoCode = layer.feature.properties["ISO3166-2"];

                // Ensure the region matches both the group and the country
                if (
                    regions.includes(regionName) && 
                    regionCountry === country &&
                    !greenRegions.has(regionKey(regionName, regionCountry))
                    // !greenRegions.has(isoCode)
                ) {
                    layer.setStyle({ color: 'black', fillColor: 'lightgreen', fillOpacity: 1 });
                }
            });
        }
    }
}

function setupLayerClick(layer, regionName, country, isoCode) {
    const regionKeyValue = regionKey(regionName, country);

    // Add a click event listener for regions
    layer.on('click', async () => {
        // If the region is not already green (and is either white or light green), turn it green
        if (!greenRegions.has(regionKeyValue)) {
        // if (!greenRegions.has(isoCode)) {
            greenRegions.add(regionKeyValue);
            // greenRegions.add(isoCode);
            layer.setStyle({ color: 'black', fillColor: 'green', fillOpacity: 1 });
            colorRelatedRegions(greenRegions);


            let today = new Date();
            // Create JSON object
            const requestData = {
                myName: regionName,
                regionName,
                firstHad: today.toISOString().slice(0, 10),
                isoCode
            };
            try {
                // Make the POST request
                const response = await fetch("http://130.162.226.244:8080/regions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData), // Convert to JSON string
                });
                if (response.ok) {
                    // After a successful POST request, send a message to re-render the table in index.html
                    window.parent.postMessage({ type: 'RENDER_TABLE' }, '*');
                }
            } catch (err) {
                console.error("Request failed:", err);
                // alert("An error occurred while sending the request.");
            }
        }
    });
}

// Main function to initialize everything
function main() {
    const map = initializeMap();
    addTileLayer(map);
    setupMessageListener();

    // Fetch the GeoJSON URLs dynamically
    fetch(`../geojson-files.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch GeoJSON files');
            }
            return response.json();
        })
        .then(data => {
            fetchGeoJSON(map, data);  
        })
        .catch(error => console.error('Error fetching GeoJSON URLs:', error));
    
}

main();
   