function addPrioritizedLayer() {
    var newPriority = document.createElement("div");
    var numb = document.getElementById("priorityDiv").childElementCount + 1;
    var start =`<div id="div${numb}" style="display: flex; flex-grow: 2; flex-direction: row; justify-content: center; margin-top: 1vh;">`;
    var newSelect = `<select id="priority${numb.toString()}"></select>`;
    var newButton = `<svg onclick="removePrioritizedLayer(${numb})" style="cursor: pointer; margin-left: 1vw;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"> <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/> </svg>`;
    var end = '</div>'
    newPriority.innerHTML = start + newSelect + newButton + end;

    document.getElementById("priorityDiv").appendChild(newPriority);
    fillSelect("priority" + numb.toString());
}

function removePrioritizedLayer(numb) {
    var count = document.getElementById("priorityDiv").childElementCount;
    if (numb == count) {
        document.getElementById("priorityDiv").removeChild(document.getElementById("div" + numb.toString()).parentElement);
    } else {
        for (var i=numb; i<count; i++) {
            document.getElementById("priority" + i.toString()).value = document.getElementById("priority" + (i+1).toString()).value;
        }
        document.getElementById("priorityDiv").removeChild(document.getElementById("div" + count.toString()).parentElement);
    }
}

function suitability() {
    // Sjekker at det er gitt inn navn:
    var regex = /^[a-zA-Z_0-9]+$/;
    if (!document.getElementById("suitabilityName").value) {
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
        if (priEl[i].length == 1) {
            var a = getMapLayer(priEl[i][0]);
            if (a == null) {
                return alert("You need to choose all layers!");
            }
            newLayers.push(a);
        } else {
            var a = getMapLayer(priEl[i][0]);
            if (a == null) {
                return alert("You need to choose all layers!");
            }
            var newLayer = featureCollectionToMultiPolygon(a);
            for (var j = 1; j < priEl[i].length; j++) {
                var b = getMapLayer(priEl[i][j]);
                if (b == null) {
                    return alert("You need to choose all layers!");
                }
                var layer = featureCollectionToMultiPolygon(b);
                newLayer = turf.intersect(newLayer, layer);
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

            newLayers[i] = turf.difference(a, b);
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

    // Legger til de nye lagene som har innhold i kartet:
    
    // Karakteristiske farger for lagene:
    // Rødt: "rgb(255,0,0)" Grønt: "rgb(0,255,0)"

    var intervall = 255 / (newLayers.length - 1);
    var r = 0;
    var g = 255;

    for (var i = 0; i < newLayers.length; i++) {
        if (newLayers[i] == undefined) {
            continue;
        }
        var name = categoryName + (i+1).toString();

        var newLayer = L.geoJSON(newLayers[i], {style: {color: "rgb(" + r.toString() + "," + g.toString() + ",0)"}});
        r += intervall;
        g += -intervall;
        overlayMaps[name] = newLayer;
        updateSidebar();
        handleLayer(name);
    }

    document.getElementById("suitabilityName").value = "";
    for (var i = 2; i <= numb; i++) {
        removePrioritizedLayer(i);
    }
    fillSelect("priority1");
}

function getCombinations(valuesArray) {
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
    //console.log(combi.join("\n"));
    return combi;
}

function getScores(numb, list) {
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

function insertionSort(list, dict) {
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

function getMapLayer(string) {
    var input = document.getElementById(string).value;
    if (input == "- - -") {
        return null;
    }
    return overlayMaps[input].toGeoJSON();
}
