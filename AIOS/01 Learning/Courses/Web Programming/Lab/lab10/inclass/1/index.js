const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('smartphones.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("<a herf = 'http://localhost:3000/show/'> show <a>");
});


// --- Section 2 - Creating the Web Services

app.get('/smartphones', (req, res) => {
    const query = 'SELECT * FROM smartphones ';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows));        
    });
});

app.get('/smartphones/:id', (req, res) => {
    // req.params.id
    const query = `SELECT * FROM smartphones where id = ? `;
    db.all(query,[req.params.id], (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows));       
    });
});



// --- Section 3 - Using the Web Services

app.get('/show', (req, res) => {
    const endpoint = 'http://localhost:3000/smartphones';    
    fetch(endpoint)
        .then(response => response.json())
        .then(wsdata => {
            console.log(wsdata);
            res.render('show', { data: wsdata });            
        })
        .catch(error => {
            console.log(error);
        });
});

// จาก Web Service ที่อื่น
app.get('/employees', (req, res) => {

    //  ทุกรายการ  http://webdev.it.kmitl.ac.th:4000/employees';
    //  รายละเอียด http://webdev.it.kmitl.ac.th:4000/employee/id ';
    
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/employees';    
    fetch(endpoint)
        .then(response => response.json())
        .then(emp => {
            console.log(emp);
                        
        })
        .catch(error => {
            console.log(error);
        });
});

app.listen(port, () => {
  console.log(`Starting server at port ${port}`);
});