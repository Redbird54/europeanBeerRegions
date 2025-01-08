const express = require('express');
const path = require('path');
const router = require("./api/routes");

const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/geojson_data', express.static(path.join(__dirname, 'geojson_data')));

// Enable JSON parsing for POST requests
app.use(express.json());

app.use(router);

module.exports = app; // Export the app for testing

// Start the server only when running the app directly and not tests
if (require.main === module) {
    const PORT = 8080;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
