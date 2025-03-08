let ball, catcher;

function setup() {
    createCanvas(400, 600);
    ball = new Ball(width / 2, 0);
    catcher = new Catcher(width / 2, height - 20);
}

function draw() {
    background(255);
    catcher.setPosition(mouseX - catcher.getWidth() / 2, mouseY - catcher.getHeight() / 2);
    if (ball.hit(catcher)) {
        // keep the ball on the catcher
        ball.setPosition(catcher.getX() + catcher.getWidth() / 2, catcher.getY() - ball.getHeight() / 2);
    } else {
        ball.move();
    }
    ball.draw();
    catcher.draw();

}

function keyPressed() {
    if (key === "s") {
        ball.setPosition(random(width), 0);
    }
}