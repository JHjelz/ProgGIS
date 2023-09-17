const clickOpen = document.getElementById("clickOpen"); // Knappen vi gir funksjonalitet
const dialog = document.getElementById("dialog"); // Input-feltet vi har skjult, men som lagrer dataen som velges

function clickMe() {
    dialog.click();
}

dialog.addEventListener("input", () => {
    if (dialog.files.length) {
        for (i = 0; i < dialog.files.length; i++) {
            var file = shp(dialog.files[i].name);
            L.geoJSON().addData(file).addTo(map);
            document.getElementById("layers").innerHTML += "Hei!";
        }
    }
});
