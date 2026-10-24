const express = require('express');
const app = express();
const path = require('path');
const conn = require('./database');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Route to get all albums
app.get('/api/albums', (req, res) => {
    conn.query('SELECT * FROM albums ORDER BY id ASC', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
