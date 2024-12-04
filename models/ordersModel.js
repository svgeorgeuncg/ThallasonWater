const db = require('./db');

module.exports = {
    getAllOrders: async () => {
        return await db.query('SELECT * FROM Orders');
    },
    createOrder: async (order) => {
        const { customer_id, total_price, status } = order;
        const result = await db.query(
            'INSERT INTO Orders (customer_id, total_price, status) VALUES (?, ?, ?)',
            [customer_id, total_price, status]
        );
        return { id: result.insertId, ...order };
    }
};
