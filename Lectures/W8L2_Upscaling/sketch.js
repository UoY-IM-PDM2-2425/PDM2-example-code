let img = "assets/lr_penguin2.png";
let factor = 10 // size mult factor


const spriteSize = 32; // sprite size in pixel
const spriteScaled = spriteSize * factor;

let tileMap;
let test_image;

function preload() {
  tileMap = loadImage(img);
}

function setup() {
  createCanvas(400, 400);
  noSmooth();

  let _c = 4; // col lookup into spritesheet
  let _r = 2; // row lookup into spritesheet
  imageMode(CENTER);
  upscaled_image = createImage(spriteSize, spriteSize);
  // Don't resize when copying. This will cause interpolation to happen.
  upscaled_image.copy(
    tileMap,
    _c * spriteSize,
    _r * spriteSize,
    spriteSize,
    spriteSize,
    0,
    0,
    spriteSize,
    spriteSize
  );
}

function draw() {
  // Only resize when you actually draw the sprite
  background(255);
  //setTimeout(1000);
  image(upscaled_image, width*0.5, height*0.5, spriteScaled, spriteScaled);

}



