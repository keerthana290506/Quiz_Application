const pool = require("../db"); // adjust path as needed

// Retrieve student profile by email
const getStudentProfile = async (req, res) => {
  try {
    const { email } = req.params;

    const result = await pool.query(
      "SELECT username, email, wallet_balance FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getStudentProfile };
