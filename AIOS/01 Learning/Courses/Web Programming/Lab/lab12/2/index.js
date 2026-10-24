const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'restaurant-session-secret-key-kmitl',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const API_ALL_ITEMS = 'http://webdev.it.kmitl.ac.th:4000/restaurant';
const API_DETAIL_ITEM = 'http://webdev.it.kmitl.ac.th:4000/detail/';

// 1. Menu Page - Display all restaurant food items
app.get('/', (req, res) => res.redirect('/menu'));

app.get('/menu', async (req, res) => {
    try {
        const response = await fetch(API_ALL_ITEMS);
        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }
        const items = await response.json();
        const cartCount = req.session.cart ? req.session.cart.length : 0;
        res.render('menu', { items, cartCount });
    } catch (error) {
        console.error('Error fetching menu items:', error.message);
        res.render('menu', { items: [], cartCount: 0, error: 'Could not load menu items.' });
    }
});

// 2. (A) Add item to cart using detail REST API
app.get('/add-to-cart/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await fetch(`${API_DETAIL_ITEM}${id}`);
        if (!response.ok) {
            throw new Error(`Detail API responded with status: ${response.status}`);
        }
        const item = await response.json();

        if (!req.session.cart) {
            req.session.cart = [];
        }

        req.session.cart.push({
            product_id: item.product_id,
            name: item.name,
            price: Number(item.price) || 0,
            qty: 1
        });

        res.redirect('/menu');
    } catch (error) {
        console.error(`Error adding item ${id} to cart:`, error.message);
        res.redirect('/menu');
    }
});

// 3. (B) Show items in cart and calculate total price
app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    const totalPrice = cart.reduce((total, item) => total + (item.price * (item.qty || 1)), 0);
    const message = req.query.confirmed ? 'Order confirmed successfully! Your cart has been reset.' : null;
    res.render('cart', { cart, totalPrice, message });
});

// 4. (C) Confirm order: clear all items in cart and allow re-ordering
app.post('/confirm', (req, res) => {
    req.session.cart = [];
    res.redirect('/cart?confirmed=true');
});

app.get('/confirm-order', (req, res) => {
    req.session.cart = [];
    res.redirect('/cart?confirmed=true');
});

// Clear cart route
app.get('/clear-cart', (req, res) => {
    req.session.cart = [];
    res.redirect('/cart');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
