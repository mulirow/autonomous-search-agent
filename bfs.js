class BreadthFirstSearch extends Search{
    constructor(terrainCosts){
        super(terrainCosts);
        this.queue = [];
    }

    bfs(startRow, startCol, target) {
        this.visited[startRow][startCol] = true;
        this.queue.push([startRow, startCol]);
        let agentPath = [[startRow, startCol]];
        let searchPath = [];
        searchPath.push([startRow, startCol, this.matrix[startRow][startCol]]);

        while (this.queue.length > 0) {
            let current = this.queue.shift();
            let row = current[0];
            let col = current[1];
            
            if (row == target[0] && col == target[1]) {
                this.queue = [];
                return [searchPath, agentPath];
            }

            let neighbors = this.getNeighbors(row, col);
            this.neighborsList.push(neighbors);
                    
            for (let i = 0; i < neighbors.length; i++) {
                let neighborRow = neighbors[i][0];
                let neighborCol = neighbors[i][1];

                if (!this.visited[neighborRow][neighborCol]) {
                    this.visited[neighborRow][neighborCol] = true;
                    
                    this.queue.push([neighborRow, neighborCol]);
                    searchPath.push([neighborRow, neighborCol, this.matrix[neighborRow][neighborCol]]);
                    agentPath.push([neighborRow, neighborCol]);
                }
            }
        }
    }

    setPath(startPoint, endPoint){
        for (let i = 0; i < this.matrix.length; i++) {
            this.visited[i] = [];
            for (let j = 0; j < this.matrix[i].length; j++) {
                this.visited[i][j] = false;
            }
        }

        this.agentPath = [];
        this.searchPath = [];
        this.neighborsList = [];
        let res = this.bfs(startPoint[0], startPoint[1], endPoint, []);
        this.searchPath = res[0];
        this.agentPath = res[1];
    }
}