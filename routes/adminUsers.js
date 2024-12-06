const express = require("express");
const router = express.Router();
const {
    getAllAdminUsers,
    promoteUser,
    demoteUser,
    deleteUser,
} = require("../controllers/adminUsersController");

// Route to fetch all users
router.get("/all", getAllAdminUsers);

// Route to promote a user to admin
router.put("/promote", promoteUser);

// Route to demote a user to regular user
router.put("/demote", demoteUser);

// Route to delete a user
router.delete("/delete", deleteUser);

module.exports = router;
