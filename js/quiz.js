const questionNumber = document.getElementById("question-number");
const progress = document.getElementById("progress");
const questionText = document.getElementById("question-text");
const answers = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const quizCard = document.getElementById("quiz-card");

const result = document.getElementById("result");
const careerResult = document.getElementById("career-result");
const careerDescription = document.getElementById("career-description");

const questions = [
    {
        question: "Which subject do you enjoy the most?",
        answers: [
            { text: "Mathematics", career: "Technology" },
            { text: "Biology", career: "Medicine" },
            { text: "Business Studies", career: "Business" },
            { text: "Art", career: "Arts" }
        ]
    },
    {
        question: "What type of problem do you enjoy solving?",
        answers: [
            { text: "Programming problems", career: "Technology" },
            { text: "Helping patients", career: "Medicine" },
            { text: "Managing money", career: "Business" },
            { text: "Designing buildings", career: "Engineering" }
        ]
    },
    {
        question: "Which activity sounds most interesting?",
        answers: [
            { text: "Building apps", career: "Technology" },
            { text: "Treating illnesses", career: "Medicine" },
            { text: "Starting a company", career: "Business" },
            { text: "Creating artwork", career: "Arts" }
        ]
    },
    {
        question: "Which skill best describes you?",
        answers: [
            { text: "Logical thinking", career: "Technology" },
            { text: "Compassion", career: "Medicine" },
            { text: "Leadership", career: "Business" },
            { text: "Creativity", career: "Arts" }
        ]
    },
    {
        question: "Where would you enjoy working?",
        answers: [
            { text: "Tech company", career: "Technology" },
            { text: "Hospital", career: "Medicine" },
            { text: "Corporate office", career: "Business" },
            { text: "Design studio", career: "Arts" }
        ]
    }
];

let currentQuestion = 0;
let selectedCareer = "";

const scores = {
    Technology: 0,
    Medicine: 0,
    Business: 0,
    Engineering: 0,
    Arts: 0
};

function loadQuestion() {

    const question = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    progress.textContent =
        `${Math.round(((currentQuestion + 1) / questions.length) * 100)}%`;

    questionText.textContent = question.question;

    answers.innerHTML = "";

    for (let i = 0; i < question.answers.length; i++) {

        const answer = question.answers[i];

        const button = document.createElement("button");

        button.textContent = answer.text;

        button.className =
            "answer-btn w-full text-left border rounded-lg px-5 py-4 hover:bg-indigo-50 transition";

        button.dataset.career = answer.career;

        answers.appendChild(button);

    }

}

loadQuestion();
answers.addEventListener("click", function (event) {

    if (!event.target.classList.contains("answer-btn")) {
        return;
    }

    const buttons = document.querySelectorAll(".answer-btn");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("bg-indigo-600");
        buttons[i].classList.remove("text-white");
    }

    event.target.classList.add("bg-indigo-600");
    event.target.classList.add("text-white");

    selectedCareer = event.target.dataset.career;

});

nextBtn.addEventListener("click", function () {

    if (selectedCareer === "") {
        alert("Please select an answer.");
        return;
    }

    scores[selectedCareer]++;

    selectedCareer = "";

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

});
function showResult() {

    let highestCategory = "";
    let highestScore = -1;

    for (const category in scores) {

        if (scores[category] > highestScore) {

            highestScore = scores[category];
            highestCategory = category;

        }

    }

    let careerName = "";
    let description = "";

    if (highestCategory === "Technology") {
        careerName = "Software Engineer";
        description = "You enjoy solving problems, working with technology and building digital solutions.";
    }

    if (highestCategory === "Medicine") {
        careerName = "Doctor";
        description = "You enjoy helping people, understanding science and improving lives.";
    }

    if (highestCategory === "Business") {
        careerName = "Business Manager";
        description = "You enjoy leadership, entrepreneurship and making strategic decisions.";
    }

    if (highestCategory === "Engineering") {
        careerName = "Civil Engineer";
        description = "You enjoy designing structures and solving practical engineering problems.";
    }

    if (highestCategory === "Arts") {
        careerName = "Graphic Designer";
        description = "You enjoy creativity, visual communication and expressing ideas through design.";
    }

     quizCard.classList.add("hidden");

    result.classList.remove("hidden");

    careerResult.textContent = careerName;

    careerDescription.textContent = description;

}

function restartQuiz() {

    currentQuestion = 0;

    selectedCareer = "";

    scores.Technology = 0;
    scores.Medicine = 0;
    scores.Business = 0;
    scores.Engineering = 0;
    scores.Arts = 0;

    quizCard.classList.remove("hidden");

    result.classList.add("hidden");

    loadQuestion();

}

window.addEventListener("load", function () {

    loadQuestion();

});