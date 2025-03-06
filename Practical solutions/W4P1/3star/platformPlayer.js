/**
 * This class is different from the Player implementation used previously. Read it carefully!
 * Because the background moves horizontally, rather than the player, this player can only move 
 * up and down
 */
class PlatformPlayer extends GameObject {
    static JUMP = "jump";
    static FALL = "fall";
    static STOP = "stop";
    
    #colour;
    #speed;
    #direction = PlatformPlayer.FALL;
    // The y coordinate of the current floor (used when jumping)
    #floor;
    #maxJumpHeight = 80;

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
        this.#floor = height; // the bottom of the canvas by default
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
     * 
     * @param {number} yCoordinate The new floor coordinate
     */
    setFloor(yCoordinate) {
        this.#floor = yCoordinate;
    }

    /**
     * Move the player in its current direction
     */
    move() {
        switch (this.#direction) {
            case PlatformPlayer.JUMP:
                // Checks that the player has not reached the top of the jump
                if (this.getY() - this.#speed > this.#floor - this.getHeight() - this.#maxJumpHeight) {
                    this.setY(this.getY() - this.#speed);
                } else {
                    // The top of the jump has been reached so switch direction
                    this.setDirection(PlatformPlayer.FALL);
                }
                break;
            case PlatformPlayer.FALL:
                this.setY(this.getY() + this.#speed);
                break;
            case PlatformPlayer.STOP:
                this.#floor = this.getY() + this.getHeight();
                break;
        }
    }
}