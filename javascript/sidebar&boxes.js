var boolskNav = false; /* boolsk verdi som forteller om en sidebar er åpen foran kartet */
var boolskBox = false; /* boolsk verdi som forteller om en boks er åpen foran kartet */
var box = null; /* Streng som forteller hvilken boks-id som er åpen */

/* Set the width of the sidebar to 25vw */
function openNav() {
    if (boolskBox) {
        closeBox(box);
    }
    document.getElementById("dataLayers").style.width = "25vw";
    boolskNav = true;
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("dataLayers").style.width = "0vw";
    boolskNav = false;
}

function openBox(id) {
    if (boolskBox) {
        closeBox(box)
    }
    if (boolskNav) {
        closeNav();
    }
    document.getElementById(String(id)).style.width = "40vw";
    document.getElementById(String(id)).style.height = "40vh";
    document.getElementById(String(id)).style.borderWidth = "20px";
    boolskBox = true;
    box = id;
    deactivateMap();
}

function closeBox(id) {
    document.getElementById(String(id)).style.width = "0vw";
    document.getElementById(String(id)).style.height = "0vh";
    document.getElementById(String(id)).style.borderWidth = "0px";
    boolskBox = false;
    box = null;
    activateMap();
}