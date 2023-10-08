/*
Link til nettside med turfjs-funksjoner:
https://turfjs.org/docs/
*/

function makeBuffer() {
    
    // Sjekk av faktisk og gyldig input:
    
    var regex_1 = /^[0-9]+$/;
    var regex_2 = /^[a-zA-Z_0-9]+$/;
    
    if (document.getElementById("bufferSelect").value == "- - -") {
        return alert("You need to choose a layer!");
    } else if (!document.getElementById("bufferDistance").value) {
        return alert("You need to set a distance as an integer!");
    } else if (!document.getElementById("bufferDistance").value.match(regex_1)) {
        return alert("You need to set a distance as an integer!");
    } else if (!document.getElementById("bufferName").value) {
        return alert("You need to choose a name for the new layer!");
    } else if (!document.getElementById("bufferName").value.match(regex_2)) {
        return alert("The new name must consist of normal letters!");
    }

    var input = document.getElementById("bufferSelect").value;
    var layer = overlayMaps[input].toGeoJSON();
    var distance = parseFloat(document.getElementById("bufferDistance").value);
    var name = document.getElementById("bufferName").value;

    try {
        var buffer = turf.buffer(layer, distance, {units: "meters"});
        
        /*
        Funker ikke for 'Samferdsel'-laget med buffer-distanse mellom 68 og 101 meter.
        */

        if (document.getElementById("bufferCheck").checked) {
            var dissolved = turf.dissolve(buffer);
            var newLayer = L.geoJSON(dissolved, {style: getStyle()});
        } else {
            var newLayer = L.geoJSON(buffer, {style: getStyle()});
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
