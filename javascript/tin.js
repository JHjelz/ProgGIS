// Variabler:

var isTIN = false // Vises TIN'et i kartet?

// Selve TIN'et:
var TINPolygons = turf.tin(NTNU_points.toGeoJSON());
var TINGeoJSON = L.geoJSON(TINPolygons, {style: {"color": "orangered"}});

// Funksjon for å slå av og på TIN'et:
function TIN() {
    if (isTIN) {
        map.removeLayer(TINGeoJSON);
        isTIN = false;
    } else {
        TINGeoJSON.addTo(map);
        isTIN = true;
    }
}
