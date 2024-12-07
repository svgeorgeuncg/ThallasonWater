const db = require("../db");

// Add a new order to the database
async function addOrder(orderData) {
    const { name, email, address, state, zip, payment } = orderData;

    const result = await db.run(
        `INSERT INTO Orders (name, email, address, state, zip, payment_method, total_price, order_date)
         VALUES (?, ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP)`,
        [name, email, address, state, zip, payment]
    );

    return result.lastID; // Return the newly created order ID
}

// Add order details (products) to the database
async function addOrderDetails(orderId, productId, quantity) {
    await db.run(
        `INSERT INTO OrderDetails (order_id, product_id, quantity)
         VALUES (?, ?, ?)`,
        [orderId, productId, quantity]
    );
}

module.exports = { addOrder, addOrderDetails };
