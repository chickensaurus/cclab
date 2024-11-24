function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  background(220);
}

function draw() {
  circle(random(width), random(height), 10);
}