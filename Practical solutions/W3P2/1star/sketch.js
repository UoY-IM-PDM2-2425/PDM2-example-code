const LEFT_LOWERCASE = "a";
const LEFT_UPPERCASE = "A";
const RIGHT_LOWERCASE = "d";
const RIGHT_UPPERCASE = "D";
const UP_LOWERCASE = "w";
const UP_UPPERCASE = "W";
const DOWN_LOWERCASE = "s";
const DOWN_UPPERCASE = "S";

function setup() {
    createCanvas(0, 0);
}

function draw() {}


function keyPressed() {
    switch (key) {
        case LEFT_LOWERCASE:
        case LEFT_UPPERCASE:
            console.log("move left");
            break;
        case RIGHT_LOWERCASE:
        case RIGHT_UPPERCASE:
            console.log("move right");
            break;
        case UP_LOWERCASE:
        case UP_UPPERCASE:
            console.log("move up");
            break;
        case DOWN_LOWERCASE:
        case DOWN_UPPERCASE:
            console.log("move down");
            break;
        default:
            console.log("Don't move!");
    }
}