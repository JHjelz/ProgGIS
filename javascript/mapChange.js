// Variabler:

var points = {
  "type": "FeatureCollection",
  "features": [
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4044907, 63.4173049]}, "properties": {"category": "Universitet", "name": "NTNU Gløshaugen"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4696324, 63.4079572]}, "properties": {"category": "Universitet", "name": "NTNU Dragvoll"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.388918, 63.4203714]}, "properties": {"category": "Universitet", "name": "NTNU Øya"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4347967, 63.4235678]}, "properties": {"category": "Universitet", "name": "NTNU Tyholt"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4143153, 63.433756]}, "properties": {"category": "Universitet", "name": "NTNU Solsiden"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4336351, 63.4138729]}, "properties": {"category": "Universitet", "name": "NTNU Moholt"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4032871, 63.4340888]}, "properties": {"category": "Universitet", "name": "NTNU Olavskvartalet"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4071882, 63.4107064]}, "properties": {"category": "Universitet", "name": "NTNU Lerkendal og Valgrinda"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3861107, 63.4288662]}, "properties": {"category": "Universitet", "name": "NTNU Kalvskinnet"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4540302, 63.4473022]}, "properties": {"category": "Universitet", "name": "NTNU Ringve"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3483128, 63.4415347]}, "properties": {"category": "Universitet", "name": "NTNU Heggdalen"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4492127, 63.4521411]}, "properties": {"category": "Universitet", "name": "NTNU Østmarka"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3981586, 63.4373727]}, "properties": {"category": "Universitet", "name": "NTNU Brattørkaia"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3992594, 63.4152944]}, "properties": {"category": "Universitet", "name": "NTNU Elgeseter"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4837531, 63.4393659]}, "properties": {"category": "Universitet", "name": "NTNU Rotvoll"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4660445, 63.42338]}, "properties": {"category": "Universitet", "name": "NTNU Tunga"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4176387, 63.4141732]}, "properties": {"category": "Studentby", "name": "Berg Studentby"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4301549, 63.4110984]}, "properties": {"category": "Studentby", "name": "Moholt Studentby"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4372857, 63.3989126]}, "properties": {"category": "Studentby", "name": "Steinan Studentby"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3918823, 63.420511]}, "properties": {"category": "Studentby", "name": "Bloksberg Studentby"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4382451, 63.4116778]}, "properties": {"category": "Studentby", "name": "Karinelund Studentby"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4945864, 63.4211031]}, "properties": {"category": "Studentby", "name": "Jakobsliveien 55"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.396918, 63.4226982]}, "properties": {"category": "Studentby", "name": "Klostergata 18"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3963873, 63.4227505]}, "properties": {"category": "Studentby", "name": "Klostergata 20"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3891634, 63.4232409]}, "properties": {"category": "Studentby", "name": "Klostergata 56"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4126211, 63.4147073]}, "properties": {"category": "Studentby", "name": "Nedre Berg Studentby"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3973319, 63.418334]}, "properties": {"category": "Studentby", "name": "Magnus den godes gate 2"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4037983, 63.4215247]}, "properties": {"category": "Studentby", "name": "Nedre Singsakerslette"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3890993, 63.4276236]}, "properties": {"category": "Studentby", "name": "Sverresgate 8"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4122453, 63.4337663]}, "properties": {"category": "Studentby", "name": "Nedre elvehavn Studentby"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3982518, 63.4163341]}, "properties": {"category": "Studentby", "name": "Teknobyen Studentboliger"}},
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4003657, 63.4117822]}, "properties": {"category": "Studentby", "name": "Lerkendal Studentby"}}
  ]
};

var m = "m1"; // Hvilket kart en bruker
var layersOnMap = []; // Hvilke kartlag som var på før en byttet til "m2"

var NTNU_points = L.geoJSON(points).bindPopup(function(point) {return "<b>" + point.feature.properties.category + "</b>" + "<br>" + point.feature.properties.name;})

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
