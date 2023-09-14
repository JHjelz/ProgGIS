// Bestemme URL til basiskartet:
var osm_map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright"<OpenStreetMap</a> contributors'
});

// Initialiserer kartet:
var map = L.map('map', {
    layers: [osm_map], // Default basiskart
    maxZoom: 18, // Justerer zoom-nivået
    minZoom: 6,
    zoomControl: false, // Fjerner default zoom-knapper
}).setView([63.418529, 10.40284], 13)

// Legger til zoom-knapper på egnet sted
L.control.zoom({
    position:'topright'
}).addTo(map);

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