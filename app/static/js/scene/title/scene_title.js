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