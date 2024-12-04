const ordersModel = require('../models/ordersModel');

module.exports = {
    getAllOrders: async (req, res) => {
        try {
            const orders = await ordersModel.getAllOrders();
            res.json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createOrder: async (req, res) => {
        try {
            const newOrder = await ordersModel.createOrder(req.body);
            res.status(201).json(newOrder);
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
