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
    let newX, newY;
    switch(key) {
        case "w":
        case "W":
            // The y coordinate of the top of the player if the move takes place
            // Check the top edge because that is the edge likely to hit a wall when moving up
            newY = player.getY() - player.getSpeed();
            // Only move if the cell containing the new position is empty
            // Check the left and right corners of the top edge as the player may overlap multiple cells
            if (!grid.isOccupied(player.getX(), newY) && !grid.isOccupied(player.getX() + player.getWidth(), newY)) {
                player.moveUp();
            }
            break;
        case "a":
        case "A":
            // The x coordinate of the left of the player if the move takes place
            // Check the left edge because that is the edge likely to hit a wall when moving left
            newX = player.getX() - player.getSpeed();
            // Check the top and bottom corners of the left edge as the player may overlap multiple cells
            if (!grid.isOccupied(newX, player.getY()) && !grid.isOccupied(newX, player.getY() + player.getHeight())) {
                player.moveLeft();
            }
            break;
        case "s":
        case "S":
            // The x coordinate of the bottom of the player if the move takes place
            // Check the bottom edge because that is the edge likely to hit a wall when moving down
            newY = player.getY() + player.getSpeed() + player.getHeight();
            // Check the left and right corners of the bottom edge as the player may overlap multiple cells
            if (!grid.isOccupied(player.getX(), newY) && !grid.isOccupied(player.getX() + player.getWidth(), newY)) {
                player.moveDown();
            }
            break;
        case "d":
        case "D":
            // The x coordinate of the right of the player if the move takes place
            // Check the right edge because that is the edge likely to hit a wall when moving right
            newX = player.getX() + player.getSpeed() + player.getWidth();
            // Check the top and bottom corners of the right edge as the player may overlap multiple cells
            if (!grid.isOccupied(newX, player.getY()) && !grid.isOccupied(newX, player.getY() + player.getHeight())) {
                player.moveRight();
            }
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