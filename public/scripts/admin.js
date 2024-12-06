/**
 * admin-users.js
 * Handles user management: listing users, promoting, demoting, and deleting users.
 */

document.addEventListener("DOMContentLoaded", async () => {
    const userTable = document.getElementById("user-table").querySelector("tbody");

    // Fetch and populate users
    async function fetchUsers() {
        try {
            const response = await fetch("/api/admin-users/all");
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const users = await response.json();
            populateUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    // Populate the user table
    function populateUsers(users) {
        userTable.innerHTML = ""; // Clear existing rows
        users.forEach((user) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button class="promote-btn" data-id="${user.id}">Promote</button>
                    <button class="demote-btn" data-id="${user.id}">Demote</button>
                    <button class="delete-btn" data-id="${user.id}">Delete</button>
                </td>
            `;
            userTable.appendChild(row);
        });

        // Attach event listeners to buttons
        attachActionListeners();
    }

    // Attach event listeners for buttons
    function attachActionListeners() {
        document.querySelectorAll(".promote-btn").forEach((btn) =>
            btn.addEventListener("click", () => updateUserRole(btn.dataset.id, "promote"))
        );
        document.querySelectorAll(".demote-btn").forEach((btn) =>
            btn.addEventListener("click", () => updateUserRole(btn.dataset.id, "demote"))
        );
        document.querySelectorAll(".delete-btn").forEach((btn) =>
            btn.addEventListener("click", () => deleteUser(btn.dataset.id))
        );
    }

    // Update user role
    async function updateUserRole(userId, action) {
        try {
            const response = await fetch(`/api/admin-users/${action}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: userId }),
            });
            if (!response.ok) {
                throw new Error(`Failed to ${action} user`);
            }
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error(`Error updating user role (${action}):`, error);
        }
    }

    // Delete user
    async function deleteUser(userId) {
        try {
            const response = await fetch(`/api/admin-users/delete`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: userId }),
            });
            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    // Initial fetch of users
    fetchUsers();
});
