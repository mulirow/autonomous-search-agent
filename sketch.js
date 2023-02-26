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

    // User selects search algorithm
    // ...
    search_alg = new DepthFirstSearch(grid.terrainCosts);
    search_alg.setPath(grid.startPoint, grid.endPoint);
    // Search algorithm is executed and returns an array of tuples (x, y) indicating the order of cell indexes the agent passed to reach destination
    agent.coordToPos(search_alg.path, cellSize);
}

function draw() {
    grid.display();
    agent.run();
}