/*
Kode hentet fra: https://github.com/ducduy10k/Read-data-from-file---Mapbox/blob/main/index.js
*/

function handleReadFile() {
  let file = document.getElementById("fileSelect").files[0];
  if (file) {
    let ext = getExtension(file.name);
    switch (ext) {
      case "zip":
        document.getElementById("layers").innerHTML = "Ja";
        readDataFromShpZipFile(file);
        break;
      default:
        alert("Invalid file ");
    }
  }
}

function getExtension(filename) {
  var parts = filename.split(".");
  return parts[parts.length - 1];
}

document.getElementById("fileSelect").addEventListener("change", handleReadFile());

function readDataFromShpZipFile(file) {
  const reader = new FileReader();
  //document.getElementById("layers").innerHTML = "Ja";
  reader.onload = (event) => {
    shp(reader.result).then(function (fc) {
      if (fc.features.length > 0) {
        onHightLight(fc);
      }
    });
  };
  reader.readAsArrayBuffer(file);
}

function onHightLight(data) {
  clearLayerFeature();
  map.addSource("source-hightlight", {
    type: "geojson",
    data: data,
  });
  map.addLayer({
    id: "layer-hightlight",
    type: "line",
    source: "source-hightlight",
    layout: {},
    paint: {
      "line-color": "red",
      "line-width": 2,
    },
  });
}

function clearLayerFeature() {
  if (map.getLayer("layer-hightlight")) {
    map.removeLayer("layer-hightlight");
    map.removeSource("source-hightlight");
  }
}