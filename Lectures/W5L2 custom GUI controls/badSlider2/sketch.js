/**
 * Brightness icon by Jatu Kumala
 * Source: https://www.freepik.com/icon/brightness_5127340
 */
let slider;
let brightness = 50;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB); // See more: https://editor.p5js.org/aferriss/sketches/BJuQLbkcz
    slider = new Slider(width / 2 - 25, height / 2 - 100, 50, 200, 0, 100, brightness);
    slider.setIcon("assets/brightness_5127340.png");
}

function draw() {
    background(210, 100, 100 - slider.getValue());
    slider.draw();

}

function mouseDragged() {
    slider.processDrag(mouseX, mouseY);
}

function mouseReleased() {
    slider.endDrag();
}