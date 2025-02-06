
class CollisionRect {
    x;
    y;
    width;
    height;

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

    /**
     * For debugging only!
     */
    _showCollisionRect() {
        stroke(255, 0, 255);
        strokeWeight(3)
        noFill();
        rect(this.x, this.y, this.width, this.height);
    }

}


class ComplexCollider {
    #boundingBoxX;
    #boundingBoxY;
    #boundingBoxW;
    #boundingBoxH;
    #collisionRects = [];

    constructor() {
    }

    /**
     * Adds an array of collision rectangles
     * @param {CollisionRect[]} rects 
     */
    addCollisionRects(rects) {
        this.#collisionRects = rects;
    }


    /**
     * Gets the collision rects
     * @returns {CollisionRect[]}
     */
    getCollisionRects() {
        return this.#collisionRects;
    }

    /**
     * Sets the position of the overall bounding box. All collision rectangles 
     * will be updated as well.
     * @param {number} newX 
     * @param {number} newY 
     */
    setBoundingBoxPosition(newX, newY) {
        // These variables will be used to adjust the position of the collision rects
        // at the same time as the bounding box
        let deltaX = 0;
        let deltaY = 0;
        if (this.#boundingBoxX !== undefined) {
            deltaX = newX - this.#boundingBoxX;
        }
        if (this.#boundingBoxY !== undefined) {
            deltaY = newY - this.#boundingBoxY;
        }
        this.#boundingBoxX = newX;
        this.#boundingBoxY = newY;
        for (const colRect of this.#collisionRects) {
            colRect.setPosition(colRect.x + deltaX, colRect.y + deltaY);
        }
    }


    /**
     * Sets the dimensions of the overall bounding box. Does not change 
     * the dimensions of the collision rectangles.
     * @param {number} newWidth 
     * @param {number} newHeight 
     */
    setBoundingBoxDimensions(newWidth, newHeight) {
        this.#boundingBoxW = newWidth;
        this.#boundingBoxH = newHeight;
    }

    /**
     * Gets the x coordinate of the overall bounding box
     * @returns {number}
     */
    getBoundingBoxX() {
        return this.#boundingBoxX;
    }


    /**
     * Gets the y coordinate of the overall bounding box
     * @returns {number}
     */
    getBoundingBoxY() {
        return this.#boundingBoxY;
    }

    /**
     * Gets the width of the overall bounding box
     * @returns {number}
     */
    getBoundingBoxW() {
        return this.#boundingBoxW;
    }


    /**
     * Gets the height of the overall bounding box
     * @returns {number}
     */
    getBoundingBoxH() {
        return this.#boundingBoxH;
    }

    /**
     * Checks if this complex collider has hit another
     * @param {ComplexCollider} other 
     * @returns {boolean}
     */
    collide(other) {
        // First check if overall bounding boxes overlap.
        // If they don't overlap, there's no need to check the collision rects.
        if (this.#boundingBoxesOverlap(other)) {
            // check the collision rects
            for (const thisRect of this.#collisionRects) {
                for (const otherRect of other.getCollisionRects()) {
                    if (thisRect.hit(otherRect)) {
                        return true;
                    }
                }
            }
        }
        // The overall bounding boxes don't overlap
        // OR the bounding boxes DO overlap but there is no collision between any pairs of collision rects
        return false;
        
    }

