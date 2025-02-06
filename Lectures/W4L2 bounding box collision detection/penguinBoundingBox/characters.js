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


class Box extends CollisionRect {
    colour;

    /**
     * Creates a Box
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     * @param {number} colour 
     */
    constructor(x, y, w, h, colour) {
        super(); // still have to call super, even though its empty
        
        // Set the bounding box location and dimensions
        this.setPosition(x, y);
        this.setDimensions(w, h);
        this.colour = colour;
    }


    /**
     * Draw the box
     */
    draw() {
        fill(this.colour);
        rect(this.x, this.y, this.width, this.height);
    }
}

class Penguin extends CollisionRect {
    #x;
    #y;
    #h;
    #direction;
    #sound;
    // internal variables to store calculated body positions
    #bodyH;
    #bodyW;
    #headH;
    #headY;
    #beakW;
    #feetW;
    #feetX;
    #backFootY;
    #frontFootY;
    #isWalking = false;


    /**
     * Creates a new penguin
     * @param {number} x The x coordinate of the centre of the penguin's body
     * @param {number} y The y coordinate of the bottom of the penguin's body
     * @param {number} h The penguin's height in pixels
     * @param {number} direction The direction of movement on the x axis
     * @param {SoundFile} sound The p5.SoundFile object to play when the penguin honks
     */
    constructor(x, y, h, direction, sound) {
        // This class originally comes from the W3P1 2 star example solution
        super();
        this.#x = x;
        this.#y = y;
        this.#h = h;
        this.#direction = direction;
        this.#sound = sound;
        // The bounding box is configured in here
        this.#calculatePositions();
    }

    /**
     * Gets the x coordinate
     * @returns {number}
     */
    getX() {
        return this.#x;
    }

    /**
     * Gets the y coordinate
     * @returns {number}
     */
    getY() {
        return this.#y;
    }


    /**
     * Gets the width of the penguin
     * @returns {number}
     */
    getWidth() {
        return this.#bodyW;
    }


    /**
     * Gets the height of the penguin
     * @returns {number}
     */
    getHeight() {
        return this.#h;
    }


    /**
     * Gets the direction of movement on the x axis
     * @returns {number}
     */
    getDirection() {
        return this.#direction;
    }


    /**
     * Draws the penguin
     */
    draw() {
        this.#body();
        // Show the bounding box
        // this.#showBoundingBox();
    }

