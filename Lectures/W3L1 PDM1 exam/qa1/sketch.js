let fillCol1, fillCol2;

let shapes = [];
const CIRCLE_W = 50;

function setup() {
    createCanvas(600, 600);

    fillCol1 = color(0);
    fillCol2 = color(0, 255, 0);

    shapes.push(makeNewShape());
}

function draw() {
    background(150, 150, 250)
    for (let i = 0; i < shapes.length; i++) {
        if (i % 2 === 0) {
            fill(fillCol1);
        } else {
            fill(fillCol2);
        }
        circle(shapes[i].x, shapes[i].y, CIRCLE_W);
    }
    if (mouseIsPressed) {
        moveShapes();
    }
}

function keyPressed() {
    shapes.push(makeNewShape());
}

/**
 * Creates a new object with random x and y coordinates.
 * @returns {Object} An object storing x and y values
 */
function makeNewShape() {
    return {x: random(CIRCLE_W / 2, width - CIRCLE_W / 2), y: random(CIRCLE_W / 2, height - CIRCLE_W / 2)}
}

/**
 * Move all shapes toward the mouse.
 */
function moveShapes() {
    for (let shape of shapes) {
        if (shape.x < mouseX) {
            shape.x++;
        } else if (shape.x > mouseX) {
            shape.x--;
        }
        if (shape.y < mouseY) {
            shape.y++;
        } else if (shape.y > mouseY) {
            shape.y--;
        }
    }
}