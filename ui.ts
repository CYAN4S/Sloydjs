class BoardUI extends Board {
  elements: HTMLDivElement[][] = [];

  constructor(row: number, col: number, stage: HTMLElement) {
    super(row, col);

    this.initUI(stage);
  }

  private initUI(stage: HTMLElement): void {
    while (stage.firstChild) {
      stage.removeChild(stage.lastChild!);
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

  private createDiv(i: number, j: number): HTMLDivElement {
    let div = document.createElement("div");
    div.className = this.status[i][j] == 0 ? "hole" : "piece";

    let p = document.createElement("p");
    p.textContent = this.status[i][j].toString();
    div.appendChild(p);

    // div.addEventListener("mousedown", () => this.moveByClick([i, j]));
    div.onmousedown = () => this.moveByClick([i, j]);

    return div;
  }

  private setClassToPiece(pos: [number, number]) {
    this.elements[pos[0]][pos[1]].className = "piece";
  }

  private setP(pos: [number, number]) {
    this.elements[pos[0]][pos[1]].getElementsByTagName("p")[0].textContent = this.status[pos[0]][pos[1]].toString();
  }

  private setHole() {
    this.elements[this.hole[0]][this.hole[1]].className = "hole";
  }

  moveByClick(pos: [number, number]) {
    let prev: [number, number] = [this.hole[0], this.hole[1]];

    let t = this.getAndMove(pos);
    if (t == null) return;

    let delta = t!;

    let f: (i: number) => [number, number] = delta.isRowSame ? (i: number) => [delta.std, i] : (i: number) => [i, delta.std];

    this.setClassToPiece(prev);
    this.setHole();
    for (let i = delta.start; i <= delta.end; i++) {
      this.setP(f(i));
    }

    if (info.isRunning) {
      info.increase();
    }

    if (this.isSolved()) {
      info.stop();
    }
  }

  moveByArrow(move: Arrow): boolean {
    switch (move) {
      case Arrow.Up:
        if (this.hole[0] == this.size[0] - 1) return false;
        this.moveByClick([this.hole[0] + 1, this.hole[1]]);
        break;
      case Arrow.Down:
        if (this.hole[0] == 0) return false;
        this.moveByClick([this.hole[0] - 1, this.hole[1]]);
        break;
      case Arrow.Left:
        if (this.hole[1] == this.size[1] - 1) return false;
        this.moveByClick([this.hole[0], this.hole[1] + 1]);
        break;
      case Arrow.Right:
        if (this.hole[1] == 0) return false;
        this.moveByClick([this.hole[0], this.hole[1] - 1]);
        break;
    }
    return true;
  }
}

enum Arrow { Up = 38, Down = 40, Left = 37, Right = 39 }