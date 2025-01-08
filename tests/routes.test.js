const request = require('supertest');
const app = require('../main');
const { db } = require('../api/routeFunctions'); // Adjust the path to your MySQL connection
const path = require('path');
require('dotenv').config();

const secretToken = process.env.SECRET_TOKEN;

describe('API Routes', () => {
    test('should return data from /api/data when provided with the correct token', async () => {
        const response = await request(app)
            .get('/api/data')
            .set('Authorization', `Bearer ${secretToken}`); // Add the token here
        
        expect(response.status).toBe(200); // Check the status code
        expect(Array.isArray(response.body)).toBe(true); // Check if the response is an array
    });

    test('should return 403 for /api/data when no token is provided', async () => {
        const response = await request(app).get('/api/data');
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('error', 'Access forbidden');
    });

    test('get region by id', async () => {
        const response = await request(app).get('/regions/125');

        expect(response.status).toBe(200);
        expect(response.body[0]).toEqual({
            FullName: "Edinburgh",
            Country: "Scotland",
            MyName: "City of Edinburgh",
            FirstHad: "2024-06-19T22:00:00.000Z",
        });
    });

    test('fails to get region by id', async () => {
        const response = await request(app).get('/regions/3000');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test('get region by name', async () => {
        const response = await request(app).get('/regions?name=Orkney');

        expect(response.status).toBe(200);
        expect(response.body[0]).toEqual({
            FullName: "Orkney",
            Country: "Scotland",
            MyName: "Highlands and Islands",
            FirstHad: "2024-06-21T22:00:00.000Z",
        });
    });

    test('fails to get region by name', async () => {
        const response = await request(app).get('/regions?name=London');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    afterAll(() => {
        db.end((err) => {
            if (err) {
                console.error('Error closing the database connection:', err);
            } else {
                console.log('Database connection closed.');
            }
        });
    });
});