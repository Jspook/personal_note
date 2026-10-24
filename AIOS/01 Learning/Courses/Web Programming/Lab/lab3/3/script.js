const students = [
    "Somchai", "Somying", "Som Sri", "Som Pong", 
    "Som Kiat", "Som Bati", "Som Rudee", "Som Jit"
];

const tbody = document.getElementById('student-table-body');
const calcBtn = document.getElementById('calc-btn');

function getRandomScore(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initTable() {
    tbody.innerHTML = '';
    
    students.forEach((name, index) => {
        const tr = document.createElement('tr');
        const score = getRandomScore(40, 100);

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${name}</td>
            <td class="score-cell">${score}</td>
            <td class="grade-cell"></td>
        `;
        tbody.appendChild(tr);
    });
}

// ฟังก์ชันคำนวณเกรด
function calculateGrades() {
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const scoreText = row.querySelector('.score-cell').textContent;
        const score = parseInt(scoreText, 10);
        const gradeCell = row.querySelector('.grade-cell');

        let grade = '';

        if (score >= 80 && score <= 100) {
            grade = 'A';
        } else if (score >= 70 && score <= 79) {
            grade = 'B';
        } else if (score >= 60 && score <= 69) {
            grade = 'C';
        } else if (score >= 50 && score <= 59) {
            grade = 'D';
        } else if (score < 50) {
            grade = 'F';
        }

        gradeCell.textContent = grade;
    });
}

window.addEventListener('DOMContentLoaded', initTable);

calcBtn.addEventListener('click', calculateGrades);