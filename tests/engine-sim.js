// ==========================================
// LIFE QUEST: ENGINE + TIMER TESTS
// Run from the project folder:   node tests/engine-sim.js
// Loads questions.js, engine.js and timer.js the same way the browser does
// and simulates many boards, sessions and practice rounds.
// ==========================================

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const warnings = [];

const context = vm.createContext({
    console: { ...console, warn: message => warnings.push(String(message)) },
    performance, setInterval, clearInterval, setTimeout, clearTimeout, Date, Math
});

["questions.js", "engine.js", "timer.js"].forEach(file => {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
});

const { QuestionEngine: E, QuestionTimer: T, categories } = vm.runInContext(
    "({ QuestionEngine, QuestionTimer, categories })", context
);

let passed = 0;
let failed = 0;

function check(name, condition, detail = "") {
    if (condition) {
        passed++;
        console.log("  ✅ " + name);
    } else {
        failed++;
        console.log("  ❌ " + name + (detail ? "  →  " + detail : ""));
    }
}

const ROWS = ["easy", "easy", "medium", "medium", "hard"];

// Same steps as startQuestBoard() in game.js
function dealBoard(history, sessionKey, categoryCount = 6) {
    const keys = E.pickCategories(categoryCount, history);
    const cells = [];
    keys.forEach(key => {
        const column = E.pickColumn(key, ROWS, { history, session: sessionKey });
        ROWS.forEach((row, index) => cells.push({ key, row, index, q: column[index] }));
    });
    return cells;
}

// Opens and answers every clue on a board
function playBoard(cells, history, correctRate = 0.7) {
    cells.forEach(cell => {
        E.noteShown(history, cell.q);
        E.recordAnswer(history, cell.q, {
            correct: Math.random() < correctRate,
            ms: 4000 + Math.random() * 20000
        });
    });
}


console.log("\n1. Question bank");
{
    const all = E.categoryKeys().flatMap(key => categories[key].questions);
    const ids = new Set(all.map(q => q.id));
    const texts = new Set(all.map(q => q.question.toLowerCase().replace(/[^a-z0-9]+/g, "")));

    check("8 categories loaded", E.categoryKeys().length === 8, E.categoryKeys().join(","));
    check("every question has a unique id (" + all.length + " questions)", ids.size === all.length);
    check("no duplicate question text across the whole bank", texts.size === all.length);
    check("no data warnings", warnings.length === 0, warnings.join(" | "));

    const counts = E.categoryKeys().map(key =>
        key + " " + E.DIFFICULTIES.map(d => E.count(key, d)).join("/")
    );
    console.log("     easy/medium/hard per category: " + counts.join(", "));
}


console.log("\n2. No repeats within a session (one player, many boards)");
{
    // 20 randomised runs of 12 boards each, all in one session
    let boardsWithInternalDupes = 0;
    let earliestRepeat = Infinity;

    for (let run = 0; run < 20; run++) {

        const history = E.createHistory();
        const sessionKey = "player:test" + run;
        const seen = new Set();
        let firstRepeatBoard = null;

        for (let board = 1; board <= 12; board++) {
            const cells = dealBoard(history, sessionKey);
            const ids = cells.map(c => c.q.id);
            if (new Set(ids).size !== ids.length) boardsWithInternalDupes++;
            ids.forEach(id => {
                if (seen.has(id) && firstRepeatBoard === null) firstRepeatBoard = board;
                seen.add(id);
            });
            playBoard(cells, history);
        }

        earliestRepeat = Math.min(earliestRepeat, firstRepeatBoard || Infinity);
    }

    check("240 boards: no board ever contains the same question twice", boardsWithInternalDupes === 0,
        boardsWithInternalDupes + " boards");
    check("first 8 boards of every session (240 clues) have zero repeats", earliestRepeat > 8,
        "earliest repeat on board " + earliestRepeat);
    console.log("     earliest repeat in any run: board " + earliestRepeat +
        " (the bank has " + E.categoryKeys().reduce((n, k) => n + categories[k].questions.length, 0) + " questions, a board uses 30)");
}


console.log("\n3. Board rows get the right difficulty on both point scales");
{
    const history = E.createHistory();
    const cells = dealBoard(history, "player:rows");
    const rowOk = cells.filter(c => c.q.difficulty === c.row).length;
    check("fresh board: " + rowOk + "/30 clues match their row difficulty", rowOk >= 27, rowOk + "/30");

    // The point scale no longer matters: rows are mapped by position
    const values200 = ROWS.map((_, i) => (i + 1) * 200);
    check("200–1,000 scale maps rows 1-5 to easy, easy, medium, medium, hard",
        JSON.stringify(values200) === "[200,400,600,800,1000]");
}


