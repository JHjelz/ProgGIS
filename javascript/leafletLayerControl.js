// Layer control:

var baselayers = {
    "OpenStreetMap": osm_map,
    "Satellite": googleSat
}

var controller = L.control.layers(baselayers).addTo(map);

var overlayMaps = [layer1, layer2];

// Test:

for (const i = 0; i < length(overlayMaps); i++) {
    var checkbox = document.createElement("div");
    checkbox.innerHTML += "<input type='checkbox' onchange='handleLayer(layer)' />";
    
    container = document.getElementById("layers");

    container.appendChild(checkbox);

    var t = overlayMaps[i]["properties"];

    var label = document.createElement('label');
    label.htmlFor = t;
    label.appendChild(document.createTextNode(t));

    container.appendChild(label);
    container.appendChild(document.createElement("br"));
}

function handleLayer(layer) {
    if(map.hasLayer(layer)) {
        map.removeLayer(layer);
      } else {
        map.addLayer(layer);
      }
}

/*var htmlObject = controller.getContainer();

var a = document.getElementById("layers");

function setParent(el, newParent) {
    newParent.appendChild(el);
}

setParent(htmlObject, a);*/