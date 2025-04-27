let spritesheet;
let spritedata;
let animation = [];
let frame = 0;
let upscaled_image;
let xpos, ypos;

let factor = 10 // size mult factor
let state = 'LEFT';

const spriteSize = 32; // sprite size in pixel
const spriteScaled = spriteSize * factor;

let enviromentTile;
let envio;

function preload() {
  //load data on each frame (not needed but speeds up process)
  spritedata = loadJSON('assets/lr_penguin2.json');
  spritesheet = loadImage('assets/lr_penguin2.png');
  enviromentTile = loadImage('assets/enviroment.png');
}

function setup() {
  createCanvas(400, 400);
  envio = new Enviroment(enviromentTile);
  noSmooth();
  xpos = width/2;
  ypos = height/2;
  let col = 4; // col lookup into spritesheet
  let row = 2; // row lookup into spritesheet
  imageMode(CENTER);
  upscaled_image = createImage(spriteSize, spriteSize);
  // Don't resize when copying. This will cause interpolation to happen.
  //copy pixel from source image(tileMap), resize and save to unscale_image
  
  let frameData = spritedata.frames;
  for (let i = 0; i < frameData.length; i++) {
    //use json data to get info on frames
    let pos = frameData[i].position;
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
    upscaled_image.copy(img, col * spriteSize, row * spriteSize, spriteSize, spriteSize, 0, 0, spriteSize, spriteSize);
    animation.push(img);
  }
}

function draw() {
  background(125);

  for(let x = 0; x < 100; x++){
    for(let y = 0; y < 100; y++){
      envio.AddWater(x * 100, y*100);
    }
  }

  envio.AddBoat(100, 100)
  envio.AddDock(100, 200);
  animate(state);
  frame += 0.1;
}

function animate(direction) {
  push();
  imageMode(CENTER);
  let index = floor(frame) % animation.length;
  
  switch(direction) {
    case 'RIGHT':
      scale(1, 1);  
      image(animation[index], xpos, ypos, spriteScaled, spriteScaled);
      break;
    case 'LEFT':
      scale(-1, 1); 
      image(animation[index], -xpos, ypos, spriteScaled, spriteScaled);
      break;
  }

  
  pop();
}

function keyPressed() {
  switch(key) {
    case 'w':
      console.log('up');
      ypos -= 10;
      break;
    case 's':
      console.log('down');
      ypos += 10;
      break;
    case 'a':
      console.log('left');
      xpos -= 10;  // Move left
      state = 'LEFT';  // Set state to left and flip the sprite
      break;
    case 'd':
      console.log('right');
      xpos += 10;  // Move right
      state = 'RIGHT';  // Set state to right
      break;
  }
}
