const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require('path');
const PORT = 3000;
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key-for-your-store', 
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 10 * 60000 } 
}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database('./phones.db');

app.get('/', (req, res) => res.redirect('/menu'));

app.get('/menu', (req, res) => {   
  db.all(`SELECT * FROM phones`, [], (err, rows) => {
    if (err) return res.status(500).send("Database error");
    res.render('showproducts', { data: rows });
  });
});

app.get('/add-to-cart/:item', (req, res) => {
    const item = req.params.item;
    if (!req.session.cart) {
        req.session.cart = [];
    }
    req.session.cart.push(item);
    res.redirect('/menu');
});

app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
        return res.render('showcart', { data: [], totalPrice: 0 });
    }

    const counts = {};
    cart.forEach(id => {
        counts[id] = (counts[id] || 0) + 1;
    });

    const uniqueIds = Object.keys(counts);
    const placeholders = uniqueIds.map(() => '?').join(',');
    const query = `SELECT * FROM phones WHERE id IN (${placeholders})`;

    db.all(query, uniqueIds, (err, rows) => {
        if (err) return res.status(500).send("Database error");

        let totalPrice = 0;

        const cartItems = rows.map(item => {
            const quantity = counts[item.id] || 0;
            const subtotal = item.price * quantity;
            totalPrice += subtotal;

            return {
                ...item,
                quantity: quantity,
                subtotal: subtotal
            };
        });

        res.render('showcart', { data: cartItems, totalPrice: totalPrice });
    });
});

app.get('/clear-cart', (req, res) => {
    req.session.cart = [];
    res.redirect('/menu');
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));