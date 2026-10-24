const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const API = 'http://localhost:4000';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// TODO 1: serve static files from /public

// TODO 1: GET /about -> send public/about.html

// TODO 3,4,6,7: GET /  -> fetch `${API}/pandas` (+ ?species= from req.query), render 'index'
// pass { pandas, species, stats, error } to the view
app.get('/', async (req, res) => {
    res.render('index', { pandas: [], species: '', stats: null, error: null });
});

// TODO 5: GET /panda/:id -> fetch `${API}/panda/${id}`
//   response not ok (404) -> res.status(404).render('detail', { panda: null })
//   success -> render 'detail' with { panda }
app.get('/panda/:id', async (req, res) => {
    res.status(501).send('TODO');
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
