const db = require('./db');

// Fetch all products from the database
function getAllProductsFromDB() {
    const sql = 'SELECT id, name, description, image_path, price FROM Products';
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if (err) {
                console.error('Error fetching products from DB:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Delete a product by ID
function deleteProductFromDB(productId) {
    const sql = 'DELETE FROM Products WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.run(sql, [productId], function (err) {
            if (err) {
                console.error('Error deleting product from DB:', err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = { getAllProductsFromDB, deleteProductFromDB };
