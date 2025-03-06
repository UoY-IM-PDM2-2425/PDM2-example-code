/** @type {Player} */
let player;

/** @type {Wall[]} */
let walls;

/** @type {Set<Treasure>} */
let treasure;

/** @type {GridOfObjects} */
let grid;

function setup() {
    createCanvas(400, 400);
    createWalls();
    createTreasure();
    grid = new GridOfObjects(50);
    addStationaryObjectsToGrid();
    player = new Player(10, 10, 30, 30, color(0, 255, 0), 3);
}

function draw() {
    background(255);
    drawWalls();
    drawTreasure();
    player.draw();
    if (keyIsPressed) {
        tryMovePlayer();
    } else {
        player.setDirection(Player.STOP);
    }
    player.move();
    drawScore();
}


/**
 * Checks if the corner coordinates are blocked by an obstacle
 * @param {number} cornerX The x coordinate of one corner of the player
 * @param {number} cornerY The y coordinate of one corner of the player
 * @returns {boolean} True if the cell containing the corner is empty or contains an objects with solidness of 0, false otherwise
 */
function canMove(cornerX, cornerY) {
    if (cornerX < 0 || cornerX >= width || cornerY < 0 || cornerY >= height) {
        return false;
    }
    return !grid.isOccupied(cornerX, cornerY) || !grid.getCellContents(cornerX, cornerY).isSolid();
}


/**
 * Updates the player's state depending on the direction it can move in. To determine if the player 
 * can move, the potential new positions of each corner of the front edge need to be checked.
 * @param {number} corner1X The new x coordinate of one corner of the front edge of the player
 * @param {number} corner1Y The new y coordinate of one corner of the front edge of the player
 * @param {number} corner2X The new x coordinate of the second corner of the front edge of the player
 * @param {number} corner2Y The new y coordinate of the second corner of the front edge of the player
 * @param {string} direction The direction the player is attempting to move (should be one of the Player static directions)
 */
function updatePlayerState(corner1X, corner1Y, corner2X, corner2Y, direction) {
    if (canMove(corner1X, corner1Y) && canMove(corner2X, corner2Y)) {
        player.setDirection(direction);
        checkForTreasure(corner1X, corner1Y, corner2X, corner2Y);
    } else {
        player.setDirection(Player.STOP);
    }
}


/**
 * Checks for treasure at the player's new position
 * @param {number} corner1X The new x coordinate of one corner of the front edge of the player
 * @param {number} corner1Y The new y coordinate of one corner of the front edge of the player
 * @param {number} corner2X The new x coordinate of the second corner of the front edge of the player
 * @param {number} corner2Y The new y coordinate of the second corner of the front edge of the player
 */
function checkForTreasure(corner1X, corner1Y, corner2X, corner2Y) {
    const corner1Obj = grid.getCellContents(corner1X, corner1Y);
    if (treasure.has(corner1Obj)) {
        player.collect(corner1Obj);
        treasure.delete(corner1Obj);
    }
    const corner2Obj = grid.getCellContents(corner2X, corner2Y);
    if (treasure.has(corner2Obj)) {
        player.collect(corner2Obj);
        treasure.delete(corner2Obj);
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
            const newYUp = player.getY() - player.getSpeed();
            updatePlayerState(player.getX(), newYUp, player.getX() + player.getWidth(), newYUp, Player.MOVE_UP);
            break;
        case "a":
        case "A":
            const newXLeft = player.getX() - player.getSpeed();
            updatePlayerState(newXLeft, player.getY(), newXLeft, player.getY() + player.getHeight(), Player.MOVE_LEFT);
            break;
        case "s":
        case "S":
            const newYDown = player.getY() + player.getSpeed() + player.getHeight();
            updatePlayerState(player.getX(), newYDown, player.getX() + player.getWidth(), newYDown, Player.MOVE_DOWN);
            break;
        case "d":
        case "D":
            const newXRight = player.getX() + player.getSpeed() + player.getWidth();
            updatePlayerState(newXRight, player.getY(), newXRight, player.getY() + player.getHeight(), Player.MOVE_RIGHT);
            break;
        default:
            player.setDirection(Player.STOP);
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
 * Creates the treasure objects and populates the treasure array
 */
function createTreasure() {
    treasure = new Set([
        new Treasure(0, 100, 50, 50, 100),
        new Treasure(0, 300, 50, 50, 200),
        new Treasure(250, 0, 50, 50, 300)
    ]);
}

/**
 * Add all stationary objects to the grid
 */
function addStationaryObjectsToGrid() {
    for (const wall of walls) {
        grid.addToGrid(wall);
    }
    for (const item of treasure) {
        grid.addToGrid(item);
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


/**
 * Draw the treasure
 */
function drawTreasure() {
    for (const item of treasure) {
        item.draw();
    }
}


/**
 * Draws the score
 */
function drawScore() {
    noStroke();
    fill(255, 0, 255);
    textSize(20);
    textAlign(RIGHT, TOP);
    text(player.getPoints(), 200, 10, 190, 30);
}