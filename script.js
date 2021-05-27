const gridContainer = document.querySelector("#grid-container");
const colorButtons = document.querySelectorAll('.color-choice');
colorButtons.forEach(colorButton => colorButton.addEventListener('click', changeColor));


var color = "black";

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
    gridElement.addEventListener("mouseover", colorGrid);
    gridContainer.appendChild(gridElement);
  }
}
//changes colour
function colorGrid() {
  switch (color) {
    case 'rainbow':
      this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      break;
    case 'gray':
      if (this.style.backgroundColor.match(/rgba/)) {
        let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
        if (currentOpacity <= 0.9) {
          this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
          this.classList.remove('grid-element');
          this.classList.add('gray');
        }
      } else if (this.classList == 'gray' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
        return;
      } else {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
      }
      break;
    case 'eraser':
      this.style.backgroundColor = '#ffffff';
      break;
    case 'black':
      this.style.backgroundColor = '#000000';
      break;
    default:
      this.style.backgroundColor = color;
      break;
  }
}

//changes colour on mouseover event
function changeColor(e) {
  switch (e.target.dataset.color) {
    case 'rainbow':
      color = 'rainbow';
      break;
    case 'gray':
      color = 'gray';
      break;
    case 'eraser':
      color = 'eraser';
      break;
    default:
      color = 'black';
      break;
  }
}

//empties grid
function clearGrid() {
  const gridArray = Array.from(gridContainer.childNodes);
  gridArray.forEach((element) => {
    gridContainer.removeChild(element);
  });
}
//functions to check input is a number and then create new grid of selected size
function changeSize(gridNumber) {
  let newSize = gridNumber;
  if (newSize !== null) {
    newSize = parseInt(newSize);
    if (Number.isNaN(newSize)) {
      changeSize(16);
    } else {
      clearGrid();
      setGridSize(newSize);
      fillGrid(newSize);
      document.getElementsByTagName("span")[0].innerHTML = parseInt(newSize) + " x " + parseInt(newSize);
      console.log(newSize);
    }
  }
}

