var loadLevel = function (game, n) {
    n = n - 1;
    log(levels, n);
    var level = levels[n];
    var blocks = [];
    for (var i = 0; i < level.length; i++) {
        var p = level[i];
        var b = Block(game, p);
        blocks.push(b);
    }
    return blocks;
};

var blocks = [];

var enableDebugMode = function (game, enabled) {
    if (!enabled) {
        return;
    }
    window.pause = false;
    window.addEventListener('keydown', function (event) {
        var k = event.key;
        if (event.key == 'p') {
            window.paused = !window.paused;
        } else if ('1234567'.includes(k)) {
            blocks = loadLevel(game, Number(k))
        }
    });

    document.querySelector('#id-input-speed').addEventListener('input', function (event) {
        var input = event.target;
        window.fps = Number(input.value);
    })
};

var __main = function () {

    var images = {
        ball: '/static/img/ball.png',
        block: '/static/img/block.jpg',
        paddle: '/static/img/paddle.png',
    };


    var game = Game(60, images, function (g) {
        var s = new SceneTitle(g);
        g.runWithScene(s)
    });

    enableDebugMode(game, true);

};

__main();