let penguin;
let speed = -1;
let penguinHonk;

function preload() {
    penguinHonk = loadSound("assets/705839__breviceps__penguin-squeak.wav")
}

function setup() {
    createCanvas(400, 400);
    penguin = new Penguin(width / 2, height, 100, -1, penguinHonk);
}


function draw() {
    background(255);
    if ((penguin.getDirection() === -1 && penguin.getX() > 40)
        || (penguin.getDirection() === 1 && penguin.getX() < width - 40)) {
        penguin.walk(speed);
    } else {
        penguin.turn();
        speed *= -1;
    }
    penguin.draw();
}

function keyPressed() {
    if (key === "h") {
        penguin.honk();
    }
}
