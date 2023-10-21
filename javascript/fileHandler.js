function handleFile() {
    
    const fileHandler = document.getElementById('fileInput');
    const selectedFile = fileHandler.files[0];
    
    if (selectedFile == null) {
        return alert("No chosen file!")
    }

    //console.log(selectedFile); // Printer bare selve filen til loggen

    fileHandler.value = "";
    document.getElementById("loadButton").style.backgroundColor = "orangered";
    
    var read = new FileReader();
    read.readAsDataURL(selectedFile);
    
    var newLayer = L.geoJSON(null, {style: getStyle()})

    read.onloadend = function() {
        fetch(read.result).then(function(response) {
            return response.json();
        }).then(function(data) {
            newLayer.addData(data);
        })
    }

    overlayMaps[selectedFile.name] = newLayer;
    updateSidebar();
    handleLayer(selectedFile.name);
}
