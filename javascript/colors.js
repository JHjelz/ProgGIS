// Her farges alle lagene i kartet

var a = 0;
var b = 0;
var c = 0;

function RandomInt() {
    return Math.floor(Math.random() * 256)
}

function getStyle() {
    
    a += RandomInt();
    b += RandomInt();
    c += RandomInt();

    if (a > 255) {
        a = 0;
    } else if (b > 255) {
        b = 0;
    } else if (c > 255) {
        c = 0;
    }

    var myStyle = {
        "color": "rgb(" + a.toString() + "," + b.toString() + "," + c.toString() + ")"
    };

    return myStyle
}

function changeColor(name) {
    overlayMaps[name].setStyle(getStyle());
}
