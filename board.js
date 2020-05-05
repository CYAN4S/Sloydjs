"use strict";
var Move;
(function (Move) {
    Move[Move["Up"] = 0] = "Up";
    Move[Move["Down"] = 1] = "Down";
    Move[Move["Left"] = 2] = "Left";
    Move[Move["Right"] = 3] = "Right";
})(Move || (Move = {}));
class Board {
    constructor(row, col) {
        this.status = [];
        if (row < 2 || col < 2) {
            // throw error
        }
        this.hole = [row - 1, col - 1];
        this.size = [row, col];
        let num = 1;
        for (let i = 0; i < row; i++) {
            let arr = [];
            for (let j = 0; j < col; j++) {
                arr.push(num++);
            }
            this.status.push(arr);
        }
        this.status[this.hole[0]][this.hole[1]] = 0;
    }
    countWrong() {
        let num = 0, wrong = -1;
        for (const i of this.status) {
            for (const j of i) {
                if (j != ++num) {
                    wrong++;
                }
            }
        }
        return wrong;
    }
    isSolved() {
        let num = 0;
        for (const i of this.status) {
            for (const j of i) {
                num++;
                if (j == 0) {
                    continue;
                }
                if (j != num) {
                    return false;
                }
            }
        }
        return true;
    }
    isMovable(move) {
        switch (move) {
            case Move.Up:
                if (this.hole[0] < this.size[0] - 1) {
                    return true;
                }
                break;
            case Move.Down:
                if (this.hole[0] > 0) {
                    return true;
                }
                break;
            case Move.Left:
                if (this.hole[1] < this.size[1] - 1) {
                    return true;
                }
                break;
            case Move.Right:
                if (this.hole[1] > 0) {
                    return true;
                }
                break;
        }
        return false;
    }
    moveTile(move) {
        switch (move) {
            case Move.Up:
                this.status[this.hole[0]][this.hole[1]] = this.status[this.hole[0] + 1][this.hole[1]];
                this.status[this.hole[0] + 1][this.hole[1]] = 0;
                this.hole[0]++;
                break;
            case Move.Down:
                this.status[this.hole[0]][this.hole[1]] = this.status[this.hole[0] - 1][this.hole[1]];
                this.status[this.hole[0] - 1][this.hole[1]] = 0;
                this.hole[0]--;
                break;
            case Move.Left:
                this.status[this.hole[0]][this.hole[1]] = this.status[this.hole[0]][this.hole[1] + 1];
                this.status[this.hole[0]][this.hole[1] + 1] = 0;
                this.hole[1]++;
                break;
            case Move.Right:
                this.status[this.hole[0]][this.hole[1]] = this.status[this.hole[0]][this.hole[1] - 1];
                this.status[this.hole[0]][this.hole[1] - 1] = 0;
                this.hole[1]--;
                break;
        }
        return;
    }
    controlTile(move) {
        if (this.isMovable(move)) {
            this.moveTile(move);
            return true;
        }
        else {
            return false;
        }
    }
    log() {
        console.log(this.status.join(`\n`));
    }
}
