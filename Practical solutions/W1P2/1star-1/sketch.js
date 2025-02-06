const users = new Set();

let userText;
let submit;
let message = "";

function setup() {
    createCanvas(400, 200);
    textSize(24);
    textAlign(LEFT, TOP);
    setupInputs();
}

function draw() {
    background(255);
    text("Username:", 10, height / 2 - 50, width - 20, 50);
    text(message, 10, height / 2 + 20, width - 20, 50);
}


/**
 * Event listener for the button. Takes the text in the input field 
 * and adds it to the users set, if appropriate. Displays a feedback 
 * message for the user.
 */
function addUser() {
    const newUser = userText.value();
    if (newUser.length > 0) {
        if (users.has(newUser)) {
            message = "User already exists! Try again."
        } else {
            users.add(newUser);
            message = `Hello, ${newUser}!`;
        }
    } else {
        message = "Username cannot be empty!"
    }
}


/**
 * Creates and positions the input controls.
 */
function setupInputs() {
    userText = createInput();
    submit = createButton("Submit");
    const main = select("main");
    userText.parent(main);
    submit.parent(main);
    submit.mouseClicked(addUser);
    userText.size(200, 30);
    userText.position(10, height / 2 - 20);
    console.log(userText.width);
    submit.position(210, height / 2 - 20);
}