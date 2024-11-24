let img;
let img2;
let img3;

function preload() {
  img = loadImage("assets/colorful.jpg");
  img2 = loadImage("assets/sprite.png");
  img3 = loadImage("assets/tree.jpg");
}

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");
  background(255);
  cam = createCapture(VIDEO);
  cam.hide();
}

function draw() {
  //background(0);
  // background(220);
  // tint(255, 200); 
  // image(img, width / 2, height / 2);
  // blendMode(ADD);
  // tint(10, 120, 180, 50);
  // imageMode(CENTER);
  // image(img2, mouseX, mouseY, 30, 30);
  // filter(THRESHOLD, 0.4);
  // filter(INVERT);
  // filter(BLUR, 3);
  // filter(GRAY); applies to the whole canvas
  // image(img3, 0, 0);

  // for (let i = 0; i < 50; i++) {
  //   let x = random(width);
  //   let y = random(height)
  //   let dia = random(5, 10);
  //   // let selectedColor = img3.get(x, y);
  //   // fill(selectedColor);
  //   let c = img3.get(x, y);
  //   fill(red(c) / 3, green(c) / 2, blue(c));
  //   noStroke();
  //   circle(x, y, dia);
  // }

  // image(cam, 0, 0);
  // for (let i = 0; i < 100; i++) {
  //   let x = random(width);
  //   let y = random(height)
  //   let dia = random(5, 10);
  //   // let selectedColor = img3.get(x, y);
  //   // fill(selectedColor);
  //   let c = cam.get(x, y);
  //   fill(red(c), green(c), blue(c));
  //   noStroke();
  //   circle(x, y, dia);
  // }
  let rectSize = 10;
  cam.loadPixels();
  for (let y = 0; y < cam.width; y += rectSize) {
    for (let x = 0; x < cam.width; x += rectSize) {
      let index = (x + y * width) * 4;
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      let avg = (r + g + b) / 3;
      // map agv to circle size

      noStroke();
      fill(r, g, b);
      // rect(x, y, rectSize, rectSize);
      // circle(x + rectSize / 2, y + rectSize / 2, rectSize);
    }
  }
}
