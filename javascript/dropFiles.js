function dropHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...event.dataTransfer.items].forEach((item, i) => {
          // If dropped items aren't files, reject them
          if (item.kind === "file") {
            const file = item.getAsFile();
            let layer = file.name;
            document.getElementById("layers").innerHTML = layer;
            console.log(`… file[${i}].name = ${file.name}`);
          }
        });
    } else {
        // Use DataTransfer interface to access the file(s)
        [...event.dataTransfer.files].forEach((file, i) => {
            let layer = file.name;
            document.getElementById("layers").innerHTML = layer;
            console.log(`… file[${i}].name = ${file.name}`);
        });
    }
}

function dragOverHandler(event) {
    event.preventDefault();
    event.stopPropagation();
}