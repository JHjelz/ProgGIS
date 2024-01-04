// Legger inn de ulike tekstene her:

var general = "<b>General information</b><br>Welcome to ProgGIS!<br>This is a webpage where you can play around with GIS functions and get to know how they work on geographic data.<br>Just remember the fact that if you <b>refresh</b> the website you also <b>reset</b> all the data layers!";
var pin = "<b>Pins and diagram functions</b><br>If you press the pin-map button down to the left you restyle the webpage to a new map that handles point markers. On this page you can work with markers and see how TIN and voronoi diagrams are build. It is also possible to make heatmaps with the buttons in the header.<br>You can hide the markers by pressing the eye symbol down to the left.<br>Going back and forth to this map has no effect on the map layers on the other map. On the other hand, your point data, will unfortunately be deleted if you do not save it to a file first (see next page).";
var pinFiles = "<b>Loading points</b><br>The webpage is provided with some default points. Press the plus button down to the left and a box appears. There are two possible options in this window: (1) import the default points, or (2) import your own file. Only one file can be added.<br>When the file is loaded, the points will appear in the map. Now, the same plus symbol will open a box where you can save your points locally to file or just remove the points and get back to start.<br>If you want your own points, press the other, not filled pin button and it will become green. You can now press a location in the map, and a new box pops up. Here you choose category and name to the point, and press 'Save point'. The new point will then be added to the map.";
var layer = "<b>Map layers</b><br>Press the plus button down to the left to open the sidebar where you can see all the data layers on the map.<br>From here there are two choices: (1) add your own data, or (2) add some pre-defined data to the map.<br>You can turn on and off each layer with their buttons and the visibility will be shown with color. The layers can be deleted by pressing the trash can next to the layer. If you want to change the color of the layer you can press the palette and a color palette appears.";
var userLayer = "<b>Adding your own layers</b><br>If you want to add your own data you need geographical information stored on geojson file format. Here is a method to get such files for data from Norway:<br>Go to <b>geonorge.no</b> and download the datasets that you want in <b>SOSI format</b>. Then use <b>Sosi2Shape</b> to convert the datasets from SOSI to <b>shape</b>. Then you can open the shapefiles in <b>QGIS</b> and export the layers as <b>geojson files</b>. Here it is necessary that you set the <b>CRS</b> to latitude and longditude with <b>CRS: 4326</b>. Just remember to set the <b>original</b> reference system in QGIS first.<br>Once this is done you are ready to send it into ProgGIS!<br> Press the 'new layer'-button which opens the file explorer and select the desired file so that the button becomes green. Now you can press the '+'-button and the layer will be added to the map.";
var buffer = "<b>Buffer</b><br>This function marks an area around a layer with a given distance.<br>You need to choose a layer to make the buffer around, set the buffer distance and choose a name for the new buffer.<br>All values must pass the validation before the buffer is made.<br>If you want to merge overlapping features, press the checkbox for dissolve.<br>The buffer is made when you press 'Make buffer'.";
var difference = "<b>Difference</b><br>With this function can you erase areas of one layer from another layer.<br>First you choose the layer you want to remove areas from. Then you choose the layer with the areas that are going to be deleted from the first one.<br>When you have chosen the two layers and given the new layer a valid name, you can press 'Make difference'.";
var dissolve = "<b>Dissolve</b><br>If you want to merge overlapping features in a layer to a bigger, common feature you can use this method.<br>The two things you have to do here is to choose the layer you will dissolve and give a valid layer name. When that is done, you can press 'Dissolve'.";
var extract = "<b>Extract</b><br>With this function you can extract one type of feature from a layer into a new, separate layer.<br>First you choose the layer you want to extract features from. Then you choose which attribute you want to filter on, and last but not least the value the features must have on the given attribute.<br>Then you set a valid layer name and press 'Extract'.";
var intersection = "<b>Intersection</b><br>This function makes a new layer that contains the overlapping areas of the input layers - the intersection.<br>Choose the two layers you want to intersect, and give a valid layer name. Then you press 'Intersect'.";
var suitability = "<b>Suitability</b><br>The suitability function makes a list of prioritized map layers covering suitable areas depending on other data layers prioritized by the user.<br>Before you use this function you need all the map layers you will use in the analyze. Here it is important to know that this method only count map layers as positive. If there are some areas that absolutely need to be avoided, they must be excluded from all map layers in the input with difference before the analyse starts.<br>Next, you press the pluss sign so that you have enough input fields corresponding to the number of map layers. If you get too many, it is possible to delete elements by pressing the trash cans. You prioritize the layers by setting the most important one in the first field, and the less important further under.<br>When all the layers are added, you choose a valid category name and press 'Calculate suitable areas'.";
var union = "<b>Union</b><br>With this method you make a new layer that contains all the areas that the two input layers cover - the union.<br>Choose the two layers you want to make an union of, and give a valid layer name before you press 'Make union'.";

var tutorial = [general, pin, pinFiles, layer, userLayer, buffer, difference, dissolve, extract, intersection, suitability, union];

// Teller som holder styr på hvilken side en er på
var page = 0;

function start() {
    document.getElementById("tutorial").innerHTML = tutorial[page]; // Setter tekst til tekstboksen i tutlorial-boksen når den åpnes
}

// Funksjoner som justerer innholdet i tutorial-boksen avhengig av hvilken side en er på

function nextPage() {
    page++;
    if (page == tutorial.length) {
        page = 0;
    }
    setPage();
    document.getElementById("tutorial").innerHTML = tutorial[page];
}

function previousPage() {
    page--;
    if (page == -1) {
        page = tutorial.length - 1;
    }
    setPage();
    document.getElementById("tutorial").innerHTML = tutorial[page];
}

function setPage() { // Justerer sidetallet
    document.getElementById("page").innerHTML = (page + 1).toString() + " / " + tutorial.length.toString();
}
