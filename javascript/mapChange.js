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
              "coordinates": [10.388918, 63.4203714]
            },
            "properties": {
              "name": "NTNU Øya"
            }
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.4347967, 63.4235678]
            },
            "properties": {
              "name": "NTNU Tyholt"
            }
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.4143153, 63.433756]
            },
            "properties": {
              "name": "NTNU Solsiden"
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
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.4032871, 63.4340888]
            },
            "properties": {
              "name": "NTNU Olavskvartalet"
            }
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.4071882, 63.4107064]
            },
            "properties": {
              "name": "NTNU Lerkendal og Valgrinda"
            }
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.3861107, 63.4288662]
            },
            "properties": {
              "name": "NTNU Kalvskinnet"
            }
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.4540302, 63.4473022]
            },
            "properties": {
              "name": "NTNU Ringve"
            }
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.3483128, 63.4415347]
            },
            "properties": {
              "name": "NTNU Heggdalen"
            }
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.4492127, 63.4521411]
            },
            "properties": {
              "name": "NTNU Østmarka"
            }
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.3981586, 63.4373727]
            },
            "properties": {
              "name": "NTNU Brattørkaia"
            }
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.3992594, 63.4152944]
            },
            "properties": {
              "name": "NTNU Elgeseter"
            }
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.4837531, 63.4393659]
            },
            "properties": {
              "name": "NTNU Rotvoll"
            }
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [10.4660445, 63.42338]
            },
            "properties": {
              "name": "NTNU Tunga"
            }
        }
    ]
};

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

        // Fjerner punkt-markørene og eventuelle voronoi- og TIN-diagram fra kartet:
        if (map.hasLayer(NTNU_points)) {
            map.removeLayer(NTNU_points);
        }
        if (isVoronoi) {
            voronoi();
        }
        if (isTIN) {
            TIN();
        }

        // Legger til kartlagene som lå i kartet før en byttet kartmodus:
        while (layersOnMap.length > 0) {
            handleLayer(layersOnMap.shift());
        }
    }
}
