class StationaryObject extends GameObject {
    
    #solid;
    #colour;


    /**
     * Creates a new generic obstacle
     * @param {number} x The x coordinate
     * @param {number} y The y coordinate
     * @param {number} w The width of the obstacle
     * @param {number} h The height of the obstacle
     * @param {boolean} solid Whether or not the obstacle is solid.
     * @param {Color} colour The colour of the obstacle
     */
    constructor(x, y, w, h, solid, colour) {
        super(x, y, w, h);
        this.#solid = solid;
        this.#colour = colour;
    }


    /**
     * Checks if this object is solid
     * @returns {boolean}
     */
    isSolid() {
        return this.#solid;
    }


    /**
     * Draw the obstacle
     * @override
     */
    draw() {
        noStroke();
        fill(this.#colour);
        rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }
}


class Wall extends StationaryObject {


    /**
     * Creates a new wall
     * @param {number} x The x coordinate
     * @param {number} y The y coordinate
     * @param {number} w The width
     * @param {number} h The height
     */
    constructor(x, y, w, h) {
        super(x, y, w, h, true, color(100));
    }
}