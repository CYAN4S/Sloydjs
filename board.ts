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
        if (j != ++num) {
          wrong++;
        }
      }
    }

    return wrong;
  }

  isSolved(): boolean {
    let num = 0;

    for (const i of this.status) {
      for (const j of i) {
        if (j == 0) {
          continue;
        }
        if (j != ++num) {
          return false;
        }
      }
    }

    return true;
  }

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

  log(): void {
    console.log(this.status.join(`\n`));
  }
}

