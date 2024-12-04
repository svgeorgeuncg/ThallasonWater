const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/admin', adminRoutes);

// Fallback for undefined routes
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
