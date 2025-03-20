/**
 * A collision rectangle... but for circles
 */
class CollisionCircle {
    #x;
    #y;
    #radius;

    constructor() {}

    /**
     * Gets the centre x coordinate of the circle
     * @returns {number}
     */
    getX() {
        return this.#x;
    }


    /**
     * Gets the centre y coordinate of the circle
     * @returns {number}
     */
    getY() {
        return this.#y;
    }


    /**
     * Set the collision circle's position
     * @param {number} x 
     * @param {number} y 
     */
    setPosition(x, y) {
        this.#x = x;
        this.#y = y;
    }

    /**
     * Gets the radius of the circle
     * @returns {number}
     */
    getRadius() {
        return this.#radius;
    }


    /**
     * Sets the radius of the circle
     * @param {number} radius 
     */
    setRadius(radius) {
        this.#radius = radius;
    }


    /**
     * Checks if a point is inside the circle
     * @param {number} x 
     * @param {number} y 
     * @returns {boolean} 
     */
    hit(x, y) {
        return dist(x, y, this.#x, this.#y) <= this.#radius;
    }
}


class Joystick {
    static STOPPED = "stopped";
    static DRAGGING = "dragging";
    #state = Joystick.STOPPED;

    #x;
    #y;
    #diameter;
    #handle;
    #maxValue;

    /**
     * Creates a new joystick
     * @param {number} x The centre x coordinate
     * @param {number} y The centre y coordinate
     * @param {number} diameter The diameter of the overall control
     * @param {number} maxValue The maximum value of the joystick control. This should 
     * be a positive number. This is the value that will be returned when the joystick 
     * handle is pulled to the edge.
     */
    constructor(x, y, diameter, maxValue) {
        this.#x = x;
        this.#y = y;
        this.#diameter = diameter;
        this.#maxValue = maxValue;
        this.#handle = new Handle(x, y, Math.max(diameter * 0.25, 50));
    }

    /**
     * Draw the joystick
     */
    draw() {
        // base
        fill(255, 255, 255, 150);
        circle(this.#x, this.#y, this.#diameter);
        // Handle
        this.#handle.draw();
    }

    /**
     * Start dragging the handle if the given coordinates are within the handle.
     * @param {number} x 
     * @param {number} y 
     */
    startDrag(x, y) {
        if (this.#handle.hit(x, y)) {
            this.#state = Joystick.DRAGGING;
        }
    }


    /**
     * Gets the value of the joystick on the x axis. The value is determined by 
     * the handle position. If the handle is in the centre, the value will be 0. 
     * If the handle is to the right of the centre, the value will be positive and 
     * if it is to the left, the value will be negative.
     * @returns {number} A number between -maxValue and +maxValue
     */
    getXValue() {
        const maxDist = this.#diameter / 2 - this.#handle.getRadius();
        return ((this.#handle.getX() - this.#x) / maxDist) * this.#maxValue;
    }


    /**
     * Gets the value of the joystick on the y axis. The value is determined by 
     * the handle position. If the handle is in the centre, the value will be 0. 
     * If the handle is below the centre, the value will be positive and 
     * if it is above, the value will be negative.
     * @returns {number} A number between -maxValue and +maxValue
     */
    getYValue() {
        const maxDist = this.#diameter / 2 - this.#handle.getRadius();
        return ((this.#handle.getY() - this.#y) / maxDist) * this.#maxValue;
    }

    /**
     * Drag the joystick handle if the state is "dragging" but keep it in bounds 
     * of the joystick base.
     * @param {number} x 
     * @param {number} y 
     */
    drag(x, y) {
        if (this.#state === Joystick.DRAGGING) {
            // move the handle - but don't let it leave the joystick base
            const maxDist = this.#diameter / 2 - this.#handle.getRadius();
            if (dist(x, y, this.#x, this.#y) <= maxDist) {
                this.#handle.setPosition(x, y);
            } else {
                // Keep the handle in the base
                const distRatio = dist(x, y, this.#x, this.#y) / maxDist;
                const maxX = ((x - this.#x) / distRatio) + this.#x;
                const maxY = ((y - this.#y) / distRatio) + this.#y;
                this.#handle.setPosition(maxX, maxY);
            }
        }
    }

    /**
     * Stop the drag and put the handle back in the centre.
     */
    stopDrag() {
        this.#state = Joystick.STOPPED;
        this.#handle.setPosition(this.#x, this.#y);
    }
}

class Handle extends CollisionCircle {
    /**
     * Creates a handle for a joystick.
     * @param {number} x 
     * @param {number} y 
     * @param {number} diameter 
     */
    constructor(x, y, diameter) {
        super()
        this.setPosition(x, y);
        this.setRadius(diameter / 2);
    }

    /**
     * Draw the handle.
     */
    draw() {
        circle(this.getX(), this.getY(), this.getRadius() * 2);
    }
}