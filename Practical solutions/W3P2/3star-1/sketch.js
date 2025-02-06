let enemy, hero;

function setup() {
    createCanvas(400, 400);
    enemy = new Enemy(5);
    hero = new Hero(width / 2, height / 2);
}

function draw() {
    background(0);
    enemy.draw();
    hero.draw();
}

function keyPressed() {
    switch (key) {
        case "w":
            console.log("w")
            hero.changeState(Hero.MOVE_UP);
            break;
        case "a":
            hero.changeState(Hero.MOVE_LEFT);
            break;
        case "s":
            hero.changeState(Hero.MOVE_DOWN);
            break;
        case "d":
            hero.changeState(Hero.MOVE_RIGHT);
            break;
        default:
            hero.changeState(Hero.STOP);
    }
}