let frog;

function setup() {
    createCanvas(600, 400);
}

function draw() {
}

function mouseClicked() {
    console.log("begin load")
    frog = loadImage("assets/frog.jpg");
    
    console.log("show image");
    // the image may not be fully loaded by the time the next line is called
    image(frog, 0, 0);
}
