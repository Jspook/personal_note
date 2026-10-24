const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3003;
const API = 'http://localhost:4000';

const db = new sqlite3.Database(path.join(__dirname, 'users.db'), err => {
    if (err) console.error(err.message);
    else console.log('Connected to users.db');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'mock-exam-3-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

// TODO 4: requireLogin middleware (no req.session.user -> redirect('/login'))

app.get('/', (req, res) => res.redirect('/dashboard'));

// TODO 1: GET /login -> render 'login' with { error: null, username: <remember_username cookie or ''>, remember: <boolean> }
app.get('/login', (req, res) => {
    res.render('login', { error: null, username: '', remember: false });
});

// TODO 2,3: POST /login -> attempts counter, SELECT user WHERE username = ? AND password = ?,
//   success: session.user, remember_username cookie (or clearCookie), last_login cookie, redirect('/dashboard')
//   fail: 401 render 'login'; 3 fails -> 429

// TODO 5: GET /dashboard (requireLogin) -> render 'dashboard' with { user, visits, lastLogin }

// TODO 6: GET /adopt/:id, GET /adopt, POST /adopt/confirm (all requireLogin)

// TODO 7: GET /logout

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
