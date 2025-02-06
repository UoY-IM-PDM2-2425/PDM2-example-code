function setup() {
    createCanvas(400,400);
    background(200);
    
    //star();
    vertexArrow();
    //vertexMountain();
    //vertexHouse();
    //bezierCurve();
    //bezierD();
    //contourShape();
}

function draw() {
   
    
}

function star(){
    
    beginShape();
    noStroke();
    
    vertex(100, 0);
    vertex(150, 150); 
    vertex(25, 50); 
    vertex(175, 50);
    vertex(50, 150);
    endShape(CLOSE);
}

function vertexArrow(){
    // author: runemadsen - Rune Skjoldborg Madsen
    //url: https://github.com/runemadsen/programmingdesignsystems.com/blob/master/examples/shape/custom-shapes/vertex-arrow.js 
    const w = width * 0.35;
    const h = width * 0.5;
    
    noFill();
    stroke(40);
    strokeCap(SQUARE);
    strokeWeight(width * 0.08);
    translate((width/2) - (w/2), (height/2) - (h/2));
    beginShape();
    vertex(0, 0);
    vertex(w, h/2);
    vertex(0, h);
    endShape();
}

function vertexMountain() {
    // author: runemadsen - Rune Skjoldborg Madsen
    // https://github.com/runemadsen/programmingdesignsystems.com/blob/master/examples/shape/custom-shapes/vertex-mountain.js
    fill(40);
    noStroke();
    
    beginShape();
    stroke(random(255));
    strokeWeight(10);
    vertex(0, height);
    vertex(width * 0.2, height * 0.4);
    vertex(width * 0.35, height * 0.6);
    vertex(width * 0.50, height * 0.2);
    vertex(width * 0.70, height * 0.5);
    vertex(width * 0.85, height * 0.3);
    vertex(width, height);
    endShape();
    
}


function vertexHouse(){
    // author: runemadsen - Rune Skjoldborg Madsen
    // https://github.com/runemadsen/programmingdesignsystems.com/blob/master/examples/shape/custom-shapes/vertex-house.js
    
    const w = width * 0.4;
    const h = width * 0.25;
    
    noStroke();
    fill(40);
    translate((width/2) - (w/2), height/2);
    
    beginShape();
    vertex(0, 0);
    vertex(0, h);
    vertex(w, h);
    vertex(w, 0);
    vertex(w/2, -h);
    endShape();
    
}


function bezierCurve(){
    beginShape();
    vertex(50, 92);
    quadraticVertex(500, 20, 10, 250);
    //bezierVertex(299, 341, 289, 230, 130, 310);
    endShape(CLOSE);
    
}

function bezierD(){
    const w = width * 0.4;
    const h = height * 0.5;
    
    stroke(30);
    strokeWeight(width*0.1);
    strokeCap(ROUND);
    noFill();
    translate((width/2) - (w*0.3), (height/2) - (h/2));
    beginShape();
    vertex(0, 0);
    bezierVertex(w, 0, w, h, 0, h);
    endShape(CLOSE);
    noLoop();
    
}


function contourShape(){
    const w = width * 0.7;
    const h = height * 0.7;
    
    translate((width/2) - (w/2), (height/2) - (h/2));
    
    fill(30);
    noStroke();
    beginShape();
    vertex(0, 0);
    vertex(w, 0);
    vertex(w, h);
    vertex(0, h);
    beginContour();
    vertex(w * 0.3, h * 0.3);
    vertex(w * 0.5, h * 0.8);
    vertex(w * 0.8, h * 0.4);
    endContour();
    endShape();
    noLoop();
    
}