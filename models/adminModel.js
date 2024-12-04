const db = require('./db');
const bcrypt = require('bcrypt');

module.exports = {
    validateAdmin: async (username, password) => {
        const [rows] = await db.query('SELECT * FROM Admins WHERE username = ?', [username]);
        if (rows.length === 0) return false;
        return await bcrypt.compare(password, rows[0].password_hash);
    }
};
