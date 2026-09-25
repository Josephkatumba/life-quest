// ==========================================
// LIFE QUEST: QUESTION ENGINE
// Loaded after questions.js and before game.js (see index.html).
//
// Decides WHICH questions a player sees. The screens in game.js ask the
// engine for questions and report answers back; they never pick questions
// themselves. That keeps the rules in one place:
//
//   • A question is never repeated within one session (one page visit),
//     separately for each player and for Classroom Mode.
//   • Questions the player has never seen come first, then the ones seen
//     longest ago. Recently seen questions are only used when nothing else fits.
//   • Categories rotate, so the least recently played ones come up first.
//   • Practice Mistakes deliberately repeats missed questions.
//
// It also keeps a small history per player (right / wrong, answer time,
// category and difficulty) for progress reports and future adaptive difficulty.
// ==========================================

"use strict";

const QuestionEngine = (function () {

    // Easiest first. "starter" questions always have exactly 2 choices and are
    // kept apart: they are only used when Starter is asked for, and Starter
    // never falls back to the 4-choice levels.
    const DIFFICULTIES = ["starter", "easy", "medium", "hard"];
    const STANDARD = ["easy", "medium", "hard"];

    // A question counts as "fresh" again after this many other questions
    const FRESH_AFTER = 150;

    // Keep saves small: history for at most this many questions, plus the last few answers
    const MAX_HISTORY_ITEMS = 3000;
    const MAX_RECENT_ANSWERS = 100;
    const MAX_ANSWER_MS = 180000;

    const byId = Object.create(null);
    const byCategory = Object.create(null);       // key -> { easy: [], medium: [], hard: [] }
    let categoryKeys = [];

    // Session memory lives only in the page. Keys look like "player:sam" or "classroom".
    const sessions = Object.create(null);


    // ------------------------------
    // BANK SET-UP
    // ------------------------------

    function hashText(text) {

        let hash = 5381;

        for (const character of String(text)) {
            hash = ((hash << 5) + hash) ^ character.codePointAt(0);
        }

        return (hash >>> 0).toString(36);
    }

    // "What is 2 + 2?" and "what is 2+2" are the same question
    function normalizeText(text) {
        return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "");
    }

    // Gives every question a stable id, checks the data for mistakes and
    // builds lookup tables. Problems are reported in the browser console (F12).
    function init(categories) {

        const seenText = Object.create(null);

        categoryKeys = Object.keys(categories);

        categoryKeys.forEach(key => {

            byCategory[key] = { starter: [], easy: [], medium: [], hard: [] };

            // Walk a copy so duplicates can be removed from the real list
            [...categories[key].questions].forEach((q, index) => {

                q.category = key;
                q.id = typeof q.id === "string" && q.id.trim()
                    ? q.id.trim()
                    : key + "-" + hashText(q.question);

                const problems = [];

                if (!q.question) problems.push("missing question text");

                if (!Array.isArray(q.answers) || q.answers.length < 2) {
                    problems.push("needs at least 2 answers");
                } else {
                    if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.answers.length) {
                        problems.push("'correct' does not point at an answer");
                    }
                    if (new Set(q.answers).size !== q.answers.length) {
                        problems.push("has duplicate answers");
                    }
                }

                if (!DIFFICULTIES.includes(q.difficulty)) {
                    problems.push("difficulty must be starter, easy, medium or hard");
                }

                if (q.difficulty === "starter" && Array.isArray(q.answers) && q.answers.length !== 2) {
                    problems.push("starter questions need exactly 2 answers");
                }

                if (!q.explanation) problems.push("missing explanation");

                const textKey = normalizeText(q.question);
                const duplicateOf = seenText[textKey] || (byId[q.id] && byId[q.id].id);

                if (duplicateOf) {
                    console.warn(
                        "[Life Quest] " + key + " question " + (index + 1) +
                        " (" + q.question + ") is a duplicate of " + duplicateOf + " and was skipped."
                    );
                    const list = categories[key].questions;
                    list.splice(list.indexOf(q), 1);
                    return;
                }

                if (problems.length) {
                    console.warn(
                        "[Life Quest] " + key + " question " + (index + 1) +
                        " (" + q.question + "): " + problems.join(", ")
                    );
                }

                seenText[textKey] = q.id;
                byId[q.id] = q;

                const tier = byCategory[key][q.difficulty] ? q.difficulty : "easy";
                byCategory[key][tier].push(q);
            });
        });
    }


    // ------------------------------
    // HISTORY (saved inside each player's profile)
    //   clock:  goes up by one every time a question is shown
    //   q[id]:  { s: clock when last shown, n: times shown, c: correct, w: wrong,
    //             t: total answer time in ms, a: answers that were timed }
    //   cat[k]: clock when category k was last shown
    //   recent: last answers as [id, 1 or 0, ms, timedOut 1 or 0]
    // ------------------------------

    function createHistory() {
        return { v: 1, clock: 0, q: {}, cat: {}, recent: [] };
    }

    function count(value) {
        return Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0;
    }

    // Turns anything read from storage into a complete, safe history
    function normalizeHistory(saved) {

        const history = createHistory();

        if (!saved || typeof saved !== "object" || Array.isArray(saved)) return history;

        history.clock = count(saved.clock);

        if (saved.q && typeof saved.q === "object") {
            Object.keys(saved.q).forEach(id => {
                const e = saved.q[id];
                if (!e || typeof e !== "object") return;
                history.q[id] = {
                    s: Math.min(count(e.s), history.clock),
                    n: count(e.n), c: count(e.c), w: count(e.w), t: count(e.t), a: count(e.a)
                };
            });
        }

        if (saved.cat && typeof saved.cat === "object") {
            Object.keys(saved.cat).forEach(key => {
                history.cat[key] = Math.min(count(saved.cat[key]), history.clock);
            });
        }

        if (Array.isArray(saved.recent)) {
            history.recent = saved.recent
                .filter(r => Array.isArray(r) && typeof r[0] === "string")
                .slice(-MAX_RECENT_ANSWERS)
                .map(r => [r[0], r[1] ? 1 : 0, count(r[2]), r[3] ? 1 : 0]);
        }

        return history;
    }

    function prune(history) {

        const ids = Object.keys(history.q);

        if (ids.length <= MAX_HISTORY_ITEMS) return;

        ids.sort((a, b) => history.q[a].s - history.q[b].s)
            .slice(0, ids.length - MAX_HISTORY_ITEMS)
            .forEach(id => { delete history.q[id]; });
    }

    // Call when a question appears on screen
    function noteShown(history, q) {

        if (!history || !q) return;

        history.clock++;

        const entry = history.q[q.id] || (history.q[q.id] = { s: 0, n: 0, c: 0, w: 0, t: 0, a: 0 });

        entry.s = history.clock;
        entry.n++;

        history.cat[q.category] = history.clock;

        prune(history);
    }

    // Call when a question is finished. ms = how long the player took (optional).
    function recordAnswer(history, q, result) {

        if (!history || !q) return;

        const entry = history.q[q.id];

        if (!entry) {
            noteShown(history, q);
            return recordAnswer(history, q, result);
        }

        const correct = Boolean(result && result.correct);
        const timedOut = Boolean(result && result.timedOut);
        const ms = result && Number.isFinite(result.ms)
            ? Math.max(0, Math.min(MAX_ANSWER_MS, Math.round(result.ms)))
            : 0;

        if (correct) entry.c++; else entry.w++;

        if (ms > 0) {
            entry.t += ms;
            entry.a++;
        }

        history.recent.push([q.id, correct ? 1 : 0, ms, timedOut ? 1 : 0]);

        if (history.recent.length > MAX_RECENT_ANSWERS) {
            history.recent.splice(0, history.recent.length - MAX_RECENT_ANSWERS);
        }
    }


    // ------------------------------
    // SESSIONS: never repeat a question in one visit
    // ------------------------------

    function session(key) {
        return sessions[key] || (sessions[key] = { used: new Set() });
    }

    function resetSession(key) {
        delete sessions[key];
    }

    // Gives back questions that were set aside but never shown (e.g. a board that was replaced)
    function release(sessionKey, ids) {
        const s = session(sessionKey);
        ids.forEach(id => s.used.delete(id));
    }


    // ------------------------------
    // PICKING QUESTIONS
    // ------------------------------

    function lastSeen(history, q) {
        const entry = history && history.q[q.id];
        return entry ? entry.s : 0;          // 0 = never seen
    }

    function isFresh(history, q) {
        const seen = lastSeen(history, q);
        return seen === 0 || history.clock - seen >= FRESH_AFTER;
    }

    function randomItem(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    // Never-seen questions first (at random); otherwise one of the
    // longest-unseen questions (at random, so the order still varies)
    function bestOf(list, history) {

        if (!list.length) return null;

        const never = list.filter(q => lastSeen(history, q) === 0);

        if (never.length) return randomItem(never);

        const oldestFirst = [...list].sort((a, b) => lastSeen(history, a) - lastSeen(history, b));

        return randomItem(oldestFirst.slice(0, Math.max(1, Math.ceil(oldestFirst.length / 4))));
    }

    function difficultyList(value) {
        const list = Array.isArray(value) ? value : value ? [value] : STANDARD;
        return list.filter(d => DIFFICULTIES.includes(d));
    }

    // Fallback order when a board row's difficulty has run out
    function preferenceFor(difficulty) {
        if (difficulty === "starter") return ["starter"];      // never a 4-choice question
        if (difficulty === "hard") return ["hard", "medium", "easy"];
        if (difficulty === "medium") return ["medium", "easy", "hard"];
        return ["easy", "medium", "hard"];
    }

    // One question from one category.
    //   options.difficulties: preferred difficulties, best first
    //   options.history:      whose history decides what is fresh
    //   options.session:      session key; the pick is reserved there
    //   options.exclude:      Set of ids to skip (e.g. already on this board)
    function pickOne(categoryKey, options = {}) {

        const tiers = byCategory[categoryKey];

        if (!tiers) return null;

        const history = options.history || createHistory();
        const used = options.session ? session(options.session).used : new Set();
        const exclude = options.exclude || new Set();
        const prefs = difficultyList(options.difficulties);

        const available = d => (tiers[d] || []).filter(q => !used.has(q.id) && !exclude.has(q.id));

        let choice = null;

        // 1. A fresh question, trying each difficulty in order
        for (const d of prefs) {
            choice = bestOf(available(d).filter(q => isFresh(history, q)), history);
            if (choice) break;
        }

        // 2. Nothing fresh: the longest-unseen question not used this session
        if (!choice) {
            choice = bestOf(prefs.flatMap(available), history);
        }

        // 3. The whole category has been used this session (very long sessions only)
        if (!choice) {
            choice = bestOf(
                prefs.flatMap(d => (tiers[d] || []).filter(q => !exclude.has(q.id))),
                history
            );
            if (choice) {
                console.warn("[Life Quest] Every " + categoryKey + " question has been used this session; repeating the longest-unseen one.");
            }
        }

        if (choice && options.session) session(options.session).used.add(choice.id);

        return choice;
    }

    // One board column: one question per row difficulty, never the same one twice
    //   rows: e.g. ["easy", "easy", "medium", "medium", "hard"]
    function pickColumn(categoryKey, rows, options = {}) {

        const exclude = new Set(options.exclude || []);

        return rows.map(row => {

            const q = pickOne(categoryKey, {
                ...options,
                difficulties: preferenceFor(row),
                exclude
            });

            if (q) exclude.add(q.id);

            return q;
        });
    }

    // Categories in rotation order: least recently played first, ties at random
    function rotateCategories(keys, history) {

        const last = key => (history && history.cat[key]) || 0;

        return shuffleCopy(keys).sort((a, b) => last(a) - last(b));
    }

    // Several questions, rotating through the categories
    //   options.categories:   which categories (default: all)
    //   options.difficulties, options.history, options.session: as in pickOne
    function pickMany(total, options = {}) {

        const keys = rotateCategories(
            (options.categories || categoryKeys).filter(key => byCategory[key]),
            options.history
        );

        const picked = [];
        const exclude = new Set(options.exclude || []);

        let misses = 0;

        for (let i = 0; picked.length < total && misses < keys.length; i++) {

            const q = pickOne(keys[i % keys.length], { ...options, exclude });

            if (q) {
                picked.push(q);
                exclude.add(q.id);
                misses = 0;
            } else {
                misses++;
            }
        }

        return picked;
    }

    // Practice Mistakes: deliberately repeats missed questions. It ignores the
    // session rule, but still spreads the categories and prefers the questions
    // practised longest ago.
    function pickPractice(missedIds, total, history) {

        const pool = missedIds.map(id => byId[id]).filter(Boolean);
        const groups = Object.create(null);

        pool.forEach(q => (groups[q.category] || (groups[q.category] = [])).push(q));

        const keys = rotateCategories(Object.keys(groups), history);
        const picked = [];

        for (let i = 0; picked.length < total && pool.length > picked.length; i++) {

            const group = groups[keys[i % keys.length]];
            const q = bestOf(group, history);

            if (!q) continue;

            picked.push(q);
            group.splice(group.indexOf(q), 1);
        }

        return shuffleCopy(picked);
    }

    // Categories for a new board: least recently played first
    function pickCategories(total, history) {
        return rotateCategories(categoryKeys.filter(key => byCategory[key]), history).slice(0, total);
    }

    function shuffleCopy(list) {

        const copy = [...list];

        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }

        return copy;
    }


    // ------------------------------
    // INSIGHTS: the data foundation for adaptive difficulty
    // No guessing: small samples are marked as "not enough data".
    // ------------------------------

    const MIN_SAMPLE = 5;

    function emptyStats() {
        return { answered: 0, correct: 0, accuracy: null, avgMs: null, timedMs: 0, timed: 0 };
    }

    function finishStats(s) {
        s.accuracy = s.answered ? Math.round((s.correct / s.answered) * 100) : null;
        s.avgMs = s.timed ? Math.round(s.timedMs / s.timed) : null;
        delete s.timedMs;
        delete s.timed;
        return s;
    }

    function summarize(history) {

        const h = history || createHistory();
        const byCat = Object.create(null);
        const byDiff = Object.create(null);
        const overall = emptyStats();

        categoryKeys.forEach(key => { byCat[key] = emptyStats(); });
        DIFFICULTIES.forEach(d => { byDiff[d] = emptyStats(); });

        Object.keys(h.q).forEach(id => {

            const q = byId[id];
            const e = h.q[id];

            if (!q) return;

            [byCat[q.category], byDiff[q.difficulty], overall].forEach(s => {
                if (!s) return;
                s.answered += e.c + e.w;
                s.correct += e.c;
                s.timedMs += e.t;
                s.timed += e.a;
            });
        });

        Object.keys(byCat).forEach(key => finishStats(byCat[key]));
        Object.keys(byDiff).forEach(d => finishStats(byDiff[d]));
        finishStats(overall);

        // Categories where the player is finding things hard (lowest accuracy first)
        const struggling = Object.keys(byCat)
            .filter(key => byCat[key].answered >= MIN_SAMPLE && byCat[key].accuracy < 60)
            .sort((a, b) => byCat[a].accuracy - byCat[b].accuracy);

        return { overall, byCategory: byCat, byDifficulty: byDiff, struggling };
    }

    // Recent accuracy in one category (last 10 answers), or null if too few
    function recentAccuracy(history, categoryKey) {

        const answers = (history ? history.recent : [])
            .filter(r => byId[r[0]] && byId[r[0]].category === categoryKey)
            .slice(-10);

        if (answers.length < MIN_SAMPLE) return null;

        return Math.round((answers.filter(r => r[1]).length / answers.length) * 100);
    }

    // A simple rule, not AI: doing very well → a step harder, struggling → a step easier.
    // Not used by the screens yet; it is here so adaptive play can be switched on later.
    function suggestDifficulty(history, categoryKey, current = "medium") {

        const accuracy = recentAccuracy(history, categoryKey);
        const index = Math.max(0, DIFFICULTIES.indexOf(current));

        if (accuracy === null) return current;
        if (accuracy >= 80) return DIFFICULTIES[Math.min(index + 1, DIFFICULTIES.length - 1)];
        if (accuracy <= 40) return DIFFICULTIES[Math.max(index - 1, 0)];

        return current;
    }


    return {
        DIFFICULTIES,
        STANDARD,
        FRESH_AFTER,
        init,
        byId: id => byId[id] || null,
        categoryKeys: () => [...categoryKeys],
        count: (categoryKey, difficulty) =>
            byCategory[categoryKey] ? (byCategory[categoryKey][difficulty] || []).length : 0,

        createHistory,
        normalizeHistory,
        noteShown,
        recordAnswer,

        session,
        resetSession,
        release,

        preferenceFor,
        pickOne,
        pickColumn,
        pickMany,
        pickPractice,
        pickCategories,

        summarize,
        recentAccuracy,
        suggestDifficulty
    };

})();

QuestionEngine.init(categories);
