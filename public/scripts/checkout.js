document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const orderItemsContainer = document.getElementById("order-items");
    const cartTotalElement = document.getElementById("cart-total");

    // Populate order summary
    let total = 0;
    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`;
        orderItemsContainer.appendChild(listItem);

        total += item.price * item.quantity;
    });
    cartTotalElement.textContent = total.toFixed(2);

    // Handle form submission
    document.getElementById("checkout-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            zip: document.getElementById("zip").value,
            payment: document.getElementById("payment").value,
            cart: JSON.parse(localStorage.getItem("cart")) || []
        };

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to process the order");
            }

            // Clear the cart and redirect to the shop page
            alert("Order placed successfully!");
            localStorage.removeItem("cart");
            window.location.href = "shop.html"; // Redirect to the shop page
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("An error occurred while placing your order. Please try again.");
        }
    });
});
