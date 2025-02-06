/**
 * A collision rectangle... but for circles
 */
class CollisionCircle {
    #x;
    #y;
    #radius;

    constructor() {}

    /**
     * Gets the centre x coordinate of the circle
     * @returns {number}
     */
    getX() {
        return this.#x;
    }


    /**
     * Gets the centre y coordinate of the circle
     * @returns {number}
     */
    getY() {
        return this.#y;
    }


    /**
     * Set the collision circle's position
     * @param {number} x 
     * @param {number} y 
     */
    setPosition(x, y) {
        this.#x = x;
        this.#y = y;
    }


    /**
     * Sets the radius of the circle
     * @param {number} radius 
     */
    setRadius(radius) {
        this.#radius = radius;
    }


    /**
     * Checks if a point is inside the circle
     * @param {number} x 
     * @param {number} y 
     * @returns {boolean} 
     */
    hit(x, y) {
        return dist(x, y, this.#x, this.#y) <= this.#radius;
    }
}


/**
 * Represents a button inside a pie menu
 */
class MenuButton extends CollisionCircle {
    static INACTIVE = "inactive";
    static ACTIVE = "active";
    static ACTIVE_HOVER = "active hover";
    #state = MenuButton.INACTIVE;

    #SIZE = 32;
    #icon
    #clickFunction;
    #fillColour;
    #speedX = 0;
    #speedY = 0;


