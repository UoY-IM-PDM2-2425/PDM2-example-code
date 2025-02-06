class Grid {
    #cells;
    #cellSize;

    constructor(cellSize) {
        this.#cellSize = cellSize;
        this.#createEmptyGrid();
    }

    /**
     * Creates a 2D array with all the cells initially set to false (empty)
     */
    #createEmptyGrid() {
        // if the cell size doesn't fit perfectly in the dimensions of the canvas, the last row / col will extend off the canvas
        const numRows = Math.ceil(height / this.#cellSize); 
        const numCols = Math.ceil(width / this.#cellSize);
        this.#cells = [];
        for (let row = 0; row < numRows; row++) {
            this.#cells[row] = []; // add an empty row
            for (let col = 0; col < numCols; col++) {
                // Set each cell on the row to false to start with
                this.#cells[row][col] = false;
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
                // Mark the cell as occupied
                this.#cells[row][col] = true;
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
        return this.#cells[row][col]; // return the content of the grid cell
    }

    /**
     * Convert an x or y coordinate to an array index
     * @param {number} coord One coordinate - either x or y
     * @returns {number} The index of the row or col that contains the coordinate
     */
    #getIndexOfCoord(coord) {
        return Math.floor(coord / this.#cellSize);
    }

    /**
     * The prefix _ is a convention meaning "protected" - a method that is not intended 
     * to be used in production. Handy for temporary debugging purposes.
     * 
     * This method will draw the grid to make it easier to check the add obstacle 
     * method is working
     */
    _showGrid() {
        for (let row = 0; row < this.#cells.length; row++) {
            const y = row * this.#cellSize;
            for (let col = 0; col < this.#cells[row].length; col++) {
                const x = col * this.#cellSize;
                stroke(255, 0, 255);
                strokeWeight(3);
                noFill();
                square(x, y, this.#cellSize);
                if (this.#cells[row][col]) {
                    noStroke();
                    fill(255, 0, 255);
                    textSize(20);
                    textAlign(CENTER, CENTER);
                    text(this.#cells[row][col], x, y, this.#cellSize, this.#cellSize);
                }
            }
        }
    }
}