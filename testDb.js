const db = require("./db");

db.serialize(() => {
    console.log("Verifying tables in the database...");
    db.all("SELECT name FROM sqlite_master WHERE type='table';", [], (err, rows) => {
        if (err) {
            console.error("Error querying tables:", err.message);
        } else {
            console.log("Tables in the database:", rows.map((row) => row.name));
        }
    });
});
