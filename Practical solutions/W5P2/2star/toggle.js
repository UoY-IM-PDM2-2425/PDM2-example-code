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


class Toggle extends CollisionRect {
    // States
    static ON = "on";
    static OFF = "off";
    static TURNING_ON = "turning on";
    static TURNING_OFF = "turning off";
    #state = Toggle.OFF;

    #switchX;
    #switchY;
    #switchSpeed;
    // These instance variables are not strictly necessary. They are used to 
    // avoid repeating the calculation of each position.
    #switchOffX;
    #switchOnX;

    // The length of a transition animation in frames
    #TRANSITION_TIME = 15;

    /**
     * Creates a new toggle switch
     * @param {number} x The x coordinate of the toggle (top left corner of the overall control)
     * @param {number} y The y coordinate of the toggle (top left corner of the overall control)
     * @param {number} w The width of the control
     * @param {number} h The height of the control
     */
    constructor(x, y, w, h) {
        super();
        // Set the collision rect to cover the whole control so that clicking 
        // anywhere on the control will activate the switch
        this.setPosition(x, y);
        this.setDimensions(w, h);
        this.#switchY = this.getY() + this.getHeight() / 2;
        this.#switchOffX = this.getX() + this.getHeight() / 2;
        this.#switchOnX = this.getX() + this.getWidth() - this.getHeight() / 2;
        this.#switchSpeed = 0;
    }

    /**
     * Checks if the switch is on
     * @returns {boolean}
     */
    isOn() {
        return this.#state === Toggle.ON || this.#state === Toggle.TURNING_ON;
    }

    /**
     * Draw the toggle
     */
    draw() {
        this.#moveSwitch();
        noStroke();
        if (this.#state === Toggle.OFF) {
            fill(150);
        } else if (this.#state === Toggle.ON) {
            fill(0, 204, 255);
        } else {
            // Calculates a colour between the off and on fill colours based on the position of the switch
            const transitionX = (this.#switchX - this.#switchOffX) / (this.#switchOnX - this.#switchOffX);
            // See the p5.js docs: https://p5js.org/reference/#/p5/lerpColor
            const blend = lerpColor(color(150), color(0, 204, 255), transitionX);
            fill(blend);
        }
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight(), this.getHeight() / 2);
        fill(255);
        circle(this.#switchX, this.#switchY, this.getHeight() * 0.75);
    }

    /**
     * Move the switch depending on its state
     */
    #moveSwitch() {
        switch (this.#state) {
            case Toggle.OFF:
                this.#switchX = this.#switchOffX;
                break;
            case Toggle.ON:
                this.#switchX = this.#switchOnX;
                break;
            case Toggle.TURNING_OFF:
                this.#switchX += this.#switchSpeed;
                if (this.#switchX <= this.#switchOffX) {
                    this.#switchX = this.#switchOffX;
                    this.#state = Toggle.OFF;
                }
            case Toggle.TURNING_ON:
                this.#switchX += this.#switchSpeed;
                if (this.#switchX >= this.#switchOnX) {
                    this.#switchX = this.#switchOnX;
                    this.#state = Toggle.ON;
                }
            default:
                break;
        }
    }

    /**
     * Checks if the toggle has been clicked and updates its state as appropriate
     * @param {number} x The mouse x coordinate
     * @param {number} y The mouse y coordinate
     */
    click(x, y) {
        if (this.containsPoint(x, y)) {
            switch (this.#state) {
                case Toggle.ON:
                    this.#state = Toggle.TURNING_OFF;
                    const distToOff = this.#switchOffX - this.#switchOnX;
                    this.#switchSpeed = distToOff / this.#TRANSITION_TIME;
                    break;
                case Toggle.OFF:
                    this.#state = Toggle.TURNING_ON;
                    const distToOn = this.#switchOnX - this.#switchOffX;
                    this.#switchSpeed = distToOn / this.#TRANSITION_TIME;
                    break;
                case Toggle.TURNING_ON:
                case Toggle.TURNING_OFF:
                    // do nothing;
                    break;
            }
        }
    }
}