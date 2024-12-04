document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const payment = document.getElementById('payment').value;
    const cart = JSON.parse(localStorage.getItem('cart')); // Assuming the cart is stored in localStorage

    const order = { name, email, address, state, zip, payment, cart };

    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Order placed successfully! Order ID: ${data.orderId}`);
            localStorage.removeItem('cart'); // Clear the cart
            window.location.href = '/index.html'; // Redirect to homepage
        } else {
            alert('Failed to place order. Please try again.');
        }
    } catch (error) {
        console.error('Error placing order:', error);
        alert('An error occurred. Please try again.');
    }
});