    /**
     * Helper method that draws the bounding box
     */
    #showBoundingBox() {
        stroke(255, 0, 255);
        noFill();
        rect(this.x, this.y, this.width, this.height);
    }


    /**
     * Turns the penguin to face in the opposite direction
     */
    turn() {
        this.#direction *= -1;
        this.#calculatePositions();
    }


    /**
     * Walk forward by the given amount
     * @param {number} deltaX 
     */
    walk(deltaX) {
        this.#x += deltaX;
        this.#isWalking = true;
        this.#calculatePositions();
    }


    /**
     * Makes the penguin stand still
     */
    stand() {
        this.#isWalking = false;
        this.#calculatePositions();
    }

    /**
     * Moves the penguin by the given amount on the y axis
     * @param {number} deltaY 
     */
    jump(deltaY) {
        this.#y += deltaY;
        this.#calculatePositions();
    }


    /**
     * Increase the penguin's height by the given amount, up to 
     * the maximum provided
     * @param {number} heightIncrease 
     * @param {number} maxHeight 
     */
    grow(heightIncrease, maxHeight) {
        if (this.#h + heightIncrease <= maxHeight) {
            this.#h += heightIncrease;
            this.#calculatePositions();
        }
    }


    /**
     * Plays the penguin's sound
     */
    honk() {
        if (!this.#sound.isPlaying()) {
            this.#sound.play();
        }
    }


    /**
     * Helper method to calculate the relative positions 
     * of each part of the penguin
     */
    #calculatePositions() {
        // Bounding box stuff is at the bottom of this function
        this.#bodyH = this.#h * 0.75;
        this.#bodyW = this.#bodyH * 0.75;
        this.#headH = this.#bodyH * 0.6;
        this.#headY = this.#y - this.#bodyH - (this.#headH / 2) * 0.7;
        if (this.#sound.isPlaying()) {
            this.#beakW = this.#headH;
        } 
        else {
            this.#beakW = this.#headH * 0.5;
        }
        this.#feetW = this.#headH * 0.6;
        if (this.#direction === -1) {
            this.#feetX = this.#x - this.#feetW / 2;
        } else {
            this.#feetX = this.#x + this.#feetW / 2;
        }
        const defaultY = this.#y;
        this.#backFootY = defaultY;
        this.#frontFootY = defaultY;
        if (this.#isWalking) {
            const stepSize = this.#headH * 0.1;
            // swap feet every ten frames
            const interval = Math.floor(frameCount / 10);
            
            if (interval % 2 === 0) {
                this.#frontFootY -= stepSize;
            } else {
                this.#backFootY -= stepSize;
            }
        }
        // BOUNDING BOX CALCULATIONS - leaves out the tail and end of the beak
        const boundingBoxTop = this.#headY - (this.#headH / 2)
        const boundingBoxHeight = this.#y - boundingBoxTop;
        this.setPosition(this.#x - this.#bodyW / 2, boundingBoxTop); 
        this.setDimensions(this.#bodyW, boundingBoxHeight);
    }


    /**
     * Draws the penguin's body, which calls methods to draw other 
     * parts of the penguin in order.
     */
    #body() {
        this.#backFoot();
        fill(255);
        stroke(0);
        ellipse(this.#x, this.#y - this.#bodyH / 2, this.#bodyW, this.#bodyH);
        fill(0);
        const start = this.#direction === -1 ? radians(260) : radians(100);
        const end = this.#direction === -1 ? radians(80) : radians (280);
        arc(this.#x, this.#y - this.#bodyH / 2, this.#bodyW, this.#bodyH, start, end);
        this.#head();
        this.#frontFoot();
        this.#wing();
    }


    /**
     * Draws the penguin's beak
     */
    #beak() {
        fill(255, 0, 0);
        let beakX;
        if (this.#direction === -1) {
            beakX = this.#x - this.#headH / 2;
        } else {
            beakX = this.#x + this.#headH / 2;
        }
        ellipse(beakX, this.#headY, this.#beakW, this.#headH * 0.2)
    }


    /**
     * Draws the penguin's head
     */
    #head() {
        this.#beak();
        fill(0);
        circle(this.#x, this.#headY, this.#headH);
        let eyeX;
        let pupilX;
        if (this.#direction === -1) {
            eyeX = this.#x - this.#headH * 0.25;
            pupilX = this.#x - this.#headH * 0.3;
        } else {
            eyeX = this.#x + this.#headH * 0.25;
            pupilX = this.#x + this.#headH * 0.3;
        }
        fill(255);
        circle(eyeX, this.#headY, this.#headH * 0.3);
        fill(0);
        circle(pupilX, this.#headY, this.#headH * 0.15);
    }


    /**
     * Draws the wing
     */
    #wing() {
        fill(0);
        if (this.#direction === -1) {
            arc(this.#x + this.#bodyW / 3, this.#y - this.#bodyH * 0.5, this.#bodyW, this.#bodyH * 0.9, radians(30), radians(250), OPEN);
        } else {
            arc(this.#x - this.#bodyW / 3, this.#y - this.#bodyH * 0.5, this.#bodyW, this.#bodyH * 0.9, radians(290), radians(120), OPEN);
        }
    }


    /**
     * Draws the back foot
     */
    #backFoot() {
        fill(255, 0, 0);
        arc(this.#feetX + this.#direction * 3, this.#backFootY, this.#feetW, this.#headH * 0.2, radians(180), 0, CHORD);
        //ellipse(this.#feetX + this.#direction * 3, this.#backFootY, this.#feetW, this.#headH * 0.2);
    }


    /**
     * Draws the front foot
     */
    #frontFoot() {
        fill(255, 0, 0);
        arc(this.#feetX, this.#frontFootY, this.#feetW, this.#headH * 0.2, radians(180), 0, CHORD);
        //ellipse(this.#feetX, this.#frontFootY, this.#feetW, this.#headH * 0.2);
    }

}