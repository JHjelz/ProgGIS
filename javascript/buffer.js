/*
Link til nettside med turfjs-funksjoner:
https://turfjs.org/docs/
*/

function makeBuffer() {
    var input = document.getElementById("bufferSelect").value;
    var layer = overlayMaps[input].toGeoJSON();
    var distance = parseFloat(document.getElementById("bufferDistance").value);
    var name = document.getElementById("bufferName").value;

    try {
        var buffer = turf.buffer(layer, distance, {units: "meters"});
        
        if (document.getElementById("bufferCheck").checked) {
            var dissolved = turf.dissolve(buffer);
            var newLayer = L.geoJSON(dissolved);
        } else {
            var newLayer = L.geoJSON(buffer);
        }
        
        overlayMaps[name] = newLayer;
        
        updateSidebar();
        handleLayer(name);
        document.getElementById("bufferDistance").value = "";
        document.getElementById("bufferName").value = "";
        fillSelect("bufferSelect");
    } catch(failure) {
        alert(failure);
    }
}
