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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, bgMusic_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        bgMusic_1 = new egret.Sound();
                        bgMusic_1.addEventListener(egret.Event.COMPLETE, function () { bgMusic_1.play(0, 0); }, bgMusic_1);
                        bgMusic_1.load("resource/assets/lullaby(KoreanVer.).mp3");
                        // 跳跃声音
                        this.jumpMusic = new egret.Sound();
                        this.jumpMusic.load("resource/assets/jump.mp3");
                        // 加分音乐
                        this.socreMusic = new egret.Sound();
                        this.socreMusic.load("resource/assets/score.mp3");
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.createGameScene = function () {
        var _this = this;
        this.removeChildren();
        GameData.stageW = this.stage.stageWidth;
        GameData.stageH = this.stage.stageHeight;
        // 添加白色背景
        var background = new egret.Shape;
        this.addChild(background);
        background.graphics.beginFill(0xffffff);
        background.graphics.drawRect(0, 0, GameData.stageW, GameData.stageH);
        background.graphics.endFill();
        // 创建分数面板
        this.scorePanel = new ScorePanel();
        this.addChild(this.scorePanel);
        // 创建水平线
        for (var i = 0; i < 2; i++) {
            var horizontal = this.createBitmapByName("horizon_png");
            this.addChild(horizontal);
            horizontal.width = GameData.stageW * 1.6;
            horizontal.x = i * 1.6 * GameData.stageW;
            horizontal.y = GameData.stageH * 0.9;
            var tw_1 = egret.Tween.get(horizontal, { loop: true });
            tw_1.to({ x: (i - 1) * 1.6 * GameData.stageW }, GameData.stageW * 6);
        }
        // 添加云朵
        var cloud = this.createBitmapByName("clouds_png");
        this.addChild(cloud);
        var factor = cloud.width / cloud.height;
        cloud.width = GameData.stageW;
        cloud.height = cloud.width / factor;
        cloud.x = GameData.stageW;
        cloud.y = GameData.stageH * 0.2;
        var tw = egret.Tween.get(cloud, { loop: true });
        tw.to({ x: -1 * GameData.stageW }, GameData.stageW * 14);
        // 添加障碍物
        var cactus1 = this.createBitmapByName("cactus1_png");
        var cactus2 = this.createBitmapByName("cactus2_png");
        var cake = this.createBitmapByName("cake_png");
        cactus1.name = "cactus1";
        cactus2.name = "cactus2";
        cake.name = "cake";
        this.obstacles = [cactus1, cactus2, cake];
        this.spawnNewEnemy();
        this.player = this.createBitmapByName("player_png");
        this.addChild(this.player);
        this.player.width = 100;
        this.player.height = 100;
        this.player.anchorOffsetX = this.player.width / 2;
        this.player.anchorOffsetY = this.player.height;
        this.player.x = GameData.stageW * 0.15;
        this.player.y = GameData.stageH * 0.9;
        this.touchEnabled = true;
        this.jumped = true;
        this.scored = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Jump, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.gameoverPanel = this.createBitmapByName("game_over_panel_png");
        this.addChild(this.gameoverPanel);
        factor = this.gameoverPanel.width / this.gameoverPanel.height;
        this.gameoverPanel.width = GameData.stageW / 2;
        this.gameoverPanel.height = this.gameoverPanel.width / factor;
        this.gameoverPanel.anchorOffsetX = this.gameoverPanel.width / 2;
        this.gameoverPanel.anchorOffsetY = this.gameoverPanel.height / 2;
        this.gameoverPanel.x = GameData.stageW / 2;
        this.gameoverPanel.y = -GameData.stageH / 2;
        this.gameoverPanel.touchEnabled = true;
        this.gameoverPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.createGameScene(); }, this);
    };
    // 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main.prototype.Jump = function () {
        var _this = this;
        if (this.jumped) {
            this.jumped = false;
            this.jumpMusic.play(0, 1);
            var start = this.player.y;
            var tw = egret.Tween.get(this.player);
            tw.to({ y: start - this.player.height * 2.5 }, GameData.stageH / 4, egret.Ease.cubicOut).to({ y: start }, GameData.stageH / 4, egret.Ease.cubicIn).call(function () {
                _this.jumped = true;
            }, this);
        }
    };
    Main.prototype.update = function (evt) {
        if (this.enemy.hitTestPoint(this.player.x, this.player.y - this.player.height / 2, true)) {
            if (this.enemy.name == "cake") {
                egret.Tween.removeTweens(this.enemy);
                this.removeChild(this.enemy);
                this.spawnNewEnemy();
                var score = this.scorePanel.getScore();
                this.scorePanel.setScore(score + 3);
                this.socreMusic.play(0, 1);
            }
            else {
                this.gameoverPanel.y = GameData.stageH / 2;
                egret.Tween.removeAllTweens();
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.Jump, this);
            }
        }
        if ((this.enemy.x < this.player.x) && this.scored && this.enemy.name != "cake") {
            this.scored = false;
            var score = this.scorePanel.getScore();
            this.scorePanel.setScore(score + 1);
            this.socreMusic.play(0, 1);
        }
    };
    Main.prototype.spawnNewEnemy = function () {
        var _this = this;
        var rand = Math.floor(Math.random() * 3);
        this.enemy = this.obstacles[rand];
        this.addChild(this.enemy);
        var factor = this.enemy.width / this.enemy.height;
        this.enemy.width = 100;
        this.enemy.height = this.enemy.width / factor;
        this.enemy.anchorOffsetY = this.enemy.height;
        this.enemy.x = GameData.stageW;
        this.enemy.y = GameData.stageH * 0.9;
        var tw = egret.Tween.get(this.enemy);
        tw.to({ x: -this.enemy.width }, 3000).call(function () {
            _this.removeChild(_this.enemy);
            _this.scored = true;
            _this.spawnNewEnemy();
        }, this);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
