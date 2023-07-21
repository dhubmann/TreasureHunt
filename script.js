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

// player
// treasure --> function placeTreasure
// labyrinth

let player = { x: 10, y: 10 };
let points = 0;
let foundTreasure = false;
let treasure;
placeTreasure();

// range of coordinates 1,1 - 28,28
function placeTreasure() {
  let randomX = Math.floor(Math.random() * (COLS - 2)) + 1;
  let randomY = Math.floor(Math.random() * (ROWS - 2)) + 1;

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

  // labyrinth
  addLabyrinth();

  // player
  // TODO: change shape
  ctx.fillStyle = "white";
  add(player.x, player.y);

  // treasure
  // TODO: change shape
  ctx.fillStyle = "yellow";
  add(treasure.x, treasure.y);

  requestAnimationFrame(draw);
}

function add(x, y) {
  ctx.fillRect(x * CELLWIDTH, y * CELLHEIGHT, CELLWIDTH, CELLHEIGHT);
}

function addLabyrinth() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, CELLHEIGHT); // top
  ctx.fillRect(canvas.width - CELLWIDTH, 0, CELLWIDTH, canvas.height); // right
  ctx.fillRect(0, canvas.height - CELLHEIGHT, canvas.width, CELLHEIGHT); // bottom
  ctx.fillRect(0, 0, CELLWIDTH, canvas.height); // left

  // addLabyrinthWalls(2, 2, 26, 1);
  // addLabyrinthWalls(2, 3, 1, 25);
  // addLabyrinthWalls(4, 27, 24, 1);
  // addLabyrinthWalls(27, 4, 1, 22);

  // addLabyrinthWalls(4, 4, 22, 1);
  // addLabyrinthWalls(4, 6, 1, 21);
  // addLabyrinthWalls(6, 25, 20, 1);
  // addLabyrinthWalls(25, 6, 1, 20);

  // addLabyrinthWalls(6, 6, 18, 1);
  // addLabyrinthWalls(6, 8, 1, 16);
  // addLabyrinthWalls(7, 23, 15, 1);
  // addLabyrinthWalls(23, 8, 1, 16);

  // addLabyrinthWalls(8, 8, 14, 1);
  // addLabyrinthWalls(8, 9, 1, 13);
  // addLabyrinthWalls(10, 21, 13, 1);
  // addLabyrinthWalls(21, 8, 1, 12);

  // addLabyrinthWalls(10, 17, 2, 1);
  // addLabyrinthWalls(10, 18, 1, 1);
  // addLabyrinthWalls(12, 15, 3, 1);
  // addLabyrinthWalls(12, 16, 1, 2);
  // addLabyrinthWalls(14, 13, 3, 1);
  // addLabyrinthWalls(14, 14, 1, 2);
  // addLabyrinthWalls(16, 11, 3, 1);
  // addLabyrinthWalls(16, 12, 1, 2);
  // addLabyrinthWalls(18, 10, 1, 1);
}

function addLabyrinthWalls(x, y, w, h) {
  ctx.fillRect(CELLWIDTH * x, CELLHEIGHT * y, CELLWIDTH * w, CELLHEIGHT * h); // top
}

function addLabyrinthWallsAtRandom() {
  let randomX = Math.floor(Math.random() * (COLS - 2)) + 1;
  let randomY = Math.floor(Math.random() * (ROWS - 2)) + 1;
  let randomW = Math.floor(Math.random() * (12 - 2)) + 1;
  let randomH = Math.floor(Math.random() * (12 - 2)) + 1;

  ctx.fillRect(
    CELLWIDTH * randomX,
    CELLHEIGHT * randomY,
    CELLWIDTH * randomW,
    CELLHEIGHT * randomH
  );
}

// move player
function keyDown(e) {
  if (e.keyCode == 37) {
    if (player.x > 1) {
      player.x--;
    }
  }
  if (e.keyCode == 38)
    if (player.y > 1) {
      player.y--;
    }
  if (e.keyCode == 39)
    if (player.x < COLS - 2) {
      player.x++;
    }
  if (e.keyCode == 40)
    if (player.y < ROWS - 2) {
      player.y++;
    }
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

function updateScore(){
  const scorePara = document.getElementById("score");
  scorePara.textContent = `Score: ${points}`;
}

// TODO: change styling of score
// TODO: add timer