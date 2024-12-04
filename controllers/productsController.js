const productsModel = require('../models/productsModel');

module.exports = {
    getAllProducts: async (req, res) => {
        try {
            const products = await productsModel.getAllProducts();
            res.json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getProductById: async (req, res) => {
        try {
            const product = await productsModel.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createProduct: async (req, res) => {
        try {
            const newProduct = await productsModel.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const updatedProduct = await productsModel.updateProduct(req.params.id, req.body);
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(updatedProduct);
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const deleted = await productsModel.deleteProduct(req.params.id);
            if (!deleted) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
