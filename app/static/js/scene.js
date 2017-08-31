var Scene = function (game) {
    var s = {
        game: game,
    };

    // init
    var paddle = Paddle(game);
    var ball = Ball(game);

    var score = 0;

    var blocks = loadLevel(game, 1);


    game.registerAction('a', function () {
        paddle.moveLeft()
    });
    game.registerAction('d', function () {
        paddle.moveRight();
    });
    game.registerAction('f', function () {
        ball.fire();
    });
    s.draw = function () {
        // Draw background
        game.context.fillStyle = "gray";
        game.context.fillRect(0, 0, 400, 300);

        game.drawImage(paddle);
        game.drawImage(ball);

        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            if (block.alive) {
                // log(block);
                game.drawImage(block);
            }
        }

        game.context.fillStyle = "black";
        game.context.fillText('分数：' + score, 10, 290);
    };

    s.update = function () {
        if (window.paused) {
            return;
        }

        ball.move();

        if(ball.y > paddle.y) {
            // turn to game end
            var end = SceneEnd(game);
            game.replaceScene(end);
        }

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