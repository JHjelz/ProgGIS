var isHeat = false;

var intensity = 100;
var heat = null;

function heatmap() {
    if (points != null) {
        if (isHeat && heat != null) {
            map.removeLayer(heat);
            isHeat = false;
        } else {
            var data = getPoints();
            heat = L.heatLayer(data);
            isHeat = true;
            heat.addTo(map);
        }
    }
}

function getPoints() {
    var data = points.toGeoJSON().features;
    var heatData = [];
    for (point in data) {
        heatData.push([data[point].geometry.coordinates[1], data[point].geometry.coordinates[0], intensity]);
    }

    return heatData;
}
