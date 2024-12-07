const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser'); // For parsing CSV files
const { addProductsToDB } = require('../models/uploadModel'); // Function to add products to the DB

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === 'images') {
                cb(null, 'public/uploads/images'); // Save images to this directory
            } else {
                cb(null, 'uploads/'); // Temporary folder for JSON/CSV files
            }
        },
        filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueName);
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit files to 10MB
});

// Handle file upload
router.post('/', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'images', maxCount: 10 }]), async (req, res) => {
    const file = req.files?.file?.[0]; // Uploaded JSON/CSV file
    const images = req.files?.images || []; // Uploaded images
    const imageMap = {};

    // Map uploaded images to their filenames
    images.forEach((image) => {
        imageMap[image.originalname] = path.join('/uploads/images', image.filename);
    });

    try {
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded. Please upload a JSON or CSV file.' });
        }

        let products = [];

        // Process the uploaded JSON or CSV file
        if (file.mimetype === 'application/json') {
            const fileData = fs.readFileSync(file.path, 'utf-8');
            products = JSON.parse(fileData);
        } else if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
            products = await new Promise((resolve, reject) => {
                const results = [];
                fs.createReadStream(file.path)
                    .pipe(csvParser())
                    .on('data', (data) => results.push(data))
                    .on('end', () => resolve(results))
                    .on('error', (err) => reject(err));
            });
        } else {
            return res.status(400).json({ error: 'Invalid file format. Only JSON and CSV are supported.' });
        }

        // Map `image_path` in products to uploaded images
        products = products.map((product) => ({
            ...product,
            image_path: imageMap[product.image_path] || product.image_path,
        }));

        // Ensure every product has an image_path
        for (const product of products) {
            if (!product.image_path) {
                return res.status(400).json({
                    error: `Missing image for product: ${product.name}`,
                });
            }
        }

        // Add products to the database
        await addProductsToDB(products);

        // Clean up the uploaded JSON/CSV file
        fs.unlinkSync(file.path);

        res.json({ message: 'Products uploaded successfully.' });
    } catch (error) {
        console.error('Error processing upload:', error);

        // Clean up uploaded files on error
        if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);

        res.status(500).json({ error: 'Failed to process uploaded file. Please check the file format and try again.' });
    }
});

module.exports = router;
