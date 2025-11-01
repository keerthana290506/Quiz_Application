const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "quiz_app",
  port: process.env.DB_PORT || 5432,
});

// ✅ Auto-create users table if it doesn't exist
pool.query(`
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
`)
  .then(() => {
    console.log("✅ Users table ready");
  })
  .catch((err) => {
    console.error("❌ Failed to create users table", err);
  });

module.exports = pool;
