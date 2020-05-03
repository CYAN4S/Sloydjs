"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BoardUI = /** @class */ (function (_super) {
    __extends(BoardUI, _super);
    function BoardUI(row, col, stage) {
        var _this = _super.call(this, row, col) || this;
        _this.elements = [];
        _this.initUI(stage);
        return _this;
    }
    BoardUI.prototype.initUI = function (stage) {
        while (stage.firstChild) {
            stage.removeChild(stage.lastChild);
        }
        var gtc = "";
        for (var i = 0; i < this.size[1]; i++) {
            gtc += "auto ";
        }
        stage.style.gridTemplateColumns = gtc;
        for (var i = 0; i < this.size[0]; i++) {
            this.elements.push([]);
            for (var j = 0; j < this.size[1]; j++) {
                this.elements[i].push();
                var obj = this.createDiv(i, j);
                stage.appendChild(obj);
                this.elements[i][j] = obj;
            }
        }
    };
    BoardUI.prototype.createDiv = function (i, j) {
        var _this = this;
        var div = document.createElement("div");
        div.className = this.status[i][j] == 0 ? "hole" : "piece";
        var p = document.createElement("p");
        p.textContent = this.status[i][j].toString();
        div.appendChild(p);
        div.addEventListener("click", function () { return _this.onPieceClick(i, j); });
        return div;
    };
    BoardUI.prototype.onPieceClick = function (row, col) {
        if (this.hole[0] == row) {
            if (this.hole[1] < col) {
                for (var i = col - this.hole[1]; i > 0; i--) {
                    this.moveTile(Move.Left);
                }
            }
            else {
                for (var i = this.hole[1] - col; i > 0; i--) {
                    this.moveTile(Move.Right);
                }
            }
        }
        else if (this.hole[1] == col) {
            if (this.hole[0] < row) {
                for (var i = row - this.hole[0]; i > 0; i--) {
                    this.moveTile(Move.Up);
                }
            }
            else {
                for (var i = this.hole[0] - row; i > 0; i--) {
                    this.moveTile(Move.Down);
                }
            }
        }
    };
    BoardUI.prototype.setToPiece = function (row, col) {
        this.elements[row][col].className = "piece";
        this.elements[row][col].getElementsByTagName("p")[0].textContent = this.status[row][col].toString();
    };
    BoardUI.prototype.setToHole = function (row, col) {
        this.elements[row][col].className = "hole";
    };
    BoardUI.prototype.moveTile = function (move) {
        _super.prototype.moveTile.call(this, move);
        this.setToHole(this.hole[0], this.hole[1]);
        switch (move) {
            case Move.Up:
                this.setToPiece(this.hole[0] - 1, this.hole[1]);
                break;
            case Move.Down:
                this.setToPiece(this.hole[0] + 1, this.hole[1]);
                break;
            case Move.Left:
                this.setToPiece(this.hole[0], this.hole[1] - 1);
                break;
            case Move.Right:
                this.setToPiece(this.hole[0], this.hole[1] + 1);
                break;
        }
    };
    return BoardUI;
}(Board));
