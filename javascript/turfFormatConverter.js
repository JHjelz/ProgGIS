/*
Henter ut koordinatene fra GeoJSON-lag slik at en kan
konvertere mellom feature collections og format godtatt av turf
*/

function featureCollectionToMultiPolygon(layer) { // layer er her et GeoJSON-lag
    if (layer["type"] == "FeatureCollection") {
        var coords = [];
        var features = layer["features"];

        for (var i = 0; i < features.length; i++) {
            coords.push(features[i]["geometry"]["coordinates"]);
        }
        return coords;
    }
}

/*
function multiPolygonToFeatureCollection(layer) {
    if (layer["type"] == "MultiPolygon") {
        var features = [];
        for (var i = 0; i < layer["coordinates"].length; i++) {
            var geometry = {
                "type": "Polygon",
                "coordinates": layer["geometry"][i]
            }
            coords.push(geometry);
        }
        return turf.featureCollection(features);
    }
}
*/
