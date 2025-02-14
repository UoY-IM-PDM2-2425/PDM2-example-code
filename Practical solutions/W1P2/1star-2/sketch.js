const fillColours = new Map();
const strokeColours = new Map();
let clickCount = 0;

function setup() {
    createCanvas(400, 400);
    setupfillColours();
    setupStrokeColours();
    background(0);
    strokeWeight(5);
}

function draw() {
}

function mouseClicked() {
    clickCount++;
    background(0);
    if (fillColours.has(clickCount)) {
        fill(fillColours.get(clickCount));
    }
    if (strokeColours.has(clickCount)) {
        stroke(strokeColours.get(clickCount));
    }
    for (let i = 0; i < clickCount; i++) {
        circle(random(50, width - 50), random(50, height - 50), 100);
    }
}


/**
 * Populates the fillColours map
 */
function setupfillColours() {
    fillColours.set(1, color(255, 0, 0));
    fillColours.set(3, color(0, 255, 0));
    fillColours.set(6, color(0, 0, 255));
    fillColours.set(10, color(255, 0, 255));
    fillColours.set(15, color(255, 255, 0));
    fillColours.set(21, color(255, 255, 0));
}

/**
 * Populates the strokeColours map
 */
function setupStrokeColours() {
    strokeColours.set(1, color(255));
    strokeColours.set(2, color(255, 255, 0));
    strokeColours.set(4, color(0, 255, 255));
    strokeColours.set(7, color(255, 0, 255));
    strokeColours.set(11, color(255, 0, 0));
    strokeColours.set(16, color(0, 255, 0));
    strokeColours.set(22, color(0, 0, 255));
}