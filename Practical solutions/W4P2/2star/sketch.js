/** @type {Bullet[]} */
const bullets = [];
const MAX_BULLETS = 50;
let nextBullet = 0;

/** @type {Set<Enemy>} */
const enemies = new Set();
const NUM_ENEMIES = 5;

let player;

function setup() {
    createCanvas(600, 600);
    createBullets();
    createEnemies();
    player = new Player(width / 2, height - 30);
}

function draw() {
    background(255);
    for (const bullet of bullets) {
        if (bullet.isActive()) {
            bullet.move();
            bullet.draw();
        }
    }

    for (const enemy of enemies) {
        enemy.move();
        enemy.draw();
        for (const bullet of bullets) {
            if (bullet.isActive() && bullet.hit(enemy)) {
                console.log("hit");
                enemies.delete(enemy);
                // A hacky way to make the bullet inactive. 
                bullet.setPosition(-50, -50);
            }
        }
    }
    if (keyIsPressed) {
        movePlayer();
    }
    else {
        player.setStatus(Player.STOP);
    }
    player.draw();
}

function keyPressed() {
    // Loop until an inactive bullet is found
    while (bullets[nextBullet].isActive()) {
        nextBullet = (nextBullet + 1) % MAX_BULLETS; // When the last index is reached, go back to 0
    }
    bullets[nextBullet].fire(player.getX(), player.getY() - bullets[nextBullet].getHeight());
}


/**
 * Move the player
 */
function movePlayer() {
    switch (key) {
        case "w":
            player.setStatus(Player.MOVE_UP);
            break;
        case "a":
            player.setStatus(Player.MOVE_LEFT);
            break;
        case "s":
            player.setStatus(Player.MOVE_DOWN);
            break;
        case "d":
            player.setStatus(Player.MOVE_RIGHT);
            break;
        default:
            player.setStatus(Player.STOP);
    }
    player.move();
}


/**
 * Create the bullets
 */
function createBullets() {
    for (let i = 0; i < MAX_BULLETS; i++) {
        bullets.push(new Bullet());
    }
}


/**
 * Create the enemies
 */
function createEnemies() {
    for (let i = 0; i < NUM_ENEMIES; i++) {
        enemies.add(new Enemy());
    }
}