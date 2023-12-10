const question = [
  {
    question: "which is the largest animal in the world ?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Girrafe", correct: false },
    ],
  },

  {
    question: "which is the name of the first president of india ? ",

    answers: [
      { text: "ravindra", correct: false },
      { text: "indra gandhi", correct: false },
      { text: " churchil", correct: false },
      { text: "pt. Neharu", correct: true },
    ],
  },
  {
    question: "who is the known as the king of the jungle ? ",

    answers: [
      { text: "Lion", correct: true },
      { text: "leopard", correct: false },
      { text: " cat", correct: false },
      { text: "kangaroo", correct: false },
    ],
  },
  {
    question: "who is the known as master blaster of india  ? ",

    answers: [
      { text: "sachin", correct: true },
      { text: "dhoni", correct: false },
      { text: " veeru", correct: false },
      { text: "virat", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true ";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.displayed = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `you scored ${score} out of ${question.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < question.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < question.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
