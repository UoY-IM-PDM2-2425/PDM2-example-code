let activeTouches = new Map();

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
}

function draw() {
    if (touches.length === 0 || touches.length > 5) {
        background(0); // clear the canvas
    }
    else {
        for (const t of touches) {
            fill(activeTouches.get(t.id));
            circle(t.x, t.y, 50);
        }
    }
}

/**
 * p5.js event function that fires when the window changes size
 */
function windowResized() {
    // p5.js function to resize the canvas
    resizeCanvas(windowWidth, windowHeight);
}



/**
 * Gets a random colour
 * @returns {color}
 */
function getRandomColour() {
    return color(random(255), random(255), random(255));
}


function touchStarted() {
    // touches is a system variable storing an array of touch objects
    // each object has an x and y and a unique id that can be used to 
    // track a touch as it moves
    for (const touch of touches) {
        console.log(touch);
        // Assign a colour to the touch
        activeTouches.set(touch.id, getRandomColour());
    }
}

function touchEnded() {
    // Remove the touch that ended from the activeTouches map
    // Not strictly necessary but saves memory
    const stillActive = touches.map(t => t.id);
    for (const touchId of activeTouches.keys()) {
        // If a touch id is not present in the touches array, it must have ended
        if (!stillActive.includes(touchId)) {
            console.log("deleting", touchId)
            activeTouches.delete(touchId);
        }
    }
}