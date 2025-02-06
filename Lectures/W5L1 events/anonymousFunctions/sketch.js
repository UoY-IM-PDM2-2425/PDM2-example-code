let bgColour, fillColour;

function setup() {
    createCanvas(400, 400);
    bgColour = getRandomColour();
    fillColour = getRandomColour();

    // Change background colour every 3 seconds - traditional function syntax
    setInterval(function () {
        bgColour = getRandomColour();
    }, 3000);

    // Change fill colour every 2 seconds - arrow function syntax
    setInterval(() => {
        fillColour = getRandomColour();
    }, 2000);
}

function draw() {
    background(bgColour);
    fill(fillColour);
    circle(mouseX, mouseY, 100);
}

/**
 * Gets a random RGB colour
 * @returns {color}
 */
function getRandomColour() {
    return color(random(255), random(255), random(255));
}
