function dissolve() {

    // Sjekk av faktisk og gyldig input:

    var regex = /^[a-zA-Z_0-9]+$/;

    if (document.getElementById("dissolveSelect").value == "- - -") {
        return alert("You need to choose a layer!");
    } else if (!document.getElementById("dissolveName").value) {
        return alert("You need to choose a name for the new layer!");
    } else if (!document.getElementById("dissolveName").value.match(regex)) {
        return alert("The new name must consist of normal letters!");
    }

    var input = document.getElementById("dissolveSelect").value;
    var layer = overlayMaps[input].toGeoJSON();
    var name = document.getElementById("dissolveName").value;
    
    try {
        var dissolved = turf.dissolve(layer);
        var newLayer = L.geoJSON(dissolved, {style: getStyle()});
        
        overlayMaps[name] = newLayer;

        updateSidebar();
        handleLayer(name);
        document.getElementById("dissolveSelect").value = "";
        document.getElementById("dissolveName").value = "";
        fillSelect("dissolveSelect");
    } catch(failure) {
        alert(failure);
    }
}
