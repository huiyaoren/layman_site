var Game = function (fps, images, runCallback) {
    // images is a object, include images names
    var g = {
        actions: {},
        keydowns: [],
        images: {},
    };
    var canvas = document.querySelector('#id-canvas');
    var context = canvas.getContext('2d');

    g.canvas = canvas;
    g.context = context;

    g.drawImage = function (Image) {
        g.context.drawImage(Image.image, Image.x, Image.y)
    };

    window.addEventListener('keydown', function (event) {
        g.keydowns[event.key] = true;
    });
    window.addEventListener('keyup', function (event) {
        g.keydowns[event.key] = false;
    });

    g.registerAction = function (key, callback) {
        g.actions[key] = callback;
    };

    window.fps = 60;

    var runloop = function () {
        var actions = Object.keys(g.actions); // ？
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i];
            if (g.keydowns[key]) {
                g.actions[key]();
            }
        }
        g.update();
        context.clearRect(0, 0, canvas.width, canvas.height);
        g.draw();

        setTimeout(function () {
            runloop()
        }, 1000 / window.fps);
    };

    var loads = [];
    // Load images
    var names = Object.keys(images);
    for (var i = 0; i < names.length; i++) {
        let name = names[i];
        var path = images[name];
        let img = new Image();
        img.src = path;
        log(img, name);
        img.onload = function () {
            g.images[name] = img;
            // Game run until All images loaded
            loads.push(1);
            log('load image');
            if (loads.length == names.length) {
                g.run();
            }
        }
    }

    g.imageByName = function (name) {
        var img = g.images[name];
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        };
        return image;
    }

    g.run = function () {
        runCallback(g);
        setTimeout(function () {
            runloop()
        }, 1000 / window.fps);
    };



    return g;
};