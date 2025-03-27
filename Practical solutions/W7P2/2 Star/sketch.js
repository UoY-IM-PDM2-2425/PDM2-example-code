function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(123);

  translate(width/2, height/2);

  beginShape();
  for(let i = 0; i < 100; i++){
    let x = cos(radians(i * 36)) * 100;
    let y  = sin(radians(i * 36)) * 100;
    vertex(x, y);
  }
  endShape();
}
