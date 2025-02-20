let bear, cat, monkey;

function preload() {
    bear = new Animal(50, 100, loadImage("assets/bear.jpg"), 3);
    cat = new Animal(200, 200, loadImage("assets/cat.jpg"), 1);
    monkey = new Animal(350, 100, loadImage("assets/monkey.jpg"), 2);
}

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(255);
    bear.display();
    cat.display();
    monkey.display();
}

function keyPressed() {
    if (key === "w") {
        bear.moveY(-2);
        cat.moveY(-5);
        monkey.moveY(-4);
    } else if (key === "a") {
        bear.moveX(-2);
        cat.moveX(-5);
        monkey.moveX(-4);
    } else if (key === "s") {
        bear.moveY(2);
        cat.moveY(5);
        monkey.moveY(4)
    } else if (key === "d") {
        bear.moveX(2);
        cat.moveX(5);
        monkey.moveX(4);
    }
}


/**
 * Represents an animal image
 */
class Animal {
    #x;
    #y;
    #image;
    #dangerLevel;
    // These options are the same for all Animals. The line below shows how to populate a Map at the same time as creating it.
    static #dangerColours = new Map([[1, "green"], [2, "orange"], [3, "red"]]);


    /**
     * Creates a new Animal
     * @param {number} x The x coordinate
     * @param {number} y The y coordinate
     * @param {Image} image A p5.js image object to represent the animal
     * @param {number} dangerLevel An integer indicating the animal's dangerousness. Acceptable values are 1 (no danger), 2 (may be dangerous), 3 (definitely dangerous)
     */
    constructor(x, y, image, dangerLevel) {
        this.#x = x;
        this.#y = y;
        this.#image = image;
        if (!Animal.#dangerColours.has(dangerLevel)) {
            throw "Invalid danger level! Must be 1, 2, or 3."
        }
        this.#dangerLevel = dangerLevel;
    }


    /**
     * Shows the animal's image at its x and y coordinates.
     */
    display() {
        const w = 200;
        const h = 133;
        noStroke();
        fill(Animal.#dangerColours.get(this.#dangerLevel));
        rect(this.#x - 5, this.#y - 5, w + 10, h + 10)
        image(this.#image, this.#x, this.#y, w, h);
    }


    /**
     * Change the x coordinate by the amount provided
     * @param {number} deltaX The amount to move on the x axis
     */
    moveX(deltaX) {
        this.#x += deltaX;
    }


    /**
     * Change the y coordinate by the amount provided
     * @param {number} deltaY The amount to move on the y axis
     */
    moveY(deltaY) {
        this.#y += deltaY;
    }
}