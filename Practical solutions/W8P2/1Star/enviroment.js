class Enviroment{
    image;
    constructor(image){
        this.image = image;
    }

    AddBoat(x, y){
        image(this.image, x, y, 100, 100, 0, 1100, 320, 320);
    }

    AddDock(x, y){
        image(this.image, x, y, 100, 100, 675, 1005, 320, 320);
    }

    AddWater(x, y){
        image(this.image, x, y, 100, 100, 250, 800, 32, 32);
    }

}