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


class Ball extends CollisionRect {
    #x;
    #y;
    #speed = 5;
    #SIZE = 20;


    /**
     * Creates a Ball
     * @param {number} x The centre x coordinate
     * @param {number} y The centre y coordinate
     */
    constructor(x, y) {
        super();
        this.#x = x;
        this.#y = y;
        this.setRectangle(this.#SIZE, this.#SIZE);
        this.#updateCollisionRect();
    }


    /**
     * Sets the position of the collision rectangle. This should be 
     * called every time the ball's position changes
     */
    #updateCollisionRect() {
        // Using super rather than this to make sure the parent implementation is called
        super.setPosition(this.#x - this.#SIZE / 2, this.#y - this.#SIZE / 2);
    }


    /**
     * Draw the ball
     */
    draw() {
        fill(255, 0, 0);
        circle(this.#x, this.#y, this.#SIZE);
    }


    /**
     * Move the ball down the y axis
     */
    move() {
        this.#y += this.#speed;
        this.#updateCollisionRect();
    }

    /**
     * Set the ball's position
     * @override
     */
    setPosition(x, y) {
        this.#x = x;
        this.#y = y;
        this.#updateCollisionRect();
    }
}


class Catcher extends CollisionRect {
    #x;
    #y;
    #w = 50;
    #h = 20;


    /**
     * Creates a new Catcher
     * @param {number} x The x coordinate (CORNER mode)
     * @param {number} y The y coordinate (CORNER mode)
     */
    constructor(x, y) {
        super();
        this.#x = x;
        this.#y = y;
        this.setRectangle(this.#w, this.#h);
        this.setPosition(this.#x, this.#y);
    }


    /**
     * Draw the ball
     */
    draw() {
        fill(0, 0, 255);
        rect(this.#x, this.#y, this.#w, this.#h);
    }


    /**
     * Set the catcher's position and the collision rect position
     * @override
     */
    setPosition(x, y) {
        this.#x = x;
        this.#y = y;
        super.setPosition(this.#x, this.#y);
    }

}

