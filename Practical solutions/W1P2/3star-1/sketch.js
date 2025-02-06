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
            const gameOver = checkWinner(PLAYER, row, col);
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
 * @param {number} lastPlacedRow The row index of the player's last piece
 * @param {number} lastPlacedCol The column index of the player's last piece
 * @returns {boolean} True if there is a winner, false otherwise.
 */
function checkWinner(player, lastPlacedRow, lastPlacedCol) {
    // Only need to check squares on either size of the last placed piece. 
    // No square will be checked more than once. As soon as a line is found, return.
    
    // Check horizontal
    if (checkDirection(player, lastPlacedRow, lastPlacedCol, 0, -1) && checkDirection(player, lastPlacedRow, lastPlacedCol, 0, 1)) {
        drawWinningLine(lastPlacedRow, 0, lastPlacedRow, SIZE - 1);
        return true;
    } 
    // vertical
    else if (checkDirection(player, lastPlacedRow, lastPlacedCol, -1, 0) && checkDirection(player, lastPlacedRow, lastPlacedCol, 1, 0)) {
        drawWinningLine(0, lastPlacedCol, SIZE - 1, lastPlacedCol);
        return true;
    }
    // diagonal TL to BT
    else if (lastPlacedCol === lastPlacedRow && checkDirection(player, lastPlacedRow, lastPlacedCol, -1, -1) && checkDirection(player, lastPlacedRow, lastPlacedCol, 1, 1)) {
        drawWinningLine(0, 0, SIZE - 1, SIZE - 1);
        return true;
    }
    // diagonal BL to TR
    else if ((SIZE - 1) - lastPlacedCol === lastPlacedRow && checkDirection(player, lastPlacedRow, lastPlacedCol, 1, -1) && checkDirection(player, lastPlacedRow, lastPlacedCol, -1, 1)) {
        drawWinningLine(SIZE-1 , 0, 0, SIZE - 1);
        return true;
    }
    return false;
}

/**
 * Checks for a line in a specified direction, beginning with the next square in that direction. 
 * A line found may not be complete e.g. if there is only one square in that direction.
 * @param {String} player The player's mark
 * @param {number} lastPlacedRow The row index of the last placed piece
 * @param {number} lastPlacedCol The col index of the last placed piece
 * @param {number} rowDirection The direction to move along the rows
 * @param {number} colDirection The direction to move long the columns
 * @returns {boolean} True if all squares in the given direction contain the player's mark, false otherwise.
 */
function checkDirection(player, lastPlacedRow, lastPlacedCol, rowDirection, colDirection) {
    let nextRow = lastPlacedRow + rowDirection;
    let nextCol = lastPlacedCol + colDirection;
    
    // Checks between 0 and SIZE - 1 squares in the given direction, depending on how many exist
    while (nextRow >= 0 && nextRow < SIZE && nextCol >= 0 && nextCol < SIZE) {
        if (board[nextRow][nextCol].containsPlayer(player)) {
            nextRow += rowDirection;
            nextCol += colDirection;
        } else {
            return false;
        }
    }
    return true;
}


/**
 * Manages the computer's turn
 */
function takeComputerTurn() {
    const randomOrderRow = shuffle([0, 1, 2]);
    const randomOrderCol = shuffle([0, 1, 2]);
    let lastPlacedRow = -1;
    let lastPlacedCol = -1;
    for (const row of randomOrderRow) {
        for (const col of randomOrderCol) {
            if (board[row][col].place(COMPUTER)) {
                drawBoard();
                isPlayerTurn = true;
                lastPlacedRow = row;
                lastPlacedCol = col;
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
        const gameOver = checkWinner(COMPUTER, lastPlacedRow, lastPlacedCol);
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