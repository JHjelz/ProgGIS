const dialog = document.getElementById("fileInput"); // Input-feltet vi har skjult, men som lagrer dataen som velges

function clickMe() {
    dialog.click();
}

dialog.addEventListener('change', () => {
    document.getElementById("loadButton").style.backgroundColor = "green";
})
