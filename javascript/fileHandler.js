function handleFile() {
  input = document.getElementById("fileInput");
  if (!input.files[0]) {
    alert("Please select a file before clicking 'Load'.")
  }
  else {
    file = input.files[0];
    fr = new FileReader();

    arrayBuffer = fr.readAsArrayBuffer(file);

    //document.getElementById("layers").innerHTML = arrayBuffer.type;

    var shpfile = new L.Shapefile(arrayBuffer, {
			onEachFeature: function(feature, layer) {
				if (feature.properties) {
					layer.bindPopup(Object.keys(feature.properties).map(function(k) {
						return k + ": " + feature.properties[k];
					}).join("<br />"), {
						maxHeight: 200
					});
				}
			}
		});

		shpfile.addTo(map);
		
    shpfile.once("data:loaded", function() {
			alert("Finished loaded shapefile 8)");
		});

    /*fr.onload = receiveBinary;
    fr.readAsArrayBuffer(file);*/
  }
  function receiveBinary() {
    result = fr.result;
    var shpfile = new L.Shapefile(result);
    shpfile.addTo(map);
  }
}
