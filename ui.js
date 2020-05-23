"use strict";
class BoardUI extends Board {
    constructor(row, col, stage) {
        super(row, col);
        this.elements = [];
        this.initUI(stage);
    }
    initUI(stage) {
        while (stage.firstChild) {
            stage.removeChild(stage.lastChild);
        }
        stage.style.gridTemplateColumns = `repeat(${this.size[1]}, minmax(0, 100px))`;
        for (let i = 0; i < this.size[0]; i++) {
            this.elements.push([]);
            for (let j = 0; j < this.size[1]; j++) {
                this.elements[i].push();
                let obj = this.createDiv(i, j);
                stage.appendChild(obj);
                this.elements[i][j] = obj;
            }
        }
    }
    createDiv(i, j) {
        let div = document.createElement("div");
        div.className = this.status[i][j] == 0 ? "hole" : "piece";
        let p = document.createElement("p");
        p.textContent = this.status[i][j].toString();
        div.appendChild(p);
        div.onmousedown = () => this.moveByClick([i, j]);
        return div;
    }
    setClassToPiece(pos) {
        this.elements[pos[0]][pos[1]].className = "piece";
    }
    setP(pos) {
        this.elements[pos[0]][pos[1]].getElementsByTagName("p")[0].textContent = this.status[pos[0]][pos[1]].toString();
    }
    setHole() {
        this.elements[this.hole[0]][this.hole[1]].className = "hole";
    }
    moveByClick(pos) {
        let prev = [this.hole[0], this.hole[1]];
        let t = this.getAndMove(pos);
        if (t == null)
            return;
        let delta = t;
        let f = delta.isRowSame ? (i) => [delta.std, i] : (i) => [i, delta.std];
        this.setClassToPiece(prev);
        this.setHole();
        for (let i = delta.start; i <= delta.end; i++) {
            this.setP(f(i));
        }
        if (info.isRunning) {
            info.increase(delta.end - delta.start);
        }
        if (this.isSolved()) {
            info.stop();
        }
    }
    moveByArrow(move) {
        switch (move) {
            case Arrow.Up:
                if (this.hole[0] == this.size[0] - 1)
                    return false;
                this.moveByClick([this.hole[0] + 1, this.hole[1]]);
                break;
            case Arrow.Down:
                if (this.hole[0] == 0)
                    return false;
                this.moveByClick([this.hole[0] - 1, this.hole[1]]);
                break;
            case Arrow.Left:
                if (this.hole[1] == this.size[1] - 1)
                    return false;
                this.moveByClick([this.hole[0], this.hole[1] + 1]);
                break;
            case Arrow.Right:
                if (this.hole[1] == 0)
                    return false;
                this.moveByClick([this.hole[0], this.hole[1] - 1]);
                break;
        }
        return true;
    }
    moveAuto(moves) {
        let self = this;
        let i = 0;
        let id = setTimeout(function tick() {
            if (i == moves.length) {
                clearInterval(id);
                return;
            }
            self.moveByArrow(moves[i++]);
            id = setTimeout(tick, 200);
        }, 200);
    }
}
