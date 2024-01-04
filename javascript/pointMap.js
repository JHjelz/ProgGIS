// Punktene brukt i visningen av "kart 2":
var NTNU_points = L.geoJSON(null); // Default-punkt

fetch("javascript/exampleData/NTNU_points.geojson").then(function(response) { // Leser default-punktene fra fil
    return response.json();
}).then(function(data) {
    NTNU_points.addData(data).bindPopup(function(point) {return `<b>${point.feature.properties.category}</b><br>${point.feature.properties.name}`});
})

// Initialiserer punkt-laget:
var points = null;

var newPoint = false;

map.addEventListener('click', (event) => {
    if (newPoint) {
        /*
        Hvis en har trykket at en vil lage et nytt punkt (newPoint = true),
        aktiveres det funksjonalitet for å trykke i og interagere med kartet
        */
        onMapClick(event);
    }
})

function addPoint() { // Legge til nye punkt
    document.getElementById("addPointButton").style.color = "green"; // Endrer farge på knappen for å vise at det er klart
    newPoint = true;

    if (points != null) {
        if (!map.hasLayer(points)) {
            showPoints(); // Må vise punktene som er lagd (hvis det er noen) når en skal lage et nytt
        }
    }

    // Skal ikke vise andre kartlag:
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

function onMapClick(e) { // Håndterer interaksjon i kartet for å lage nye punkt på spesifisert sted
    openBox("makeNewPointBox"); // Åpner boks for lagring av nytt punkt
    document.getElementById("lengdegrader").value = e.latlng.lng;
    document.getElementById("breddegrader").value = e.latlng.lat;

    // Resetter muligheten for å lage flere nye punkt:
    document.getElementById("addPointButton").style.color = "orangered";
    newPoint = false;
}

function savePoint() { // Lagrer det nye punktet

    // Sjekk av faktisk og gyldig input:

    var regex = /^[a-zA-Z_0-9]+$/;

    if (document.getElementById("pointCategory").value == "") { // Brukeren får tilbakemelding på hva som ikke fungerer / er feil
        return alert("You need to choose a category!");
    } else if (!document.getElementById("pointCategory").value.match(regex)) {
        return alert("The category must consist of normal letters!");
    } else if (document.getElementById("pointName").value == "") {
        return alert("You need to choose a name!");
    } else if (!document.getElementById("pointName").value.match(regex)) {
        return alert("The name must consist of normal letters!");
    }

    // Henter input fra brukeren:
    var lon = document.getElementById("lengdegrader").value;
    var lat = document.getElementById("breddegrader").value;
    var category = document.getElementById("pointCategory").value;
    var name = document.getElementById("pointName").value;

    if (points == null) { // Hvis det ikke eksisterer punkt fra før
        var content = {"type": "FeatureCollection", "features": []} // Lager ny FeatureCollection
        var newPoint = {"type": "Feature", "geometry": {"type": "Point", "coordinates": [lon, lat]}, "properties": {"category": category, "name": name}}; // Lager nytt Feature
        content.features.push(newPoint); // Legger Feature i FeatureCollection
        // Lager punkt-laget og setter opp popup-info på samtlige:
        points = L.geoJSON(content).bindPopup(function(point) {return "<b>" + point.feature.properties.category + "</b>" + "<br>" + point.feature.properties.name});
        points.addTo(map); // Legger til i kartet
        pointsExists(); // Sier ifra om at det finnes punkt i kartet
    } else {
        var newPoint = {"type": "Feature", "geometry": {"type": "Point", "coordinates": [lon, lat]}, "properties": {"category": category, "name": name}}; // Lager nytt Feature
        var content = points.toGeoJSON(); // Henter nåværende punkt på GeoJSON-format
        content.features.push(newPoint); // Legger til Features i FeatureCollection sin feature-liste
        map.removeLayer(points); // Fjerner punktlaget fra kartet
        // Lager punktlaget på nytt med nytt punkt og popup-info på alle:
        points = L.geoJSON(content).bindPopup(function(point) {return "<b>" + point.feature.properties.category + "</b>" + "<br>" + point.feature.properties.name});
        points.addTo(map); // Legger til punktene i kartet igjen
    }

    // Resetter input og lukker boksen:
    document.getElementById("pointCategory").value = "";
    document.getElementById("pointName").value = "";
    closeBox("makeNewPointBox");
}

function handleDefaultPoints() {
    /*
    Funksjon som legger til default-punktene om det ikke eksisterer noen punkt fra før,
    eller fjerner de punktene som er lagt til i kartet hvis noen
    */

    if (points != null) { // Hvis det eksisterer punkt i punktlaget
        if (!map.hasLayer(points)) { // ... gjøres de synlige om de ikke er vist i kartet
            points.addTo(map);
        }
        if (map.hasLayer(points)) { // Hvis punktene er vist i kartet
            // Siden gjøres om til å ikke vise punkt:
            document.getElementById("examplePoints").style.display = "inline-block";
            document.getElementById("loadPoints").style. display = "inline-block";
            document.getElementById("savePoints").style.display = "none";
            document.getElementById("fileName").style.display = "none";
            document.getElementById("save").style.display = "none";
            document.getElementById("removePoints").style.display = "none";
            
            // Eventuelle lag skjules:
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
    } else { // Hvis punktlaget er tomt
        pointsExists(); // Sier ifra til sida om at det er punkt i kartet

        // Legger til alle punktene fra default-fila og setter på en popup med info-tekst:

        points = NTNU_points;

        // Legger til nye punkt-markører i kartet:
        points.addTo(map);

        closeBox('loadPointsBox')
    }
}

function loadPoints() { // Funksjon som gjør det mulig å åpne filutforsker og hente en fil
    document.getElementById("fileInput2").click();
}

document.getElementById("fileInput2").addEventListener("change", () => {

    /*
    Hvis en fil velges ved å benytte loadPoints() vil denne funksjonen sørge for at filen leses og punktene vises
    */

    var selectedFile = document.getElementById("fileInput2").files[0]; // Henter fila

    if (selectedFile != null) { // Det må være valgt en fil
        document.getElementById("fileInput2").value = "";

        // Leser fila:
        var read = new FileReader();
        read.readAsDataURL(selectedFile);

        var newLayer = L.geoJSON(); // Initialiserer nytt kartlag

        read.onloadend = function() { // Leser  fila
            fetch(read.result).then(function(response) {
                return response.json();
            }).then(function(data) {
                for (feature in data.features) {
                    if (data.features[feature].geometry.type != "Point") { // Sjekker at det kun er punkt i den aktuelle fila
                        handleDefaultPoints();
                        return alert("The chosen file does not only contain points!");
                    }
                }
                // Nytt lag med punkt i tillegg til en tilhørende popup for hvert punkt:
                newLayer.addData(data).bindPopup(function(point) {return "<b>" + point.feature.properties.category + "</b>" + "<br>" + point.feature.properties.name});
            })
        }
    }

    // De nye punktene legges til i kartet:
    points = newLayer;
    points.addTo(map);

    pointsExists();
    closeBox('loadPointsBox');
})

function pointsExists() {
    // Funksjon som forteller nettsida at det eksisterer punkt som kan bli vist i kartet
    document.getElementById("examplePoints").style.display = "none";
    document.getElementById("loadPoints").style. display = "none";
    document.getElementById("savePoints").style.display = "inline-block";
    document.getElementById("fileName").style.display = "inline-block";
    document.getElementById("save").style.display = "inline-block";
    document.getElementById("removePoints").style.display = "inline-block";
    document.getElementById("showPoints").style.display = "block";
}

function saveToFile() { // Lagrer eksisterende punkt til fil som lastes ned lokalt på egen PC

    // Sjekker faktisk og gyldig input:

    var regex = /^[a-zA-Z_0-9]+$/;

    if (document.getElementById("fileName").value == "") { // Bruker får tilbakemelding om hva som ikke fungerer / er feil
        return alert("You need to choose a name!");
    } else if (!document.getElementById("fileName").value.match(regex)) {
        return alert("The category must consist of normal letters!");
    }
    
    var geoJSON = points.toGeoJSON(); // Henter punktene i GeoJSON-format
    var fileName = document.getElementById("fileName").value;
    var file = fileName + ".geojson";
    saveAs(new File([JSON.stringify(geoJSON)], file, { // Lagrer fila
        type: "text/plain;charset=utf-8"
    }), file);

    document.getElementById("fileName").value = ""; // Resetter input
}

// Funksjonalitet for å vise og skjule punkt, og endre ikoner deretter:

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
