class DepthFirstSearch {
    constructor(grid) {
        this.visited = [];
        this.matrix = grid;
        this.path = [];

        for (let i = 0; i < this.matrix.length; i++) {
            this.visited[i] = [];
            for (let j = 0; j < this.matrix[i].length; j++) {
                this.visited[i][j] = false;
            }
        }

        console.log(this.matrix);
    }

    getNeighbors(row, col) {
        let neighbors = [];
        if (row > 0 && this.matrix[row - 1][col] != 0) {
            neighbors.push([row - 1, col]);
        }
        if (col < this.matrix[0].length - 1 && this.matrix[row][col + 1] != 0) {
            neighbors.push([row, col + 1]);
        }
        if (col > 0 && this.matrix[row][col - 1] != 0) {
            neighbors.push([row, col - 1]);
        }
        if (row < this.matrix.length - 1 && this.matrix[row + 1][col] != 0) {
            neighbors.push([row + 1, col]);
        }
        return neighbors;
    }

    dfs(row, col, target, cellPath) {
        this.visited[row][col] = true;
        cellPath.push([row, col]);

        if (row == target[0] && col == target[1]) {
            return cellPath;
        }

        let neighbors = this.getNeighbors(row, col);
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            if (!this.visited[neighbor[0]][neighbor[1]]) {
                console.log('fvck me');
                cellPath = this.dfs(neighbor[0], neighbor[1], target, cellPath);
                if (cellPath[cellPath.length-1][0] == target[0] && cellPath[cellPath.length-1][1] == target[1]) {
                    return cellPath;
                }
            }
        }

        return cellPath;
    }

    setPath(startPoint, endPoint) {
        console.log('fvck');
        this.path = this.dfs(startPoint[0], startPoint[1], endPoint, []);
        console.log(this.path);
    }
}