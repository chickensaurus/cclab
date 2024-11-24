let sound;
let particles = [];

function preload() {
  sound = loadSound("assets/beat.mp3");
}

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  background(220);

  // for (let i = 0; i < 300; i++) {
  //   particles.push(new Particle(random(width), random(height), random(10, 50), sound));
  // }
}

function draw() {
  background(220);
  if (random() < 0.1) {
    particles.push(new Particle(width / 2, height, random(5, 15), sound))
  }
  // update, compare, display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.fall();
    p.checkMouse();
    p.display();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    if (p.isDone) {
      particles.splice(i, 1);
    }
  }

  while (particles.length > 500) {
    particles.splice(0, 1);
  }

}

// function mousePressed() {
//   sound.play();
// }

class Particle {
  constructor(x, y, rad, snd) {
    this.x = x;
    this.y = y;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-8, -6);
    this.rad = rad;
    this.snd = snd;
    this.sndRate = random(0.5, 2);
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.isDone = 0;
  }

  checkMouse() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad) {
      this.b = 0;
      this.g = 255;
      if (mouseIsPressed) {
        this.g = 0;
        this.isDone = 1;
        // this.rad -= 1;
        // if (!this.snd.isPlaying()) {
        //   this.snd.rate(this.sndRate);
        //   this.snd.play();
        // }
      }
    }
    else {
      this.b = 255;
      this.g = 255;
    }
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.r, this.g, this.b);
    circle(0, 0, this.rad * 2);
    pop();
  }

  fall() {
    this.ySpeed += 0.1;
  }
}