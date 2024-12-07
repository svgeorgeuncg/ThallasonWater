const db = require("../db");

// Add a new order to the database
async function addOrder(orderData) {
    const { name, email, address, city, state, zip, payment } = orderData;

    const result = await new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO Orders (name, email, address, city, state, zip, payment_method, total_price, order_date)
             VALUES (?, ?, ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP)`,
            [name, email, address, city, state, zip, payment],
            function (err) {
                if (err) reject(err);
                else resolve(this);
            }
        );
    });

    return result.lastID;
}



// Add order details (products) to the database
async function addOrderDetails(orderId, productId, quantity) {
    await new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO OrderDetails (order_id, product_id, quantity)
             VALUES (?, ?, ?)`,
            [orderId, productId, quantity],
            function (err) {
                if (err) reject(err);
                else resolve();
            }
        );
    });
}


module.exports = { addOrder, addOrderDetails };
