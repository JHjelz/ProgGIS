const clickOpen = document.getElementById("clickOpen"); // Knappen vi gir funksjonalitet
const dialog = document.getElementById("dialog"); // Input-feltet vi har skjult, men som lagrer dataen som velges

function clickMe() {
    dialog.click();
}

dialog.addEventListener("input", () => {
    if (dialog.files.length) {
        let text = dialog.files[0].name;
        document.getElementById("layers").innerHTML = text;
    }
});