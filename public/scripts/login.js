document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form submission refresh

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect based on user role
                if (data.role === 'admin') {
                    window.location.href = '../admin/admin-products.html';
                } else {
                    alert('You are not authorized to access the admin panel.');
                }
            } else {
                // Display error message
                errorMessage.textContent = data.error || 'Failed to log in. Please try again.';
            }
        } catch (error) {
            console.error('Error logging in:', error);
            errorMessage.textContent = 'An error occurred. Please try again later.';
        }
    });
});
