const fs = require('fs');
const csvParser = require('csv-parser');
const { addProductsToDB } = require('../models/uploadModel');

// Function to handle file upload and parsing
async function handleFileUpload(file) {
    const fileType = file.mimetype;
    let products = [];

    try {
        if (fileType === 'application/json') {
            const fileData = fs.readFileSync(file.path, 'utf-8');
            products = JSON.parse(fileData);
        } else if (fileType === 'text/csv') {
            products = await new Promise((resolve, reject) => {
                const results = [];
                fs.createReadStream(file.path)
                    .pipe(csvParser())
                    .on('data', (data) => results.push(data))
                    .on('end', () => resolve(results))
                    .on('error', (err) => reject(err));
            });
        } else {
            throw new Error('Invalid file format. Only JSON and CSV are supported.');
        }

        console.log('Parsed Products:', products);

        // Add products to the database
        await addProductsToDB(products);

        return { message: 'Products uploaded successfully.' };
    } catch (error) {
        console.error('Error processing file upload:', error);
        throw error;
    } finally {
        // Clean up uploaded file
        fs.unlinkSync(file.path);
    }
}

module.exports = { handleFileUpload };
