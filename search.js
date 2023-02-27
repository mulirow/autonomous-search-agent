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
                    if(this.neighborsList[i][j][0] == this.searchPath[0][0] && this.neighborsList[i][j][1] == this.searchPath[0][1]) continue;
                    if(this.neighborsList[i][j][0] == this.agentPath[this.agentPath.length-1][0] && this.neighborsList[i][j][1] == this.agentPath[this.agentPath.length-1][1]) continue;
                    rect(this.neighborsList[i][j][0] * cellSize + cellSize / 2, this.neighborsList[i][j][1] * cellSize + cellSize / 2, cellSize / 8, cellSize / 8);
                }
            }
        }
        for(let i = 1; (i < this.searchPath.length) && (i < this.movesMade); i++) {
            if(this.searchPath[i][0] == this.agentPath[this.agentPath.length-1][0] && this.searchPath[i][1] == this.agentPath[this.agentPath.length-1][1]){
                stroke(0, 0, 0);
                strokeWeight(1);
                triangle(this.agentPath[this.agentPath.length-1][0] * cellSize + cellSize / 2, this.agentPath[this.agentPath.length-1][1] * cellSize,
                         this.agentPath[this.agentPath.length-1][0] * cellSize + cellSize , this.agentPath[this.agentPath.length-1][1] * cellSize + cellSize * 3/4,
                         this.agentPath[this.agentPath.length-1][0] * cellSize, this.agentPath[this.agentPath.length-1][1] * cellSize + cellSize * 3/4);
                noStroke();
                continue;
            }
            rect(this.searchPath[i][0] * cellSize + cellSize / 2, this.searchPath[i][1] * cellSize + cellSize / 2, cellSize / 4, cellSize / 4);
        }
        pop();
        if(this.movesMade == this.searchPath.length) return 1;
        return 0;
    }

    displayOptPath(cellSize){
        push();
        fill(0, 0, 0);
        rectMode(RADIUS);
        this.movesMade += 1;
        for(let i = 1; (i < this.agentPath.length - 1) && (i < this.movesMade); i++) {
            circle(this.agentPath[i][0] * cellSize + cellSize / 2, this.agentPath[i][1] * cellSize + cellSize / 2, 12);
        }
        pop();
        if(this.movesMade == this.agentPath.length) return 1;
        return 0;
    }
}