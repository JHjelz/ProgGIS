function dissolve() {
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
