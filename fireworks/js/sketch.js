let particles = [];

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  background(0);
}

function draw() {
  background(0, 30);

  if (mouseIsPressed) {
    circle(mouseX, mouseY, 5);
    for (let i = 0; i < 30; i++) {
      particles.push(new Particle(mouseX, mouseY, 1));
    }
  }

  for (let i = 0; i < particles.length; i++) {
    if (particles[i].type == 1 && particles[i].time == floor(particles[i].life)) {
      particles[i].nextStage();
    }
    if (particles[i].type == 2 && particles[i].time > particles[i].life) {
      particles[i].done = true;
    }
    if (particles[i].type == 1 && particles[i].time < particles[i].split) {
      particles[i].goUp();
    }
    else {
      particles[i].update();
    }
    particles[i].show();
  }

  while (particles.length > 1000) {
    particles.splice(0, 1);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].done) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y, t) {
    this.x = x;
    this.y = y;
    this.type = t;
    this.size = random(0.2, 1.2);
    this.xSpeed = random(-1 * this.size, this.size);
    this.ySpeed = random(-1.5 * this.size, this.size);
    this.split = 40;
    this.time = 0;
    this.life = random(90, 110) + this.split;
    this.done = false;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    if (this.type == 2) {
      this.life = 20;
    }
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.ySpeed += 0.01;
  }

  show() {
    this.time += 1;
    noStroke();
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, 2);
  }

  goUp() {
    this.y -= 4;
  }

  nextStage() {
    this.done = true;
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(this.x, this.y, 2));
    }
  }
}