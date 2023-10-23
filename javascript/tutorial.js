// Legger inn de ulike tekstene her:

var general = "<b>General information</b><br>Welcome to ProgGIS!<br>Here you can play around with GIS functions and get to know how they works on geographic data.<br>Just remember the fact that if you <b>refresh</b> the website you also <b>reset</b> all the data layers!";
var pin = "<b>Pins and diagram functions</b><br>If you press the pin-map button down to the left you restyle the webpage to a new map with some default pins. This is just an example page where you can see how voronoi and TIN diagrams look like.<br>You can go back and forth to this map without loosing information on the other map.";
var layer = "<b>Map layers</b><br>Press the plus button down to the left to open the sidebar where you can see all the data layers on the map.<br>Here you have two choices: You can add your own data, or you can add some pre-defined data to the map.<br>Once the layers are added you cannot delete them without resetting the whole website.<br>You can turn on and off each layer with their buttons and the visibility will be shown with color.";
var userLayer = "<b>Adding your own layers</b><br>If you want to add your own data you need geographical information stored on geojson file format. Here is a method to get such files for data from Norway:<br>Go to <b>geonorge.no</b> and download the datasets that you want in <b>SOSI format</b>. Then use <b>Sosi2Shape</b> to convert the datasets from SOSI to <b>shape</b>. Then you can open the shapefiles in <b>QGIS</b> and export the layers as <b>geojson files</b>. Here it is necessary that you set the <b>CRS</b> to latitude and longditude with <b>CRS: 4326</b>. Just remember to set the <b>original</b> reference system in QGIS first.<br>Once this is done you are ready to send it into ProgGIS!<br> Press the 'new layer'-button which opens the file explorer and select the desired file so that the button becomes green. Now you can press the '+'-button and the layer will be added to the map.";
var buffer = "<b>Buffer</b><br>Here you mark an area around a layer with a given distance.<br>You need to choose a layer you want to make the buffer around, set the buffer distance and choose a name for the new buffer.<br>All values must pass the validation before the buffer is made.<br>If you want to merge overlapping features, press the checkbox for dissolve.<br>The buffer is made when you press 'Make buffer'.";
var difference = "<b>Difference</b><br>Here you erase the area of one layer from another layer.<br>First do you choose the layer you want to remove areas from. Then you choose the layer with the areas that are going to be deleted from the first one.<br>When you have chosen the two layers and given a valid layer name, you can press 'Make difference'.";
var dissolve = "<b>Dissolve</b><br>Here you merge overlapping features in a layer to a bigger, common feature.<br>The two things you have to do here is to chose the layer you will dissolve and give a valid layer name. When that is done, you can press 'Dissolve'.";
var extract = "<b>Extract</b><br>Here you extract one type of features from a layer into a new, separate layer.<br>First you choose the layer you want to extract features from. Then you choose which attribute you want to filter on, and last but not least the value the features must have on the given attribute.<br>Then you can set a valid layer name and press 'Extract'.";
var intersection = "<b>Intersection</b><br>Here you make a new layer that contains the overlapping areas of the input layers - the intersection.<br>Choose the two layers you want to intersect, and give a valid layer name. Then you can press 'Intersect'.";
var union = "<b>Union</b><br>Here you make a new layer that contains all the areas that the two input layers cover - the union.<br>Choose the two layers you want to make an union of, and give a valid layer name. Then you can press 'Make union'.";

var tutorial = [general, pin, layer, userLayer, buffer, difference, dissolve, extract, intersection, union];

// Teller som holder styr på hvilken side en er på
var page = 0;

document.getElementById("tutorial").innerHTML = tutorial[page]; // Setter tekst til tekstboksen i tutlorial-boksen

// Funksjoner som justerer innholdet i tutorial-boksen avhengig av hvilken side en er på

function nextPage() {
    page++;
    if (page == tutorial.length) {
        page = 0;
    }
    document.getElementById("tutorial").innerHTML = tutorial[page];
}

function previousPage() {
    page--;
    if (page == -1) {
        page = tutorial.length - 1;
    }
    document.getElementById("tutorial").innerHTML = tutorial[page];
}