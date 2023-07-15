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
const CELLWIDTH = canvas.height / COLS;
const CELLHEIGHT = canvas.height / ROWS;

// catcher
let catcher = { x: 19, y: 29 };

document.addEventListener("keydown", keyDown);

draw();

function draw() {
  //canvas
  ctx.fillStyle = "rgb(0, 0, 51)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //style - idea: grid of canvas starts blinking in random colors making the game more difficult ("eye cancer")
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, CELLWIDTH * 0.5, CELLHEIGHT * 0.5);
  ctx.fillStyle = "yellow";
  ctx.fillRect(12.5, 12.5, CELLWIDTH * 0.5, CELLHEIGHT * 0.5);
  ctx.fillStyle = "pink";
  ctx.fillRect(0, 12.5, CELLWIDTH * 0.5, CELLHEIGHT * 0.5);
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(12.5, 0, CELLWIDTH * 0.5, CELLHEIGHT * 0.5);

  // catcher
  ctx.fillStyle = "white";
  ctx.fillRect(
    catcher.x * CELLWIDTH,
    catcher.y * CELLHEIGHT,
    CELLWIDTH,
    CELLHEIGHT - 6 * GAP
  );

  requestAnimationFrame(draw);
}

function keyDown(e) {
  if (e.keyCode == 37) catcher.x--;
  if (e.keyCode == 39) catcher.x++;
}

function gameLoop() {}
