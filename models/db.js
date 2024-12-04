const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to your database file
const dbPath = path.resolve(__dirname, '../database/database.db');

// Create and export the database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database at', dbPath);
    }
});

module.exports = db;
