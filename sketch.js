const squares = 5;
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
let sineDirection = new Array(squares).fill(false); // Acceleration in y-direction
let randomizer = new Array(squares).fill(0);
let sinePosition = new Array(squares).fill(0);

let trailLength = 3; // Number of trailing squares
positions = new Array(squares);

let xAccel = 60.0;
let yAccel = 80.0;
let accelDecayFactor = -120.0;

let Amplitude = 100; // Height of the wave
let Wavelength = 500; // Length of one cycle of the wave

let sineWave = 0;

function setup() {
  createCanvas(1080, 1920);
  background(0);
  // Initialize x and y to the center of the canvas
  //noStroke();

  squareSizes = new Array(squares);
  r = new Array(squares);
  g = new Array(squares);
  b = new Array(squares);
  x = new Array(squares);
  y = new Array(squares);
  for (let i = 0; i < squares; i++) {
    let randomNumber = random(1);
    if (randomNumber < 0.5) {
      sineDirection[i] = true;
    } else {
      sineDirection[i] = false;
    }

    squareSizes[i] = random(5, 60);
    x[i] = width / 2 - squareSizes[i] / 2;
    y[i] = height / 2 - squareSizes[i] / 2;
    // Generates random RGB values
    r[i] = random(0, 250); // Random red value between 0 and 255
    g[i] = random(100, 150); // Random green value between 0 and 255
    b[i] = random(0, 255); // Random blue value between 0 and 255

    randomizer[i] = random(0, Math.PI);

    positions[i] = new Array(trailLength).fill({
      x: 0,
      y: 0,
    });
  }

  frameRate(60); // Optional: Set frame rate for smoother animation
}

let loopCount = 0;
function draw() {
  background(0, 0, 0, 1);

  // Get the elapsed time in milliseconds
  let elapsedTime = millis();

  // Display elapsed time in seconds
  textAlign(CENTER);
  textSize(32);
  fill(255, 255, 255);
  //text(elapsedTime.toFixed(0) + " ms", width / 2, height / 2);

  let i = 0;
  for (i; i < squares; i++) {
    // Update acceleration with random values for smoother changes
    ax[i] = random(
      -xAccel * Math.pow(Math.E, accelDecayFactor * (elapsedTime / 1000)),
      xAccel * Math.pow(Math.E, accelDecayFactor * (elapsedTime / 1000))
    );
    ay[i] = random(
      -yAccel * Math.pow(Math.E, accelDecayFactor * (elapsedTime / 1000)),
      yAccel * Math.pow(Math.E, accelDecayFactor * (elapsedTime / 1000))
    );

    // Update velocity based on acceleration
    vx[i] += ax[i];
    vy[i] += ay[i];

    vx[i] *= 0.99;
    vy[i] *= 0.99;
    // Limit the velocity to prevent the square from moving too fast
    //vx[i] = constrain(vx[i], -15, 15);
    //vy[i] = constrain(vy[i], -15, 15);

    // Update position based on velocity
    x[i] += vx[i];
    y[i] += vy[i];

    // Keep the square within the canvas boundaries
    // x[i] = constrain(x[i], squareSizes[i] / 2, width - squareSizes[i] / 2);
    // y[i] = constrain(y[i], squareSizes[i] / 2, height - squareSizes[i] / 2);

    // Draw a square at position (x, y)
    // rectMode(CENTER);
    // strokeWeight(1);
    // stroke(0, 0, 0, 255);
    // fill(r[i], g[i], b[i]);
    // rect(x[i], y[i], squareSizes[i], squareSizes[i]);

    //Current position of the square (for example, moving with the mouse)
    let _angle = sineWave + randomizer[i];
    let _y = 2 * Amplitude - Amplitude * sin(_angle);
    let currentPosition;
    // if (sineDirection[i]) {
    currentPosition = {
      x: x[i],
      y: 115 + y[i] + _y * Math.pow(Math.E, -0.4 * (elapsedTime / 750)),
    };
    // } else {
    //   currentPosition = { x: x[i] + _y - 2 * Amplitude, y: y[i] };
    // }

    // Add the current position to the beginning of the array

    positions[i].unshift(currentPosition);

    // Keep only the latest 'trailLength' positions
    positions[i] = positions[i].slice(0, trailLength);

    // Draw each position in the array as a square
    for (let j = positions[i].length - 1; j >= 0; j--) {
      fill(r[i], g[i], b[i]);
      if (positions[i][j].x && positions[i][j].y) {
        let pos = positions[i][j];
        stroke(0, 0, 0, 255);
        strokeWeight(1);
        if (loopCount > 2) {
          rect(pos.x, pos.y, squareSizes[i], squareSizes[i]);
        }
      } else {
        continue;
      }
    }

    //console.log(x[i], y[i]);
    loopCount++;
  }

  let amplitude = Amplitude; // Height of the wave
  let wavelength = Wavelength; // Length of one cycle of the wave
  let speed = 0.05; // Speed of the wave
  let phase = frameCount * speed; // Use frameCount to animate

  strokeWeight(2);
  stroke(255, 255, 255, 255);
  fill(0, 0, 0, 255);
  rect(1, 1, width - 2, 4 * amplitude);
  noFill();
  stroke(255, 255, 255); // Sine wave color
  strokeWeight(5); // Sine wave thickness
  beginShape();
  for (let x = 0; x < width; x++) {
    let angle = (TWO_PI * x) / wavelength + phase;
    let ySine =
      2 * amplitude -
      amplitude * sin(angle) * Math.pow(Math.E, -0.4 * (elapsedTime / 750));
    sineWave = angle;
    stroke(255, 0, 0, 255);
    vertex(x, ySine);
  }
  endShape();
  let fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10); // Display FPS rounded to 2 decimal places
}
