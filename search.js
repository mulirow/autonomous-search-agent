class Search {
    constructor(terrainCosts) {
        this.visited = [];
        this.matrix = terrainCosts;
        this.searchPath = [];
        this.agentPath = [];
        this.neighborsList = [];
        this.movesMade = 0;
    }

    getNeighbors(row, col) {
        let neighbors = [];
        if (row > 0 && this.matrix[row - 1][col] != -1) {
            neighbors.push([row - 1, col]);
        }
        if (col < this.matrix[0].length - 1 && this.matrix[row][col + 1] != -1) {
            neighbors.push([row, col + 1]);
        }
        if (row < this.matrix.length - 1 && this.matrix[row + 1][col] != -1) {
            neighbors.push([row + 1, col]);
        }
        if (col > 0 && this.matrix[row][col - 1] != -1) {
            neighbors.push([row, col - 1]);
        }
        return neighbors;
    }

    display(cellSize){
        push();
        noStroke();
        fill(200, 0, 200);
        rectMode(RADIUS);
        this.movesMade += 1;
        for(let i = 0; (i < this.searchPath.length) && (i < this.movesMade); i++) {
            if(this.neighborsList[i]){
                for(let j = 0; j < this.neighborsList[i].length; j++) {
                    rect(this.neighborsList[i][j][0] * cellSize + cellSize / 2, this.neighborsList[i][j][1] * cellSize + cellSize / 2, cellSize / 8, cellSize / 8);
                }
            }
        }
        stroke(255);
        strokeWeight(2);
        fill(180, 0, 128);
        for(let i = 0; (i < this.searchPath.length) && (i < this.movesMade); i++) {
            rect(this.searchPath[i][0] * cellSize + cellSize / 2, this.searchPath[i][1] * cellSize + cellSize / 2, 6, 6);
        }
        pop();
    }
}