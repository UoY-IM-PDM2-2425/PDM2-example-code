

/**
 * Class representing a segment of a snake's body.
 */
class Segment {
    #x;
    #y
    #width = 20;

    /**
     * Create a segment.
     * @param {number} x The x coordinate of the segment. Optional. 
     * @param {number} y The y coordinate of the segment. Optional.
     */
    constructor(x = 20, y = 260) {
        this.#x = x;
        this.#y = y;
    }

    /**
     * Draw the segment.
     */
    draw() {
        fill(0, 255, 0);
        square(this.#x, this.#y, this.#width);
    }

    /**
     * Checks if this segment is over the given x, y coordinates.
     * @param {number} x The x coordinate.
     * @param {number} y The y coordinate.
     * @returns {boolean} True if the segment is over the point, false if not.
     */
    isOverPoint(x, y) {
        return this.#x < x && x < this.#x + this.#width
                && this.#y < y && y < this.#y + this.#width;
    }

    /**
     * Gets the x coordinate (CORNER mode) of the segment.
     * @returns {number} The x coordinate.
     */
    getX() {
        return this.#x;
    }

    /**
     * Gets the y coordinate (CORNER mode) of the segment.
     * @returns {number} The y coordinate.
     */
    getY() {
        return this.#y;
    }

    /**
     * Gets the width of the segment.
     * @returns {number} The width.
     */
    getWidth() {
        return this.#width;
    }
}

/**
 * Class representing a snake.
 */
class Snake {
    #xDir = 1;
    #yDir = 0;
    #segments = [];

    /**
     * Create a new Snake.
     */
    constructor() {
        this.#segments.push(new Segment());
    }

    /**
     * Move the Snake in the direction of travel.
     */
    move() {
        const currentHead = this.#segments[0];
        const newHead = new Segment(currentHead.getX() + currentHead.getWidth() * this.#xDir,
                                    currentHead.getY() + currentHead.getWidth() * this.#yDir);
        this.#segments.unshift(newHead);
        this.#segments.pop();
    }

    /**
     * Grow the Snake by one segment.
     */
    grow() {
        let lastSegment = this.#segments[this.#segments.length - 1];
        let newX = lastSegment.getX() - lastSegment.getWidth() * this.#xDir;
        let newY = lastSegment.getY() - lastSegment.getWidth() * this.#yDir;
        this.#segments.push(new Segment(newX, newY));
    }

    /**
     * Draw the Snake.
     */
    draw() {
        for (let segment of this.#segments) {
            segment.draw();
        }
    }

    /**
     * Checks if the head of the Snake is over the given Food object.
     * @param {Food} food The Food to check.
     * @returns {boolean} True if the Snake is over the Food, false otherwise.
     */
    isOverFood(food) {
        return this.#segments[0].isOverPoint(food.getX(), food.getY());
    }

    /**
     * Check's if the Snake has gone out of bounds.
     * @returns {boolean} True if the Snake is out of bounds, false if not.
     */
    isOutOfBounds() {
        let head = this.#segments[0];
        return head.getX() < head.getWidth() || head.getX() > width - head.getWidth()
                || head.getY() < head.getWidth() || head.getY() > height - head.getWidth();
    }

    /**
     * Change the snake's direction so that it moves to the left.
     */
    faceLeft() {
        this.#xDir = -1;
        this.#yDir = 0;
    }

    /**
     * Change the snake's direction so that it moves to the right.
     */
    faceRight() {
        this.#xDir = 1;
        this.#yDir = 0;
    }

    /**
     * Change the snake's direction so that it moves up.
     */
    faceUp() {
        this.#xDir = 0;
        this.#yDir = -1;
    }

    /**
     * Change the snake's direction so that it moves down.
     */
    faceDown() {
        this.#xDir = 0;
        this.#yDir = 1;
    }
}

/**
 * Class representing Snake food.
 */
class Food {
    #x;
    #y;
    #width = 20;

    /**
     * Create a new Food in a random grid cell.
     */
    constructor() {
        this.regenerate();
    }


    #randomCoordinate() {
        let margin = this.#width * 2;
        let gridCell = floor(random((width - margin) / this.#width))
        return gridCell * this.#width + this.#width * 1.5;
    }

    /**
     * Gets the Food's x coordinate.
     * @returns {number} The x coordinate.
     */
    getX() {
        return this.#x;
    }

    /**
     * Gets the Food's y coordinate.
     * @returns {number} The y coordinate.
     */
    getY() {
        return this.#y;
    }

    /**
     * Draw the Food
     */
    draw() {
        fill(255, 255, 0);
        circle(this.#x, this.#y, this.#width);
    }

    /**
     * Move the Food to a new random grid cell.
     */
    regenerate() {
        this.#x = this.#randomCoordinate();
        this.#y = this.#randomCoordinate();
    }
}