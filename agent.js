class Agent {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.r = 6;
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