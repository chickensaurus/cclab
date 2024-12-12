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

function drawTreeByData(data) {
  const graphics = createGraphics(200, 200);

  graphics.angleMode(DEGREES);
  graphics.background(250, 255, 209);
  for (let d of data) {
    let t = new Tree(d.x1, d.y1, d.x2, d.y2, d.r, d.g, d.b);
    t.calculate();
    t.create(graphics);
  }

  const dataUrl = graphics.elt.toDataURL();

  let div = document.createElement("div");
  div.style.backgroundImage = "url(" + dataUrl + ")";
  div.style.backgroundSize = "contain";
  div.style.width = "200px";
  div.style.height = "200px";
  div.style.display = "inline-block";
  div.style.margin = "10px";

  let flexContainer = document.getElementById("container");
  flexContainer.appendChild(div);

}

function setup() {
  setupFirebase(data);
  noCanvas();
  // let canvas = createCanvas(1000, 1000);
  // canvas.parent("p5-canvas-container");
  background(220, 255, 194);
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
    this.x1 = x1 * 0.4;
    this.y1 = y1 * 0.4;
    this.x2 = x2 * 0.4;
    this.y2 = y2 * 0.4;
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
  }

  create(gr) {
    gr.push();
    gr.stroke(this.r, this.g, this.b);
    gr.translate(this.x1, this.y1);

    gr.circle(0, 0, 5); // ***

    gr.rotate(ang);
    for (let i = 0; i < string.length; i++) {
      switch (string[i]) {
        case 'F':
          gr.line(0, 0, len, 0);
          gr.translate(len, 0);
          break;
        case '-':
          gr.rotate(change);
          break;
        case '+':
          gr.rotate(-1 * change);
          break;
        case '[':
          gr.push();
          break;
        case ']':
          gr.pop();
          break;
        default:
          break;
      }
    }
    gr.pop();
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