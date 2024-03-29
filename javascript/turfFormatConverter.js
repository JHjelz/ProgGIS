/*
Henter ut koordinatene fra GeoJSON-lag slik at en kan
konvertere mellom feature collections og format godtatt av turf
*/

function featureCollectionToMultiPolygon(layer) { // Funksjon som gjør om features i 'layer' til MultiPolygon istedenfor FeatureCollection
    // 'layer' er her et GeoJSON-lag
    if (layer["type"] == "FeatureCollection") {
        var coords = [];
        var features = layer["features"];

        for (var i = 0; i < features.length; i++) {
            coords.push(features[i]["geometry"]["coordinates"]);
        }
        return turf.multiPolygon(coords);
    }
}

function isMultiPolygon(layer) { // Inneholder 'layer' features som er MultiPolygon?
    var more = false;

    try { // Justerer i forhold til hvor mye innhold 'layer' har
        if (layer["features"]) {
            more = true;
        }
    } catch {}

    if (more) {
        for (var i = 0; i < layer["features"].length; i++) {
            if (layer["features"][i]["geometry"]["type"] == "MultiPolygon") {
                return true;
            }
        }
    } else {
        if (layer["geometry"]["type"] == "MultiPolygon") {
            return true;
        }
    }
    return false;
}

function multiPolygonToFeatureCollection(layer) { // Funksjon som gjør om features i 'layer' til FeatureCollection istedenfor MultiPolygon
    // 'layer' er her et GeoJSON-lag

    features = [];

    for (var i = 0; i < layer["geometry"]["coordinates"].length; i++) {
        var geometry = {
            "type": "Polygon",
            "coordinates": layer["geometry"]["coordinates"][i]
        };
        features.push(turf.feature(geometry));
    }

    return turf.featureCollection(features);
}

function fixMultiPolygons(layer) { // Annen variant som løser MultiPolygon-problemet for de ulike GIS-funksjonene
    var features = layer["features"];
    var k = features.length;
    
    for (var i = 0; i < k; i++) {
        /*
        Her itererer en gjennom alle features i FeatureCollection,
        plukker ut alle features som er registrert som MultiPolygon,
        og gjør dem om til flere Polygons
        */
        if (features[i]["geometry"]["type"] == "MultiPolygon") { // Er det MultiPolygon?
            var coord = features[i]["geometry"]["coordinates"]; // Henter geometrien til alle Polygonene
            // Oppdaterer første polygon:
            features[i]["geometry"]["type"] = "Polygon";
            features[i]["geometry"]["coordinates"] = coord[0];
            for (var j = 1; j < coord.length; j++) {
                // Lager så nye features for resten av polygonene i MultiPolygonet:
                var newFeature = {};
                for (key in features[i]) { // Vil ha de samme nøklene og deres verdier som originalen
                    if (key != "geometry") { // ... men ikke lik geometri
                        newFeature[key] = features[i][key];
                    }
                }
                newFeature["geometry"] = { // Legger til geometri
                    "type": "Polygon",
                    "coordinates": coord[j] // Henter koordinat fra original-lista
                };
                features.push(newFeature); // Legger til ny feature
            }
        }
    }

    layer["features"] = features; // Oppdaterer features-lista

    return layer;
}

/*
Håndtering av input-filer fra bruker for å få de på rett format egnet for turf-operasjoner
*/

function isInputMultiPolygon(layer) {
    // Går igjennom 'layer' (geojson-fil) og ser om det er MultiPolygons eller MultiLineStrings i den
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
    /*
    Polygon i leaflet skal følge høyrehåndsregelen.
    Ved omgjøring fra MultiPolygon til Polygon blir ikke dette riktig,
    og en er nødt til å snu om på rekkefølgen til alle koordinatene i polygonet.
    */
    var newList = [];

    for (var i = liste.length - 1; i > -1; i--) {
        newList.push(liste[i]);
    }
    
    return newList;
}

function inputMultiPolygon(layer) {
    /*
    Gjør om MultiPolygon-filer til Polygon-filer og returnerer et nytt datalag med nye features
    */
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
    /*
    Gjør om MultiLineString-filer til LineString-filer og returnerer et nytt datalag med nye features
    */
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
