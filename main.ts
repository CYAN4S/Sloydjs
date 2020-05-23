let row = 3, col = 3;
let mainBoard = new BoardUI(row, col, stage);

resize.onclick = () => { modal.style.display = "block" };
window.onclick = (event: MouseEvent) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
window.onkeydown = (event: KeyboardEvent) => {
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

solve.onclick = () => {
    let solver = new Solver(mainBoard);
    mainBoard.moveAuto(solver.solve());
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