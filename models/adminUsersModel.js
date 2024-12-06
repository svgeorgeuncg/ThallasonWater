const db = require("./db");

// Fetch all users
async function getAllUsersFromDB() {
    const sql = "SELECT id, username, email, role FROM Users";
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if (err) {
                console.error("Error fetching users:", err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Promote a user
async function promoteUserInDB(id) {
    const sql = "UPDATE Users SET role = 'admin' WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.run(sql, [id], (err) => {
            if (err) {
                console.error("Error promoting user:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Demote a user
async function demoteUserInDB(id) {
    const sql = "UPDATE Users SET role = 'user' WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.run(sql, [id], (err) => {
            if (err) {
                console.error("Error demoting user:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Delete a user
async function deleteUserFromDB(id) {
    const sql = "DELETE FROM Users WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.run(sql, [id], (err) => {
            if (err) {
                console.error("Error deleting user:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    getAllUsersFromDB,
    promoteUserInDB,
    demoteUserInDB,
    deleteUserFromDB,
};
