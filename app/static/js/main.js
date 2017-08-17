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
            window.paused = !paused;
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
        ball: '/static/images/ball.png',
        block: '/static/images/block.jpg',
        paddle: '/static/images/paddle.png',
    };
    var game = Game(60, images, function () {
        var paddle = Paddle(game);
        var ball = Ball(game);

        var score = 0;


        blocks = loadLevel(game, 1);

        paused = false;

        enableDebugMode(game, true);

        game.registerAction('a', function () {
            paddle.moveLeft()
        });
        game.registerAction('d', function () {
            paddle.moveRight();
        });
        game.registerAction('f', function () {
            ball.fire();
        });


        game.update = function () {
            if (paused) {
                return
            }
            ball.move();

            if (paddle.collide(ball)) {
                ball.rebound()
            }

            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                if (block.collide(ball)) {
                    log('block ');
                    block.kill();
                    ball.rebound();
                    score += 100;
                }
            }
        };

        game.draw = function () {
            game.drawImage(paddle);
            game.drawImage(ball);

            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                if (block.alive) {
                    log(block);
                    game.drawImage(block);
                }
            }

            game.context.fillText('分数：' + score, 10, 290);
        };
    });


};

__main();