const db = require("../db");

// Create exam
exports.createExam = (title, date, duration_minutes) =>
  db.query(
    "INSERT INTO exams (title, date, duration_minutes) VALUES ($1,$2,$3)",
    [title, date, duration_minutes]
  );

// Get all exams
exports.getExams = () =>
  db.query(
    "SELECT id, title, date, duration_minutes, status, created_at FROM exams ORDER BY date DESC"
  );
