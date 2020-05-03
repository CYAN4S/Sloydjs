"use strict";
var BinaryHeap = /** @class */ (function () {
    function BinaryHeap(comparator) {
        this.comparator = function (parent, child) {
            return parent >= child;
        };
        this.meta = [];
        if (comparator) {
            this.comparator = comparator;
        }
    }
    BinaryHeap.prototype.length = function () {
        return this.meta.length;
    };
    BinaryHeap.prototype.isEmpty = function () {
        return this.meta.length == 0;
    };
    BinaryHeap.prototype.log = function () {
        console.log(this.meta.join());
    };
    BinaryHeap.prototype.insert = function (data) {
        var _a;
        this.meta.push(data);
        var i = this.length() - 1, p;
        while ((p = Math.floor((i - 1) / 2)) >= 0) {
            if (!this.comparator(this.meta[p], this.meta[i])) {
                _a = [this.meta[i], this.meta[p]], this.meta[p] = _a[0], this.meta[i] = _a[1];
                i = p;
            }
            else {
                return;
            }
        }
    };
    BinaryHeap.prototype.peek = function () {
        if (this.isEmpty()) {
            throw "Error: " + this + " is empty.";
        }
        return this.meta[0];
    };
    BinaryHeap.prototype.extract = function () {
        var _a;
        if (this.isEmpty()) {
            throw "Error: " + this + " is empty.";
        }
        if (this.length() == 1) {
            return this.meta.pop();
        }
        var result = this.meta[0];
        this.meta[0] = this.meta.pop();
        var i = 0, l;
        while ((l = 2 * i + 1) < this.length()) {
            var index = void 0;
            if (l == this.length() - 1) {
                index = l;
            }
            else {
                index = this.comparator(this.meta[l], this.meta[l + 1]) ? l : l + 1;
            }
            if (this.comparator(this.meta[i], this.meta[index])) {
                return result;
            }
            _a = [this.meta[index], this.meta[i]], this.meta[i] = _a[0], this.meta[index] = _a[1];
            i = index;
        }
        return result;
    };
    return BinaryHeap;
}());
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
