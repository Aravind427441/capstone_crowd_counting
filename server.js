const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5001;

app.use(cors()); // Allow CORS to handle requests from different ports

// Paths for images and predictedCount data
const outputDirectoryPath = path.join(__dirname, 'output');
const predictedCountDirectoryPath = path.join(__dirname, 'predictedCount');

// Endpoint to fetch all image filenames from the output folder
app.get('/api/images', (req, res) => {
  fs.readdir(outputDirectoryPath, (err, files) => {
    if (err) {
      console.error('Unable to scan directory:', err);
      return res.status(500).send('Unable to scan directory');
    }
    const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
    res.json(images);
  });
});

// Endpoint to fetch text data for a given image
app.get('/api/text/:imageName', (req, res) => {
    const { imageName } = req.params;
    // Remove the image extension (like .png, .jpg, etc.)
    const baseName = path.parse(imageName).name;
    const textFilePath = path.join(predictedCountDirectoryPath, `${baseName}.txt`);
    
    fs.readFile(textFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Unable to read file:', err);
        return res.status(500).send('Unable to read text file');
      }
      res.send(data); // Return the text content
    });
  });

// Serve static files for images
app.use('/output', express.static(outputDirectoryPath));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
