// Define the size of the grid
let numRows = 25;
let numCols = 25;
let cellSize = 20;

// Define the colors for each type of terrain
let terrainColors = [
  [69, 69, 69], // Fucking void
  [120, 180, 110], // Forest
  [250, 227, 173],   // Desert
  [170, 220, 223]   // Ocean
];

// Create a 2D array to store the terrain types for each cell
let terrainTypes = [];

function setup() {
  createCanvas(numCols * cellSize, numRows * cellSize);
  
  // Initialize the terrain types for each cell randomly
  for (let row = 0; row < numRows; row++) {
    terrainTypes[row] = [];
    for (let col = 0; col < numCols; col++) {
      terrainTypes[row][col] = floor(random(terrainColors.length));
    }
  }
  
  // Randomly select the starting and ending positions within the grid
  let startRow, startCol, endRow, endCol;
  do {
    startRow = floor(random(numRows));
    startCol = floor(random(numCols));
  } while (terrainColors[terrainTypes[startRow][startCol]] == terrainColors[0]);
  
  do {
    endRow = floor(random(numRows));
    endCol = floor(random(numCols));
  } while (terrainColors[terrainTypes[endRow][endCol]] == terrainColors[0]);
  
  // Draw the grid and the starting and ending positions
  drawGrid(startRow, startCol, endRow, endCol);
}

function drawGrid(startRow, startCol, endRow, endCol) {
  // Draw each cell with its corresponding color
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let terrainType = terrainTypes[row][col]
      fill(terrainColors[terrainType]);
      rect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
  
  // Draw the starting and ending positions
  fill(255, 0, 0);
  rect(startCol * cellSize, startRow * cellSize, cellSize, cellSize);
  fill(0, 0, 255);
  rect(endCol * cellSize, endRow * cellSize, cellSize, cellSize);
}
