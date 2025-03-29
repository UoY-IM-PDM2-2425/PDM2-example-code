let enviromentTile;
let envio;

function preload(){
  enviromentTile = loadImage('assets/enviroment.png')
}

function setup() {
  createCanvas(400, 400);
  envio = new Enviroment(enviromentTile);
}

function draw() {
  background(220);

  for(let x = 0; x < 100; x++){
    for(let y = 0; y < 100; y++){
      envio.AddWater(x * 100, y*100);
    }
  }

  envio.AddBoat(100, 100)
  envio.AddDock(100, 200);
}
