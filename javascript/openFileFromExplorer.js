const clickOpen = document.getElementById("clickOpen"); // Knappen vi gir funksjonalitet
const dialog = document.getElementById("dialog"); // Input-feltet vi har skjult, men som lagrer dataen som velges

function clickMe() {
    dialog.click();
}

dialog.addEventListener("input", () => {
    if (dialog.files.length) {
        for (i = 0; i < dialog.files.length; i++) {
            document.getElementById("layers").innerHTML = dialog.files[i].name;
        }
    }
});

var geo = L.geoJson({features:[]}, {
    onEachFeature: function popUp(f, l) {
    var out = [];
    if (f.properties){
    for(var key in f.properties){
        out.push(key + ": " + f.properties[key]);
    }
    l.bindPopup(out.join("<br />"));
    }
}
}).addTo(map);
  
var base = 'vann.zip';

shp(base).then(function(data){
    geo.addData(data);
});