    /**
     * Checks if the overall bounding boxes overlap
     * @param {ComplexCollider} other 
     * @returns {boolean}
     */
    #boundingBoxesOverlap(other) {
        // This is the same logic used in the CollisionRect hit method and in the slides
        if (this.#boundingBoxX + this.#boundingBoxW >= other.getBoundingBoxX() // r1 (this) right edge is to the right of r2 (other) left edge
            && this.#boundingBoxX <= other.getBoundingBoxX() + other.getBoundingBoxW() // r1 left edge is to the left of r2 right edge
            && this.#boundingBoxY + this.#boundingBoxH >= other.getBoundingBoxY() // r1 bottom edge is below r2 top edge
            && this.#boundingBoxY <= other.getBoundingBoxY() + other.getBoundingBoxH()) { // r1 top edge is above r2 bottom edge
            
            return true;
        }
        return false;
    }

    /**
     * For debugging only!
     */
    _showCollider() {
        stroke(255);
        strokeWeight(3)
        noFill();
        rect(this.#boundingBoxX, this.#boundingBoxY, this.#boundingBoxW, this.#boundingBoxH);
        for (const colRect of this.#collisionRects) {
            colRect._showCollisionRect()
        }
    }
}

/**
 * This implementation of Player is different from the previous examples!
 * Player now extends ComplexCollider rather than CollisionRect
 */
class Player extends ComplexCollider {
    static MOVE_RIGHT = "right";
    static MOVE_LEFT = "left";
    static MOVE_UP = "up";
    static MOVE_DOWN = "down";
    static STOP = "stop";
    
    #playerX;
    #playerY;
    #playerSpeed;
    #playerW = 100;
    #playerH = 60;

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
        this.setBoundingBoxDimensions(this.#playerW, this.#playerH);
        this.#createCollisionRects();
    }


    /**
     * Adds the collision rects to the collider. 
     */
    #createCollisionRects() {
        // Figuring out the collision 
        // rects is often a process of trial and error!
        const cabin = new CollisionRect(); 
        cabin.setDimensions(40, 30);
        cabin.setPosition(this.#playerX - 20, this.#playerY - 30);

        const baseTop = new CollisionRect();
        baseTop.setDimensions(100, 15);
        baseTop.setPosition(this.#playerX - 50, this.#playerY);
        
        const baseBottom = new CollisionRect();
        baseBottom.setDimensions(80, 15);
        baseBottom.setPosition(this.#playerX - 40, this.#playerY + 15);

        this.addCollisionRects([
            cabin, baseTop, baseBottom
        ])
    }

    /**
     * Update the bounding box
     */
    #updateBoundingBoxPosition() {
        this.setBoundingBoxPosition(this.#playerX - this.#playerW / 2, this.#playerY - this.#playerH / 2);
    }


    /**
     * Draw the player
     */
    draw() {
        stroke(0);
        strokeWeight(1);
        // Base
        fill(0, 255, 255);
        arc(this.#playerX, this.#playerY, 100, 60, 0, PI, PIE);
        // Cabin
        fill(255, 255, 160);
        arc(this.#playerX, this.#playerY, 40, 60, PI, 0);
        // Alien body
        fill(0, 255, 0);
        arc(this.#playerX, this.#playerY, 30, 40, PI, 0);
        // Alien eyes
        fill(255);
        ellipse(this.#playerX - 5, this.#playerY - 15, 10, 15);
        ellipse(this.#playerX + 5, this.#playerY - 15, 10, 15);
        fill(0);
        circle(this.#playerX - 3, this.#playerY - 15, 5);
        circle(this.#playerX + 3, this.#playerY - 15, 5);
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

/**
 * This implementation of Interactiable is different from the previous examples!
 * Interactable now extends ComplexCollider rather than CollisionRect
 */
class Interactable extends ComplexCollider {
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
        this.setBoundingBoxDimensions(this.#size, this.#size);
        this.#createCollisionRects();
    }

    #createCollisionRects() {
        // As the interactables are simple, the overall bounding box position and dimensions will be used
        const bBox = new CollisionRect();
        bBox.setDimensions(this.#size, this.#size);
        bBox.setPosition(this.getBoundingBoxX(), this.getBoundingBoxY());
        this.addCollisionRects([bBox]);
    }

    /**
     * Helper method to update the bounding box position
     */
    #updateBoundingBoxPosition() {
        this.setBoundingBoxPosition(this.#objectX - this.#size / 2, this.#objectY - this.#size / 2);
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
        noStroke();
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