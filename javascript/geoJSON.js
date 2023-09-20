var rectangle = [{
    "type": "Feature",
    "properties": {"name": "Gløshaugen"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [10.403787, 63.420031],
            [10.410954, 63.414691],
            [10.404863, 63.414188],
            [10.398170, 63.418901],
            [10.403787, 63.420031]
        ]]
    }
}];

var geoLayer = L.geoJSON().addTo(map);

geoLayer.addData(rectangle);
