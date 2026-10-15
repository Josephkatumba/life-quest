// ==========================================
// LIFE QUEST: 5TH GRADE SHOWDOWN TESTS
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
    "game.js", "grade-school-questions.js", "showdown-questions.js", "grade-show.js"].forEach(file =>
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file }));

const g = expr => vm.runInContext(expr, context);
const OLD = g("GRADE_SCHOOL_BANK");
const NEW = g("SHOWDOWN_BANK");
const GS = g("GradeShow");
const LQ = g("QuestionEngine");
const E = GS.getEngine();
const pool = GS.activeQuestions();

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
const text = t => t.toLowerCase().replace(/[^a-z0-9]/g, "");
const FILLER = new Set(["a", "an", "the", "is", "are", "do", "does", "you", "your", "what", "which", "who", "how", "many",
    "of", "to", "in", "on", "it", "and", "or", "i", "m", "am", "me", "my", "this", "that", "with", "for", "at", "be", "called"]);
const words = t => new Set(t.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(w => w && !FILLER.has(w)));


console.log("\n1. Teen question bank");
{
    const qs = NEW.questions;
    const cats = Object.keys(NEW.categories);
    const by = d => qs.filter(q => q.difficulty === d).length;
    check("loads with no data warnings", warnings.length === 0, warnings.join(" | "));
    check(qs.length + " new questions (at least 300)", qs.length >= 300);
    check("14 categories, each with at least 20 questions", cats.length === 14 &&
        cats.every(c => qs.filter(q => q.category === c).length >= 20));
    check("about 50% easy / 40% medium / 10% hard (" + by("easy") + " / " + by("medium") + " / " + by("hard") + ")",
        Math.abs(by("easy") / qs.length - 0.5) <= 0.05 && Math.abs(by("medium") / qs.length - 0.4) <= 0.05 && Math.abs(by("hard") / qs.length - 0.1) <= 0.03);
    check("every category has easy, medium and hard questions", cats.every(c =>
        ["easy", "medium", "hard"].every(d => qs.some(q => q.category === c && q.difficulty === d))));
    check("ids are unique and permanent-style", new Set(qs.map(q => q.id)).size === qs.length && qs.every(q => /^sd-[a-z]+-\d{2}$/.test(q.id)));
    check("every question has one valid correct answer and no duplicate choices", qs.every(q =>
        q.answers.length >= 2 && q.correct >= 0 && q.correct < q.answers.length &&
        new Set(q.answers.map(a => a.toLowerCase())).size === q.answers.length && q.explanation));
    const tfs = qs.filter(q => q.category === "truefalse");
    check("True/False questions: exactly True then False, kept in order (" + tfs.length + ")",
        tfs.length >= 20 && tfs.every(q => q.answers.join() === "True,False" && q.keepOrder));
    check("True/False has a fair mix of true and false answers",
        tfs.filter(q => q.correct === 0).length >= 8 && tfs.filter(q => q.correct === 1).length >= 8);
    const africa = /africa|nigeria|kenya|ghana|egypt|uganda|tanzania|ethiopia|zimbabwe|zambia|rwanda|morocco|algeria|madagascar|nairobi|lagos|accra|abuja|kilimanjaro|sahara|nile|victoria|afcon|afrobeats|nollywood|burna|mandela|mali|kipchoge|addis|jerusalema|tyla/i;
    const african = qs.filter(q => africa.test(q.question + " " + q.answers.join(" ")));
    check("includes plenty of African geography, culture and sport (" + african.length + " questions)", african.length >= 30);
    check("easy questions are short (none over 25 words)", qs.filter(q => q.difficulty === "easy").every(q => q.question.split(/\s+/).length <= 25));
}


