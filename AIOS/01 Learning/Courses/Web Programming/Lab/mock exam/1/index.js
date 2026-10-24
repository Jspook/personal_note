const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const API = 'http://localhost:4000';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// TODO 1: serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));
// TODO 1: GET /about -> send public/about.html
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
// TODO 3,4,6,7: GET /  -> fetch `${API}/pandas` (+ ?species= from req.query), render 'index'
// pass { pandas, species, stats, error } to the view

app.get('/',async (req,res)=>{
    const species = req.query.species || '';
    const url = species ? `${API}/pandas?species=${species}` : `${API}/pandas`;
    try{
        const response = await fetch(url);
        if (!response.ok){
            throw new Error('Failed to fetch pandas');
        }
        const pandas = await response.json();
        const total = pandas.length;
        const totalAge = pandas.reduce((sum, panda) => sum + panda.age, 0);
        const stats = {total , avgAge:total ? (totalAge / total).toFixed(1): '0.0'};
        res.render('index',{pandas,species,stats,error:null});
    } catch (error) {
        console.error(error.message);
        res.render('index',{pandas: [],species,stats:null,error:'Cannot load pandas. Please try again later.'});
    }
})
// TODO 5: GET /panda/:id -> fetch `${API}/panda/${id}`
//   response not ok (404) -> res.status(404).render('detail', { panda: null })
//   success -> render 'detail' with { panda }
app.get('/panda/:id', async (req, res) => {
    const response = await fetch(`${API}/panda/${req.params.id}`);
    if (!response.ok){
        return res.status(404).render('detail',{panda:null});
    }
    const panda = await response.json();
    res.render('detail',{panda});
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
