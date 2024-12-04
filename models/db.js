const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to your SQLite database file
const dbPath = path.join(__dirname, '../database/database.db');

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;
