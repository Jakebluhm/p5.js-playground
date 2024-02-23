const squares = 8;
let squareSizes;
let r;
let g;
let b;
// Initialize the arrays for position, velocity, and acceleration
let x;
let y;
let vx = new Array(squares).fill(0); // Velocity in x-direction
let vy = new Array(squares).fill(0); // Velocity in y-direction
let ax = new Array(squares).fill(0); // Acceleration in x-direction
let ay = new Array(squares).fill(0); // Acceleration in y-direction

let trailLength = 10; // Number of trailing squares
let positions = []; // Array to store positions of the square

function setup() {
  createCanvas(800, 800);
  // Initialize x and y to the center of the canvas
  //noStroke();

  squareSizes = new Array(squares);
  r = new Array(squares);
  g = new Array(squares);
  b = new Array(squares);

  for (let i = 0; i < squares; i++) {
    squareSizes[i] = random(10, 90);

    // Generates random RGB values
    r[i] = random(255); // Random red value between 0 and 255
    g[i] = random(255); // Random green value between 0 and 255
    b[i] = random(255); // Random blue value between 0 and 255
  }
  x = new Array(squares).fill(width / 2);
  y = new Array(squares).fill(height / 2);
  frameRate(60); // Optional: Set frame rate for smoother animation
}

function draw() {
  background(220);
  let i = 0;
  for (i; i < squares; i++) {
    // Update acceleration with random values for smoother changes
    ax[i] = random(-0.15, 0.15);
    ay[i] = random(-0.15, 0.15);

    // Update velocity based on acceleration
    vx[i] += ax[i];
    vy[i] += ay[i];

    // Limit the velocity to prevent the square from moving too fast
    vx[i] = constrain(vx[i], -15, 15);
    vy[i] = constrain(vy[i], -15, 15);

    // Update position based on velocity
    x[i] += vx[i];
    y[i] += vy[i];

    // Keep the square within the canvas boundaries
    // x[i] = constrain(x[i], squareSizes[i] / 2, width - squareSizes[i] / 2);
    // y[i] = constrain(y[i], squareSizes[i] / 2, height - squareSizes[i] / 2);

    // Draw a square at position (x, y)
    rectMode(CENTER);
    fill(r[i], g[i], b[i]);
    rect(x[i], y[i], squareSizes[i], squareSizes[i]).fill;

    //console.log(x[i], y[i]);
  }
}