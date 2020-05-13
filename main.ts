const stage = document.getElementById("stage")!;
const modal = document.getElementById("modal")!;

const [resize, shuffle, solve] = document.getElementById("con")!.getElementsByTagName("a");

const adjs = document.getElementsByClassName("adj");
const nums = document.getElementsByClassName("num");
const apply = document.getElementById("apply")!;

const timeinfo = document.getElementById("timeinfo")!;
const moveinfo = document.getElementById("moveinfo")!;

let mainBoard = new BoardUI(3, 3, stage);
let row = 3, col = 3;

resize.onclick = () => { modal.style.display = "block" };
window.onclick = (event: MouseEvent) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
window.onkeydown = (event: KeyboardEvent) => {
    console.log(event.keyCode);
    mainBoard.moveByArrow(event.keyCode);
}
apply.onclick = () => {
    info.stop();
    mainBoard = new BoardUI(row, col, stage);
    modal.style.display = "none";
}

shuffle.onclick = () => {
    for (let i = 0; i < 100 * row * col;) {
        i += mainBoard.moveByArrow(Math.floor(Math.random() * 4) + 37) ? 1 : 0;
    }
    info.run(() => {
        let t = info.getTime();
        timeinfo.textContent = `${Math.floor(t / 1000)}`;
    });
}

function minmax(n: number): number {
    return (n < 2) ? 2 : (n > 9) ? 9 : n;
}

const adjfuncs = [
    () => { nums[0].textContent = (row = (++row > 9) ? 9 : row).toString() },
    () => { nums[1].textContent = (col = (++col > 9) ? 9 : col).toString() },
    () => { nums[0].textContent = (row = (--row < 2) ? 2 : row).toString() },
    () => { nums[1].textContent = (col = (--col < 2) ? 2 : col).toString() },
]

for (let i = 0; i < 4; i++) {
    (<HTMLElement>adjs[i]).onclick = adjfuncs[i];
}

