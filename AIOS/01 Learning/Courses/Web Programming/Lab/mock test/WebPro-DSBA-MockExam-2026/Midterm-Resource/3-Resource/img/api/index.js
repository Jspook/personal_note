const express = require('express')
const app = express()

const path = require('path');
// Serve static files from multiple directories
app.use(express.static(path.join(__dirname, '../public')));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', `${req.params.id}.jpg`));
});

module.exports = app;