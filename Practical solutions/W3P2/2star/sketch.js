// Game state variables
const START = 0;
const PLAYING = 1;
const WIN = 2;
const DIED = 3;
// Set the start state
let state = START;

// The JSDoc on the next line enables auto completion
/** @type {Player} */
let thePlayer;

function setup() {
    createCanvas(800, 600);
    thePlayer = new Player();
}

function draw() {
    background(255);
    switch (state) {
        case START:
            drawStart();
            break;
        case PLAYING:
            thePlayer.draw();
            switch (thePlayer.move()) {
                case Player.ESCAPED:
                    state = WIN;
                    break;
                case Player.DIED:
                    state = DIED;
                    break;
            }
            break;
        case WIN:
            drawWin();
            break;
        case DIED:
            drawDied();
            break;
    }
    // drawStart();
    // thePlayer.draw();
    // thePlayer.move();
    // drawWin();
    // drawDied();
}

function keyPressed() {
    switch(keyCode) {
        case LEFT_ARROW:
            thePlayer.setXSpeed(-5);
            break;
        case RIGHT_ARROW:
            thePlayer.setXSpeed(5);
            break;
        case ENTER:
            switch (state) {
                case START:
                case WIN:
                case DIED:
                    thePlayer.reset();
                    state = PLAYING;
                    break;
            }
            break;
    }
}


function keyReleased() {
    switch(keyCode) {
        case LEFT_ARROW:
        case RIGHT_ARROW:
            thePlayer.setXSpeed(0);
            break;
    }
}


/**
 * Draw the background of the scene
 */
function drawSceneBackground() {
    stroke(255, 0, 0);
    noFill();
    rect(100, 100, 600, 400);
    fill(255, 0, 0);
    textSize(32);
}


/**
 * Draw the start scene
 */
function drawStart() {
    drawSceneBackground();
    text("Start game", 150, 150);
    textSize(20);
    text("Play well to win", 150, 200);
    text("Press Enter to start", 150, 300);
}


/**
 * Draw the game over scene - win condition
 */
function drawWin() {
    drawSceneBackground();
    text("You win!", 150, 150);
    text("Press Enter to play again", 150, 350);
}


/**
 * Draw the game over scene - lose condition
 */
function drawDied() {
    drawSceneBackground();
    text("You died :(", 150, 150);
    text("Press Enter to play again", 150, 350);
}