let img;


function preload() {
  img = loadImage('assets/RPGChars32x32Preview.png');
}

function setup() {
  pixelDensity(10);
  //noSmooth();
  createCanvas(800, 800);
  
  
  
  // Display the image.
  //image(img,0,0,400,400);
  
  //using built-in cropping method
  //image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight], [fit], [xAlign], [yAlign])
  img =image(img, 100, 100, 100, 100,0, 0, 32,32);

  // Get a region of the image.
  //let c = get(0, 0, 32, 32);
  
  // Display the region.
  // image(c, 50, 50);
  
}

function draw() {

	//drawScaledImage(img, 0, 0, scale=3);
}

function drawScaledImage(img, x, y, scale=1) {
	//background(0);
	img.loadPixels()
	push()
	noStroke();
	for (let i = 0; i < img.width; i++) {
	  for (let j = 0; j < img.height; j++) {
		fill(img.get(i, j));
		rect(x + i*scale, y + j*scale, scale, scale);
	  }
	}
	pop()
  }