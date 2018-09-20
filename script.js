var gameBox = document.getElementById("game-box");
var balls = 100;
var playerScore = 0;

for (var i = 0; i < balls; i++) {
    var newBalls = document.createElement("button");
    var x = Math.floor(Math.random() * (830 - 70 + 1)) + 10;
    var y = Math.floor(Math.random() * (430 - 70 + 1)) + 10;
    newBalls.setAttribute("class", "ball");
    newBalls.style.width = "80px";
    newBalls.style.height = "80px";
    newBalls.style.borderRadius = "100%";
    newBalls.style.backgroundColor = "blue";
    newBalls.style.position = "absolute";
    newBalls.style.left = x.toString() +'px';
    newBalls.style.top = y.toString() +'px';
    newBalls.addEventListener('click', modify);
    newBalls.style.display = "none";
    gameBox.appendChild(newBalls);
}


var myBalls = document.querySelectorAll("button");
var ballsCounter = 0;
var timer;
var timerId;
console.log(myBalls);


//changing of colours function
function startCountDown() {
  for (var i = 0; i < myBalls.length; i++) {
      if (myBalls[i].style.backgroundColor == "blue" && timeLeft > 0 && myBalls[i].style.display == 'inline-block') {
          myBalls[i].style.backgroundColor = "green";
      } else if (myBalls[i].style.backgroundColor == "green" && timeLeft > 0 && myBalls[i].style.display == 'inline-block') {
          myBalls[i].style.backgroundColor = "yellow";
      } else if (myBalls[i].style.backgroundColor == "yellow" && timeLeft > 0 && myBalls[i].style.display == 'inline-block') {
          myBalls[i].style.backgroundColor = "red";
      } else if (myBalls[i].style.backgroundColor == 'red' && timeLeft > 0 && myBalls[i].style.display == 'inline-block')  {
          myBalls[i].style.display = "none";
          gameBox.style.backgroundColor = "red";
          clearTimeout(timerId);
          clearInterval(gameTime);
          gameBox.innerHTML = "GAME OVER!";
          gameState = false;
      } else if (timeLeft < 0 ) {
          myBalls[i].style.display = "none";
          gameBox.style.backgroundColor = "blue";
          gameBox.innerHTML = playerScore;
          gameState = false;
      }
  }
}

function slowReveal() {
    if (ballsCounter < balls){
        myBalls[ballsCounter].style.display = "inline-block";
        ballsCounter++;
    }
}

//reversing colour
function modify() {
    if (this.style.backgroundColor == 'green') {
        this.style.backgroundColor = "blue";
    } else if (this.style.backgroundColor == 'yellow') {
        this.style.backgroundColor = "green";
    } else if (this.style.backgroundColor == 'red') {
        this.style.backgroundColor = "yellow";
    } else if (this.style.backgroundColor == 'blue') {
        clearInterval(timer);
        this.style.display = "none";
        playerScore++;
        var theScore = document.getElementById("score")
        theScore.innerHTML = playerScore;
    }
}

//timer function
var timeLeft = 20;
var elem = document.getElementById('time');


function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timerId);
    } else {
        elem.innerHTML = timeLeft;
        timeLeft--;
    }
}

var check = 0;
function collate () {
    countdown();
    slowReveal();
    check++;
    if(check % 2 == 0) {
        startCountDown();
    }
}

var gameTime = setInterval(collate, 650);
countdown();
