class DepthFirstSearch extends Search {
    constructor(terrainCosts) {
        super(terrainCosts);
    }

    dfs(row, col, target, searchPath) {
        this.visited[row][col] = true;
        searchPath.push([row, col, this.matrix[row][col]]);

        if (row == target[0] && col == target[1]) {
            return searchPath;
        }

        let neighbors = this.getNeighbors(row, col);
        this.neighborsList.push(neighbors);

        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            if (!this.visited[neighbor[0]][neighbor[1]]) {
                searchPath = this.dfs(neighbor[0], neighbor[1], target, searchPath);
                
                if (searchPath[searchPath.length-1][0] == target[0] && searchPath[searchPath.length-1][1] == target[1]) {
                    return searchPath;
                }
            }
        }

        return searchPath;
    }

    setPath(startPoint, endPoint) {
        for (let i = 0; i < this.matrix.length; i++) {
            this.visited[i] = [];
            for (let j = 0; j < this.matrix[i].length; j++) {
                this.visited[i][j] = false;
            }
        }

        this.searchPath = [];
        this.neighborsList = [];
        this.searchPath = this.dfs(startPoint[0], startPoint[1], endPoint, []);
        this.agentPath = [...this.searchPath];
    }
}