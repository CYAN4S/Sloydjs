class Solver {
    pq: PriorityQueue<[Board, number, Arrow[]]>;
    private readonly arrows = [Arrow.Up, Arrow.Down, Arrow.Left, Arrow.Right];
    private readonly rev = [Arrow.Down, Arrow.Up, Arrow.Right, Arrow.Left];
    
    constructor(board: Board) {
        this.pq = new BinaryHeap<[Board, number, Arrow[]]>((parent: [Board, number, Arrow[]], child: [Board, number, Arrow[]]) => parent[1] >= child[1]);
        this.pq.insert([board, -board.countWrong(), []]);
    }

    solve(): Arrow[] {
        while (!this.pq.isEmpty()) {
            let [target, , arr] = this.pq.extract();

            if (target.isSolved()) {
                return arr;
            }

            for (let i = 0; i < 4; i++) {
                if (arr.length > 0 && arr[arr.length - 1] == this.rev[i]) continue;

                let pos = target.getPosByArrow(this.arrows[i]);
                if (pos == null) continue;

                let newt = target.copy();
                if (!newt.moveByPos(pos)) throw new Error("Something's wrong.");

                let newa = arr.slice();
                newa.push(this.arrows[i]);

                this.pq.insert([newt, -newt.countWrong() - newa.length, newa]);
            }
        }

        throw new Error("Solve Failed.");
    }
}