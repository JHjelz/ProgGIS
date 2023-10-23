/*
Link til nettside med turfjs-funksjoner:
https://turfjs.org/docs/
*/

function makeBuffer() {
    
    // Sjekk av faktisk og gyldig input:
    
    var regex_1 = /^[0-9]+$/;
    var regex_2 = /^[a-zA-Z_0-9]+$/;
    
    if (document.getElementById("bufferSelect").value == "- - -") { // Brukeren får tilbakemelding på hva som ikke fungerer / er feil
        return alert("You need to choose a layer!");
    } else if (!document.getElementById("bufferDistance").value) {
        return alert("You need to set a distance as an integer!");
    } else if (!document.getElementById("bufferDistance").value.match(regex_1)) {
        return alert("You need to set a distance as an integer!");
    } else if (!document.getElementById("bufferName").value) {
        return alert("You need to choose a name for the new layer!");
    } else if (!document.getElementById("bufferName").value.match(regex_2)) {
        return alert("The new name must consist of normal letters!");
    } else if (doLayerExist(document.getElementById("bufferName").value)) {
        return alert("Choose another name! There exists already a layer with that name.")
    }

    // Henter input fra brukeren:

    var input = document.getElementById("bufferSelect").value;
    var layer = overlayMaps[input].toGeoJSON();
    var distance = parseFloat(document.getElementById("bufferDistance").value);
    var name = document.getElementById("bufferName").value;

    // Prøver å kjøre buffer-funksjonen:
    var buffer = turf.buffer(layer, distance, {units: "meters"}); // Lager buffer
    console.log(JSON.stringify(buffer));
    try {
        var buffer = turf.buffer(layer, distance, {units: "meters"}); // Lager buffer
        
        if (document.getElementById("bufferCheck").checked) { // Om en har huket av for at en skal 'dissolve' gjøres det
            // Dette er nytt
            console.log(JSON.stringify(buffer));
            /*if (isMultiPolygon(buffer)) { // Kan ikke sende MultiPolygon inn i dissolved
                buffer = multiPolygonToFeatureCollection(buffer);
            }*/
            // #
            var dissolved = turf.dissolve(buffer);
            var newLayer = L.geoJSON(dissolved, {style: getStyle()});
        } else { // Ellers lager den bare mange ulike buffer-soner
            var newLayer = L.geoJSON(buffer, {style: getStyle()});
        }
        
        overlayMaps[name] = newLayer; // Det nye laget legges til i dictionarien med alle kartlagene
        
        updateSidebar(); // Oppdaterer sidebaren
        handleLayer(name); // Viser laget i kartet
        document.getElementById("bufferDistance").value = ""; // Tilbakestiller input-feltene fra brukeren
        document.getElementById("bufferName").value = "";
        fillSelect("bufferSelect");
    } catch(failure) { // Hvis det ikke går å lage buffer, sendes det en feilmelding
        alert(failure);
    }
}
