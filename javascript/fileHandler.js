/*
Her håndteres alle filene brukeren sender inn til nettsiden før de vises i kartet, med mindre
funksjonen finner feil og kaster feilmelding.
*/

function handleFile() {
    
    // Henter input fra brukeren:

    const fileHandler = document.getElementById('fileInput');
    const selectedFile = fileHandler.files[0];
    
    if (selectedFile == null) { // Brukeren må ha valgt en faktisk fil
        return alert("No chosen file!");
    }

    // Resetter input-knappen på nettsiden:
    fileHandler.value = "";
    document.getElementById("loadButton").style.backgroundColor = "orangered";
    
    // Lager FileReader som kan lese filer:
    var read = new FileReader();
    read.readAsDataURL(selectedFile);
    
    var newLayer = L.geoJSON(null, {style: getStyle()}); // Initialiserer nytt element

    var info = null; // Info om type input-fil

    read.onloadend = function() { // Leser input-fila og behandler dataen fra output
        fetch(read.result).then(function(response) {
            return response.json();
        }).then(function(data) {
            info = isInputMultiPolygon(data);
            
            if (info[0]) { // Hvis geo-dataen inneholder MultiPolygons eller MultiLineStrings må disse endres til Polygons og LineStrings
                if (info[1] == "P") {
                    data = inputMultiPolygon(data);
                } else if (info[1] == "L") {
                    data = inputMultiLine(data);
                }
            }

            newLayer.addData(data); // Lagrer geo-dataen til leaflet-laget
        })
    }
    
    if (doLayerExist(selectedFile.name)) { // Sjekker om filen er lagt til allerede
        return alert("This layer is already added to the map!"); // ... og kaster feilmelding hvis den er det,
    } else { // ... eller legger til laget i kartet hvis det er et nytt lag
        overlayMaps[selectedFile.name] = newLayer;

        updateSidebar();
        
        handleLayer(selectedFile.name);
    }
}
