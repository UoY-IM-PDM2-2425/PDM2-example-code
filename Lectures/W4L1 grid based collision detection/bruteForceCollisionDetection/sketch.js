/**
 * This example from PDM 1 week 9 lecture 2 uses a brute force collision detection approach
 * - Go through each obstacle in the scene and check if there is a collisions
 * - Worst case: no collision - must check every obstacle to find out
 * 
 * Grid based collision detection is the ideal approach for this type of scenario!
 */

let player = {
    x: 0,
    y: 0,
    size: 50
};

let obstacles = [
    {
        x: 50,
        y: 50,
        width: 100,
        height: 50
    },
    {
        x: 150,
        y: 0,
        width: 50,
        height: 300
    },
    {
        x: 0,
        y: 150,
        width: 100,
        height: 50
    },
    {
        x: 0,
        y: 250,
        width: 48, // makes it easier to get through a tight gap
        height: 50
    },
    {
        x: 100,
        y: 250,
        width: 50,
        height: 100
    }
]

function setup() {
    createCanvas(400, 400);
    noStroke();
}

function draw() {
    background(255);
    fill(0);
    for (let obstacle of obstacles) {
        rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
    fill(0, 255, 0);
    square(player.x, player.y, player.size);
    if (keyIsPressed) {
        processMove();
    }
}

/**
 * Moves the player if a wasd has been pressed and the block can move
 */
function processMove() {
    if (key === "d" && canMove(1, 0)) {
        player.x++;
    }
    else if (key === "a" && canMove(-1, 0)) {
        player.x--;
    }
    else if (key === "w" && canMove(0, -1)) {
        player.y--;
    }
    else if (key === "s" && canMove(0, 1)) {
        player.y++;
    }
}

/**
 * Checks if the player can move in the selected direction
 * @param {number} xDir -1 to move left, 1 to move right, 0 otherwise
 * @param {number} yDir -1 to move up, 1 to move down, 0 otherwise 
 * @returns {boolean} True if the block can move in the selected direction
 */
function canMove(xDir, yDir) {
    let newX = player.x + xDir;
    let newY = player.y + yDir;
    if (isOutOfBounds(newX, newY)) {
        return false;
    }
    for (let obstacle of obstacles) {
        if (!isOutsideObstacle(newX, newY, obstacle)) {
            return false;
        }
    }
    return true;
}

/**
 * Checks if the player position is out of bounds of the canvas.
 * @param {number} x The x position
 * @param {number} y The y position
 * @returns {boolean} True if the position is out of bounds, false otherwise
 */
function isOutOfBounds(x, y) {
    return x < 0 || x > width - player.size || y < 0 || y > height - player.size;
}

/**
 * Checks if the player position is safely away from an individual obstacle
 * @param {number} x The x position 
 * @param {number} y The y position
 * @param {Object} obstacle An object literal describing the properties of an obstacle
 * @returns {boolean} True if the position is away from the obstacle, false otherwise
 */
function isOutsideObstacle(x, y, obstacle) {
    return x + player.size <= obstacle.x || x >= obstacle.x + obstacle.width
            || y + player.size <= obstacle.y || y >= obstacle.y + obstacle.height
}