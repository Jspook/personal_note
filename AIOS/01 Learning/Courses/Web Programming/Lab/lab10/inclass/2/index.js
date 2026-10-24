const express = require("express");
const path = require("path");
const port = 3000;

// Creating the Express server
const app = express();

// Static resource & templating engine
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello! REST API");
});

// --- Section 3 - Using the Web Services

app.get('/employees', (req, res) => {
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/employees';    
    fetch(endpoint)
        .then(response => response.json())
        .then(emp => {
            console.log("Employees Data:", emp);
            res.render('show', { employees: emp });         
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            res.status(500).send("Error fetching employee data");
        });
});

app.listen(port, () => {
  console.log(`Starting server at port ${port}`);
});