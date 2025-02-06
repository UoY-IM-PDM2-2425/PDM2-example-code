/** @type {Player} */
let player;

/** @type {Wall[]} */
let walls;

/** @type {Grid} */
let grid;

let playerIsMoving = false;

function setup() {
    createCanvas(400, 400);
    createWalls();
    grid = new Grid(50);
    addWallsToGrid();
    player = new Player(0, 0, 30, 30, color(0, 255, 0), 3);
}

function draw() {
    background(255);
    drawWalls();
    player.draw();
    // grid._showGrid();
    if (playerIsMoving) {
        chooseDirection();
    }
}

function chooseDirection() {
    // Try to move down
    let downY = player.getY() + player.getHeight() + player.getSpeed();
    if (!grid.isOccupied(player.getX(), downY)) {
        player.moveDown();
    }
    // Otherwise move right
    else {
        player.moveRight();
    }
}

function mouseClicked() {
    if (!playerIsMoving) {
        playerIsMoving = true;
    } else {
        playerIsMoving = false;
        // reset the player's position
        player.setX(0);
        player.setY(0);
    }
}

/**
 * Create the walls and populate the walls array
 */
function createWalls() {
    walls = [
        new Wall(0, 100, 100, 300),
        new Wall(100, 250, 100, 150),
        new Wall(200, 300, 200, 100),
    ];
}


/**
 * Add the walls to the grid
 */
function addWallsToGrid() {
    for (const wall of walls) {
        grid.addToGrid(wall);
    }
}

/**
 * Draw the walls
 */
function drawWalls() {
    for (const wall of walls) {
        wall.draw();
    }
}