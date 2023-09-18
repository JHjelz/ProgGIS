const input = document.getElementById("fileSelect");

input.addEventListener("change", handleFile(), false);

function handleFile() {
    const fileList = file.files;
    const fileName = fileList[0].name;

    document.getElementById("layers").innerHTML = fileName;

    //shp("files/pandr.zip").then(function(geojson) {
		//see bellow for whats here this internally call shp.parseZip()
	//});
}