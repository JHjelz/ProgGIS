// Funksjonalitet for å få opp filutforskeren hvor en henter brukerens input-filer

const dialog = document.getElementById("fileInput"); // Input-feltet vi har skjult, men som lagrer dataen som velges

function clickMe() { // Funksjonen som åpner filutforskeren
    dialog.click();
}

dialog.addEventListener('change', () => {
    // EventListner som endrer farge på html-knappen når en fil er valgt
    document.getElementById("loadButton").style.backgroundColor = "green";
})
