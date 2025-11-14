const db = require("../db");

// Create contest
exports.createContest = (title, entry_fee, prize_pool, date) =>
  db.query(
    "INSERT INTO contests (title, entry_fee, prize_pool, date) VALUES ($1,$2,$3,$4)",
    [title, entry_fee, prize_pool, date]
  );

// Get all contests
exports.getContests = () =>
  db.query("SELECT * FROM contests ORDER BY date DESC");
