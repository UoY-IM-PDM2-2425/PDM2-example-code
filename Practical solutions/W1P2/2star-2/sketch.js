const shapes = new Map();

function setup() {
    createCanvas(400, 400);
    shapes.set(ellipse, []);
    shapes.set(rect, []);
}

function draw() {
    background(255);
    for (const [shapeFunction, arguments] of shapes) {
        for (const args of arguments) {
            shapeFunction(...args);
        }
    }
}

function mouseClicked() {
    const args = [mouseX, mouseY, random(20, 50), random(20, 50)]
    if (frameCount % 2 === 0) {
        shapes.get(ellipse).push(args);
    } else {
        shapes.get(rect).push(args);
    }
}