var currentQuestionIndex = 0;
var time = questions.length * 12;
var timerId;
// variables to reference DOM elements
var timerEl = document.querySelector('#time');
var choicesEl = document.querySelector('#choices');
var questionsEl = document.querySelector('#questions');
var submitBtn = document.querySelector('#submit');
var startBtn = document.querySelector('#start');
var feedbackEl = document.querySelector('#feedback');
var initialsEl = document.querySelector('#initials');
function startQuiz() {
  // invisible start screen
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class', 'hide');
  // unhide questions section
  questionsEl.removeAttribute('class');
  // set the interval timer
  timerId = setInterval(clockTick, 1000);
  //  starting time
  timerEl.textContent = time;
  getQuestion();
}
function getQuestion() {
  //  question object from array
  var currentQuestion = questions[0];
  // update title
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title;
  // clean out old question
  choicesEl.innerHTML = '';
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // create new button for each choice
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);
    choiceNode.textContent = i + 1 + '. ' + choice;
    // show on the page
    choicesEl.appendChild(choiceNode);
  }
}
function questionClick(event) {
  var buttonEl = event.target;
  // do nothing if the clicked element is not a choice button.
  if (!buttonEl.matches('.choice')) {
    return;
  }
  // select if user guessed wrong
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    // reduce time for wrong answers.
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    // show new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = 'Wrong!';
  } else {
    feedbackEl.textContent = 'Correct!';
  }
  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 1000);
  // move to next question
  currentQuestionIndex++;
  // check if we've run out of questions
  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}
function quizEnd() {
  clearInterval(timerId);
  // show end screen
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');
  // show final score
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;
  // hide questions section
  questionsEl.setAttribute('class', 'hide');
}
function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;
  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}
function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();
  // make sure value wasn't empty
  if (initials !== '') {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];
    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };
    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
    // redirect to next page
    window.location.href = 'highscores.html';
  }
}
function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === 'Enter') {
    saveHighscore();
  }
}
// user clicks button to submit initials
submitBtn.onclick = saveHighscore;
// user clicks button to start quiz
startBtn.onclick = startQuiz;
// user clicks on element containing choices
choicesEl.onclick = questionClick;
initialsEl.onkeyup = checkForEnter;  