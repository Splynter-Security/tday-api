const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Create a new lightbulb (owner can be null)
exports.createLightbulb = async (name, owner) => {
  const result = await pool.query(
    'INSERT INTO lightbulbs (name, owner) VALUES ($1, $2) RETURNING *',
    [name, owner || null]  // Use null if owner is not provided
  );
  return result.rows[0];
};

// Get a lightbulb by ID
exports.getLightbulbById = async (id) => {
  const result = await pool.query('SELECT * FROM lightbulbs WHERE id = $1', [id]);
  
  // Return null if no rows are found (lightbulb doesn't exist)
  if (result.rows.length === 0) {
    return null;
  }
  
  return result.rows[0];
};

// Update lightbulb status by ID (Check owner)
exports.updateLightbulbById = async (id, status, owner) => {
  const query = `
    UPDATE lightbulbs 
    SET status = $1 
    WHERE id = $2 
    AND (owner = $3 OR owner IS NULL) 
    RETURNING *`;
  const values = [status, id, owner || null];  // Allow update if the owner is null (no owner)

  const result = await pool.query(query, values);
  
  // If no rows were affected, return null to indicate the lightbulb wasn't found or the user isn't authorized
  if (result.rows.length === 0) {
    return null;
  }
  
  return result.rows[0];
};

// Delete a lightbulb by ID (Check owner)
exports.deleteLightbulbById = async (id, owner) => {
  const result = await pool.query(
    'DELETE FROM lightbulbs WHERE id = $1 AND (owner = $2 OR owner IS NULL) RETURNING *', 
    [id, owner || null]
  );
  
  // If no rows were affected, return null to indicate the lightbulb wasn't found or the user isn't authorized
  if (result.rows.length === 0) {
    return null;
  }
  
  return result.rows[0];
};

// Get all lightbulbs
exports.getAllLightbulbs = async () => {
  const result = await pool.query('SELECT * FROM lightbulbs');
  return result.rows;
};

// Delete all lightbulbs (no ownership check)
exports.deleteAllLightbulbs = async () => {
  await pool.query('DELETE FROM lightbulbs');
};
