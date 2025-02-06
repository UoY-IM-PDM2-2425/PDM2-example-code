// Menu options
const MENU = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;
// The starting state is the MENU option
let state = MENU;


function setup() {
    createCanvas(800, 600);
}


function draw() {
    background(255);
    switch (state) {
        case MENU:
            drawMenu();
            break;
        case ONE:
            drawOption("Option 1");
            break;
        case TWO:
            drawOption("Option 2");
            break;
        case THREE:
            drawOption("Option 3");
            break;
        default:
            drawOption("Unknown command!");
    }
}


function keyPressed() {
    switch (key) {
        case "1":
            state = ONE;
            break;
        case "2":
            state = TWO;
            break;
        case "3":
            state = THREE;
            break;
        case " ":
            state = MENU;
            break;
    }
}


/**
 * Draws the background box for all screens
 */
function drawBackground() {
    stroke(255, 0, 0);
    noFill();
    rect(100, 100, 600, 400);
    fill(255, 0, 0);
    textSize(32);
}


/**
 * Draws the MENU option screen
 */
function drawMenu() {
    drawBackground();
    text("Menu", 150, 150);
    textSize(20);
    text("1: Option 1", 150, 200);
    text("2: Option 2", 150, 250);
    text("3: Option 3", 150, 300);
}


/**
 * Draws an option screen
 * @param {string} name The option name
 */
function drawOption(name) {
    drawBackground();
    text(`${name}`, 150, 150);
    text("Press space to return", 150, 350);
}