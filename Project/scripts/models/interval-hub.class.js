// Interval-Management

export class IntervalHub {
    // #region Attributes
    static allIntervals = [];   // Array   all active interval IDs
    // #endregion Attributes

    // #region Instance Methods
    static startInterval(func, timer) {
        const NEW_INTERVAL_ID = setInterval(func, timer);
        IntervalHub.allIntervals.push(NEW_INTERVAL_ID);
    }

    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval); // Stop all Intervalds
        IntervalHub.allIntervals = []; // Delete all References
    }
    // #endregion Instance Methods
}
