let inventoryMenu;
const itemImages = new Map();
const placedItems = [];

function setup() {
    createCanvas(600, 400);
    getItemImages();
    const menuOptions = createMenuOptions();
    inventoryMenu = new PieMenu(menuOptions);
}

function draw() {
    background(0);
    for (const item of placedItems) {
        // Check that the item image has been loaded
        if (itemImages.has(item.name)) {
            image(itemImages.get(item.name), item.x, item.y, 128, 128)
        }
    }
    inventoryMenu.draw();
}

function mouseClicked() {
    inventoryMenu.tryActivate(mouseX, mouseY);
    inventoryMenu.checkClick(mouseX, mouseY);
}

function mouseMoved() {
    inventoryMenu.checkMouseOver(mouseX, mouseY);
}

/**
 * Creates an array of pie menu options
 * @returns {MenuButton[]}
 */
function createMenuOptions() {
    // Images from https://nookipedia.com/wiki/Category:Animal_Crossing_inventory_icons
    const options = [];
    options.push(new MenuButton("assets/apple.png", color(99, 99, 255), () => menuOptionClicked("apple")));
    options.push(new MenuButton("assets/axe.png", color(99, 99, 255), () => menuOptionClicked("axe")));
    options.push(new MenuButton("assets/book.png", color(99, 99, 255), () => menuOptionClicked("book")));
    options.push(new MenuButton("assets/camera.png", color(99, 99, 255), () => menuOptionClicked("photo")));
    options.push(new MenuButton("assets/orange.png", color(99, 99, 255), () => menuOptionClicked("orange")));
    options.push(new MenuButton("assets/pear.png", color(99, 99, 255), () => menuOptionClicked("pear")));
    options.push(new MenuButton("assets/wallpaper.png", color(99, 99, 255), () => menuOptionClicked("wallpaper")));
    return options;
}

/**
 * Click event handler for all menu buttons.
 * @param {string} item The name of the item to show.
 */
function menuOptionClicked(item) {
    placedItems.push({
        name: item,
        x: inventoryMenu.getX(),
        y: inventoryMenu.getY()
    })
}


/**
 * Fill the map of item images. Images will be loaded asynchronously and added 
 * to the map when they are ready.
 */
function getItemImages() {
    /**
     * The second argument in each loadImage() below is an anonymous callback 
     * function written using arrow syntax. Each function is the following 
     * traditional anomyous function:
     * 
     * function (img) {
     *   itemImages.set("name", img);
     * }
     * 
     * The argument, img, is automatically passed to the callback function by 
     * the loadImage function
     */
    loadImage("assets/Apple_Tree_NH_Icon.png", img => itemImages.set("apple", img));
    loadImage("assets/orange_128.png", img => itemImages.set("orange", img));
    loadImage("assets/Pear_Tree_NH_Icon.png", img => itemImages.set("pear", img));
    loadImage("assets/Framed_Photo_(Natural_-_Pressed_Flower)_NH_Icon.png", img => itemImages.set("photo", img));
    loadImage("assets/Book_(Western_Literature)_NH_Icon.png", img => itemImages.set("book", img));
    loadImage("assets/Wallpaper_NH_Inv_Icon.png", img => itemImages.set("wallpaper", img));
    loadImage("assets/1280px-Axe_PG_Model.png", img => itemImages.set("axe", img));

}