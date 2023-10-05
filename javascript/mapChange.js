// Variabler:

var points = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.4044907, 63.4173049]
            },
            "properties": {
              "name": "NTNU Gløshaugen"
            }
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.4696324, 63.4079572]
            },
            "properties": {
              "name": "NTNU Dragvoll"
            }
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.4336351, 63.4138729]
            },
            "properties": {
              "name": "NTNU Moholt"
            }
        }
    ]
}

var m = "m1"; // Hvilket kart en bruker
var layersOnMap = []; // Hvilke kartlag som var på før en byttet til "m2"
var NTNU_points = L.geoJSON(points, {style: {color: "blue"}}).bindPopup(function(point) {return point.feature.properties.name;})

// Bytter layout på nettsiden ved kartbytte

function changeMap() {
    
    // Hvis en box allerede er åpen, må denne lukkes først:
    
    if (boolskBox) {
        closeBox(box);
    }

    // Avhengig av hvilket kart en allerede har oppe, bytter en til motsatt status:

    if (m == "m1") {
        m = "m2";
        
        // Endrer knappene i menyen:
        document.getElementById("buttons1").style.display = "none";
        document.getElementById("buttons2").style.display = "flex";

        // Endrer knappene nedrest til høyre i kartet:
        document.getElementById("sidebarOpener").style.display = "none";
        document.getElementById("mapChanger").style.marginLeft = "0";

        // Skjuler synlige kartlag i kartet:
        for (key in overlayMaps) {
            var layer = overlayMaps[key];
            if (map.hasLayer(layer)) {
                handleLayer(key);
                layersOnMap.push(key);
            }
        }

        // Legger til nye punkt-markører i kartet:
        NTNU_points.addTo(map);
    } else if (m == "m2") {
        m = "m1";

        // Endrer knappene i menyen:
        document.getElementById("buttons1").style.display = "flex";
        document.getElementById("buttons2").style.display = "none";

        // Endrer knappene nedrest til høyre i kartet:
        document.getElementById("sidebarOpener").style.display = "block";
        document.getElementById("mapChanger").style.marginLeft = "8vh";

        // Fjerner punkt-markørene fra kartet:
        if (map.hasLayer(NTNU_points)) {
            map.removeLayer(NTNU_points);
        }

        // Legger til kartlagene som lå i kartet før en byttet kartmodus:
        while (layersOnMap.length > 0) {
            handleLayer(layersOnMap.shift());
        }
    }
}
