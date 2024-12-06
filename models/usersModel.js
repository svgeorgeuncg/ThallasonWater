const db = require('./db');

// Function to fetch user by username
async function getUserByUsername(username) {
    const sql = 'SELECT id, username, password_hash, role FROM Users WHERE username = ?';
    return new Promise((resolve, reject) => {
        db.get(sql, [username], (err, row) => {
            if (err) {
                console.error('Error fetching user:', err);
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

module.exports = { getUserByUsername };
