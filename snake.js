const boardBorder = "black";
const boardBackGround = "white";
const snakeColor = "lightblue";
const snakeBorder = "darkblue";

let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200},
]

let score = 0;
let changingDirection = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;

const snakeBoard = document.getElementById("gameCanvas");
const snakeBoard_ctx = gameCanvas.getContext("2d");

main();

generateFood();

document.addEventListener("keydown", changeDirection);

function main() {

  if (hasGameEnded()) return;

  changingDirection = false;
  setTimeout(function onTick() {
  clearCanvas();
  drawFood();
  moveSnake();
  drawSnake();
  main();
  }, 100)
}

function clearCanvas() {
  snakeBoard_ctx.fillStyle = boardBackGround;
  snakeBoard_ctx.strokeStyle = boardBorder;
  snakeBoard_ctx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
  snakeBoard_ctx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
}

function drawSnake() {
  snake.forEach(drawSnakePart)
}

function drawFood() {
  snakeBoard_ctx.fillStyle = 'lightgreen';
  snakeBoard_ctx.strokestyle = 'darkgreen';
  snakeBoard_ctx.fillRect(food_x, food_y, 10, 10);
  snakeBoard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function drawSnakePart(snakePart) {
  snakeBoard_ctx.fillStyle = snakeColor;
  snakeBoard_ctx.strokeStyle = snakeBorder;
  snakeBoard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  snakeBoard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function hasGameEnded() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeBoard.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeBoard.height - 10;
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

function randomFood(min, max) {  
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function generateFood() {  
  food_x = randomFood(0, snakeBoard.width - 10);
  food_y = randomFood(0, snakeBoard.height - 10);
  snake.forEach(function hasSnakeEatenFood(part) {
    const hasEaten = part.x == food_x && part.y == food_y;
    if (hasEaten) generateFood();
  });
}


function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (changingDirection) return;
  changingDirection = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  const hasEatenFood = snake[0].x === food_x && snake[0].y === food_y;
  if (hasEatenFood) {
    score += 10;
    document.getElementById('score').innerHTML = score;
    generateFood();
  } else {
    snake.pop();
  }
}