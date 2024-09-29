// Import dependencies
const express = require('express');
const axios = require('axios');
require('dotenv').config();

// Initialize the app
const app = express();

// Serve static files from 'public' directory
app.use(express.static('public'));

// Set the port
const PORT = process.env.PORT || 3000;

// Route for fetching weather data using city name
app.get('/weather', async (req, res) => {
    const city = req.query.city; // Get the city from the query parameter
    const apiKey = '08ae828039f13444ab9dbccd24fd750b'; // Your OpenWeatherMap API key

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`);
        res.json(response.data); // Send the weather data back as JSON
    } catch (error) {
        console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
