-- insert_products.sql
-- Samuel George - Thalasson e-commerce project
-- Inserts sample products into the products table.

INSERT INTO products (name, description, price, image_path, category_id) VALUES
    ('Thalasson 6-Pack', '6-pack of refreshing water for hydration.', 10.00, 'assets/images/6-pack.webp', 1),
    ('Thalasson 12-Pack', '12-pack of water for active lifestyles.', 18.00, 'assets/images/12-pack.webp', 1),
    ('Salt-Based Mango Electrolyte', 'Mango flavored electrolyte for hydration.', 15.00, 'assets/images/mango-electrolyte.webp', 2),
    ('Salt-Based Berry Electrolyte', 'Berry flavored electrolyte blend.', 15.00, 'assets/images/berry-electrolyte.webp', 2),
    ('Thalasson Glass Bottle', 'Reusable glass bottle for eco-friendly hydration.', 20.00, 'assets/images/reusable-bottle.webp', 3);