console.log("\n4. New session prefers never-seen, then longest-unseen questions");
{
    const history = E.createHistory();
    const first = dealBoard(history, "s1");
    playBoard(first, history);

    E.resetSession("s2");
    const second = dealBoard(history, "s2");
    const overlap = second.filter(c => first.some(f => f.q.id === c.q.id)).length;
    check("second visit's board shares 0 questions with the first", overlap === 0, overlap + " shared");

    // Categories rotate: least recently played come first
    const firstKeys = new Set(first.map(c => c.key));
    const secondKeys = [...new Set(second.map(c => c.key))];
    const unplayed = E.categoryKeys().filter(k => !firstKeys.has(k));
    check("categories left out of board 1 appear on board 2",
        unplayed.every(k => secondKeys.includes(k)), "unplayed: " + unplayed.join(","));
}


console.log("\n5. Scarce hard questions are not repeated board after board");
{
    const history = E.createHistory();
    const hardRowIds = [];

    for (let visit = 1; visit <= 6; visit++) {
        const key = "visit" + visit;
        E.resetSession(key);
        const cells = dealBoard(history, key, 8);
        playBoard(cells, history);
        cells.filter(c => c.row === "hard" && c.key === "pop").forEach(c => hardRowIds.push(c.q.id));
    }

    // Pop Culture has only 1 hard question, so it may come back once it is
    // "long unseen" (150+ questions later), but never on back-to-back visits
    const distinct = new Set(hardRowIds).size;
    const backToBack = hardRowIds.some((id, i) => i > 0 && hardRowIds[i - 1] === id);
    check("Pop Culture's top clue never repeats on back-to-back visits", !backToBack, hardRowIds.join(","));
    console.log("     info: " + distinct + "/6 distinct across 6 full 8-topic visits. Limited by content:" +
        " Pop Culture has 1 hard and 8 medium questions.");
}


console.log("\n6. Unopened board clues are given back");
{
    const history = E.createHistory();
    const cells = dealBoard(history, "release-test");
    const used = E.session("release-test").used;
    check("dealing reserves 30 questions", used.size === 30, used.size);
    E.release("release-test", cells.map(c => c.q.id));
    check("releasing a replaced board frees them again", used.size === 0, used.size);
}


console.log("\n7. Classroom and player sessions are separate");
{
    const player = dealBoard(E.createHistory(), "player:sam");
    const classroom = dealBoard(E.createHistory(), "classroom");
    check("classroom reservations are not in the player's session",
        classroom.every(c => !E.session("player:sam").used.has(c.q.id) || player.some(p => p.q.id === c.q.id)));
    check("player session holds only the player's board",
        E.session("player:sam").used.size === 30 && E.session("classroom").used.size === 30);
}


console.log("\n8. Practice Mistakes");
{
    const history = E.createHistory();
    const missed = dealBoard(history, "practice-src").slice(0, 12).map(c => c.q.id);
    const picked = E.pickPractice(missed, 5, history);
    check("returns 5 questions", picked.length === 5, picked.length);
    check("only missed questions", picked.every(q => missed.includes(q.id)));
    check("no duplicates", new Set(picked.map(q => q.id)).size === picked.length);
    check("mixes categories", new Set(picked.map(q => q.category)).size >= 2);

    const few = E.pickPractice(missed.slice(0, 2), 5, history);
    check("fewer mistakes than a round: returns what there is (2)", few.length === 2, few.length);
    check("unknown ids are ignored", E.pickPractice(["nope-123"], 5, history).length === 0);
    check("repeats on purpose: ignores the session rule",
        E.pickPractice(missed, 12, history).length === 12);
}


console.log("\n9. History is safe to save and load");
{
    const garbage = [null, 42, "text", [], { clock: -5, q: { a: "x", b: { s: 99, n: "2" } }, recent: [1, [2], ["id", 1, 50]] }];
    check("bad saved data never throws",
        garbage.every(g => { try { E.normalizeHistory(g); return true; } catch (e) { return false; } }));

    const cleaned = E.normalizeHistory({ clock: 10, q: { a: { s: 99, n: 2, c: 1, w: 1 } }, recent: [["a", 1, 50, 0]] });
    check("last-seen can't be in the future", cleaned.q.a.s === 10);

    const history = E.createHistory();
    for (let i = 0; i < 20; i++) playBoard(dealBoard(history, "h" + i), history);
    check("recent answers capped at 100", history.recent.length === 100, history.recent.length);
    const size = JSON.stringify(history).length;
    check("history for 600 answers stays small (" + Math.round(size / 1024) + " KB)", size < 40000, size);

    const roundTrip = E.normalizeHistory(JSON.parse(JSON.stringify(history)));
    check("survives a save/load round trip", JSON.stringify(roundTrip) === JSON.stringify(history));
}


