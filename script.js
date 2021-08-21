var questionsInput = document.getElementById('question');
var choices = document.getElementById('choices');
var initials = document.getElementById('initials');
var submitButton = document.getElementById('submitScore');
var startButton = document.getElementById('startButton');
var timeleft = 100;
var penalty = 10;
var questionCount = 0;
var newUL = document.createElement('ul');
var score = 0;
var timerEl = document.getElementById('timer');
var finalScore = document.getElementById('final-score');

var questions = [
  {
    title: 'Which major social media company invented Bootstrap?',
    choices: ['Facebook', 'Twitter', 'Instagram', 'mySpace'],
    answer: 'Twitter',
  },

  {
    title: 'Which of these is not a 3rd Party API?',
    choices: [
      'Bootstrap',
      'JStrapper',
      'jQuery',
      'All of these are 3rd Party APIs',
    ],
    answer: 'JStrapper',
  },

  {
    title: 'Properties in a JavaScript oject are often refferred to as what?',
    choices: [
      'dot walking',
      'key-value pairs',
      'nested properties',
      'undefined',
    ],
    answer: 'key-value pairs',
  },

  {
    title: 'Which array method inserts an element at the end of the array?',
    choices: ['.pop()', '.push()', '.length', '.join()'],
    answer: '.push()',
  },

  {
    title: 'What does the "this" keyword refer to?',
    choices: [
      'a function that accepts an array as an argument',
      'a function that performs an HTTP request',
      'a data type similar to a string or a boolean',
      'the object from which the function was called',
    ],
    answer: 'the object from which the function was called',
  },
];

startButton.addEventListener('click', startQuiz);

function startTimer() {
  var timer = setInterval(function timerFunction() {
    timerEl.innerText = timeleft + ' seconds remaining';
    timeleft--;
    if (timeleft <= -2 || questionCount === questions.length) {
      timerEl.innerHTML = '';
      questionsInput.style.display = 'none';
      choices.style.display = 'none';
      initials.style.display = 'block';
      submitScore.style.display = 'block';
      clearInterval(timer);
      showScore();
    }
  }, 1000);
}

function startQuestions() {
  questionsInput.innerHTML = '';
  newUL.innerHTML = '';

  for (var i = 0; i < questions.length; i++) {
    var userQuestion = questions[questionCount].title;
    var userChoices = questions[questionCount].choices;
    questionsInput.textContent = userQuestion;
  }

  userChoices.forEach(function (newItem) {
    var listItem = document.createElement('button');
    listItem.classList.add('btn-primary');
    listItem.classList.add('btn');
    listItem.classList.add('m-3');
    listItem.textContent = newItem;
    questionsInput.appendChild(newUL);
    newUL.appendChild(listItem);
    listItem.addEventListener('click', compare);
  });
}

function compare(event) {
  var element = event.target;

  if (element.matches('button')) {
    var createDiv = document.createElement('button');
    createDiv.setAttribute('id', 'createDiv');
    if (element.textContent == questions[questionCount].answer) {
      score += timeleft;
    } else {
      timeleft = timeleft - penalty;
      score = score - penalty;
    }
  }
  questionCount++;

  if (questionCount >= questions.length) {
    showScore();
  } else {
    startQuestions(questionCount);
  }
}

function showScore() {
  finalScore.style.display = 'block';
  finalScore.innerHTML = 'Final Score: ' + score;
  console.log(finalScore.innerHTML);
}

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

function saveHighScore() {
  var score = {
    score: finalScore.innerHTML,
    name: initials.value,
  };
  highScores.push(score);
  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('highscore.html');
}

submitButton.addEventListener('click', saveHighScore);

function startQuiz() {
  startButton.style.display = 'none';
  startTimer();
  startQuestions();
}
