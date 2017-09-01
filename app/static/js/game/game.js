class Game {
    constructor(fps, images, runCallback) {
        window.fps = fps;
        this.images = images;
        this.runCallback = runCallback;

        this.scene = null;
        this.actions = {};
        this.keydowns = {};
        this.canvas = document.querySelector('#id-canvas');
        this.context = this.canvas.getContext('2d');

        var self = this;
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true;
        });
        window.addEventListener('keyup', function (event) {
            self.keydowns[event.key] = false;
        });
        this.init()
    }

    static instance (...args) {
        this.i = this.i || new this(...args);
        return this.i;
    }

    drawImage(image) {
        this.context.drawImage(image.image, image.x, image.y)
    }

    update() {
        this.scene.update();
    };

    draw() {
        this.scene.draw()
    };

    registerAction(key, callback) {
        this.actions[key] = callback;
    };

    runloop() {

        var g = this;
        var actions = Object.keys(g.actions); // ？
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i];
            if (g.keydowns[key]) {
                g.actions[key]();
            }
        }
        g.update();
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height);
        g.draw();

        setTimeout(function () {
            g.runloop()
        }, 1000 / window.fps);
    };

    init() {
        var g = this;
        var loads = [];
        // Load img
        var names = Object.keys(g.images);
        for (var i = 0; i < names.length; i++) {
            let name = names[i];
            var path = g.images[name];
            let img = new Image();
            img.src = path;
            log(img, name);
            img.onload = function () {
                g.images[name] = img;
                // Game run until All img loaded
                loads.push(1);
                log('load image');
                if (loads.length == names.length) {
                    g.__start();
                }
            }
        }
    };

    imageByName(name) {
        var g = this;
        var img = g.images[name];
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        };
        return image;
    };

    runWithScene(scene) {
        var g = this;
        g.scene = scene;
        setTimeout(function () {
            g.runloop()
        }, 1000 / window.fps);

    };

    replaceScene(scene) {
        this.scene = scene;
    };

    __start(scene) {
        this.runCallback(this);
    };
}
