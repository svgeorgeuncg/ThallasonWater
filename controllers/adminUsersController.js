const {
    getAllUsersFromDB,
    promoteUserInDB,
    demoteUserInDB,
    deleteUserFromDB,
} = require("../models/adminUsersModel");

// Fetch all users
async function getAllAdminUsers(req, res) {
    try {
        const users = await getAllUsersFromDB(); // Fetch all users
        res.json(users); // Return as JSON
    } catch (error) {
        console.error("Error fetching admin users:", error);
        res.status(500).json({ error: "Failed to fetch admin users" });
    }
}

// Promote a user to admin
async function promoteUser(req, res) {
    const { id } = req.body;
    try {
        await promoteUserInDB(id); // Promote user in the database
        res.json({ message: `User ${id} promoted to admin.` });
    } catch (error) {
        console.error(`Error promoting user ${id}:`, error);
        res.status(500).json({ error: "Failed to promote user" });
    }
}

// Demote an admin to regular user
async function demoteUser(req, res) {
    const { id } = req.body;
    try {
        await demoteUserInDB(id); // Demote user in the database
        res.json({ message: `User ${id} demoted to regular user.` });
    } catch (error) {
        console.error(`Error demoting user ${id}:`, error);
        res.status(500).json({ error: "Failed to demote user" });
    }
}

// Delete a user
async function deleteUser(req, res) {
    const { id } = req.body;
    try {
        await deleteUserFromDB(id); // Delete user from the database
        res.json({ message: `User ${id} deleted successfully.` });
    } catch (error) {
        console.error(`Error deleting user ${id}:`, error);
        res.status(500).json({ error: "Failed to delete user" });
    }
}

module.exports = {
    getAllAdminUsers,
    promoteUser,
    demoteUser,
    deleteUser,
};
