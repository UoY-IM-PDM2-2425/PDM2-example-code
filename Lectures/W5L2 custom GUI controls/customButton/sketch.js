let squareButton, colourButton, clearButton;
let squareX = [];
let squareY = [];
const SQUARE_SIZE = 30;
let fillColour;

function setup() {
    createCanvas(400, 400);
    fillColour = getRandomColour();

    squareButton = new Button(20, 350, 100, 30, "Add Square", function () {
        // Add coordinates for a new square
        squareX.push(random(0, width - SQUARE_SIZE));
        squareY.push(random(0, height - SQUARE_SIZE));
    });

    colourButton = new Button(130, 350, 100, 30, "Change Colour", function () {
        // Set the fill colour to a new random colour
        fillColour = getRandomColour();
    });

    clearButton = new Button(330, 350, 50, 30, "Clear", function () {
        // Remove saved shapes
        squareX = [];
        squareY = [];
    });
}

function draw() {
    background(255);

    drawSquares();

    updateClearButton();

    squareButton.draw();
    colourButton.draw();
    clearButton.draw();
}


function updateClearButton() {
    if (squareX.length === 0) {
        clearButton.disable();
    } else {
        clearButton.enable();
    }
}


/**
 * Draw the saved squares
 */
function drawSquares() {
    fill(fillColour);
    for (let i = 0; i < squareX.length; i++) {
        square(squareX[i], squareY[i], SQUARE_SIZE);
    }
}

function mouseMoved() {
    allButtonsHover();
}

function mousePressed() {
    squareButton.checkClick(mouseX, mouseY);
    colourButton.checkClick(mouseX, mouseY);
    clearButton.checkClick(mouseX, mouseY);
}

function mouseReleased() {
    allButtonsHover();
}

/**
 * Check all buttons for hover
 */
function allButtonsHover() {
    squareButton.checkHover(mouseX, mouseY);
    colourButton.checkHover(mouseX, mouseY);
    clearButton.checkHover(mouseX, mouseY);
}


/**
 * Generate a random RGB colour
 * @returns {Color}
 */
function getRandomColour() {
    return color(random(255), random(255), random(255));
}