function intersection() {
    var input1 = document.getElementById("intersectionSelect_1").value;
    var layer1 = overlayMaps[input1].toGeoJSON();
    var input2 = document.getElementById("intersectionSelect_2").value;
    var layer2 = overlayMaps[input2].toGeoJSON();
    var name = document.getElementById("intersectionName").value;
    
    // Må konverteres fra feature collection til multipolygon:
    var coords1 = featureCollectionToMultiPolygon(layer1);
    var coords2 = featureCollectionToMultiPolygon(layer2);
    
    var multiPolygon1 = turf.multiPolygon(coords1);
    var multiPolygon2 = turf.multiPolygon(coords2);
    
    try {
        var intersection = turf.intersect(multiPolygon1, multiPolygon2);
        var newLayer = new L.GeoJSON(intersection, {style: getStyle()});
        
        overlayMaps[name] = newLayer;

        updateSidebar();
        handleLayer(name);
        document.getElementById("intersectionName").value = "";
        fillDoubleSelect("intersectionSelect");
    } catch(failure) {
        alert(failure);
    }
}
