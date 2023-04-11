var startButtonEl = document.querySelector(".start-button");
var timeEl = document.querySelector(".time");



startButtonEl.addEventListener("click", setTime);

function setTime() {
  var secondsLeft = 5;
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      timeEl.textContent = "Time's Up!";
    }
  }, 1000);
}


