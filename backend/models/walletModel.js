const db = require("../db");

// Get wallet balance
exports.getWallet = (user_id) =>
  db.query("SELECT balance FROM wallets WHERE user_id = $1", [user_id]);

// Create wallet when user first logs in (if missing)
exports.createWallet = (user_id) =>
  db.query("INSERT INTO wallets (user_id, balance) VALUES ($1, 0)", [user_id]);

// Update wallet balance (credit or debit)
exports.updateBalance = (user_id, amount) =>
  db.query("UPDATE wallets SET balance = balance + $1 WHERE user_id = $2", [
    amount,
    user_id,
  ]);
