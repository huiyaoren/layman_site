// Old javascript
var SceneOld = function () {
    this.a = 1
};
SceneOld.prototype.draw = function () {
};

// New javascript
class BaseScene {
    constructor(game) {
        this.game = game
    }

    draw() {
        log('必须继承函数 draw()')
    }

    update() {
    }
}

class SceneTitle extends BaseScene {
    constructor(game) {
        super(game);
        game.registerAction('k', function () {
            var s = Scene(game);
            game.replaceScene(s);
        });
    }
    draw() {
        this.game.context.fillText('按 k 开始游戏', 100, 200);
    }
}