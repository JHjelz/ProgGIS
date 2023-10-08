function difference() {
    var input1 = document.getElementById("differenceSelect_1").value;
    var layer1 = overlayMaps[input1].toGeoJSON();
    var input2 = document.getElementById("differenceSelect_2").value;
    var layer2 = overlayMaps[input2].toGeoJSON();
    var name = document.getElementById("differenceName").value;

    // Må konverteres fra feature collection til multipolygon:
    var multiPolygon1 = featureCollectionToMultiPolygon(layer1);
    var multiPolygon2 = featureCollectionToMultiPolygon(layer2);

    try {
        var difference = turf.difference(multiPolygon1, multiPolygon2);
        
        if (isMultiPolygon(difference)) {
            difference = multiPolygonToFeatureCollection(difference);
        }
        
        var newLayer = L.geoJSON(difference, {style: getStyle()});
        
        overlayMaps[name] = newLayer;

        updateSidebar();
        handleLayer(name);
        document.getElementById("differenceName").value = "";
        fillDoubleSelect("differenceSelect");
    } catch(failure) {
        alert(failure);
    }
}
