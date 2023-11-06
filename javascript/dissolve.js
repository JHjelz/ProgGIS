function doDissolve() {

    // Sjekk av faktisk og gyldig input:

    var regex = /^[a-zA-Z_0-9]+$/;

    if (document.getElementById("dissolveSelect").value == "- - -") { // Brukeren får tilbakemelding på hva som ikke fungerer / er feil
        return alert("You need to choose a layer!");
    } else if (!document.getElementById("dissolveName").value) {
        return alert("You need to choose a name for the new layer!");
    } else if (!document.getElementById("dissolveName").value.match(regex)) {
        return alert("The new name must consist of normal letters!");
    } else if (doLayerExist(document.getElementById("dissolveName").value)) {
        return alert("Choose another name! There exists already a layer with that name.")
    }
    
    // Henter input fra brukeren:

    var input = document.getElementById("dissolveSelect").value;
    var layer = overlayMaps[input].toGeoJSON();
    var name = document.getElementById("dissolveName").value;
    
    // Prøver å kjøre dissolve-funksjonen:
    try {
        
        if (isMultiPolygon(layer)) { // Kan ikke sende MultiPolygon inn i dissolved
            layer = fixMultiPolygons(layer);
        }

        var dissolved = turf.dissolve(layer); // Kjører dissolve
        var newLayer = L.geoJSON(dissolved, {style: getStyle()});
        
        overlayMaps[name] = newLayer; // Det nye laget legges til i dictionarien med alle kartlagene

        updateSidebar(); // Oppdaterer sidebaren
        handleLayer(name); // Viser laget i kartet
        document.getElementById("dissolveSelect").value = ""; // Tilbakestiller input-feltene fra brukeren
        document.getElementById("dissolveName").value = "";
        fillSelect("dissolveSelect");
    } catch(failure) { // Hvis det ikke går å dissolve, sendes det en feilmelding
        alert(failure);
    }
}
