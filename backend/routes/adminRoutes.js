// backend/routes/adminRoutes.js
const express = require("express");
const admin = require("../controllers/adminController");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

// Admin Manage Admins
router.post("/create-admin", authAdmin, admin.createAdmin);

// User Management
router.get("/users", authAdmin, admin.getAllUsers);
router.put("/users/:id/status", authAdmin, admin.updateUserStatus);

// Plans
router.post("/plans", authAdmin, admin.addPlan);
router.get("/plans", authAdmin, admin.getPlans);

// Exams
router.post("/exams", authAdmin, admin.createExam);
router.get("/exams", authAdmin, admin.getExams);
router.post("/exams/add-question", authAdmin, admin.addQuestion);

// Contests
router.post("/contests", authAdmin, admin.createContest);
router.get("/contests", authAdmin, admin.getContests);

module.exports = router;
