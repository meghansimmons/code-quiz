var startScreenEl = document.querySelector(".start-screen");
var startButtonEl = document.querySelector(".start-button");
var timeEl = document.querySelector(".time");
var quizContainerEl = document.querySelector(".quiz-container");
var endScreenEl = document.querySelector(".end-screen");
var nameInputEl = document.querySelector("#initials");
var submitButtonEl = document.querySelector(".submit-time");
var finalScoreEl = document.querySelector("#final-score");
var highScoreEl = document.querySelector(".high-scores");


var count=0;
var secondsLeft = 75;
var answerArray = [];
var timerInterval;


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


// when user clicks on start quiz button start inital function and hide start screen
startButtonEl.addEventListener("click", function(){
  startScreenEl.style.display = "none";
  initial();
});

// start timer and quiz creator functions
function initial(){
  setTime();
}

// var timerInterval 
function setTime() {
  timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = ("Time: " + secondsLeft);
    if(secondsLeft < 0) {
      clearInterval(timerInterval);
      timeEl.textContent = ("Time's Up!");
      quizContainerEl.style.display = "none";
    }
  }, 1000);
  createQuizQA();
};

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

  questionEl.textContent = arrayQA[count].question;  //write question to page
  quizContainerEl.appendChild(questionEl);
   
  btn1El.textContent = "1. " + arrayQA[count].option1;    //create options
  btn2El.textContent = "2. " + arrayQA[count].option2;  
  btn3El.textContent = "3. " + arrayQA[count].option3;
  btn4El.textContent = "4. " + arrayQA[count].option4;    

  quizContainerEl.appendChild(btn1El);
  quizContainerEl.appendChild(btn2El);
  quizContainerEl.appendChild(btn3El);
  quizContainerEl.appendChild(btn4El);
}

quizContainerEl.addEventListener("click", function(event){
  event.preventDefault();
  answerArray.push(event.target.id);

  if(answerArray[count] == arrayQA[count].answer){
    // console.log("Correct");
  } else{
    secondsLeft -= 15;
      if (secondsLeft < 0){
        secondsLeft = 0;
        timeEl.textContent = ("Time's Up!");
        clearInterval(timerInterval);
        saveHighScore(secondsLeft);
        quizContainerEl.style.display = "none";
      }
    // console.log("Wrong");
    }
  
  count++;
  if (count<arrayQA.length) {
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

//function to display final score and accept users initials
//calls function ??
function saveHighScore(){
  endScreenEl.style.display = "block";
  finalScoreEl.textContent += secondsLeft;

  submitButtonEl.addEventListener("click", function(event){
    event.preventDefault();

    // localStorage.setItem("movie-year", JSON.stringify(secondsLeft));

    console.log(nameInputEl.value);
    displayHighScores()
  });
};

function displayHighScores(){
  endScreenEl.style.display = "none";
  timeEl.style.display = "none";
  console.log("hello");

  var goBackBtnEl = document.createElement('button');
  goBackBtnEl.classList = ("btn");
  goBackBtnEl.setAttribute('id', "back-button");
  goBackBtnEl.textContent = ("Restart Quiz"); 
  highScoreEl.appendChild(goBackBtnEl);

  var clearBtnEl = document.createElement('button');
  clearBtnEl.classList = ("btn");
  clearBtnEl.setAttribute('id', "clear-button");
  clearBtnEl.textContent = ("Clear Scores"); 
  highScoreEl.appendChild(clearBtnEl);

  //restarts quiz by reloading the browser
  goBackBtnEl.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload()
  });

  // clears the high scores from local storage --- need this functionality!!
  clearBtnEl.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload()
  });
  // var lastSecondsLeft = JSON.parse(localStorage.getItem("movie-year"));
  // if (lastSecondsLeft !== null) {
  //   movieYearEL.textContent = lastYear;
  // } else {
  //   return;
  // }
}

