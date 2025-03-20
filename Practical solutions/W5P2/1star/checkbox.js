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


class Checkbox extends CollisionRect {
    // States
    static DISABLED = "disabled";
    static ENABLED = "enabled";
    static HOVER = "hover";
    #state = Checkbox.ENABLED;

    #label;
    #checked;
    #fillColours;
    #strokeColours;
    #labelColours;

    constructor(x, y, w, h, label) {
        super();
        this.setPosition(x, y);
        this.setDimensions(w, h);
        this.#label = label;
        this.#checked = false;
        this.#setColours();
    }

    #setColours() {
        this.#fillColours = new Map([
            [Checkbox.DISABLED, color(255)],
            [Checkbox.ENABLED, color(255)],
            [Checkbox.HOVER, color(23, 105, 170)]
        ]);
        this.#strokeColours = new Map([
            [Checkbox.DISABLED, color(224)],
            [Checkbox.ENABLED, color(0, 204, 255)],
            [Checkbox.HOVER, color(0, 204, 255)]
        ]);
        this.#labelColours = new Map([
            [Checkbox.DISABLED, color(224)],
            [Checkbox.ENABLED, color(50)],
            [Checkbox.HOVER, color(50)]
        ]);
    }

    isChecked() {
        return this.#checked;
    }

    draw() {
        strokeWeight(3);
        fill(this.#fillColours.get(this.#state));
        stroke(this.#strokeColours.get(this.#state));
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight(), 5);
        noStroke();
        if (this.#checked) {
            textAlign(CENTER, CENTER);
            textSize(this.getHeight() * 0.75);
            fill(this.#strokeColours.get(this.#state))
            text("✓", this.getX(), this.getY(), this.getWidth(), this.getHeight());
        }
        fill(this.#labelColours.get(this.#state));
        textAlign(LEFT, CENTER);
        textSize(this.getHeight() * 0.5)
        text(this.#label, this.getX() + this.getWidth() + 10, this.getY(), AUTO, this.getHeight());
            
    }

    hover(x, y) {
        if (this.#state !== Checkbox.DISABLED) {
            if (this.containsPoint(x, y)) {
                this.#state = Checkbox.HOVER;
            } else {
                this.#state = Checkbox.ENABLED;
            }
        }
    }

    click(x, y) {
        if (this.#state !== Checkbox.DISABLED && this.containsPoint(x, y)) {
            this.#checked = !this.#checked;
        }
    }

    disable() {
        this.#state = Checkbox.DISABLED;
    }

    enable() {
        if (this.#state === Checkbox.DISABLED) {
            this.#state = Checkbox.ENABLED;
        }
    }

    check() {
        if (this.#state !== Checkbox.DISABLED) {
            this.#checked = true;
        }
    }
}