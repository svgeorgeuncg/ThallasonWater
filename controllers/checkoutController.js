const db = require('../models/db');

// Handle user checkout
const handleCheckout = (req, res) => {
    const { name, email, address, state, zip_code, payment_method, total_price } = req.body;

    // Insert checkout details into the database
    const query = `
        INSERT INTO CheckoutDetails (name, email, address, state, zip_code, payment_method, total_price)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [name, email, address, state, zip_code, payment_method, total_price];

    db.run(query, params, function (err) {
        if (err) {
            console.error('Error saving checkout details:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ message: 'Checkout successful!', orderId: this.lastID });
        }
    });
};

module.exports = { handleCheckout };
