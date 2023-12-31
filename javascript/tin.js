// Variabler:

var isTIN = false // Vises TIN'et i kartet?

var TINPolygons = null;
var TINGeoJSON = null;

// Funksjon for å slå av og på TIN'et:
function TIN() {
    if (points != null) {
        if (isTIN && TINGeoJSON != null) {
            map.removeLayer(TINGeoJSON);
            isTIN = false;
        } else {
            // Selve TIN'et:
            TINPolygons = turf.tin(points.toGeoJSON());
            TINGeoJSON = L.geoJSON(TINPolygons, {style: {"color": "orangered"}});

            TINGeoJSON.addTo(map);
            isTIN = true;
        }
    }
}
