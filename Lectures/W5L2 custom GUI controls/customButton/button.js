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


class Button extends CollisionRect {
    // States
    static DISABLED = "disabled";
    static ENABLED = "enabled";
    static HOVER = "hover";
    static PRESSED = "pressed";
    
    // Current state
    #state = Button.ENABLED;

    #label;
    #eventHandler;
    #fillColours;
    #textColours;


    /**
     * Creates a new custom button
     * @param {number} x The x coordinate (CORNER mode)
     * @param {number} y The y coordinate (CORNER mode)
     * @param {number} w The width
     * @param {number} h The height
     * @param {string} label The text to display on the button
     * @param {Function} eventHandler The function to call when the button is clicked
     */
    constructor(x, y, w, h, label, eventHandler) {
        super();
        this.setPosition(x, y);
        this.setDimensions(w, h);
        this.#label = label;
        this.#eventHandler = eventHandler;
        this.#setDefaultColours();
    }

    /**
     * Sets the default colour palette. Fill and text colours are defined for 
     * each state
     */
    #setDefaultColours() {
        this.#fillColours = new Map([
            [Button.DISABLED, color(224)],
            [Button.ENABLED, color(33, 150, 243)],
            [Button.HOVER, color(23, 105, 170)],
            [Button.PRESSED, color(77, 171,245)]
        ]);
        this.#textColours = new Map([
            [Button.DISABLED, color(150)],
            [Button.ENABLED, color(255)],
            [Button.HOVER, color(255)],
            [Button.PRESSED, color(50)]
        ]);
    }


    /**
     * Draw the button
     */
    draw() {
        rectMode(CORNER);
        noStroke();
        // Set fill and text colours based on button state
        const currentFill = this.#fillColours.get(this.#state);
        const currentText = this.#textColours.get(this.#state);
        fill(currentFill);
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight(), 5);
        fill(currentText);
        textAlign(CENTER, CENTER);
        text(this.#label, this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }

    /**
     * Check if the button is hovered
     * @param {number} x The mouse x coordinate
     * @param {number} y The mouse y coordinate
     */
    checkHover(x, y) {
        if (this.#state !== Button.DISABLED) {
            if (this.containsPoint(x, y)) {
                this.#state = Button.HOVER;
            } else {
                this.#state = Button.ENABLED;
            }
        }
    }

    /**
     * Check if the button is clicked and call the event handler if it is
     * @param {number} x The mouse x coordinate
     * @param {number} y The mouse y coordinate
     */
    checkClick(x, y) {
        if (this.#state !== Button.DISABLED && this.containsPoint(x, y)) {
            this.#state = Button.PRESSED;
            // Call the event handler function
            this.#eventHandler();
        }
    }

    /**
     * Disable the button
     */
    disable() {
        this.#state = Button.DISABLED;
    }

    /**
     * Enable the button
     */
    enable() {
        // To avoid conflict with hover and pressed states, only enable the button if
        // it is currently disabled
        if (this.#state === Button.DISABLED) {
            this.#state = Button.ENABLED;
        }
    }

    /**
     * Sets new fill colours
     * @param {Map<string, Color>} colourMap A map of colours (values) by state (string)
     */
    setFillColours(colourMap) {
        // Using a for loop rather than replacing the current fill colour map 
        // allows the user to only change some colours. It also ensures that 
        // all expected states have a colour (e.g. if state is misspelled in the new map)
        for (const [state, colour] of colourMap) {
            if (this.#fillColours.has(state)) {
                this.#fillColours.set(state, colour);
            }
        }
    }

    /**
     * Sets new text colours
     * @param {Map<string, Color>} colourMap A map of colours (values) by state (string)
     */
    setTextColours(colourMap) {
        for (const [state, colour] of colourMap) {
            if (this.#textColours.has(state)) {
                this.#textColours.set(state, colour);
            }
        }
    }
}