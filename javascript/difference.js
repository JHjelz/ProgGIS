function makeDifference() {

    // Sjekk av faktisk og gyldig input:

    var regex = /^[a-zA-Z_0-9]+$/;

    if (document.getElementById("differenceSelect_1").value == "- - -") { // Brukeren får tilbakemelding på hva som ikke fungerer / er feil
        return alert("You need to choose the first layer!");
    } else if (document.getElementById("differenceSelect_2").value == "- - -") {
        return alert("You need to choose the second layer!");
    } else if (document.getElementById("differenceSelect_1").value == document.getElementById("differenceSelect_2").value) {
        return alert("You can not choose the same layer twice!");
    } else if (!document.getElementById("differenceName").value) {
        return alert("You need to choose a name for the new layer!");
    } else if (!document.getElementById("differenceName").value.match(regex)) {
        return alert("The new name must consist of normal letters!");
    } else if (doLayerExist(document.getElementById("differenceName").value)) {
        return alert("Choose another name! There exists already a layer with that name.")
    }
    
    // Henter input fra brukeren:

    var input1 = document.getElementById("differenceSelect_1").value;
    var layer1 = overlayMaps[input1].toGeoJSON();
    var input2 = document.getElementById("differenceSelect_2").value;
    var layer2 = overlayMaps[input2].toGeoJSON();
    var name = document.getElementById("differenceName").value;

    // Må konverteres fra feature collection til multipolygon:
    var multiPolygon1 = featureCollectionToMultiPolygon(layer1);
    var multiPolygon2 = featureCollectionToMultiPolygon(layer2);

    // Prøver å kjøre difference-funksjonen:
    try {
        var difference = turf.difference(multiPolygon1, multiPolygon2); // Lager difference
        
        if (isMultiPolygon(difference)) {
            difference = multiPolygonToFeatureCollection(difference); // Gjør om tilbake fra multiPolygon til featureCollection
        }
        
        var newLayer = L.geoJSON(difference, {style: getStyle()});
        
        overlayMaps[name] = newLayer; // Det nye laget legges til i dictionarien med alle kartlagene

        updateSidebar(); // Oppdaterer sidebaren
        handleLayer(name); // Viser laget i kartet
        document.getElementById("differenceName").value = ""; // Tilbakestiller input-feltene fra brukeren
        fillDoubleSelect("differenceSelect");
    } catch(failure) { // Hvis det ikke går å lage difference, sendes det en feilmelding
        alert(failure);
    }
}
