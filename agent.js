class Agent {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.maxVel = 3;
        this.r = 6;
        this.moves = []; // Store the list of absolute coordenates to take
        this.movesMade = [];
        this.moveCount = 0;
    }

    coordToPos(path, cellSize){
        this.moves = [];
        this.movesMade = [];
        this.moveCount = path.length;

        for(let i = 0; i < path.length; ++i) {
            let move = [path[i][0] * cellSize + cellSize / 2, path[i][1] * cellSize + cellSize / 2, path[i][2]];
            this.moves.push(move);
        }
    }

    run(){
        this.move();
        this.updatePos();
        return this.display();
    }

    move(){
        let target = createVector(this.moves[0][0], this.moves[0][1]);
        let dist = p5.Vector.dist(target, this.pos);
        this.vel.set(p5.Vector.sub(target, this.pos));
        this.vel.limit(this.maxVel / this.moves[0][2]);


        if(dist == 0 && this.moves.length > 1) {
            this.movesMade.push(this.moves[0]);
            this.moves.splice(0, 1);
        }
    }

    updatePos() {
        this.pos.add(this.vel);
    }

    display() {
        push();
        rectMode(RADIUS);
        stroke(255);
        strokeWeight(2);
        fill(180, 200, 128);
        for(let i = 1; i < this.movesMade.length; i++) {
            rect(this.movesMade[i][0], this.movesMade[i][1], this.r, this.r);
        }
        circle(this.pos.x, this.pos.y, 2 * this.r);
        pop();

        if(this.movesMade.length == this.moveCount) return 1;
        return 0;
    }
}