// Import core and third-party modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');

// Import route handlers
const checkoutRoutes = require('./routes/checkout');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for security, logging, and JSON parsing
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public')); // Serve static files from public/

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/checkout', checkoutRoutes); // Checkout-related routes
app.use('/api/products', productsRoutes); // Product-related routes
app.use('/api/orders', ordersRoutes); // Order-related routes
app.use('/api/admin', adminRoutes); // Admin-related routes

// Catch-all route for undefined paths
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
