// possible game ideas:
// 1
// navigate through a labyrinth trying to catch a treasure
// the treasure is replaced every few seconds
//
// 2
// try to catch snowflakes/raindrops or sth similar
// avoid arrows/rocks (or sth similar)

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const GAP = 3;
const ROWS = 30;
const COLS = 30;
const CELLWIDTH = canvas.width / COLS;
const CELLHEIGHT = canvas.height / ROWS;

let walls = [{ x: 0, y: 0, w: 1, h: 1 }];
let player = { x: 10, y: 10 };
let points = 0;
let foundTreasure = false;
let treasure;
placeTreasure();

// range of coordinates 1,1 - 28,28
function placeTreasure() {
  let randomX = Math.floor(Math.random() * (COLS - 2)) + 1;
  let randomY = Math.floor(Math.random() * (ROWS - 2)) + 1;

  let treasureBounds = { x: randomX, y: randomY, w: 1, h: 1 };

  for (let wall of walls) {
    if (collision(treasureBounds, wall)) return;
  }

  treasure = { x: randomX, y: randomY };
  foundTreasure = false;
}

// treasure is newly placed every few seconds
// TODO: treasure must not be placed "inside" labyrinth wall
let timeInterval = 1;
setInterval(gameLoop, timeInterval);

document.addEventListener("keydown", keyDown);

draw();

function draw() {
  // canvas
  ctx.fillStyle = "turquoise";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // playing field
  addPlayingField();

  // walls
  addWalls(2, 2, 26, 1);
  addWalls(2, 3, 1, 25);
  addWalls(4, 27, 24, 1);
  addWalls(27, 4, 1, 22);

  addWalls(4, 4, 22, 1);
  addWalls(4, 6, 1, 21);
  addWalls(6, 25, 20, 1);
  addWalls(25, 6, 1, 20);

  addWalls(6, 6, 18, 1);
  addWalls(6, 8, 1, 16);
  addWalls(7, 23, 15, 1);
  addWalls(23, 8, 1, 16);

  addWalls(8, 8, 14, 1);
  addWalls(8, 9, 1, 13);
  addWalls(10, 21, 13, 1);
  addWalls(21, 8, 1, 12);

  // player
  ctx.fillStyle = "white";
  add(player.x, player.y);

  // treasure
  ctx.fillStyle = "yellow";
  add(treasure.x, treasure.y);

  requestAnimationFrame(draw);
}

function addWalls(x, y, w, h) {
  walls.push({ x, y, w, h });
  ctx.fillStyle = "black";
  ctx.fillRect(x * CELLWIDTH, y * CELLHEIGHT, w * CELLWIDTH, h * CELLHEIGHT);
}

function addPlayingField() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, CELLHEIGHT); // top
  ctx.fillRect(canvas.width - CELLWIDTH, 0, CELLWIDTH, canvas.height); // right
  ctx.fillRect(0, canvas.height - CELLHEIGHT, canvas.width, CELLHEIGHT); // bottom
  ctx.fillRect(0, 0, CELLWIDTH, canvas.height); // left
}

function add(x, y) {
  ctx.fillRect(x * CELLWIDTH, y * CELLHEIGHT, CELLWIDTH, CELLHEIGHT);
}

// move player
function keyDown(e) {
  let nextX = player.x;
  let nextY = player.y;

  if (e.keyCode == 37) {
    if (player.x > 1) {
      nextX--;
    }
  }
  if (e.keyCode == 38)
    if (player.y > 1) {
      nextY--;
    }
  if (e.keyCode == 39)
    if (player.x < COLS - 2) {
      nextX++;
    }
  if (e.keyCode == 40)
    if (player.y < ROWS - 2) {
      nextY++;
    }

  let playerBounds = { x: nextX, y: nextY, w: 1, h: 1 };

  for (let wall of walls) {
    if (collision(playerBounds, wall)) return;
  }

  player.x = nextX;
  player.y = nextY;
}

function collision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  );
}

function gameLoop() {
  if (player.x == treasure.x && player.y == treasure.y) {
    foundTreasure = true;
    points++;
    updateScore();
    placeTreasure();
  }

  testGameOver();
}

function testGameOver() {
  if (points == 10) {
    // show results
  }
}

function updateScore() {
  const scorePara = document.getElementById("score");
  scorePara.textContent = `Score: ${points}`;
}

// TODO: change styling of score
// TODO: add timer
