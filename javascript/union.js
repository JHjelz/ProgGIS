function makeUnion() {

    // Sjekk av faktisk og gyldig input:

    var regex = /^[a-zA-Z_0-9]+$/;

    if (document.getElementById("unionSelect_1").value == "- - -") { // Brukeren får tilbakemelding på hva som ikke fungerer / er feil
        return alert("You need to choose the first layer!");
    } else if (document.getElementById("unionSelect_2").value == "- - -") {
        return alert("You need to choose the secondt layer!");
    } else if (document.getElementById("unionSelect_1").value == document.getElementById("unionSelect_2").value) {
        return alert("You can not choose the same layer twice!")
    } else if (!document.getElementById("unionName").value) {
        return alert("You need to choose a name for the new layer!");
    } else if (!document.getElementById("unionName").value.match(regex)) {
        return alert("The new name must consist of normal letters!");
    } else if (doLayerExist(document.getElementById("unionName").value)) {
        return alert("Choose another name! There exists already a layer with that name.")
    }

    // Henter input fra brukeren:

    var input1 = document.getElementById("unionSelect_1").value;
    var layer1 = overlayMaps[input1].toGeoJSON();
    var input2 = document.getElementById("unionSelect_2").value;
    var layer2 = overlayMaps[input2].toGeoJSON();
    var name = document.getElementById("unionName").value;

    // Må konverteres fra FeatureCollection til MultiPolygon:
    var multiPolygon1 = featureCollectionToMultiPolygon(layer1);
    var multiPolygon2 = featureCollectionToMultiPolygon(layer2);
    
    try {
        var union = turf.union(multiPolygon1, multiPolygon2); // Lager unionen

        if (isMultiPolygon(union)) {
            union = multiPolygonToFeatureCollection(union); // Konverterer tilbake til FeatureCollection
        }

        var newLayer = L.geoJSON(union, {style: getStyle()});

        overlayMaps[name] = newLayer; // Det nye laget legges til i dictionarien med alle kartlagene

        updateSidebar(); // Oppdaterer sidebaren
        handleLayer(name); // Viser laget i kartet
        document.getElementById("unionName").value = ""; // Tilbakestiller input-feltene fra brukeren
        fillDoubleSelect("unionSelect");
    } catch(failure) { // Hvis det ikke går å lage union, sendes det en feilmelding
        alert(failure);
    }
}
