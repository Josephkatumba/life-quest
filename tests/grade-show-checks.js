// ==========================================
// LIFE QUEST: 5TH GRADE GAME SHOW TESTS
// Run from the project folder:   node tests/grade-show-checks.js
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

const noop = () => {};
const warnings = [];
const context = vm.createContext({
    console: { ...console, warn: m => warnings.push(String(m)) },
    window: { addEventListener: noop, matchMedia: () => ({ matches: false }) },
    document: { readyState: "loading", addEventListener: noop, getElementById: () => null },
    performance, setTimeout, clearTimeout, setInterval, clearInterval, URL, Date, Math
});
["questions.js", "starter-questions.js", "weekly-pack.js", "engine.js", "timer.js", "voice-config.js", "voice.js",
    "game.js", "grade-school-questions.js", "grade-show.js"].forEach(file =>
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file }));

const g = expr => vm.runInContext(expr, context);
const BANK = g("GRADE_SCHOOL_BANK");
const GS = g("GradeShow");
const LQ = g("QuestionEngine");
const E = GS.getEngine();

const always = value => () => value;            // fake random numbers
const play = (game, pickCorrect = () => true) => {
    while (!game.finished) {
        const turn = GS.current(game);
        const right = turn.answers.findIndex(a => a.correct);
        const wrong = turn.answers.findIndex(a => !a.correct);
        GS.answer(game, pickCorrect(turn) ? right : wrong);
        GS.next(game);
    }
};
const fresh = (setup, extra = {}) => GS.createGame(setup, { history: E.createHistory(), session: "t-" + Math.random(), ...extra });


console.log("\n1. Question bank");
{
    const qs = BANK.questions;
    const regular = qs.filter(q => !q.final);
    const finals = qs.filter(q => q.final);
    check("loads with no data warnings", warnings.length === 0, warnings.join(" | "));
    check(qs.length + " questions: " + regular.length + " across Grades 1–5, " + finals.length + " Final Challenge",
        regular.length >= 150 && finals.length >= 10);
    check("every grade has every subject (at least 5 each)", BANK.grades.every(gr =>
        GS.SUBJECT_KEYS.every(s => regular.filter(q => q.grade === gr && q.subject === s).length >= 5)));
    check("every question is tagged: grade, subject, difficulty, id", qs.every(q =>
        [1, 2, 3, 4, 5].includes(q.grade) && GS.SUBJECT_KEYS.includes(q.subject) &&
        ["easy", "medium", "hard"].includes(q.difficulty) && /^(g[1-5]|final)-[a-z]+-\d{2}$/.test(q.id)));
    check("ids are unique", new Set(qs.map(q => q.id)).size === qs.length);
    check("every question has one valid correct answer and no duplicate choices", qs.every(q =>
        q.answers.length >= 2 && q.correct >= 0 && q.correct < q.answers.length &&
        new Set(q.answers.map(a => a.toLowerCase())).size === q.answers.length));
    check("every question has an explanation and a Peek hint", qs.every(q => q.explanation && q.hint));
    const giveaways = qs.filter(q => q.answers[q.correct].length > 3 && q.hint.toLowerCase().includes(q.answers[q.correct].toLowerCase()));
    check("no Peek hint gives away the answer", giveaways.length === 0, giveaways.map(q => q.id).join(", "));
    const text = t => t.toLowerCase().replace(/[^a-z0-9]/g, "");
    check("no duplicate question text", new Set(qs.map(q => text(q.question))).size === qs.length);
    check("Final Challenge questions are all Grade 5", finals.every(q => q.grade === 5));
}


console.log("\n2. Kept apart from Life Quest");
{
    check("Life Quest still has its own 8 worlds", LQ.categoryKeys().join() === "world,pop,brain,life,school,sports,work,social");
    check("no grade-school question is in the Life Quest engine", BANK.questions.every(q => !LQ.byId(q.id)));
    check("the game show has its own engine", E !== LQ && E.categoryKeys().every(k => /^(g[1-5]|final)-/.test(k)));
}


