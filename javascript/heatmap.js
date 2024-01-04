// Variabler:

var isHeat = false; // Parameter som sier om heatmap er på eller ikke

var intensity = 100; // Intensiteten til hvert punkt i heatmap-laget
var heat = null; // Selve laget

function heatmap() { // Lager heatmap
    if (points != null) { // Må ha punkt
        if (isHeat && heat != null) { // Hvis det eksisterer et heatmap ...
            map.removeLayer(heat); // ... fjernes det
            isHeat = false;
        } else { // Ellers lages det et nytt
            var data = getPoints(); // Punktene hentes på riktig format
            heat = L.heatLayer(data); // Heatmap lages ...
            isHeat = true;
            heat.addTo(map); // ... og legges til kartet
        }
    }
}

function getPoints() {
    /*
    Returnerer ny liste med punktene på formatet
    [[breddegrad, lengdegrad, intensitet], [lat, lon, int], ...]
    */
    var data = points.toGeoJSON().features;
    var heatData = [];
    for (point in data) {
        heatData.push([data[point].geometry.coordinates[1], data[point].geometry.coordinates[0], intensity]);
    }

    return heatData;
}
