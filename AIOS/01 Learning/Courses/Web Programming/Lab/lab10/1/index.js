const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (like CSS)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route: Main page showing all products
app.get('/', async (req, res) => {
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/restaurant';    
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        const products = Array.isArray(data) ? data : data.data || [];
        res.render('index', { products });
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.render('index', { products: [], error: 'Failed to load products' });
    }
});

// Route: Detail page showing one product
app.get('/detail/:id', async (req, res) => {
    const endpoint = `http://webdev.it.kmitl.ac.th:4000/detail/${req.params.id}`;    
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        const product = Array.isArray(data) ? data[0] : data;
        res.render('detail', { product });
    } catch (error) {
        console.error('Error fetching details:', error);
        res.status(500).send('Error loading product details');
    }
});

app.listen(port, () => {
  console.log(`Starting server at http://localhost:${port}`);
});
