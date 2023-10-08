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
        return turf.multiPolygon(coords);
    }
}

function isMultiPolygon(layer) {
    if (layer["geometry"]["type"] == "MultiPolygon") {
        return true;
    }
    return false;
}

function multiPolygonToFeatureCollection(layer) {
    var features = [];
    for (var i = 0; i < layer["geometry"]["coordinates"].length; i++) {
        var geometry = {
            "type": "Polygon",
            "coordinates": layer["geometry"]["coordinates"][i]
        };
        features.push(turf.feature(geometry));
    }
    return turf.featureCollection(features);
}
