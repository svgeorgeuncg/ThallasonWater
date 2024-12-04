-- drop_tables.sql
-- Samuel George - Thalasson e-commerce project
-- Drops all tables in reverse order of dependency to avoid constraint errors.

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
