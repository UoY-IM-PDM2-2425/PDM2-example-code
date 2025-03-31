class LevelTwo{
    levelName;
    elementHelper

    constructor(){
        this.elementHelper = new ElementsHelper();
        this.levelName = 'Level Two'
    }

    draw(){
        this.elementHelper.AddText(this.levelName, width/2, height/2);
    }
}