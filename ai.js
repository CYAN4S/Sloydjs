"use strict";
class Solver {
    constructor(board) {
        this.arrows = [Arrow.Up, Arrow.Down, Arrow.Left, Arrow.Right];
        this.rev = [Arrow.Down, Arrow.Up, Arrow.Right, Arrow.Left];
        this.pq = new BinaryHeap((parent, child) => parent[1] >= child[1]);
        this.pq.insert([board, -board.countWrong(), []]);
    }
    solve() {
        while (!this.pq.isEmpty()) {
            let [target, , arr] = this.pq.extract();
            if (target.isSolved()) {
                return arr;
            }
            for (let i = 0; i < 4; i++) {
                if (arr.length > 0 && arr[arr.length - 1] == this.rev[i])
                    continue;
                let pos = target.getPosByArrow(this.arrows[i]);
                if (pos == null)
                    continue;
                let newt = target.copy();
                if (!newt.moveByPos(pos))
                    throw new Error("Something's wrong.");
                let newa = arr.slice();
                newa.push(this.arrows[i]);
                this.pq.insert([newt, -newt.countWrong() - newa.length, newa]);
            }
        }
        throw new Error("Solve Failed.");
    }
}
