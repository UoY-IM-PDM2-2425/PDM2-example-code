class LevelOne{
    levelName;
    elementHelper

    constructor(){
        this.elementHelper = new ElementsHelper();
        this.levelName = 'Level One'
    }

    draw(){
        this.elementHelper.AddText(this.levelName, width/2, height/2);
    }
}