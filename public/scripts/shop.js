/**
 * shop.js
 * Description: Dynamically populates the shop.html page with product data from the database.
 */

document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.getElementById("product-grid");
    const errorMessage = document.getElementById("error-message");

    try {
        // Fetch products from the API
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();
        console.log('Products fetched:', products); // Debugging log

        // Clear placeholder content
        productGrid.innerHTML = '';

        if (products.length === 0) {
            // Display message if no products are available
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'No products available.';
            return;
        }

        // Populate products into the shop grid
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <div class="product-card">
                    <img src="${product.image_path}" alt="${product.name}" class="product-image">
                    <div class="product-details">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <a href="/product-detail.html?id=${product.id}" class="view-details-btn">View Details</a>
                    </div>
                </div>
            `;
            productGrid.appendChild(productItem);
        });
    } catch (error) {
        // Log and display error message
        console.error('Error loading products:', error);
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Failed to load products. Please try again later.';
    }
});
