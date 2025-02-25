class Penguin {
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
        this.#x = x;
        this.#y = y;
        this.#h = h;
        this.#direction = direction;
        this.#sound = sound;
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