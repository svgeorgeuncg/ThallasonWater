const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Explicitly set the path to the database in the root "database" folder
const dbPath = path.resolve(__dirname, "database", "database.db");
console.log("Using database file at:", dbPath);

// Connect to the existing database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        console.log("Connected to the database successfully.");
    }
});

module.exports = db;
