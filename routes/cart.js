const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get all items in the cart
router.get('/', cartController.getCart);

// Add an item to the cart
router.post('/', cartController.addToCart);

// Update item quantity in the cart
router.put('/', cartController.updateCartItem);

// Remove an item from the cart
router.delete('/', cartController.removeFromCart);

module.exports = router;
