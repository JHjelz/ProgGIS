// Punktene brukt i visningen av "kart 2":
var NTNU_points = L.geoJSON(null);

fetch("javascript/exampleData/NTNU_points.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    NTNU_points.addData(data).bindPopup(function(point) {return `<b>${point.feature.properties.category}</b><br>${point.feature.properties.name}`});
})

// Initialiserer punkt-laget:
var points = null;

var newPoint = false;

map.addEventListener('click', (event) => {
    if (newPoint) {
        onMapClick(event);
    }
})

function addPoint() {
    document.getElementById("addPointButton").style.color = "green";
    newPoint = true;

    if (points != null) {
        if (!map.hasLayer(points)) {
            showPoints();
        }
    }

    if (isTIN) {
        TIN();
    }
    if (isVoronoi) {
        voronoi();
    }
    if (isHeat) {
        heatmap();
    }
}

function onMapClick(e) {
    openBox("makeNewPointBox");
    document.getElementById("lengdegrader").value = e.latlng.lng;
    document.getElementById("breddegrader").value = e.latlng.lat;

    document.getElementById("addPointButton").style.color = "orangered";
    newPoint = false;
}

function savePoint() {
    var regex = /^[a-zA-Z_0-9]+$/;

    if (document.getElementById("pointCategory").value == "") {
        return alert("You need to choose a category!");
    } else if (!document.getElementById("pointCategory").value.match(regex)) {
        return alert("The category must consist of normal letters!");
    } else if (document.getElementById("pointName").value == "") {
        return alert("You need to choose a name!");
    } else if (!document.getElementById("pointName").value.match(regex)) {
        return alert("The name must consist of normal letters!");
    }

    var lon = document.getElementById("lengdegrader").value;
    var lat = document.getElementById("breddegrader").value;
    var category = document.getElementById("pointCategory").value;
    var name = document.getElementById("pointName").value;

    if (points == null) {
        var content = {"type": "FeatureCollection", "features": []}
        var newPoint = {"type": "Feature", "geometry": {"type": "Point", "coordinates": [lon, lat]}, "properties": {"category": category, "name": name}};
        content.features.push(newPoint);
        points = L.geoJSON(content).bindPopup(function(point) {return "<b>" + point.feature.properties.category + "</b>" + "<br>" + point.feature.properties.name});
        points.addTo(map);
        pointsExists();
    } else {
        var newPoint = {"type": "Feature", "geometry": {"type": "Point", "coordinates": [lon, lat]}, "properties": {"category": category, "name": name}};
        var content = points.toGeoJSON();
        content.features.push(newPoint);
        map.removeLayer(points);
        points = L.geoJSON(content).bindPopup(function(point) {return "<b>" + point.feature.properties.category + "</b>" + "<br>" + point.feature.properties.name});
        points.addTo(map);
    }

    document.getElementById("pointCategory").value = "";
    document.getElementById("pointName").value = "";
    closeBox("makeNewPointBox");
}

function handleDefaultPoints() {
    if (points != null) {
        if (!map.hasLayer(points)) {
            points.addTo(map);
        }
        if (map.hasLayer(points)) {
            document.getElementById("examplePoints").style.display = "inline-block";
            document.getElementById("loadPoints").style. display = "inline-block";
            document.getElementById("savePoints").style.display = "none";
            document.getElementById("fileName").style.display = "none";
            document.getElementById("save").style.display = "none";
            document.getElementById("removePoints").style.display = "none";
            
            if (isVoronoi) {
                voronoi();
            }
            if (isTIN) {
                TIN();
            }
            if (isHeat) {
                heatmap();
            }

            // Fjerner punktene:
            map.removeLayer(points);
            document.getElementById("showPoints").style.display = "none";
            document.getElementById("hidePoints").style.display = "none";
            points = null;

            closeBox('loadPointsBox')
        }
    } else {
        pointsExists();

        // Legger til alle punktene fra default-fila og setter på en popup med info-tekst:

        points = NTNU_points;

        // Legger til nye punkt-markører i kartet:
        points.addTo(map);

        closeBox('loadPointsBox')
    }
}

function loadPoints() {
    document.getElementById("fileInput2").click();
}

document.getElementById("fileInput2").addEventListener("change", () => {
    var selectedFile = document.getElementById("fileInput2").files[0];

    if (selectedFile != null) {
        document.getElementById("fileInput2").value = "";

        var read = new FileReader();
        read.readAsDataURL(selectedFile);

        var newLayer = L.geoJSON();

        read.onloadend = function() {
            fetch(read.result).then(function(response) {
                return response.json();
            }).then(function(data) {
                for (feature in data.features) {
                    if (data.features[feature].geometry.type != "Point") {
                        handleDefaultPoints();
                        return alert("The chosen file does not only contain points!");
                    }
                }
                newLayer.addData(data).bindPopup(function(point) {return "<b>" + point.feature.properties.category + "</b>" + "<br>" + point.feature.properties.name});
            })
        }
    }

    points = newLayer;
    points.addTo(map);

    pointsExists();
    closeBox('loadPointsBox');
})

function pointsExists() {
    document.getElementById("examplePoints").style.display = "none";
    document.getElementById("loadPoints").style. display = "none";
    document.getElementById("savePoints").style.display = "inline-block";
    document.getElementById("fileName").style.display = "inline-block";
    document.getElementById("save").style.display = "inline-block";
    document.getElementById("removePoints").style.display = "inline-block";
    document.getElementById("showPoints").style.display = "block";
}

function saveToFile() {
    var regex = /^[a-zA-Z_0-9]+$/;

    if (document.getElementById("fileName").value == "") {
        return alert("You need to choose a name!");
    } else if (!document.getElementById("fileName").value.match(regex)) {
        return alert("The category must consist of normal letters!");
    }
    
    var geoJSON = points.toGeoJSON();
    var fileName = document.getElementById("fileName").value;
    var file = fileName + ".geojson";
    saveAs(new File([JSON.stringify(geoJSON)], file, {
        type: "text/plain;charset=utf-8"
    }), file);

    document.getElementById("fileName").value = "";
}

function showPoints() {
    if (points != null) {
        points.addTo(map);
        document.getElementById("showPoints").style.display = "block";
        document.getElementById("hidePoints").style.display = "none";
    }
}

function hidePoints() {
    map.removeLayer(points);
    document.getElementById("showPoints").style.display = "none";
    document.getElementById("hidePoints").style.display = "block";
}
