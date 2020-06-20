
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
            // 播放背景音乐
            let bgMusic:egret.Sound = new egret.Sound();
            bgMusic.addEventListener(egret.Event.COMPLETE, ()=>{bgMusic.play(0,0)}, bgMusic);
            bgMusic.load("resource/assets/lullaby(KoreanVer.).mp3");
            
            // 跳跃声音
            this.jumpMusic = new egret.Sound();
            this.jumpMusic.load("resource/assets/jump.mp3");

            // 加分音乐
            this.socreMusic = new egret.Sound();
            this.socreMusic.load("resource/assets/score.mp3");
        }
        catch (e) {
            console.error(e);
        }
    }

    
    // 创建游戏场景
    private player:egret.Bitmap;
    private obstacles:egret.Bitmap[];
    private enemy:egret.Bitmap;
    private jumped:boolean;  // 控制主角不能连跳
    private scored:boolean;  // 保证每次躲过仙人掌只能加一次分
    private scorePanel:ScorePanel;
    private gameoverPanel:egret.Bitmap;
    private jumpMusic:egret.Sound;
    private socreMusic:egret.Sound;
    private createGameScene() {
        this.removeChildren();
        GameData.stageW = this.stage.stageWidth;
        GameData.stageH = this.stage.stageHeight;
        
        // 添加白色背景
        let background:egret.Shape = new egret.Shape;
        this.addChild(background);
        background.graphics.beginFill(0xffffff);
        background.graphics.drawRect(0,0,GameData.stageW,GameData.stageH);
        background.graphics.endFill();       

        // 创建分数面板
        this.scorePanel = new ScorePanel();
        this.addChild(this.scorePanel);

        // 创建水平线
        for(let i=0; i<2; i++){
            let horizontal:egret.Bitmap = this.createBitmapByName("horizon_png");
            this.addChild(horizontal);
            horizontal.width = GameData.stageW*1.6;
            horizontal.x = i*1.6*GameData.stageW;
            horizontal.y = GameData.stageH*0.9;
            let tw:egret.Tween = egret.Tween.get(horizontal,{loop:true});
            tw.to({x: (i-1)*1.6*GameData.stageW}, GameData.stageW*6);
        }

        // 添加云朵
        let cloud:egret.Bitmap = this.createBitmapByName("clouds_png");
        this.addChild(cloud);
        let factor:number = cloud.width/cloud.height;
        cloud.width = GameData.stageW;
        cloud.height = cloud.width/factor;
        cloud.x = GameData.stageW;
        cloud.y = GameData.stageH*0.2;
        let tw:egret.Tween = egret.Tween.get(cloud,{loop:true});
        tw.to({x: -1*GameData.stageW}, GameData.stageW*14);

        // 添加障碍物
        let cactus1:egret.Bitmap = this.createBitmapByName("cactus1_png");
        let cactus2:egret.Bitmap = this.createBitmapByName("cactus2_png");
        let cake:egret.Bitmap = this.createBitmapByName("cake_png");
        cactus1.name = "cactus1";
        cactus2.name = "cactus2";
        cake.name = "cake";
        this.obstacles = [cactus1,cactus2,cake];
        this.spawnNewEnemy();

        this.player = this.createBitmapByName("player_png");
        this.addChild(this.player);
        this.player.width = 100;
        this.player.height = 100;
        this.player.anchorOffsetX = this.player.width/2;
        this.player.anchorOffsetY = this.player.height;
        this.player.x = GameData.stageW*0.15;
        this.player.y = GameData.stageH*0.9;

        this.touchEnabled = true;
        this.jumped = true;
        this.scored = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.Jump,this);

        this.addEventListener(egret.Event.ENTER_FRAME,this.update,this);

        this.gameoverPanel = this.createBitmapByName("game_over_panel_png");
        this.addChild(this.gameoverPanel);
        factor = this.gameoverPanel.width/this.gameoverPanel.height;
        this.gameoverPanel.width = GameData.stageW/2;
        this.gameoverPanel.height = this.gameoverPanel.width/factor;
        this.gameoverPanel.anchorOffsetX = this.gameoverPanel.width/2;
        this.gameoverPanel.anchorOffsetY = this.gameoverPanel.height/2;
        this.gameoverPanel.x = GameData.stageW/2;
        this.gameoverPanel.y = -GameData.stageH/2;
        this.gameoverPanel.touchEnabled = true;
        this.gameoverPanel.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{this.createGameScene();},this);
    }

    // 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    public createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private Jump(){
        if(this.jumped){
            this.jumped = false;
            this.jumpMusic.play(0,1);
            let start:number = this.player.y;
            let tw:egret.Tween = egret.Tween.get(this.player);
            tw.to({y:start-this.player.height*2.5},GameData.stageH/4,egret.Ease.cubicOut).to({y:start},GameData.stageH/4,egret.Ease.cubicIn).call(()=>{
                this.jumped = true;
            },this);
        }
    }

    private update(evt:egret.Event){
        if(this.enemy.hitTestPoint(this.player.x,this.player.y-this.player.height/2,true)){
            if(this.enemy.name=="cake"){
                egret.Tween.removeTweens(this.enemy);
                this.removeChild(this.enemy);
                this.spawnNewEnemy();
                let score:number = this.scorePanel.getScore();
                this.scorePanel.setScore(score+3);
                this.socreMusic.play(0,1);
            }
            else{
                this.gameoverPanel.y = GameData.stageH/2;
                egret.Tween.removeAllTweens();
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.Jump,this);
            }
        }
        if((this.enemy.x<this.player.x)&&this.scored&&this.enemy.name!="cake"){
            this.scored = false;
            let score:number = this.scorePanel.getScore();
            this.scorePanel.setScore(score+1);
            this.socreMusic.play(0,1);
        }
    }

    private spawnNewEnemy(){
        let rand:number = Math.floor(Math.random()*3);
        this.enemy = this.obstacles[rand];
        this.addChild(this.enemy);
        let factor:number = this.enemy.width/this.enemy.height;
        this.enemy.width = 100;
        this.enemy.height = this.enemy.width/factor;
        this.enemy.anchorOffsetY = this.enemy.height;
        this.enemy.x = GameData.stageW;
        this.enemy.y = GameData.stageH*0.9;
        let tw:egret.Tween = egret.Tween.get(this.enemy);
        tw.to({x: -this.enemy.width}, 3000).call(()=>{
            this.removeChild(this.enemy);
            this.scored = true;
            this.spawnNewEnemy();
        },this);
    }

}