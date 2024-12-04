const { getProductsFromDB, getProductByIdFromDB } = require('../models/productsModel');

// Controller to fetch all products
async function getAllProducts(req, res) {
    try {
        const products = await getProductsFromDB();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

// Controller to fetch a single product by ID
async function getProductById(req, res) {
    const { id } = req.params; // Destructure id from req.params
    try {
        const product = await getProductByIdFromDB(id); // Fetch product by ID
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
}

module.exports = { getAllProducts, getProductById };
