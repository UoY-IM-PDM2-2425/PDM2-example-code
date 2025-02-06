const inventory = new Set(["axe", "apple", "book", "camera", "orange", "pear", "wallpaper"]);
const backpack = new Set();
const images = new Map();
const BTN_SIZE = 50;


function preload() {
    // Sets don't have an index so must be iterated using a for... of loop
    for (const item of inventory) {
        const img = loadImage(`assets/${item}.png`);
        images.set(item, img);
    }
}

function setup() {
    createCanvas(600, 400);
    let pos = 0;
    // Sets don't have an index so must be iterated using a for... of loop
    for (const item of inventory) {
        createItemButton(item, pos * (width - BTN_SIZE) / (inventory.size - 1));
        pos++;
    }
}


function draw() {
    background(0);
    drawBackpack();
}


/**
 * Draw the contents of the backpack
 */
function drawBackpack() {
    fill(255, 255, 255, 200);
    rect(100, 100, width - 200, height - 200, 6);
    let x = 110;
    let y = 110;
    const maxX = width - 110 - BTN_SIZE;
    for (const item of backpack) {
        image(images.get(item), x, y);
        if (x + BTN_SIZE <= maxX) {
            x += BTN_SIZE;
        }
        else {
            x = 110;
            y += BTN_SIZE;
        }
    }
}


/**
 * Creates an HTML button to represent an inventory item
 * @param {String} itemName The name of the item
 * @param {number} xPos The x position of the button
 */
function createItemButton(itemName, xPos) {
    const btn = createButton("");
    const main = select("main");
    btn.parent(main);

    // Create an HTML image element
    const htmlImg = createImg(`assets/${itemName}.png`); // See the DOM section of the p5.js reference
    // Put the image inside the HTML button
    htmlImg.parent(btn);
    // Prevent the image from capturing mouse events, which would block the parent button from receiving the event
    htmlImg.style("pointerEvents", "none");
    // Give the button a unique name so we can see what was clicked later
    btn.id(itemName);
    
    btn.size(BTN_SIZE, BTN_SIZE);
    btn.position(xPos, height + 6);
    btn.mouseClicked(addToBackpack);
}


/**
 * Event listener for item buttons
 * @param {Event} event The HTML event triggered when a button is clicked. Passed to the function automatically.
 */
function addToBackpack(event) {
    /*
    All HTML events have a target property - the HTML element that triggered the event
    event.target.id gets the element id. In this example, the id was assigned in createItemButton();
    */
    backpack.add(event.target.id);
    
    /*
    HTML input elements like button have a disabled property. Set it to true to prevent further interaction.
    */
    //event.target.disabled = true;
}