console.log("\n2. The whole pool the game uses");
{
    const classics = pool.filter(q => q.classic);
    check("teen bank + " + classics.length + " kept classics = " + pool.length + " questions", pool.length === NEW.questions.length + classics.length && classics.length >= 60);
    check("babyish Grade 1–2 questions are retired", classics.every(q => q.grade >= 3));
    check("kept classics are re-tagged into the new categories", classics.every(q => GS.SUBJECT_KEYS.includes(q.subject)));
    check("no duplicate question text anywhere in the pool", new Set(pool.map(q => text(q.question))).size === pool.length);
    const near = [];
    for (let i = 0; i < pool.length; i++) {
        for (let j = i + 1; j < pool.length; j++) {
            const a = pool[i], b = pool[j];
            if (a.answers[a.correct] !== b.answers[b.correct]) continue;
            const x = words(a.question), y = words(b.question);
            const shared = [...x].filter(w => y.has(w)).length;
            if (shared / Math.max(1, Math.min(x.size, y.size)) >= 0.6) near.push(a.id + " ~ " + b.id);
        }
    }
    check("no near-duplicates (same answer, mostly the same words)", near.length === 0, near.join(", "));
    const giveaways = pool.filter(q => q.hint && q.answers[q.correct].length > 3 && q.hint.toLowerCase().includes(q.answers[q.correct].toLowerCase()));
    check("no Peek hint gives away the answer", giveaways.length === 0, giveaways.map(q => q.id).join(", "));
    check("original Grades 1–5 file is still valid (" + OLD.questions.length + " questions, untouched)", OLD.questions.length === 189);
}


console.log("\n3. Kept apart from Life Quest");
{
    check("Life Quest still has its own 8 worlds", LQ.categoryKeys().join() === "world,pop,brain,life,school,sports,work,social");
    check("no Showdown question is in the Life Quest engine", pool.every(q => !LQ.byId(q.id)));
    check("the Showdown has its own engine with the 14 categories", E !== LQ && E.categoryKeys().sort().join() === GS.SUBJECT_KEYS.slice().sort().join());
}


