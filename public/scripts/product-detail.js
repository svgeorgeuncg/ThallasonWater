document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        alert("Product ID not found!");
        return;
    }

    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch product details");
        }

        const product = await response.json();

        // Populate product details on the page
        document.getElementById("product-image").src = product.image_path;
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;

        // Define the addToCart function here
        function addToCart(product) {
            // Retrieve the cart from localStorage or initialize an empty array
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
            // Check if the product already exists in the cart
            const existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                // Increment the quantity of the existing product
                existingProduct.quantity = 1;
            } else {
                // Add the new product to the cart with a quantity of 1
                product.quantity = 1;
                cart.push(product);
            }
        
            // Save the updated cart back to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));
        
            // Display a single success alert
            if (!existingProduct) {
                alert(`${product.name} added to your cart!`);
            }
        }
        

        // Attach add to cart functionality
        document.getElementById("add-to-cart-btn").addEventListener("click", () => {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image_path,
            });
        });
    } catch (error) {
        console.error("Error loading product details:", error);
        alert("Failed to load product details. Please try again.");
    }
});
