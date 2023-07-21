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
walls.push({ x: 0, y: 0, w: COLS, h: 1 }); // top
walls.push({ x: 29, y: 0, w: 1, h: ROWS }); // right
walls.push({ x: 0, y: 29, w: COLS, h: 1 }); // bottom
walls.push({ x: 0, y: 0, w: 1, h: ROWS }); // right

walls.push({ x: 2, y: 2, w: 26, h: 1 });
walls.push({ x: 2, y: 3, w: 1, h: 25 });
walls.push({ x: 4, y: 27, w: 24, h: 1 });
walls.push({ x: 27, y: 4, w: 1, h: 22 });

walls.push({ x: 4, y: 4, w: 22, h: 1 });
walls.push({ x: 4, y: 6, w: 1, h: 21 });
walls.push({ x: 6, y: 25, w: 20, h: 1 });
walls.push({ x: 25, y: 6, w: 1, h: 20 });

walls.push({ x: 6, y: 6, w: 18, h: 1 });
walls.push({ x: 6, y: 8, w: 1, h: 16 });
walls.push({ x: 7, y: 23, w: 15, h: 1 });
walls.push({ x: 23, y: 8, w: 1, h: 16 });

walls.push({ x: 8, y: 8, w: 14, h: 1 });
walls.push({ x: 8, y: 9, w: 1, h: 13 });
walls.push({ x: 10, y: 21, w: 13, h: 1 });
walls.push({ x: 21, y: 8, w: 1, h: 12 });

let player = { x: 10, y: 10 };
let points = 0;
let treasure;
placeTreasure();

// range of coordinates 1,1 - 28,28
function placeTreasure() {
  while (true) {
    let randomX = Math.floor(Math.random() * (COLS - 2)) + 1;
    let randomY = Math.floor(Math.random() * (ROWS - 2)) + 1;

    let treasureBounds = { x: randomX, y: randomY, w: 1, h: 1 };

    let colliding = false;
    for (let wall of walls) {
      if (collision(treasureBounds, wall)) {
        colliding = true;
        break;
      }
    }

    if (!colliding) {
      treasure = { x: randomX, y: randomY };
      break;
    }
  }
}

let timeInterval = 1;
setInterval(gameLoop, timeInterval);

document.addEventListener("keydown", keyDown);

draw();

function draw() {
  ctx.fillStyle = "turquoise";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  addWalls();

  ctx.fillStyle = "white";
  add(player.x, player.y, 1, 1);

  ctx.fillStyle = "yellow";
  add(treasure.x, treasure.y, 1, 1);

  requestAnimationFrame(draw);
}

function addWalls() {
  for (let wall of walls) {
    ctx.fillStyle = "black";
    ctx.fillRect(
      wall.x * CELLWIDTH,
      wall.y * CELLHEIGHT,
      wall.w * CELLWIDTH,
      wall.h * CELLHEIGHT
    );
  }
}

function add(x, y, w, h) {
  ctx.fillRect(x * CELLWIDTH, y * CELLHEIGHT, w * CELLWIDTH, h * CELLHEIGHT);
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
