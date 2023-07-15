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

let treasure;
placeTreasure();

// range of coordinates 1,1 - 28,28
function placeTreasure() {
  let randomX = Math.floor(Math.random() * (COLS - 2)) + 1;
  let randomY = Math.floor(Math.random() * (ROWS - 2)) + 1;

  treasure = { x: randomX, y: randomY };
}

// treasure is newly placed every few seconds
// TODO: treasure must not be placed "inside" labyrinth wall
let timeInterval = 10000;
setInterval(placeTreasure, timeInterval);

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
}

// move player
function keyDown(e) {
  if (e.keyCode == 37) player.x--;
  if (e.keyCode == 38) player.y--;
  if (e.keyCode == 39) player.x++;
  if (e.keyCode == 40) player.y++;
}

function gameLoop() {}
