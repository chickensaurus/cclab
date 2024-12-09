let clicks = [];
let trees = [];
let start = 0;
let string = "X";
let len = 1;
let change = 25;
let done = 0;
let placed = 0;
let ang = 0;
let ang2 = 0;
let dis = 0;
let r, g, b;

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent("p5-canvas-container");
  background(250, 255, 209);
  angleMode(DEGREES);
  for (let i = 0; i < 5; i++) {
    string = expand(string);
  }
}

function draw() {
  stroke(r, g, b);
  if (placed == 2) {
    t = new Tree(clicks[0][0], clicks[0][1], clicks[1][0], clicks[1][1])
    t.calculate();
  }
  if (start && !done) {
    t.create();
    trees.push(t);
    console.log(trees);
  }

}

class Tree {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    console.log("tree created");
  }

  calculate() {
    push();
    translate(this.x1, this.y1);
    let v0 = createVector(1, 0);
    let v1 = createVector(this.x2 - this.x1, this.y2 - this.y1);
    pop();
    ang = v0.angleBetween(v1);
    dis = dist(this.x1, this.y1, this.x1, this.y2);
    let proportion = map(dis, 0, 300, 0, 0.5)
    ang2 = map(dis, 0, 300, 10, 50);
    change = ang2;
    len = proportion;
    start = 1;
  }

  create() {
    push();
    stroke(this.r, this.g, this.b);
    translate(this.x1, this.y1);
    rotate(ang);
    for (let i = 0; i < string.length; i++) {
      switch (string[i]) {
        case 'F':
          line(0, 0, len, 0);
          translate(len, 0);
          break;
        case '-':
          rotate(change);
          break;
        case '+':
          rotate(-1 * change);
          break;
        case '[':
          push();
          break;
        case ']':
          pop();
          break;
        default:
          break;
      }
    }
    pop();
    done = 1;
    reset();
  }

}

function reset() {
  placed = 0;
  clicks = [];
  start = 0;
  done = 0;
}

function restart() {
  background(250, 255, 209);
  placed = 0;
  clicks = [];
  start = 0;
  done = 0;
}

function mousePressed() {
  clicks.push([mouseX, mouseY]);
  if (placed == 0) {
    circle(mouseX, mouseY, 5);
  }
  placed += 1;
}

function keyPressed() {
  if (key == "c") {
    restart();
  }
}

function expand(s) {
  // THE RULE (X → F+[[X]-X]-F[-FX]+X), (F → FF)
  let newStr = "";
  let tempStr = "";
  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "X":
        tempStr += "F+[[X]-X]-F[-FX]+X";
        break;
      case "F":
        tempStr += "FF";
        break;
      default:
        tempStr += s[i];
        break;
    }
  }
  for (let i = 0; i < tempStr.length; i++) {
    switch (tempStr[i]) {
      case "F":
        newStr += "FF";
        break;
      default:
        newStr += tempStr[i];
        break;
    }
  }
  return newStr;
}
