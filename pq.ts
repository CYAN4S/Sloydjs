class BinaryHeap<T> {
  private readonly comparator = (parent: T, child: T): boolean =>
    parent >= child;
  private meta: T[] = [];

  constructor(comparator?: (parent: T, child: T) => boolean) {
    if (comparator) {
      this.comparator = comparator;
    }
  }

  length(): number {
    return this.meta.length;
  }

  isEmpty(): boolean {
    return this.meta.length == 0;
  }

  log() {
    console.log(this.meta.join());
  }

  insert(data: T): void {
    this.meta.push(data);

    let i = this.length() - 1,
      p: number;
    while ((p = Math.floor((i - 1) / 2)) >= 0) {
      if (!this.comparator(this.meta[p], this.meta[i])) {
        [this.meta[p], this.meta[i]] = [this.meta[i], this.meta[p]];
        i = p;
      } else {
        return;
      }
    }
  }

  peek(): T {
    if (this.isEmpty()) {
      throw `Error: ${this} is empty.`;
    }
    return this.meta[0];
  }

  extract(): T {
    if (this.isEmpty()) {
      throw `Error: ${this} is empty.`;
    }

    if (this.length() == 1) {
      return this.meta.pop()!;
    }

    let result = this.meta[0];
    this.meta[0] = this.meta.pop()!;

    let i = 0,
      l: number;
    while ((l = 2 * i + 1) < this.length()) {
      let index: number;

      if (l == this.length() - 1) {
        index = l;
      } else {
        index = this.comparator(this.meta[l], this.meta[l + 1]) ? l : l + 1;
      }

      if (this.comparator(this.meta[i], this.meta[index])) {
        return result;
      }

      [this.meta[i], this.meta[index]] = [this.meta[index], this.meta[i]];
      i = index;
    }
    return result;
  }
}

// ordering of elements with the same priority is undefined.
// class PriorityQueue<T> {
//   heap: BinaryHeap<[T, number]>;
//   constructor(comparator?: (parent: T, child: T) => boolean) {
//     this.heap = new BinaryHeap()
//   }

//   isEmpty(): boolean {
//     return false;
//   }

//   insert(element: T, priority: number): void {
//     return;
//   }

//   pull(): T {
    
//   }
// }
