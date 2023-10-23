// Det jeg skal ha med i ferdig versjon:

/*
Det fungerer ikke å lese fra fil ved å kun kjøre html-filen lokalt
Har derfor brukt litt eksempeldata fra koden
*/

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
