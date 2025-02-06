const circleX = [];
const circleY = [];
let circleSize = 20;
let fillColour;

function setup() {
    createCanvas(400, 400);
    fillColour = getRandomColour();
    // Call addNewCircle() every three seconds
    setInterval(addNewCircle, 3000);
}


function draw() {
    background(0);
    fill(fillColour);
    // Change the circle size
    if (keyIsPressed) {
        switch (key) {
            case "a":
                circleSize = max(10, circleSize - 1);
                break;
            case "d":
                circleSize = min(50, circleSize + 1);
                break;
        }
    }
    for (let i = 0; i < circleX.length; i++) {
        circle(circleX[i], circleY[i], circleSize);
    }
}


function mouseClicked() {
    fillColour = getRandomColour();
}


/**
 * Adds a new circle at a random location.
 */
function addNewCircle() {
    circleX.push(random(width));
    circleY.push(random(height));
}



/**
 * Gets a random colour
 * @returns {color}
 */
function getRandomColour() {
    return color(random(255), random(255), random(255));
}