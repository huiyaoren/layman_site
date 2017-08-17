var Block = function (game, position) {
    // position : [0, 0]
    var p = position;
    // var image = imageFromPath("/static/images/block.jpg");
    // var o = {
    //     image: image,
    //     x: p[0],
    //     y: p[1],
    //     w: 50,
    //     h: 50,
    //     alive: true,
    //     lifes: p[2] || 1,
    // };
    var o = {};
    var img = game.imageByName('block');
    o.image = img.image;
    o.x = p[0];
    o.y = p[1];
    o.w = img.width;
    o.h = img.height;
    o.alive = true;
    o.lifes = p[2] || 1;

    o.kill = function () {
        o.lifes--;
        if (o.lifes < 1) {
            o.alive = false;
        }
    };

    o.collide = function (b) {
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o));
    };

    return o;
};

