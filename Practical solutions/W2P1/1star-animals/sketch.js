let bear, cat, monkey;

function preload() {
    bear = new Animal(50, 100, loadImage("assets/bear.jpg"));
    cat = new Animal(200, 100, loadImage("assets/cat.jpg"));
    monkey = new Animal(350, 100, loadImage("assets/monkey.jpg"));
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


    /**
     * Creates a new Animal
     * @param {number} x The x coordinate
     * @param {number} y The y coordinate
     * @param {Image} image A p5.js image object to represent the animal
     */
    constructor(x, y, image) {
        this.#x = x;
        this.#y = y;
        this.#image = image;
    }


    /**
     * Shows the animal's image at its x and y coordinates.
     */
    display() {
        image(this.#image, this.#x, this.#y, 200, 133);
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
