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

/*
Håndtering av input-filer fra bruker for å få de på rett format egnet for turf-operasjoner
*/

function isInputMultiPolygon(layer) {
    liste = layer["features"];
    for (var i = 0; i < liste.length; i++) {
        if (liste[i]["geometry"]["type"] == "MultiPolygon") {
            return [true, "P"];
        } else if (liste[i]["geometry"]["type"] == "MultiLineString") {
            return [true, "L"];
        }
    }
    return [false, null];
}

function turnList(liste) {
    /*var more = false;
    try {
        var test = liste[0][0][0];
        if (test != null) {
            more = true;
        }
    } catch {

        more = false;
    }

    if (more) {
        var newList = [];
        console.log("JA")
        for (var i = 0; i < layer.length; i++) {
            newList.push(turnList(liste[i]));
        }
    } else {*/
    var newList = [];

    for (var i = liste.length - 1; i > -1; i--) {
        newList.push(liste[i]);
    }
    //}

    return newList;
}

function inputMultiPolygon(layer) {
    liste = layer["features"];
    k = liste.length;

    for (var i = 0; i < k; i++) {
        if (liste[i]["geometry"]["coordinates"].length == 1) {
            liste[i]["geometry"]["type"] = "Polygon";
            liste[i]["geometry"]["coordinates"] = [turnList(liste[i]["geometry"]["coordinates"][0][0])];
        }
        else if (liste[i]["geometry"]["coordinates"].length > 1) {
            var coordinates = liste[i]["geometry"]["coordinates"];
            liste[i]["geometry"]["type"] = "Polygon";
            liste[i]["geometry"]["coordinates"] = [turnList(coordinates[0][0])];
            for (var j = 1; j < coordinates.length; j++) {
                newElement = {"type": liste[i]["type"], "properties": liste[i]["properties"], "geometry": {"type": "Polygon", "coordinates": [turnList(coordinates[j][0])]}};
                liste.push(newElement);
            }
        }
    }

    layer["features"] = liste;

    return layer;
}

function inputMultiLine(layer) {
    liste = layer["features"];
    k = liste.length;

    for (var i = 0; i < k; i++) {
        if (liste[i]["geometry"]["coordinates"].length == 1) {
            liste[i]["geometry"]["type"] = "LineString";
            liste[i]["geometry"]["coordinates"] = liste[i]["geometry"]["coordinates"][0];
        }
        else if (liste[i]["geometry"]["coordinates"].length > 1) {
            var coordinates = liste[i]["geometry"]["coordinates"];
            liste[i]["geometry"]["type"] = "LineString";
            liste[i]["geometry"]["coordinates"] = coordinates[0];
            for (var j = 1; j < coordinates.length; j++) {
                newElement = {"type": liste[i]["type"], "properties": liste[i]["properties"], "geometry": {"type": "LineString", "coordinates": coordinates[j]}};
                liste.push(newElement);
            }
        }
    }

    layer["features"] = liste;

    return layer;
}
