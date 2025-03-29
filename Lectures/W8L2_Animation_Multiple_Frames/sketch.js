let frame1;
let frame2;
let frame3;
let index = 0;
let sprite = [];

function preload() {
  // Load the image files.
  frame1 = loadImage("assets/asterix_normal0001.png");
  sprite.push(frame1);
  frame2 = loadImage("assets/asterix_normal0002.png");
  sprite.push(frame2);
  frame3 = loadImage("assets/asterix_normal0003.png");
  sprite.push(frame3);
}


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  index += 0.1
  let curindex = floor(index) % this.len;
  image(sprite[curindex], 100, height/2, 100,100);


}
