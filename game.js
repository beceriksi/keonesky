
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let flags = [];
let boss = null;

class Player {
  constructor() {
    this.x = 400;
    this.y = 500;
    this.width = 40;
    this.height = 40;
    this.color = "#ffffff";
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Flag {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.color = "#b19cd9"; // purple
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += 2;
  }
}

class Boss {
  constructor() {
    this.x = 350;
    this.y = 0;
    this.width = 100;
    this.height = 100;
    this.color = "#da70d6"; // light purple
    this.alive = true;
  }

  draw() {
    if (this.alive) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  move() {
    if (this.alive) {
      this.y += 1;
    }
  }
}

const player = new Player();

function spawnFlag() {
  let x = Math.random() * (canvas.width - 20);
  flags.push(new Flag(x, 0));
}

function checkCollision(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();

  flags.forEach((flag, index) => {
    flag.move();
    flag.draw();
    if (checkCollision(player, flag)) {
      flags.splice(index, 1);
      score += 10;
      document.getElementById("score").innerText = "Score: " + score;
    }
  });

  if (score >= 100 && !boss) {
    boss = new Boss();
  }

  if (boss) {
    boss.move();
    boss.draw();
  }

  requestAnimationFrame(gameLoop);
}

setInterval(spawnFlag, 1500);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") player.x -= 20;
  if (e.key === "ArrowRight") player.x += 20;
});

gameLoop();
