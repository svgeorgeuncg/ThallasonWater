const db = require('./models/db'); // Adjust the path if needed

// Test query to fetch all rows from the Products table
db.all('SELECT * FROM Products', [], (err, rows) => {
    if (err) {
        console.error('Error querying the database:', err.message);
    } else {
        console.log('Products:', rows);
    }
});
