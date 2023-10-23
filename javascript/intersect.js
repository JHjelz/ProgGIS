function makeIntersection() {

    // Sjekk av faktisk og gyldig input:

    var regex = /^[a-zA-Z_0-9]+$/;

    if (document.getElementById("intersectionSelect_1").value == "- - -") { // Brukeren får tilbakemelding på hva som ikke fungerer / er feil
        return alert("You need to choose the first layer!");
    } else if (document.getElementById("intersectionSelect_2").value == "- - -") {
        return alert("You need to choose the secondt layer!");
    } else if (document.getElementById("intersectionSelect_1").value == document.getElementById("intersectionSelect_2").value) {
        return alert("You can not choose the same layer twice!");
    } else if (!document.getElementById("intersectionName").value) {
        return alert("You need to choose a name for the new layer!");
    } else if (!document.getElementById("intersectionName").value.match(regex)) {
        return alert("The new name must consist of normal letters!");
    } else if (doLayerExist(document.getElementById("intersectionName").value)) {
        return alert("Choose another name! There exists already a layer with that name.")
    }

    // Henter input fra brukeren:

    var input1 = document.getElementById("intersectionSelect_1").value;
    var layer1 = overlayMaps[input1].toGeoJSON();
    var input2 = document.getElementById("intersectionSelect_2").value;
    var layer2 = overlayMaps[input2].toGeoJSON();
    var name = document.getElementById("intersectionName").value;
    
    // Må konverteres fra feature collection til multipolygon:
    var multiPolygon1 = featureCollectionToMultiPolygon(layer1);
    var multiPolygon2 = featureCollectionToMultiPolygon(layer2);
    
    // Prøver å kjøre intersect-funksjonen:
    try {
        var intersection = turf.intersect(multiPolygon1, multiPolygon2); // Lager intersection
        
        if (isMultiPolygon(intersection)) { // Må konvertere tilbake til featureCollection
            intersection = multiPolygonToFeatureCollection(intersection);
        }

        var newLayer = new L.GeoJSON(intersection, {style: getStyle()});
        
        overlayMaps[name] = newLayer; // Det nye laget legges til i dictionarien med alle kartlagene

        updateSidebar(); // Oppdaterer sidebaren
        handleLayer(name); // Viser laget i kartet
        document.getElementById("intersectionName").value = ""; // Tilbakestiller input-feltene fra brukeren
        fillDoubleSelect("intersectionSelect");
    } catch(failure) { // Hvis det ikke går å lage intersection, sendes det en feilmelding
        alert(failure);
    }
}
