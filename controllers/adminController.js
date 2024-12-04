const adminModel = require('../models/adminModel');

module.exports = {
    loginAdmin: async (req, res) => {
        try {
            const { username, password } = req.body;
            const isValid = await adminModel.validateAdmin(username, password);
            if (isValid) {
                res.json({ message: 'Login successful' });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error during admin login:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
