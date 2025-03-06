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
     * Some stationary objects will be associated with a point value. This 
     * method gets the points for collectable object. Non collectable objects 
     * will return 0.
     * @returns {number}
     */
    getPoints() {
        return 0;
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


class Treasure extends StationaryObject {
    #points;
    /**
     * Creates a new treasure
     * @param {number} x The x coordinate
     * @param {number} y The y coordinate
     * @param {number} w The width
     * @param {number} h The height
     * @param {number} points The point value
     */
    constructor(x, y, w, h, points) {
        super(x, y, w, h, false, color(255, 255, 153));
        this.#points = points;
    }

    /**
     * @override
     */
    draw() {
        super.draw();
        noStroke();
        fill(255, 0, 255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.#points, super.getX(), super.getY(), super.getWidth(), super.getHeight());
    }


    /**
     * Gets the points for this treasure
     * @returns {number}
     */
    getPoints() {
        return this.#points;
    }
}