let food;
let snake;
let font;

let changeLevel;
let levelOptions;
let saveLevel;
let isGame = false;

function preload() {
    font = loadFont("assets/PressStart2P-Regular.ttf");
}

function setup() {
    createCanvas(600, 600);
    food = new Food();
    inputSetup();
    setLevel();
    
}

function draw() {
    background(0);
    if (isGame) {
        drawGame();
    } else {
        showLevelSelector();
    }
}

/**
 * Create and position all input controls.
 */
function inputSetup() {
    const container = select("main");

    changeLevel = createButton("Change level");
    saveLevel = createButton("Start game");
    levelOptions = createRadio();

    changeLevel.parent(container);
    levelOptions.parent(container);
    saveLevel.parent(container);

    levelOptions.option("1", "Easy  ");
    levelOptions.option("2", "Medium  ");
    levelOptions.option("3", "Hard");
    levelOptions.selected("1");
    levelOptions.position(0, height / 2 - 50);

    changeLevel.size(200, 50);
    changeLevel.position(width / 2 - 100, height / 2 + 80);
    changeLevel.hide();
    changeLevel.style("font-family", "PressStart2P");
    changeLevel.mousePressed(stopGame);

    saveLevel.style("font-family", "PressStart2P");
    saveLevel.size(200, 50);
    saveLevel.position(width / 2 - 100, height / 2);
    saveLevel.mousePressed(startNewGame);

    levelOptions.style("text-align", "center");
    levelOptions.style("width", "600px");
    levelOptions.style("font-family", "PressStart2P");
    levelOptions.style("color", "white");
}

/**
 * Draw scenes relevant to game play (the actual game or the game over scene)
 */
function drawGame() {
    if (snake.isOutOfBounds()) {
        gameOverScene();
    }
    else {
        food.draw();
        snake.move();
        snake.draw();
        if (snake.isOverFood(food)) {
            snake.grow();
            food.regenerate();
        }
    }
}

/**
 * Stop the game so the level selector can display
 */
function stopGame() {
    isGame = false;
}

/**
 * Moves the DOM input controls into the right place for the level selector.
 */
function showLevelSelector() {
    levelOptions.show();
    saveLevel.show();
    changeLevel.hide();
}

/**
 * Starts a new game.
 */
function startNewGame() {
    changeLevel.hide();
    levelOptions.hide();
    saveLevel.hide();
    setLevel();
    isGame = true;
    food.regenerate();
    snake = new Snake();
    isGame = true;
}

/**
 * Sets the level of the game play
 */
function setLevel() {
    if (levelOptions.value() === "1") {
        frameRate(3);
    } else if (levelOptions.value() === "2") {
        frameRate(6);
    } else if (levelOptions.value() === "3") {
        frameRate(9);
    }
}

/**
 * Shows the game over message
 */
function gameOverScene() {
    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(48);
    text("GAME OVER", width / 2, height / 2 - 30);
    textSize(14);
    text("Press SPACE to try again", width / 2, height / 2 + 30);
    changeLevel.show();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        snake.faceLeft();
    } else if (keyCode === RIGHT_ARROW) {
        snake.faceRight();
    } else if (keyCode === UP_ARROW) {
        snake.faceUp();
    } else if (keyCode === DOWN_ARROW) {
        snake.faceDown();
    } else if (key === " ") {
        startNewGame();
    }
}