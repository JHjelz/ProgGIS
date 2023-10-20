function handleFile() {
    
    const fileHandler = document.getElementById('fileInput');
    const selectedFile = fileHandler.files[0];
    
    if (selectedFile == null) {
        return alert("No chosen file!")
    }

    console.log(selectedFile);
    
    var fr = new FileReader();
    fileHandler.value = "";
    document.getElementById("loadButton").style.backgroundColor = "orangered";
    
    /*
    fr.onload = function() {
        var layer = omnivore.geojson(fr.result).addTo(map);
        map.fitBounds(layer.getBounds())
    }

    fr.readAsDataURL(selectedFile);

    console.log("Kanskje bra...")
    */

    //console.log(data)
}
