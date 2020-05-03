"use strict";
var Move;
(function (Move) {
    Move[Move["Up"] = 0] = "Up";
    Move[Move["Down"] = 1] = "Down";
    Move[Move["Left"] = 2] = "Left";
    Move[Move["Right"] = 3] = "Right";
})(Move || (Move = {}));
var Board = /** @class */ (function () {
    function Board(row, col) {
        this.status = [];
        if (row < 2 || col < 2) {
            // throw error
        }
        this.hole = [row - 1, col - 1];
        this.size = [row, col];
        var num = 1;
        for (var i = 0; i < row; i++) {
            var arr = [];
            for (var j = 0; j < col; j++) {
                arr.push(num++);
            }
            this.status.push(arr);
        }
        this.status[this.hole[0]][this.hole[1]] = 0;
    }
    Board.prototype.countWrong = function () {
        var num = 0, wrong = -1;
        for (var _i = 0, _a = this.status; _i < _a.length; _i++) {
            var i = _a[_i];
            for (var _b = 0, i_1 = i; _b < i_1.length; _b++) {
                var j = i_1[_b];
                if (j != ++num) {
                    wrong++;
                }
            }
        }
        return wrong;
    };
    Board.prototype.isSolved = function () {
        var num = 0;
        for (var _i = 0, _a = this.status; _i < _a.length; _i++) {
            var i = _a[_i];
            for (var _b = 0, i_2 = i; _b < i_2.length; _b++) {
                var j = i_2[_b];
                if (j == 0) {
                    continue;
                }
                if (j != ++num) {
                    return false;
                }
            }
        }
        return true;
    };
    Board.prototype.isMovable = function (move) {
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
    };
    Board.prototype.moveTile = function (move) {
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
    };
    Board.prototype.controlTile = function (move) {
        if (this.isMovable(move)) {
            this.moveTile(move);
            return true;
        }
        else {
            return false;
        }
    };
    Board.prototype.log = function () {
        console.log(this.status.join("\n"));
    };
    return Board;
}());
