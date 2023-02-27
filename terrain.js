class Grid {
    constructor(rows, cols, size, colors, costs) {
        // Define the size of the grid
        this.numRows = rows;
        this.numCols = cols;
        this.cellSize = size;

        // Define the color and cost for each type of terrain
        this.terrainColors = colors;
        this.terrainCosts = [];

        // Create a 2D array to store the terrain types for each cell
        this.terrain = [];

        // Define the starting and ending positions within the grid
        this.startPoint = new Array(2);
        this.endPoint = new Array(2);

        createCanvas(this.numCols * this.cellSize, this.numRows * this.cellSize);

        let xoff = 0.0, noiseStep = 0.3;
        // Initialize the terrain types for each cell randomly
        for (let row = 0; row < this.numRows; row++) {
            this.terrain[row] = [];
        }
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                this.terrain[col][row] = floor(noise(xoff) * this.terrainColors.length);
                xoff += noiseStep;
            }
        }

        // Initialize the terrain costs for each cell according to the terrain type
        this.terrainCosts = this.terrain.map(row => row.map(val => {
            switch (val) {
              case 0:
                return costs[0];
              case 1:
                return costs[1];
              case 2:
                return costs[2];
              case 3:
                return costs[3];
              default:
                return null;
            }
          }));

        // Randomly select the starting and ending positions within the grid
        let startRow, startCol, endRow, endCol;
        do {
            startRow = floor(random(this.numRows));
            startCol = floor(random(this.numCols));
        } while (this.terrainColors[this.terrain[startRow][startCol]] == this.terrainColors[0]);

        do {
            endRow = floor(random(this.numRows));
            endCol = floor(random(this.numCols));
        } while (this.terrainColors[this.terrain[endRow][endCol]] == this.terrainColors[0]);

        this.startPoint = [startRow, startCol];
        this.endPoint = [endRow, endCol];
    }

    display() {
        // Draw each cell with its corresponding color
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                let terrainType = this.terrain[row][col]
                fill(this.terrainColors[terrainType]);
                rect(row * this.cellSize, col * this.cellSize, this.cellSize, this.cellSize);
            }
        }

        // Draw the starting and ending positions
        fill(0, 0, 255);
        triangle(this.startPoint[0] * this.cellSize + this.cellSize / 2, this.startPoint[1] * this.cellSize,
                 this.startPoint[0] * this.cellSize + this.cellSize , this.startPoint[1] * this.cellSize + this.cellSize * 3/4,
                 this.startPoint[0] * this.cellSize, this.startPoint[1] * this.cellSize + this.cellSize * 3/4);
        // rect(this.startPoint[0] * this.cellSize, this.startPoint[1] * this.cellSize, this.cellSize, this.cellSize);
        fill(255, 0, 0);
        triangle(this.endPoint[0] * this.cellSize + this.cellSize / 2, this.endPoint[1] * this.cellSize,
        this.endPoint[0] * this.cellSize + this.cellSize , this.endPoint[1] * this.cellSize + this.cellSize * 3/4,
        this.endPoint[0] * this.cellSize, this.endPoint[1] * this.cellSize + this.cellSize * 3/4);
    }
}