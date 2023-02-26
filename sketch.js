let grid;
let agent;
let search_alg;

function setup() {
    let numRows = 25;
    let numCols = 25;
    let cellSize = 20;
    let terrainColors = [
        [69, 69, 69], // Fucking void
        [120, 180, 110], // Forest
        [250, 227, 173],   // Desert
        [170, 220, 223]   // Ocean
    ];
    let costs = [-1, 1, 3, 9];

    grid = new Grid(numRows, numCols, cellSize, terrainColors, costs);
    agent = new Agent(grid.startPoint[0]*cellSize + cellSize/2, grid.startPoint[1]*cellSize + cellSize/2);
    search_alg = new BreadthFirstSearch(grid.terrainCosts);

    search_alg.setPath(grid.startPoint, grid.endPoint);
    agent.coordToPos(search_alg.agentPath, cellSize);
}

function draw() {
    grid.display();
    search_alg.display(grid.cellSize);
    agent.run(grid.cellSize);

    // Reset the search mechanisms and defines a new food location
    if(p5.Vector.dist(agent.pos, createVector(grid.endPoint[0] * grid.cellSize + grid.cellSize / 2, grid.endPoint[1] * grid.cellSize + grid.cellSize / 2)) == 0) {
        grid.startPoint = [...grid.endPoint];
        let endRow, endCol;
        do {
            endRow = floor(random(grid.numRows));
            endCol = floor(random(grid.numCols));
        } while (grid.terrainColors[grid.terrain[endRow][endCol]] == grid.terrainColors[0]);
        grid.endPoint = [endRow, endCol];

        search_alg.setPath(grid.startPoint, grid.endPoint);

        agent.coordToPos(search_alg.agentPath, grid.cellSize);
    }
}