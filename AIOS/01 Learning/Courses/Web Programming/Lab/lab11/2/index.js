const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3001;

// Setup Database
const db = new sqlite3.Database('./inventory.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the inventory database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price INTEGER NOT NULL
    )`);

    // Insert 5 initial sample products if table is empty
    db.get("SELECT COUNT(*) AS count FROM products", (err, row) => {
        if (row && row.count === 0) {
            const stmt = db.prepare("INSERT INTO products (name, category, price) VALUES (?, ?, ?)");
            stmt.run("logitech g noob", "เมาส์", 4000);
            stmt.run("HyperV Cloud AWS II", "หูฟัง", 890);
            stmt.run("Ajuzz AK47 V2", "คีย์บอร์ด", 1999);
            stmt.run("Dell UltraSharp 27", "จอภาพ", 12500);
            stmt.run("Ergotron HX Desk Monitor Arm", "อุปกรณ์เสริม", 8900);
            stmt.finalize();
        }
    });
});

// App configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render('index', { products: rows });
    });
});

app.post('/add', (req, res) => {
    const { name, category, price } = req.body;
    db.run(`INSERT INTO products (name, category, price) VALUES (?, ?, ?)`, 
        [name, category, price], 
        function(err) {
            if (err) {
                return console.log(err.message);
            }
            res.redirect('/');
        }
    );
});

app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM products WHERE id = ?`, id, function(err) {
        if (err) {
            return console.log(err.message);
        }
        res.redirect('/');
    });
});

app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
        if (err) {
            return console.log(err.message);
        }
        res.render('edit', { product: row });
    });
});

app.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, category, price } = req.body;
    db.run(`UPDATE products SET name = ?, category = ?, price = ? WHERE id = ?`, 
        [name, category, price, id], 
        function(err) {
            if (err) {
                return console.log(err.message);
            }
            res.redirect('/');
        }
    );
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
