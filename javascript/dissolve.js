function dissolve() {
    var input = document.getElementById("dissolveSelect").value;
    var layer = overlayMaps[input];
    var name = document.getElementById("dissolveName").value;
    
    try {
        var dissolved = turf.dissolve(layer.toGeoJSON());
        var newLayer = L.geoJSON(dissolved);

        overlayMaps[name] = newLayer;

        updateSidebar();
        handleLayer(name);
        document.getElementById("dissolveSelect").value = "";
        document.getElementById("dissolveName").value = "";
    } catch(failure) {
        alert(failure);
    }
}