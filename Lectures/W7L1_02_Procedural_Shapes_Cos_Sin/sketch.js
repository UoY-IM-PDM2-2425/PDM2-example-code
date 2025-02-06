let radius,angle;

function setup() {
    createCanvas(400, 300);
    radius = width * 0.3;
    angle = 0; 
}

function draw() {
    background(255);
    
    translate(width/2, height/2);
    angle = map(mouseX,0,width,0,360);
    //angle++;
    noFill();
   
    ellipse(0, 0, radius*2, radius*2);
    
    fill(30);
    /** radians() takes in degrees */
    let x = cos(radians(angle)) * radius;
    let y = sin(radians(angle)) * radius;
    ellipse(x, y, 20, 20);

}