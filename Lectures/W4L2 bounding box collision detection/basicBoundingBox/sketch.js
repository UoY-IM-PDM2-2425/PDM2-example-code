let red, blue;

function setup() {
    createCanvas(500, 600);
    red = new Box(100, 100, 50, 50, color(255, 0, 0));
    blue = new Box(200, 100, 50, 50, color(0, 0, 255));
}

function draw() {
    background(255);
    blue.draw();
    red.draw();
}


function mouseDragged() {
    // Move the red box under the mouse
    red.setPosition(mouseX - 25, mouseY - 25);
    if (red.hit(blue)) {
        console.log("Hit!");
    } else {
        console.log("Missed");
    }
}


class CollisionRect {
    x;
    y;
    width;
    height

    /**
     * Creates a collision rect. This constructor is empty to 
     * allow child classes to set the position and dimensions
     * independently of the collision rect. 
     */
    constructor() {
    }

    /**
     * Sets the position
     * @param {number} newX The new x coordinate
     * @param {number} newY The new y coordinate
     */
    setPosition(newX, newY) {
        this.x = newX;
        this.y = newY;
    }


    /**
     * Sets the width and height.
     * @param {number} newWidth 
     * @param {number} newHeight 
     */
    setDimensions(newWidth, newHeight) {
        this.width = newWidth;
        this.height = newHeight;
    }

    /**
     * Checks if this collision rect has hit another
     * @param {CollisionRect} other Another collision rect
     */
    hit(other) {
        if (this.x + this.width >= other.x // r1 (this) right edge is to the right of r2 (other) left edge
            && this.x <= other.x + other.width // r1 left edge is to the left of r2 right edge
            && this.y + this.height >= other.y // r1 bottom edge is below r2 top edge
            && this.y <= other.y + other.height) { // r1 top edge is above r2 bottom edge
            return true;
        }
        return false;
    }

}


class Box extends CollisionRect {
    colour;

    /**
     * Creates a Box
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     * @param {number} colour 
     */
    constructor(x, y, w, h, colour) {
        super(); // still have to call super, even though its empty
        
        // Set the bounding box location and dimensions
        this.setPosition(x, y);
        this.setDimensions(w, h);
        this.colour = colour;
    }


    /**
     * Draw the box
     */
    draw() {
        fill(this.colour);
        rect(this.x, this.y, this.width, this.height);
    }
}
