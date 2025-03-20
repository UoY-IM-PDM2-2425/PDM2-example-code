let strokeCB, fillCB;

function setup() {
    createCanvas(300, 300);
    strokeCB = new Checkbox(10, 10, 30, 30, "Show stroke");
    fillCB = new Checkbox(10, 50, 30, 30, "Show fill");
    fillCB.check();
}

function draw() {
    background(255);
    strokeCB.draw();
    fillCB.draw();

    if (strokeCB.isChecked()) {
        strokeWeight(5);
        stroke(255, 0, 255);
    } else {
        noStroke();
    }

    if (fillCB.isChecked()) {
        fill(0);
    } else {
        noFill();
    }
    circle(80, 230, 50);
    circle(150, 230, 50);
    circle(220, 230, 50);
}

function mousePressed() {
    strokeCB.click(mouseX, mouseY);
    fillCB.click(mouseX, mouseY);
}

function mouseMoved() {
    strokeCB.hover(mouseX, mouseY);
    fillCB.hover(mouseX, mouseY);
}
