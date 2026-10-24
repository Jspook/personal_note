const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3000;

// Connect to SQLite database
const db = new Database(path.join(__dirname, 'userdata.db'));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route: Users List
app.get('/', (req, res) => {
    const users = db.prepare('SELECT * FROM users').all();
    res.render('users', { users });
});

// Route: User Detail
app.get('/user/:id', (req, res) => {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.render('detail', { user });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
