// backend/migrations/fixUsersTable.js
const db = require("../db");

async function migrate() {
  try {
    // Add role if missing
    await db.pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN
          ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'student';
        END IF;
      END
      $$;
    `);

    // Add status if missing
    await db.pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='status') THEN
          ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active';
        END IF;
      END
      $$;
    `);

    // Add created_at if missing
    await db.pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='created_at') THEN
          ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
        END IF;
      END
      $$;
    `);

    console.log("✅ Users table fixed (role, status, created_at ensured)");
    process.exit(0);

  } catch (err) {
    console.error("❌ Migration Failed:", err);
    process.exit(1);
  }
}

migrate();
