// ==========================================
// LIFE QUEST: QUESTION TIMER
// Loaded before game.js (see index.html).
//
// One countdown for the whole game. Rules that keep it safe:
//   • Only one timer can run. Starting a new one stops the old one.
//   • It counts down to a fixed end time instead of subtracting 1 each
//     second, so it stays accurate even when the browser tab is in the
//     background or the computer is busy.
//   • It can be paused (Settings) and resumed with the time left.
//   • stop() is safe to call at any time, even when nothing is running.
//   • Warnings (10 and 5 seconds left) fire once each, never every second.
//
// How long a question gets:
//   QuestionTimer.secondsFor("medium", "standard")  → 40
//   QuestionTimer.secondsFor("medium", "extra")     → 60
//   QuestionTimer.secondsFor("final", "standard")   → 60 (Final Challenge)
//   QuestionTimer.secondsFor(anything, "off")       → 0  (no timer)
// ==========================================

"use strict";

const QuestionTimer = (function () {

    // Seconds per question, by difficulty
    const DURATIONS = { easy: 45, medium: 40, hard: 35, final: 60 };

    // Timer settings: how much of the normal time a question gets (0 = no timer)
    const MODES = { standard: 1, extra: 1.5, off: 0 };

    const WARNING_AT = 10;    // amber
    const URGENT_AT = 5;      // red

    let intervalId = null;
    let endsAt = 0;
    let remainingMs = 0;
    let totalSeconds = 0;
    let paused = false;
    let handlers = null;
    let lastWhole = null;
    let fired = null;         // warnings already given for this question

    function secondsFor(difficulty, mode = "standard") {
        const factor = Object.prototype.hasOwnProperty.call(MODES, mode) ? MODES[mode] : MODES.standard;
        const base = DURATIONS[difficulty] || DURATIONS.easy;
        return Math.round(base * factor);
    }

    // "normal", "warning" (10 seconds or less) or "urgent" (5 or less)
    function stateFor(secondsLeft) {
        if (secondsLeft <= URGENT_AT) return "urgent";
        if (secondsLeft <= WARNING_AT) return "warning";
        return "normal";
    }

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

            [WARNING_AT, URGENT_AT].forEach(mark => {
                if (left <= mark && left > 0 && !fired.has(mark)) {
                    fired.add(mark);
                    if (handlers.onWarning) handlers.onWarning(mark, left);
                }
            });

            if (handlers.onTick) handlers.onTick(left, totalSeconds);
        }

        if (left <= 0) {
            const done = handlers.onExpire;
            stop();
            if (done) done();
        }
    }

    // seconds: how long.
    // options.onTick(secondsLeft, totalSeconds)  once per whole second
    // options.onWarning(mark, secondsLeft)       once at 10 and once at 5 seconds
    // options.onExpire()                         once, at zero
    function start(seconds, options = {}) {

        stop();

        handlers = options;
        paused = false;
        totalSeconds = Math.max(0, seconds);
        remainingMs = totalSeconds * 1000;
        endsAt = now() + remainingMs;
        lastWhole = null;

        // A question that starts with less time than a warning mark doesn't announce it
        fired = new Set([WARNING_AT, URGENT_AT].filter(mark => totalSeconds <= mark));

        tick();
        if (handlers) intervalId = setInterval(tick, 200);
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

    // Runs the clock check right now. Call it before accepting an answer, so an
    // answer can never slip in after the end time (e.g. a tab that was in the
    // background, where browsers slow timers down).
    function check() {
        tick();
    }

    // Browsers slow down timers in background tabs: catch up as soon as the tab is visible
    if (typeof document !== "undefined" && document.addEventListener) {
        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) tick();
        });
    }

    return {
        DURATIONS,
        MODES,
        WARNING_AT,
        URGENT_AT,
        secondsFor,
        stateFor,
        start,
        stop,
        pause,
        resume,
        check,
        secondsLeft,
        totalSeconds: () => totalSeconds,
        isRunning: () => Boolean(handlers) && !paused,
        isPaused: () => Boolean(handlers) && paused
    };

})();
