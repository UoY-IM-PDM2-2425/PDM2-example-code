let toggle;
let ball;

function setup() {
    createCanvas(300, 300);
    toggle = new Toggle(115, 135, 70, 40);
    ball = new BouncingBall();
}

function draw() {
    background(255);
    ball.draw();
    toggle.draw();
    if (toggle.isOn()) {
        ball.move();
    }
}

function mousePressed() {
    toggle.click(mouseX, mouseY);
}


class BouncingBall {
    #x;
    #y;
    #xSpeed;
    #ySpeed;
    #SIZE = 40;


    /**
     * Creates a new ball in random position and with random speed
     */
    constructor() {
        this.#x = random(this.#SIZE / 2, width - this.#SIZE / 2);
        this.#y = random(this.#SIZE / 2, height - this.#SIZE / 2);
        this.#xSpeed = random(-5, 5);
        this.#ySpeed = random(-5, 5);
    }

    /**
     * Draw the ball
     */
    draw() {
        fill(0);
        circle(this.#x, this.#y, this.#SIZE);
    }

    /**
     * Move the ball
     */
    move() {
        if (this.#x <= this.#SIZE / 2 || this.#x >= width - this.#SIZE / 2) {
            this.#xSpeed *= -1;
        }
        if (this.#y <= this.#SIZE / 2 || this.#y >= height - this.#SIZE / 2) {
            this.#ySpeed *= -1;
        }
        this.#x += this.#xSpeed;
        this.#y += this.#ySpeed;
    }
}