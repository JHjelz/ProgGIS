/*
Link til nettside med turfjs-funksjoner:
https://turfjs.org/docs/
*/

// Fyller select med alternativ:

var s = document.getElementById("bufferSelect");

s.options.lenght = 0;

for (key in overlayMaps) {
    s.add(new Option(key, overlayMaps[key]));
}

function makeBuffer() {
    var layer = document.getElementById("bufferSelect").value;
    var distance = parseFloat(document.getElementById("bufferDistance").value) / 10^3;
    var name = document.getElementById("bufferName").value;
    
    var buffer = L.geoJSON(turf.buffer(layer, distance, {units: "kilometers"})).addTo(map);

    overlayMaps[name] = buffer;
}