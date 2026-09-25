// ==========================================
// LIFE QUEST: STARTER LEVEL TESTS
// Run from the project folder:   node tests/starter-checks.js
// ==========================================

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");

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

const noop = () => {};
const warnings = [];
const spoken = [];

// The whole game, loaded like the browser does (no screen is drawn)
function loadGame(files) {
    const windowStub = {
        addEventListener: noop,
        matchMedia: () => ({ matches: false }),
        speechSynthesis: {
            getVoices: () => [{ name: "Microsoft Zira - English (United States)", lang: "en-US" }],
            speak: utterance => spoken.push(utterance),
            cancel: noop
        },
        SpeechSynthesisUtterance: function (text) { this.text = text; }
    };
    const context = vm.createContext({
        console: { ...console, warn: message => warnings.push(String(message)) },
        window: windowStub,
        document: { readyState: "loading", addEventListener: noop, getElementById: () => null },
        performance, setTimeout, clearTimeout, setInterval, clearInterval, URL, Date, Math
    });
    files.forEach(file => vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file }));
    return expression => vm.runInContext(expression, context);
}

const g = loadGame(["questions.js", "starter-questions.js", "engine.js", "timer.js", "voice-config.js", "voice.js", "game.js"]);
const E = g("QuestionEngine");
const T = g("QuestionTimer");
const categories = g("categories");
const keys = E.categoryKeys();

const all = keys.flatMap(key => categories[key].questions);
const starter = all.filter(q => q.difficulty === "starter");
const standard = all.filter(q => q.difficulty !== "starter");

const words = text => text.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);

// Meaningful words only: "how many ... does a ... have" alone doesn't make two questions the same
const FILLER = new Set(["a", "an", "the", "is", "are", "do", "does", "you", "your", "what", "which", "who", "how",
    "many", "much", "have", "has", "one", "of", "to", "in", "on", "it", "and", "or", "should", "can", "when",
    "where", "with", "for", "at", "be"]);
const content = text => words(text).filter(w => !FILLER.has(w));