console.log("\n3. Building a game");
{
    const solo = fresh({ mode: "solo", names: ["Ava"], perGrade: 2 }).game;
    const grades = solo.turns.map(t => t.final ? "F" : t.grade).join("");
    check("one player, 2 per grade: 11 questions in order 1 1 2 2 3 3 4 4 5 5 + Final", grades === "1122334455F", grades);
    check("each question matches its grade", solo.turns.every(t => t.question.grade === t.grade));
    check("the last question is a Final Challenge question", solo.turns[10].final && solo.turns[10].question.final);
    check("no duplicate questions in the game", new Set(solo.turns.map(t => t.question.id)).size === solo.turns.length);

    const teams = fresh({ mode: "teams", names: ["Red", "Blue", "Green"], perGrade: 1 }).game;
    check("3 teams: turns rotate Red, Blue, Green in every grade",
        teams.turns.map(t => t.player).join("") === "012012012012012012", teams.turns.map(t => t.player).join(""));
    check("each team gets its own Final Challenge", teams.turns.filter(t => t.final).map(t => t.player).join() === "0,1,2");

    let dupes = 0;
    for (let i = 0; i < 50; i++) {
        const game = fresh({ mode: "teams", names: ["A", "B", "C", "D", "E", "F"], perGrade: 2 }).game;
        if (new Set(game.turns.map(t => t.question.id)).size !== game.turns.length) dupes++;
    }
    check("50 random 6-team games (66 questions each): never a duplicate question", dupes === 0, dupes + " games");

    const mathOnly = fresh({ mode: "solo", names: ["Ava"], subjects: ["math"], perGrade: 2 }).game;
    check("subject filter: only Math questions (Final too)", mathOnly.turns.every(t => t.question.subject === "math"));

    const tooMany = fresh({ mode: "teams", names: ["A", "B", "C", "D", "E", "F"], subjects: ["math"], perGrade: 3 });
    check("not enough questions for the setup: a clear message, no game", !tooMany.game && /aren't enough/.test(tooMany.error), tooMany.error);
    check("no name: a clear message", /name/.test(fresh({ mode: "solo", names: ["  "] }).error));
    check("teams need two names", /two teams/.test(fresh({ mode: "teams", names: ["Solo"] }).error));
    check("no subjects: a clear message", /subject/.test(fresh({ mode: "solo", names: ["Ava"], subjects: [] }).error));

    const a = fresh({ mode: "solo", names: ["Ava"] }).game;
    const b = fresh({ mode: "solo", names: ["Ava"] }).game;
    check("randomised: two new games are different", a.turns.map(t => t.question.id).join() !== b.turns.map(t => t.question.id).join());
}


console.log("\n4. Scoring and grade progression");
{
    const game = fresh({ mode: "solo", names: ["Ava"], perGrade: 2 }).game;
    const reached = [];
    while (!game.finished) {
        const turn = GS.current(game);
        GS.answer(game, turn.answers.findIndex(a => a.correct));
        reached.push(game.players[0].highestGrade);
        GS.next(game);
    }
    const p = game.players[0];
    check("perfect game: 2×(100+200+300+400+500) + 1,000 Final = 4,000", p.score === 4000, p.score);
    check("points follow the grade (100 → 500), Final adds 1,000", game.turns.map(t => t.points).join() === "100,100,200,200,300,300,400,400,500,500,1000");
    check("highest grade reached climbs 1 → 5", reached.join("") === "11223344555");
    check("11 correct, 0 incorrect", p.correct === 11 && p.wrong === 0);

    const wrongGame = fresh({ mode: "solo", names: ["Ben"], perGrade: 1 }).game;
    play(wrongGame, () => false);
    check("all wrong: 0 points, 6 incorrect, highest grade none", wrongGame.players[0].score === 0 && wrongGame.players[0].wrong === 6 && wrongGame.players[0].highestGrade === 0);

    const t = fresh({ mode: "solo", names: ["Cy"] }).game;
    GS.answer(t, -1, { timedOut: true });
    check("time running out counts as incorrect, no points", GS.current(t).timedOut && !GS.current(t).correct && t.players[0].wrong === 1);
    check("a question can't be answered twice", GS.answer(t, 0) === null && t.players[0].wrong === 1);
}


console.log("\n5. Lifelines");
{
    const game = fresh({ mode: "solo", names: ["Ava"] }).game;
    const peek = GS.usePeek(game);
    check("PEEK shows the question's hint", peek && peek.hint === GS.current(game).question.hint);
    check("PEEK can be used once per game", !GS.canUse(game, "peek") && GS.usePeek(game) === null);
    check("SAVE isn't available before answering", !GS.canUse(game, "save"));

    const copy = GS.useCopy(game, always(0));
    const turn = GS.current(game);
    check("solo COPY: a classmate suggests an answer (here the right one)", copy && turn.answers[copy.suggestion].correct);
    check("COPY can be used once per game", GS.useCopy(game) === null);
    GS.answer(game, copy.suggestion, { copiedFrom: "A classmate" });
    check("copied answer is scored normally", turn.correct && game.players[0].score === 100 && turn.copy.from === "A classmate");

    GS.next(game);
    GS.answer(game, GS.current(game).answers.findIndex(a => !a.correct));
    check("SAVE is offered after a wrong answer", GS.canUse(game, "save"));
    const save = GS.useSave(game, { rng: always(0) });
    check("solo SAVE: a classmate rescues it, counts as correct (+100)", save.success && GS.current(game).correct &&
        game.players[0].score === 200 && game.players[0].wrong === 0 && game.players[0].saved === 1);
    check("SAVE can be used once per game", !GS.canUse(game, "save"));

    const miss = fresh({ mode: "solo", names: ["Bo"] }).game;
    GS.answer(miss, GS.current(miss).answers.findIndex(a => !a.correct));
    const failSave = GS.useSave(miss, { rng: always(0.999) });
    check("a SAVE that fails leaves it incorrect", !failSave.success && !GS.current(miss).correct && miss.players[0].wrong === 1);

    const team = fresh({ mode: "teams", names: ["Red", "Blue"] }).game;
    const tc = GS.useCopy(team);
    check("team COPY: offers the other teams to copy", tc && tc.teams.join() === "1");
    const tturn = GS.current(team);
    GS.answer(team, tturn.answers.findIndex(a => !a.correct));
    const rescue = GS.useSave(team, { rescuer: 1, choice: tturn.answers.findIndex(a => a.correct) });
    check("team SAVE: Blue rescues Red; Red gets the points, Blue a +100 bonus",
        rescue.success && team.players[0].score === 100 && team.players[1].score === 100 && team.players[1].rescues === 1);
    check("a team can't rescue itself", GS.useSave(fresh({ mode: "teams", names: ["A", "B"] }).game, { rescuer: 0, choice: 0 }) === null);

    const fin = fresh({ mode: "solo", names: ["Fin"], perGrade: 1 }).game;
    while (!GS.current(fin).final) { GS.answer(fin, 0); GS.next(fin); }
    check("no lifelines in the Final Challenge", ["peek", "copy", "save"].every(l => !GS.canUse(fin, l)));
}


console.log("\n6. Results, play again, and no leftover state");
{
    const game = fresh({ mode: "teams", names: ["Red", "Blue", "Green"], perGrade: 1 }).game;
    play(game, turn => turn.player === 1 || (turn.player === 0 && turn.grade <= 2 && !turn.final));
    const r = GS.results(game);
    const blue = r.players.find(p => p.name === "Blue");
    check("winner is the top scorer (Blue)", r.winners.join() === "Blue" && !r.tie && r.players[0].name === "Blue");
    check("Blue: 2,500 points, 6 correct, 0 incorrect, 100%, Grade 5, Final correct",
        blue.score === 2500 && blue.correct === 6 && blue.wrong === 0 && blue.accuracy === 100 && blue.highestGrade === 5 && blue.finalCorrect);
    const red = r.players.find(p => p.name === "Red");
    check("Red: 2 correct, 4 incorrect, 33%, highest Grade 2", red.correct === 2 && red.wrong === 4 && red.accuracy === 33 && red.highestGrade === 2);
    check("strongest subject is reported when there is one", blue.strongest && r.players.find(p => p.name === "Green").strongest === null);

    const tie = fresh({ mode: "teams", names: ["A", "B"], perGrade: 1 }).game;
    play(tie);
    check("equal scores are a tie", GS.results(tie).tie && GS.results(tie).winners.length === 2);

    const history = E.createHistory();
    const first = GS.createGame({ mode: "solo", names: ["Ava"] }, { history, session: "again" }).game;
    play(first);
    const second = GS.createGame(first.setup, { history, session: "again" }).game;
    check("play again: brand-new questions (none repeated from the last game)",
        second.turns.every(t => !first.turns.some(f => f.question.id === t.question.id)));
    check("play again: scores and lifelines start fresh",
        second.players[0].score === 0 && second.index === 0 && !second.finished &&
        Object.values(second.players[0].lifelines).every(Boolean) && second.turns.every(t => !t.answered));

    const left = GS.createGame({ mode: "solo", names: ["Quit"] }, { history, session: "quit" }).game;
    GS.answer(left, 0);
    GS.releaseUnplayed(left);
    check("quitting a game puts its unplayed questions back", E.session("quit").used.size === 1, E.session("quit").used.size);
}

console.log("\n" + passed + " passed, " + failed + " failed\n");
process.exitCode = failed ? 1 : 0;
