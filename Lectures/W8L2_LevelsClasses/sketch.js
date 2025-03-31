let levelState = 0;
let levels = [];



function setup() {
  createCanvas(400, 400);
  levelState = 0;

  levels.push(new LevelOne);
  levels.push(new LevelTwo)
}

function draw() {
  background(220);


  switch(levelState){
    case 0:
      levels[0].draw();
      break;
    case 1:
      levels[1].draw();
  }
}


function keyPressed(){
  if(key === '1'){
    levelState = 0;
  } else if(key === '2'){
    levelState = 1;
  }
}
