function difference() {
    var input1 = document.getElementById("differenceSelect_1").value;
    var layer1 = overlayMaps[input1];
    var input2 = document.getElementById("differenceSelect_2").value;
    var layer2 = overlayMaps[input2];
    var name = document.getElementById("differenceName").value;

    try {
        var difference = turf.difference(layer1.toGeoJSON(), layer2.toGeoJSON());
        var newLayer = L.geoJSON(difference);
        
        overlayMaps[name] = newLayer;

        updateSidebar();
        handleLayer(name);
        document.getElementById("differenceName").value = "";
        fillDifferenceSelect();
    } catch(failure) {
        alert(failure)
    }
}
