// *** SELECT ITEMS ***

const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");


// Edit options

let editElement;
let editFlag = false;
let editID = "";

// *** EVENT LISTENERS ***

// submit form

form.addEventListener("submit", addItem);

// Clear items

clearBtn.addEventListener("click", clearItems);

// Load items

window.addEventListener("DOMContentLoaded", setupItems);


// *** Functions ***

function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
        createListItem(id, value)

            // display alert

            displayAlert("item added to the list", "success");

            // show container

            container.classList.add("show-container");

            // add to local storage

            addToLocalStorage(id,value);

            // Set back to default

            setBackToDefault();
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert("value changed", "succes");

        // Edit local storage

        editLocalStorage(editID, value);
        setBackToDefault()
    } else {
        displayAlert("please enter value", "danger");
    }
}

// Display alert

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // Remove alert
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    },1000)
}

// Clear items

function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();

    localStorage.removeItem("list");
}
// Delete function

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert("item removed", "danger");
    setBackToDefault();
}

// Edit item

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;

    // set edit item

    editElement = e.currentTarget.parentElement.previousElementSibling;

    // Set form value

    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}

// Set back to default

function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}

// ** LOCAL STORAGE **

function addToLocalStorage(id,value) {
    const grocery = { id, value };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage (id) {
    let items = getLocalStorage();

    items = items.filter(function(item) {
        if (item, id !== id) {
            return item
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function (item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    })
}
function getLocalStorage() {
    return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list")):[];
}

// *** Setup Items ***

function setupItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(function(item){
            createListItem(item.id, item.value)
        })
        container.classList.add("show-container")
    }
}

function createListItem(id,value) {
    const element = document.createElement("article");

    // add class

    element.classList.add("grocery-item");

    // add id

    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title title-dark">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
              </button>
              <button type="button" class="delete-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>
            </div>`;
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    // append child

    list.appendChild(element);
}

// Script for change color mode

// Pass Event Object
function changeMode(event) {
    // Event.target always points to what user clicked, hovered over, changed etc,
    const clicked = event.target;
    // Reference body.all
    const all = document.querySelector('.all');

    // If the clicked tag has .mode class...
    if (clicked.matches('.mode')) {
        // Toggle .fa-sun, .btn-outline-dark, ,btn-outline-light, and .fa-moon on button.mode
        clicked.classList.toggle('fa-moon');
        clicked.classList.toggle('btn-outline-dark');
        clicked.classList.toggle('fa-sun');
        clicked.classList.toggle('btn-outline-light');
        // Toggle .darkMode and .lightMode on body.all
        all.classList.toggle('darkMode');
        all.classList.toggle('lightMode');
        all.classList.toggle('dark-mode');
        all.classList.toggle('dark-mode-title');
        all.classList.toggle('title-dark');
        all.classList.toggle('submit-btn-dark');
    }
    return false;
}

// Reference button.mode
const mode = document.querySelector(".mode");

// Register button.mode to the click event
mode.addEventListener("click", changeMode);