const quizContainer = document.getElementById("quiz");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

let questions = [];

// โหลดข้อมูลจาก JSON
async function loadQuestions() {

        const response = await fetch("questionAnswerData.json");
        questions = await response.json();
        console.log(questions);
        createQuiz();

}

// สร้างแบบทดสอบ
function createQuiz() {

    questions.forEach((question, index) => {

        // Question Container
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");


        // Question
        const questionTitle = document.createElement("h2");

        questionTitle.append(
            `${index + 1}. ${question.question}`
        );

        questionDiv.append(questionTitle);


        // Answer Container
        const answersDiv = document.createElement("div");
        answersDiv.classList.add("answers");


        // สร้างตัวเลือก A
        const answerA = createAnswer(
            index,
            "A",
            question.answers.a
        );

        answersDiv.append(answerA);


        // สร้างตัวเลือก B
        const answerB = createAnswer(
            index,
            "B",
            question.answers.b
        );

        answersDiv.append(answerB);


        // สร้างตัวเลือก C
        const answerC = createAnswer(
            index,
            "C",
            question.answers.c
        );

        answersDiv.append(answerC);


        // เพิ่มตัวเลือกเข้า Question
        questionDiv.append(answersDiv);


        // เพิ่ม Question เข้า Quiz
        quizContainer.append(questionDiv);

    });

}


// สร้าง Answer
function createAnswer(index, value, answerText) {

    const label = document.createElement("label");

    label.classList.add("answer");


    // Radio Button
    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = `question${index}`;
    radio.value = value;


    // ตัวอักษร A / B / C
    const answerLabel = document.createTextNode(
        `${value}. ${answerText}`
    );


    // เพิ่ม Radio + ข้อความเข้า Label
    label.append(
        radio,
        answerLabel
    );


    return label;

}


// ตรวจคำตอบ
submitBtn.addEventListener("click", () => {

    let score = 0;
    let answered = 0;


    questions.forEach((question, index) => {

        const selected = document.querySelector(
            `input[name="question${index}"]:checked`
        );


        if (selected) {

            answered++;


            if (
                selected.value ===
                question.answers.correct
            ) {

                score++;

            }

        }

    });


    // ล้างผลลัพธ์เก่า
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }


    // Score
    const scoreText = document.createElement("p");

    scoreText.append(
        `Score: ${score} / ${questions.length}`
    );


    // Answered
    const answeredText = document.createElement("p");

    answeredText.append(
        `Answered: ${answered} / ${questions.length}`
    );


    // เพิ่มผลลัพธ์
    result.append(
        scoreText,
        answeredText
    );

});

loadQuestions();