const db = require('./models/db');
db.all('SELECT * FROM Products', (err, rows) => {
    if (err) console.error('Error:', err);
    else console.log(rows);
});
