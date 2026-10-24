// Mock REST API for the mock exam (replaces webdev.it.kmitl.ac.th:4000). Do NOT edit during the exam.
// GET /pandas             -> all pandas  (optional ?species=Giant|Red)
// GET /panda/:id          -> one panda, 404 {"error": "..."} if missing
const express = require('express');
const cors = require('cors');
const pandas = require('./pandas.json');

const app = express();
app.use(cors());

app.get('/pandas', (req, res) => {
    const { species } = req.query;
    res.json(species ? pandas.filter(p => p.species.toLowerCase() === species.toLowerCase()) : pandas);
});

app.get('/panda/:id', (req, res) => {
    const panda = pandas.find(p => p.id === Number(req.params.id));
    if (!panda) return res.status(404).json({ error: 'Panda not found' });
    res.json(panda);
});

// GET /foods              -> all foods   (same shape as my-json-server.typicode.com/bemalykuma/mockDB/foods)
// GET /foods/:id          -> one food, 404 {} if missing
const foods = require('./foods.json');

app.get('/foods', (req, res) => res.json(foods));

app.get('/foods/:id', (req, res) => {
    const food = foods.find(f => f.id === Number(req.params.id));
    if (!food) return res.status(404).json({});
    res.json(food);
});

app.listen(4000, () => console.log('Mock API running at http://localhost:4000'));
