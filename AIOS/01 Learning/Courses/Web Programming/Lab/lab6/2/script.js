const mainContainer = document.getElementById("main-content");
let student = [];

async function loadStudent() {

        const response = await fetch("student-score.json");
        student = await response.json();
        console.log(student);
        createSections();

}

function createSections() {
    const grid = document.createElement("div");
    grid.classList.add("student-grid");
    grid.id = "student-grid";

    student.forEach((students) => {

        createSection(students , grid);
    });

    mainContainer.appendChild(grid);
}

function createSection(students,grid) {
    const card = document.createElement("div");
    card.classList.add("student-card");

    const img = document.createElement("img");
    if (students.gender === "Male") {
        img.src = "img_male.png";
        img.alt = "Male Student";
    } else if (students.gender === "Female") {
        img.src = "img_female.png";
        img.alt = "Female Student";
    }

    const name = document.createElement("h3");
    name.classList.add("student-name");
    name.textContent = `${students.name}`;

    const score1 = document.createElement("h4");
    score1.textContent = `Physics: ${students.physics}`;
    const score2 = document.createElement("h4");
    score2.textContent = `Math: ${students.maths}`;
    const score3 = document.createElement("h4");
    score3.textContent = `English: ${students.english}`;

    const info = document.createElement("div");
    info.classList.add("student-info");
    info.appendChild(name);
    info.appendChild(score1);
    info.appendChild(score2);
    info.appendChild(score3);

    card.appendChild(img);
    card.appendChild(info); 

    grid.appendChild(card);
}

loadStudent();