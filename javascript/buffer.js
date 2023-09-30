/*
Link til nettside med turfjs-funksjoner:
https://turfjs.org/docs/
*/

// Fyller select med alternativ:

function fillSelect() {
    var select = document.getElementById("bufferSelect");
    select.options.lenght = 0;
    for (key in overlayMaps) {
        select.add(new Option(text = key, value = key)); //overlayMaps[key]
    }
}

function makeBuffer() {
    var input = document.getElementById("bufferSelect").value;
    var layer = overlayMaps[input];
    var distance = parseFloat(document.getElementById("bufferDistance").value);
    var name = document.getElementById("bufferName").value;

    try {
        var buffer = turf.buffer(layer.toGeoJSON(), distance, {units: "meters"}); // Denne må ryddes opp i!
        var newLayer = L.geoJSON(buffer);
        
        // Må endre denne for å få funksjonaliteten på sida til å fungere
        // Problematisk med samme navn på key og value for dictionaries
        overlayMaps[name] = newLayer;
        
        updateSidebar();
        
        //newLayer.addTo(map);
    } catch(failure) {
        alert(failure);
    }
}