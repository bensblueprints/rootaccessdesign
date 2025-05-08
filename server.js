// Simple Express server to serve static files
const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

// Serve static files from the current directory
app.use(express.static('.'));

// Route to serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve the meet-up page
app.get('/meet-up', (req, res) => {
  res.sendFile(path.join(__dirname, 'meet-up.html'));
});

// Route to serve the course materials page
app.get('/course-materials', (req, res) => {
  res.sendFile(path.join(__dirname, 'course-materials.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Meet-up page available at http://localhost:${PORT}/meet-up.html`);
  console.log(`Course materials available at http://localhost:${PORT}/course-materials.html`);
}); 