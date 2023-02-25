class Grid {
    constructor(rows, cols, size, colors) {
        // Define the size of the grid
        this.numRows = rows;
        this.numCols = cols;
        this.cellSize = size;

        // Define the colors for each type of terrain
        this.terrainColors = colors;

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
            for (let col = 0; col < this.numCols; col++) {
                this.terrain[row][col] = floor(noise(xoff) * this.terrainColors.length);
                xoff += noiseStep;
            }
        }

        // Randomly select the starting and ending positions within the grid
        let startRow, startCol, endRow, endCol;
        do {
            startRow = floor(noise(xoff) * this.numRows);
            xoff += noiseStep;
            startCol = floor(noise(xoff) * this.numCols);
            xoff += noiseStep;
        } while (this.terrainColors[this.terrain[startRow][startCol]] == this.terrainColors[0]);

        do {
            endRow = floor(noise(xoff) * this.numRows);
            xoff += noiseStep;
            endCol = floor(noise(xoff) * this.numCols);
            xoff += noiseStep;
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
                rect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
            }
        }

        // Draw the starting and ending positions
        fill(255, 0, 0);
        rect(this.startPoint[0] * this.cellSize, this.startPoint[1] * this.cellSize, this.cellSize, this.cellSize);
        fill(0, 0, 255);
        rect(this.endPoint[0] * this.cellSize, this.endPoint[1] * this.cellSize, this.cellSize, this.cellSize);
    }
}