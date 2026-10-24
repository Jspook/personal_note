const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(session({
    secret: 'your-secret-key', 
    resave: false,             
    saveUninitialized: true,   
    cookie: { secure: false }  
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = {
    username: 'john',
    role: 'admin',
    preferences: { theme: 'dark', language: 'en' }
};

app.get('/', function (req, res) {
    res.send(`Welcome! Your session ID is ${req.sessionID} <br>
        <ul>
            <li><a href="/set-session">Set Session Variables</a></li>
            <li><a href="/get-session">Get Session Variables</a></li>
            <li><a href="/logout">Logout (Destroy Session)</a></li>
        </ul>
        `);
});

app.get('/set-session', (req, res) => {
    req.session.username = user.username;
    req.session.role = user.role;
    req.session.preferences = user.preferences;

    res.send('Session variables set successfully!');
});

app.get('/get-session', (req, res) => {
    if (req.session.username) {
        res.json({
            username: req.session.username,
            role: req.session.role,
            preferences: req.session.preferences
        });
    } else {
        res.send('No session variables found.');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error destroying session.');
        }
        res.send('Session destroyed successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});