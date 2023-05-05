//assign variables to HTML elements and declare variables
var startScreenEl = document.querySelector(".start-screen");
var startButtonEl = document.querySelector(".start-button");
var timeEl = document.querySelector(".time");
var quizContainerEl = document.querySelector(".quiz-container");
var endScreenEl = document.querySelector(".end-screen");
var nameInputEl = document.querySelector("#initials");
var submitButtonEl = document.querySelector(".submit-time");
var finalScoreEl = document.querySelector("#final-score");
var highScoreEl = document.querySelector(".high-scores");
var savedDataEl = document.querySelector("#saved-data");

var timerInterval;
var secondsLeft = 75;
var answerArray = [];
var count=0;

var highScoreEntries = 0;
var scores = [];
var userNames =[];

//array of objects that contain quiz information (questions, answer options and correct answer)
var arrayQA = [
  {
    question: "Commonly used data types DO NOT include:",
    option1: "strings",
    option2: "booleans",
    option3: "alerts",
    option4: "numbers",
    answer: 3
  },
  {
    question: "The condition in an if / else statement is enclosed within ______.",
    option1: "quotes",
    option2: "curly brackets",
    option3: "parentheses",
    option4: "square brackets",
    answer: 3
  },
  {
    question: "Arrays in JavaScript can be used to store ______.",
    option1: "numbers and strings",
    option2: "other arrays",
    option3: "booleans",
    option4: "all of the above",
    answer: 4
  },
  {
    question: "String values must be enclosed within ______ when being assigned to variables.",
    option1: "commas",
    option2: "curly brackets",
    option3: "quotes",
    option4: "parentheses",
    answer: 3
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    option1: "JavaScript",
    option2: "terminal/bash",
    option3: "for loops",
    option4: "console log",
    answer: 4
  }
];

//Landing page
// when the user clicks on the start quiz button then call inital() function and hide start screen
startButtonEl.addEventListener("click", function(){
  startScreenEl.style.display = "none";
  initial();
});

// retrieve highscore info from localStorage and update the scores array
// call setTime() function that will setup the timer (and start the quiz)
function initial(){
  var storedScores = JSON.parse(localStorage.getItem("scores"));

  if (storedScores !== null) {
    scores = storedScores;
  }
  renderScores();
  savedDataEl.style.display = "none";
  setTime();
}

//start the countdown timer and display the number of seconds left
//call the createQuizQA() function
function setTime() {
  timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = ("Time: " + secondsLeft);
    if(secondsLeft < 0) {
      secondsLeft = 0;
      clearInterval(timerInterval);
      timeEl.textContent = ("Time's Up!");
      saveHighScore(secondsLeft);
      quizContainerEl.style.display = "none";
    }
  }, 1000);
  createQuizQA();
};

//create elements and append the information to the page
//button elements show the answer options
function createQuizQA(){ 
  var questionEl = document.createElement("h1");
  var btn1El = document.createElement('button');
  var btn2El = document.createElement('button');
  var btn3El = document.createElement('button');
  var btn4El = document.createElement('button');

  btn1El.classList = ("btn");
  btn2El.classList = ("btn");
  btn3El.classList = ("btn");
  btn4El.classList = ("btn");

  btn1El.setAttribute('id', "1");
  btn2El.setAttribute('id', "2");
  btn3El.setAttribute('id', "3");
  btn4El.setAttribute('id', "4");

  questionEl.textContent = arrayQA[count].question;  
  quizContainerEl.appendChild(questionEl);
   
  btn1El.textContent = "1. " + arrayQA[count].option1;   
  btn2El.textContent = "2. " + arrayQA[count].option2;  
  btn3El.textContent = "3. " + arrayQA[count].option3;
  btn4El.textContent = "4. " + arrayQA[count].option4;    

  quizContainerEl.appendChild(btn1El);
  quizContainerEl.appendChild(btn2El);
  quizContainerEl.appendChild(btn3El);
  quizContainerEl.appendChild(btn4El);
}

//event listener to record when the question is answered by clicking on a button
quizContainerEl.addEventListener("click", function(event){
  event.preventDefault();
  answerArray.push(event.target.id);

  //if answer is wrong subtract 15 seconds from countdown timer
  //loop through until all questions have been answered
  //if time runs out or all questions are answered then end the quiz
  if(answerArray[count] == arrayQA[count].answer){

  } else{
    secondsLeft -= 15;
      if (secondsLeft < 0){
        secondsLeft = 0;
        timeEl.textContent = ("Time's Up!");
        clearInterval(timerInterval);
        quizContainerEl.style.display = "none";
      }
    }
  
  count++;
  if (count<arrayQA.length && secondsLeft > 0) {
    quizContainerEl.innerHTML = '';
    createQuizQA();
  } else {
    quizContainerEl.innerHTML = "";
    saveHighScore(secondsLeft);
    clearInterval(timerInterval);
    quizContainerEl.style.display = "none";
    return;
  };  
});

//saveHighScore() function displays the final score and accepts users initials
function saveHighScore(){
  endScreenEl.style.display = "block";
  timeEl.style.display = "none";
  finalScoreEl.textContent = "Your final score is " + secondsLeft;

  submitButtonEl.addEventListener("click", function(event){
    event.preventDefault();
    displayHighScores()
  });
};


//displayHighScores() function displays the information and calls the functions storeScores() and renderScores()
function displayHighScores(){
  endScreenEl.style.display = "none";
  savedDataEl.style.display = "block";

  var upperCaseName = nameInputEl.value.toUpperCase();
  var upperCaseName3 = upperCaseName.slice(0,3);

  var scoreText = upperCaseName3 + "      score:" + secondsLeft;
  scores.push(scoreText);
  nameInputEl.value = "";
 
  storeScores();
  renderScores();

  //creates a restart quiz button
  var goBackBtnEl = document.createElement('button');
  goBackBtnEl.classList = ("btn");
  goBackBtnEl.setAttribute('id', "back-button");
  goBackBtnEl.textContent = ("Restart Quiz"); 
  highScoreEl.appendChild(goBackBtnEl);

  //creates a clear highscores button
  var clearBtnEl = document.createElement('button');
  clearBtnEl.classList = ("btn");
  clearBtnEl.setAttribute('id', "clear-button");
  clearBtnEl.textContent = ("Clear Scores"); 
  highScoreEl.appendChild(clearBtnEl);

  //restarts quiz by reloading the browser
  goBackBtnEl.addEventListener("click", function(event){
    event.preventDefault();
    finalScoreEl.textContent = "";
    window.location.reload()
  });

  // clears the high scores from local storage
  clearBtnEl.addEventListener("click", function(event){
    event.preventDefault();
    savedDataEl.textContent = "";
    localStorage.clear();
  });
}

// storeScores() function saves highscore information to local storage
function storeScores() {
  localStorage.setItem("scores", JSON.stringify(scores));
}

// renderScores() function renders highscore information in a list as <li> elements
function renderScores() {
  savedDataEl.innerHTML = "";
  highScoreEntries.textContent = scores.length;

  for (var i = 0; i < scores.length; i++) {
    var score = scores[i];

    var li = document.createElement("li");
    li.textContent = score;
    li.setAttribute("data-index", i);

    savedDataEl.appendChild(li);
  }
}