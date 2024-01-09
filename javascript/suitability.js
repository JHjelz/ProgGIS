function addPrioritizedLayer() { // Funskjon som legger til flere kartlag i alternativene
    // Lager  nytt HTML-objekt:
    var newPriority = document.createElement("div");
    var numb = document.getElementById("priorityDiv").childElementCount + 1; // Nummereres i forhold til hvor mange element som er lagt til
    var start =`<div id="div${numb}" style="display: flex; flex-grow: 2; flex-direction: row; justify-content: center; margin-top: 1vh;">`;
    var newSelect = `<select id="priority${numb.toString()}" class="input_standard"></select>`;
    var newButton = `<svg onclick="removePrioritizedLayer(${numb})" style="cursor: pointer; margin-left: 1vw;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"> <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/> </svg>`;
    var end = '</div>'
    newPriority.innerHTML = start + newSelect + newButton + end; // Fullstendig element, riktig nummerert med select-element og slette-knapp

    document.getElementById("priorityDiv").appendChild(newPriority); // Legger til det nye elementet
    fillSelect("priority" + numb.toString());
}

function removePrioritizedLayer(numb) { // Funksjon som fjerner kartlag lagt til i alternativene
    var count = document.getElementById("priorityDiv").childElementCount;
    if (numb == count) { // Er det siste element, slettes det bare
        document.getElementById("priorityDiv").removeChild(document.getElementById("div" + numb.toString()).parentElement);
    } else { // Ellers må en slette slik at de andre elementene bevares samtidig som nummereringen bevares uten hull
        for (var i=numb; i<count; i++) {
            document.getElementById("priority" + i.toString()).value = document.getElementById("priority" + (i+1).toString()).value;
        }
        document.getElementById("priorityDiv").removeChild(document.getElementById("div" + count.toString()).parentElement);
    }
}

function suitability() { // Faktisk egnethetsanalyse

    // Sjekker faktisk og gyldig input:

    var regex = /^[a-zA-Z_0-9]+$/;
    
    if (!document.getElementById("suitabilityName").value) { // Bruker får tilbakemelding om hva som ikke fungerer / er feil
        return alert("You need to choose a name for the new layer!");
    } else if (!document.getElementById("suitabilityName").value.match(regex)) {
        return alert("The new name must consist of normal letters!");
    } else if (doLayerExist2(document.getElementById("suitabilityName").value)) {
        return alert("Choose another name! There exists already a layer with that name.")
    }
    categoryName = document.getElementById("suitabilityName").value;

    // Henter aktuelle element:
    var numb = document.getElementById("priorityDiv").childElementCount;
    var priEl = [];
    for (var i = 1; i < numb + 1; i++) {
        priEl.push("priority" + i.toString());
    }
    
    // Finner alle mulige kombinasjoner av elementene:
    priEl = getCombinations(priEl);

    // Beregner poengscore for hver kombinasjon:

    var scores = getScores(numb, priEl);

    // Sorterer lista basert på score:

    priEl = insertionSort(priEl, scores);

    // Lager de ulike kartlagene med intersect:

    var newLayers = [];

    for (var i = 0; i < priEl.length; i++) {
        if (priEl[i].length == 1) { // Hvis aktuell kombinasjon kun har ett lag i seg
            var a = getMapLayer(priEl[i][0]);
            if (a == null) {
                return alert("You need to choose all layers!");
            }
            newLayers.push(a);
        } else { // Hvis det er flere
            var a = getMapLayer(priEl[i][0]); // Henter det første laget
            if (a == null) {
                return alert("You need to choose all layers!");
            }
            var newLayer = featureCollectionToMultiPolygon(a); // Endelig lag som skal lages
            for (var j = 1; j < priEl[i].length; j++) { // Henter alle andre lag i kombinasjonen
                var b = getMapLayer(priEl[i][j]);
                if (b == null) {
                    return alert("You need to choose all layers!");
                }
                var layer = featureCollectionToMultiPolygon(b);
                newLayer = turf.intersect(newLayer, layer); // ... og beregner snitt for å finne den delen der alle lagene overlapper
            }
            newLayers.push(newLayer);
        }
    }

    // Bruker difference for å unngå overlappende kartlag:

    for (var i = 1; i < newLayers.length; i++) {
        for (var j = 0; j < i; j++) {

            var a = newLayers[i];
            var b = newLayers[j];

            if (a == undefined || b == undefined) {
                break;
            }

            if (!isMultiPolygon(a)) {
                a = featureCollectionToMultiPolygon(a);
            }
            if (!isMultiPolygon(b)) {
                b = featureCollectionToMultiPolygon(b);
            }

            try {
                newLayers[i] = turf.difference(a, b); // Laget med høyest prioritet bevares, mens det med lavere slettes bort
            }
            catch {
                continue;
            }
        }
    }

    // Gjør om tilbake til FeatureCollection fra MultiPolygon:
    for (var i = 0; i < newLayers.length; i++) {
        if (newLayers[i] == undefined) {
            continue;
        } else if (isMultiPolygon(newLayers[i])) {
            newLayers[i] = multiPolygonToFeatureCollection(newLayers[i]);
        }
    }

    /*
    Legger til de nye lagene som har innhold i kartet:
    
    Karakteristiske farger for lagene:
    Rødt: "rgb(255,0,0)", Gult: "rgb(255,255,0)" Grønt: "rgb(0,255,0)"

    De ulike lagene legges til i gradert farge fra Rødt (dårligst) - Gult - Grønt (best)
    */

    var intervall = 255 / (newLayers.length - 1) * 2;
    var r = 0;
    var g = 255;

    for (var i = 0; i < newLayers.length; i++) {
        if (newLayers[i] == undefined) {
            continue;
        }
        var name = categoryName + (i+1).toString();

        var newLayer = L.geoJSON(newLayers[i], {style: {color: "rgb(" + r.toString() + "," + g.toString() + ",0)"}});
        if (r < 255) {
            r += intervall;
        }
        if (r >= 255) {
            g += -intervall;
        }
        overlayMaps[name] = newLayer;
        updateSidebar();
        handleLayer(name);
    }

    // Resetter input:
    document.getElementById("suitabilityName").value = "";
    for (var i = 2; i <= numb; i++) {
        removePrioritizedLayer(i);
    }
    fillSelect("priority1");
    closeBox("suitabilityBox");
}

