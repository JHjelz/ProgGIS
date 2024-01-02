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
    document.getElementById("layerNameColor").value = name;
    document.getElementById("R").value = a;
    document.getElementById("G").value = b;
    document.getElementById("B").value = c;
    document.getElementById("RText").value = a;
    document.getElementById("GText").value = b;
    document.getElementById("BText").value = c;
    document.getElementById("paintLayer").style.backgroundColor = "rgb(" + document.getElementById("R").value + "," + document.getElementById("G").value + "," + document.getElementById("B").value + ")";
    openBox("colorBox");
}

function updateValue(element) {
    var text = element + "Text";
    document.getElementById(text).value = document.getElementById(element).value;
    document.getElementById("paintLayer").style.backgroundColor = "rgb(" + document.getElementById("R").value + "," + document.getElementById("G").value + "," + document.getElementById("B").value + ")";
}

function paint() {
    a = document.getElementById("R").value;
    b = document.getElementById("G").value;
    c = document.getElementById("B").value;

    var newStyle = {
        "color": "rgb(" + a.toString() + "," + b.toString() + "," + c.toString() + ")"
    };
    overlayMaps[document.getElementById("layerNameColor").value].setStyle(newStyle);
    closeBox("colorBox");
}
