let penguin, red;
const soundPath = "assets/705839__breviceps__penguin-squeak.wav";
let penguinHonk;

function preload() {
    penguinHonk = loadSound(soundPath);
}

function setup() {
    createCanvas(800, 300);
    penguin = new Penguin(90, height, 100, 1, penguinHonk);
    red = new Box(100, 100, 50, 50, color(255, 0, 0));
}

function draw() {
    background(236, 247, 252);
    penguin.draw();
    red.draw();
    if (keyIsPressed) {
        movePenguin();
    }
}

function mouseDragged() {
    // Move the red box under the mouse
    red.setPosition(mouseX - 25, mouseY - 25);
    // Will only check for collision if the red box is being moved
    if (red.hit(penguin)) {
        penguin.honk();
    }
}


function movePenguin() {
    switch(key) {
        case "a":
            if (penguin.getDirection() > 0) {
                penguin.turn();
            }
            penguin.walk(-3);
            break;
        case "d":
            if (penguin.getDirection() < 0) {
                penguin.turn();
            }
            penguin.walk(3);
            break;
            
    }
}
