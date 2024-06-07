//Setting up initial grid onn page loading
let gridContainer = document.querySelector("#container");
gridContainer.style.width = "768px";
gridContainer.style.height = "768px";

//Default color choice
let defaultRadio = document.querySelector("#black");
defaultRadio.checked = true;

//User color choice
function userColorChoice () {
    let userColor = document.querySelector('input[name="colorRadio"]:checked').value;
    return userColor;        
}


document.addEventListener("DOMContentLoaded", () => drawGrid(16));

//Get user input for grid size on button press
let sizeBtn = document.querySelector(".sizeButton")
sizeBtn.addEventListener("click", () => {
    let count = 0;
    while (count===0) {
        sizeInput = prompt("Please enter a grid size from 1 to 100");
        if (isNaN(sizeInput) || (sizeInput>100)) {
            sizeInput = prompt("Wrong choice!, Please enter a grid size from 1 to 100");
        }
        else count++;
    }
    drawGrid(sizeInput);
});

//Function to draw the grid as per the size provided by user or else default one
function drawGrid (boxNumber) {
    const gridBox = document.querySelector("#container");
    deleteGrid(gridBox);
    let boxSize = Math.floor(768/boxNumber)-2;
    for (i=0; i<boxNumber; i++) {
        for (j=0; j<boxNumber; j++) {
            let gridElement = document.createElement("div");
            gridElement.style.width = boxSize + "px";
            gridElement.style.height = boxSize + "px";
            gridBox.appendChild(gridElement).className="smallBox";
        }
    }   
    mouseMovement();
}

//Delete the grid before redrawing of a new one
function deleteGrid (gridParentBox) {
    while (gridParentBox.firstChild) {
        gridParentBox.removeChild(gridParentBox.firstChild);
    }
}

let opac=0;
//Mouseover color changes
function mouseMovement () {
    const gridElements = document.querySelectorAll(".smallBox");
    gridElements.forEach(box => {
        box.addEventListener("mouseover", () => {
            if(userColorChoice()==="Black") {
                box.style.backgroundColor = "black";
                box.style.opacity=opac;
                opac += 0.1;    
            }
            else if (userColorChoice()==="Erase") {
                box.style.backgroundColor = ""; 
            }
            else {
                box.style.backgroundColor = getRandomColor();
            }
        });    
    });
}

  
//Mouse click color changes
function getRandomColor() {
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    return `rgb(${r},${g},${b})`;
}

//Clearing the grid
const clearBtn = document.querySelector(".clearButton");
clearBtn.addEventListener("click", () => {
    const gridItems = document.querySelectorAll(".smallBox");
    gridItems.forEach(item => {
        item.style.backgroundColor = "";
    });
});

