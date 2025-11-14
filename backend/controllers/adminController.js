// backend/controllers/adminController.js
const bcrypt = require("bcrypt");

// MODELS
const UserModel = require("../models/userModel");
const PlanModel = require("../models/planModel");
const ExamModel = require("../models/examModel");
const QuestionModel = require("../models/questionModel");
const ContestModel = require("../models/contestModel");
const WalletModel = require("../models/walletModel");
const TransactionModel = require("../models/transactionModel");

const adminController = {

  // ✅ Create another Admin (Only Admin Access)
  createAdmin: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Hash Password
      const hashed = await bcrypt.hash(password, 10);

      // Create user with role="admin"
      await UserModel.createUser(username, email, hashed, "admin");

      res.status(201).json({ message: "✅ Admin Created Successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err });
    }
  },

  // ✅ Get all users
  getAllUsers: async (req, res) => {
    try {
      const result = await UserModel.getAllUsers();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err });
    }
  },

  // ✅ Ban / Unban User
  updateUserStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body; // "active" or "banned"

      await UserModel.updateStatus(id, status);

      res.json({ message: `✅ User status updated to ${status}` });
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err });
    }
  },

  // ✅ Add Plan
  addPlan: async (req, res) => {
    try {
      const { name, duration_months, price } = req.body;
      await PlanModel.createPlan(name, duration_months, price);

      res.json({ message: "✅ Plan Added Successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err });
    }
  },

  // ✅ Get Plans
  getPlans: async (req, res) => {
    try {
      const result = await PlanModel.getPlans();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err });
    }
  },

  // ✅ Create Exam
  createExam: async (req, res) => {
    try {
      const { title, date, duration_minutes } = req.body;

      await ExamModel.createExam(title, date, duration_minutes);

      res.json({ message: "✅ Exam Created Successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err });
    }
  },

  // ✅ Get Exams
  getExams: async (req, res) => {
    try {
      const result = await ExamModel.getExams();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err });
    }
  },

  // ✅ Add Question to Exam
  addQuestion: async (req, res) => {
    try {
      const { exam_id, question, option_a, option_b, option_c, option_d, correct_option } = req.body;

      await QuestionModel.addQuestion(
        exam_id,
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option
      );

      res.json({ message: "✅ Question Added Successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err });
    }
  },

  // ✅ Create Contest
  createContest: async (req, res) => {
    try {
      const { title, entry_fee, prize_pool, date } = req.body;

      await ContestModel.createContest(title, entry_fee, prize_pool, date);

      res.json({ message: "✅ Contest Created Successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err });
    }
  },

  // ✅ Get Contests
  getContests: async (req, res) => {
    try {
      const result = await ContestModel.getContests();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err });
    }
  }
};

module.exports = adminController;
