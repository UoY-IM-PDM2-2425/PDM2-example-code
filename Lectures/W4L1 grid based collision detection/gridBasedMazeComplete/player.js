class Player extends GameObject {
    #colour;
    #speed;

    /**
     * Creates a new Player
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     * @param {Color} colour 
     * @param {number} speed
     */
    constructor(x, y, w, h, colour, speed) {
        super(x, y, w, h);
        this.#colour = colour;
        this.#speed = speed;
    }


    /**
     * Draw the player.
     * @override
     */
    draw() {
        noStroke();
        fill(this.#colour);
        rect(super.getX(), super.getY(), super.getWidth(), super.getHeight());
    }


    /**
     * Gets the speed of the player
     * @returns {number}
     */
    getSpeed() {
        return this.#speed;
    }


    /**
     * Sets the speed of the player
     * @param {number} newSpeed 
     */
    setSpeed(newSpeed) {
        this.#speed = newSpeed;
    }


    /**
     * Move the player right at the current speed
     */
    moveRight() {
        this.setX(this.getX() + this.#speed);
    }

    /**
     * Move the player left at the current speed
     */
    moveLeft() {
        this.setX(this.getX() - this.#speed);
    }


    /**
     * Move the player down at the current speed
     */
    moveDown() {
        this.setY(this.getY() + this.#speed);
    }

    /**
     * Move the player up at the current speed
     */
    moveUp() {
        this.setY(this.getY() - this.#speed);
    }
}