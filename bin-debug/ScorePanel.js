var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ScorePanel = (function (_super) {
    __extends(ScorePanel, _super);
    function ScorePanel() {
        var _this = _super.call(this) || this;
        _this.width = GameData.stageW;
        _this.height = GameData.stageH * 0.1;
        _this.graphics.beginFill(0xffe400);
        _this.graphics.drawRect(0, 0, _this.width, _this.height);
        _this.graphics.endFill();
        _this.scoreText = new egret.TextField();
        _this.addChild(_this.scoreText);
        _this.scoreText.textColor = 0xff9423;
        _this.scoreText.width = _this.width;
        _this.scoreText.height = _this.height;
        _this.scoreText.textAlign = egret.HorizontalAlign.CENTER;
        _this.scoreText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.scoreText.size = 54;
        _this.setScore(0);
        return _this;
    }
    ScorePanel.prototype.getScore = function () {
        return this.score;
    };
    ScorePanel.prototype.setScore = function (score) {
        this.score = score;
        this.scoreText.text = "Score: " + this.score;
    };
    return ScorePanel;
}(egret.Sprite));
__reflect(ScorePanel.prototype, "ScorePanel");
