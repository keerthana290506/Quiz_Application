const express = require("express");
const router = express.Router();
const { getStudentProfile } = require("../controllers/StudentController");

// GET /api/students/:email
router.get("/:email", getStudentProfile);

module.exports = router;
