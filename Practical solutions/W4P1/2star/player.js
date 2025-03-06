class Player extends GameObject {
    static MOVE_UP = "up";
    static MOVE_LEFT = "left";
    static MOVE_DOWN = "down";
    static MOVE_RIGHT = "right";
    static STOP = "stop";
    
    #colour;
    #speed;
    #direction = Player.STOP;
    #points = 0;

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
     * Gets the player's points
     * @returns {number}
     */
    getPoints() {
        return this.#points;
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
     * Gets the player direction
     * @returns {string}
     */
    getDirection() {
        return this.#direction;
    }


    /**
     * Sets the direction of the player
     * @param {string} direction One of the Player's direction options
     */
    setDirection(direction) {
        this.#direction = direction;
    }

    /**
     * Move the player in its current direction
     */
    move() {
        switch (this.#direction) {
            case Player.MOVE_UP:
                this.setY(this.getY() - this.#speed);
                break;
            case Player.MOVE_LEFT:
                this.setX(this.getX() - this.#speed);
                break;
            case Player.MOVE_DOWN:
                this.setY(this.getY() + this.#speed);
                break;
            case Player.MOVE_RIGHT:
                this.setX(this.getX() + this.#speed);
                break;
        }
    }


    /**
     * Collect a treasure and add its value to the player's total
     * @param {Treasure} treasure 
     */
    collect(treasure) {
        this.#points += treasure.getPoints();
    }
}