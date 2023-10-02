function dissolve() {
    var input = document.getElementById("dissolveSelect").value;
    var layer = overlayMaps[input].toGeoJSON();
    var name = document.getElementById("dissolveName").value;
    
    try {
        console.log(JSON.stringify(layer))
        if (layer["type"] == "MultiPolygon") {
            console.log("Ja");
            layer = multiPolygonToFeatureCollection(layer);
        }

        var dissolved = turf.dissolve(layer);
        var newLayer = L.geoJSON(dissolved);

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
