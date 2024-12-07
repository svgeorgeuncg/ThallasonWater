// ==========================
// Import Core and Third-Party Modules
// ==========================
const express = require('express'); // Core Express module for server setup
const morgan = require('morgan'); // Middleware for HTTP request logging
const helmet = require('helmet'); // Middleware for securing HTTP headers
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const session = require('express-session'); // Middleware for session handling
const path = require('path'); // Module to handle file and directory paths

// ==========================
// Import Route Handlers
// ==========================
const checkoutRoutes = require('./routes/checkout'); // Handles checkout functionality
const productsRoutes = require('./routes/products'); // Handles product-related API routes
const ordersRoutes = require('./routes/orders'); // Handles order-related API routes
const adminRoutes = require('./routes/admin'); // Handles admin panel functionality
const usersRoutes = require('./routes/users'); // Handles user authentication and management
const adminUsersRoutes = require('./routes/adminUsers'); // Admin user management routes
const adminProductsRoutes = require('./routes/adminProducts'); // Admin product management routes
const uploadRoutes = require('./routes/upload');

// ==========================
// Initialize Express App
// ==========================
const app = express(); // Initialize Express application
const PORT = process.env.PORT || 3000; // Set the server's port

// ==========================
// Middleware
// ==========================

// Security Middleware
app.use(helmet()); // Adds security headers to HTTP responses

// Logging Middleware
app.use(morgan('dev')); // Logs incoming HTTP requests to the console

// Body Parsing Middleware
app.use(bodyParser.json()); // Parses JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded request bodies
app.use(express.json()); // Additional JSON parsing

// Static Files Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" directory

// Session Middleware for Authentication
app.use(
    session({
        secret: 'your_secret_key', // Replace with a secure key or environment variable
        resave: false, // Prevents saving session if it wasn't modified
        saveUninitialized: true, // Forces uninitialized sessions to be saved
        cookie: { secure: false }, // Use "true" in production if HTTPS is enabled
    })
);

// Cache Control Middleware
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

// ==========================
// API Routes
// ==========================

app.use('/api/checkout', checkoutRoutes); // API routes for checkout functionality

app.use('/api/products', productsRoutes); // API routes for product data

app.use('/api/orders', ordersRoutes); // API routes for order data

app.use('/api/admin', adminRoutes); // API routes for admin panel features

app.use('/api/users', usersRoutes); // API routes for user authentication and management

app.use('/api/admin-products', adminProductsRoutes); // API routes for admin product management

app.use('/api/admin-users', adminUsersRoutes); // API routes for admin user management

app.use('/api/upload', uploadRoutes); // API routes for uploading products on the admin site

// ==========================
// Catch-All Route for Undefined Paths
// ==========================
app.use((req, res) => {
    res.status(404).send('Page Not Found'); // Handles undefined routes
});

// ==========================
// Start the Server
// ==========================
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`); // Logs server startup information
});
