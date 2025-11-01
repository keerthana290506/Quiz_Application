const db = require("../db.js");

const createUser = (username, email, hashedPassword, callback) => {
  const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
  db.query(query, [username, email, hashedPassword], callback);
};

const findUserByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = $1";
  db.query(query, [email], callback);
};

module.exports = { createUser, findUserByEmail };
