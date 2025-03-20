let img;
const IMG_W = 200;
const IMG_H = 133;

let bearButton, catButton, monkeyButton;

function setup() {
    createCanvas(300, 300);
    setupButtons();
}

function draw() {
    background(255);
    if (img !== undefined) {
        image(img, 50, 80, IMG_W, IMG_H);
    }
}

function getAnimalImage(name) {
    img = loadImage("assets/" + name + ".jpg");
}


/**
 * Set up the HTML buttons
 */
function setupButtons() {
    bearButton = createButton("bear");
    catButton = createButton("cat");
    monkeyButton = createButton("monkey");

    const main = select("main");
    bearButton.parent(main);
    catButton.parent(main);
    monkeyButton.parent(main);

    bearButton.position(0, 280);
    catButton.position(width / 3, 280);
    monkeyButton.position(width * 2 / 3, 280);

    bearButton.size(width / 3, 22);
    catButton.size(width / 3, 22);
    monkeyButton.size(width / 3, 22);

    // arrow function syntax
    // bearButton.mousePressed(() => getAnimalImage("bear"));
    // catButton.mousePressed(() => getAnimalImage("cat"));
    // monkeyButton.mousePressed(() => getAnimalImage("monkey"));

    // traditional function syntax
    bearButton.mousePressed(function () {
        getAnimalImage("bear");
    });
    catButton.mousePressed(function () {
        getAnimalImage("cat");
    });
    monkeyButton.mousePressed(function () {
        getAnimalImage("monkey");
    });
}