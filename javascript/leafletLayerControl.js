// Layer control:

var baselayers = {
    "OpenStreetMap": osm_map,
    "Satellite": googleSat
}

var overlayMaps = {};

var controller = L.control.layers(baselayers).addTo(map);
var exampleLoaded = false;

var addedLayers = [];

// Til sidebaren:

function loadExampleData() {
    if (!exampleLoaded) {
        
        overlayMaps["Arealdekke"] = Arealdekke;
        overlayMaps["Bygg_f"] = Bygg_f;
        overlayMaps["Bygg_l"] = Bygg_l;
        overlayMaps["Samferdsel"] = Samferdsel;
        
        updateSidebar();
        exampleLoaded = true;
        document.getElementById("exampleData").style.display = "none";
    }
}

function updateSidebar() {
    for (key in overlayMaps) {
        if (!addedLayers.includes(key)) {
            addedLayers.push(key);

            var layerButton = document.createElement("div");
            layerButton.innerHTML = `<button id=${key} class='sidebarButton' onclick='handleLayer("${key}")' />${key}`;
            
            container = document.getElementById("layers");
            container.appendChild(layerButton);
            container.appendChild(document.createElement("br"));
        }
    }
}

function handleLayer(name) {
    var layer = null;

    for (key in overlayMaps) {
        if (key == name) {
            layer = overlayMaps[key];
            break;
        }
    }
    
    if (map.hasLayer(layer)) {
        map.removeLayer(layer);
        document.getElementById(name).style.backgroundColor = "black";
      } else {
        map.addLayer(layer);
        document.getElementById(name).style.backgroundColor = "green";
      }
}

// Sjekk at laget ikke eksisterer enda:

function doLayerExist(name) {
    for (key in overlayMaps) {
        if (key == name) {
            return true;
        }
    }
    return false;
}
