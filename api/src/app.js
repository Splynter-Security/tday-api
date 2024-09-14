const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Import CORS middleware

// Load environment variables from .env file
dotenv.config();

const lightbulbRoutes = require('./routes/lightbulbRoutes');
const app = express();

// Middleware to parse JSON bodies
app.use(cors());  // This allows all origins to access the API

app.use(express.json());

app.use('/lightbulbs', lightbulbRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = process.env.API_PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at ${process.env.API_SCHEMA}://${process.env.API_DOMAIN}:${port}`);
});
