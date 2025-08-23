let cols = 20;
let rows = 40;
// let cols = 3;
// let rows = 4;

/* Number Number -> Array */
function make2DArray(cols, rows) {
  let arr = new Array(cols);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

/* Array -> Array */
function fillTheArray(grid) {
  let len = grid.length;
  let wid = grid[0].length;
  let arr = [];

  for (let i = 0; i < len; i++) {
    arr[i] = [];
    for (let j = 0; j < wid; j++) {
      arr[i][j] = Math.floor(Math.random() * 2);
    }
  }
  return arr;
}

/* Setup DOM */
function elt(name, attrs, ...children) {
  let dom = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }
  return dom;
}

function drawTable(grid) {
  const container = document.getElementById("grid");

  // Clear the existing grid
  container.innerHTML = "";

  let table = elt("table", { border: "1" });
  grid.forEach((row) => {
    let trow = elt("tr", {});

    row.forEach((element) => {
      let cell = elt("td", {}, document.createTextNode(element));
      trow.appendChild(cell);
    });
    table.appendChild(trow);
  });

  // Append the new table to the container
  container.appendChild(table);
}

/* CONWAY */

// (x, y) coordinates of a cell
function countNeighbors(grid, x, y) {
  let count = 0;
  const height = grid[0].length;
  const width = grid.length;

  for (let y1 = Math.max(0, y - 1); y1 <= Math.min(height - 1, y + 1); y1++) {
    for (let x1 = Math.max(0, x - 1); x1 <= Math.min(width - 1, x + 1); x1++) {
      if ((x1 !== x || y1 !== y) && grid[x1][y1] === 1) {
        count++;
      }
    }
  }
  return count;
}

function nextGeneration(grid) {
  const height = grid[0].length;
  const width = grid.length;
  let newGrid = make2DArray(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let neighbors = countNeighbors(grid, x, y);
      if (neighbors < 2 || neighbors > 3) {
        newGrid[x][y] = 0;
      } else if (neighbors == 2) {
        newGrid[x][y] = grid[x][y];
      } else {
        newGrid[x][y] = 1;
      }
    }
  }
  return newGrid;
}

/* Print */

let GRID = fillTheArray(make2DArray(cols, rows));
drawTable(GRID);

function turn() {
  GRID = nextGeneration(GRID); // Update GRID globally
  drawTable(GRID); // Redraw the table
}

document.getElementById("next").addEventListener("click", turn);

let running = null;
document.getElementById("run").addEventListener("click", () => {
  if (running) {
    clearInterval(running);
    running = null;
  } else {
    running = setInterval(turn, 400);
  }
});
