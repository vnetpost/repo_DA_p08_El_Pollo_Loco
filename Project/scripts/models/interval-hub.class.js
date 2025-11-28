// Interval-Management

export class IntervalHub {
    // #region Attributes
    static allIntervals = [];   // Array   all active interval IDs
    // #endregion Attributes

    // #region Static Methods
    static startInterval(func, timer) {
        const NEW_INTERVAL_ID = setInterval(func, timer);
        IntervalHub.allIntervals.push(NEW_INTERVAL_ID);
    }

    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval); // Stop all Intervalds
        IntervalHub.allIntervals = []; // Delete all References
    }
    // #endregion
}

// function stopIt() {
//     IntervalHub.stopAllIntervals();
// }

// function walk() { // This Func will be executed every 0.5 Sec
//     console.log("Laeft jede 1 Sec");
// }

// export function letsGo() {
//     IntervalHub.startInterval(walk, 1000)
// }
