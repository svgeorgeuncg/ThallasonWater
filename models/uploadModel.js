const db = require('./db'); // Database connection

async function addProductsToDB(products) {
    const sql = `
        INSERT INTO Products (name, description, image_path, price)
        VALUES (?, ?, ?, ?)
    `;

    try {
        for (const product of products) {
            // Ensure `image_path` exists for each product
            if (!product.image_path) {
                throw new Error(`Missing image path for product: ${product.name}`);
            }
            await new Promise((resolve, reject) => {
                db.run(
                    sql,
                    [product.name, product.description, product.image_path, product.price],
                    (err) => (err ? reject(err) : resolve())
                );
            });
        }
    } catch (error) {
        console.error('Error adding products to DB:', error);
        throw error;
    }
}

module.exports = { addProductsToDB };
