function setup() {
    createCanvas(400, 300);
    textAlign(CENTER, CENTER);
    textSize(36);
}

function draw() {} // Not technically needed

function keyPressed() {
    const ROWS = 3;
    const COLS = 4;
    let cellWidth = width / COLS;
    let cellHeight = height / ROWS;
    // Get a 2D array of random numbers and draw it on the canvas
    background(255);
    const randomArr = random2DArray(ROWS, COLS, 20);
    for (let row = 0; row < randomArr.length; row++) {
        for (let col = 0; col < randomArr[row].length; col++) {
            text(randomArr[row][col], col * cellWidth, row * cellHeight, cellWidth, cellHeight);
        }
    }
}

/**
 * Generates a 2D array of the given size and populates it with random integers
 * @param {number} numRows The number of "rows" in the 2D array (the size of the outer array)
 * @param {number} numColumns The number of "columns" in the 2D array (the size of each nested array)
 * @param {number} maxValue The maximum value to populate the array with
 * @returns {number[][]} A 2D array of random integers between 0 and maxValue
 */
function random2DArray(numRows, numColumns, maxValue) {
    const arr = [];
    for (let row = 0; row < numRows; row++) {
        arr[row] = [] // Add an empty array representing a row
        for (let col = 0; col < numColumns; col++) {
            arr[row][col] = randomInt(maxValue);
        }
    }
    return arr;
}

/**
 * Gets a random integer between 0 and some maximum.
 * @param {number} max The maximum value of the random number + 1
 * @returns {number} A random integer between 0 and max (exclusive)
 */
function randomInt(max) {
    return floor(random(max));
}