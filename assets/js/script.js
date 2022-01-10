var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var quizTimer = document.getElementById("timer");
var timeLeft = 45;

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('class')
  shuffledQuestions = quizQuestions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('class')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('class')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(t) {
  var selectedButton = t.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('class')
  } else {
    startButton.innerText = 'Go Back'
    startButton.classList.remove('class')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

var quizQuestions = [
  {
    question: "Commonly used data types do NOT include:",
    answers: [
      { text: "alerts", correct: true },
      { text: "booleans", correct: false },
      { text: "strings", correct: false },
      { text: "numbers", correct: false },
    ]
  },
  {
    question: "The condition in an if / else statement is enclosed within ____.",
    answers: [
      { text: "Curly brackets", correct: true},
      { text: "Quotes", correct: false },
      { text: "parentheses", correct: false },
      { text: "square brackets", correct: false },
    ]
  },
  {
    question: "Arrays in Javascript can be used to store ____.",
    answers: [
        { text: "Strings and numbers", correct: false },
        { text: "All answers are correct", correct: true },
        { text: "Booleans", correct: false },
        { text: "Other arrays", correct: false },
    ]
  },
  {
    question: "What does DOM stand for?",
    answers: [
        { text: "Desktop Oriented Mode", correct: false },
        { text: "Digital Ordinance Model", correct: false },
        { text: "Display Object Management", correct: false },
        { text: "Document Object Model", correct: true },
    ]
}
]

//Timer
timerInterval = setInterval(function() {
    timeLeft--;
    quizTimer.textContent = "Time remaining: " + timeLeft;

    if(timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
quizBody.style.display = "block";