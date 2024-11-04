let sound;
let amp;

function preload() {
  sound = loadSound("assets/beat.mp3");
}

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  background(220);

  amp = new p5.Amplitude();
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(220, 10);
  // let volValue = map(mouseY, 0, height, 1.0, 0.0, true);
  // //sound.setVolume(volValue);

  // let panValue = map(mouseX, 0, width, 1, -1, true);
  // sound.pan(panValue);
  // // left ear or right ear sound

  // let rateValue = map(mouseY, 0, height, 0.1, 2, true);
  // sound.rate(rateValue);

  //let volume = amp.getLevel();
  let volume = mic.getLevel();
  let dia = map(volume, 0, 1, 1, 500);
  fill(255, 0, 255);
  noStroke();
  circle(width / 2, height / 2, dia);
}

// or mouseDragged
function mousePressed() {
  if (sound.isPlaying() == false) {
    // sound.play();
    sound.loop();
  }
  else {
    sound.pause();
    // sound.stop();
  }
}