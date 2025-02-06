class Character {
    #x;
    #y;
    #xSpeed;
    #ySpeed;
    #colour;
    #name;

    /**
     * Creates a new character
     * @param {number} x The centre x coordinate
     * @param {number} y The centre y coordinate
     * @param {Color} colour 
     * @param {string} name
     */
    constructor(x, y, colour, name) {
        this.#x = x;
        this.#y = y;
        this.#xSpeed = 0;
        this.#ySpeed = 0;
        this.#colour = colour;
        this.#name = name;

    }

    /**
     * Draw the character
     */
    draw() {
        rectMode(CENTER);
        fill(this.#colour);
        square(this.#x, this.#y, 50);
        textAlign(CENTER, CENTER);
        fill(255);
        text(this.#name, this.#x, this.#y);
    }

    /**
     * Gets the x coordinate of the character
     * @returns {number}
     */
    getX() {
        return this.#x;
    }

    /**
     * Gets the y coordinate of the character
     * @returns {number}
     */
    getY() {
        return this.#y;
    }

    /**
     * Move the character
     */
    move() {
        this.#x += this.#xSpeed;
        this.#y += this.#ySpeed;
    }

    /**
     * Changes the x speed of the character
     * @param {number} newSpeed 
     */
    setXSpeed(newSpeed) {
        this.#xSpeed = newSpeed;
    }

    /**
     * Changes the y speed of the character
     * @param {number} newSpeed 
     */
    setYSpeed(newSpeed) {
        this.#ySpeed = newSpeed;
    }
}


class Enemy extends Character {
    #MOVE_RIGHT = 1;
    #MOVE_LEFT = 2;
    #MOVE_UP = 3;
    #MOVE_DOWN = 4;
    static #SIZE = 50
    #speed;
    #state;

    /**
     * Creates a new Enemy that moves at the given speed. The 
     * Enemy will move around the edges of the canvas by itself.
     * @param {number} speed 
     */
    constructor(speed) {
        super(Enemy.#SIZE / 2, height - Enemy.#SIZE / 2, color(0, 0, 255), "Enemy");
        this.#speed = speed;
        this.#state = this.#MOVE_RIGHT;
    }

    /**
     * @override
     */
    draw() {
        super.draw();
        switch (this.#state) {
            case this.#MOVE_RIGHT:
                this.#moveRight();
                break;
            case this.#MOVE_UP:
                this.#moveUp();
                break;
            case this.#MOVE_LEFT:
                this.#moveLeft();
                break;
            case this.#MOVE_DOWN:
                this.#moveDown();
                break;
        }
        super.move();
    }

    #moveRight() {
        this.setXSpeed(this.#speed);
        this.setYSpeed(0);
        // If hit the right wall, start going up
        if (this.getX() >= width - Enemy.#SIZE / 2) {
            this.#state = this.#MOVE_UP;
        }
    }

    #moveUp() {
        this.setXSpeed(0);
        this.setYSpeed(-this.#speed);
        // If hit the top wall, start going left
        if (this.getY() <= Enemy.#SIZE / 2) {
            this.#state = this.#MOVE_LEFT;
        }
    }

    #moveLeft() {
        this.setXSpeed(-this.#speed);
        this.setYSpeed(0);
        // If hit the left wall, start going down
        if (this.getX() <= Enemy.#SIZE / 2) {
            this.#state = this.#MOVE_DOWN;
        }
    }

    #moveDown() {
        this.setXSpeed(0);
        this.setYSpeed(this.#speed);
        // If hit the bottom wall, start going right
        if (this.getY() >= height - Enemy.#SIZE / 2) {
            this.#state = this.#MOVE_RIGHT;
        }
    }
}


class Hero extends Character {
    static STOP = 0;
    static MOVE_RIGHT = 1;
    static MOVE_LEFT = 2;
    static MOVE_UP = 3;
    static MOVE_DOWN = 4;
    #speed;
    #state;


    /**
     * Creates a new Hero. Hero movement is controlled by 
     * calling code.
     * @param {number} x The centre x coordinate
     * @param {number} y The centre y coordinate
     */
    constructor(x, y) {
        super(x, y, color(255,140,0), "Hero");
        this.#speed = 2;
        this.#state = Hero.STOP;
    }

    /**
     * @override
     */
    draw() {
        super.draw();
        super.move();
    }

    /**
     * Changes the movement state of the Hero
     * @param {number} newState 
     */
    changeState(newState) {
        switch (newState) {
            case Hero.MOVE_RIGHT:
                this.#state = newState;
                this.#turnRight();
                break;
            case Hero.MOVE_UP:
                this.#state = newState;
                this.#turnUp();
                break;
            case Hero.MOVE_LEFT:
                this.#state = newState;
                this.#turnLeft();
                break;
            case Hero.MOVE_DOWN:
                this.#state = newState;
                this.#turnDown();
                break;
            default:
                this.#state = Hero.STOP;
                this.#stop();
        }
    }


    #turnRight() {
        this.setXSpeed(this.#speed);
        this.setYSpeed(0);
    }

    #turnUp() {
        this.setXSpeed(0);
        this.setYSpeed(-this.#speed);
    }

    #turnLeft() {
        this.setXSpeed(-this.#speed);
        this.setYSpeed(0);
    }

    #turnDown() {
        this.setXSpeed(0);
        this.setYSpeed(this.#speed);
    }

    #stop() {
        this.setXSpeed(0);
        this.setYSpeed(0);
    }
}