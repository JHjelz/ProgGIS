// Layer control:

var baselayers = { // Dictionary med basiskartene (bakgrunnskart)
    "OpenStreetMap": osm_map,
    "Satellite": googleSat
}

var overlayMaps = {}; // Dictionary med alle kartlagene som skal vises oppå basiskartet fra Leaflet

// Legger til Leaflet's layer control med bakgrunnskartene:
var controller = L.control.layers(baselayers).addTo(map);

var exampleLoaded = false; // Er eksempeldata lagt til i kartet?
var addedLayers = []; // Alle kartlagene som er lagt til i kartet

// Til sidebaren:

function loadExampleData() {
    // Funksjon som laster inn den forhåndstilpassede dataen
    if (!exampleLoaded) {
        
        overlayMaps["Arealdekke"] = Arealdekke;
        overlayMaps["Bygg_f"] = Bygg_f;
        overlayMaps["Bygg_l"] = Bygg_l;
        overlayMaps["Samferdsel"] = Samferdsel;
        
        document.getElementById("layers").style.height = "60vh";

        updateSidebar();
        exampleLoaded = true;
        document.getElementById("exampleData").style.display = "none";
    }
}

function updateSidebar() {
    /*
    Funksjon som oppdaterer oversikten over kartlagene i sidebaren ettersom kartlag legges til
    */
    for (key in overlayMaps) {
        if (!addedLayers.includes(key)) {
            addedLayers.push(key); // Legger til kartet i oversikten

            // Lager aktuelle knapper for funksjonalitet koblet til kartlaget:
            var layerDiv = document.createElement("div");
            var start = `<div id=${key + '_1'} style="position: flex; flex-grow: 3; flex-direction: row;">`;
            var button = `<button id=${key} class='sidebarButton' onclick='handleLayer("${key}")'>${key}</button>`;
            var paintB = `<svg onclick='changeColor("${key}")' style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-palette-fill" viewBox="0 0 16 16"> <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07M8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/> </svg>`;
            var deleteB = `<svg onclick='deleteMapLayer("${key}")' style="cursor: pointer; margin-left: 1vw;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"> <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/> </svg>`;
            var end = '</div>';
            layerDiv.innerHTML = start + button + paintB + deleteB + end;

            // Kobler HTML-elementene sammen:
            container = document.getElementById("layers");
            container.appendChild(layerDiv);
        }
    }
}

function deleteMapLayer(name) { // Sletter kartlaget
    map.removeLayer(overlayMaps[name]); // Fjerner kartlaget fra kartet
    delete overlayMaps[name]; // Fjerner kartlaget fra dictionaryen
    // Henter og fjerner HTML-objektet fra sida:
    addedLayers.splice(addedLayers.indexOf(name), 1);
    var div = document.getElementById(name + '_1');
    if (div) {
        div.parentNode.removeChild(div);
    }
    checkExampleData(); // Sjekker om noe av eksempeldataen fremdeles er lastet inn
}

function checkExampleData() { // Sjekker om noe av eksempeldataen er lastet inn i kartet
    var count = 0;
    for (key in overlayMaps) { // Sjekker alle nøklene til kartlagene med eksempeldataen
        if (key == "Arealdekke") {
            count += 1;
        } else if (key == "Bygg_f") {
            count += 1;
        } else if (key == "Bygg_l") {
            count += 1;
        } else if (key == "Samferdsel") {
            count += 1;
        }

        if (count > 0) { // Hvis ett (eller flere) lag er lastet inn gjøres det ikke noe
            return;
        }
    }

    // Ellers må en si ifra om at all eksempeldata er slettet ...
    exampleLoaded = false;
    document.getElementById("exampleData").style.display = "block"; // ... og vise knappen som gjør det mulig å laste de inn på nytt
    document.getElementById("layers").style.height = "52vh";
}

function handleLayer(name) { // Funksjon som viser og skjuler kartlag i kartet og endrer farge på knappene i sidebaren avhengig av lagets synlighet
    var layer = null;

    for (key in overlayMaps) {
        if (key == name) {
            layer = overlayMaps[key]; // Henter aktuelt kartlag
            break;
        }
    }
    
    if (layer == null) {
        return;
    }

    if (map.hasLayer(layer)) { // Hvis kartlaget vises i kartet...
        map.removeLayer(layer); // ... fjern det
        document.getElementById(name).style.backgroundColor = "black"; // ... og endre fargen på knappen til 'Sort' = 'Ikke synlig'
      } else {
        map.addLayer(layer); // Ellers, legg til kartlaget
        document.getElementById(name).style.backgroundColor = "green"; // ... og endre fargen på knappen til 'Grønn' = 'Synlig'
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

function doLayerExist2(name) {
    for (key in overlayMaps) {
        if (key.toString().slice(0, -1) == name) {
            return true;
        }
    }
    return false;
}
