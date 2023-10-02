/*
Henter ut koordinatene fra GeoJSON-lag slik at en kan
konvertere mellom feature collections og format godtatt av turf
*/

function featureCollectionToMultiPolygon(layer) { // layer er her et GeoJSON-lag
    if (layer["type"] == "FeatureCollection") {
        var liste = [];
        var features = layer["features"]

        for (var i = 0; i < features.length; i++) {
            liste.push(features[i]["geometry"]["coordinates"]);
        }
        return liste;
    }
}