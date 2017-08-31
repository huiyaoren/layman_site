var SceneEnd = function (game) {
    var s = {
        game: game,
    };


    s.draw = function () {

        game.context.fillText('游戏结束', 100, 200);
    };

    s.update = function () {

    };

    // mouse event
    var enableDrag = false;
    game.canvas.addEventListener('mousedown', function (event) {
        var x = event.offsetX;
        var y = event.offsetY;
        log('down');
        if (ball.hasPoint(x, y)) {
            // Set drag status
            enableDrag = true;
        }
    });

    game.canvas.addEventListener('mousemove', function (event) {
        var x = event.offsetX;
        var y = event.offsetY;
        log('move');
        if (enableDrag) {
            ball.x = x;
            ball.y = y;
        }
    });

    game.canvas.addEventListener('mouseup', function (event) {
        var x = event.offsetX;
        var y = event.offsetY;
        log('up');
        enableDrag = false;
    });

    return s;
};