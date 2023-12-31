// Punktene brukt i visningen av "kart 2":
var NTNU_points_2 = {
    "type": "FeatureCollection",
    "features": [
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4044907, 63.4173049]}, "properties": {"category": "Universitet", "name": "NTNU Gløshaugen"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4696324, 63.4079572]}, "properties": {"category": "Universitet", "name": "NTNU Dragvoll"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.388918, 63.4203714]}, "properties": {"category": "Universitet", "name": "NTNU Øya"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4347967, 63.4235678]}, "properties": {"category": "Universitet", "name": "NTNU Tyholt"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4143153, 63.433756]}, "properties": {"category": "Universitet", "name": "NTNU Solsiden"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4336351, 63.4138729]}, "properties": {"category": "Universitet", "name": "NTNU Moholt"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4032871, 63.4340888]}, "properties": {"category": "Universitet", "name": "NTNU Olavskvartalet"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4071882, 63.4107064]}, "properties": {"category": "Universitet", "name": "NTNU Lerkendal og Valgrinda"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3861107, 63.4288662]}, "properties": {"category": "Universitet", "name": "NTNU Kalvskinnet"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4540302, 63.4473022]}, "properties": {"category": "Universitet", "name": "NTNU Ringve"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3483128, 63.4415347]}, "properties": {"category": "Universitet", "name": "NTNU Heggdalen"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4492127, 63.4521411]}, "properties": {"category": "Universitet", "name": "NTNU Østmarka"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3981586, 63.4373727]}, "properties": {"category": "Universitet", "name": "NTNU Brattørkaia"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3992594, 63.4152944]}, "properties": {"category": "Universitet", "name": "NTNU Elgeseter"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4837531, 63.4393659]}, "properties": {"category": "Universitet", "name": "NTNU Rotvoll"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4660445, 63.42338]}, "properties": {"category": "Universitet", "name": "NTNU Tunga"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4176387, 63.4141732]}, "properties": {"category": "Studentby", "name": "Berg Studentby"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4301549, 63.4110984]}, "properties": {"category": "Studentby", "name": "Moholt Studentby"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4372857, 63.3989126]}, "properties": {"category": "Studentby", "name": "Steinan Studentby"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3918823, 63.420511]}, "properties": {"category": "Studentby", "name": "Bloksberg Studentby"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4382451, 63.4116778]}, "properties": {"category": "Studentby", "name": "Karinelund Studentby"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4945864, 63.4211031]}, "properties": {"category": "Studentby", "name": "Jakobsliveien 55"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.396918, 63.4226982]}, "properties": {"category": "Studentby", "name": "Klostergata 18"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3963873, 63.4227505]}, "properties": {"category": "Studentby", "name": "Klostergata 20"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3891634, 63.4232409]}, "properties": {"category": "Studentby", "name": "Klostergata 56"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4126211, 63.4147073]}, "properties": {"category": "Studentby", "name": "Nedre Berg Studentby"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3973319, 63.418334]}, "properties": {"category": "Studentby", "name": "Magnus den godes gate 2"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4037983, 63.4215247]}, "properties": {"category": "Studentby", "name": "Nedre Singsakerslette"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3890993, 63.4276236]}, "properties": {"category": "Studentby", "name": "Sverresgate 8"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4122453, 63.4337663]}, "properties": {"category": "Studentby", "name": "Nedre elvehavn Studentby"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.3982518, 63.4163341]}, "properties": {"category": "Studentby", "name": "Teknobyen Studentboliger"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10.4003657, 63.4117822]}, "properties": {"category": "Studentby", "name": "Lerkendal Studentby"}}
    ]
};

var NTNU_points = L.geoJSON(null);

fetch("javascript/exampleData/Arealdekke_klippa.geojson").then(function(response) {
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

        //points = L.geoJSON(NTNU_points_2).bindPopup(function(point) {return `<b>${point.feature.properties.category}</b><br>${point.feature.properties.name}`});
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
