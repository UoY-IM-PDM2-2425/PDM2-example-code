class Alien {
    #x;
    #y;
    #w;
    #h;

    /**
     * Creates a new alien
     * @param {number} x The x coordinate
     * @param {number} y The y coordinate
     * @param {number} w The width
     */
    constructor(x, y, w) {
        this.#x = x;
        this.#y = y;
        this.#w = w;
        this.#h = w * 0.6;
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
     * Resize the alien
     * @param {number} deltaW The amount to resize the width by, a proportion (e.g. 0.5 will halve the width)
     * @param {number} deltaH The amount to resize the height by
     */
    resize(deltaW, deltaH) {
        this.#w *= deltaW;
        this.#h *= deltaH;
    }

    /**
     * Draw the alien
     */
    draw() {
        stroke(0);
        strokeWeight(1);
        // Base
        fill(0, 255, 255);
        arc(this.#x, this.#y, this.#w, this.#h, 0, PI, PIE);
        // Cabin
        fill(255, 255, 160);
        arc(this.#x, this.#y, this.#w * 0.4, this.#h, PI, 0);
        // Alien body
        fill(0, 255, 0);
        arc(this.#x, this.#y, this.#w * 0.3, this.#h * 2 / 3, PI, 0);
        // Alien eyes
        fill(255);
        ellipse(this.#x - this.#w * 0.05, this.#y - this.#h / 4, this.#w * 0.1, this.#h / 4);
        ellipse(this.#x + this.#w * 0.05, this.#y - this.#h / 4, this.#w * 0.1, this.#h / 4);
        fill(0);
        circle(this.#x - this.#w * 0.03, this.#y - this.#h / 4, this.#w * 0.05);
        circle(this.#x + this.#w * 0.03, this.#y - this.#h / 4, this.#w * 0.05);
    }

}