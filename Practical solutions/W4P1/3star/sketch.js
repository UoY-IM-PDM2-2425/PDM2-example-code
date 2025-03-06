/** @type {PlatformPlayer} */
let player;

/** @type {GridWall[]} */
let walls;

/** @type {MovingGrid} */
let grid;

function setup() {
    createCanvas(400, 400);
    grid = new MovingGrid(50);
    // Because Stationary objects are added to the grid as they are created, they can't be created until after the grid is created
    createWalls();
    player = new PlatformPlayer(width / 2 - 15, 0, 30, 30, color(0, 255, 0), 3);
}

function draw() {
    background(255);
    drawWalls();
    // grid._showGrid();
    player.draw();
    if (keyIsPressed) {
        tryMoveGrid();
    } else {
        grid.setDirection(MovingGrid.STOP);
    }
    grid.move();
    updatePlayerState();
    player.move();
}


function keyPressed() {
    if (key === "j" || key === "J") {
        player.setDirection(PlatformPlayer.JUMP);
    }
}


/**
 * Updates the player state depending on whether it is jumping or resting on a surface
 */
function updatePlayerState() {
    // if the player is jumping up, do nothing
    // if the player is moving down or stopped, check below
    switch (player.getDirection()) {
        case PlatformPlayer.JUMP:
            // get the coordinate of the top edge after a potential move up
            const newTopY = player.getY() - player.getSpeed();
            // There is something above the player, switch direction
            if (grid.isOccupied(player.getX(), newTopY) || grid.isOccupied(player.getX() + player.getWidth(), newTopY)) {
                player.setDirection(PlatformPlayer.FALL);
            }
            break;
        case PlatformPlayer.FALL:
            const newBottomY = player.getY() + player.getHeight() + player.getSpeed();
            // There is something below the player --> stop
            if (grid.isOccupied(player.getX(), newBottomY) || grid.isOccupied(player.getX() + player.getWidth(), newBottomY)) {
                player.setDirection(PlatformPlayer.STOP);
            }
            break;
        case PlatformPlayer.STOP:
            // get the coordinate of the bottom edge
            const bottomY = player.getY() + player.getHeight() + player.getSpeed();
            // There is nothing below the player --> fall
            if (!grid.isOccupied(player.getX(), bottomY) && !grid.isOccupied(player.getX() + player.getWidth(), bottomY)) {
                player.setDirection(PlatformPlayer.FALL);
            } 
            break;
    }
}



/**
 * Attempts to move the grid depending on which key is pressed
 */
function tryMoveGrid() {
    switch(key) {
        case "a":
        case "A":
            grid.setDirection(MovingGrid.MOVE_LEFT);
            break;
        case "d":
        case "D":
            grid.setDirection(MovingGrid.MOVE_RIGHT);
            break;
        default:
            grid.setDirection(MovingGrid.STOP);
    }
}

/**
 * Create the walls and populate the walls array
 */
function createWalls() {
    walls = [
        new GridWall(0, 7, 8, 1, grid)
    ];
}


/**
 * Draw the walls
 */
function drawWalls() {
    for (const wall of walls) {
        wall.draw();
    }
}