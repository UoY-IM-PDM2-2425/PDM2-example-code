// The JSDoc on the next line enables auto complete suggestions for items in the locations array
/** @type {QuestLocation[]} */
const locations = [];
let locationState = 0;
const END = 4; // The index of the last location

function setup() {
    createCanvas(800, 600);
    populateLocations();
}


function draw() {
    background(255);
    drawLocation();
}


function keyPressed() {
    let selectedOption;
    switch (key) {
        case "1":
            selectedOption = 0;
            break;
        case "2":
            selectedOption = 1;
            break;
        case "3":
            selectedOption = 2;
            break;
        default:
            selectedOption = -1; // invalid choice
    }
    const currentLocation = locations[locationState];
    const newState = currentLocation.getDestinationChoice(selectedOption);
    // Make sure that the choice leads to a valid location before updating the state
    if (newState >= 0) {
        locationState = newState;
    }
}


/**
 * Create the quest locations
 */
function populateLocations() {
    // location 0
    const start = new QuestLocation("in a hobbit hole", ["West", "East", "South East"], [1, 2, 3]);
    locations.push(start);

    // location 1
    const bed = new QuestLocation("in bed", ["East"], [0]);
    locations.push(bed);

    // location 2
    const rivendell = new QuestLocation("in Rivendell", ["West", "South East"], [0, 3]);
    locations.push(rivendell);

    // location 3
    const mordor = new QuestLocation("in Mordor", ["North West", "Put the ring in the fire"], [2, 4]);
    locations.push(mordor);

    // locaiton 4
    const end = new QuestLocation("a hero! You've destroyed the ring.\nGame Over", [], []);
    locations.push(end);
}


/**
 * Draw the current location
 */
function drawLocation() {
    fill(255, 0, 0);
    textSize(24);
    const currentLocation = locations[locationState];
    text(`You are ${currentLocation.getDescription()}`, 100, 150, 600, 100);
    // If the game isn't over, show choices
    if (locationState !== END) {
        text("Choose an option", 100, 300);
            // Show the available options
            for (let i = 0; i < currentLocation.getOptions().length; i++) {
                text(`${i+1}) ${currentLocation.getOptions()[i]}`, 100, 350 + 50 * i);
            }
        }
}