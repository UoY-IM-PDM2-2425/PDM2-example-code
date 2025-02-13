const SIZE = 3;
const PLAYER = "X";
const COMPUTER = "O";
let board;
let isPlayerTurn = true;

function setup() {
    createCanvas(300, 300);
    textAlign(CENTER, CENTER);
    textSize(36);
    createBoard();
    drawBoard();
}

/**
 * Draws the board, including the lines and placed marks.
 */
function drawBoard() {
    background(255);
    for (const row of board) {
        for (const col of row) {
            col.drawCell();
        }
    }
}

function mouseClicked() {
    if (isPlayerTurn && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        const col = getIndex(mouseX, width);
        const row = getIndex(mouseY, height);
        if (board[row][col].place(PLAYER)) {
            drawBoard();
            isPlayerTurn = false;
            const gameOver = checkWinner(PLAYER);
            if (!gameOver) {
                setTimeout(takeComputerTurn, 500);
            }
        }
    }
}

function keyPressed() {
    // restarts the game (whether or not the current game is over!)
    stroke(0);
    isPlayerTurn = true;
    createBoard();
    drawBoard();
}

/**
 * Draws a line to indicate the game has been won.
 * @param {number} fromRow The board row index of the start of the line
 * @param {number} fromCol The board column index of the start of the line
 * @param {number} toRow The board row index of the end of the line
 * @param {number} toCol The board column index of the end of the line
 */
function drawWinningLine(fromRow, fromCol, toRow, toCol) {
    stroke(255, 0, 0);
    const fromX = getLineCoord(fromCol, width);
    const fromY = getLineCoord(fromRow, height);
    const toX = getLineCoord(toCol, width);
    const toY = getLineCoord(toRow, height);
    line(fromX, fromY, toX, toY);
}

/**
 * Converts a row / column index to a pixel coordinate
 * @param {number} index The index in the board array, either row or column
 * @param {number} maxVal The width or height of the canvas
 * @returns {number} One coordinate (x or y) of the centre of the cell at the index
 */
function getLineCoord(index, maxVal) {
    const cellSize = maxVal / SIZE;
    return index * cellSize + cellSize / 2;
}


/**
 * Checks if the player has won the game.
 * @param {String} player The mark to look for, either "X" or "O"
 * @returns {boolean} True if there is a winner, false otherwise.
 */
function checkWinner(player) {
    return checkDiagonalTLBR(player) || checkDiagonalBLTR(player)
            || checkHorizontal(player) || checkVertical(player);
}

/**
 * Checks if the player has a line from TL to BR.
 * @param {String} player The player's mark, either "X" or "O"
 * @returns {boolean} True if the player has a line, false otherwise
 */
function checkDiagonalTLBR(player) {
    for (let i = 0; i < SIZE; i++) {
        if (!board[i][i].containsPlayer(player)) {
            return false;
        }
        if (i === SIZE - 1) { // winner found
            drawWinningLine(0, 0, i, i);
            return true;
        }
    }
    return true;
}


/**
 * Checks if the player has a horizontal line.
 * @param {String} player The player's mark, either "X" or "O"
 * @returns {boolean} True if the player has a line, false otherwise
 */
function checkHorizontal(player) {
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            if (!board[row][col].containsPlayer(player)) {
                break;
            }
            if (col === SIZE - 1) { // winner found
                drawWinningLine(row, 0, row, col);
                return true;
            }
        }
    }
    return false;
}


/**
 * Checks if the player has a vertical line.
 * @param {String} player The player's mark, either "X" or "O"
 * @returns {boolean} True if the player has a line, false otherwise
 */
function checkVertical(player) {
    for (let col = 0; col < SIZE; col++) {
        for (let row = 0; row < SIZE; row++) {
            if (!board[row][col].containsPlayer(player)) {
                break;
            }
            if (row === SIZE - 1) { // winner found
                drawWinningLine(0, col, row, col);
                return true;
            }
        }
    }
    return false;
}


/**
 * Checks if the player has a line from BL to TR.
 * @param {String} player The player's mark, either "X" or "O"
 * @returns {boolean} True if the player has a line, false otherwise
 */
function checkDiagonalBLTR(player) {
    for (let i = 0; i < SIZE; i++) {
        if (!board[SIZE - 1 - i][i].containsPlayer(player)) {
            return false;
        }
    }
    drawWinningLine(SIZE - 1, 0, 0, SIZE - 1);
    return true;
}


/**
 * Manages the computer's turn
 */
function takeComputerTurn() {
    const randomOrderRow = shuffle([0, 1, 2]);
    const randomOrderCol = shuffle([0, 1, 2]);
    for (const row of randomOrderRow) {
        for (const col of randomOrderCol) {
            if (board[row][col].place(COMPUTER)) {
                drawBoard();
                isPlayerTurn = true;
                break;
            }
        }
        if (isPlayerTurn) {
            break;
        }
    }
    if (!isPlayerTurn) {
        alert("It's a draw!");
    }
    else {
        const gameOver = checkWinner(COMPUTER);
        if (gameOver) {
            isPlayerTurn = false;
        }
    }
}

function getIndex(coord, maxVal) {
    const cellSize = maxVal / SIZE;
    return floor(coord / cellSize);
}


/**
 * Populates the board array.
 */
function createBoard() {
    board = [];
    for (let row = 0; row < SIZE; row++) {
        board.push([]);
        for (let col = 0; col < SIZE; col++) {
            const w = width / SIZE;
            const h = height / SIZE;
            const cell = new Cell(col * w, row * h, w, h);
            board[row].push(cell);
        }
    }
}


/**
 * Represents a square of the board
 */
class Cell {
    #x;
    #y;
    #w;
    #h;
    #label = "";

    /**
     * Creates a new empty Cell
     * @param {number} x The x coordinate (CORNER mode) of the cell
     * @param {number} y The y coordinate (CORNER mode) of the cell 
     * @param {number} w The width of the cell
     * @param {number} h The height of the cell
     */
    constructor(x, y, w, h) {
        this.#x = x;
        this.#y = y;
        this.#w = w;
        this.#h = h;
    }

    /**
     * Draws the cell
     */
    drawCell() {
        rect(this.#x, this.#y, this.#w, this.#h);
        text(this.#label, this.#x, this.#y, this.#w, this.#h);
    }

    
    /**
     * Attempts to put the player's mark in the cell. Will only work if 
     * the cell is empty.
     * @param {String} label The player mark, either "X" or "O"
     * @returns {boolean} True if the mark has been placed successfully, false otherwise
     */
    place(label) {
        if (this.#label === "") {
            this.#label = label;
            return true;
        }
        return false;
    }


    /**
     * Checks if cell contains the player's mark
     * @param {String} player The player's mark
     * @returns {boolean} True if the player is occupying the cell, false otherwise.
     */
    containsPlayer(player) {
        return this.#label === player;
    }
}