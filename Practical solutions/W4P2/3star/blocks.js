class Grid {
    static CELL_SIZE = 20;
    #x;
    #y;
    #cells;

    /**
     * Creates a new Grid
     * @param {number} x The x coordinate of the top left corner
     * @param {number} y The y coordinate of the top left corner
     * @param {number[][]} cells A matrix storing the initial contents of the 
     * grid cells. 0 indicates an empty cell. 1 indicates an occupied cell
     */
    constructor(x, y, cells) {
        this.#x = x;
        this.#y = y;
        this.#cells = cells;
    }

    /**
     * Get the Grid x coordinate
     * @returns {number}
     */
    getX() {
        return this.#x;
    }

    /**
     * Sets the Grid x coordinate
     * @param {number} newX 
     */
    setX(newX) {
        this.#x = newX;
    }

    /**
     * Get the Grid y coordinate
     * @returns {number}
     */
    getY() {
        return this.#y;
    }

    /**
     * Sets the Grid y coordinate
     * @param {number} newY 
     */
    setY(newY) {
        this.#y = newY;
    }


    /**
     * Gets the grid cells
     * @returns {number[][]}
     */
    getCells() {
        return this.#cells;
    }

    /**
     * Sets the grid cells
     * @param {number[][]} newCells 
     */
    setCells(newCells) {
        this.#cells = newCells;
    }

    /**
     * Marks the given grid cell as occupied by setting its contents to 1
     * @param {number} row 
     * @param {number} col 
     */
    fillCell(row, col) {
        this.#cells[row][col] = 1;
    }

    /**
     * Checks if the grid cell at the given x, y coordinate is occupied
     * @param {number} x 
     * @param {number} y 
     * @returns {boolean}
     */
    isOccupiedAtPoint(x, y) {
        const gridW = this.#cells[0].length * Grid.CELL_SIZE;
        const gridH = this.#cells.length * Grid.CELL_SIZE;
        if (x < this.#x || x >= this.#x + gridW || y < this.#y || y >= this.#y + gridH) {
            return true;
        }
        else {
            const row = Math.floor((y - this.#y) / Grid.CELL_SIZE);
            const col = Math.floor((x - this.#x) / Grid.CELL_SIZE);
            return this.#cells[row][col] === 1;
        }
    }

    /**
     * Checks if this grid overlaps with another
     * @param {Grid} other 
     */
    isOverlapping(other) {
        // Check each cell starting with the bottom row (collisions are more likely at the bottom of a piece)
        for (let row = this.#cells.length - 1; row >= 0; row--) {
            for (let col = 0; col < this.#cells[row].length; col++) {
                if (this.#cells[row][col] === 1
                    && other.isOccupiedAtPoint(this.#x + Grid.CELL_SIZE * col, this.#y + Grid.CELL_SIZE * row)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Draw the grid
     */
    draw() {
        for (let row = 0; row < this.#cells.length; row++) {
            for (let col = 0; col < this.#cells[row].length; col++) {
                if (this.#cells[row][col] === 1) {
                    square(this.getX() + Grid.CELL_SIZE * col, this.getY() + Grid.CELL_SIZE * row, Grid.CELL_SIZE);
                }
            }
        }
    }

}


/**
 * Parent class for all Tetromino shapes.
 */
class Tetromino extends Grid {
    static LEFT = "left";
    static RIGHT = "right";
    static DROP = "drop";
    static FAST_DROP = "fast drop";
    static STOP = "stop";
    #state = Tetromino.STOP;
    #target;

    /**
     * Creates a new Tetromino
     * @param {number} x The x coordinate of the Tetromino
     * @param {number} y The y coordinate of the Tetromino
     * @param {number[][]} blocks A matrix describing the layout of blocks in the Tetromino
     * @param {Grid} targetGrid The Grid storing placed Tetrominoes
     */
    constructor(x, y, blocks, targetGrid) {
        super(x, y, blocks);
        this.#target = targetGrid;
    }

    /**
     * Rotate the shape
     */
    rotateRight() {
        // transpose the blocks array
        /**
         * Example - before
         * 0 1 2 3
         * 4 5 6 7
         * 8 9 0 1
         * 
         * after
         * 8 4 0
         * 9 5 1
         * 0 6 2
         * 1 7 3
         */
        const cells = this.getCells();
        const transposed = [];
        // The number of rows in the transposed array will be the number of columns in the existing array
        const transposedRows = cells[0].length;
        // The number of columns in the transposed array will be the number of rows in the existing array
        const transposedCols = cells.length;
        for (let row = 0; row < transposedRows; row++) {
            // Add an empty row in the transposed array
            transposed.push([]);
            for (let col = 0; col < transposedCols; col++) {
                transposed[row][col] = cells[col][transposedRows - row - 1];
            }
        }
        this.setCells(transposed);
        if (this.isOverlapping(this.#target)) {
            // If the rotation put the shape in a blocked position, undo
            this.setCells(cells);
        }
    }

    /**
     * Move the shape
     */
    move() {
        switch (this.#state) {
            case Tetromino.DROP:
            case Tetromino.FAST_DROP:
                this.tryMove(0, Grid.CELL_SIZE);
                break;
            case Tetromino.LEFT:
                this.tryMove(-Grid.CELL_SIZE, 0);
                this.#state = Tetromino.DROP;
                break;
            case Tetromino.RIGHT:
                this.tryMove(Grid.CELL_SIZE, 0);
                this.#state = Tetromino.DROP;
                break
        }
    }

    /**
     * Gets the Tetromino state
     * @returns {string} A string describing the piece's movement
     */
    getState() {
        return this.#state;
    }

    /**
     * Sets the Tetromino state
     * @param {string} newState 
     */
    setState(newState) {
        this.#state = newState;
    }

    /**
     * Tries moving the Tetromino by the given amounts. If the movement is blocked 
     * by already placed pieces or the bottom of the canvas, the movement is reversed.
     * @param {number} xDelta The amount to move on the x axis (in pixels)
     * @param {number} yDelta The amount to move on the y axis (in pixels)
     */
    tryMove(xDelta, yDelta) {
        // if moving horizontally as well as down, check horizontal and vertical moves separately
        if (xDelta !== 0) {
            this.setX(this.getX() + xDelta);
            if (this.isOverlapping(this.#target)) {
                // undo the move but don't change mode 
                this.setX(this.getX() - xDelta);
            }
        }
        this.setY(this.getY() + yDelta);
        if (this.isOverlapping(this.#target)) {
            // undo the move and change mode 
            this.setY(this.getY() - yDelta);
            this.#state = Tetromino.STOP;
        }
    }
    
}

class I extends Tetromino {

    /**
     * Creates a new I Tetromino
     * @param {number} x 
     * @param {number} y 
     * @param {Grid} target 
     */
    constructor(x, y, target) {
        const matrix = [
            [1, 1, 1, 1]
        ];
        super(x, y, matrix, target);
    }
}


class O extends Tetromino {

    /**
     * Creates a new O Tetromino
     * @param {number} x 
     * @param {number} y 
     * @param {Grid} target 
     */
    constructor(x, y, target)  {
        const matrix = [
            [1, 1],
            [1, 1]
        ];
        super(x, y, matrix, target);
    }
}

class T extends Tetromino {

    /**
     * Creates a new T Tetromino
     * @param {number} x 
     * @param {number} y 
     * @param {Grid} target 
     */
    constructor(x, y, target)  {
        const matrix = [
            [1, 1, 1],
            [0, 1, 0]
        ];
        super(x, y, matrix, target);
    }
}

class S extends Tetromino {

    /**
     * Creates a new S Tetromino
     * @param {number} x 
     * @param {number} y 
     * @param {Grid} target 
     */
    constructor(x, y, target)  {
        const matrix = [
            [0, 1, 1],
            [1, 1, 0]
        ];
        super(x, y, matrix, target);
    }
}

class Z extends Tetromino {

    /**
     * Creates a new Z Tetromino
     * @param {number} x 
     * @param {number} y 
     * @param {Grid} target 
     */
    constructor(x, y, target)  {
        const matrix = [
            [1, 1, 0],
            [0, 1, 1]
        ];
        super(x, y, matrix, target);
    }
}

class J extends Tetromino {

    /**
     * Creates a new J Tetromino
     * @param {number} x 
     * @param {number} y 
     * @param {Grid} target 
     */
    constructor(x, y, target)  {
        const matrix = [
            [1, 0, 0],
            [1, 1, 1]
        ];
        super(x, y, matrix, target);
    }
}

class L extends Tetromino {

    /**
     * Creates a new L Tetromino
     * @param {number} x 
     * @param {number} y 
     * @param {Grid} target 
     */
    constructor(x, y, target)  {
        const matrix = [
            [0, 0, 1],
            [1, 1, 1]
        ];
        super(x, y, matrix, target);
    }
}