(async function () {

    console.log("\n1. Starter question bank");
    {
        check("at least 100 Starter questions (" + starter.length + ")", starter.length >= 100);
        check("every Starter question is marked 'starter'", starter.every(q => q.difficulty === "starter"));
        check("every Starter question has exactly 2 choices", starter.every(q => q.answers.length === 2),
            starter.filter(q => q.answers.length !== 2).map(q => q.id).join(", "));
        check("every Starter question has exactly one valid correct answer",
            starter.every(q => (q.correct === 0 || q.correct === 1) && q.answers[0] !== q.answers[1] && q.answers.every(a => String(a).trim())));
        const ids = starter.map(q => q.id);
        check("Starter ids are unique and permanent-style ('starter-...')",
            new Set(ids).size === ids.length && ids.every(id => /^starter-[a-z]+-\d{2}$/.test(id)));
        check("no id clashes with the rest of the bank", new Set(all.map(q => q.id)).size === all.length);
        check("the bank loaded with no data warnings", warnings.length === 0, warnings.join(" | "));

        const norm = t => words(t).join(" ");
        check("no duplicate Starter question text", new Set(starter.map(q => norm(q.question))).size === starter.length);
        const near = [];
        for (let i = 0; i < starter.length; i++) {
            for (let j = i + 1; j < starter.length; j++) {
                const a = new Set(content(starter[i].question)), b = new Set(content(starter[j].question));
                const shared = [...a].filter(w => b.has(w)).length;
                const sameAnswer = starter[i].answers[starter[i].correct] === starter[j].answers[starter[j].correct];
                if (sameAnswer && shared / Math.min(a.size, b.size) >= 0.7) near.push(starter[i].id + " ~ " + starter[j].id);
            }
        }
        check("no near-duplicates (same answer, mostly the same words)", near.length === 0, near.join(", "));
        check("no Starter question copies a Challenge/Expert question",
            starter.every(q => !standard.some(o => norm(o.question) === norm(q.question))));

        const longest = Math.max(...starter.map(q => words(q.question).length));
        const average = starter.reduce((n, q) => n + words(q.question).length, 0) / starter.length;
        check("questions are short (at most 16 words, longest is " + longest + ")", longest <= 16);
        check("average question is about " + average.toFixed(1) + " words (Challenge: " +
            (standard.reduce((n, q) => n + words(q.question).length, 0) / standard.length).toFixed(1) + ")", average <= 10);
        check("answers are short (at most 6 words)", starter.every(q => q.answers.every(a => words(String(a)).length <= 6)),
            starter.filter(q => q.answers.some(a => words(String(a)).length > 6)).map(q => q.id).join(", "));
        check("no double negatives", starter.every(q => (q.question.match(/\b(not|never|no)\b|n't/gi) || []).length <= 1));
        check("no trick wording (EXCEPT, NOT, 'which of the following')",
            starter.every(q => !/\bEXCEPT\b|\bNOT\b|which of the following/.test(q.question)));
        check("every question has a short explanation", starter.every(q => q.explanation && q.explanation.length <= 120));
        check("every question names the skill it practises (for future adaptive play)",
            starter.every(q => typeof q.skill === "string" && q.skill && typeof q.type === "string"));
        const perWorld = keys.map(key => key + " " + E.count(key, "starter"));
        check("every world has at least 10 Starter questions (" + perWorld.join(", ") + ")",
            keys.every(key => E.count(key, "starter") >= 10));
        const skills = new Set(starter.map(q => q.skill));
        check("covers many everyday and school skills (" + skills.size + " different skills)", skills.size >= 25);
    }


    console.log("\n2. Starter uses the same QuestionEngine, and stays 2-choice");
    {
        const starterRows = g("BOARD_LEVELS.starter.rows");
        const deal = (history, sessionKey, rows = starterRows, topics = 4) =>
            E.pickCategories(topics, history).flatMap(key => E.pickColumn(key, rows, { history, session: sessionKey }));

        check("Starter never falls back to 4-choice levels", JSON.stringify(E.preferenceFor("starter")) === '["starter"]');

        let wrong = 0;
        for (let i = 0; i < 200; i++) {
            deal(E.createHistory(), "st-" + i).forEach(q => { if (!q || q.difficulty !== "starter" || q.answers.length !== 2) wrong++; });
        }
        check("200 Starter boards: every clue is a 2-choice Starter question", wrong === 0, wrong + " wrong");

        // Play boards until the whole Starter bank is used up in one session
        const history = E.createHistory();
        const seen = new Set();
        let firstRepeat = null;
        for (let board = 1; board <= 14; board++) {
            const cells = deal(history, "st-long");
            cells.forEach(q => {
                if (seen.has(q.id) && firstRepeat === null) firstRepeat = board;
                seen.add(q.id);
                if (q.difficulty !== "starter") wrong++;
                E.noteShown(history, q);
                E.recordAnswer(history, q, { correct: true, ms: 5000 });
            });
        }
        check("no repeats within a session for the first 8 Starter boards (96 questions)",
            firstRepeat === null || firstRepeat > 8, "first repeat on board " + firstRepeat);
        check("even after the bank runs out, still only 2-choice Starter questions", wrong === 0);

        const h2 = E.createHistory();
        const first = deal(h2, "visit-1");
        first.forEach(q => E.noteShown(h2, q));
        const second = deal(h2, "visit-2");
        check("history: next visit's Starter board shares 0 questions with the last one",
            second.filter(q => first.includes(q)).length === 0);

        const firstKeys = new Set(E.pickCategories(4, E.createHistory()));
        check("category rotation: a Starter board covers 4 different worlds", firstKeys.size === 4);

        let starterOnChallenge = 0;
        for (let i = 0; i < 100; i++) {
            deal(E.createHistory(), "ch-" + i, g("BOARD_LEVELS.challenge.rows"), 6).forEach(q => { if (q.difficulty === "starter") starterOnChallenge++; });
            deal(E.createHistory(), "ex-" + i, g("BOARD_LEVELS.expert.rows"), 6).forEach(q => { if (q.difficulty === "starter") starterOnChallenge++; });
        }
        check("Challenge and Expert boards never get Starter questions (200 boards)", starterOnChallenge === 0);

        const missed = deal(E.createHistory(), "missed").slice(0, 7).map(q => q.id);
        const practice = E.pickPractice(missed, 5, E.createHistory());
        check("Practice Mistakes picks missed Starter questions", practice.length === 5 && practice.every(q => missed.includes(q.id)));
        check("Practice keeps the 2-choice format", practice.every(q => q.answers.length === 2));

        const personal = deal(E.createHistory(), "player:sam");
        const classroom = deal(E.createHistory(), "classroom");
        check("Classroom Starter games keep their own session and history",
            E.session("player:sam").used.size === 12 && E.session("classroom").used.size === 12 && personal.length === 12 && classroom.length === 12);
    }


    console.log("\n3. Challenge and Expert are unchanged");
    {
        const base = loadGame(["questions.js", "engine.js"]);
        const B = base("QuestionEngine");
        const countsNow = keys.map(k => ["easy", "medium", "hard"].map(d => E.count(k, d)).join("/")).join(" ");
        const countsBefore = keys.map(k => ["easy", "medium", "hard"].map(d => B.count(k, d)).join("/")).join(" ");
        check("easy/medium/hard question counts are exactly the same as before", countsNow === countsBefore, countsNow);
        check("Challenge board rows unchanged (easy, easy, medium, medium, hard)",
            g("BOARD_LEVELS.challenge.rows.join()") === "easy,easy,medium,medium,hard" && g("BOARD_ROW_DIFFICULTY.join()") === "easy,easy,medium,medium,hard");
        check("medium and hard timers unchanged (40s / 35s)", T.secondsFor("medium") === 40 && T.secondsFor("hard") === 35);
        check("every Challenge question still has 4 choices", standard.every(q => q.answers.length === 4));
    }


    console.log("\n4. Timer");
    {
        check("Starter questions get 45 seconds", T.secondsFor("starter") === 45);
        check("Extra time: 68 seconds; Off: no timer", T.secondsFor("starter", "extra") === 68 && T.secondsFor("starter", "off") === 0);
        const q = starter[0];
        check("the game gives a Starter clue 45 seconds", g("questionSeconds(" + JSON.stringify(q) + ", 'standard')") === 45);

        let expired = 0;
        T.start(45, { onExpire: () => expired++ });
        check("timer starts at 45", T.secondsLeft() === 45 && T.isRunning());
        T.stop();
        check("answering stops it at once", !T.isRunning());
        await new Promise(r => setTimeout(r, 1200));
        check("and it never fires afterwards", expired === 0);
    }


    console.log("\n5. Reading aloud never touches the timer");
    {
        g("settings.voice = 'browser'");
        const q = categories.brain.questions.find(x => x.id === "starter-brain-09");
        g("questBoard = { mode: 'solo', level: 'starter' }; activeClue = { answered: false, value: 100, categoryKey: 'brain', q: " +
            JSON.stringify(q) + ", answers: [{ text: 'A cat', correct: true }, { text: 'A dog', correct: false }] }");

        T.start(45, {});
        const before = T.secondsLeft();
        spoken.length = 0;
        g("readClueAloud()");
        const text = spoken.map(u => u.text).join(" ");
        check("reads the question and both choices, word for word",
            text === "Brain Power, for 100 points. Which animal says 'meow'? Choice 1: A cat. Choice 2: A dog.", text);
        check("does not read the countdown", !/seconds|timer|\b45\b/.test(text));
        check("uses the chosen female voice", spoken.every(u => u.voice && u.voice.name.startsWith("Microsoft Zira")));
        check("the timer keeps running at the same time while reading", T.isRunning() && T.secondsLeft() === before);
        g("stopSpeaking()");
        check("stopping the voice does not stop the timer", T.isRunning());
        T.stop();
        g("questBoard = null; activeClue = null");
    }


    console.log("\n6. XP stays balanced");
    {
        const xp = (d, mode) => g("getQuestionXP({ difficulty: '" + d + "' }, '" + mode + "')");
        const level = g("BOARD_LEVELS.starter");
        const perfectStarter = level.topics * level.rows.length * xp("starter", "board") + level.clearXP + level.perfectXP;
        const challenge = g("BOARD_LEVELS.challenge");
        const perfectChallenge = challenge.topics * challenge.rows.reduce((n, d) => n + xp(d, "board"), 0) + challenge.clearXP + challenge.perfectXP;
        check("a correct Starter answer earns XP (10), less than Easy (20)", xp("starter", "board") === 10 && xp("starter", "board") < xp("easy", "board"));
        check("a perfect Starter board is worth " + perfectStarter + " XP (Challenge: " + perfectChallenge + ")",
            perfectStarter > 0 && perfectStarter < perfectChallenge / 2);
        check("no XP farming: Level 10 takes " + Math.ceil(g("LEVEL_XP[9]") / perfectStarter) + " perfect Starter boards",
            Math.ceil(g("LEVEL_XP[9]") / perfectStarter) >= 40);
        check("Practice XP for Starter is smaller still (5)", xp("starter", "practice") === 5);
        check("Challenge board XP unchanged (990 for a perfect board)", perfectChallenge === 990);
    }


    console.log("\n7. Old saves still load");
    {
        const old = g("normalizePlayer({ name: 'Veteran', xp: 42350, missed: ['world-yv76y6'] })");
        check("an old save keeps its XP and gets Challenge as its level", old.xp === 42350 && old.lastLevel === "challenge");
        check("a saved Starter choice is remembered", g("normalizePlayer({ name: 'A', lastLevel: 'starter' }).lastLevel") === "starter");
        check("a damaged level value falls back safely", g("normalizePlayer({ name: 'B', lastLevel: 42 }).lastLevel") === "challenge");
        check("missed Starter questions survive a save and load",
            g("normalizePlayer({ name: 'C', missed: ['starter-life-08', 'starter-gone-99'] }).missed.join()") === "starter-life-08");
    }

    console.log("\n" + passed + " passed, " + failed + " failed\n");
    process.exitCode = failed ? 1 : 0;
})();
