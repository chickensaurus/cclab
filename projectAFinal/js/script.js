// initialize the grid system
// 0=empty 1=occupied
// grid[rows][columns]
let grid = [];

// note: 800/rows and 500/cols must be equal and even
let rows = 40,
    cols = 25;
let xstart = 20,
    ystart = 20;

// fill in grid
for (let i = 0; i < rows + 2; i++) {
    grid.push([]);
    if (i == 0 || i == rows + 1) {
        // the top and bottom border
        for (let j = 0; j < cols + 2; j++) {
            grid[i][j] = 1;
        }
    } else {
        // the middle
        for (let j = 0; j < cols + 2; j++) {
            if (j == 0 || j == cols + 1) {
                grid[i][j] = 1;
            } else {
                grid[i][j] = 0;
            }
        }
    }
}

let heads = [
    [
        (xstart * 800) / rows - 800 / rows / 2,
        (ystart * 500) / cols - 1 - 500 / cols / 2,
        0,
        0, // add one more element for the previous direction
    ],
];
// location and direction
// 0=up 1=right 2=down 3=left 4=dead

grid[xstart][ystart] = 1;
// sets starting cell to be occupied

let br = 0; // not branching

let r = 255,
    g = 255,
    b = 255;

// let clr;

let mx, my;
let pushed = 0;
// for adding heads on mouse click

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container");
    background(145, 15, 0);
    let from = color(random(255), random(255), random(255));
    let to = color(random(255), random(255), random(255));
    let l = 0;
    for (let i = 1000; i > 0; i -= 10) {
        // lerpColor()
        noStroke();
        fill(lerpColor(from, to, i / 1000));
        circle(width / 2, height / 2, i);
    }

}

function draw() {
    // check to see if heads can move
    // randomly choose between going left, right, up, down
    if (frameCount % (800 / rows) == 0) {
        if (pushed == 1) {
            add(mx, my);
        }
        if (br == 1) {
            let l = heads.length;
            // any head that has at least 2 possible paths can split
            // will get duplicated
            for (let i = 0; i < l; i++) {
                let x = (heads[i][0] + 800 / rows / 2) / (800 / rows);
                let y = (heads[i][1] + 800 / rows / 2) / (800 / rows);
                let p = possiblePaths(x, y);
                if (heads[i][2] != 4 && p.length >= 2) {
                    heads.push([heads[i][0], heads[i][1], 0]);
                }
            }
            br = 0;
        }
        for (let i = 0; i < heads.length; i++) {
            if (heads[i][2] != 4) {
                chooseDirection(i);
                //console.log(heads[i][2], heads[i][3]);
                if (heads[i][2] != heads[i][3]) {
                    // draw a circle when the direction changed
                    /*
                    push();
                    fill(255);
                    circle(heads[i][0], heads[i][1], 3);
                    noFill();
                    stroke(0, 255, 0);
                    circle(heads[i][0], heads[i][1], 8);
                    pop();
                    */
                }
            }
        }
    }
    for (let i = 0; i < heads.length; i++) {
        let d = heads[i][2];
        heads[i][3] = d; // store the curr d as prev d
        if (d == 0) {
            heads[i][1] -= 1;
        }
        if (d == 1) {
            heads[i][0] += 1;
        }
        if (d == 2) {
            heads[i][1] += 1;
        }
        if (d == 3) {
            heads[i][0] -= 1;
        }
        if (d != 4) {
            push();
            blendMode(ADD);
            //stroke(200, 120, 10, 100);
            stroke(r, g, b, 100);

            noFill();
            //let k = 10;
            let k = 5 + sin(frameCount * 0.37) * 5;
            circle(heads[i][0], heads[i][1], k);
            //if (frameCount % (800 / rows) == 0) {
            //circle(heads[i][0], heads[i][1], 3);
            //circle(heads[i][0], heads[i][1], 10);
            //}
            pop();
        }
    }

    //r = map(sin(frameCount * 0.009), -1, 1, 0, 255);
    //g = map(sin(frameCount * 0.015), -1, 1, 255, 0);
    //b = map(sin(frameCount * 0.012), -1, 1, 0, 255);

    r = map(mouseX, 0, width, 0, 255);
    g = map(mouseY, 0, height, 0, 255);
    b = map(mouseX, 0, width, 255, 0);

    // explore lerpColor()

    /*
    let c = random(6);
    if (c < 1) {
      r += 1;
    } else if (c < 2) {
      r -= 1;
    } else if (c < 3) {
      g -= 1;
    } else if (c < 4) {
      g += 1;
    } else if (c < 5) {
      b -= 1;
    } else {
      b += 1;
    }
    */

    // if key pressed then check for splits
    if (keyIsPressed) {
        br = 1;
    }

    // if mouse pressed try to push new head into array
    if (mouseIsPressed) {
        pushed = 1;
        mx = mouseX;
        my = mouseY;
    }
}

function chooseDirection(i) {
    let x = (heads[i][0] + 800 / rows / 2) / (800 / rows);
    let y = (heads[i][1] + 800 / rows / 2) / (800 / rows);
    // simple coords
    grid[x][y] = 1; // redundancy
    possible = possiblePaths(x, y);
    let k = random(possible.length);
    if (k < 1) {
        heads[i][2] = possible[0];
    } else if (k < 2) {
        heads[i][2] = possible[1];
    } else if (k < 3) {
        heads[i][2] = possible[2];
    } else {
        heads[i][2] = possible[3];
    }
    finalizeDir(heads[i][2], x, y);

    // dead detector
    if (possible.length == 0) {
        heads[i][2] = 4;
    }
}

function finalizeDir(i, x, y) {
    if (i == 0) {
        grid[x][y - 1] = 1;
    } else if (i == 1) {
        grid[x + 1][y] = 1;
    } else if (i == 2) {
        grid[x][y + 1] = 1;
    } else if (i == 3) {
        grid[x - 1][y] = 1;
    }
}

function possiblePaths(x, y) {
    let paths = [];
    if (x > 1) {
        if (grid[x - 1][y] == 0) {
            paths.push(3);
        }
    }
    if (x < rows) {
        if (grid[x + 1][y] == 0) {
            paths.push(1);
        }
    }
    if (y > 1) {
        if (grid[x][y - 1] == 0) {
            paths.push(0);
        }
    }
    if (y < cols) {
        if (grid[x][y + 1] == 0) {
            paths.push(2);
        }
    }
    return paths;
}

function add(x, y) {
    let xx = floor(x / (800 / rows)); // simple grid coords
    let yy = floor(y / (500 / cols));
    let xxx = (xx * 800) / rows + 10; // into canvas coords
    let yyy = (yy * 500) / cols + 10;
    if (grid[xx + 1][yy + 1] == 0) {
        heads.push([xxx, yyy, 0]);
        pushed = 0;
        grid[xx][yy] = 1;
    }
}
