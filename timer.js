// ==========================================
// LIFE QUEST: QUESTION TIMER
// Loaded before game.js (see index.html).
//
// One countdown for the whole game. Rules that keep it safe:
//   • Only one timer can run. Starting a new one stops the old one.
//   • It counts down to a fixed end time instead of subtracting 1 each
//     second, so it stays accurate even when the browser is busy.
//   • It can be paused (Settings, breaks) and resumed with the time left.
//   • stop() is safe to call at any time, even when nothing is running.
// ==========================================

"use strict";

const QuestionTimer = (function () {

    let intervalId = null;
    let endsAt = 0;
    let remainingMs = 0;
    let paused = false;
    let handlers = null;
    let lastWhole = null;

    function now() {
        return typeof performance !== "undefined" && performance.now
            ? performance.now()
            : Date.now();
    }

    function clear() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function secondsLeft() {
        const ms = paused ? remainingMs : Math.max(0, endsAt - now());
        return Math.ceil(ms / 1000);
    }

    function tick() {

        if (!handlers || paused) return;

        const left = secondsLeft();

        if (left !== lastWhole) {
            lastWhole = left;
            if (handlers.onTick) handlers.onTick(left);
        }

        if (left <= 0) {
            const done = handlers.onExpire;
            stop();
            if (done) done();
        }
    }

    // seconds: how long; options.onTick(secondsLeft), options.onExpire()
    function start(seconds, options = {}) {

        stop();

        handlers = options;
        paused = false;
        remainingMs = Math.max(0, seconds) * 1000;
        endsAt = now() + remainingMs;
        lastWhole = null;

        tick();
        intervalId = setInterval(tick, 200);
    }

    function stop() {
        clear();
        handlers = null;
        paused = false;
        lastWhole = null;
    }

    function pause() {
        if (!handlers || paused) return;
        remainingMs = Math.max(0, endsAt - now());
        paused = true;
        clear();
    }

    function resume() {
        if (!handlers || !paused) return;
        paused = false;
        endsAt = now() + remainingMs;
        lastWhole = null;
        tick();
        if (handlers) intervalId = setInterval(tick, 200);
    }

    return {
        start,
        stop,
        pause,
        resume,
        secondsLeft,
        isRunning: () => Boolean(handlers) && !paused,
        isPaused: () => Boolean(handlers) && paused
    };

})();
