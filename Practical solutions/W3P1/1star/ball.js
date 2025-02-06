class Ball {
    #x;
    #y;
    #w;


    /**
     * Creates a new ball.
     * @param {number} x The ball's x coordinate
     * @param {number} y The ball's y coordinate
     * @param {number} w The diameter of the ball
     */
    constructor(x, y, w) {
        this.#x = x;
        this.#y = y;
        this.#w = w;
    }


    /**
     * Gets the x coordinate.
     * @returns {number}
     */
    getX() {
        return this.#x;
    }


    /**
     * Gets the y coordinate.
     * @returns {number}
     */
    getY() {
        return this.#y;
    }


    /**
     * Draws the ball
     */
    show() {
        circle(this.#x, this.#y, this.#w);
    }


    /**
     * Moves the ball by the given amount
     * @param {number} deltaX The amount to move on the x axis
     * @param {number} deltaY The amount to move on the y axis
     * @example
     * const b = new Ball(100, 50, 200);
     * b.moveBy(2, -5);
     * 
     * The ball will move 2 pixels to the right and 5 pixels up to 102, 45.
     */
    move(deltaX, deltaY) {
        this.#x += deltaX;
        this.#y += deltaY;
    }


    /**
     * Jumps to the given coordinate
     * @param {number} newX 
     * @param {number} newY 
     */
    jump(newX, newY) {
        this.#x = newX;
        this.#y = newY;
    }


    /**
     * Checks if the mouse is over the ball
     * @returns {boolean}
     */
    isMouseOver() {
        return dist(mouseX, mouseY, this.#x, this.#y) <= this.#w;
    }
}