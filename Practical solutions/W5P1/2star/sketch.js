let allen;

function setup() {
    createCanvas(windowWidth * 0.5, windowWidth * 0.5);
    allen = new Alien(width / 2, height / 2, 200)
}


function draw() {
    background(0);
    allen.draw();
}

function windowResized() {
    const oldWidth = width;
    const oldHeight = height;
    const newWidth = windowWidth * 0.5;
    const newHeight = newWidth;
    createCanvas(newWidth, newHeight);
    const widthChange = newWidth / oldWidth;
    const heightChange = newHeight / oldHeight;
    allen.setX(width / 2);
    allen.setY(height / 2);
    allen.resize(widthChange, heightChange);
}