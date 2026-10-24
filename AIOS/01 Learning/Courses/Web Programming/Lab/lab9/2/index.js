const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3000;

// Connect to SQLite database
const db = new Database(path.join(__dirname, 'questions.db'));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Route: Show all questions
app.get('/', (req, res) => {
    const questions = db.prepare('SELECT * FROM questions').all();
    res.render('questions', { questions, result: null });
});

// Route: Submit answers
app.post('/submit', (req, res) => {
    const questions = db.prepare('SELECT * FROM questions').all();
    const answers = req.body; // { q1: 'A', q2: 'B', ... }
    let score = 0;
    const results = questions.map(q => {
        const userAnswer = answers['q' + q.QID] || '';
        const isCorrect = userAnswer === q.Correct;
        if (isCorrect) score++;
        return {
            ...q,
            userAnswer,
            isCorrect
        };
    });
    res.render('questions', { questions: results, result: { score, total: questions.length } });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
