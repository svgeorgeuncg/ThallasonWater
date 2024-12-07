// Fetch cart data from localStorage and make sure it is valid JSON
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to render the cart items
function renderCart() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartTax = document.getElementById("cart-tax");
    const cartTotal = document.getElementById("cart-total");
    const SALES_TAX_RATE = 0.0675;

    // Clear any existing items in the cart
    cartItemsContainer.innerHTML = "";

    // Check if the cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your shopping cart is empty.</p>';
        cartSubtotal.textContent = "0.00";
        cartTax.textContent = "0.00";
        cartTotal.textContent = "0.00";
        return;
    }

    let subtotal = 0;

    // Loop through each product in the cart and render
    cart.forEach((item, index) => {
        // Ensure that each item has the expected structure
        if (!item || !item.name || !item.price || !item.quantity || !item.image) {
            console.error("Invalid item data in cart", item);
            return; // Skip rendering if the item data is invalid
        }

        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        // Create and append cart item elements
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div>
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="cart-quantity">
                <label>Quantity:</label>
                <input type="number" min="1" value="${item.quantity}" data-index="${index}">
            </div>
            <p>Total: $${itemTotal.toFixed(2)}</p>
            <button class="delete-item" data-index="${index}">Delete</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Calculate tax and total
    const tax = subtotal * SALES_TAX_RATE;
    const total = subtotal + tax;

    // Update the cart summary
    cartSubtotal.textContent = subtotal.toFixed(2);
    cartTax.textContent = tax.toFixed(2);
    cartTotal.textContent = total.toFixed(2);
}

// Handle quantity changes
document.addEventListener("input", (event) => {
    if (event.target.matches(".cart-quantity input")) {
        const index = event.target.dataset.index;
        const newQuantity = parseInt(event.target.value);

        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    }
});

// Handle deleting items from the cart
document.addEventListener("click", (event) => {
    if (event.target.matches(".delete-item")) {
        const index = event.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
});

// Render the cart when the page loads
document.addEventListener("DOMContentLoaded", () => {
    console.log("Cart data from localStorage:", cart);
    renderCart();
});
