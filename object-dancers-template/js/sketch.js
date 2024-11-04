let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new Penguin(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

class Penguin {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.startX = startX;
    this.fish = startY;
    this.arms = 0;
  }

  update() {
    this.x = map(cos(frameCount / 30), -1, 1, this.startX, this.startX + 100);
    this.y = -abs(sin(frameCount / 30)) * 100 + height / 2;
    this.fish = map(sin(frameCount / 15), -1, 1, -50, 50);
    if (frameCount % 120 < 60) {
      this.arms += PI / 60;
    }
    else {
      this.arms -= PI / 60;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    this.drawLArm();
    this.drawRArm();
    this.drawBody();
    pop();
    push();
    translate(this.startX + 50, this.fish + 205);
    this.drawFish();
    pop();
  }

  drawBody() {
    noStroke();
    fill(50);
    arc(0, 100, 120, 300, PI, 0);
    fill(255);
    arc(0, 100, 90, 180, PI, 0);
    ellipse(20, 0, 30, 50);
    ellipse(-20, 0, 30, 50);
    fill(0);
    circle(20, 0, 10);
    circle(-20, 0, 10);
    fill(252, 186, 3);
    triangle(-10, 5, 10, 5, 0, 20);
    triangle(-40, 100, -20, 100, -30, 110);
    triangle(40, 100, 20, 100, 30, 110);
  }

  drawLArm() {
    fill(200);
    push();
    translate(-40, 30);
    rotate(this.arms);
    arc(0, 0, 20, 100, 0, PI);
    pop();
  }

  drawRArm() {
    fill(200);
    push();
    translate(40, 30);
    rotate(this.arms);
    arc(0, 0, 20, 100, PI, 0);
    pop();
  }

  drawFish() {
    fill(72, 198, 212);
    ellipse(0, 0, 80, 30);
    triangle(40, 0, 60, -15, 60, 15);
    triangle(-10, 0, 0, 5, 0, -5);
    fill(0);
    circle(-25, 0, 5);
  }
}