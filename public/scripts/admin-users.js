document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('users-table-body');

    // Fetch and populate users
    async function loadUsers() {
        try {
            const response = await fetch('/api/admin/users/all');
            const users = await response.json();

            tableBody.innerHTML = ''; // Clear the table

            users.forEach((user) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.role}</td>
                    <td>
                        ${
                            user.role === 'user'
                                ? `<button class="promote-btn" data-id="${user.id}">Promote</button>`
                                : `<button class="demote-btn" data-id="${user.id}">Demote</button>`
                        }
                        <button class="delete-btn" data-id="${user.id}">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Failed to load users:', error);
        }
    }

    // Handle Promote
    tableBody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('promote-btn')) {
            const id = e.target.dataset.id;
            
            try {
                const response = await fetch(`/api/admin/users/promote/${id}`, {
                    method: 'POST',
                });
                if (response.ok) {
                    alert('User promoted successfully');
                    loadUsers();
                } else {
                    alert('Failed to promote user');
                }
            } catch (error) {
                console.error('Error promoting user:', error);
            }
        }
    });

    // Handle Demote
    tableBody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('demote-btn')) {
            const id = e.target.dataset.id;
            try {
                const response = await fetch(`/api/admin/users/demote/${id}`, {
                    method: 'POST',
                });
                if (response.ok) {
                    alert('User demoted successfully');
                    loadUsers();
                } else {
                    alert('Failed to demote user');
                }
            } catch (error) {
                console.error('Error demoting user:', error);
            }
        }
    });

    // Handle Delete
    tableBody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            try {
                const response = await fetch(`/api/admin/users/delete/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('User deleted successfully');
                    loadUsers();
                } else {
                    alert('Failed to delete user');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    });

    loadUsers(); // Load users on page load
});
