let spritesheet;
let spritedata;
let animation = [];
let frame = 0;

function preload() {
  //load data on each frame (not needed but speeds up process)
  spritedata = loadJSON('assets/lr_penguin2.json');
  spritesheet = loadImage('assets/lr_penguin2.png');
}

function setup() {
  createCanvas(640, 480);
  //get frame data from json (not needed put speeds up process)
  let frameData = spritedata.frames;
  for (let i = 0; i < frameData.length; i++) {
    //use json data to get info on frames
    let pos = frameData[i].position;
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
    animation.push(img);
  }
}

function draw() {
  background(125);
  let index = floor(frame) % animation.length;
  image(animation[index], width/2-64, height/2-64, 100,100);
  //    frames array        xpos      ypos          w   h  
  frame += 0.1;
}