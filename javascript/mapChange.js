// Variabler:

var m = "m1"; // Hvilket kart en bruker
var layersOnMap = []; // Hvilke kartlag som var på i "m1" før en byttet til "m2"

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
    document.getElementById("pointOpener").style.display = "block";
    document.getElementById("addPointButton").style.display = "block";
    
    // Skjuler synlige kartlag i kartet:
    for (key in overlayMaps) {
      var layer = overlayMaps[key];
      if (map.hasLayer(layer)) {
        handleLayer(key);
        layersOnMap.push(key);
      }
    }
  } else if (m == "m2") {
    m = "m1";

    // Endrer knappene i menyen:
    document.getElementById("buttons1").style.display = "flex";
    document.getElementById("buttons2").style.display = "none";

    // Endrer knappene nedrest til høyre i kartet:
    document.getElementById("sidebarOpener").style.display = "block";
    document.getElementById("pointOpener").style.display = "none";
    document.getElementById("addPointButton").style.display = "none";

    // Fjerner punkt-markørene og eventuelle voronoi- og TIN-diagram fra kartet:
    if (isVoronoi) {
      voronoi();
    }
    if (isTIN) {
        TIN();
    }
    if (isHeat) {
      heatmap();
    }

    if (points != null) {
      if (map.hasLayer(points)) {
          handleDefaultPoints();
      }
    }

    // Legger til kartlagene som lå i kartet før en byttet kartmodus:
    while (layersOnMap.length > 0) {
        handleLayer(layersOnMap.shift());
    }
  }
}
