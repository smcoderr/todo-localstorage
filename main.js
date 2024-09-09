let inputs = document.getElementById("inputs");
let button = document.getElementById("added-button");
let ul = document.getElementById("unordered-list");
let inputArray = [];

function setLocalStorage() {
  localStorage.setItem("inputToLocal", JSON.stringify(inputArray));
}

function getLocalStorage() {
  if (localStorage.getItem("inputToLocal")) {
    inputArray = JSON.parse(localStorage.getItem("inputToLocal"));
    buildUI();
  }
}

function buildUI() {
  ul.textContent = ""; // Clear the list
  inputArray.forEach((item, index) => {
    let li = document.createElement("li");
    li.style.cssText = "animation-name: slideIn";

    let spanEl = document.createElement("span");
    spanEl.innerText = item;
    li.appendChild(spanEl);

    let trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");
    trash.dataset.index = index; // Store the index for deletion
    li.appendChild(trash);

    let edit = document.createElement("i");
    edit.classList.add("fa-solid", "fa-pencil");
    edit.dataset.index = index; // Store the index for editing
    li.appendChild(edit);

    ul.appendChild(li);
  });

  inputs.value = ""; // Clear the input
  inputs.focus(); // Set focus back to input field
}

function addLi() {
  let input = inputs.value.trim(); // Trim to avoid spaces only

  if (input === "") return; // Prevent empty inputs

  inputArray.push(input);
  setLocalStorage();
  buildUI();
}

function enters(e) {
  if (e.key === "Enter") {
    button.click();
  }
}

function deleteList(e) {
  if (e.target.classList.contains("fa-trash-can")) {
    let index = e.target.dataset.index; // Get index from dataset
    inputArray.splice(index, 1); // Remove item from array
    setLocalStorage(); // Update localStorage
    buildUI(); // Rebuild UI
  }
}

function editList(e) {
  if (e.target.classList.contains("fa-pencil")) {
    let index = e.target.dataset.index; // Get index from dataset
    let newValue = prompt("Please add new text", inputArray[index]);

    if (newValue !== null && newValue.trim() !== "") {
      inputArray[index] = newValue.trim(); // Update item in array
      setLocalStorage(); // Update localStorage
      buildUI(); // Rebuild UI
    }
  }
}

button.addEventListener("click", addLi);
inputs.addEventListener("keypress", enters);
ul.addEventListener("click", deleteList);
ul.addEventListener("click", editList);

getLocalStorage(); // Initialize the list on page load
