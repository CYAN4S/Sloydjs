"use strict";
const stage = document.getElementById("stage");
const modal = document.getElementById("modal");
const [resize, shuffle, solve] = document.getElementById("con").getElementsByTagName("a");
const adjs = document.getElementsByClassName("adj");
const nums = document.getElementsByClassName("num");
const apply = document.getElementById("apply");
let mainBoard = new BoardUI(3, 3, stage);
let row = 3, col = 3;
resize.onclick = () => { modal.style.display = "block"; };
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
apply.onclick = _ => {
    mainBoard = new BoardUI(row, col, stage);
    modal.style.display = "none";
};
function minmax(n) {
    return (n < 2) ? 2 : (n > 9) ? 9 : n;
}
const adjfuncs = [
    () => { nums[0].textContent = (row = minmax(++row)).toString(); },
    () => { nums[1].textContent = (col = minmax(++col)).toString(); },
    () => { nums[0].textContent = (row = minmax(--row)).toString(); },
    () => { nums[1].textContent = (col = minmax(--col)).toString(); },
];
for (let i = 0; i < 4; i++) {
    adjs[i].onclick = adjfuncs[i];
}
