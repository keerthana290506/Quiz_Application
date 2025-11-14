// backend/migrations/createAllAdminTables.js
const db = require("../db");

async function migrate() {
  try {

    // ✅ Plans Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS plans (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        duration_months INT NOT NULL,
        price INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ✅ Exams Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS exams (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        date DATE NOT NULL,
        duration_minutes INT NOT NULL,
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ✅ Questions Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS questions (
        id SERIAL PRIMARY KEY,
        exam_id INT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
        question TEXT NOT NULL,
        option_a TEXT NOT NULL,
        option_b TEXT NOT NULL,
        option_c TEXT NOT NULL,
        option_d TEXT NOT NULL,
        correct_option CHAR(1) NOT NULL CHECK (correct_option IN ('A','B','C','D')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ✅ Contests Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS contests (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        entry_fee INT NOT NULL,
        prize_pool INT NOT NULL,
        date DATE NOT NULL,
        status VARCHAR(20) DEFAULT 'upcoming',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ✅ Wallets Table (Government-safe: No negative balance)
    await db.query(`
      CREATE TABLE IF NOT EXISTS wallets (
        user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        balance INT DEFAULT 0 CHECK (balance >= 0)
      );
    `);

    // ✅ Transactions Table (Credit/Debit History)
    await db.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        amount INT NOT NULL,
        type VARCHAR(10) NOT NULL CHECK (type IN ('credit','debit')),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ ALL Admin Tables Created Successfully (Government-Grade Safe)");
    process.exit(0);

  } catch (error) {
    console.error("❌ Migration Failed:", error);
    process.exit(1);
  }
}

migrate();
