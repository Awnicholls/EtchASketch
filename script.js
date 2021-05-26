const gridContainer = document.querySelector("#grid-container");


// On page load, set starting grid to 16
window.addEventListener("load", setDefaultGrid);

//creates a variable to store new grid size
var gridSize = document.getElementById('grid-size');

// adds event listener to create a new grid with new size
document.querySelector('form').addEventListener('submit', function (e) {

  e.preventDefault();
  changeSize(gridSize.value);
  console.log(gridSize.value);    
});

//sets default size to 16
function setDefaultGrid() {
    setGridSize(16);
    fillGrid(16);
    document.getElementsByTagName("span")[0].innerHTML = "16 x 16";

  }
  
//updates size to new value
function setGridSize(size) {
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  }

//creates grid and adds an event listener to each box
function fillGrid(size) {
    for (let i = 0; i < size * size; i++) {
      const gridElement = document.createElement("div");
      gridElement.classList = "grid-element";
      gridElement.addEventListener("mouseover", changeColor);
      gridContainer.appendChild(gridElement);
    }
  }

  //changes colour on mouseover event
  function changeColor(e) {
    e.target.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }


//empties grid
function clearGrid() {
    const gridArray = Array.from(gridContainer.childNodes);
    gridArray.forEach((element) => {
      gridContainer.removeChild(element);
    });
}
//clears the grid of any changes and then runs functions to change size and create
function changeSize(gridNumber) {
    let newSize = gridNumber;
    newSize = parseInt(newSize);
    clearGrid();
    setGridSize(newSize);
    fillGrid(newSize);
    document.getElementsByTagName("span")[0].innerHTML = parseInt(newSize) + " x " + parseInt(newSize);
    console.log(newSize);
}