class GameObject {
    #x;
    #y;
    #w;
    #h;

    /**
     * Creates a new generic game object
     * @param {number} x The x coordinate
     * @param {number} y The y coordinate
     * @param {number} w The width of the obstacle
     * @param {number} h The height of the obstacle
     */
    constructor(x, y, w, h) {
        this.#x = x;
        this.#y = y;
        this.#w = w;
        this.#h = h;
    }

    /**
     * Gets the x coordinate
     * @returns {number}
     */
    getX() {
        return this.#x;
    }

    /**
     * Sets the x coordinate
     * @param {number} newX 
     */
    setX(newX) {
        this.#x = newX;
    }


    /**
     * Gets the y coordinate
     * @returns {number}
     */
    getY() {
        return this.#y;
    }

    /**
     * Sets the y coordinate
     * @param {number} newY 
     */
    setY(newY) {
        this.#y = newY;
    }


    /**
     * Gets the width
     * @returns {number}
     */
    getWidth() {
        return this.#w;
    }

    /**
     * Gets the height
     * @returns {number}
     */
    getHeight() {
        return this.#h;
    }

    /**
     * Draws the object - should be implemented in child class
     * Throwing an exception will remind developers of child classes to 
     * implement the draw() method
     */
    draw() {
        throw "Method not implemented!";
    }
}