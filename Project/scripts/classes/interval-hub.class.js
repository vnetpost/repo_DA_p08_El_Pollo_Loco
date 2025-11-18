// Interval-Management
export class IntervalHub {
    static allIntervals = [];

    static startInterval(func, timer) {
        const NEW_INTERVAL_ID = setInterval(func, timer);
        IntervalHub.allIntervals.push(NEW_INTERVAL_ID);
    }

    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval); // Stop all Intervalds
        IntervalHub.allIntervals = []; // Delete all References
    }
}

function stopIt() {
    IntervalHub.stopAllIntervals();
}

function walk() { // This Func will be executed every 0.5 Sec
    console.log("Laeft jede 1 Sec");
}

export function letsGo() {
    IntervalHub.startInterval(walk, 1000)
}


