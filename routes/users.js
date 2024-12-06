const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/usersController');

// POST route for login
router.post('/login', loginUser);


// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Failed to log out');
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.redirect('/index.html'); // Redirect to the home page
    });
});

module.exports = router;
