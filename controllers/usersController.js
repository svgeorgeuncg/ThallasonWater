const { getUserByUsername } = require('../models/usersModel');

async function loginUser(req, res) {
    const { username, password } = req.body;

    try {
        // Fetch user by username
        const user = await getUserByUsername(username);

        // Check if user exists
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Compare provided password with stored password
        if (password !== user.password_hash) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Successful login
        req.session.user = { id: user.id, role: user.role }; // Storing session data
        res.json({ message: 'Login successful', role: user.role });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { loginUser };
