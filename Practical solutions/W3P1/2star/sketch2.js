let penguin;
const soundPath = "assets/705839__breviceps__penguin-squeak.wav";
let penguinHonk;
let jumping = false;
let jumpDirection = -1; // up first
let babyPenguins = [];
const ROCK_H = 50;
const JUMP_H = 70;
const controls = new Map([["a", -1], ["d", 1]]);
const instructions = "Sit on an egg for 3 seconds to hatch it"

function preload() {
    penguinHonk = loadSound(soundPath);
}

function setup() {
    createCanvas(800, 300);
    textSize(18);
    penguin = new Penguin(90, height, 100, 1, penguinHonk);
    babyPenguins.push(layRandomEgg());

}

function draw() {
    background(236, 247, 252);
    textAlign(LEFT);
    text(instructions, 20, 30)
    textAlign(RIGHT);
    // The following uses JavaScript's very handy filter() array method. Look it up on MDN to learn how to use it.
    text(`Colony size: ${babyPenguins.filter(egg => egg.isHatched()).length + 1}`, width - 20, 30)
    rock();
    if (keyIsPressed) {
        movePenguin();
    } 
    else {
        penguin.stand();
    }
    if (jumping) {
        jump();
    }
    checkEggs();
    penguin.draw();
}


function keyPressed() {
    if (key === "j" && !jumping) {
        penguin.honk();
        jump();
    }
}


function checkEggs() {
    let hatchCount = 0;
    for (const egg of babyPenguins) {
        egg.draw();
        egg.incubate(penguin);
        if (egg.isHatched()) {
            hatchCount++;
        }
    }
    if (hatchCount === babyPenguins.length) {
        babyPenguins.push(layRandomEgg());
    }
}


function layRandomEgg() {
    const eggW = 30;
    const eggH = 40;
    let eggX = random(100, width - 100);
    // make sure egg isn't laid where the penguin can't reach it
    if (eggX > width / 2 - eggW / 2 && eggX <= width / 2) {
        // shift left
        eggX = width / 2 - eggW / 2;
    } else if (eggX > width / 2 && eggX < width / 2 + eggW / 2) {
        // shift right
        eggX = width / 2 + eggW / 2;
    }
    const eggY = eggX < width / 2 ? height : height - ROCK_H;
    return new Egg(eggX, eggY, eggW, eggH);
}


/**
 * Checks if the penguin can move horizontally
 * @param {number} newX The penguin's x position after the move
 * @returns {boolean} True if the penguin's path is not blocked, false otherwise.
 */
function canMoveHorizontal(newX) {
    if (penguin.getY() === height) {
        return newX >= penguin.getWidth() / 2 && newX <= width / 2 - penguin.getWidth() / 2;
    }
    else if (penguin.getY() === height - ROCK_H) {
        return newX >= width / 2 && newX <= width - penguin.getWidth() / 2;
    }
}


/**
 * Draws the rock.
 */
function rock() {
    fill(200);
    noStroke();
    rect(width / 2, height - ROCK_H, width / 2, ROCK_H, 6, 0, 0, 0);
}


/**
 * Moves the penguin horizontally
 */
function movePenguin() {
    if (controls.has(key) && !jumping) {
        if (penguin.getDirection() !== controls.get(key)) {
            penguin.turn();
        }
        if (canMoveHorizontal(penguin.getX() + penguin.getDirection())) {
            penguin.walk(penguin.getDirection());
        }
    }
}


/**
 * Makes the penguin jump
 */
function jump() {
    jumping = true;
    penguin.jump(jumpDirection * 2);
    penguin.walk(penguin.getDirection() / 2);
    // top of the jump -> switch direction
    if (jumpDirection === -1 && penguin.getY() <= height - JUMP_H) {
        jumpDirection = 1;
    }
    if (shouldEndJump()) {
        endJump();
    }
}


/**
 * Checks if the penguin has completed it's jump
 * @returns {boolean} True if the penguin has landed on a surface, false otherwise.
 */
function shouldEndJump() {
    if (jumpDirection === -1) {
        return false;
    }
    // if to left of rock
    if (penguin.getX() < width / 2) {
        return penguin.getY() >= height;
    } else {
        return penguin.getY() >= height - ROCK_H;
    }
}


/**
 * Complete the jump
 */
function endJump() {
    penguin.honk();
    jumping = false;
    jumpDirection = -1;
    const targetY = penguin.getX() < width / 2 ? height : height - ROCK_H;
    const overshoot = targetY - penguin.getY();
    penguin.jump(overshoot);
}


class Egg {
    #x;
    #y;
    #w;
    #h;
    #penguin;
    // hatch after 3 seconds of incubation
    #countDownToHatch = 60 * 3;
    #hatchFrame = 0;

    /**
     * Creates a new Egg.
     * @param {number} x The x coordinate (centre)
     * @param {number} y The y coordinate (bottom)
     * @param {number} w The width
     * @param {number} h The height
     */
    constructor(x, y, w, h) {
        this.#x = x;
        this.#y = y;
        this.#w = w;
        this.#h = h;
        this.#penguin = new Penguin(this.#x, this.#y, 50, 1, loadSound(soundPath));
    }


    /**
     * Draws an egg if it is not hatched, or a penguin if it has hatched
     */
    draw() {
        if (!this.isHatched()) {
            stroke(0);
            fill(240, 234, 214);
            ellipse(this.#x, this.#y - this.#h / 2, this.#w, this.#h);
        } else {
            this.#penguin.draw();
            if ((frameCount - this.#hatchFrame) % (60 * 8) === 0) {
                this.#penguin.turn();
                this.#penguin.grow(2, 100);
            }
        }
    }


    /**
     * Incubate the egg if the parent is sitting on it
     * @param {Penguin} parent 
     */
    incubate(parent) {
        if (!this.isHatched() && parent.getX() >= this.#x - this.#w / 2 && parent.getX() <= this.#x + this.#w / 2) {
            this.#countDownToHatch--;
            if (this.#countDownToHatch === 0) {
                this.#hatchFrame = frameCount;
            }
        }
        
    }


    /**
     * Checks if the egg has hatched
     * @returns {boolean} True if the egg has hatched, false if not
     */
    isHatched() {
        return this.#countDownToHatch === 0;
    }
}
