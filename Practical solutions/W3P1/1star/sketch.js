let bouncingBalls = [];
const COUNT = 10;
const DIAMETER = 50;

function setup() {
    createCanvas(400, 400);

    for (let i = 0; i < COUNT; i++) {
        bouncingBalls.push(new Ball(random(DIAMETER / 2, width - DIAMETER / 2), random(DIAMETER / 2, height - DIAMETER / 2), DIAMETER));
    }
}


function draw() {
    background(0);
    for (const ball of bouncingBalls) {
        ball.show();
        if (ball.isMouseOver()) {
            // This syntax is a ternary - a shorthand way to write a simple if else. 
            const deltaX = mouseX - pmouseX > 0 ? DIAMETER / 2 : -DIAMETER / 2;
            const deltaY = mouseY - pmouseY > 0 ? DIAMETER / 2 : -DIAMETER / 2;
            ball.move(deltaX, deltaY);
        }
    }
}

function keyPressed() {
    if (key === "r") {
        for (const ball of bouncingBalls) {
            ball.jump(random(DIAMETER / 2, width - DIAMETER / 2), random(DIAMETER / 2, height - DIAMETER / 2));
        }
    }
}