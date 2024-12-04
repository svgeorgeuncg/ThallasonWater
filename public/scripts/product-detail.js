document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        alert("Product ID not provided!");
        return;
    }

    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch product details");
        }

        const product = await response.json();

        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-image").src = product.image_path;
        document.getElementById("product-image").alt = product.name;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;

        // Add to Cart Button Functionality
        document.getElementById("add-to-cart-btn").addEventListener("click", () => {
            alert(`Added "${product.name}" to the cart!`);
            // Logic to update cart goes here
        });
    } catch (error) {
        console.error("Error loading product details:", error);
        document.getElementById("product-detail").innerHTML = `<p>Failed to load product details. Please try again later.</p>`;
    }
});
