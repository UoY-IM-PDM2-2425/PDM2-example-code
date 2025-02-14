/** @type {Data[]} */
const columns = [];
const NUM_SHAPES = 5;
let ascending = true;
let p;
let message = "Unsorted";

function setup() {
    createCanvas(500, 200);
    randomShapes();
    p = createP(message); // See the DOM section of the p5.js reference
    p.parent(select("main"));
    p.position(5, 0);
}

function draw() {
    background(255);
    for (let i = 0; i < columns.length; i++) {
        const x = width / NUM_SHAPES * i;
        const y = height - columns[i].height;
        columns[i].draw(x, y);
    }
}

function keyPressed() {
    if (key === "w") {
        if (ascending) {
            columns.sort(sortByWidthAscending);
            p.html("Sorted by width, ascending");
        } else {
            columns.sort(sortByWidthDescending);
            p.html("Sorted by width, descending");
        }
    } else if (key === "h") {
        if (ascending) {
            columns.sort(sortByHeightAscending);
            p.html("Sorted by height, ascending");
        } else {
            columns.sort(sortByHeightDescending);
            p.html("Sorted by height, descending");
        }
    } else if (key === "c") {
        if (ascending) {
            columns.sort(sortByColourAscending);
            p.html("Sorted by colour, ascending");
        } else {
            columns.sort(sortByColourDescending);
            p.html("Sorted by colour, descending");
        }
    } else if (keyCode === UP_ARROW || key === "a") {
        ascending = true;
        p.html("Changed mode to ascending. Press w, h, or c to sort.");
    } else if (keyCode === DOWN_ARROW || key === "d") {
        ascending = false;
        p.html("Changed mode to descending. Press w, h, or c to sort.");
    }
}


/**
 * Compares two Data objects by width in ascending order.
 * @param {Data} a 
 * @param {Data} b 
 * @returns {number} > 0 if a's width is less than b's. > 0 if a's width > b's. 0 if the two objects have the same width.
 */
function sortByWidthAscending(a, b) {
    return a.width - b.width;
}

/**
 * Compares two Data objects by width in descending order.
 * @param {Data} a 
 * @param {Data} b 
 * @returns {number} < 0 if a's width is > than b's. > 0 if a's width < b's. 0 if the two objects have the same width.
 */
function sortByWidthDescending(a, b) {
    return b.width - a.width;
}

/**
 * Compares two Data objects by height in ascending order.
 * @param {Data} a 
 * @param {Data} b 
 * @returns {number} < 0 if a's height is less than b's. > 0 if a's height > b's. 0 if the two objects have the same height.
 */
function sortByHeightAscending(a, b) {
    return a.height - b.height;
}


/**
 * Compares two Data objects by height in descending order.
 * @param {Data} a 
 * @param {Data} b 
 * @returns {number} < 0 if a's height is > b's. > 0 if a's height < b's. 0 if the two objects have the same height.
 */
function sortByHeightDescending(a, b) {
    return b.height - a.height;
}

/**
 * Compares two Data objects by colour in ascending order. Sorts by red, then green, then blue channels.
 * @param {Data} a 
 * @param {Data} b 
 * @returns {number} -1 if a's colour is less than b's. +1 if a's colour > b's. 0 if the two objects have the same colour.
 */
function sortByColourAscending(a, b) {
    if (red(a.colour) < red(b.colour)) {
        return -1;
    } else if (red(a.colour) > red(b.colour)) {
        return 1;
    } else {
        // red values are equal, check green
        if (green(a.colour) < green(b.colour)) {
            return -1;
        } else if (green(a.colour) > green(b.colour)) {
            return 1;
        } else {
            // red and green are equal, check blue
            if (blue(a.colour) < blue(b.colour)) {
                return -1;
            } else if (blue(a.colour) > blue(b.colour)) {
                return 1;
            }
        }
        return 0;
    }
}


/**
 * Compares two Data objects by colour in descending order. Sorts by red, then green, then blue channels.
 * @param {Data} a 
 * @param {Data} b 
 * @returns {number} -1 if a's colour is > b's. +1 if a's colour > b's. 0 if the two objects have the same colour.
 */
function sortByColourDescending(a, b) {
    if (red(a.colour) > red(b.colour)) {
        return -1;
    } else if (red(a.colour) < red(b.colour)) {
        return 1;
    } else {
        // red values are equal, check green
        if (green(a.colour) > green(b.colour)) {
            return -1;
        } else if (green(a.colour) < green(b.colour)) {
            return 1;
        } else {
            // red and green are equal, check blue
            if (blue(a.colour) > blue(b.colour)) {
                return -1;
            } else if (blue(a.colour) < blue(b.colour)) {
                return 1;
            }
        }
        return 0;
    }
}

/**
 * Populates the array with random Data objects
 */
function randomShapes() {
    for (let i = 0; i < NUM_SHAPES; i++) {
        const dataWidth = floor(random(1, 5.1)) * 20;
        const dataHeight = floor(random(1, 10.1)) * 20;
        const dataColour = color(random(255), random(255), random(255));
        columns[i] = new Data(dataWidth, dataHeight, dataColour);
    }
}

/**
 * Represents a piece of data e.g. a column in a bar chart.
 */
class Data {
    width;
    height;
    colour;

    /**
     * Creates a new Data object.
     * @param {number} w The width
     * @param {number} h The height
     * @param {Color} col The fill colour
     */
    constructor(w, h, col) {
        this.width = w;
        this.height = h;
        this.colour = col;
    }

    /**
     * Draws the data at the specified coordinates.
     * @param {number} x The x coordinate in CORNER mode
     * @param {number} y The y coordinate in CORNER mode
     */
    draw(x, y) {
        rectMode(CORNER);
        fill(this.colour);
        rect(x, y, this.width, this.height);
    }
}