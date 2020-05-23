"use strict";
// DOM Initialization
const stage = document.getElementById("stage");
const modal = document.getElementById("modal");
const [resize, shuffle, solve] = document.getElementById("con").getElementsByTagName("a");
const adjs = document.getElementsByClassName("adj");
const nums = document.getElementsByClassName("num");
const apply = document.getElementById("apply");
const timeinfo = document.getElementById("timeinfo");
const moveinfo = document.getElementById("moveinfo");
var Arrow;
(function (Arrow) {
    Arrow[Arrow["Up"] = 38] = "Up";
    Arrow[Arrow["Down"] = 40] = "Down";
    Arrow[Arrow["Left"] = 37] = "Left";
    Arrow[Arrow["Right"] = 39] = "Right";
})(Arrow || (Arrow = {}));
