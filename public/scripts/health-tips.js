document.addEventListener("DOMContentLoaded", () => {
    const healthTipElement = document.getElementById("health-tip");
    const newTipButton = document.getElementById("new-tip-button");

    async function fetchHealthTip() {
        try {
            const response = await fetch("/api/health-tips");
            if (!response.ok) {
                throw new Error("Failed to fetch health tip.");
            }

            const data = await response.json();
            healthTipElement.innerHTML = `
                <p>${data.tip}</p>
                <a href="${data.url}" target="_blank">Learn More</a>
            `;
        } catch (error) {
            console.error("Error fetching health tip:", error);
            healthTipElement.innerHTML = `<p>Sorry, we couldn't load a health tip. Please try again later.</p>`;
        }
    }

    // Fetch initial health tip
    fetchHealthTip();

    // Fetch a new tip when button is clicked
    newTipButton.addEventListener("click", fetchHealthTip);
});
