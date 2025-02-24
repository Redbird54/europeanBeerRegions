const express = require('express');
const path = require('path');
const router = require("./api/routes");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",  // Local testing
  "https://your-frontend.vercel.app"  // Replace when frontend is deployed
];

// Serve static files (HTML, CSS, JS)
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

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
