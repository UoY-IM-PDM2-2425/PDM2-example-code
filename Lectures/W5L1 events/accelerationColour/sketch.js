/**
 * Adapted from the p5.js example.
 * Source: https://p5js.org/examples/mobile-acceleration-color.html
 * Modified the original to support iOS.
 */


/** iOS SETUP VARIABLES */

// If the sketch is running on an iOS device, this will be set to true
let permissionNeeded = false;
// If permission is needed to access the motion sensors, this will store 
// a button the user can click to allow access
let permissionButton;

/** END iOS SETUP VARIABLES */

let r, g, b;

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

    r = random(50, 255);
    g = random(0, 200);
    b = random(50, 255);

    textAlign(CENTER, CENTER);
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
    background(r, g, b);
    fill(0);
    text(`rotationX = ${rotationX.toFixed(2)}, rotationY = ${rotationY.toFixed(2)}, rotationZ = ${rotationZ.toFixed(2)}`, width / 2, height / 2)
}

function deviceMoved() {
    r = map(rotationX, -PI, PI, 0, 255);
    g = map(rotationY, -PI, PI, 0, 255);
    b = map(rotationZ, -PI, PI, 0, 255);
}

/**
 * p5.js event function that fires when the window changes size
 */
function windowResized() {
    // p5.js function to resize the canvas
    resizeCanvas(windowWidth, windowHeight);
}


