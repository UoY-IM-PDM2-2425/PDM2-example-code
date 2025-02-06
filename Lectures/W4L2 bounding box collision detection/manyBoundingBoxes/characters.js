class CollisionRect {
    x;
    y;
    width;
    height

    /**
     * Creates a collision rect. This constructor is empty to 
     * allow child classes to set the position and dimensions
     * independently of the collision rect. 
     */
    constructor() {
    }

    /**
     * Sets the position
     * @param {number} newX The new x coordinate
     * @param {number} newY The new y coordinate
     */
    setPosition(newX, newY) {
        this.x = newX;
        this.y = newY;
    }


    /**
     * Sets the width and height.
     * @param {number} newWidth 
     * @param {number} newHeight 
     */
    setDimensions(newWidth, newHeight) {
        this.width = newWidth;
        this.height = newHeight;
    }

    /**
     * Checks if this collision rect has hit another
     * @param {CollisionRect} other Another collision rect
     */
    hit(other) {
        if (this.x + this.width >= other.x // r1 (this) right edge is to the right of r2 (other) left edge
            && this.x <= other.x + other.width // r1 left edge is to the left of r2 right edge
            && this.y + this.height >= other.y // r1 bottom edge is below r2 top edge
            && this.y <= other.y + other.height) { // r1 top edge is above r2 bottom edge
            
            return true;
        }
        return false;
    }

}


class Player extends CollisionRect {
    static MOVE_RIGHT = "right";
    static MOVE_LEFT = "left";
    static MOVE_UP = "up";
    static MOVE_DOWN = "down";
    static STOP = "stop";
    
    #playerX;
    #playerY;
    #playerSpeed;
    #SIZE = 20;

    #state = Player.STOP;

    /**
     * Creates a new player
     * @param {number} x The x coordinate
     * @param {number} y The y coordinate
     * @param {number} speed The player speed
     */
    constructor(x, y, speed) {
        super();
        this.#playerX = x;
        this.#playerY = y;
        this.#playerSpeed = speed;
        this.#updateBoundingBoxPosition();
        this.setDimensions(this.#SIZE, this.#SIZE);
    }

    /**
     * Update the bounding box
     */
    #updateBoundingBoxPosition() {
        this.setPosition(this.#playerX, this.#playerY);
    }


    /**
     * Draw the player
     */
    draw() {
        fill(255, 0, 255);
        square(this.#playerX, this.#playerY, this.#SIZE);
    }


    /**
     * Sets the player state
     * @param {string} newState The new state, corresponding to one of the player's static state variables
     */
    setState(newState) {
        this.#state = newState;
    }

    /**
     * Move the player according to its current state
     */
    move() {
        switch (this.#state) {
            case Player.MOVE_DOWN:
                this.#playerY += this.#playerSpeed;
                break;
            case Player.MOVE_UP:
                this.#playerY -= this.#playerSpeed;
                break;
            case Player.MOVE_LEFT:
                this.#playerX -= this.#playerSpeed;
                break;
            case Player.MOVE_RIGHT:
                this.#playerX += this.#playerSpeed;
                break;
        }
        this.#updateBoundingBoxPosition();
    }

}


class Interactable extends CollisionRect {
    #objectX;
    #objectY;
    #speedX;
    #speedY;
    #size;
    #colour;
    #value;

    /**
     * Creates a new Interactable
     * @param {number} x 
     * @param {number} y 
     * @param {number} size 
     * @param {number} speedX 
     * @param {number} speedY 
     * @param {number} colour 
     * @param {number} value 
     */
    constructor(x, y, size, speedX, speedY, colour, value) {
        super();
        this.#objectX = x;
        this.#objectY = y;
        this.#size = size;
        this.#speedX = speedX;
        this.#speedY = speedY;
        this.#colour = colour;
        this.#value = value;
        this.#updateBoundingBoxPosition();
        this.setDimensions(this.#size, this.#size);
    }

    /**
     * Helper method to update the bounding box position
     */
    #updateBoundingBoxPosition() {
        this.setPosition(this.#objectX - this.#size / 2, this.#objectY - this.#size / 2);
    }


    getX() {
        return this.#objectX;
    }

    getY() {
        return this.#objectY;
    }

    getSpeedX() {
        return this.#speedX;
    }

    turnX() {
        this.#speedX *= -1;
    }

    getSpeedY() {
        return this.#speedY;
    }

    turnY() {
        this.#speedY *= -1;
    }

    /**
     * Updates the object's position
     */
    fly() {
        this.#objectX += this.#speedX;
        this.#objectY += this.#speedY;
        this.#updateBoundingBoxPosition();
    }

    /**
     * Draws the object
     */
    draw() {
        fill(this.#colour);
        circle(this.#objectX, this.#objectY, this.#size);
    }

    /**
     * The value of the object
     * @returns {number}
     */
    getValue() {
        return this.#value;
    }
}


class Meteor extends Interactable {

    /**
     * Creates a new meteor in a random position 
     * of the canvas. Meteors have a value of -1;
     */
    constructor() {
        super(random(width), random(height), 10, random(-10, 10), random(-10, 10), color(255, 255, 0), -1);
    }

    /**
     * Updates the meteor's position
     * @override
     */
    fly() {
        if (this.getX() < 0 || this.getX() > width) {
            this.turnX();
        }
        if (this.getY() < 0 || this.getY() > height) {
            this.turnY();
        }
        super.fly();
    }
}


class SpaceJunk extends Interactable {
    #startX;
    #startY;
    #MAX_POSITION_CHANGE = 50;

    /**
     * Creates a new piece of space junk in a random position 
     * and with a random size. Space junk value is determined
     * by size.
     */
    constructor() {
        const size = random(5, 50);
        const x = random(50, width - 50);
        const y = random(50, height - 50);
        super(x, y, size, random(-1, 1), random(-1, 1), color(0, 0, 255), Math.floor(size * 100));
        // In a child class constructor, "this." can't be used until after 
        // super() is called
        this.#startX = x;
        this.#startY = y;
    }

    /**
     * Updates the meteor's position
     * @override
     */
    fly() {
        if (this.getX() < this.#startX - this.#MAX_POSITION_CHANGE || this.getX() > this.#startX + this.#MAX_POSITION_CHANGE) {
            this.turnX();
        }
        if (this.getY() < this.#startY - this.#MAX_POSITION_CHANGE || this.getY() > this.#startY + this.#MAX_POSITION_CHANGE) {
            this.turnY();
        }
        super.fly();
    }
}