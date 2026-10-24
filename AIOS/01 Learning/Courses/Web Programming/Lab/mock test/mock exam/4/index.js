const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3004;

const db = new sqlite3.Database(path.join(__dirname, 'saleamount.db'), err => {
    if (err) console.error(err.message);
    else console.log('Connected to saleamount.db');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// TODO 1,2,3,6: GET /  -> SELECT * FROM products, compute total / ratio per row and grandTotal
// render 'index' with { rows, grandTotal }; each row needs { id, name, price, items_sold, total, ratio }
app.get('/', (req, res) => {
    res.render('index', { rows: [], grandTotal: 0 });
});

// TODO 4: GET /edit/:id -> SELECT one (404 if missing), render 'edit' with { product, error: null }
// TODO 4,5: POST /edit/:id -> validate price & items_sold (integer >= 0, else 400), UPDATE, redirect('/')

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
