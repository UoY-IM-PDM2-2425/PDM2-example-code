function setup() {
    // const numVertices = 12;
    // const spacing = 360 / numVertices;
    // createCanvas(400,400);
    // translate(width/2, height/2);
    // beginShape();
    
    // for(let i = 0; i < numVertices; i++) {
    //   const x = cos(radians(i * spacing)) * 100;
    //   const y = sin(radians(i * spacing)) * 100;
    //   vertex(x, y);
    // }
    // endShape(CLOSE);
}

function draw() { 
    let numVertices = map(mouseX,0,width*2,0,360);
    const spacing = 360 / numVertices;
    createCanvas(400,400);
    translate(width/2, height/2);
    beginShape();
    
    for(let i = 0; i < numVertices; i++) {
      const x = cos(radians(i * spacing)) * 100;
      const y = sin(radians(i * spacing)) * 100;
      vertex(x, y);
    }
    endShape(CLOSE);
}
