class DepthFirstSearch extends Search {
    constructor(terrainCosts) {
        super(terrainCosts);
        this.parents = [];
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
                this.parents[neighbor[0]][neighbor[1]] = [row, col];
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
            this.parents[i] = [];
            for (let j = 0; j < this.matrix[i].length; j++) {
                this.visited[i][j] = false;
                this.parents[i][j] = null;
            }
        }

        this.movesMade = 0;
        this.agentPath = [];
        this.searchPath = [];
        this.neighborsList = [];

        this.searchPath = this.dfs(startPoint[0], startPoint[1], endPoint, []);

        let optimalPath = [];
        let current = [endPoint[0], endPoint[1], this.matrix[endPoint[0]][endPoint[1]]];
        optimalPath.push(current);
        while(current[0] !== startPoint[0] || current[1] !== startPoint[1]) {
            current = this.parents[current[0]][current[1]];
            optimalPath.unshift([current[0], current[1], this.matrix[current[0]][current[1]]]);
        }

        this.agentPath = optimalPath;
    }
}