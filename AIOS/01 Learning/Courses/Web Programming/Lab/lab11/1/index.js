const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Setup Database
const db = new sqlite3.Database('./todos.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the todos database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        deadline TEXT,
        completed INTEGER DEFAULT 0
    )`);
});

// App configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // will fix this typo, __dirname
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    db.all("SELECT * FROM todos", [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render('index', { todos: rows });
    });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { title, description, deadline } = req.body;
    db.run(`INSERT INTO todos (title, description, deadline, completed) VALUES (?, ?, ?, ?)`, 
        [title, description, deadline, 0], 
        function(err) {
            if (err) {
                return console.log(err.message);
            }
            res.redirect('/');
        }
    );
});

app.post('/toggle/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body; // should be sent from frontend, e.g., '1' or '0'
    db.run(`UPDATE todos SET completed = ? WHERE id = ?`, [completed, id], function(err) {
        if (err) {
            return console.log(err.message);
        }
        res.redirect('/');
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
