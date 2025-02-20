/** @type {Animal[]} */
let animals = [];

let activeAnimalRadio;

function preload() {
    const bear = new Animal(50, 100, loadImage("assets/bear.jpg"), 3, loadSound("assets/70333__mrbubble110__bear-roar.wav"));
    const cat = new Animal(200, 200, loadImage("assets/cat.jpg"), 1, loadSound("assets/412016__skymary__cat-purring-and-meow.wav"));
    const monkey = new Animal(350, 100, loadImage("assets/monkey.jpg"), 2, loadSound("assets/588625__wilika2__monkey-noise-imitation-3.wav"));
    animals.push(bear);
    animals.push(cat);
    animals.push(monkey);
}

function setup() {
    createCanvas(600, 400);
    setupRadio();
}

function draw() {
    background(255);
    for (const animal of animals) {
        animal.display();
    }
}


/**
 * Checks if the animal that moved is too close to another animal
 * @param {Animal} movedAnimal 
 */
function checkDistance(movedAnimal) {
    const THRESHOLD = 100;
    for (const animal of animals) {
        // This works because movedAnimal is a reference to an animal in the array
        if (animal !== movedAnimal) {
            const distBetween = dist(movedAnimal.getX(), movedAnimal.getY(), animal.getX(), animal.getY());
            if (distBetween < THRESHOLD) {
                animal.speak();
            }
        }
    }
}

function mouseClicked() {
    // ensure the click was on the canvas
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        const activeAnimalIndex = activeAnimalRadio.selected().value;
        if (activeAnimalIndex !== null) {
            // parseInt converts the string radio value to an int
            const activeAnimal = animals[parseInt(activeAnimalIndex)];
            activeAnimal.moveTo(mouseX, mouseY);
            checkDistance(activeAnimal);
        }
    }
}

function keyPressed() {
    const activeAnimalIndex = activeAnimalRadio.selected().value;
    if (activeAnimalIndex !== null) {
        // parseInt converts the string radio value to an int
        const activeAnimal = animals[parseInt(activeAnimalIndex)];
        if (key === "w") {
            activeAnimal.moveY(-2);
        } else if (key === "a") {
            activeAnimal.moveX(-2);
        } else if (key === "s") {
            activeAnimal.moveY(2);
        } else if (key === "d") {
            activeAnimal.moveX(2);
        }
        checkDistance(activeAnimal);
    }
    
}


/**
 * Sets up the radio buttons for selecting the active animals
 */
function setupRadio() {
    activeAnimalRadio = createRadio();
    activeAnimalRadio.parent(select("main"));
    activeAnimalRadio.position(0, height - 30);
    activeAnimalRadio.size(width);
    // Styling is using CSS, which is a bit beyond this module (covered in Y2)
    activeAnimalRadio.style("display", "flex");
    activeAnimalRadio.style("justify-content", "space-evenly");
    // Option value is the index of the animal in the array
    activeAnimalRadio.option(0, " Bear");
    activeAnimalRadio.option(1, " Cat");
    activeAnimalRadio.option(2, " Monkey");

    activeAnimalRadio.selected("1"); // Value will always be a string, even if a number is used, as above
}


/**
 * Represents an animal
 */
class Animal {
    #x;
    #y;
    #image;
    #dangerLevel;
    #sound;
    // These options are the same for all Animals. The line below shows how to populate a Map at the same time as creating it.
    static #dangerColours = new Map([[1, "green"], [2, "orange"], [3, "red"]]);


    /**
     * Creates a new Animal
     * @param {number} x The x coordinate
     * @param {number} y The y coordinate
     * @param {Image} image A p5.js image object to represent the animal
     * @param {number} dangerLevel An integer indicating the animal's dangerousness. Acceptable values are 1 (no danger), 2 (may be dangerous), 3 (definitely dangerous)
     * @param {Sound} sound A p5.js sound object representing the animal's noise
     */
    constructor(x, y, image, dangerLevel, sound) {
        this.#x = x;
        this.#y = y;
        this.#image = image;
        if (!Animal.#dangerColours.has(dangerLevel)) {
            throw "Invalid danger level! Must be 1, 2, or 3."
        }
        this.#dangerLevel = dangerLevel;
        this.#sound = sound;
    }

    /**
     * Gets the x coordinate of the animal
     * @returns {number}
     */
    getX() {
        return this.#x;
    }


    /**
     * Gets the y coordinate of the animal
     * @returns {number}
     */
    getY() {
        return this.#y;
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


    /**
     * Moves the animal to a new location
     * @param {number} x 
     * @param {number} y 
     */
    moveTo(x, y) {
        this.#x = x;
        this.#y = y;
    }


    /**
     * Plays the animal's sound
     */
    speak() {
        if (!this.#sound.isPlaying()) {
            this.#sound.play();
        }
    }
}