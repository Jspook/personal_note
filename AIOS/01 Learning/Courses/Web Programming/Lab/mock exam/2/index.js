const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3002;

const db = new sqlite3.Database(path.join(__dirname, 'keepers.db'), err => {
    if (err) console.error(err.message);
    else console.log('Connected to keepers.db');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO 1,6: GET /  -> SELECT keepers (optionally WHERE zoo = ?), SUM(salary), DISTINCT zoo; render 'index'
app.get('/', (req, res) => {
    const zoo = req.query.zoo || '';
    const where = zoo ? ' WHERE zoo = ?' : '';
    const params = zoo ? [zoo] : [];

    db.all(`SELECT * FROM keepers${where} ORDER BY id`, params, (err, keepers) => {
        if (err) return res.status(500).send('Database error');
        db.get(`SELECT SUM(salary) AS total FROM keepers${where}`, params, (err2, row) => {
            if (err2) return res.status(500).send('Database error');
            db.all('SELECT DISTINCT zoo FROM keepers ORDER BY zoo', [], (err3, zooRows) => {
                if (err3) return res.status(500).send('Database error');
                res.render('index', {
                    keepers,
                    total: row.total || 0,
                    zoos: zooRows.map(z => z.zoo),
                    zoo
                });
            });
        });
    });
});


// TODO 2: GET /add -> render 'add' with { error: null, form: {} }
app.get('/add',(req,res) => {
    res.render('add',{error:null,form:{}});
});
// TODO 2: POST /add -> validate, INSERT with placeholders, redirect('/'); invalid -> 400 + render 'add' with error
app.post('/add', (req,res) => {
    const {name ,zoo,role,salary} = req.body;
    const salaryNum = Number(salary);

    if (!name || !name.trim() || salary === '' || isNaN(salaryNum) || salaryNum < 0) {
        return res.status(400).render('add' , {
            error : 'Name is required and salary must be a non-negative number',
            form:req.body
        });
    }

    db.run(
        'insert into keepers (name,zoo,role,salary) values (?,?,?,?)',
        [name.trim(), zoo, role, salaryNum],
        function (err) {
            if (err) return res.status(500).send('Database error');
            res.redirect('/');
        })
})
// TODO 3: GET /edit/:id -> SELECT one (404 if missing), render 'edit'
app.get('/edit/:id', (req, res) => {
    db.get('select * from keepers where id = ?', [req.params.id],(err,keeper) => {
        if (err) return res.status(500).send('Database error');
        if (!keeper) return res.status(404).send('Keeper not found');
        res.render('edit',{keeper});
    })
});
// TODO 3: POST /edit/:id -> UPDATE, redirect('/')
app.post('/edit/:id' , (req, res) => {
    const {name , zoo ,role ,salary} = req.body;
    db.run(
        'update keepers set name = ?, zoo = ?, role = ?, salary = ? where id = ?',
        [name, zoo, role, Number(salary), req.params.id],
        function (err) {
            if (err) return res.status(500).send('Database error');
            res.redirect('/');
        }
    );
});
// TODO 4: POST /delete/:id -> DELETE, redirect('/')
app.post('/delete/:id', (req, res) => {
    db.run('delete from keepers where id = ?' , [req.params.id] , function (err) {
        if (err) return res.status(500).send('Database error')
        res.redirect('/');
    })
});
// TODO 5: enable CORS for /api/* only, then GET /api/keepers and GET /api/keepers/:id (404 JSON if missing)
app.use("/api" , cors());
app.get('/api/keepers' , (req,res) => {
    db.all("select * from keepers", [], (err,rows) => {
        if (err) return res.status(500).json({error:'Database error'});
        res.json(rows);
    });
});
app.get('/api/keepers/:id', (req, res) => {
    db.get("select * from keepers where id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({error:'Database error'});
        if (!row) return res.status(404).json({error:'Keeper not found'});
        res.json(row);
    });
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
