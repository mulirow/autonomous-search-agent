class BreadthFirstSearch extends Search{
    constructor(terrainCosts){
        super(terrainCosts);
        this.queue = [];
        this.parents = [];
    }

    bfs(startRow, startCol, target) {
        this.visited[startRow][startCol] = true;
        this.queue.push([startRow, startCol]);
        this.searchPath.push([startRow, startCol]);
        let found = false;

        while (this.queue.length > 0) {
            let current = this.queue.shift();
            let row = current[0];
            let col = current[1];

            if (row == target[0] && col == target[1]) {
                found = true;
                break;
            }

            let neighbors = this.getNeighbors(row, col);
            this.neighborsList.push(neighbors);

            for (let i = 0; i < neighbors.length; i++) {
                let neighborRow = neighbors[i][0];
                let neighborCol = neighbors[i][1];

                if (!this.visited[neighborRow][neighborCol]) {
                    this.visited[neighborRow][neighborCol] = true;

                    this.queue.push([neighborRow, neighborCol]);
                    this.searchPath.push([neighborRow, neighborCol]);
                    this.parents[neighborRow][neighborCol] = [row, col];
                }
            }
        }

        if(!found){
            return null;
        }

        let optimalPath = [];
        let current = [target[0], target[1], this.matrix[target[0]][target[1]]];
        optimalPath.push(current);
        while(current[0] !== startRow || current[1] !== startCol) {
            current = this.parents[current[0]][current[1]];
            optimalPath.unshift([current[0], current[1], this.matrix[current[0]][current[1]]]);
        }
        console.log('a');
        console.log(optimalPath);
        return optimalPath;
    }

    setPath(startPoint, endPoint){
        for (let i = 0; i < this.matrix.length; i++) {
            this.parents[i] = [];
            this.visited[i] = [];
            for (let j = 0; j < this.matrix[i].length; j++) {
                this.visited[i][j] = false;
                this.parents[i][j] = null;
            }
        }

        this.movesMade = 0;
        this.agentPath = [];
        this.searchPath = [];
        this.neighborsList = [];
        this.queue = [];
        this.agentPath = this.bfs(startPoint[0], startPoint[1], endPoint);
    }
}