console.log("\n4. Building a game");
{
    const solo = fresh({ mode: "solo", names: ["Ava"], perGrade: 2 }).game;
    const grades = solo.turns.map(t => t.final ? "F" : t.grade).join("");
    check("one player, 2 per grade: 11 questions, Grade 1 → 5 then the Final", grades === "1122334455F", grades);
    const diffs = solo.turns.map(t => t.question.difficulty[0]).join("");
    check("difficulty climbs: Grades 1–3 easy, 4–5 medium, Final hard (" + diffs + ")", diffs === "eeeeeemmmmh");
    const cats = solo.turns.map(t => t.question.subject);
    check("11 questions from 11 different categories (balanced)", new Set(cats).size === 11, cats.join(","));
    check("no duplicate questions in the game", new Set(solo.turns.map(t => t.question.id)).size === solo.turns.length);

    const teams = fresh({ mode: "teams", names: ["Red", "Blue", "Green"], perGrade: 1 }).game;
    check("3 teams: turns rotate Red, Blue, Green in every grade",
        teams.turns.map(t => t.player).join("") === "012012012012012012", teams.turns.map(t => t.player).join(""));
    check("each team gets its own Final Challenge", teams.turns.filter(t => t.final).map(t => t.player).join() === "0,1,2");

    let dupes = 0, unbalanced = 0;
    const tally = { easy: 0, medium: 0, hard: 0 };
    for (let i = 0; i < 100; i++) {
        const game = fresh({ mode: "teams", names: ["A", "B", "C", "D"], perGrade: 2 }).game;
        if (new Set(game.turns.map(t => t.question.id)).size !== game.turns.length) dupes++;
        const counts = {};
        game.turns.forEach(t => { counts[t.question.subject] = (counts[t.question.subject] || 0) + 1; tally[t.question.difficulty]++; });
        if (Math.max(...Object.values(counts)) - Math.min(...Object.values(counts)) > 1 || Object.keys(counts).length < 14) unbalanced++;
    }
    const total = tally.easy + tally.medium + tally.hard;
    const pct = d => Math.round((tally[d] / total) * 100);
    check("100 random 4-team games (44 questions each): never a duplicate question", dupes === 0, dupes + " games");
    check("categories stay balanced: all 14 used, none more than one ahead", unbalanced === 0, unbalanced + " games");
    check("difficulty across 100 games: " + pct("easy") + "% easy / " + pct("medium") + "% medium / " + pct("hard") + "% hard",
        pct("easy") >= 50 && pct("easy") <= 60 && pct("medium") >= 33 && pct("medium") <= 42 && pct("hard") >= 8 && pct("hard") <= 12);

    const sportsOnly = fresh({ mode: "solo", names: ["Ava"], subjects: ["sports"], perGrade: 2 }).game;
    check("category filter: only Football & Sports questions (Final too)", sportsOnly.turns.every(t => t.question.subject === "sports"));
    const smallCat = fresh({ mode: "solo", names: ["Ava"], subjects: ["truefalse"], perGrade: 3 }).game;
    check("works even with one small category (True or False, 16 questions)", smallCat && new Set(smallCat.turns.map(t => t.question.id)).size === 16);

    const tooMany = fresh({ mode: "teams", names: ["A", "B", "C", "D", "E", "F"], subjects: ["truefalse"], perGrade: 3 });
    check("not enough questions for the setup: a clear message, no game", !tooMany.game && /aren't enough/.test(tooMany.error), tooMany.error);
    check("no name: a clear message", /name/.test(fresh({ mode: "solo", names: ["  "] }).error));
    check("teams need two names", /two teams/.test(fresh({ mode: "teams", names: ["Solo"] }).error));
    check("no categories: a clear message", /category/.test(fresh({ mode: "solo", names: ["Ava"], subjects: [] }).error));
    check("a setup saved by the old version gets all 14 categories",
        GS.cleanSetup({ mode: "solo", names: ["A"], subjects: ["math", "ela", "social"] }).subjects.length === 14);

    const a = fresh({ mode: "solo", names: ["Ava"] }).game;
    const b = fresh({ mode: "solo", names: ["Ava"] }).game;
    check("randomised: two new games are different", a.turns.map(t => t.question.id).join() !== b.turns.map(t => t.question.id).join());

    const tf = fresh({ mode: "solo", names: ["Ava"], subjects: ["truefalse"], perGrade: 1 }).game;
    check("True/False questions show True first, False second", tf.turns.every(t => t.answers.map(x => x.text).join() === "True,False"));
}


console.log("\n5. Scoring, streaks and grade progression");
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
    check("normal points unchanged: 100 → 500 by grade, Final 1,000", game.turns.map(t => t.points).join() === "100,100,200,200,300,300,400,400,500,500,1000");
    check("streak bonus: +50 from the 3rd correct in a row (8 × 50 = 400), none in the Final",
        game.turns.map(t => t.bonus).join() === "0,0,50,50,50,50,50,50,50,50,0");
    check("perfect game: 4,000 points + 400 streak bonus = 4,400", p.score === 4400, p.score);
    check("best streak 11 and highest grade climbs 1 → 5", p.bestStreak === 11 && reached.join("") === "11223344555");
    check("every answer gets a cheer", game.turns.every(t => t.cheer));

    const broken = fresh({ mode: "solo", names: ["Ben"], perGrade: 2 }).game;
    play(broken, turn => broken.index !== 3);
    check("a wrong answer resets the streak (bonus starts again at the 3rd in a row)",
        broken.turns.map(t => t.bonus).join() === "0,0,50,0,0,0,50,50,50,50,0", broken.turns.map(t => t.bonus).join());
    check("wrong answers get encouragement", broken.turns[3].cheer && !broken.turns[3].correct);

    const wrongGame = fresh({ mode: "solo", names: ["Ben"], perGrade: 1 }).game;
    play(wrongGame, () => false);
    check("all wrong: 0 points, 6 incorrect, highest grade none", wrongGame.players[0].score === 0 && wrongGame.players[0].wrong === 6 && wrongGame.players[0].highestGrade === 0);

    const t = fresh({ mode: "solo", names: ["Cy"] }).game;
    GS.answer(t, -1, { timedOut: true });
    check("time running out counts as incorrect, no points", GS.current(t).timedOut && !GS.current(t).correct && t.players[0].wrong === 1);
    check("a question can't be answered twice", GS.answer(t, 0) === null && t.players[0].wrong === 1);
}


