const db = require('./db');

// Function to fetch all products
function getProductsFromDB() {
    const sql = 'SELECT id, name, description, price, image_path FROM Products';
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if (err) {
                console.error('Error fetching products:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Function to fetch a single product by ID
function getProductByIdFromDB(id) {
    const sql = 'SELECT id, name, description, price, image_path FROM Products WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.get(sql, [id], (err, row) => {
            if (err) {
                console.error('Error fetching product by ID:', err);
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

module.exports = { getProductsFromDB, getProductByIdFromDB };
