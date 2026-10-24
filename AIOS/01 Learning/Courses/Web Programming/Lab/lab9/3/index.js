const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3000;

// Connect to SQLite database
const db = new Database(path.join(__dirname, 'orders.db'));

// Create orders table if not exists
db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer TEXT NOT NULL,
        product TEXT NOT NULL,
        address TEXT NOT NULL,
        phone TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'รอดำเนินการ'
    )
`);

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Route: Show all orders
app.get('/', (req, res) => {
    const orders = db.prepare('SELECT * FROM orders').all();
    res.render('orders', { orders });
});

// Route: Add new order
app.post('/add', (req, res) => {
    const { customer, product, address, phone } = req.body;
    db.prepare('INSERT INTO orders (customer, product, address, phone, status) VALUES (?, ?, ?, ?, ?)').run(customer, product, address, phone, 'รอดำเนินการ');
    res.redirect('/');
});

// Route: Update order status
app.post('/update/:id', (req, res) => {
    const { status } = req.body;
    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
