var SceneEnd = function (game) {
    var s = {
        game: game,
    };

    game.registerAction('r', function () {
         var s = new SceneTitle(game);
        game.replaceScene(s);
    });

    s.draw = function () {

        game.context.fillText('游戏结束 按 R 返回标题界面', 100, 200);
    };

    s.update = function () {

    };

    return s;
};