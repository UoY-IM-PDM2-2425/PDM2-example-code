/**
 * This is only a partial implementation of Tetris
 * Just enough has been completed to demonstrate the collision detection approach
 * Rotate by pressing "w". Move left / right using "a" and "d"
 */

const shapes = ["i", "o", "t", "s", "z", "j", "l"];
let currentShape;
let nextShapeName;
let dropRate = 20;
let grid;

function setup() {
    createCanvas(300, 400);
    setupGrid();
    queueShape();
}

function draw() {
    background(255);
    grid.draw();
    currentShape.draw();
    if (frameCount % dropRate === 0) {
        currentShape.move();
        if (currentShape.getState() === Tetromino.STOP) {
            addToGrid();
            queueShape();
        }
    }
}

function keyPressed() {
    switch (key) {
        case "a":
            currentShape.setState(Tetromino.LEFT);
            currentShape.move();
            break;
        case "d":
            currentShape.setState(Tetromino.RIGHT);
            currentShape.move();
            break;
        case "w":
            currentShape.rotateRight();
            break;
        case "s":
            // Not implemented
            currentShape.setState(Tetromino.FAST_DROP);
            break;
    }
}


/**
 * Add the current shape to the grid storing placed shaped
 */
function addToGrid() {
    // Get the location of the shape
    const x = currentShape.getX();
    const y = currentShape.getY();
    const shapeCells = currentShape.getCells();
    // Work out the grid row and column of the shape
    const startRow = Math.floor(y / Grid.CELL_SIZE);
    const startCol = Math.floor(x / Grid.CELL_SIZE);
    // Copy the filled cells from the shape to the grid
    for (let r = startRow; r < startRow + shapeCells.length; r++) {
        for (let c = startCol; c < startCol + shapeCells[0].length; c++) {
            if (shapeCells[r - startRow][c - startCol] === 1) {
                grid.fillCell(r, c);
            }
        }
    }
}


/**
 * Create a new shape from the queue. 
 */
function queueShape() {
    currentShape = makeShape(chooseRandomShape());
    currentShape.setState(Tetromino.DROP);
    nextShapeName = chooseRandomShape();
}


/**
 * Makes a new shape
 * @param {string} name The name of the Tetronimo shape
 * @returns {Tetronimo} A new Tetronimo of the appropriate sub class
 */
function makeShape(name) {
    switch (name) {
        case "i":
            return new I(120, 0, grid);
        case "o":
            return new O(120, 0, grid);
        case "t":
            return new T(120, 0, grid);
        case "s":
            return new S(120, 0, grid);
        case "z":
            return new Z(120, 0, grid);
        case "j":
            return new J(120, 0, grid);
        case "l":
            return new L(120, 0, grid);
    }
}


/**
 * Randomly choose a shape type from the shapes array
 * @returns {string} The randomly selected shape name
 */
function chooseRandomShape() {
    // Choose a random index in the shapes array
    const index = Math.floor(Math.random() * shapes.length);
    return shapes[index];
}


/**
 * Creates the background grid
 */
function setupGrid() {
    const cells = []
    const rows = height / Grid.CELL_SIZE;
    const cols = width / Grid.CELL_SIZE;
    for (let r = 0; r < rows; r++) {
        cells[r] = [];
        for (let c = 0; c < cols; c++) {
            cells[r][c] = 0;
        }
    }
    grid = new Grid(0, 0, cells);
    
}