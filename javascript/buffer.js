/*
Link til nettside med turfjs-funksjoner:
https://turfjs.org/docs/
*/

function makeBuffer() {
    var input = document.getElementById("bufferSelect").value;
    var layer = overlayMaps[input];
    var distance = parseFloat(document.getElementById("bufferDistance").value);
    var name = document.getElementById("bufferName").value;

    try {
        var buffer = turf.buffer(layer.toGeoJSON(), distance, {units: "meters"}); // Denne må ryddes opp i!
        var newLayer = L.geoJSON(turf.dissolve(buffer));
        
        overlayMaps[name] = newLayer;
        
        updateSidebar();
        handleLayer(name);
        document.getElementById("bufferDistance").value = "";
        document.getElementById("bufferName").value = "";
    } catch(failure) {
        alert(failure);
    }
}