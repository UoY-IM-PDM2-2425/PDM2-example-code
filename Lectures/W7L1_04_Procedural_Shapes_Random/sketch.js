// code by Rune Madsen
// From Programming Design System - Chapter 1.4 "Procedural Shapes"
// https://programmingdesignsystems.com/shape/procedural-shapes/index.html
let squidginess = 3;
let radSize = 100;
function setup() {
   createCanvas(400,400) 

  
}

function draw() { 
  //let squidginess = map(mouseX, 0, width,0,20)
  background(255);
  fill("red")
  noStroke();
  squidginess = 20*cos((random(0,1)));

  translate(width/2, height/2);
  beginShape();
  for(let i = 0; i < 100; i++) {
   //Change the radius for every vertex
     let radius = radSize + random(squidginess);
     let x = cos(radians(i * 3.6)) * radius;
     let y = sin(radians(i * 3.6)) * radius;
     vertex(x, y);
   }
   endShape(CLOSE);

  ;

}

function keyPressed() {
  if (key === 's') {
      saveGif('mySketch', 5);
  }
}