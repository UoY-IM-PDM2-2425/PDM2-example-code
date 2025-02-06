let x;
let y;
let xspeed;
let yspeed;

function setup() {
    createCanvas(400, 400);
    x = width * 0.5;
    y = width * 0.5;
    xspeed = 3;
    stroke(6);
    
}

function draw() {
    background(255);
    rect(0,0,width,height)  // window border
    circle(x,y,100);
    //x = x + xspeed;
    if (x > width + 50) {
        x = -50;
    } else {
        x = x + xspeed;
    }
    //save();
    //noLoop();
    
}

function keyPressed() {
    if (key === 's') {
        saveGif('mySketch', 5);
    }
}