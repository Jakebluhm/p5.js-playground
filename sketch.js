const squares = 500;
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
positions = new Array(squares);

function setup() {
  createCanvas(1920, 910);
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

    positions[i] = new Array(trailLength).fill({ x: width / 2, y: height / 2 });
  }
  x = new Array(squares).fill(width / 2);
  y = new Array(squares).fill(height / 2);
  frameRate(60); // Optional: Set frame rate for smoother animation
}

function draw() {
  background(0);
  let i = 0;
  for (i; i < squares; i++) {
    // Update acceleration with random values for smoother changes
    ax[i] = random(-0.99, 0.99);
    ay[i] = random(-0.99, 0.99);

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
    // rectMode(CENTER);
    // fill(r[i], g[i], b[i]);
    // rect(x[i], y[i], squareSizes[i], squareSizes[i]).fill;

    // Current position of the square (for example, moving with the mouse)
    let currentPosition = { x: x[i], y: y[i] };

    // Add the current position to the beginning of the array
    positions[i].unshift(currentPosition);

    // Keep only the latest 'trailLength' positions
    positions[i] = positions[i].slice(0, trailLength);

    // Draw each position in the array as a square
    for (let j = 0; j < positions[i].length; j++) {
      let alpha = map(j, 0, positions[i].length, 255, 0);
      fill(r[i], 100, b[i]);
      let pos = positions[i][j];
      square(pos.x, pos.y, squareSizes[i]);
    }

    //console.log(x[i], y[i]);
  }
}
