// Import required modules
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;


app.use(cookieParser());

app.get('/', function (req, res) {
    res.send(`Welcome! <br>
        <ul>
            <li><a href="/set-cookie">Set Cookie</a></li>
            <li><a href="/get-cookie">Get Cookie</a></li>
            <li><a href="/clear-cookie">Clear Cookie</a></li>
        </ul>
        `);
});

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
    try {
        // Basic cookie
        res.cookie('username', 'webdev-admin', {
            maxAge: 1000 * 60 * 60, 
            httpOnly: true,         
            secure: false          
        });   

        res.send('Cookies have been set!');
    } catch (err) {
        console.error('Error setting cookie:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to read cookies
app.get('/get-cookie', (req, res) => {
    try { 
        res.send('Hello ' + req.cookies.username );
    } catch (err) {
        console.error('Error reading cookies:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/clear-cookie', (req, res) => {
    
    res.clearCookie('username', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
    });
    res.send('Cookie has been cleared.');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});