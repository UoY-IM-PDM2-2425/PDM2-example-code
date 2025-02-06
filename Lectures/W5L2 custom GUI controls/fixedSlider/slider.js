class CollisionRect {
    #x;
    #y;
    #w;
    #h

    constructor() {}

    /**
     * Gets the x coordinate of the rect
     * @returns {number}
     */
    getX() {
        return this.#x;
    }


    /**
     * Gets the y coordinate of the rect
     * @returns {number}
     */
    getY() {
        return this.#y;
    }


    /**
     * Gets the width of the rect
     * @returns {number}
     */
    getWidth() {
        return this.#w;
    }


    /**
     * Gets the height of the rect
     * @returns {number}
     */
    getHeight() {
        return this.#h;
    }


    /**
     * Set the collision rect's position
     * @param {number} x 
     * @param {number} y 
     */
    setPosition(x, y) {
        this.#x = x;
        this.#y = y;
    }


    /**
     * Sets the dimensions of the collision rect
     * @param {number} radius 
     */
    setDimensions(width, height) {
        this.#w = width;
        this.#h = height;
    }


    /**
     * Checks if the rectangle contains the point
     * @param {number} x 
     * @param {number} y 
     */
    containsPoint(x, y) {
        return x >= this.#x && x <= this.#x + this.#w 
                && y >= this.#y && y <= this.#y + this.#h;
    }

}

class Slider extends CollisionRect {
    #pull;
    #minValue;
    #maxValue;
    #currentValue;
    #icon;

    // Two states: in use or not in use
    #isInUse = false;

    constructor(x, y, width, height, min, max, current) {
        super();
        this.setPosition(x, y);
        this.setDimensions(width, height);
        this.#minValue = min;
        this.#maxValue = max;
        this.#currentValue = current;
        this.#pull = new SliderPull(x, y, width, height);
        this.#updatePull();
    }

    /**
     * Set an optional icon for the slider. The icon will be displayed at 32 x 32 pixels
     * @param {string} path 
     */
    setIcon(path) {
        loadImage(path, img => this.#icon = img);
    }

    draw() {
        fill(200, 5, 50);
        strokeWeight(3);
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight(), 5, 5, 5, 5);
        this.#pull.draw();
        if (this.#icon !== undefined) {
            imageMode(CENTER);
            image(this.#icon, this.getX() + this.getWidth() / 2, this.getY() + this.getHeight() * 0.75, 32, 32);
        }
    }

    getValue() {
        return this.#currentValue;
    }

    processDrag(x, y) {
        if (this.#isInUse) {
            // update the pull based on the y value (accounting for max / min)
            // Keep the y coordinate in range
            y = constrain(y, this.getY(), this.getY() + this.getHeight());
            const percentOfHeight = (this.getY() + this.getHeight() - y) / this.getHeight();
            this.#currentValue = percentOfHeight * (this.#maxValue - this.#minValue) + this.#minValue;
            this.#updatePull();
        } else {
            // The second half of the if allows the slider to work if its reduced to 0
            if (this.#pull.containsPoint(x, y) || (this.#pull.getHeight() < 10 && this.containsPoint(x, y))) {
                this.#isInUse = true;
            }
        }
    }

    endDrag() {
        this.#isInUse = false;
    }

    #updatePull() {
        const percentOfRange = (this.#currentValue - this.#minValue) / (this.#maxValue - this.#minValue);
        const pullHeight = percentOfRange * this.getHeight();
        const pullY = this.getY() + this.getHeight() - pullHeight;
        this.#pull.setPosition(this.getX(), pullY);
        this.#pull.setDimensions(this.getWidth(), pullHeight);
    }
}

class SliderPull extends CollisionRect {
    #containerY;

    constructor(x, y, width, height) {
        super();
        this.#containerY = y;
        this.setPosition(x, y);
        this.setDimensions(width, height);
    }

    draw() {
        noStroke();
        fill(255);
        let topCornerRadius = 0;
        if (this.getY() < this.#containerY + 5) {
            topCornerRadius = 5;
        }
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight(), topCornerRadius, topCornerRadius, 5, 5);
    }
}