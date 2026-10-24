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

app.listen(4000, () => console.log('Mock API running at http://localhost:4000'));
