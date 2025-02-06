let puppy, puppyX, puppyY;
const PUPPY_W = 200;
const activeTouches = new Map();


function preload() {
  puppy = loadImage("assets/puppy.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  puppyX = width / 2;
  puppyY = height / 2;
}

function draw() {
  background(255);
  image(puppy, puppyX, puppyY, PUPPY_W, PUPPY_W);
}

/**
 * Move the puppy image depending on the detected gesture
 * @param {string} gestureType The type of gesture
 */
function movePuppy(gestureType) {
  switch (gestureType) {
    case "up":
      puppyY = PUPPY_W / 2;
      break;
    case "down":
      puppyY = height - PUPPY_W / 2;
      break;
    case "left":
      puppyX = PUPPY_W / 2;
      break;
    case "right":
      puppyX = width - PUPPY_W / 2;
      break;
    
  }
}

function touchStarted() {
  // Go through touches and find the new one
  for (const touch of touches) {
    if (!activeTouches.has(touch.id)) {
      activeTouches.set(touch.id, new Gesture(frameCount, touch.x, touch.y));
    }
  }
}

function touchMoved() {
  // Update the active touches
  for (const touch of touches) {
    activeTouches.get(touch.id).addTouch(frameCount, touch.x, touch.y);
  }
}

function touchEnded() {
  // Process the completed touch (and remove from tracking)
  // To find the completed touch, loop through activeTouches and find one that isn't in the system variable touches.
  // The following line uses the JS map function to create an array of touch ids
  const currentTouchIDs = touches.map(touch => touch.id);
  for (const [id, touch] of activeTouches) {
    // If the touch id is not found in the array of current touch ids, it must have completed
    if (!currentTouchIDs.includes(id)) {
      console.log(touch.getGestureType());
      movePuppy(touch.getGestureType());
      activeTouches.delete(id);
    }
  }
}
