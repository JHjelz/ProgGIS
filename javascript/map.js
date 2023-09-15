// Initialiserer kartet:
var map = L.map('map', {
    maxZoom: 18, // Justerer zoom-nivået
    minZoom: 6,
    zoomControl: false, // Fjerner default zoom-knapper
}).setView([63.418529, 10.40284], 13)

// Bestemme URL til basiskartet:
var osm_map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright"<OpenStreetMap</a> contributors'
});

// Google Map layer:

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        subdomains:['mt0','mt1','mt2','mt3']
});

osm_map.addTo(map);
googleSat.addTo(map);

// Legger til zoom-knapper på egnet sted
L.control.zoom({
    position:'topright'
}).addTo(map);

// Layer control:

var baselayers = {
    "OpenStreetMap": osm_map,
    "Satellite": googleSat
}

L.control.layers(baselayers).addTo(map)

/* Activate and deactivate interactions in the leaflet map*/

function deactivateMap() {
    map._handlers.forEach(function(handler) {
        handler.disable();
    });
}

function activateMap() {
    map._handlers.forEach(function(handler) {
        handler.enable();
    });
}