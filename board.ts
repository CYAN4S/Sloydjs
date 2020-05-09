enum Move {
  Up,
  Down,
  Left,
  Right,
}

class Board {
  hole: [number, number];
  status: number[][] = [];

  readonly size: [number, number];

  constructor(row: number, col: number) {
    if (row < 2 || col < 2) {
      // throw error
    }
    this.hole = [row - 1, col - 1];
    this.size = [row, col];

    let num = 1;

    for (let i = 0; i < row; i++) {
      let arr: number[] = [];

      for (let j = 0; j < col; j++) {
        arr.push(num++);
      }
      this.status.push(arr);
    }

    this.status[this.hole[0]][this.hole[1]] = 0;
  }

  countWrong(): number {
    let num = 0,
      wrong = -1;

    for (const i of this.status) {
      for (const j of i) {
        j != ++num ? wrong++ : {};
      }
    }

    return wrong;
  }

  isSolved(): boolean {
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

  private getDelta(pos: [number, number]) {
    let isRowSame: boolean, std: number, start: number, end: number;

    if (pos[0] == this.hole[0]) {
      if (pos[1] == this.hole[1]) {
        return null;
      }
      [isRowSame, std] = [true, pos[0]];
      [start, end] = [pos[1], this.hole[1]].sort();
    } else if (pos[1] == this.hole[1]) {
      [isRowSame, std] = [false, pos[1]];
      [start, end] = [pos[0], this.hole[0]].sort();
    } else {
      return null;
    }

    std = isRowSame ? pos[0] : pos[1];
    return { isRowSame, std, start, end };
  }


  protected moveByPos(pos: [number, number]): boolean {
    if (pos[0] == this.hole[0]) {
      if (pos[1] == this.hole[1]) {
        return false;
      }
      if (this.hole[1] < pos[1]) {
        // Tiles go right.
        for (let i = this.hole[1]; i < pos[1]; i++) {
          this.status[pos[0]][i] = this.status[pos[0]][i + 1];
        }
      } else {
        // Tiles go left.
        for (let i = this.hole[1]; i > pos[1]; i--) {
          this.status[pos[0]][i] = this.status[pos[0]][i - 1];
        }
      }
    }
    else if (pos[1] == this.hole[1]) {
      if (this.hole[0] < pos[0]) {
        // Tiles go up.
        for (let i = this.hole[0]; i < pos[0]; i++) {
          this.status[i][pos[1]] = this.status[i + 1][pos[1]];
        }
      } else {
        // Tiles go down.
        for (let i = this.hole[0]; i > pos[0]; i--) {
          this.status[i][pos[1]] = this.status[i - 1][pos[1]];
        }
      }
    }
    else {
      return false;
    }

    this.hole = pos;
    this.status[pos[0]][pos[1]] = 0;
    return true;
  }

  getAndMove(pos: [number, number]) {
    let value = this.getDelta(pos);
    if (value == null) return null;

    this.moveByPos(pos);
    
    return value;
  }

  // LEGACY
  isMovable(move: Move): boolean {
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

  protected moveTile(move: Move): void {
    switch (move) {
      case Move.Up:
        this.status[this.hole[0]][this.hole[1]] = this.status[this.hole[0] + 1][
          this.hole[1]
        ];
        this.status[this.hole[0] + 1][this.hole[1]] = 0;
        this.hole[0]++;
        break;
      case Move.Down:
        this.status[this.hole[0]][this.hole[1]] = this.status[this.hole[0] - 1][
          this.hole[1]
        ];
        this.status[this.hole[0] - 1][this.hole[1]] = 0;
        this.hole[0]--;
        break;
      case Move.Left:
        this.status[this.hole[0]][this.hole[1]] = this.status[this.hole[0]][
          this.hole[1] + 1
        ];
        this.status[this.hole[0]][this.hole[1] + 1] = 0;
        this.hole[1]++;
        break;
      case Move.Right:
        this.status[this.hole[0]][this.hole[1]] = this.status[this.hole[0]][
          this.hole[1] - 1
        ];
        this.status[this.hole[0]][this.hole[1] - 1] = 0;
        this.hole[1]--;
        break;
    }
    return;
  }

  controlTile(move: Move): boolean {
    if (this.isMovable(move)) {
      this.moveTile(move);
      return true;
    } else {
      return false;
    }
  }
  // LEGACYEND

  log(): void {
    console.log(this.status.join(`\n`));
  }
}

