var log = console.log.bind(console);
// var e = sel => document.querySelector(sel);
// var log = function (s) {
//     e('#id-text-log').value += '\n' + s;
// };

var imageFromPath = function (path) {
    var image = new Image();
    image.src = path;
    return image;
};

var imageByName = function (name) {

}

var rectIntersects = function (a, b) {
    var o = a;
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true;
        }
    }
    return false;
};