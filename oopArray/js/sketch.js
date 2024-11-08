let particles = [];

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  background(220);

  for (let i = 0; i < 300; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(5, 10);
    particles.push(new Particle(x, y, r));
  }
}

function draw() {
  background(220, 20);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.reappear();
    p.display();
  }
}



class Particle {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
    this.rad = rad;
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.ySpeed += 0.1;
    this.xSpeed += 0.1;
  }
  reappear() {
    if (this.x < 0) {
      this.xSpeed = -1 * this.xSpeed;
    } else if (this.x > width) {
      this.xSpeed = -1 * this.xSpeed;
    }
    if (this.y < 0) {
      this.ySpeed = -1 * this.ySpeed;
    } else if (this.y > height) {
      this.ySpeed = -1 * this.ySpeed;
    }
  }
  display() {
    push();
    circle(this.x, this.y, this.rad * 2);
    pop();
  }
}