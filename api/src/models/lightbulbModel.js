const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Create a new lightbulb
exports.createLightbulb = async (name) => {
  const result = await pool.query('INSERT INTO lightbulbs (name) VALUES ($1) RETURNING *', [name]);
  return result.rows[0];
};

// Get a lightbulb by name
exports.getLightbulbByName = async (name) => {
  const result = await pool.query('SELECT * FROM lightbulbs WHERE name = $1', [name]);
  if (result.rows.length === 0) {
    throw new Error(`Lightbulb '${name}' not found.`);
  }
  return result.rows[0];
};

// Update lightbulb status
exports.updateLightbulbStatus = async (name, status) => {
  const query = 'UPDATE lightbulbs SET status = $1 WHERE name = $2';
  const values = [status, name];

  await pool.query(query, values);
};

// Delete a lightbulb
exports.deleteLightbulb = async (name) => {
  const result = await pool.query('DELETE FROM lightbulbs WHERE name = $1 RETURNING *', [name]);
  if (result.rows.length === 0) {
    throw new Error(`Lightbulb '${name}' not found.`);
  }
  return result.rows[0];
};

// Delete all lightbulbs
exports.deleteAllLightbulbs = async () => {
  await pool.query('DELETE FROM lightbulbs');
};

// Function to fetch all lightbulbs from the database
exports.getAllLightbulbs = async () => {
  try {
    const query = 'SELECT * FROM lightbulbs';  // Make sure the table name is correct
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error executing query in getAllLightbulbsFromDB:', error);  // Log database query errors
    throw error;
  }
};