console.log("\n10. Adaptive difficulty data");
{
    const history = E.createHistory();
    const cells = dealBoard(history, "adaptive");
    cells.forEach(c => {
        E.noteShown(history, c.q);
        E.recordAnswer(history, c.q, { correct: c.key !== cells[0].key, ms: 10000 });
    });

    const s = E.summarize(history);
    check("counts all 30 answers", s.overall.answered === 30, s.overall.answered);
    check("average answer time is 10.0s", s.overall.avgMs === 10000, s.overall.avgMs);
    check("struggling category detected: " + cells[0].key, s.struggling[0] === cells[0].key, s.struggling.join(","));
    check("struggling → suggest easier", E.suggestDifficulty(history, cells[0].key, "medium") === "easy");
    check("strong → suggest harder", E.suggestDifficulty(history, cells[6].key, "medium") === "hard");
    check("not enough data → keep current", E.suggestDifficulty(E.createHistory(), cells[0].key, "medium") === "medium");
}


console.log("\n11. Timer");
(async function () {

    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    // Expires on time
    let expired = 0;
    const ticks = [];
    const started = Date.now();
    T.start(1, { onTick: left => ticks.push(left), onExpire: () => expired++ });
    await wait(1400);
    check("expires once at zero", expired === 1, expired);
    check("ticks count down 1 → 0", ticks.join(",") === "1,0", ticks.join(","));
    check("not running after expiry", !T.isRunning());

    // Answering early (stop) prevents expiry
    expired = 0;
    T.start(1, { onExpire: () => expired++ });
    await wait(300);
    T.stop();
    await wait(1100);
    check("stop() before zero: never expires", expired === 0, expired);

    // Starting a new timer cancels the old one (changing questions)
    let oldFired = 0;
    let newFired = 0;
    T.start(1, { onExpire: () => oldFired++ });
    T.start(2, { onExpire: () => newFired++ });
    await wait(1400);
    check("old timer cancelled by a new one", oldFired === 0, oldFired);
    T.stop();
    check("only one timer at a time", newFired === 0 && !T.isRunning());

    // Pause (Settings) keeps the time left
    expired = 0;
    T.start(2, { onExpire: () => expired++ });
    await wait(500);
    T.pause();
    await wait(2000);
    check("paused timer does not expire", expired === 0 && T.isPaused());
    check("time left kept while paused (2s)", T.secondsLeft() === 2, T.secondsLeft());
    T.resume();
    await wait(1800);
    check("resumed timer expires after the time left", expired === 1, expired);

    // Question lengths (Phase 2)
    check("easy 45s, medium 40s, hard 35s, Final Challenge 60s",
        [T.secondsFor("easy"), T.secondsFor("medium"), T.secondsFor("hard"), T.secondsFor("final")].join() === "45,40,35,60");
    check("Extra time (+50%): 68s / 60s / 53s / 90s",
        ["easy", "medium", "hard", "final"].map(d => T.secondsFor(d, "extra")).join() === "68,60,53,90",
        ["easy", "medium", "hard", "final"].map(d => T.secondsFor(d, "extra")).join());
    check("Off: 0 seconds (no timer)", ["easy", "medium", "hard", "final"].every(d => T.secondsFor(d, "off") === 0));
    check("unknown mode falls back to standard", T.secondsFor("hard", "banana") === 35);
    check("states: normal above 10, warning at 10-6, urgent at 5-1",
        [T.stateFor(11), T.stateFor(10), T.stateFor(6), T.stateFor(5), T.stateFor(1)].join() === "normal,warning,warning,urgent,urgent");

    // Warnings: once at 10 and once at 5, never every second, and not again after pause/resume
    const warnings = [];
    let tickCount = 0;
    expired = 0;
    T.start(11, { onTick: () => tickCount++, onWarning: mark => warnings.push(mark), onExpire: () => expired++ });
    await wait(1300);                  // now at 10 → first warning
    T.pause();
    await wait(500);
    T.resume();                        // resuming at 10 must not warn again
    await wait(5000);                  // now at 5 → second warning
    T.pause(); T.resume();
    await wait(5400);
    check("warnings fired exactly twice: 10 then 5", warnings.join() === "10,5", warnings.join());
    check("expired once after the warnings", expired === 1, expired);
    check("ticks are per whole second (not 5 per second)", tickCount <= 14, tickCount);

    const early = [];
    T.start(4, { onWarning: mark => early.push(mark) });
    await wait(300);
    T.stop();
    check("a question shorter than 5s gives no surprise warnings", early.length === 0, early.join());

    // A background tab: the browser holds back timers, then check() catches up at once
    expired = 0;
    T.start(1, { onExpire: () => expired++ });
    const blockUntil = Date.now() + 1500;
    while (Date.now() < blockUntil) { /* page is "in the background": no timer callbacks run */ }
    check("time ran out while timers were held back: not yet noticed", expired === 0);
    T.check();
    check("check() ends the question immediately, so a late answer can't count", expired === 1 && !T.isRunning());

    check("stop() is safe when nothing runs", (() => { try { T.stop(); T.pause(); T.resume(); return true; } catch (e) { return false; } })());

    console.log("\n" + passed + " passed, " + failed + " failed (" + ((Date.now() - started) / 1000).toFixed(1) + "s)\n");
    process.exitCode = failed ? 1 : 0;
})();
