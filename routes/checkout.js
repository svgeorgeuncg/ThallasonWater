// routes/checkout.js
const express = require('express');
const router = express.Router();
const { addOrder, addOrderDetails } = require('../models/checkoutModel');

router.post('/', async (req, res) => {
    const { name, email, address, city, state, zip, payment, cart } = req.body;

    if (!cart || cart.length === 0) {
        return res.status(400).json({ error: 'Cart is empty. Cannot process checkout.' });
    }

    try {
        // Step 1: Add order to the database
        const orderId = await addOrder({
            name,
            email,
            address,
            city, // Include city
            state,
            zip,
            payment,
        });

        console.log(`Order created with ID: ${orderId}`);

        // Step 2: Add order details for each item in the cart
        for (const item of cart) {
            console.log(`Order ID: ${orderId}, Product ID: ${item.id}, Quantity: ${item.quantity}`);
            await addOrderDetails(orderId, item.id, item.quantity);
        }
        

        console.log(`Order details saved for Order ID: ${orderId}`);

        // Step 3: Respond with success
        res.status(200).json({
            message: 'Checkout successful!',
            orderId: orderId,
        });
    } catch (error) {
        console.error('Error processing checkout:', error);
        res.status(500).json({ error: 'Failed to process checkout. Please try again.' });
    }
});


module.exports = router;
