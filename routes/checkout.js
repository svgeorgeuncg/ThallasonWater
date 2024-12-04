// routes/checkout.js
const express = require('express');
const router = express.Router();

// Example route for processing a checkout
router.post('/', (req, res) => {
    const { name, email, address, state, zip, paymentMethod, totalPrice } = req.body;

    // Add logic to save the order to the database
    // Example: db.insertOrder(...)

    console.log('Checkout data received:', req.body);

    res.status(200).json({ message: 'Checkout successful!' });
});

module.exports = router;
