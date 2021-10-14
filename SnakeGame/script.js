let canvas = document.getElementById('tableGame');
let context = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
let snakeHeadX = 250;
let snakeHeadY = 250;
let snakePositionX = 0;
let snakePositionY = 25;
let snakeBody = [];
let snakeBodyLength = 1;
let cellPosition = 25;
let stopGame;
let foodX = Math.floor(Math.random() * 20) * cellPosition;
let foodY = Math.floor(Math.random() * 20) * cellPosition;
document.getElementById('pause').style.display = "none" ;
document.getElementById('tryAgain').style.display = "none" ;
function startGame() {
  document.getElementById('startGame').style.display = "none";
  document.getElementById('pause').style.display = "inline";
  stopGame = setInterval(gameSetup, 200);

}
let button = document.getElementById('pause');
button.onclick = function() {
document.getElementById('startGame').style.display = "inline";
document.getElementById('pause').style.display = "none" ;
 clearInterval(stopGame);
}
function gameSetup() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  drawText(0 , 20 , "white" , '25px serif' , "Score: " + snakeBodyLength) ;
  moveSnake();
  checkCollision();
  checkEndGame();

}

function SnakeBody(x, y) {
  this.x = x;
  this.y = y;
}
function moveSnake() {
  snakeHeadX += snakePositionX;
  snakeHeadY += snakePositionY;

}
function drawSnake() {
  context.fillStyle = "black";
  context.strokeStyle = "#FF0000";
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i].x, snakeBody[i].y, 25, 25);
    context.strokeRect(snakeBody[i].x, snakeBody[i].y, 25 , 25 );
  }
  context.fillStyle = "yellow";
  context.strokeStyle = "#FF0000";
  context.fillRect(snakeHeadX , snakeHeadY , 25, 25);
  context.strokeRect(snakeHeadX , snakeHeadY , 25, 25);
  snakeBody.push(new SnakeBody(snakeHeadX , snakeHeadY ));
  if (snakeBody.length > snakeBodyLength) {
    snakeBody.shift();
  }

}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, 25, 25);
}

function drawText( x , y , color , font , text ) {
  context.fillStyle = color ;
  context.font = font ;
  context.fillText(text , x , y) ;
}

function checkCollision() {
  if (snakeHeadX  == foodX && snakeHeadY  == foodY) {
    foodX = Math.floor(Math.random() * 20) * cellPosition;
    foodY = Math.floor(Math.random() * 20) * cellPosition;
    ++snakeBodyLength;
  }
}
let snakeDelay = 0 ;

document.addEventListener("keydown", function(event) {
    if ( snakeDelay == 0 ) {
    snakeDirection(event) ;
  }
 })

function snakeDirection(event) {
  if (event.keyCode == "37") {
    if (snakePositionX == 25) {
      return;
    }
    snakeDelay = 1 ;
    snakePositionX = -25;
    snakePositionY = 0;
    setTimeout(function() {
      --snakeDelay ;
    }, 200)
  } else if (event.keyCode == "38") {
    if (snakePositionY == 25) {
      return;
    }
    snakeDelay = 1 ;
    snakePositionX = 0;
    snakePositionY = -25;
    setTimeout(function() {
      --snakeDelay ;
    }, 200)
  } else if (event.keyCode == "39") {
    if (snakePositionX == -25) {
      return;
    }
    snakeDelay = 1 ;
    snakePositionX = 25;
    snakePositionY = 0;
    setTimeout(function() {
      --snakeDelay ;
    }, 200)
  } else if (event.keyCode == "40") {
    if (snakePositionY == -25) {
      return;
    }
    snakeDelay = 1 ;
    snakePositionX = 0;
    snakePositionY = 25;
    setTimeout(function() {
      --snakeDelay ;
    }, 200)
  }
}

function checkEndGame() {
 if(snakeHeadX  > canvas.height - cellPosition || snakeHeadY  > canvas.width - cellPosition || snakeHeadX < 0  || snakeHeadY < 0 ) {
   clearInterval(stopGame);
   document.getElementById('startGame').style.display = "none";
   document.getElementById('pause').style.display = "none";
   document.getElementById('tryAgain').style.display = "inline";
   let tryAgain = document.getElementById('tryAgain');
   tryAgain.onclick = function() {
     location.reload();
   }
   drawText (20 , 250 , "red" , '100px serif' , "Game over " )
 }
 for (let i = 0  ; i < snakeBody.length ; i++ ) {
  if (snakeHeadX  === snakeBody[i].x && snakeHeadY  === snakeBody[i].y) {
    clearInterval(stopGame);
    document.getElementById('startGame').style.display = "none";
    document.getElementById('pause').style.display = "none";
    document.getElementById('tryAgain').style.display = "inline";
    let tryAgain = document.getElementById('tryAgain');
    tryAgain.onclick = function() {
      location.reload();
    }
    drawText (20 , 250 , "red" , '100px serif' , "Game over " )
  }
 }
}
