const db = require('../db'); // Import the database connection

// Example function to fetch cart items (if needed for future backend functionality)
function getCartItems(userId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Cart WHERE user_id = ?', [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Export necessary functions
module.exports = {
    getCartItems,
};
