const express = require('express');
const router = express.Router();
const { getAllProducts, deleteProductById } = require('../controllers/adminProductsController');

// Route to fetch all products
router.get('/', getAllProducts);

// Route to delete a product by ID
router.delete('/:id', deleteProductById);

module.exports = router;
