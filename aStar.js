class AStar extends Search{
    constructor(terrainCosts){
        super(terrainCosts);
        this.pq = new PriorityQueue();
        this.parents = [];
    }

    mhtDist(currentRow, currentCol, target) {
        let dx = abs(target[0] - currentRow);
        let dy = abs(target[1] - currentCol);
        return dx + dy;
    }

    gs(startRow, startCol, target) {    
        this.pq.enqueue([startRow, startCol], this.mhtDist(startRow, startCol, target) + this.matrix[startRow][startCol]);
        this.searchPath.push([startRow, startCol]);
        let found = false;
      
        while (!this.pq.isEmpty()) {
            // Get the node with the lowest cost so far from the priority queue
            let currNode = this.pq.dequeue();
            let row = currNode[0][0];
            let col = currNode[0][1];
      
            // Check if the current node is the goal node
            if (row == target[0] && col == target[1]) {
                found = true;
                break;
            }
      
            // Add the current node to the visited set
            this.visited[row][col] = true;

            let neighbors = this.getNeighbors(row, col);
            this.neighborsList.push(neighbors);

            // Loop through the neighbors of the current node
            for (let i = 0; i < neighbors.length; i++) {
                // Check if there is a path to the neighbor
                let neighborRow = neighbors[i][0];
                let neighborCol = neighbors[i][1];
                let cost = this.mhtDist(neighborRow, neighborCol, target) ** 2 + this.matrix[neighborRow][neighborCol];
    
                // Check if the neighbor has already been visited
                if (!this.visited[neighborRow][neighborCol]) {
                    this.visited[neighborRow][neighborCol] = true;
                    // Calculate the total cost to reach the neighbor
                    let totalCost = currNode[1] + cost;
                    //let totalCost = cost;
                    
                    this.searchPath.push([neighborRow, neighborCol])
                    // Add the neighbor to the priority queue with the total cost as priority
                    this.pq.enqueue([neighborRow, neighborCol], totalCost);
                    this.parents[neighborRow][neighborCol] = [row, col];
                    
                }
            }
        }
      
        // If the goal node is not found, return false
        if(!found){
            return null;
        }

        this.pq.toEmpty();
        let optimalPath = [];
        let current = [target[0], target[1], this.matrix[target[0]][target[1]]];
        optimalPath.push(current);
        while(current[0] !== startRow || current[1] !== startCol) {
            current = this.parents[current[0]][current[1]];
            optimalPath.unshift([current[0], current[1], this.matrix[current[0]][current[1]]]);
        }
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
        this.agentPath = this.gs(startPoint[0], startPoint[1], endPoint);
    }

}
