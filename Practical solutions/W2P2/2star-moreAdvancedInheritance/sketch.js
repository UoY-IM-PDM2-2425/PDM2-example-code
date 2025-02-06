function setup() {
    createCanvas(0, 0);

    // Test your code by creating objects, calling their methods, and printing the output to the console
    const brian = new Animal("Brian", 95, 10);
    const pete = new FurryAnimal("Peter", 50, 3, color(255, 0, 0));
    const polly = new Parrot("Polly", 100, 15, "beaky");
    const flappy = new Parrot("Flappy", 110, 8, color(255, 0, 0));
    const ginger = new Cat("Ginger", 100, 4, color("orange"));
    const spot = new Dog("Spot", 100, 6, color(255));

    polly.mimic(brian);
    polly.mimic(pete);
    polly.mimic(ginger);
    polly.mimic(spot);

    // Try 10 calls
    for (let i = 0; i < 10; i++) {
        console.log("Polly says", polly.call());
    }

    // Flappy *might* learn another phrase from Polly
    flappy.mimic(polly);
    for (let i = 0; i < 5; i++) {
        console.log("Flappy says", flappy.call());
    }
}


/**
 * Represents an Animal
 */
class Animal {
    #name;
    #healthLevel;
    #age;
    #posX;
    #posY;


    /**
     * Creates a new Animal
     * @param {string} name 
     * @param {number} health A number between 0 and 100
     * @param {number} age 
     */
    constructor(name, health, age) {
        this.#name = name;
        this.#healthLevel = health;
        this.#age = age;
        // This line uses JavaScript methods in place of p5.js round() and random()
        this.#posX = Math.round(Math.random() * 600);
        this.#posY = Math.round(Math.random() * 500);
    }


    /**
     * Gets the animal's x coordinate
     * @returns {number}
     */
    getX() {
        return this.#posX;
    }


    /**
     * Gets the animal's y coordinate
     * @returns {number}
     */
    getY() {
        return this.#posY;
    }


    /**
     * Returns the animal's health level.
     * @returns {number}
     */
    getHealthLevel() {
        return this.#healthLevel;
    }


    /**
     * Decreases the animal's health. The health level cannot fall below 0.
     */
    decreaseHealth() {
        this.#healthLevel = Math.max(0, this.#healthLevel - 1);
    }


    /**
     * Gets the animal's age
     * @returns {number}
     */
    getAge() {
        return this.#age;
    }


    /**
     * Returns a message from the animal
     * @returns {string}
     */
    call() {
        return `Hello, my name is ${this.#name}`;
    }


    /**
     * Move the animal to the given x position
     * @param {number} newPosX The new x position
     */
    moveX(newPosX) {
        this.#posX = newPosX;
    }


    /**
     * Move the animal to the given y position
     * @param {number} newPosY The new y position
     */
    moveY(newPosY) {
        this.#posY = newPosY;
    }
}


/**
 * A subclass representing animals with fur
 */
class FurryAnimal extends Animal {
    #furColour;

    constructor(name, health, age, colour) {
        super(name, health, age);
        this.#furColour = colour;
    }


    /**
     * Gets the animal's fur colour.
     * @returns {Color}
     */
    getFurColour() {
        return this.#furColour;
    }
}

class Cat extends FurryAnimal {
    // constructor not needed as there are no changes to the attributes in the parent

    /**
     * The cat jumps at a bird -- the cat moves to the bird's position and the bird's health decreases
     * @param {Bird} bird 
     */
    jumpAt(bird) {
        this.moveX(bird.getX());
        this.moveY(bird.getY());
        bird.decreaseHealth();
    }


    call() {
        return "meow"
    }
}

class Dog extends FurryAnimal {
    // constructor not needed as there are no changes to the attributes in the parent


    /**
     * If the cat is too close to this dog, the dog barks
     * @param {Cat} cat 
     */
    barkAt(cat) {
        const DIST = 50;
        if (dist(this.getX(), this.getY(), cat.getX(), cat.getY()) < DIST) {
            console.log("Woof!");
        }
    }
}

/**
 * A subclass for Birds.
 */
class Bird extends Animal {
    #beakType;


    /**
     * Creates a new Bird
     * @param {string} name 
     * @param {number} health 
     * @param {number} age 
     * @param {string} beakType Describes the bird's beak e.g. hooked, pointy
     */
    constructor(name, health, age, beakType) {
        super(name, health, age);
        this.#beakType = beakType;
    }


    /**
     * Gets the bird's beak type
     * @returns {string}
     */
    getBeakType() {
        return this.#beakType;
    }


    decreaseHealth() {
        // #decreaseHealth is private to the parent class so instead of reducing the attribute directly
        // we need to call the overridden method multiple times.
        super.decreaseHealth();
        super.decreaseHealth();
        super.decreaseHealth();
    }
}

// SOLUTION CODE BEGINS HERE
class Parrot extends Bird {
    #phrases = ["Squawk!"];

    // No constructor needed


    /**
     * Allows the parrot to learn from another animal
     * @param {Animal} animal The animal to learn from
     */
    mimic(animal) {
        if (!this.#phrases.includes(animal.call())) {
            this.#phrases.push(animal.call());
        }
    }

    call() {
        // Pick a random index
        const index = Math.floor(Math.random() * this.#phrases.length);
        return this.#phrases[index];
    }
}