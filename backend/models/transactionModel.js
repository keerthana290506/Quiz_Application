const db = require("../db.js");

// Create transactions table if it doesn't exist
const createTransactionsTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      type VARCHAR(10) NOT NULL CHECK (type IN ('credit', 'debit')),
      transaction_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    db.query(query, (err) => {
        if (err) console.error("Error creating transactions table:", err);
        else console.log("Transactions table created successfully ");
    });
};

// Insert new transaction
const createTransaction = (userId, amount, type, callback) => {
    const query = `
    INSERT INTO transactions (user_id, amount, type)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
    db.query(query, [userId, amount, type], callback);
};

// Get all transactions by a specific user
const getTransactionsByUser = (userId, callback) => {
    const query = "SELECT * FROM transactions WHERE user_id = $1 ORDER BY transaction_timestamp DESC";
    db.query(query, [userId], callback);
};

// Export functions
module.exports = {
    createTransactionsTable,
    createTransaction,
    getTransactionsByUser
};