const db = require("../db");

// Add question to exam
exports.addQuestion = (
  exam_id,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option
) =>
  db.query(
    `INSERT INTO questions (exam_id, question, option_a, option_b, option_c, option_d, correct_option)
     VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [exam_id, question, option_a, option_b, option_c, option_d, correct_option]
  );

// Get questions of specific exam
exports.getQuestionsByExam = (exam_id) =>
  db.query("SELECT * FROM questions WHERE exam_id = $1", [exam_id]);
