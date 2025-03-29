let frame1;
let frame2;
let frame3;
let animationSpeed = 0.0;
let sprite = [];

function preload() {
  // Image assets fromn https://creative-coding.decontextualize.com/making-games-with-p5-play/
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
  animationSpeed += 0.1
  
  let currentIndex = floor(animationSpeed) % sprite.length;
  image(sprite[currentIndex], width/100, height/100, 100, 100);


}
