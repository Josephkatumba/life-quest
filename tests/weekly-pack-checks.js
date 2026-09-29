// ==========================================
// LIFE QUEST: WEEKLY PACK CHECKS
// Run this whenever a new weekly pack is swapped in:
//     node tests/weekly-pack-checks.js
// ==========================================

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
let passed = 0;
let failed = 0;

function check(name, condition, detail = "") {
    if (condition) { passed++; console.log("  ✅ " + name); }
    else { failed++; console.log("  ❌ " + name + (detail ? "  →  " + detail : "")); }
}

const warnings = [];
const context = vm.createContext({ console: { ...console, warn: m => warnings.push(String(m)) }, performance, setInterval, clearInterval, setTimeout, clearTimeout });
["questions.js", "starter-questions.js", "weekly-pack.js", "engine.js"].forEach(file =>
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file }));

const pack = vm.runInContext("WEEKLY_PACK", context);
const E = vm.runInContext("QuestionEngine", context);
const categories = vm.runInContext("categories", context);
const all = E.categoryKeys().flatMap(k => categories[k].questions);
const active = all.filter(q => q.pack === pack.id);                 // pack questions the game actually loaded
const rest = all.filter(q => q.pack !== pack.id);
const byLevel = level => pack.questions.filter(q => q.level === level);

const words = t => t.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
const FILLER = new Set(["a", "an", "the", "is", "are", "do", "does", "you", "your", "what", "which", "who", "how", "many",
    "much", "have", "has", "of", "to", "in", "on", "it", "and", "or", "should", "can", "when", "where", "with", "for", "at", "be", "first"]);
const content = t => new Set(words(t).filter(w => !FILLER.has(w)));
const similar = (a, b) => {
    const x = content(a.question), y = content(b.question);
    const shared = [...x].filter(w => y.has(w)).length;
    return a.answers[a.correct] === b.answers[b.correct] && shared / Math.max(1, Math.min(x.size, y.size)) >= 0.6;
};

console.log("\nWeekly pack " + pack.id + ": " + pack.title);

console.log("\n1. Counts");
check("exactly 60 questions in the pack (" + pack.questions.length + ")", pack.questions.length === 60);
check("all 60 are active in the game (" + active.length + ")", active.length === 60);
check("30 Easy / 20 Medium / 10 Hard (" + ["easy", "medium", "hard"].map(l => byLevel(l).length).join(" / ") + ")",
    byLevel("easy").length === 30 && byLevel("medium").length === 20 && byLevel("hard").length === 10);
check("no loading warnings", warnings.length === 0, warnings.join(" | "));

console.log("\n2. Answers");
const easyTwo = byLevel("easy").filter(q => q.answers.length === 2).length;
check("Easy questions use two choices (" + easyTwo + " of 30)", easyTwo === 30);
check("Easy questions go to the Starter level (always 2 choices)", byLevel("easy").every(q => q.difficulty === "starter"));
check("Medium questions have 3 choices", byLevel("medium").every(q => q.answers.length === 3 && q.difficulty === "medium"));
check("Hard questions have 3 or 4 choices", byLevel("hard").every(q => q.answers.length >= 3 && q.answers.length <= 4 && q.difficulty === "hard"));
check("every question has exactly one valid correct answer",
    pack.questions.every(q => Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.answers.length &&
        new Set(q.answers.map(a => a.toLowerCase())).size === q.answers.length && q.answers.every(a => a.trim())));
check("every question has an explanation", pack.questions.every(q => q.explanation && q.explanation.length <= 120));

console.log("\n3. No duplicates");
const ids = pack.questions.map(q => q.id);
check("ids are unique and start with the pack id", new Set(ids).size === 60 && ids.every(id => id.startsWith(pack.id + "-")));
check("no id clashes with the rest of the bank", new Set(all.map(q => q.id)).size === all.length);
check("no duplicate question text in the pack", new Set(pack.questions.map(q => words(q.question).join(" "))).size === 60);
const inside = [];
pack.questions.forEach((a, i) => pack.questions.slice(i + 1).forEach(b => { if (similar(a, b)) inside.push(a.id + " ~ " + b.id); }));
check("no near-duplicates inside the pack", inside.length === 0, inside.join(", "));
const reused = [];
pack.questions.forEach(a => rest.forEach(b => {
    if (words(a.question).join(" ") === words(b.question).join(" ") || similar(a, b)) reused.push(a.id + " ~ " + b.id + " (" + b.question + ")");
}));
check("does not reuse questions already in the game", reused.length === 0, reused.join(" | "));

