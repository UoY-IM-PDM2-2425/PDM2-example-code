let nameInput, submitButton;
const colours = new Map();


function setup() {
    createCanvas(400, 300);
    setupInputs();
    colours.set("white", color(255));
    colours.set("red", color(255, 0, 0));
    colours.set("blue", color(0, 0, 255));
}

function draw() {
    background(0);
    circle(mouseX, mouseY, 100);
}

function setupInputs() {
    nameInput = createInput("Enter a colour name");
    submitButton = createButton("Change Colour");
    const main = select("main");
    nameInput.parent(main);
    submitButton.parent(main);
    nameInput.size(150, 30);
    submitButton.size(100, 36);
    nameInput.position(0, 0);
    submitButton.position(150, 0);
    submitButton.mouseClicked(changeFill);
}

/**
 * Attempts to change the fill colour to the user's choice. 
 * It the user input is invalid, the default colour pink is used.
 */
function changeFill() {
    try {
        const col = colours.get(nameInput.value());
        fill(col);
    } catch (e) {
        fill(255, 0, 255);
        console.log(e);
    }
}