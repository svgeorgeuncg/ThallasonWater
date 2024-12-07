const cartModel = require('../models/cartModel');

// Get all items in the cart
exports.getCart = async (req, res) => {
    try {
        const cart = await cartModel.getCartItems(req.session.userId);
        res.json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Failed to fetch cart items' });
    }
};

// Add an item to the cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        await cartModel.addToCart(req.session.userId, productId, quantity);
        res.json({ message: 'Item added to cart' });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
};

// Update item quantity in the cart
exports.updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        await cartModel.updateCartItem(req.session.userId, productId, quantity);
        res.json({ message: 'Cart updated successfully' });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Failed to update cart' });
    }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    try {
        await cartModel.removeFromCart(req.session.userId, productId);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
};
