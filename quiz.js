/** =========================
 * Sample Quiz Data (10 Questions)
 * ========================= */
const quizData = {
    "CS-230": {
        "2": [
        //  { question: here |                      | 4 options |       |correct option |        |why its correct|
        //  { question: "What is ...?", options: ["1", "2", "3", "4"], answer: "3", note: "becuase 3 is the correct ." },
            { question: "What is the main principle of OOP?", options: ["Encapsulation", "Looping", "Recursion", "Compilation"], answer: "Encapsulation", note: "Encapsulation ensures that data is hidden from outside access and can only be modified through methods." },
            { question: "Which keyword is used to create a class in Java?", options: ["define", "struct", "class", "object"], answer: "class", note: "The 'class' keyword is used to define a class in Java." },
            { question: "What does 'super' refer to in Java?", options: ["A superclass constructor", "A local variable", "A static method", "An abstract class"], answer: "A superclass constructor", note: "'super' is used to call the parent class constructor." },
            { question: "Which concept allows methods with the same name but different parameters?", options: ["Polymorphism", "Inheritance", "Encapsulation", "Abstraction"], answer: "Polymorphism", note: "Polymorphism enables multiple methods with the same name but different signatures." },
            { question: "Which access modifier restricts access to only within the same class?", options: ["public", "private", "protected", "default"], answer: "private", note: "The 'private' modifier ensures that the variable or method is only accessible within the class." },
            { question: "Which keyword is used to create an object?", options: ["create", "construct", "new", "instantiate"], answer: "new", note: "The 'new' keyword is used to allocate memory and create a new object in Java." },
            { question: "Which feature of OOP allows a class to inherit properties from another class?", options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"], answer: "Inheritance", note: "Inheritance allows a class to acquire properties and behaviors from another class." },
            { question: "Which type of class cannot be instantiated?", options: ["Static", "Abstract", "Final", "Public"], answer: "Abstract", note: "Abstract classes cannot be instantiated and must be extended by other classes." },
            { question: "Which of the following is NOT an OOP principle?", options: ["Encapsulation", "Looping", "Polymorphism", "Abstraction"], answer: "Looping", note: "Looping is a control flow concept, not an OOP principle." },
            { question: "What is the default value of a boolean variable in Java?", options: ["true", "false", "null", "0"], answer: "false", note: "By default, a boolean variable is initialized to 'false' in Java." }
        ]
    }
};

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

/** =========================
 * Initialize Quiz Page
 * ========================= */
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("course");
    const week = params.get("week");

    if (!quizData[courseId] || !quizData[courseId][week]) {
        document.getElementById("quiz-content").innerHTML = `<h2>No Quiz Available for this Course and Week.</h2>`;
        return;
    }

    document.getElementById("quiz-title").textContent = `Quiz for ${courseId} - Week ${week}`;
    questions = quizData[courseId][week];
    showQuestion();
});

/** =========================
 * Display Current Question
 * ========================= */
function showQuestion() {
    if (currentQuestionIndex >= questions.length) return showScore();

    const quizContent = document.getElementById("quiz-content");
    const question = questions[currentQuestionIndex];

    quizContent.innerHTML = `
        <div class="question-box">
            <p><strong>${currentQuestionIndex + 1}. ${question.question}</strong></p>
            <div class="options-container">
                ${question.options.map(option => `
                    <label class="option-box">
                        <input type="radio" name="question" value="${option}">
                        ${option}
                    </label>
                `).join('')}
            </div>
            <button id="submit-answer">Submit</button>
            <button id="next-question" style="display:none;">Next</button>
            <div id="feedback" class="explanation-box" style="display:none;"></div>
        </div>
    `;

    document.getElementById("submit-answer").addEventListener("click", checkAnswer);
}

/** =========================
 * Check Answer
 * ========================= */
function checkAnswer() {
    const selectedOption = document.querySelector(`input[name="question"]:checked`);
    if (!selectedOption) return alert("Please select an answer!");

    const userAnswer = selectedOption.value;
    const correctAnswer = questions[currentQuestionIndex].answer;
    const feedback = document.getElementById("feedback");

    const allOptions = document.querySelectorAll(".option-box");
    
    let correctOptionElement = null;

    allOptions.forEach(option => {
        const input = option.querySelector("input");
        option.style.pointerEvents = "none"; // Disable selection after submitting

        if (input.value === correctAnswer) {
            option.classList.add("correct-answer"); // ✅ Green highlight for correct answer
            correctOptionElement = option;
        }
        
        if (input.value === userAnswer) {
            if (userAnswer === correctAnswer) {
                feedback.textContent = "Correct ✅";
                score++;
            } else {
                feedback.textContent = `Incorrect ❌`;
                option.classList.add("wrong-answer"); // ❌ Red highlight for wrong answer
            }
        }
    });

    // Show the explanation
    feedback.textContent += `\n${questions[currentQuestionIndex].note}`;
    feedback.style.display = "block";

    document.getElementById("submit-answer").style.display = "none";
    document.getElementById("next-question").style.display = "inline-block";

    document.getElementById("next-question").addEventListener("click", function () {
        currentQuestionIndex++;
        showQuestion();
    });
}

/** =========================
 * Show Final Score
 * ========================= */
function showScore() {
    const quizContent = document.getElementById("quiz-content");
    const passThreshold = Math.ceil(questions.length * 0.8);
    const pass = score >= passThreshold;

    quizContent.innerHTML = `
        <div class="score-box">
            <h2>Quiz Completed!</h2>
            <p>Your Score: ${score} / ${questions.length}</p>
            <p class="${pass ? 'pass-message' : 'fail-message'}">${pass ? 'You Passed 🎉' : 'You Failed ❌'}</p>
            <button onclick="restartQuiz()">Try Again</button>
            <button onclick="goToChapter()">Back to Course Page</button>
        </div>
    `;
}

/** =========================
 * Restart Quiz
 * ========================= */
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

/** =========================
 * Go to Chapter Page
 * ========================= */
function goToChapter() {
    window.location.href = `chapters_page.html?course=CS-230`;
}
