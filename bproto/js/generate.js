let data = [];

let trees = [];
let clicks = [];
let placed = 0;
let string = "X";
let len = 1;
let change = 25;

let ang = 0;
let ang2 = 0;
let dis = 0;

function submitTrees() {
  sendData(data);

  setTimeout(function () {
    window.open("garden.html", "_self");
  }, 1000);
}

function plantSeed() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;

  clicks.push(
    { x: mouseX, y: mouseY }
  );
  if (placed == 0) {
    circle(mouseX, mouseY, 5);
  }
  placed += 1;
  if (placed == 2) {
    let t = new Tree(clicks[0].x, clicks[0].y, clicks[1].x, clicks[1].y)
    t.calculate();
    t.create();

    let treeData = {
      x1: t.x1,
      y1: t.y1,
      x2: t.x2,
      y2: t.y2,
      r: t.r,
      g: t.g,
      b: t.b,
    }
    data.push(treeData);
  }
}

function drawTreeByData(data) {
  for (let d of data) {
    let t = new Tree(d.x1, d.y1, d.x2, d.y2, d.r, d.g, d.b);
    t.calculate();
    t.create();
  }
}

function setup() {
  setupFirebase(data);

  let canvas = createCanvas(500, 500);
  canvas.parent("p5-canvas-container");
  background(250, 255, 209);
  angleMode(DEGREES);
  for (let i = 0; i < 5; i++) {
    string = expand(string);
  }
}

function draw() {
  //
}

function mousePressed() {
  plantSeed();
}

function keyPressed() {
  if (key == "c") {
    restart();
  }
  if (key == "l") {
    drawTreeByData(data);
  }
}

class Tree {
  constructor(x1, y1, x2, y2, r, g, b) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.r = r || round(random(255));
    this.g = g || round(random(255));
    this.b = b || round(random(255));
    console.log("tree created");
  }

  calculate() {
    push();
    translate(this.x1, this.y1);
    let v0 = createVector(1, 0);
    let v1 = createVector(this.x2 - this.x1, this.y2 - this.y1);
    pop();
    ang = v0.angleBetween(v1);
    dis = dist(this.x1, this.y1, this.x2, this.y2);
    let proportion = map(dis, 0, 300, 0, 0.5)
    ang2 = map(dis, 0, 300, 10, 50);
    change = ang2;
    len = proportion;
    console.log(dis, ang, ang2);
  }

  create() {
    push();
    stroke(this.r, this.g, this.b);
    translate(this.x1, this.y1);

    circle(0, 0, 5); // ***

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
    reset();
  }
}

function reset() {
  placed = 0;
  clicks = [];
}

function restart() {
  background(250, 255, 209);
  reset();
  // data should be cleared
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
