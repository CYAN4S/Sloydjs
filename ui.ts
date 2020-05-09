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

    let gtc: string = "";
    for (let i = 0; i < this.size[1]; i++) {
      gtc += "auto "
    }
    stage.style.gridTemplateColumns = gtc;

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

    // div.addEventListener("click", () => this.onPieceClick(i, j));
    div.addEventListener("click", () => this.moveByClick([i, j]));

    return div;
  }

  onPieceClick(row: number, col: number) {
    if (this.hole[0] == row) {
      if (this.hole[1] < col) {
        for (let i = col - this.hole[1]; i > 0; i--) {
          this.moveTile(Move.Left);
        }
      } else {
        for (let i = this.hole[1] - col; i > 0; i--) {
          this.moveTile(Move.Right);
        }
      }
    } else if (this.hole[1] == col) {
      if (this.hole[0] < row) {
        for (let i = row - this.hole[0]; i > 0; i--) {
          this.moveTile(Move.Up);
        }
      } else {
        for (let i = this.hole[0] - row; i > 0; i--) {
          this.moveTile(Move.Down);
        }
      }
    }
  }

  private setToPiece(row: number, col: number) {
    this.elements[row][col].className = "piece";
    this.elements[row][col].getElementsByTagName("p")[0].textContent = this.status[row][col].toString();
  }

  private setClassToPiece(pos: [number, number]) {
    this.elements[pos[0]][pos[1]].className = "piece";
  }

  private setToHole(row: number, col: number) {
    this.elements[row][col].className = "hole";
  }

  private setP(pos: [number, number]) {
    this.elements[pos[0]][pos[1]].getElementsByTagName("p")[0].textContent = this.status[pos[0]][pos[1]].toString();
  }

  private setHole() {
    this.elements[this.hole[0]][this.hole[1]].className = "hole";
  }

  protected moveTile(move: Move): void {
    super.moveTile(move);
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

    if (this.isSolved()) {
      info.stop();
    }
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

    if (this.isSolved()) {
      info.stop();
    }
  }
}