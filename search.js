class Search {
    constructor(terrainCosts) {
        this.visited = [];
        this.matrix = terrainCosts;
        this.searchPath = [];
        this.agentPath = [];
        this.neighborsList = [];
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

    display(){
        push();
        noStroke();
        fill(200, 0, 200);
        rectMode(RADIUS);
        for(let i = 0; i < this.movesMade.length; i++) {
            for(let j = 0; j < neighborsList[i].length; j++) {
                rect(neighborsList[i][j][0] * cellSize + cellSize / 2, neighborsList[i][j][1] * cellSize + cellSize / 2, cellSize / 8, cellSize / 8);
            }
        }
        stroke(255);
        strokeWeight(2);
        fill(180, 0, 128);
        for(let i = 0; i < this.movesMade.length; i++) {
            rect(this.movesMade[i][0], this.movesMade[i][1], this.r, this.r);
        }
        pop();
    }
}