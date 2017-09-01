var SceneTitle = function (game) {
    var s = {
        game: game,
    };

    game.registerAction('k', function () {
         var s = Scene(game);
        game.replaceScene(s);
    });

    s.draw = function () {

        game.context.fillText('按 k 开始游戏', 100, 200);
    };

    s.update = function () {

    };

    return s;
};