console.log("\n4. Easy is genuinely easy");
const easyWords = byLevel("easy").map(q => words(q.question).length);
check("Easy questions are short (longest " + Math.max(...easyWords) + " words, average " +
    (easyWords.reduce((a, b) => a + b, 0) / 30).toFixed(1) + ")",
    Math.max(...easyWords) <= 12 && easyWords.reduce((a, b) => a + b, 0) / 30 <= 10);
check("Easy answers are short (at most 6 words)", byLevel("easy").every(q => q.answers.every(a => words(a).length <= 6)));
check("no double negatives or trick words", pack.questions.every(q =>
    (q.question.match(/\b(not|never|no)\b|n't/gi) || []).length <= 1 && !/\bEXCEPT\b|\bNOT\b|which of the following/.test(q.question)));

console.log("\n5. Normal sessions prefer unseen questions");
{
    // A returning player who has already seen every question outside this week's pack
    const history = E.createHistory();
    rest.forEach(q => E.noteShown(history, q));

    const deal = (rows, topics, sessionKey) => E.pickCategories(topics, history)
        .flatMap(key => E.pickColumn(key, rows, { history, session: sessionKey }));

    // Rule: whenever a world still has an unseen question at that level, the pick must be unseen.
    // Checked one pick at a time over 10 boards of each level.
    const levelRows = {
        starter: ["starter", "starter", "starter"],
        challenge: ["easy", "easy", "medium", "medium", "hard"],
        expert: ["medium", "medium", "hard", "hard", "hard"]
    };
    Object.keys(levelRows).forEach(level => {
        let picks = 0;
        let unseenAvailable = 0;
        let brokeRule = 0;
        let packPicked = 0;
        for (let board = 0; board < 10; board++) {
            E.pickCategories(level === "starter" ? 4 : 6, history).forEach(key => {
                const exclude = new Set();
                levelRows[level].forEach(row => {
                    const prefs = E.preferenceFor(row);
                    const unseenLeft = categories[key].questions.some(q =>
                        q.difficulty === prefs[0] && !history.q[q.id] && !exclude.has(q.id));
                    const q = E.pickOne(key, { difficulties: prefs, history, session: "returning-" + level, exclude });
                    exclude.add(q.id);
                    picks++;
                    if (unseenLeft) {
                        unseenAvailable++;
                        if (history.q[q.id]) brokeRule++;
                    }
                    if (q.pack === pack.id) packPicked++;
                    E.noteShown(history, q);
                });
            });
        }
        check("returning player, " + level + ": unseen questions always picked first (" + unseenAvailable +
            " picks had one available, " + brokeRule + " picked a seen one; " + packPicked + " new pack questions shown)",
            brokeRule === 0 && packPicked > 0);
    });

    // A brand-new player: no question repeats in one session across several boards of each level
    const fresh = E.createHistory();
    const levels = {
        starter: ["starter", "starter", "starter"],
        challenge: ["easy", "easy", "medium", "medium", "hard"],
        expert: ["medium", "medium", "hard", "hard", "hard"]
    };
    Object.keys(levels).forEach(level => {
        const ids = [];
        const boards = level === "starter" ? 8 : 3;
        for (let b = 0; b < boards; b++) {
            E.pickCategories(level === "starter" ? 4 : 6, fresh).forEach(key =>
                E.pickColumn(key, levels[level], { history: fresh, session: "new-" + level }).forEach(q => { ids.push(q.id); E.noteShown(fresh, q); }));
        }
        check("new player, " + boards + " " + level + " boards in one session: no repeats (" + ids.length + " questions)",
            new Set(ids).size === ids.length);
    });

    const order = [];
    for (let run = 0; run < 2; run++) {
        order.push(E.pickCategories(4, E.createHistory()).flatMap(key =>
            E.pickColumn(key, levels.starter, { history: E.createHistory(), session: "rand-" + run })).map(q => q.id).join());
    }
    check("randomised: two fresh games are different", order[0] !== order[1]);
}

console.log("\n" + passed + " passed, " + failed + " failed\n");
process.exitCode = failed ? 1 : 0;
