// backend/migrations/makeFirstAdmin.js
const db = require("../db");

async function makeAdmin() {
  try {
    await db.query(`
      UPDATE users
      SET role = 'admin'
      WHERE email = 'admin@system.com';
    `);

    console.log("✅ First Admin Promoted Successfully");
    process.exit(0);

  } catch (err) {
    console.error("❌ Failed to promote admin:", err);
    process.exit(1);
  }
}

makeAdmin();
