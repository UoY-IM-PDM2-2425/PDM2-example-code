class GridOfObjects {
    #cells;
    #cellSize;

    constructor(cellSize) {
        this.#cellSize = cellSize;
        this.#createEmptyGrid();
    }

    /**
     * Creates a 2D array with all the cells initially set to null (empty)
     */
    #createEmptyGrid() {
        // if the cell size doesn't fit perfectly in the dimensions of the canvas, the last row / col will extend off the canvas
        const numRows = Math.ceil(height / this.#cellSize); 
        const numCols = Math.ceil(width / this.#cellSize);
        this.#cells = [];
        for (let row = 0; row < numRows; row++) {
            this.#cells[row] = []; // add an empty row
            for (let col = 0; col < numCols; col++) {
                // Set each cell on the row to null to start with
                this.#cells[row][col] = null;
            }
        }
    }


    /**
     * Add a stationary object to the grid. Assumes that obstacles are square / rectangular
     * A more complex algorithm would be needed for irregular shapes.
     * @param {StationaryObject} obstacle 
     */
    addToGrid(obstacle) {
        // Find the first cell in the grid based on the x and y
        const rightEdge = obstacle.getX() + obstacle.getWidth();
        const bottomEdge = obstacle.getY() + obstacle.getHeight();
        for (let x = obstacle.getX(); x < rightEdge; x += this.#cellSize) {
            // Identify each cell on the x axis that is occupied by the obstacle
            const col = this.#getIndexOfCoord(x);
            // Identify each cell in the current column that is occupied by the obstacle
            for (let y = obstacle.getY(); y < bottomEdge; y += this.#cellSize) {
                const row = this.#getIndexOfCoord(y);
                // Put the obstacle in the grid
                this.#cells[row][col] = obstacle;
            }
        }
    }


    /**
     * Checks if the grid cell that contains the coordinate is occupied
     * @param {number} x 
     * @param {number} y 
     * @returns {boolean} True if there is an obstacle in the cell, false otherwise
     */
    isOccupied(x, y) {
        // If the coordinate is out of bounds of the canvas, return true
        if (x < 0 || x >= width || y < 0 || y >= height) {
            return true;
        }
        const row = this.#getIndexOfCoord(y);
        const col = this.#getIndexOfCoord(x);
        // returns true if the cell contains an object, and false if it contains null
        return this.#cells[row][col] !== null;
    }


    /**
     * Gets the contents of the cell that contains the x, y coordinates
     * @param {number} x 
     * @param {number} y 
     * @returns {StationaryObject | null}
     */
    getCellContents(x, y) {
        // If the coordinate is out of bounds of the canvas, return null
        if (x < 0 || x >= width || y < 0 || y >= height) {
            return null;
        }
        const row = this.#getIndexOfCoord(y);
        const col = this.#getIndexOfCoord(x);
        // returns the contents of the cell
        return this.#cells[row][col];
    }

    /**
     * Convert an x or y coordinate to an array index
     * @param {number} coord One coordinate - either x or y
     * @returns {number} The index of the row or col that contains the coordinate
     */
    #getIndexOfCoord(coord) {
        return Math.floor(coord / this.#cellSize);
    }

}