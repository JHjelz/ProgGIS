// Variabler:

var isVoronoi = false; // Vises voronoi-diagrammet i kartet?

// Avgrensning for voronoi-diagrammet
var options = {
    bbox: [10.3175248, 63.3911153, 10.5242766, 63.4570029]
};

// Selve voronoi-diagrammet:
var voronoiPolygons = turf.voronoi(NTNU_points.toGeoJSON(), options);
var voronoiGeoJSON = L.geoJSON(voronoiPolygons, {style: {"color": "orange"}});

function voronoi() {  // Skrur av og på voronoi-diagrammet i kartet
    if (isVoronoi) {
        map.removeLayer(voronoiGeoJSON)
        isVoronoi = false;
    } else {
        voronoiGeoJSON.addTo(map);
        isVoronoi = true;
    }
}
