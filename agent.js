class Agent {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.maxVel = 3;
        this.r = 6;
        this.moves = []; // Store the list of absolute coordenates to take
    }

    coordToPos(path, cellSize){
        this.moves = [];

        for(let i = 0; i < path.length; ++i) {
            let move = path[i].map(function(val) {return val * cellSize + cellSize / 2});
            this.moves.push(move);
        }
        print(this.moves);
    }

    move(){
        let target = createVector(this.moves[0][0], this.moves[0][1]);
        let dist = p5.Vector.dist(target, this.pos);
        this.vel.set(p5.Vector.sub(target, this.pos));
        this.vel.limit(this.maxVel);

        if(dist < this.r/2 && this.moves.length > 1) this.moves.splice(0, 1);
    }

    display() {
        push();
        stroke(255);
        strokeWeight(2);
        fill(180, 0, 128);
        circle(this.pos.x, this.pos.y, 2 * this.r);
        pop();
    }
}