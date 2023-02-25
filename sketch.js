let grid;

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

    grid = new Grid(numRows, numCols, cellSize, terrainColors);
}

function draw() {
    grid.display();
}