/*
  Name: Samuel George
  Date: 11.07.2024
  CSC 372-01

  This file provides JavaScript functionality for the Thalasson Admin Panel.
  It includes event listeners for the bulk upload form, file validation, 
  modal form for adding a new product, and functions for displaying and managing 
  products on the admin-products.html page.
*/

/** ------------------ BULK UPLOAD FUNCTIONALITY ------------------ **/

// Handles form submission for the bulk upload.
// Parses the file content and logs product data for testing purposes.
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('upload-file');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const content = e.target.result;

            // Check file type and parse accordingly
            if (file.name.endsWith('.json')) {
                try {
                    const products = JSON.parse(content);
                    console.log("Parsed JSON Products:", products);
                    alert("JSON file parsed successfully. Check console for details.");
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    alert("Failed to parse JSON file. Please check the file format.");
                }
            } else if (file.name.endsWith('.csv')) {
                const products = parseCSV(content);
                console.log("Parsed CSV Products:", products);
                alert("CSV file parsed successfully. Check console for details.");
            } else {
                alert("Unsupported file format. Please upload a JSON or CSV file.");
            }
        };

        reader.readAsText(file);
    } else {
        alert("Please select a file to upload.");
    }
});

/**
 * Parses CSV content into an array of product objects.
 * @param {string} csvContent - The CSV file content as a string.
 * @returns {Array} - Array of product objects.
 */
function parseCSV(csvContent) {
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    const products = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');

        if (values.length === headers.length) {
            const product = {};
            for (let j = 0; j < headers.length; j++) {
                product[headers[j].trim()] = values[j].trim();
            }
            products.push(product);
        }
    }
    return products;
}

/** ------------------ PRODUCT LISTING AND MANAGEMENT ------------------ **/

// Sample data for testing (this can be replaced with data from the upload functionality)
let products = [
    { productId: 1, name: "Thalasson 6-Pack", description: "Refreshing hydration", category: "Water", image: "../assets/images/6-pack.webp", price: 10.00 },
    { productId: 2, name: "Thalasson Berry Electrolyte", description: "Berry-flavored hydration", category: "Electrolyte", image: "../assets/images/berry-electrolyte.webp", price: 15.00 }
];

/**
 * Loads products into the product table.
 */
function loadProducts() {
    const tableBody = document.getElementById('product-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    products.forEach(product => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.category}</td>
            <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <button class="edit-button" data-id="${product.productId}">Edit</button>
                <button class="archive-button" data-id="${product.productId}">Archive</button>
                <button class="delete-button" data-id="${product.productId}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Attach event listeners for each button
    document.querySelectorAll('.edit-button').forEach(button => button.addEventListener('click', editProduct));
    document.querySelectorAll('.archive-button').forEach(button => button.addEventListener('click', archiveProduct));
    document.querySelectorAll('.delete-button').forEach(button => button.addEventListener('click', deleteProduct));
}

/** ------------------ SEARCH FILTER FUNCTIONALITY ------------------ **/

// Handles product search based on name or category.
document.getElementById('search-filter').addEventListener('input', function(e) {
    const filterText = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(filterText) ||
        product.category.toLowerCase().includes(filterText)
    );
    displayProducts(filteredProducts);
});

/**
 * Displays products based on a filtered list.
 * @param {Array} productList - List of products to display.
 */
function displayProducts(productList) {
    const tableBody = document.getElementById('product-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    productList.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.category}</td>
            <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <button class="edit-button" data-id="${product.productId}">Edit</button>
                <button class="archive-button" data-id="${product.productId}">Archive</button>
                <button class="delete-button" data-id="${product.productId}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

/** 
 * Event handler for editing a product.
 */
function editProduct(event) {
    const productId = event.target.getAttribute('data-id');
    alert(`Edit functionality for product ID ${productId} to be implemented.`);
}

/** 
 * Event handler for archiving a product.
 */
function archiveProduct(event) {
    const productId = event.target.getAttribute('data-id');
    alert(`Archive functionality for product ID ${productId} to be implemented.`);
}

/** 
 * Event handler for deleting a product.
 */
function deleteProduct(event) {
    const productId = event.target.getAttribute('data-id');
    products = products.filter(product => product.productId != productId);
    loadProducts(); // Refresh product list
    alert(`Product ID ${productId} has been deleted.`);
}

// Initial load of products
loadProducts();

/** ------------------ ADD NEW PRODUCT MODAL FUNCTIONALITY ------------------ **/

// Modal functionality for adding new products
const addProductButton = document.getElementById('add-product-button');
const modal = document.getElementById('add-product-modal');
const closeButton = document.querySelector('.close-button');

// Open modal
addProductButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close modal on clicking "X" button
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle form submission for adding a new product
document.getElementById('new-product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const newProduct = {
        productId: products.length + 1, // Auto-increment product ID
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        category: document.getElementById('product-category').value,
        image: document.getElementById('product-image').value,
        price: parseFloat(document.getElementById('product-price').value),
    };

    products.push(newProduct);  // Add new product to products array
    loadProducts();              // Refresh product table
    document.getElementById('new-product-form').reset(); // Reset form
    modal.style.display = 'none'; // Close modal
    alert("Product added successfully!");
});
