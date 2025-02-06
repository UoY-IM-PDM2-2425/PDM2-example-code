const shapes = [];
const NUM_SHAPES = 5;


function setup() {
    createCanvas(400, 400);
    rectMode(CENTER);
    for (let i = 0; i < NUM_SHAPES; i++) {
        shapes.push(new Shape(random(width), random(height), random(20, 100)))
    }
}

function draw() {
    background(255);
    for (const shape of shapes) {
        shape.drawShape();
    }
}

function mouseClicked() {
    for (const shape of shapes) {
        if (shape.isMouseOver()) {
            console.log("Shape width before =", shape.w);
            makeBiggerValue(shape.w);
            // makeBiggerReference(shape);
            console.log("Shape width after =", shape.w);
        }
    }
}

/**
 * Attempts to make a shape bigger (will not work because w is a value, not a reference)
 * @param {number} w The starting width of a shape - a value
 */
function makeBiggerValue(w) {
    w += 5;
}


/**
 * Makes the shape bigger
 * @param {Shape} shape The shape to change - a reference
 */
function makeBiggerReference(shape) {
    shape.w += 5;
}


class Shape {
    x;
    y;
    w;
    colour;

    /**
     * Creates a new Shape with random colour
     * @param {number} x The centre x coordinate
     * @param {number} y The centre y coordinate
     * @param {number} w The width of the shape
     */
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.colour = color(random(255), random(255), random(255));
    }

    /**
     * Draws the shape
     */
    drawShape() {
        fill(this.colour);
        square(this.x, this.y, this.w);
    }

    /**
     * Checks if the mouse is over the shape
     * @returns {Boolean} True if the mouse is over the shape, false if not.
     */
    isMouseOver() {
        const halfSize = this.w / 2;
        return mouseX >= this.x - halfSize && mouseX <= this.x + halfSize
                            && mouseY >= this.y - halfSize && mouseY <= this.y + halfSize;
    }
}