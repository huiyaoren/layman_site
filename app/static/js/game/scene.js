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

    static new(game) {
        var i = new this(game);
        return i
    }

    draw() {
        log('必须继承函数 draw()')
    }

    update() {
    }
}

