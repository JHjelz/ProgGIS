function handleFile() {
    
    const fileHandler = document.getElementById('fileInput');
    const selectedFile = fileHandler.files[0];
    
    if (selectedFile == null) {
        return alert("No chosen file!");
    }

    fileHandler.value = "";
    document.getElementById("loadButton").style.backgroundColor = "orangered";
    
    var read = new FileReader();
    read.readAsDataURL(selectedFile);
    
    var newLayer = L.geoJSON(null, {style: getStyle()});

    var info = null;

    read.onloadend = function() {
        fetch(read.result).then(function(response) {
            return response.json();
        }).then(function(data) {
            info = isInputMultiPolygon(data);
            
            if (info[0]) {
                if (info[1] == "P") {
                    data = inputMultiPolygon(data);
                } else if (info[1] == "L") {
                    data = inputMultiLine(data);
                }
            }

            console.log(JSON.stringify(data));

            //newLayer.addData(data);
        })
    }
    /*
    overlayMaps[selectedFile.name] = newLayer;

    updateSidebar();
    
    handleLayer(selectedFile.name);
    */
}
