// Layer control:

var baselayers = {
    "OpenStreetMap": osm_map,
    "Satellite": googleSat
}

var overlayMaps = {
    "Arealdekke": Arealdekke,
    "Bygg_f": Bygg_f,
    "Bygg_l": Bygg_l,
    "Samferdsel": Samferdsel,
    "test1": test1,
    "test2": test2
}

var controller = L.control.layers(baselayers).addTo(map);

// Til sidebaren:

for (key in overlayMaps) {
    var layerButton = document.createElement("div");
    layerButton.innerHTML = "<button id='" + key + "' class='sidebarButton' onclick=handleLayer(" + key + ") />" + key;
    
    container = document.getElementById("layers");
    container.appendChild(layerButton);
    container.appendChild(document.createElement("br"));
}

function handleLayer(layer) {
    if(map.hasLayer(layer)) {
        map.removeLayer(layer);
        document.getElementById(layer).style.backgroundColor = "black"; // Dette må endres opp i!
      } else {
        map.addLayer(layer);
        document.getElementById(layer.innerHTML).style.backgroundColor = "green";
      }
}

function updateSidebar() {
    for (key in overlayMaps) {
        var layerButton = document.createElement("div");
        layerButton.innerHTML = "<button id='" + key + "' class='sidebarButton' onclick=handleLayer(" + key + ") />" + key;
        
        container = document.getElementById("layers");
        container.appendChild(layerButton);
        container.appendChild(document.createElement("br"));
    }
}
