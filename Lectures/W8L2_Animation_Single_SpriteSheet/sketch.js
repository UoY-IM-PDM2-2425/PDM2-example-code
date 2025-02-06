// Daniel Shiffman
// http://youtube.com/thecodingtrain
// https://thecodingtrain.com/CodingChallenges/111-animated-sprite.html

// Penguin Spritesheet from
// https://opengameart.org/content/penguin-for-loderunner
// by biodegradableguy
// CC0

// Shiffman's Animation Sprite
// https://youtu.be/3noMeuufLZY

let spritesheet;
let spritedata;

let animation = [];

let penguin;

function preload() {
  spritedata = loadJSON('assets/lr_penguin2.json');
  spritesheet = loadImage('assets/lr_penguin2.png');
}


function setup() {
  createCanvas(640, 480);
  let frames = spritedata.frames;
  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].position;
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
    animation.push(img);
  }
  
  penguin = new Sprite(animation, width/2-64, height/2-64, 5,random(0.1, 0.4));
  
}

function draw() {
  background(125);
  penguin.show();
  penguin.animate();
  
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5);
  }
}

