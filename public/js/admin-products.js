document.addEventListener('DOMContentLoaded', async () => {
    const productTableBody = document.querySelector('#product-table tbody');

    try {
        // Fetch all products
        const response = await fetch('/api/admin-products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();

        productTableBody.innerHTML = ''; // Clear existing rows

        // Populate the table
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.category || 'N/A'}</td>
                <td>${product.image_path}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button class="delete-btn" data-id="${product.id}">Delete</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });

        // Attach event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async () => {
                const productId = button.getAttribute('data-id');
                try {
                    const deleteResponse = await fetch(`/api/admin-products/${productId}`, {
                        method: 'DELETE',
                    });
                    if (deleteResponse.ok) {
                        alert('Product deleted successfully.');
                        row.remove(); // Remove row from the table
                    } else {
                        alert('Failed to delete product.');
                    }
                } catch (error) {
                    console.error('Error deleting product:', error);
                    alert('An error occurred while deleting the product.');
                }
            });
        });
    } catch (error) {
        console.error('Error loading products:', error);
        alert('Failed to load products.');
    }
});
