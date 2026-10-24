// server.js - Express server สำหรับ Bookstore Management
const express = require('express');
const app = express();
const path = require('path');
const conn = require('./database');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============ API Routes ============

// GET - ดึงข้อมูลหนังสือทั้งหมด
app.get('/api/books', (req, res) => {
    conn.query('SELECT * FROM books ORDER BY id ASC', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// GET - ดึงข้อมูลหนังสือตาม id
app.get('/api/books/:id', (req, res) => {
    conn.query('SELECT * FROM books WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(results[0]);
    });
});

// POST - เพิ่มหนังสือใหม่
app.post('/api/books', (req, res) => {
    const { id, title, author, category, price, quantity } = req.body;
    const sql = 'INSERT INTO books (id, title, author, category, price, quantity) VALUES (?, ?, ?, ?, ?, ?)';
    conn.query(sql, [id, title, author, category, price, quantity], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Book added successfully', id: result.insertId });
    });
});

// PUT - แก้ไขข้อมูลหนังสือ
app.put('/api/books/:id', (req, res) => {
    const { title, author, category, price, quantity } = req.body;
    const sql = 'UPDATE books SET title = ?, author = ?, category = ?, price = ?, quantity = ? WHERE id = ?';
    conn.query(sql, [title, author, category, price, quantity, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book updated successfully' });
    });
});

// DELETE - ลบหนังสือ
app.delete('/api/books/:id', (req, res) => {
    conn.query('DELETE FROM books WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