function getCombinations(valuesArray) {
    /*
    Returnerer alle kombinasjoner av elementene i input-lista
    Lista [1, 2, 3] vil resultere i [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
    */
    var combi = [];
    var temp = [];
    var slent = Math.pow(2, valuesArray.length);

    for (var i = 0; i < slent; i++) {
        temp = [];
        for (var j = 0; j < valuesArray.length; j++) {
            if ((i & Math.pow(2, j))) {
                temp.push(valuesArray[j]);
            }
        }
        if (temp.length > 0) {
            combi.push(temp);
        }
    }

    combi.sort((a, b) => b.length - a.length);
    return combi;
}

function getScores(numb, list) { // Beregner scoren til hver kombinasjon fra 'getCombinations(valuesArray)' basert på brukers prioritering
    var scores = {};
    for (var i = 0; i < list.length; i++) {
        var score = 0;
        for (var j = 0; j < list[i].length; j++) {
            score += numb + 1 - parseInt(list[i][j].slice(-1));
        }
        scores[list[i]] = score;
    }
    return scores;
}

function insertionSort(list, dict) { // Sorterer lista basert på score i dictionary
    sorted = [list[0]]
    for (var i = 1; i < list.length; i++) {
        if (dict[list[i]] < dict[sorted[sorted.length - 1]]) {
            sorted.push(list[i]);
        } else {
            for (var j = 0; j < sorted.length; j++) {
                if (dict[sorted[j]] <= dict[list[i]]) {
                    sorted.push(sorted[sorted.length - 1]);
                    for (var k = sorted.length - 2; k > j; k--) {
                        sorted[k] = sorted[k - 1];
                    }
                    sorted[j] = list[i];
                    break;
                }
            }
        }
    }
    return sorted;
}

function getMapLayer(string) { // Funksjon som returnerer valgt kartlags
    var input = document.getElementById(string).value;
    if (input == "- - -") {
        return null;
    }
    return overlayMaps[input].toGeoJSON();
}
