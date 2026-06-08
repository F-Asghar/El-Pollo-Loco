export class IntervalHub {
    /**
     * A static array that stores all active interval IDs running across the game.
     * @type {number[]}
     */
    static allIntervals = [];

    /**
     * Starts a new game loop interval, registers it in the browser,
     * and stores its ID tracker inside the static `allIntervals` array.
     * * @param {Function} func - The callback function to be executed periodically.
     * @param {number} timer - The time delay in milliseconds between executions.
     * @requires IntervalHub
     */
    static startInterval(func, timer) {
        const newInterval = setInterval(func, timer);
        IntervalHub.allIntervals.push(newInterval);
    }

    /**
     * Loops through all registered interval IDs, clears them from the browser memory
     * to stop all background loops, and flushes the static array tracking them.
     * * @requires IntervalHub
     */
    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval);
        IntervalHub.allIntervals = [];
    }
}
