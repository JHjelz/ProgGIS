// Variabler:

var isVoronoi = false; // Vises voronoi-diagrammet i kartet?

var voronoiPolygons = null;
var voronoiGeoJSON = null;

function voronoi() {  // Skrur av og på voronoi-diagrammet i kartet
    if (points != null) {
        if (isVoronoi && voronoiGeoJSON != null) {
            map.removeLayer(voronoiGeoJSON)
            isVoronoi = false;
        } else {

            // Avgrensning for voronoi-diagrammet

            var [minlon, minlat, maxlon, maxlat] = findMinMax();

            var options = {
                bbox: [minlon, minlat, maxlon, maxlat]
            };

            // Selve voronoi-diagrammet:
            voronoiPolygons = turf.voronoi(points.toGeoJSON(), options);
            voronoiGeoJSON = L.geoJSON(voronoiPolygons, {style: {"color": "orange"}});

            voronoiGeoJSON.addTo(map);
            isVoronoi = true;
        }
    }
}

function findMinMax() {
    var [minlon, minlat, maxlon, maxlat] = [99, 99, -99, -99];
    
    for (feature in points.toGeoJSON().features) {
        if (points.toGeoJSON().features[feature].geometry.coordinates[0] < minlon) {
            minlon = points.toGeoJSON().features[feature].geometry.coordinates[0];
        }
        if (points.toGeoJSON().features[feature].geometry.coordinates[0] > maxlon) {
            maxlon = points.toGeoJSON().features[feature].geometry.coordinates[0];
        }
        if (points.toGeoJSON().features[feature].geometry.coordinates[1] < minlat) {
            minlat = points.toGeoJSON().features[feature].geometry.coordinates[1];
        }
        if (points.toGeoJSON().features[feature].geometry.coordinates[1] > maxlat) {
            maxlat = points.toGeoJSON().features[feature].geometry.coordinates[1];
        }
    }
    return [minlon - 0.5, minlat - 0.5, maxlon + 0.5, maxlat + 0.5];
}
