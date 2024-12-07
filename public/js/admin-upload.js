document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("upload-form");

    uploadForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const fileInput = document.getElementById("upload-file");
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Products uploaded successfully.");
                fileInput.value = ""; // Clear file input
            } else {
                const error = await response.json();
                alert(`Failed to upload products: ${error.error}`);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred. Please try again.");
        }
    });
});
