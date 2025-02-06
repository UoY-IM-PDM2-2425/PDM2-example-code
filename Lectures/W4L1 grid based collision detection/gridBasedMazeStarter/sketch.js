/** @type {Player} */
let player;

/** @type {Wall[]} */
let walls;

/** @type {Grid} */
let grid;

function setup() {
    createCanvas(400, 400);
    createWalls();
    grid = new Grid(50);
    addWallsToGrid();
    player = new Player(10, 10, 30, 30, color(0, 255, 0), 3);
}

function draw() {
    background(255);
    drawWalls();
    // grid._showGrid();
    player.draw();
    if (keyIsPressed) {
        tryMovePlayer();
    }
}


/**
 * Attempts to move the player depending on which key is pressed and any 
 * obstacles in the way
 */
function tryMovePlayer() {
    switch(key) {
        case "w":
        case "W":
            player.moveUp();
            break;
        case "a":
        case "A":
            player.moveLeft();
            break;
        case "s":
        case "S":
            player.moveDown();
            break;
        case "d":
        case "D":
            player.moveRight();
            break;
    }
}

/**
 * Create the walls and populate the walls array
 */
function createWalls() {
    walls = [
        new Wall(50, 50, 100, 50),
        new Wall(150, 0, 50, 300),
        new Wall(0, 150, 100, 50),
        new Wall(0, 250, 50, 50),
        new Wall(100, 250, 50, 100),
        new Wall(200, 350, 150, 50),
        new Wall(250, 200, 50, 150),
        new Wall(250, 150, 100, 50),
        new Wall(350, 250, 50, 50),
        new Wall(200, 50, 100, 50),
        new Wall(350, 50, 50, 50)
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