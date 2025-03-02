class Player {
    static ALIVE = "alive";
    static DIED = "died";
    static ESCAPED = "escaped";

    #x;
    #y;
    #xSpeed = 0;
    #state;


    /**
     * Creates a new Player in the centre of the canvas.
     */
    constructor() {
        this.reset();
    }


    /**
     * Resets the Player position to the starting point.
     */
    reset() {
        this.#x = width / 2 - 25;
        this.#y = height / 2 - 25;
        // The Player should always be alive at first
        this.#state = Player.ALIVE;
    }


    /**
     * Move the player
     * @returns {string} The player state after the move (different from starter code)
     */
    move() {
        // Extra functionality: only allow move if the player is alive
        if (this.#state === Player.ALIVE) {
            this.#x += this.#xSpeed;
            if (this.#x < 0) {
                this.#state = Player.DIED;
            } else if (this.#x > width - 50) {
                this.#state = Player.ESCAPED;
            }
        }
        
        return this.#state;
    }


    /**
     * Change the player's speed
     * @param {number} newSpeed 
     */
    setXSpeed(newSpeed) {
        this.#xSpeed = newSpeed;
    }


    /**
     * Draw the player
     */
    draw() {
        fill(255, 0, 0);
        square(this.#x, this.#y, 50);
    }
}