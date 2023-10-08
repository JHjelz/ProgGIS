document.getElementById("extractSelect").addEventListener("change", () => {
    var input = document.getElementById("extractSelect").value;

    if (input == "- - -") {
        var select = document.getElementById("featureSelect");
        select.innerHTML = "";
        select.add(new Option(text="- - -"));
    } else {
        var layer = overlayMaps[input].toGeoJSON();

        var features = [];
        
        for (element in layer["features"]) {
            for (key in layer["features"][element]["properties"]) {
                if (!features.includes(key)) {
                    features.push(key);
                }
            }
        }
        
        var select = document.getElementById("featureSelect");
        select.innerHTML = "";
        select.add(new Option(text="- - -"));

        for (var i = 0; i < features.length; i++) {
            select.add(new Option(text = features[i], value = features[i]));
        }
    }
})

document.getElementById("featureSelect").addEventListener("change", () => {
    var input = document.getElementById("extractSelect").value;

    if (input == "- - -") {
        var select = document.getElementById("valueSelect");
        select.innerHTML = "";
        select.add(new Option(text="- - -"));
    } else {
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

function extract() {
    
    // Sjekk av faktisk og gyldig input:

    var regex = /^[a-zA-Z_0-9]+$/;

    if (document.getElementById("extractSelect").value == "- - -") {
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

    var input = document.getElementById("extractSelect").value;
    var layer = overlayMaps[input].toGeoJSON();
    var property = document.getElementById("featureSelect").value;
    var value = document.getElementById("valueSelect").value;
    var name = document.getElementById("extractName").value;

    var extracted = [];

    try {
        for (element in layer["features"]) {
            if (layer["features"][element]["properties"][property] == value) {
                extracted.push(layer["features"][element]);
            }
        }
        var extract = turf.featureCollection(extracted);

        var newLayer = new L.GeoJSON(extract, {style: getStyle()});

        overlayMaps[name] = newLayer;
        
        updateSidebar();
        handleLayer(name);
        document.getElementById("extractName").value = "";
        resetInput();
    } catch(failure) {
        alert(failure);
    }
}

function resetInput() {
    fillSelect("extractSelect");

    var select = document.getElementById("featureSelect");
    select.innerHTML = "";

    var select = document.getElementById("valueSelect");
    select.innerHTML = "";
}
