let joystick;
let sq;

function setup() {
    createCanvas(600, 400);
    joystick = new Joystick(100, 300, 150, 5);
    sq = new Square();
}

function draw() {
    background(0);
    sq.draw();
    sq.move();
    joystick.draw();
}

function mousePressed() {
    joystick.startDrag(mouseX, mouseY);
    sq.setSpeed(joystick.getXValue(), joystick.getYValue());

}

function mouseDragged() {
    joystick.drag(mouseX, mouseY);
    sq.setSpeed(joystick.getXValue(), joystick.getYValue());
}

function mouseReleased() {
    joystick.stopDrag();
    sq.setSpeed(joystick.getXValue(), joystick.getYValue());
}


class Square {
    #x;
    #y;
    #speedX;
    #speedY;
    #SIZE = 50;

    /**
     * Creates a square in a random position with speed set to 0.
     */
    constructor() {
        this.#x = random(width - this.#SIZE);
        this.#y = random(height - this.#SIZE);
        this.#speedX = 0;
        this.#speedY = 0;
    }

    /**
     * Draw the square
     */
    draw() {
        fill(255, 165, 0);
        square(this.#x, this.#y, this.#SIZE);
    }


    /**
     * Move the square at the current speed.
     */
    move() {
        const newX = this.#x + this.#speedX;
        const newY = this.#y + this.#speedY;
        if (newX >= 0 && newX <= width - this.#SIZE) {
            this.#x = newX;
        }
        if (newY >= 0 && newY <= height - this.#SIZE) {
            this.#y = newY;
        }
    }


    /**
     * Set the x and y speed
     * @param {number} xSpeed The new speed on the x axis 
     * @param {number} ySpeed The new speed on the y axis
     */
    setSpeed(xSpeed, ySpeed) {
        this.#speedX = xSpeed;
        this.#speedY = ySpeed;
    }
}