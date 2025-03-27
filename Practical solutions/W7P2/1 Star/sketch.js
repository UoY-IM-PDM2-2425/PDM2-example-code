function setup() {
  createCanvas(700, 700);

  
}

function draw() {
  background(220);
  
  

  //Task 1:
  beginShape();
  vertex(50, 50);
  vertex(150, 50);
  vertex(150, 150)
  vertex(50, 150);
  endShape(CLOSE);


  //Task 2:
  beginShape();
  vertex(350, 0);
  vertex(400, 150);
  vertex(275, 50);
  vertex(425, 50);
  vertex(310, 150);
  endShape(CLOSE);


  //Task 3 Example, no right solution:

  beginShape();
  noStroke()
  fill(40, 212, 34);
  vertex(100, 400);
  vertex(150, 500);
  vertex(150, 550);
  vertex(30, 600);
  endShape(CLOSE);
}
