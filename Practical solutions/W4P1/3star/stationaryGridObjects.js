/**
 * This implementation of a stationary object is slightly different 
 * from the previous examples. Read it carefully!
 */
class StationaryGridObject extends GameObject {
    
    #solid;
    #colour;
    #grid;

    /**
     * Creates a new generic obstacle
     * @param {number} col The grid column (top left corner of the object)
     * @param {number} row The grid row (top left corner of the object)
     * @param {number} colSpan The number of columns the object spans
     * @param {number} rowSpan The number of rows the object spans
     * @param {boolean} solid Whether or not the obstacle is solid.
     * @param {Color} colour The colour of the obstacle
     * @param {MovingGrid} grid The grid that this object belongs to
     */
    constructor(col, row, colSpan, rowSpan, solid, colour, grid) {
        super(col, row, colSpan, rowSpan);
        this.#solid = solid;
        this.#colour = colour;
        this.#grid = grid;
        // The this keyword represents the current instance of a StationaryGridObject so it can be passed just like a variable name
        grid.addToGrid(this);
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
     * Gets the x coordinate of the object.
     * @returns {number}
     * @override
     * Note: because the object's #x attribute actually stores its grid column, some 
     * calculations are needed to convert this to an actual x coordinate.
     */
    getX() {
        return super.getX() * this.#grid.getCellSize() + this.#grid.getOffsetX();
    }


    /**
     * Gets the y coordinate of the object.
     * @returns {number}
     * @override
     * Note: because the object's #y attribute actually stores its grid row, some 
     * calculations are needed to convert this to an actual y coordinate.
     */
    getY() {
        return super.getY() * this.#grid.getCellSize();
    }


    /**
     * Gets the width of the object.
     * @returns {number}
     * @override
     * Note: because the object's #w attribute actually stores its grid column span, some 
     * calculations are needed to convert this to the width in pixels.
     */
    getWidth() {
        return super.getWidth() * this.#grid.getCellSize();
    }


    /**
     * Gets the height of the object.
     * @returns {number}
     * @override
     * Note: because the object's #h attribute actually stores its grid row span, some 
     * calculations are needed to convert this to the height in pixels.
     */
    getHeight() {
        return super.getHeight() * this.#grid.getCellSize();
    }


    /**
     * Returns the grid row of this object. 
     * @returns {number}
     */
    getRow() {
        // This would not work if this. was used instead of super.!
        // Calling this.getY() would call the overridden method above
        // Calling super.getY() calls the implementation in the parent class, which will return the value of the #y attribute.
        return super.getY();
    }


    /**
     * Returns the grid column of this object. 
     * @returns {number}
     */
    getCol() {
        // This would not work if this. was used instead of super.!
        // Calling this.getX() would call the overridden method above
        // Calling super.getX() calls the implementation in the parent class, which will return the value of the #y attribute.
        return super.getX();
    }

    /**
     * Returns the row span of this object. 
     * @returns {number}
     */
    getRowSpan() {
        return super.getHeight();
    }

    /**
     * Returns the column span of this object. 
     * @returns {number}
     */
    getColSpan() {
        return super.getWidth();
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


class GridWall extends StationaryGridObject {


    /**
     * Creates a new wall
     * @param {number} col The grid column (top left corner of the object)
     * @param {number} row The grid row (top left corner of the object)
     * @param {number} colSpan The number of columns the object spans
     * @param {number} rowSpan The number of rows the object spans
     * @param {MovingGrid} grid The grid that this object belongs to
     */
    constructor(col, row, colSpan, rowSpan, grid) {
        super(col, row, colSpan, rowSpan, true, color(100), grid);
    }
}