let img;


function preload() {
  img = loadImage('assets/RPGChars32x32Preview.png');
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  //Sprite, X, Y, W, H, cut X, cut Y, sprite W, sprit H
  image(img, 100, 100, 100, 100, 0, 0, 32,32);
}