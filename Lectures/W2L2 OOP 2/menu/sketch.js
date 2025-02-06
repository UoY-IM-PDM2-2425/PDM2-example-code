/** @type {MenuItem[]} */
const menu = [];
let addToCart;
let selected = -1;

function preload() {
    const caesar = new MenuItem("Caesar Salad", 4.99, new Set(["Sides", "Salads"]), loadImage("assets/CaesarSalad.jpg"));
    menu.push(caesar);
    
    const friesOptions = new Map([["Ketchup", 0.20], ["Mayonnaise", 0.20], ["Double size", 0.75]]);
    const fries = new CustomisableMenuItem("Fries", 1.99, new Set(["Sides"]), loadImage("assets/Fries.jpg"), friesOptions);
    menu.push(fries);
   
    const garden = new MenuItem("Garden Salad", 5.99, new Set(["Sides, Salads"]), loadImage("assets/GardenSalad.jpg"));
    menu.push(garden);
    
    const wingsOptions = new Map([["Blue cheese dip", 0.00], ["Celery", 0.50], ["Double size", 5.00]]);
    const wings = new CustomisableMenuItem("Hot Wings", 8.99, new Set(["Appetiser", "Chicken", "House Specialities"]), loadImage("assets/HotWings.jpg"), wingsOptions);
    menu.push(wings);
    
    const pizzaOptions = new Map([["Pepperoni", 1.00], ["Sausage", 1.00], ["Rocket", 0.50]]);
    const pizza = new CustomisableMenuItem("Veg Pizza", 10.99, new Set(["Mains", "House Specialties"]), loadImage("assets/VegPizza.jpg"), pizzaOptions);
    menu.push(pizza);
}

function setup() {
    createCanvas(300, 500);
    addToCart = createButton("Add to Cart");
    addToCart.parent(select("main"));
    addToCart.size(width - 40, 50);
    addToCart.position(20, height - 70);
    addToCart.hide();
}

function draw() {
    background(255);
    if (selected === -1) {
        const itemHeight = height / menu.length;
        for (let i = 0; i < menu.length; i++) {
            menu[i].preview(0, i * itemHeight, width, itemHeight);
        }
    } else {
        menu[selected].detail(0, 0, width, height);
    }
}

function mouseClicked() {
    if (selected === -1) {
        if (mouseX >= 0 && mouseX <= height) {
            const itemHeight = height / menu.length;
            selected = Math.floor(mouseY / itemHeight);
        }
    } else {
        selected = -1;
    }
}

class MenuItem {

    #name;
    #image;
    #price;
    #categories;


    /**
     * Create a new menu item
     * @param {string} name 
     * @param {number} price 
     * @param {Set<string>} categories 
     * @param {Image} image
     */
    constructor(name, price, categories, image) {
        this.#name = name;
        this.#price = price;
        this.#categories = categories;
        this.#image = image;
    }

    /**
     * Get the name of the item
     * @returns {string}
     */
    getName() {
        return this.#name;
    }

    /**
     * Get the price of the item
     * @returns {number}
     */
    getPrice() {
        return this.#price;
    }

    /**
     * Show a preview of the item
     * @param {number} x x coordinate of the preview
     * @param {number} y y coordinate of the preview
     * @param {number} w width of the preview
     * @param {number} h height of the preview
     */
    preview(x, y, w, h) {
        const IMG_SIZE = 80;
        addToCart.hide();
        rect(x, y, w, h);
        textAlign(LEFT, BOTTOM);
        text(this.#name, IMG_SIZE + 20, y + 30);
        text(`£${this.#price}`, IMG_SIZE + 20, y + 60);
        image(this.#image, x + 10, y + 10, IMG_SIZE, IMG_SIZE);
    }


    /**
     * Show a detail view of the item
     * @param {number} x x coordinate of the preview
     * @param {number} y y coordinate of the preview
     * @param {number} w width of the preview
     * @param {number} h height of the preview
     */
    detail(x, y, w, h) {
        const IMG_SIZE = 180;
        rect(x, y, w, h);
        image(this.#image, w / 2 - IMG_SIZE / 2, y + 10, IMG_SIZE, IMG_SIZE);
        text(`${this.#name}: £${this.#price}`, 10, IMG_SIZE + 30);
        addToCart.show();
    }
}

class CustomisableMenuItem extends MenuItem {
    #options;

    /**
     * Create a new CustomisableMenuItem
     * @param {string} name 
     * @param {number} price 
     * @param {Set<string>} categories 
     * @param {Image} image 
     * @param {Map<string, number>} options A map of add on item names and prices
     */
    constructor(name, price, categories, image, options) {
        super(name, price, categories, image);
        this.#options = options;
    }


    /**
     * @override
     */
    detail(x, y, w, h) {
        super.detail(x, y, w, h);
        let startY = y + h / 2;
        text("Choose options:", 10, startY);
        for (const [name, price] of this.#options) {
            startY += 30;
            text(`${name}: £${price}`, 20, startY);
        }
    }
}