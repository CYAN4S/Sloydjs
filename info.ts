abstract class info {
    private static startTime: number = 0;
    private static currentTime: number = 0;
    private static movenum: number = 0;
    private static isRun: boolean = false;
    private static inter: number;

    static getTime(): number {
        return info.currentTime;
    }

    static run(func: () => void): void {
        info.reset();
        info.isRun = true;
        info.startTime = +(new Date());
        info.inter = setInterval(() => {
            info.currentTime = +(new Date()) - info.startTime;
            func();
        }, 10);
    }

    static stop(): boolean {
        if (info.isRun) {
            info.isRun = false;
            clearInterval(info.inter);
        }
        return false;
    }

    static reset(): void {
        clearInterval(info.inter);
        info.currentTime = 0;
    }
}