/*
Her er det først to addEventListener-funksjoner som oppdaterer de ulike select-elementene i html-siden
avhengig av hva brukeren velger av verdier på select-elementene tidligere i prosedyren.
*/

document.getElementById("extractSelect").addEventListener("change", () => {
    var input = document.getElementById("extractSelect").value;

    if (input == "- - -") { // Om det ikke er valgt noen spesifikk verdi, skal ikke det neste select-elementet fylles med noe
        var select = document.getElementById("featureSelect");
        select.innerHTML = "";
        select.add(new Option(text="- - -"));
    } else { // Er det valgt noe, fylles neste med tilhørende verdier
        var layer = overlayMaps[input].toGeoJSON(); // Henter valgt kartlag

        var features = []; // Liste med features
        
        for (element in layer["features"]) {
            for (key in layer["features"][element]["properties"]) {
                if (!features.includes(key)) {
                    features.push(key); // Legger til alle features som ikke er i lista allerede
                }
            }
        }
        
        // Setter opp select-objektet:
        var select = document.getElementById("featureSelect");
        select.innerHTML = "";
        select.add(new Option(text="- - -"));

        // Fyller select-objektet med features fra features-lista:
        for (var i = 0; i < features.length; i++) {
            select.add(new Option(text = features[i], value = features[i]));
        }
    }
})

document.getElementById("featureSelect").addEventListener("change", () => {
    var input = document.getElementById("extractSelect").value;

    if (input == "- - -") { // Om det ikke er valgt noen spesifikk verdi, skal ikke det neste select-elementet fylles med noe
        var select = document.getElementById("valueSelect");
        select.innerHTML = "";
        select.add(new Option(text="- - -"));
    } else { // Er det valgt noe, fylles neste med tilhørende verdier
        var layer = overlayMaps[input].toGeoJSON();
        var property = document.getElementById("featureSelect").value;

        var values = [];

        for (element in layer["features"]) {
            if (!values.includes(layer["features"][element]["properties"][property])) {
                values.push(layer["features"][element]["properties"][property]);
            }
        }

        var select = document.getElementById("valueSelect");
        select.innerHTML = "";
        select.add(new Option(text="- - -"));

        for (var i = 0; i < values.length; i++) {
            select.add(new Option(text = values[i], value = values[i]));
        }
    }
})

function doExtract() {
    
    // Sjekk av faktisk og gyldig input:

    var regex = /^[a-zA-Z_0-9]+$/;

    if (document.getElementById("extractSelect").value == "- - -") { // Brukeren får tilbakemelding på hva som ikke fungerer / er feil
        return alert("You need to choose a layer!");
    } else if (document.getElementById("featureSelect").value == "- - -") {
        return alert("You need to choose a feature!");
    } else if (document.getElementById("valueSelect").value == "- - -") {
        return alert("You need to choose a value!");
    } else if (!document.getElementById("extractName").value) {
        return alert("You need to choose a name for the new layer!");
    } else if (!document.getElementById("extractName").value.match(regex)) {
        return alert("The new name must consist of normal letters!");
    } else if (doLayerExist(document.getElementById("extractName").value)) {
        return alert("Choose another name! There exists already a layer with that name.")
    }

    // Henter input fra brukeren:

    var input = document.getElementById("extractSelect").value;
    var layer = overlayMaps[input].toGeoJSON();
    var property = document.getElementById("featureSelect").value;
    var value = document.getElementById("valueSelect").value;
    var name = document.getElementById("extractName").value;

    var extracted = [];

    // Prøver å kjøre extract-funksjonen:
    try {
        for (element in layer["features"]) { // Henter alle elementer i kartlaget med attributtverdier som matcher brukers input
            if (layer["features"][element]["properties"][property] == value) {
                extracted.push(layer["features"][element]);
            }
        }
        var extract = turf.featureCollection(extracted); // Lager nytt featureCollection-element av de utvalgte elementene

        var newLayer = new L.GeoJSON(extract, {style: getStyle()});

        overlayMaps[name] = newLayer; // Det nye laget legges til i dictionarien med alle kartlagene
        
        updateSidebar(); // Oppdaterer sidebaren
        handleLayer(name); // Viser laget i kartet
        document.getElementById("extractName").value = ""; // Tilbakestiller input-feltene fra brukeren
        resetInput();
    } catch(failure) { // Hvis det ikke går å kjøre extraction, sendes det en feilmelding
        alert(failure);
    }
}

// Funksjon for å resette brukerens input:
function resetInput() {
    fillSelect("extractSelect");

    var select = document.getElementById("featureSelect");
    select.innerHTML = "";

    var select = document.getElementById("valueSelect");
    select.innerHTML = "";
}
