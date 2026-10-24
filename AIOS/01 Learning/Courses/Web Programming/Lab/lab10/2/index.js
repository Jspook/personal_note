const express = require('express');
const app = express();
const port = 3001;
const path = require('path');

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (like CSS)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route: Main page showing all books
app.get('/', async (req, res) => {
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/books';    
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        const books = Array.isArray(data) ? data : data.data || [];
        res.render('index', { books });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.render('index', { books: [], error: 'Failed to load books. The API server might be down.' });
    }
});

app.listen(port, () => {
  console.log(`Starting server at http://localhost:${port}`);
});
