const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/authModels");

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  findUserByEmail(email, async (err, result) => {
    if (result && result.rowCount > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    createUser(username, email, hashed, (err) => {
      if (err) return res.status(500).json({ message: "Database error", err });
      return res.status(201).json({ message: "User registered ✅" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, async (err, result) => {
    if (!result || result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      message: "Login successful ✅",
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  });
};
