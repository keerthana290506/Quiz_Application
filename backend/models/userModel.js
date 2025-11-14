const db = require("../db");

// Find user by email (login/auth)
exports.findByEmail = (email) =>
  db.query("SELECT * FROM users WHERE email = $1", [email]);

// Create user (used in register + create-admin)
exports.createUser = (username, email, hashedPassword, role = "student") =>
  db.query(
    "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)",
    [username, email, hashedPassword, role]
  );

// Admin → Get all users
exports.getAllUsers = () =>
  db.query(
    "SELECT id, username, email, role, status, created_at FROM users ORDER BY id DESC"
  );

// Admin → Ban / Unban user
exports.updateStatus = (id, status) =>
  db.query("UPDATE users SET status = $1 WHERE id = $2", [status, id]);
