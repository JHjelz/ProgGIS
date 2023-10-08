function union() {
    var input1 = document.getElementById("unionSelect_1").value;
    var layer1 = overlayMaps[input1].toGeoJSON();
    var input2 = document.getElementById("unionSelect_2").value;
    var layer2 = overlayMaps[input2].toGeoJSON();
    var name = document.getElementById("unionName").value;

    // Må konverteres fra feature collection til multipolygon:
    var coords1 = featureCollectionToMultiPolygon(layer1);
    var coords2 = featureCollectionToMultiPolygon(layer2);
    
    var multiPolygon1 = turf.multiPolygon(coords1);
    var multiPolygon2 = turf.multiPolygon(coords2);

    try {
        var union = turf.union(multiPolygon1, multiPolygon2);

        if (isMultiPolygon(union)) {
            union = multiPolygonToFeatureCollection(union);
        }

        var newLayer = L.geoJSON(union, {style: getStyle()});

        overlayMaps[name] = newLayer;

        updateSidebar();
        handleLayer(name);
        document.getElementById("unionName").value = "";
        fillDoubleSelect("unionSelect");
    } catch(failure) {
        alert(failure);
    }
}
