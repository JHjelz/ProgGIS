function dropHandler(event) {
    console.log("File(s) dropped");

    // Unngå at filene åpnes som default:
    event.preventDefault();

    if (event.dataTransfer.items) {
        // Bruker DataTransferItemList grensesnittet for å aksessere filen(e):
        [...event.dataTransfer.items].forEach((item, i) => {
            // Hvis droppet element ikke er en fil, avvis den:
            if (item.kind === "file") {
                const file = item.getAsFile();
                console.log('... file[${i}].name =${file.name}');
            }
        });
    } else {
        // Bruk DataTransfer grensesnittet for å aksessere filen(e):
        [...event.dataTransfer.files].forEach((file, i) => {
            console.log('... file[${i}].name = ${file.name}');
        });
    }
}

function dragOverHandler(event) {
    console.log("File(s) in drop zone");

    // Unngå at filene åpnes som default:
    event.preventDefault();
}