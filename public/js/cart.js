// Initialize an empty cart or load the existing cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to render cart items
function renderCart() {
    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = "";

    // Check if the cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your shopping cart is empty.</p>';
        document.getElementById("cart-total").textContent = "0.00";
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="cart-quantity">
                <label>Quantity:</label>
                <input type="number" min="1" value="${item.quantity}" data-index="${index}">
            </div>
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
            <button class="delete-item" onclick="removeFromCart(${index})">Delete</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    calculateTotal();
}

// Sales tax rate (6.75%)
const SALES_TAX_RATE = 0.0675;

// Function to calculate and display the cart total
function calculateTotal() {
    // Calculate subtotal by summing item totals
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Calculate tax based on the subtotal
    const tax = subtotal * SALES_TAX_RATE;

    // Calculate final total including tax
    const total = subtotal + tax;

    // Display subtotal, tax, and total in the cart summary
    document.getElementById("cart-subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("cart-tax").textContent = tax.toFixed(2);
    document.getElementById("cart-total").textContent = total.toFixed(2);
}


// Function to add an item to the cart
function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    
    // Update the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Show confirmation popup
    const redirectToCart = confirm("Product was added to cart. Would you like to be redirected to your shopping cart?");
    if (redirectToCart) {
        // Redirect to cart page
        window.location.href = "../cart.html";
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item at the given index
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    renderCart(); // Re-render the cart
}

// Event listener for quantity change
document.addEventListener("input", (event) => {
    if (event.target.matches(".cart-quantity input")) {
        const index = event.target.getAttribute("data-index");
        const newQuantity = parseInt(event.target.value);
        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    }
});

// Checkout button functionality
document.addEventListener("DOMContentLoaded", () => {
    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            if (cart.length > 0) {
                alert("Thank you for your purchase!");
                cart = []; // Clear the cart array
                localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage

                // Reset subtotal, tax, and total display values
                document.getElementById("cart-subtotal").textContent = "0.00";
                document.getElementById("cart-tax").textContent = "0.00";
                document.getElementById("cart-total").textContent = "0.00";

                // Re-render cart items to show an empty cart
                renderCart();
            } else {
                alert("Your cart is empty.");
            }
        });
    }
});

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", renderCart);

// Fetch product ID from URL or other source
function loadProductDetails(productId) {
    const product = products.find(p => p.productId == productId);

    if (product) {
        document.getElementById('product-id').value = product.productId;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-price').value = product.price;
    } else {
        alert("Product not found.");
    }
}

// Handle form submission to save changes
document.getElementById('edit-product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const productId = document.getElementById('product-id').value;
    const product = products.find(p => p.productId == productId);

    if (product) {
        product.name = document.getElementById('product-name').value;
        product.description = document.getElementById('product-description').value;
        product.category = document.getElementById('product-category').value;
        product.image = document.getElementById('product-image').value;
        product.price = parseFloat(document.getElementById('product-price').value);

        alert("Product updated successfully!");
        window.location.href = 'admin-products.html';
    } else {
        alert("Failed to update product.");
    }
});

