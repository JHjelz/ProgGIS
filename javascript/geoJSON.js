/*
var U = {
  "type": "FeatureCollection",
  "properties": {"name": "Universities"},
  "features": [
      {
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
      }, {
          "type": "Feature",
          "properties": {"name": "Dragvoll"},
          "geometry": {
              "type": "Polygon",
              "coordinates": [[
                  [10.467217, 63.409471],
                  [10.471829, 63.408921],
                  [10.47094, 63.406668],
                  [10.466968 , 63.407128],
                  [10.467217, 63.409471]
              ]]
          }
      }
  ]
};

var TC = {
  "type": "FeatureCollection",
  "properties" : {"name": "Training centers"},
  "features": [
      {
          "type": "Feature",
          "properties": {"name": "SIT Gløshaugen"},
          "geometry": {
              "type": "Polygon",
              "coordinates": [[
                  [10.403855, 63.421078],
                  [10.404845, 63.421427],
                  [10.40556, 63.421042],
                  [10.404572, 63.420705],
                  [10.403855, 63.421078]
              ]]
          }
      }, {
          "type": "Feature",
          "properties": {"name": "SIT Dragvoll"},
          "geometry": {
              "type": "Polygon",
              "coordinates": [[
                  [10.474145, 63.407263],
                  [10.475657, 63.407148],
                  [10.475491, 63.406157],
                  [10.473766, 63.406265],
                  [10.474145, 63.407263]
              ]]
          }
      }
  ]
};

var layer1 = L.geoJSON(U);
var layer2 = L.geoJSON(TC);
*/

layer_Arealdekke = L.geoJSON().addTo(map);
layer_Bygg_f = L.geoJSON().addTo(map);
layer_Bygg_l = L.geoJSON().addTo(map);
layer_Samferdsel = L.geoJSON().addTo(map);

/*
fetch("javascript/exampleData/Universities.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    layer.addData(data);
})

fetch("javascript/exampleData/TrainingCenters.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    layer.addData(data);
})
*/

fetch("javascript/exampleData/Arealdekke_klippa.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    layer_Arealdekke.addData(data);
})

fetch("javascript/exampleData/Bygg&Anlegg_f_klippa.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    layer_Bygg_f.addData(data);
})

fetch("javascript/exampleData/Bygg&Anlegg_l_klippa.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    layer_Bygg_l.addData(data);
})

fetch("javascript/exampleData/Samferdsel_klippa.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    layer_Samferdsel.addData(data);
})

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
