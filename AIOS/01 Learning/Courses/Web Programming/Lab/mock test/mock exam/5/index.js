const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3005;
const API = 'http://localhost:4000';   // exam: https://my-json-server.typicode.com/bemalykuma/mockDB

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'mock-exam-5-secret',
    resave: false,
    saveUninitialized: true
}));

// TODO 1: middleware that sets res.locals.cartCount = total qty in req.session.cart (0 if none)
app.use((req, res, next) => {
    res.locals.cartCount = 0;
    next();
});

// TODO 2: GET /  -> fetch `${API}/foods`, render 'foods' with { foods, error }
app.get('/', (req, res) => {
    res.render('foods', { foods: [], error: null });
});

// TODO 3: POST /cart/add/:id -> fetch `${API}/foods/${id}`; not ok -> redirect('/');
//   push { id, name, price, qty: 1 } into req.session.cart, or qty++ if the id is already there; redirect('/')

// TODO 4: GET /cart -> render 'cart' with { cart, total }

// TODO 5: POST /cart/confirm -> move cart items into req.session.orders (merge qty by id), clear cart, redirect('/')

// TODO 6: GET /orders -> render 'orders' with { orders, total }

// TODO 7: POST /orders/pay -> clear req.session.orders, redirect('/')

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