    /**
     * Creates a new menu path
     * @param {string} iconPath The path of the icon to use for the button
     * @param {Color} colour The fill colour of the button
     * @param {Function} clickFunction The event handler to call when the button is clicked
     */
    constructor(iconPath, colour, clickFunction) {
        super();
        // The second argument is a callback function, which sets the #icon instance variable with the loaded image
        loadImage(iconPath, img => this.#icon = img);
        this.#fillColour = colour;
        this.#clickFunction = clickFunction;
        this.setRadius(this.#SIZE / 2);
    }


    /**
     * Draw the button. If the button is active or hovered, draw the icon. Otherwise, 
     * draw a circle.
     */
    draw() {
        noStroke();
        fill(this.#fillColour);
        if (this.#state === MenuButton.ACTIVE || this.#state === MenuButton.ACTIVE_HOVER) {
            imageMode(CENTER);
            if (this.#state === MenuButton.ACTIVE_HOVER) {
                circle(this.getX(), this.getY(), this.#SIZE + 5);
            }
            image(this.#icon, this.getX(), this.getY(), this.#SIZE, this.#SIZE);
        } else {
            circle(this.getX(), this.getY(), this.#SIZE);
            this.move();
        }
    }

    /**
     * Move the button at the current speed.
     */
    move() {
        this.setPosition(this.getX() + this.#speedX, this.getY() + this.#speedY);
    }

    /**
     * Call the click event handler.
     */
    click() {
        this.#clickFunction();
    }


    /**
     * Set the button's animation options
     * @param {number} speedX The speed on the x axis
     * @param {number} speedY The speed on the y axis
     */
    setAnimationOptions(speedX, speedY) {
        this.#speedX = speedX;
        this.#speedY = speedY;
    }

    /**
     * Sets the button's state
     * @param {string} state A string representing state. It should correspond to one of the MenuButton static variables.
     */
    setState(state) {
        this.#state = state;
    }

}


/**
 * Represents a pie menu
 */
class PieMenu extends CollisionCircle {
    static HIDDEN = "hidden";
    static OPENING = "opening";
    static CLOSING = "closing";
    static ACTIVE = "active";
    #state = PieMenu.HIDDEN;

    #menuOptions;
    #OPEN_RADIUS = 75;
    #ANIMATION_LENGTH = 30;
    #framesElapsed = 0;

    /**
     * Creates a new PieMenu
     * @param {MenuButton[]} menuOptions An array of MenuButtons that will make up the menu
     */
    constructor(menuOptions) {
        super();
        this.#menuOptions = menuOptions;
        this.setRadius(0);
    }


    /**
     * Draw the menu, depending on its current state
     */
    draw() {
        if (this.#state !== PieMenu.HIDDEN) {
            for (const option of this.#menuOptions) {
                option.draw();
            }
            if (this.#state === PieMenu.OPENING || this.#state === PieMenu.CLOSING) {
                this.#framesElapsed++;
                if (this.#framesElapsed === this.#ANIMATION_LENGTH) {
                    this.#endAnimation();
                }
            }
        }
    }

    /**
     * Gets the menu's current state
     * @returns {string} A string - one of PieMenu's static variables
     */
    getState() {
        return this.#state
    }

    /**
     * Try to activate the pie menu. Will only activate if the menu's state is "hidden" 
     * when this method is called.
     * @param {number} x The centre x coordinate of the pie menu
     * @param {number} y The centre y coordinate of the pie menu
     */
    tryActivate(x, y) {
        if (this.#state === PieMenu.HIDDEN) {
            this.setPosition(x, y);
            for (const option of this.#menuOptions) {
                option.setPosition(x, y);
            }
            this.#startOpen();
        }
    }

    /**
     * Check if the pie menu has been clicked then process the click. If the pie menu 
     * is active, this method will check if any of its buttons were clicked. If no 
     * buttons were clicked, the menu will be cancelled.
     * @param {number} x The x coordinate of the click
     * @param {number} y The y coordinate of the click
     */
    checkClick(x, y) {
        if (this.#state === PieMenu.ACTIVE) {
            if (this.hit(x, y)) {
                for (const option of this.#menuOptions) {
                    if (option.hit(x, y)) {
                        option.click();
                        this.#startClose();
                    }
                }
                // If no option was selected, close the menu
                if (this.#state !== PieMenu.CLOSING) {
                    this.#startClose();
                }
            } else {
                // cancel the menu
                this.#startClose();
            }
        }
    }

    /**
     * Check if the mouse is over the pie menu. If the pie menu 
     * is active, this method will check if any of its buttons are hovered. 
     * @param {number} x The x coordinate of the mouse
     * @param {number} y The y coordinate of the mouse
     */
    checkMouseOver(x, y) {
        if (this.#state === PieMenu.ACTIVE) {
            if (this.hit(x, y)) {
                for (const option of this.#menuOptions) {
                    if (option.hit(x, y)) {
                        option.setState(MenuButton.ACTIVE_HOVER);
                    } else {
                        option.setState(MenuButton.ACTIVE);
                    }
                }
            }
        }
    }

    /**
     * Handles the end of the opening / closing animations
     */
    #endAnimation() {
        switch (this.#state) {
            case PieMenu.OPENING:
                this.#state = PieMenu.ACTIVE;
                this.setRadius(this.#OPEN_RADIUS + 16);
                this.#stopButtons(MenuButton.ACTIVE);
                break;
            case PieMenu.CLOSING:
                this.#state = PieMenu.HIDDEN;
                this.setRadius(0);
                this.#stopButtons(MenuButton.INACTIVE);
                break;
        }
    }

    /**
     * Updates the menu buttons at the end of an animation
     * @param {string} newState 
     */
    #stopButtons(newState) {
        for (const option of this.#menuOptions) {
            option.setAnimationOptions(0, 0);
            option.setState(newState);
        }
    }

    /**
     * Sets up and starts the menu opening animation
     */
    #startOpen() {
        angleMode(DEGREES);
        this.#state = PieMenu.OPENING;
        const angleBetween = 360 / this.#menuOptions.length;
        for (let i = 0; i < this.#menuOptions.length; i++) {
            // The angle of the button
            const theta = angleBetween * i;
            // The following lines get the location that the button should end up in by using
            // the formulas for calculating a point on a circle.
            const openX = this.getX() + this.#OPEN_RADIUS * cos(theta);
            const openY = this.getY() + this.#OPEN_RADIUS * sin(theta);
            // Calculate the speed on each axis based on the distance to be travelled and the number of frames the animation should last
            const speedX = (openX - this.getX()) / this.#ANIMATION_LENGTH;
            const speedY = (openY - this.getY()) / this.#ANIMATION_LENGTH;
            this.#menuOptions[i].setAnimationOptions(speedX, speedY);
        }
        this.#framesElapsed = 0;
    }

    /**
     * Sets up and starts the menu closing animation
     */
    #startClose() {
        this.#state = PieMenu.CLOSING;
        const endX = this.getX();
        const endY = this.getY();
        for (const option of this.#menuOptions) {
            const speedX = (endX - option.getX()) / this.#ANIMATION_LENGTH;
            const speedY = (endY - option.getY()) / this.#ANIMATION_LENGTH;
            option.setState(MenuButton.INACTIVE);
            option.setAnimationOptions(speedX, speedY);
        }
        this.#framesElapsed = 0;
    }


}