console.log("\n6. Lifelines");
{
    const game = fresh({ mode: "solo", names: ["Ava"], subjects: ["general"] }).game;
    const peek = GS.usePeek(game, always(0));
    check("PEEK: shows the hint, or crosses out a wrong answer", peek && (peek.hint || GS.current(game).answers[peek.removed].correct === false));
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

    const tf = fresh({ mode: "solo", names: ["Tia"], subjects: ["truefalse"] }).game;
    check("no PEEK on True/False (crossing one out would give the answer away)", !GS.canUse(tf, "peek") && GS.usePeek(tf) === null);

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


console.log("\n7. Results, play again, and no leftover state");
{
    const game = fresh({ mode: "teams", names: ["Red", "Blue", "Green"], perGrade: 1 }).game;
    play(game, turn => turn.player === 1 || (turn.player === 0 && turn.grade <= 2 && !turn.final));
    const r = GS.results(game);
    const blue = r.players.find(p => p.name === "Blue");
    check("winner is the top scorer (Blue)", r.winners.join() === "Blue" && !r.tie && r.players[0].name === "Blue");
    check("Blue: 2,500 + 150 streak (Grades 3, 4, 5) = 2,650 points, 6/6, 100%, Grade 5, Final correct, best streak 6",
        blue.score === 2650 && blue.correct === 6 && blue.wrong === 0 && blue.accuracy === 100 &&
        blue.highestGrade === 5 && blue.finalCorrect && blue.bestStreak === 6, JSON.stringify(blue));
    const red = r.players.find(p => p.name === "Red");
    check("Red: 2 correct, 4 incorrect, 33%, highest Grade 2", red.correct === 2 && red.wrong === 4 && red.accuracy === 33 && red.highestGrade === 2);
    check("best category is reported when there is one", blue.strongest && r.players.find(p => p.name === "Green").strongest === null);

    const tie = fresh({ mode: "teams", names: ["A", "B"], perGrade: 1 }).game;
    play(tie);
    check("equal scores are a tie", GS.results(tie).tie && GS.results(tie).winners.length === 2);

    const history = E.createHistory();
    const seen = new Set();
    let repeats = 0;
    for (let i = 0; i < 20; i++) {
        const g2 = GS.createGame({ mode: "solo", names: ["Ava"] }, { history, session: "again" }).game;
        g2.turns.forEach(t => { if (seen.has(t.question.id)) repeats++; seen.add(t.question.id); });
        play(g2);
    }
    check("play again 20 times in one session (220 questions): no question repeats", repeats === 0, repeats + " repeats");

    const first = GS.createGame({ mode: "solo", names: ["Ava"] }, { history, session: "fresh-state" }).game;
    play(first);
    const second = GS.createGame(first.setup, { history, session: "fresh-state" }).game;
    check("play again: scores, streaks and lifelines start fresh",
        second.players[0].score === 0 && second.players[0].streak === 0 && second.index === 0 && !second.finished &&
        Object.values(second.players[0].lifelines).every(Boolean) && second.turns.every(t => !t.answered));

    const left = GS.createGame({ mode: "solo", names: ["Quit"] }, { history, session: "quit" }).game;
    GS.answer(left, 0);
    GS.releaseUnplayed(left);
    check("quitting a game puts its unplayed questions back", E.session("quit").used.size === 1, E.session("quit").used.size);
}

console.log("\n" + passed + " passed, " + failed + " failed\n");
process.exitCode = failed ? 1 : 0;
