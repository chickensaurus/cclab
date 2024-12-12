/*
const graphics = createGraphics(w, h);
const dataUrl = graphics.elt.toDataURL();

let div = document.createElement("div");
div.style.backgroundImage = "url(" +dataUrl + ")";

flexContainer = document.getElementById("some-id");
flexContainer.appendChild( div );
*/

/*
EXTRA
background-image: url( dataUrl );
//let div = document.getElementById("some-id");
*/




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

let countTrees = 0;
let countDrawings = 0;

function drawTreeByData(data) {
  countDrawings += 1;
  for (let d of data) {
    let t = new Tree(d.x1, d.y1, d.x2, d.y2, d.r, d.g, d.b);
    t.calculate();
    t.create();
    countTrees += 1;
  }
  document.getElementById("countTrees").innerHTML = "Currently, there are " + countTrees + " trees from a total of " + countDrawings + " drawings";
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
    dis = dist(this.x1, this.y1, this.x1, this.y2);
    let proportion = map(dis, 0, 300, 0, 0.5)
    ang2 = map(dis, 0, 300, 10, 50);
    change = ang2;
    len = proportion;
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

function getDBRef(name) {
  let ref = database.ref(name);

  // event listeners
  ref.on("child_added", data => {
    console.log("! DB: Item added");
    console.log(data.key);
    console.log(data.val());

    drawTreeByData(data.val()); // ***
  });
  ref.on("child_removed", data => {
    console.log("! DB REMOVED");
    console.log(data.key);
    console.log(data.val());
  });
  ref.on("child_changed", data => {
    console.log("! DB CHANGED");
    console.log(data.key);
    console.log(data.val());
    posdata = data.val();
  });
  ref.on("child_moved", data => {
    console.log("! DB MOVED");
    console.log(data.key);
    console.log(data.val());
  });

  return ref;
}