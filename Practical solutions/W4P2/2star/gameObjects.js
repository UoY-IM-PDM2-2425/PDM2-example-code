class CollisionRect {
    #rectX;
    #rectY;
    #rectWidth;
    #rectHeight;

    constructor() {}

    /**
     * Gets the x coordinate of the collision rect
     * @returns {number}
     */
    getX() {
        return this.#rectX;
    }

    /**
     * Gets the y coordinate of the collision rect
     * @returns {number}
     */
    getY() {
        return this.#rectY;
    }


    /**
     * Gets the width of the collision rect
     * @returns {number}
     */
    getWidth() {
        return this.#rectWidth;
    }


    /**
     * Gets the height of the collision rect
     * @returns {number}
     */
    getHeight() {
        return this.#rectHeight;
    }

    /**
     * Sets the position of the collision rect
     * @param {number} newX 
     * @param {number} newY 
     */
    setPosition(newX, newY) {
        this.#rectX = newX;
        this.#rectY = newY;
    }

    /**
     * Set the dimensions of the collision rect
     * @param {number} newWidth 
     * @param {number} newHeight 
     */
    setRectangle(newWidth, newHeight) {
        this.#rectWidth = newWidth;
        this.#rectHeight = newHeight;
    }


    /**
     * Tests if this CollisionRect has collided with another
     * @param {CollisionRect} other 
     * @returns {boolean}
     */
    hit(other) {
        if (this.#rectX + this.#rectWidth >= other.getX()
            && this.#rectX <= other.getX() + other.getWidth()
            && this.#rectY + this.#rectHeight >= other.getY()
            && this.#rectX <= other.getY() + other.getHeight()) {
            return true;
        }
        return false;
    }
}


class Bullet extends CollisionRect {
    #speedY = -5;
    #active = false;

    constructor() {
        super();
        this.setRectangle(5, 30);
    }

    /**
     * Fires a bullet
     * @param {number} newX 
     * @param {number} newY 
     */
    fire(newX, newY) {
        this.setPosition(newX, newY);
        this.#active = true;
    }

    /**
     * Draws the bullet
     */
    draw() {
        fill(0);
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }

    /**
     * Move the bullet up the screen
     */
    move() {
        this.setPosition(this.getX(), this.getY() + this.#speedY);
        if (this.getY() < -this.getHeight()) {
            this.#active = false;
        }
    }

    /**
     * Checks if the bullet is active
     * @returns {boolean}
     */
    isActive() {
        return this.#active;
    }
}

class Enemy extends CollisionRect {
    #speedX;
    #speedY;

    constructor() {
        super();
        // Make the enemy a random size
        this.setRectangle(random(10, 30), random(10, 30));
        // Put the enemy in random position
        this.setPosition(random(0, width - this.getWidth()), random(0, height - this.getHeight()));
        this.#speedX = random(-3, 3);
        this.#speedY = random(-3, 3);
    }

    /**
     * Move the enemy
     */
    move() {
        if (this.getX() <= 0 || this.getX() >= width - this.getWidth()) {
            this.#speedX *= -1;
        }
        if (this.getY() <= 0 || this.getY() >= height - this.getHeight()) {
            this.#speedY *= -1;
        }
        this.setPosition(this.getX() + this.#speedX, this.getY() + this.#speedY);
    }

    /**
     * Draw the enemy
     */
    draw() {
        fill(0, 0, 255);
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }

}


class Player {
    static MOVE_UP = "up";
    static MOVE_DOWN = "down";
    static MOVE_LEFT = "left";
    static MOVE_RIGHT = "right";
    static STOP = "stop";

    #x;
    #y;
    #SIZE = 20;
    #speed = 3;
    #direction = Player.STOP;

    /**
     * Create a Player
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    /**
     * Get the x coordinate
     * @returns {number}
     */
    getX() {
        return this.#x;
    }

    /**
     * Get the y coordinate
     * @returns {number}
     */
    getY() {
        return this.#y;
    }


    /**
     * Draw the player
     */
    draw() {
        fill(255, 0, 0);
        circle(this.#x, this.#y, this.#SIZE);
    }


    /**
     * Move the player in its current direction
     */
    move() {
        switch (this.#direction) {
            case Player.MOVE_UP:
                this.#y -= this.#speed;
                break;
            case Player.MOVE_DOWN:
                this.#y += this.#speed;
                break;
            case Player.MOVE_LEFT:
                this.#x -= this.#speed;
                break;
            case Player.MOVE_RIGHT:
                this.#x += this.#speed;
                break;
        }
    }

    /**
     * Sets the player status
     * @param {string} newStatus One of the static direction variables
     */
    setStatus(newStatus) {
        this.#direction = newStatus;
    }
}