/**
 * The design of this solution could be better...
 * - A class or object literal would be a better way to store the "paired" data - text, x, y, colour
 * - There is some unnecessary repetition (see if you can spot it!), which is balanced out by the use 
 * of functions to separate different components of the task
 */

const EXAM_NUMBER = "Y202324";

let xPositions = [];
let yPositions = [];
let colours = [];


function setup() {
    createCanvas(400, 300);
    createLetters();
    textSize(36);
}

function draw() {
    background(255);
    for (let i = 0; i < EXAM_NUMBER.length; i++) {
        fill(colours[i]);
        text(EXAM_NUMBER[i], xPositions[i], yPositions[i]);
    }
}

function keyPressed() {
    let userIn = key.toUpperCase();
    if (isInExamNumber(userIn)) {
        changeColour(userIn);
    } else {
        changePosition(userIn)
    }
}

/**
 * Populates the arrays storing each character's position and colour.
 */
function createLetters() {
    for (let i = 0; i < EXAM_NUMBER.length; i++) {
        xPositions.push(random(width));
        yPositions.push(random(height));
        colours.push(color(0));
    }
}

/**
 * Changes the colour of all instances of a given character in the 
 * exam number.
 * @param {String} character The character to search for
 */
function changeColour(character) {
    for (let i = 0; i < EXAM_NUMBER.length; i++) {
        if (EXAM_NUMBER[i] === character) {
            colours[i] = getRandomColour();
        }
    }
}

/**
 * Changes the position of every character in the exam number
 */
function changePosition() {
    for (let i = 0; i < EXAM_NUMBER.length; i++) {
        xPositions[i] = random(width - 36);
        yPositions[i] = random(36, height);
    }
}

/**
 * Gets a random RGB colour.
 * @returns {color}
 */
function getRandomColour() {
    return color(random(100, 255), random(100, 255), random(100, 255));
}

/**
 * Checks if a character exists at least one in the exam number
 * @param {String} userIn A character
 * @returns {Boolean} True if the userIn is present in the exam number
 */
function isInExamNumber(userIn) {
    // Note... this can be done in one line with a string method: return EXAM_NUMBER.includes(userIn)
    for (let letter of EXAM_NUMBER) {
        if (userIn === letter) {
            return true;
        }
    }
    return false;
}

