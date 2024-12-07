const express = require("express");
const router = express.Router();
const fetch = require("node-fetch"); // Install if not already: npm install node-fetch

// Health Tips API Route
router.get("/", async (req, res) => {
    try {
        const response = await fetch("https://health.gov/myhealthfinder/api/v3/topicsearch.json"); // Replace with the actual API link if different
        if (!response.ok) {
            throw new Error("Failed to fetch health tips");
        }
        const data = await response.json();
        const randomTip =
            data?.Result?.Resources?.Resource?.[Math.floor(Math.random() * data.Result.Resources.Resource.length)];
        if (!randomTip) {
            throw new Error("No tips available");
        }
        res.json({ tip: randomTip.Title, url: randomTip.AccessibleVersion || randomTip.AccessibleVersion });
    } catch (error) {
        console.error("Error fetching health tips:", error);
        res.status(500).json({ error: "Failed to fetch health tips." });
    }
});

module.exports = router;
