// backend/models/authModels.js
const db = require("../db.js");

const createUser = (username, email, hashedPassword, role, callback) => {
  const sql = "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)";
  db.pool.query(sql, [username, email, hashedPassword, role], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = $1";
  db.pool.query(sql, [email], callback);
};

module.exports = { createUser, findUserByEmail };
