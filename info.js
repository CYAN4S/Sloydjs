"use strict";
class info {
    static getTime() {
        return info.currentTime;
    }
    static run(func) {
        info.reset();
        info.isRun = true;
        info.startTime = +(new Date());
        info.inter = setInterval(() => {
            info.currentTime = +(new Date()) - info.startTime;
            func();
        }, 10);
    }
    static stop() {
        if (info.isRun) {
            info.isRun = false;
            clearInterval(info.inter);
        }
        return false;
    }
    static reset() {
        clearInterval(info.inter);
        info.currentTime = 0;
    }
}
info.startTime = 0;
info.currentTime = 0;
info.movenum = 0;
info.isRun = false;
