const db = require('./db');

module.exports = {
    getAllProducts: async () => {
        return await db.query('SELECT * FROM Products');
    },
    getProductById: async (id) => {
        const [rows] = await db.query('SELECT * FROM Products WHERE id = ?', [id]);
        return rows[0];
    },
    createProduct: async (product) => {
        const { name, description, price, image_path, category_id } = product;
        const result = await db.query(
            'INSERT INTO Products (name, description, price, image_path, category_id) VALUES (?, ?, ?, ?, ?)',
            [name, description, price, image_path, category_id]
        );
        return { id: result.insertId, ...product };
    },
    updateProduct: async (id, product) => {
        const { name, description, price, image_path, category_id } = product;
        const result = await db.query(
            'UPDATE Products SET name = ?, description = ?, price = ?, image_path = ?, category_id = ? WHERE id = ?',
            [name, description, price, image_path, category_id, id]
        );
        return result.affectedRows > 0 ? product : null;
    },
    deleteProduct: async (id) => {
        const result = await db.query('DELETE FROM Products WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};
