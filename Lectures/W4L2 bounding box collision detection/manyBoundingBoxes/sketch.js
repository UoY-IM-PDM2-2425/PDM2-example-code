let player;
const METEOR_COUNT = 10;
const JUNK_COUNT = 3;
/** @type {Set<Interactable>} */
let flyingObjects = new Set();
let damage = 0;
let money = 0;

function setup() {
    createCanvas(800, 400);
    player = new Player(0, 0, 3);
    createFlyingObjects();
    textSize(18);
    textAlign(RIGHT, TOP);
}

function draw() {
    background(0);
    player.draw();
    if (keyIsPressed) {
        updatePlayer();
    } else {
        player.setState(Player.STOP);
    }
    player.move();
    drawAndUpdateFlyingObjects();
    fill(255);
    text(`Damage: ${damage}`, width - 10, 10);
    text(`Money: ${money}`, width - 10, 30);
}


/**
 * Updates player state based on which key was pressed
 */
function updatePlayer() {
    switch (key) {
        case "w":
            player.setState(Player.MOVE_UP);
            break;
        case "a":
            player.setState(Player.MOVE_LEFT);
            break;
        case "s":
            player.setState(Player.MOVE_DOWN);
            break;
        case "d":
            player.setState(Player.MOVE_RIGHT);
            break;
    }
}


/**
 * Draws and moves each flying object
 */
function drawAndUpdateFlyingObjects() {
    for (const obj of flyingObjects) {
        if (player.hit(obj)) {
            const value = obj.getValue();
            // If value is negative, add to damage
            if (value < 0) {
                damage += Math.abs(value);
            } else {
                money += value;
            }
        }
        obj.draw();
        obj.fly();
    }
}


/**
 * Populates the flyingObjects set
 */
function createFlyingObjects() {
    for (let i = 0; i < METEOR_COUNT; i++) {
        flyingObjects.add(new Meteor());
    }
    for (let i = 0; i < JUNK_COUNT; i++) {
        flyingObjects.add(new SpaceJunk())
    }
}