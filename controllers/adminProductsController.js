const { getAllProductsFromDB, deleteProductFromDB } = require('../models/adminProductsModel');

// Fetch all products
async function getAllProducts(req, res) {
    try {
        const products = await getAllProductsFromDB();
        console.log('Products fetched:', products); // Log products
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error); // Log error
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}


// Delete a product by ID
async function deleteProductById(req, res) {
    const { id } = req.params;
    try {
        await deleteProductFromDB(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
}

module.exports = { getAllProducts, deleteProductById };
