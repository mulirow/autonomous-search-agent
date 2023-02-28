let grid;
let agent;
let search_alg;
let opt_alg;
let drawState = 0;
let selectionMode = 1;
let selectedAlgorithm = 5;
let numRows = 25;
let numCols = 25;
let cellSize = 20;
let terrainColors = [
    [69, 69, 69], // Fucking void
    [120, 180, 110], // Forest
    [250, 227, 173], // Desert
    [170, 220, 223], // Ocean
];
let costs = [-1, 1, 3, 9];

let algorithmList = [
    AStar,
    UniformCostSearch,
    DepthFirstSearch,
    BreadthFirstSearch,
    GreedySearch,
    Search,
];

function setup() {
    grid = new Grid(numRows, numCols, cellSize, terrainColors, costs);
    grid.display();
}

function draw() {
    if (selectionMode) {
        drawState = 0;
        // Only start drawing when any algorithm is picked
        if(selectedAlgorithm == 5) return;

        // Algorithm picked by the user
        search_alg = new algorithmList[selectedAlgorithm](grid.terrainCosts);

        // Agent
        agent = new Agent(
            grid.startPoint[0] * cellSize + cellSize / 2,
            grid.startPoint[1] * cellSize + cellSize / 2
        );

        // Algorithm that runs in the background to show the optimal path
        opt_alg = new UniformCostSearch(grid.terrainCosts);

        search_alg.setPath(grid.startPoint, grid.endPoint);
        opt_alg.setPath(grid.startPoint, grid.endPoint);
        agent.coordToPos(search_alg.agentPath, cellSize);

        selectionMode = 0;
    }

    grid.display();
    if (drawState >= 0) drawState += search_alg.display(grid.cellSize);
    if (drawState >= 1) drawState += opt_alg.displayOptPath(grid.cellSize);
    if (drawState >= 2) drawState += agent.run();

    // Reset the search mechanisms and defines a new food location
    if (p5.Vector.dist(agent.pos, createVector(grid.endPoint[0] * grid.cellSize + grid.cellSize / 2,
                                               grid.endPoint[1] * grid.cellSize + grid.cellSize / 2)) == 0) {
        grid.startPoint = [...grid.endPoint];
        let endRow, endCol;
        do {
            endRow = floor(random(grid.numRows));
            endCol = floor(random(grid.numCols));
        } while (grid.terrainColors[grid.terrain[endRow][endCol]] == grid.terrainColors[0]);
        grid.endPoint = [endRow, endCol];

        drawState = 0;
        search_alg.setPath(grid.startPoint, grid.endPoint);
        opt_alg.setPath(grid.startPoint, grid.endPoint);
        agent.coordToPos(search_alg.agentPath, grid.cellSize);
    }
}
