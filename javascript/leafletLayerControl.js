var htmlObject = layer1.getContainer();

var a = document.getElementById("layers");

function setParent(el, newParent) {
    newParent.appendChild(el);
}

setParent(htmlObject, a);