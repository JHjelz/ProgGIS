function addPrioritizedLayer() {
    var newPriority = document.createElement("div");
    var numb = document.getElementById("priorityDiv").childElementCount + 1;
    var start =`<div id="div${numb}" style="display: flex; flex-grow: 2; flex-direction: row; justify-content: center; margin-top: 1vh;">`;
    var newSelect = `<select id="priority${numb.toString()}"></select>`;
    var newButton = `<svg onclick="removePrioritizedLayer(${numb})" style="cursor: pointer; margin-left: 1vw;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"> <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/> </svg>`;
    var end = '</div>'
    newPriority.innerHTML = start + newSelect + newButton + end;

    document.getElementById("priorityDiv").appendChild(newPriority);
    fillSelect("priority" + numb.toString());
}

function removePrioritizedLayer(numb) {
    var count = document.getElementById("priorityDiv").childElementCount;
    if (numb == count) {
        document.getElementById("priorityDiv").removeChild(document.getElementById("div" + numb.toString()).parentElement);
    } else {
        for (var i=numb; i<count; i++) {
            document.getElementById("priority" + i.toString()).value = document.getElementById("priority" + (i+1).toString()).value;
        }
        document.getElementById("priorityDiv").removeChild(document.getElementById("div" + count.toString()).parentElement);
    }
}

function suitability() {

}