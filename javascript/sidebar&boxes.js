var boolskNav = false; // boolsk verdi som forteller om en sidebar er åpen foran kartet
var boolskBox = false; // boolsk verdi som forteller om en boks er åpen foran kartet
var box = null; // Streng som forteller hvilken boks-id som er åpen

// Setter bredden til sidebaren til 25 vw
function openNav() {
    if (boolskBox) { // Om en boks er åpen må den lukkes først
        closeBox(box);
    }
    document.getElementById("dataLayers").style.width = "25vw";
    boolskNav = true;
}

// Setter bredden til sidebaren til 0 og left margin til sidens innhold til 0
function closeNav() {
    document.getElementById("dataLayers").style.width = "0vw";
    boolskNav = false;
}

function openBox(id) { // Åpner aktuell boks (id)
    if (boolskBox) { // Om en annen boks er åpen, må den lukkes først
        closeBox(box);
    }
    if (boolskNav) { // Sidebaren må også lukkes
        closeNav();
    }

    // Fyller aktuell select med alternativ avhengig av hvilken boks en åpner:
    if (id == "bufferBox") {
        fillSelect("bufferSelect");
    } else if (id == "differenceBox") {
        fillDoubleSelect("differenceSelect");
    } else if (id == "dissolveBox") {
        fillSelect("dissolveSelect");
    } else if (id == "extractBox") {
        fillSelect("extractSelect");
    } else if (id == "intersectionBox") {
        fillDoubleSelect("intersectionSelect");
    } else if (id == "unionBox") {
        fillDoubleSelect("unionSelect");
    }
    
    document.getElementById(String(id)).style.width = "40vw";
    document.getElementById(String(id)).style.height = "40vh";
    document.getElementById(String(id)).style.borderWidth = "20px";
    boolskBox = true; // Forteller at en boks er åpen
    box = id; // ... og hvilken boks
    deactivateMap(); // Deaktiverer funksjonalitet i kartet mens en boks er åpen
}

function closeBox(id) { // Lukker aktuell boks og justerer siden motsatt av hva openBox gjør
    document.getElementById(String(id)).style.width = "0vw";
    document.getElementById(String(id)).style.height = "0vh";
    document.getElementById(String(id)).style.borderWidth = "0px";
    boolskBox = false;
    box = null;
    activateMap();
}

// Fyller select i de ulike boksene med alternativ:

function isPolygon(layer) {
    var objects = layer["features"];
    console.log(objects);
    for (object in objects) {
        if (object["geometry"]["type"] == "Polygon") {
            return true;
        }
    }
    return false;
}

function fillSelect(id) {
    var select = document.getElementById(id);
    select.innerHTML = "";
    select.add(new Option(text="- - -"));
    
    for (key in overlayMaps) {
        if (id == "bufferSelect" || id == "extractSelect") {
            select.add(new Option(text = key, value = key));
        }
        else if (isPolygon(overlayMaps[key])) {
            select.add(new Option(text = key, value = key));
        }
    }
}

function fillDoubleSelect(id) {
    var select1 = document.getElementById(id + "_1");
    var select2 = document.getElementById(id + "_2");
    select1.innerHTML = "";
    select2.innerHTML = "";
    select1.add(new Option(text="- - -"));
    select2.add(new Option(text="- - -"));

    for (key in overlayMaps) {
        select1.add(new Option(text = key, value = key));
        select2.add(new Option(text = key, value = key));
    }
}
