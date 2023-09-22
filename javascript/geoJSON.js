var layer1 = L.geoJSON().addTo(map);
var layer2 = L.geoJSON().addTo(map);

fetch("javascript/exampleData/Universities.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    layer1.addData(data);
})

fetch("javascript/exampleData/TrainingCenters.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    layer2.addData(data);
})

document.getElementById("layers").innerHTML += layer1.name + "<br>";
document.getElementById("layers").innerHTML += layer2.name;

// Hvordan slå av og på et lag:

/*
map.on('click', function() {
    if(map.hasLayer(layer1)) {
      map.removeLayer(layer1);
    } else {
      map.addLayer(layer1);
    }
  });
*/
