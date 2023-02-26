class DepthFirstSearch extends Search {
    constructor(terrainCosts) {
        super(terrainCosts);
    }

    dfs(row, col, target, cellPath) {
        this.visited[row][col] = true;
        cellPath.push([row, col, this.matrix[row][col]]);

        if (row == target[0] && col == target[1]) {
            return cellPath;
        }

        let neighbors = this.getNeighbors(row, col);
        this.neighborsList.push(neighbors);

        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            if (!this.visited[neighbor[0]][neighbor[1]]) {
                cellPath = this.dfs(neighbor[0], neighbor[1], target, cellPath);
                if (cellPath[cellPath.length-1][0] == target[0] && cellPath[cellPath.length-1][1] == target[1]) {
                    return cellPath;
                }
            }
        }

        return cellPath;
    }

    setPath(startPoint, endPoint) {
        for (let i = 0; i < this.matrix.length; i++) {
            this.visited[i] = [];
            for (let j = 0; j < this.matrix[i].length; j++) {
                this.visited[i][j] = false;
            }
        }

        this.path = [];
        this.neighborsList = [];
        this.path = this.dfs(startPoint[0], startPoint[1], endPoint, []);
    }
}