const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3002;

const db = new sqlite3.Database(path.join(__dirname, 'keepers.db'), err => {
    if (err) console.error(err.message);
    else console.log('Connected to keepers.db');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO 1,6: GET /  -> SELECT keepers (optionally WHERE zoo = ?), SUM(salary), DISTINCT zoo; render 'index'
app.get('/', (req, res) => {
    res.render('index', { keepers: [], total: 0, zoos: [], zoo: '' });
});

// TODO 2: GET /add -> render 'add' with { error: null, form: {} }
// TODO 2: POST /add -> validate, INSERT with placeholders, redirect('/'); invalid -> 400 + render 'add' with error

// TODO 3: GET /edit/:id -> SELECT one (404 if missing), render 'edit'
// TODO 3: POST /edit/:id -> UPDATE, redirect('/')

// TODO 4: POST /delete/:id -> DELETE, redirect('/')

// TODO 5: enable CORS for /api/* only, then GET /api/keepers and GET /api/keepers/:id (404 JSON if missing)

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
