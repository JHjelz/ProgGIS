// Her farges alle lagene i kartet

// Variabler som holder kontroll på RGB-fargeverdiene:
var a = 0;
var b = 0;
var c = 0;

function RandomInt() { // Returnerer et tilfeldig tall mellom 0 og 255
    return Math.floor(Math.random() * 256)
}

function getStyle() { // Returnerer ny, tilfeldig fargestil
    
    // Verdiene oppdateres (tilfeldig):
    a += RandomInt();
    b += RandomInt();
    c += RandomInt();

    // RGB går kun til 255, så ved høyere verdier, må de justeres:
    if (a > 255) {
        a = 0;
    }
    if (b > 255) {
        b = 0;
    }
    if (c > 255) {
        c = 0;
    }

    var myStyle = { // Lager ny stil
        "color": "rgb(" + a.toString() + "," + b.toString() + "," + c.toString() + ")"
    };

    return myStyle
}

function changeColor(name) { // Funksjon som åpner fargeboksen
    // Henter fargen på aktuelt lag:
    var array = overlayMaps[name].options.style["color"].split(',');
    array[0] = array[0].slice(4);
    array[2] = array[2].slice(0, -1);
    
    // Oppdaterer alle parametrene i boksen:
    document.getElementById("layerNameColor").value = name;
    document.getElementById("R").value = parseInt(array[0]);
    document.getElementById("G").value = parseInt(array[1]);
    document.getElementById("B").value = parseInt(array[2]);
    document.getElementById("RText").value = parseInt(array[0]);
    document.getElementById("GText").value = parseInt(array[1]);
    document.getElementById("BText").value = parseInt(array[2]);
    // Justerer fargen på 'paint'-knappen til å være lik fargen på aktuelt lag:
    document.getElementById("paintLayer").style.backgroundColor = "rgb(" + document.getElementById("R").value + "," + document.getElementById("G").value + "," + document.getElementById("B").value + ")";
    // Åpner den faktiske boksen:
    openBox("colorBox");
}

function updateValue(element) {
    /*
    Sørger for at feltene ved siden av dra-enhetene (range input) viser oppdatert verdi
    og farger 'paint'-knappen til riktig farge dynamisk
    */
    var text = element + "Text";
    document.getElementById(text).value = document.getElementById(element).value;
    document.getElementById("paintLayer").style.backgroundColor = "rgb(" + document.getElementById("R").value + "," + document.getElementById("G").value + "," + document.getElementById("B").value + ")";
}

function paint() { // Funksjon som endrer farge på kartlaget
    // Henter fargeverdiene:
    a = document.getElementById("R").value;
    b = document.getElementById("G").value;
    c = document.getElementById("B").value;

    var newStyle = { // Lager ny stil
        "color": "rgb(" + a.toString() + "," + b.toString() + "," + c.toString() + ")"
    };

    overlayMaps[document.getElementById("layerNameColor").value].setStyle(newStyle); // Farger laget
    closeBox("colorBox"); // Lukker boksen
}
