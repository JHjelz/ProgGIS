// Test-data jeg tester funksjonalitet på:
// Det fungerer ikke å lese fra fil ved å kun kjøre html-filen lokalt

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

var test1 = L.geoJSON(U, {style: getStyle()});
var test2 = L.geoJSON(TC, {style: getStyle()});

//addMapLayer(test1, U);
//addMapLayer(test2, TC);
//test1.addData(U);
//test2.addData(TC);

// Det jeg skal ha med i ferdig versjon:

var Arealdekke = L.geoJSON(null, {style: getStyle()});
var Bygg_f = L.geoJSON(null, {style: getStyle()});
var Bygg_l = L.geoJSON(null, {style: getStyle()});
var Samferdsel = L.geoJSON(null, {style: getStyle()});

fetch("javascript/exampleData/Arealdekke_klippa.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    Arealdekke.addData(data);
})

fetch("javascript/exampleData/Bygg&Anlegg_f_klippa.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    Bygg_f.addData(data);
})

fetch("javascript/exampleData/Bygg&Anlegg_l_klippa.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    Bygg_l.addData(data);
})

fetch("javascript/exampleData/Samferdsel_klippa.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    Samferdsel.addData(data);
})
