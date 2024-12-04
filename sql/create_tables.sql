-- create_tables.sql
-- Samuel George - Thalasson e-commerce project
-- This file defines all the database tables and constraints to manage users, products, orders, and order details.

-- Drop tables if they already exist (for resetting the database)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- Users table: stores registered users' information
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,                  -- Unique identifier for each user
    username VARCHAR(50) NOT NULL UNIQUE,        -- Username, must be unique
    email VARCHAR(100) NOT NULL UNIQUE,          -- Email, must be unique
    password VARCHAR(255) NOT NULL               -- Hashed password for security
);

-- Categories table: stores product categories
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,              -- Unique identifier for each category
    name VARCHAR(50) NOT NULL UNIQUE             -- Category name, must be unique
);

-- Products table: stores information about each product
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,               -- Unique identifier for each product
    name VARCHAR(100) NOT NULL,                  -- Product name
    description TEXT,                            -- Description of the product
    price DECIMAL(10, 2) NOT NULL,               -- Product price
    image_path VARCHAR(255),                     -- Path to product image
    category_id INT REFERENCES categories(category_id) ON DELETE SET NULL  -- Foreign key to categories
);

-- Orders table: stores orders placed by users
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,                 -- Unique identifier for each order
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,  -- Foreign key to users
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date and time of the order
    status VARCHAR(50) DEFAULT 'Pending'         -- Order status (e.g., Pending, Shipped, Delivered)
);

-- OrderItems table: stores details about each product in an order
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,            -- Unique identifier for each order item
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,  -- Foreign key to orders
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,  -- Foreign key to products
    quantity INT NOT NULL CHECK (quantity > 0),  -- Quantity of the product in the order
    price DECIMAL(10, 2) NOT NULL                -- Price at the time of the order
);
