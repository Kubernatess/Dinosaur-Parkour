class ScorePanel extends egret.Sprite {
    public constructor() {
        super();
        this.width = GameData.stageW;
        this.height = GameData.stageH*0.1;
        this.graphics.beginFill(0xffe400);
        this.graphics.drawRect(0,0,this.width,this.height);
        this.graphics.endFill();

        this.scoreText = new egret.TextField();       
        this.addChild(this.scoreText);
        this.scoreText.textColor = 0xff9423;
        this.scoreText.width = this.width;
        this.scoreText.height = this.height;
        this.scoreText.textAlign = egret.HorizontalAlign.CENTER;
        this.scoreText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.scoreText.size = 54;
        this.setScore(0);
    }

    private score:number;
    public getScore():number {
        return this.score;
    }
    private scoreText:egret.TextField;
    public setScore(score:number):void {
        this.score = score;
        this.scoreText.text = "Score: "+this.score;
    }
}