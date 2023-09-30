/*
Link til nettside med turfjs-funksjoner:
https://turfjs.org/docs/
*/

// Fyller select med alternativ:

var select = document.getElementById("bufferSelect");

select.options.lenght = 0;

for (key in overlayMaps) {
    select.add(new Option(key, overlayMaps[key]));
}

function makeBuffer() {
    var layer = overlayMaps[document.getElementById("bufferSelect").value];
    var distance = parseFloat(document.getElementById("bufferDistance").value);
    var name = document.getElementById("bufferName").value;

    var object = layer.toGeoJSON();
    console.log(JSON.stringify(object));

    var buffer = turf.buffer(layer.toGeoJSON(), distance, {units: "meters"});
    var newLayer = L.geoJSON(buffer);
    
    overlayMaps[name] = newLayer;
    
    updateSidebar();
    
    newLayer.addTo(map);
}