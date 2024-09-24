const { Pool } = require('pg');

// Use environment variable for the database connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // Necessary for connecting to hosted PostgreSQL on Render
  }
});

// Function to query the database
const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

module.exports = {
  query,
};
