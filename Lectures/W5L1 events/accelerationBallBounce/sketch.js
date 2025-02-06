/**
 * Adapted from the p5.js example.
 * Source: https://p5js.org/examples/mobile-acceleration-ball-bounce.html
 * Modified the original to support iOS.
 */


/** iOS SETUP VARIABLES */

// If the sketch is running on an iOS device, this will be set to true
let permissionNeeded = false;
// If permission is needed to access the motion sensors, this will store 
// a button the user can click to allow access
let permissionButton;

/** END iOS SETUP VARIABLES */

// Position Variables
let x = 0;
let y = 0;

// Speed - Velocity
let vx = 0;
let vy = 0;

// Acceleration
let ax = 0;
let ay = 0;

let vMultiplier = 0.007;
let bMultiplier = 0.6;

function setup() {
    createCanvas(windowWidth, windowHeight);

    /** NEEDED FOR iOS SUPPORT */
    permissionButton = createButton("Allow access to motion sensors");
    if (checkIOS()) {
        permissionNeeded = true;
        setupPermissionButton();
    } else {
        permissionButton.hide();
    }
    /** END */

    fill(0);
}

/**
 * Checks if the sketch is running on an iOS device
 * @returns {boolean} True if it is an iOS device, false if not
 */
function checkIOS() {
    // This checks if the browser has functions called "requestPermission" associated with 
    // DeviceMotionEvents or DeviceOrientationEvents. This will only be true for iOS devices
    if (typeof DeviceMotionEvent.requestPermission === "function" || typeof DeviceOrientationEvent.requestPermission === "function") {
        return true;
    }
    return false;
}


/**
 * Set up the permission button to allow iOS users to grant access
 */
function setupPermissionButton() {
    // put the button in the middle of the window
    permissionButton.center();
    permissionButton.mousePressed(() => {
        // Call the requestPermission function
        // It is asynchronous and returns an advanced JS object known as a Promise when it is complete
        // The callback function in then() will be called when the promise is "resolved"
        DeviceMotionEvent.requestPermission()
                         .then(response => {
                                // This code will run when the user responds to the permission request
                                if (response === "granted") {
                                    permissionNeeded = false;
                                    // Hide the permission button
                                    permissionButton.hide();
                                }
        });
    })
}

function draw() {
    background(255);
    ballMove();
    ellipse(x, y, 30, 30);
}
  
function ballMove() {
    ax = accelerationX;
    ay = accelerationY;
  
    vx = vx + ay;
    vy = vy + ax;
    y = y + vy * vMultiplier;
    x = x + vx * vMultiplier;
  
    // Bounce when touch the edge of the canvas
    if (x < 0) {
      x = 0;
      vx = -vx * bMultiplier;
    }
    if (y < 0) {
      y = 0;
      vy = -vy * bMultiplier;
    }
    if (x > width - 20) {
      x = width - 20;
      vx = -vx * bMultiplier;
    }
    if (y > height - 20) {
      y = height - 20;
      vy = -vy * bMultiplier;
    }
}

/**
 * p5.js event function that fires when the window changes size
 */
function windowResized() {
    // p5.js function to resize the canvas
    resizeCanvas(windowWidth, windowHeight);
}