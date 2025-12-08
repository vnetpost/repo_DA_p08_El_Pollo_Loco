/**
 * @class Static helper to start and stop all intervals.
 */
export class IntervalHub {
    // #region Attributes
    static allIntervals = [];
    // #endregion Attributes

    // #region Instance Methods
    /**
     * Register a new interval and keep its id for later cleanup.
     * @param {Function} func Callback to execute.
     * @param {number} timer Interval delay in ms.
     */
    static startInterval(func, timer) {
        const NEW_INTERVAL_ID = setInterval(func, timer);
        IntervalHub.allIntervals.push(NEW_INTERVAL_ID);
    }

    /**
     * Clear every tracked interval and reset the list.
     */
    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval);
        IntervalHub.allIntervals = [];
    }
    // #endregion Instance Methods
}
