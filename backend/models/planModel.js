const db = require("../db");

// Add membership plan
exports.createPlan = (name, duration_months, price) =>
  db.query(
    "INSERT INTO plans (name, duration_months, price) VALUES ($1,$2,$3)",
    [name, duration_months, price]
  );

// Get all plans
exports.getPlans = () =>
  db.query("SELECT * FROM plans ORDER BY id DESC");
