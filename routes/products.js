const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productsController');

// Route to fetch all products
router.get('/', getAllProducts);

// Route to fetch a single product by ID
router.get('/:id', getProductById);

module.exports = router;
