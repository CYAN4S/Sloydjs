// DOM Initialization

const stage = document.getElementById("stage")!;
const modal = document.getElementById("modal")!;

const [resize, shuffle, solve] = document.getElementById("con")!.getElementsByTagName("a");

const adjs = document.getElementsByClassName("adj");
const nums = document.getElementsByClassName("num");
const apply = document.getElementById("apply")!;

const timeinfo = document.getElementById("timeinfo")!;
const moveinfo = document.getElementById("moveinfo")!;

enum Arrow { Up = 38, Down = 40, Left = 37, Right = 39 }
