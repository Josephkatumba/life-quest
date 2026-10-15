// ==========================================
// LIFE QUEST: 5TH GRADE GAME SHOW MODE
// Loaded after game.js (see index.html). Questions: grade-school-questions.js
//
// Players or teams climb from Grade 1 to Grade 5, then face the
// 5th Grade Final Challenge. Three lifelines per player/team:
//   👀 PEEK  shows a hint.
//   📝 COPY  team play: lock in another team's answer.
//            solo play: a classmate suggests an answer (usually, not always, right).
//   🛟 SAVE  after a wrong answer: another team (or a classmate) gets a chance
//            to rescue it. A rescue counts as correct; a rescuing team earns a bonus.
// No lifelines in the Final Challenge.
//
// The file has two parts:
//   GAME LOGIC  plain functions with no screen code (tested in tests/grade-show-checks.js)
//   SCREENS     drawn with Life Quest's render(), timer, read-aloud and settings
//
// Like Classroom Mode, this mode never changes a signed-in student's personal
// XP, streaks or achievements. It keeps its own question history.
// ==========================================

"use strict";

const GradeShow = (function () {

    // The name shown everywhere. Change it here to rename the mode.
    const TITLE = "5th Grade Showdown";

    const GRADE_POINTS = { 1: 100, 2: 200, 3: 300, 4: 400, 5: 500 };
    const FINAL_BONUS = 1000;
    const SAVE_BONUS = 100;          // for a team that rescues another team
    const MAX_PLAYERS = 6;
    const PER_GRADE_CHOICES = [1, 2, 3];
    const LIFELINES = ["peek", "copy", "save"];

    // How often the pretend classmate is right (solo COPY and SAVE)
    const CLASSMATE_ACCURACY = { 1: 0.95, 2: 0.9, 3: 0.85, 4: 0.8, 5: 0.75 };

    const SESSION = "grade-show";
    const STORAGE_KEY = "lifeQuestGradeShow";
    const SUBJECTS = SHOWDOWN_BANK.categories;        // the 14 fun categories
    const SUBJECT_KEYS = Object.keys(SUBJECTS);
    const GRADES = [1, 2, 3, 4, 5];

    // The ladder gets harder as you climb: Grades 1–3 easy, Grades 4–5 medium,
    // Final Challenge hard (about 55% / 36% / 9% in a game). If a category runs
    // short, the nearest difficulty is used; an easy rung never jumps to hard.
    const RUNG_DIFFICULTY = { 1: "easy", 2: "easy", 3: "easy", 4: "medium", 5: "medium", final: "hard" };
    const FALLBACK = { easy: ["easy", "medium"], medium: ["medium", "easy", "hard"], hard: ["hard", "medium"] };

    // Streak bonus: +50 for every correct answer from the 3rd in a row
    // (not in the Final Challenge). The normal points are unchanged.
    const STREAK_BONUS = 50;
    const STREAK_FROM = 3;

    const CHEERS = [
        "Big brain energy! 🧠", "Nailed it! 🎯", "Too easy for you! 😎", "Absolute legend! 🏆",
        "That's how it's done! 💪", "Genius move! 💡", "Smooth! 😏", "Somebody's been studying! 📚",
        "Easy money! 💸", "The crowd goes wild! 🙌"
    ];
    const ENCOURAGEMENT = [
        "So close! The next one's yours 💪", "Plot twist! 😅", "Not this time, champ! 🙌",
        "Shake it off! 🎶", "Even legends miss sometimes 😉", "Now you know for next time! 🧠",
        "Tough one! Keep going 🚀"
    ];

    // The best of the original Grades 1–5 bank, re-tagged for teens:
    // [category, difficulty]. Grade 1–2 questions felt too young, and the
    // U.S.-civics-heavy ones were too obscure, so they are retired.
    const LEGACY = {
        "g3-math-01": ["math", "easy"], "g3-math-02": ["math", "easy"], "g3-math-03": ["math", "easy"],
        "g3-math-04": ["math", "easy"], "g3-math-05": ["math", "easy"],
        "g3-science-01": ["science", "easy"], "g3-science-02": ["science", "easy"],
        "g3-science-03": ["animals", "easy"], "g3-science-04": ["animals", "easy"],
        "g3-geography-01": ["geography", "easy"], "g3-geography-02": ["geography", "easy"],
        "g3-geography-03": ["geography", "easy"], "g3-geography-04": ["geography", "medium"],
        "g3-geography-05": ["geography", "easy"],
        "g3-history-02": ["history", "medium"], "g3-history-05": ["history", "easy"],
        "g3-general-01": ["general", "easy"], "g3-general-03": ["general", "easy"],
        "g3-general-04": ["animals", "easy"], "g3-general-05": ["geography", "easy"],
        "g4-math-01": ["math", "medium"], "g4-math-02": ["math", "easy"], "g4-math-03": ["math", "easy"],
        "g4-math-04": ["math", "easy"], "g4-math-05": ["math", "easy"],
        "g4-science-01": ["science", "easy"], "g4-science-03": ["science", "medium"],
        "g4-science-04": ["science", "medium"], "g4-science-05": ["animals", "medium"],
        "g4-geography-01": ["geography", "medium"], "g4-geography-02": ["geography", "medium"],
        "g4-geography-03": ["geography", "medium"], "g4-geography-05": ["geography", "medium"],
        "g4-history-01": ["history", "medium"], "g4-history-02": ["history", "medium"],
        "g4-history-03": ["history", "medium"], "g4-history-05": ["history", "easy"],
        "g4-general-01": ["math", "easy"], "g4-general-03": ["science", "medium"],
        "g4-general-04": ["math", "easy"], "g4-general-05": ["animals", "medium"],
        "g5-math-01": ["math", "easy"], "g5-math-02": ["math", "easy"], "g5-math-03": ["math", "medium"],
        "g5-math-04": ["math", "easy"], "g5-math-05": ["math", "medium"],
        "g5-science-01": ["science", "medium"], "g5-science-02": ["science", "medium"],
        "g5-science-03": ["science", "easy"], "g5-science-04": ["science", "easy"],
        "g5-science-05": ["science", "easy"],
        "g5-geography-01": ["geography", "medium"], "g5-geography-02": ["geography", "easy"],
        "g5-history-01": ["history", "easy"], "g5-history-03": ["history", "medium"],
        "g5-history-04": ["history", "easy"], "g5-history-05": ["history", "medium"],
        "g5-general-01": ["general", "easy"], "g5-general-02": ["science", "medium"],
        "g5-general-03": ["science", "medium"], "g5-general-04": ["math", "easy"],
        "g5-general-05": ["funfacts", "medium"],
        "final-math-01": ["math", "hard"], "final-math-02": ["math", "hard"],
        "final-history-02": ["history", "hard"],
        "final-general-01": ["math", "hard"]
    };


    // ==========================================
    // GAME LOGIC (no screen code)
    // ==========================================

    let engine = null;

    // Every question the Showdown can use: the teen bank plus the kept classics
    function activeQuestions() {
        const fresh = SHOWDOWN_BANK.questions.map(q => ({ ...q, subject: q.category }));
        const classics = GRADE_SCHOOL_BANK.questions
            .filter(q => LEGACY[q.id])
            .map(q => ({
                ...q,
                subject: LEGACY[q.id][0],
                category: LEGACY[q.id][0],
                difficulty: LEGACY[q.id][1],
                final: false,
                classic: true
            }));
        return [...fresh, ...classics];
    }

    // Its own QuestionEngine, so these questions never mix into Life Quest
    function getEngine() {
        if (engine) return engine;
        const cats = {};
        activeQuestions().forEach(question => {
            const key = question.subject;
            (cats[key] || (cats[key] = { name: SUBJECTS[key].name, questions: [] })).questions.push(question);
        });
        engine = QuestionEngine.create();
        engine.init(cats);
        return engine;
    }

    function shuffled(list, rng) {
        const copy = [...list];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function pickOneOf(list, rng) {
        return list[Math.floor(rng() * list.length)];
    }

    // Normalises what the facilitator chose on the setup screen
    function cleanSetup(setup = {}) {
        const mode = setup.mode === "teams" ? "teams" : "solo";
        const names = (Array.isArray(setup.names) ? setup.names : [])
            .map(name => String(name || "").trim().replace(/\s+/g, " ").slice(0, 24))
            .filter(Boolean)
            .slice(0, mode === "teams" ? MAX_PLAYERS : 1);
        // A setup saved by the older version (other category names) gets all categories
        const chosen = Array.isArray(setup.subjects) ? setup.subjects : SUBJECT_KEYS;
        const subjects = chosen.every(key => SUBJECT_KEYS.includes(key)) ? [...chosen] : [...SUBJECT_KEYS];
        const perGrade = PER_GRADE_CHOICES.includes(Number(setup.perGrade)) ? Number(setup.perGrade) : 2;
        const timerMode = ["off", "standard", "extra"].includes(setup.timerMode) ? setup.timerMode : "off";
        return { mode, names, subjects, perGrade, timerMode };
    }

    // Builds a new game. Every question is chosen now, so a game never contains
    // the same question twice. Categories take turns (each one before any
    // repeats) and the difficulty follows the ladder. Returns { game } or { error }.
    function createGame(rawSetup, options = {}) {

        const setup = cleanSetup(rawSetup);
        const rng = options.rng || Math.random;
        const E = options.engine || getEngine();
        const history = options.history || E.createHistory();
        const sessionKey = options.session || SESSION;

        if (!setup.names.length) return { error: "Type a name to start." };
        if (setup.mode === "teams" && setup.names.length < 2) return { error: "Team play needs at least two teams." };
        if (!setup.subjects.length) return { error: "Pick at least one category." };

        const count = setup.names.length;
        const plan = [];
        GRADES.forEach(grade => {
            for (let round = 0; round < setup.perGrade; round++) {
                for (let p = 0; p < count; p++) plan.push({ player: p, grade, final: false });
            }
        });
        for (let p = 0; p < count; p++) plan.push({ player: p, grade: 5, final: true });

        const inGame = new Set();
        const picked = [];
        let cycle = [];

        // Next category in the rotation that still has a question at this difficulty.
        // First without repeating anything from this session; only if every chosen
        // category is used up does a question from an earlier game come back.
        function pickFor(target) {
            for (const allowRepeat of [false, true]) {
                const skip = allowRepeat ? inGame : new Set([...inGame, ...E.session(sessionKey).used]);
                for (let tries = 0; tries < setup.subjects.length; tries++) {
                    if (!cycle.length) cycle = shuffled(setup.subjects, rng);
                    const key = cycle.shift();
                    const question = E.pickOne(key, { difficulties: FALLBACK[target], history, session: sessionKey, exclude: skip });
                    if (question) return question;
                }
            }
            return null;
        }

        const turns = [];
        for (const slot of plan) {
            const question = pickFor(RUNG_DIFFICULTY[slot.final ? "final" : slot.grade]);
            if (!question) {
                E.release(sessionKey, picked.map(q => q.id));
                return {
                    error: "There aren't enough questions in the chosen categories for this setup. " +
                        "Pick more categories, fewer questions per grade, or fewer " + (setup.mode === "teams" ? "teams." : "players.")
                };
            }
            inGame.add(question.id);
            picked.push(question);
            turns.push(newTurn(slot.player, slot.grade, question, slot.final));
        }

        const players = setup.names.map(name => ({
            name,
            score: 0,
            correct: 0,
            wrong: 0,
            saved: 0,
            rescues: 0,
            streak: 0,
            bestStreak: 0,
            highestGrade: 0,
            finalCorrect: null,
            bySubject: {},
            lifelines: { peek: true, copy: true, save: true }
        }));

        return { game: { setup, players, turns, index: 0, finished: false, sessionKey, rng } };

        function newTurn(player, grade, question, isFinal) {
            return {
                player,
                grade,
                final: isFinal,
                question,
                answers: buildChoices(question, rng),
                answered: false,
                picked: -1,
                correct: false,
                timedOut: false,
                points: 0,
                bonus: 0,
                cheer: "",
                peeked: false,
                copy: null,
                save: null
            };
        }
    }

    // Answer order is shuffled once, when the game is built.
    // True/False stays in order; number answers go smallest to largest.
    function buildChoices(question, rng) {
        const items = question.answers.map((text, index) => ({ text, correct: index === question.correct }));
        if (question.keepOrder) return items;
        if (items.every(item => isNumericAnswer(item.text))) {
            return items.sort((a, b) => numericValue(a.text) - numericValue(b.text));
        }
        return shuffled(items, rng);
    }

    function current(game) {
        return game && !game.finished ? game.turns[game.index] : null;
    }

    function subjectStats(player, subject) {
        return player.bySubject[subject] || (player.bySubject[subject] = { answered: 0, correct: 0 });
    }

    function award(game, turn) {
        const player = game.players[turn.player];
        turn.points = turn.final ? FINAL_BONUS : GRADE_POINTS[turn.grade];
        player.score += turn.points;
        player.correct++;
        player.highestGrade = Math.max(player.highestGrade, turn.grade);
        subjectStats(player, turn.question.subject).correct++;
        if (turn.final) player.finalCorrect = true;
    }

    // Answers the current question. choice = index into turn.answers (or -1 when time ran out)
    function answer(game, choice, info = {}) {
        const turn = current(game);
        if (!turn || turn.answered) return null;
        if (!info.timedOut && !turn.answers[choice]) return null;

        const player = game.players[turn.player];

        turn.answered = true;
        turn.timedOut = Boolean(info.timedOut);
        turn.picked = turn.timedOut ? -1 : choice;
        turn.correct = !turn.timedOut && turn.answers[choice].correct;
        if (info.copiedFrom) turn.copy = { ...(turn.copy || {}), from: info.copiedFrom, used: true };

        subjectStats(player, turn.question.subject).answered++;

        const rng = game.rng || Math.random;

        if (turn.correct) {
            award(game, turn);
            // Streak: from the 3rd correct answer in a row, +50 each (not in the Final)
            player.streak++;
            player.bestStreak = Math.max(player.bestStreak, player.streak);
            if (!turn.final && player.streak >= STREAK_FROM) {
                turn.bonus = STREAK_BONUS;
                player.score += STREAK_BONUS;
            }
            turn.cheer = pickOneOf(CHEERS, rng);
        } else {
            player.wrong++;
            player.streak = 0;
            if (turn.final) player.finalCorrect = false;
            turn.cheer = pickOneOf(ENCOURAGEMENT, rng);
        }

        return turn;
    }

    function canUse(game, lifeline) {
        const turn = current(game);
        if (!turn || turn.final || !LIFELINES.includes(lifeline)) return false;
        if (!game.players[turn.player].lifelines[lifeline]) return false;
        if (lifeline === "save") return turn.answered && !turn.correct && !turn.save;
        // No PEEK on a True/False question without a hint: crossing out the
        // wrong answer would give it away
        if (lifeline === "peek" && !turn.question.hint && turn.answers.length <= 2) return false;
        return !turn.answered;
    }

    function spend(game, lifeline) {
        game.players[current(game).player].lifelines[lifeline] = false;
    }

    // PEEK: a hint (or, if a question has none, one wrong answer crossed out)
    function usePeek(game, rng = Math.random) {
        if (!canUse(game, "peek")) return null;
        const turn = current(game);
        spend(game, "peek");
        turn.peeked = true;
        if (turn.question.hint) return { hint: turn.question.hint };
        const wrong = turn.answers.map((a, i) => ({ a, i })).filter(x => !x.a.correct);
        turn.removed = wrong.length ? wrong[Math.floor(rng() * wrong.length)].i : -1;
        return { removed: turn.removed };
    }

    // COPY. Team play: the facilitator picks which team to copy, then taps that
    // team's answer (answer() with copiedFrom). Solo: a classmate suggests one.
    function useCopy(game, rng = Math.random) {
        if (!canUse(game, "copy")) return null;
        const turn = current(game);
        spend(game, "copy");
        if (game.setup.mode === "teams") {
            turn.copy = { from: null, used: false };
            return { teams: game.players.map((p, i) => i).filter(i => i !== turn.player) };
        }
        const right = rng() < CLASSMATE_ACCURACY[turn.grade];
        const correctIndex = turn.answers.findIndex(a => a.correct);
        const wrong = turn.answers.map((a, i) => i).filter(i => i !== correctIndex);
        const suggestion = right ? correctIndex : wrong[Math.floor(rng() * wrong.length)];
        turn.copy = { from: "A classmate", suggestion, used: false };
        return { suggestion };
    }

    // SAVE after a wrong answer. Team play: the rescuing team answers;
    // solo: a classmate tries. A successful rescue counts as correct.
    function useSave(game, info = {}) {
        if (!canUse(game, "save")) return null;
        const turn = current(game);
        const player = game.players[turn.player];
        const rng = info.rng || Math.random;
        let success;
        let rescuer = null;

        if (game.setup.mode === "teams") {
            rescuer = Number(info.rescuer);
            if (!game.players[rescuer] || rescuer === turn.player || !turn.answers[info.choice]) return null;
            success = turn.answers[info.choice].correct;
        } else {
            success = rng() < CLASSMATE_ACCURACY[turn.grade];
        }

        spend(game, "save");
        turn.save = { by: rescuer === null ? "A classmate" : game.players[rescuer].name, success };

        if (success) {
            turn.correct = true;
            player.wrong--;
            player.saved++;
            award(game, turn);
            if (rescuer !== null) {
                game.players[rescuer].score += SAVE_BONUS;
                game.players[rescuer].rescues++;
            }
        }
        return turn.save;
    }

    function next(game) {
        if (!game || game.finished) return;
        game.index++;
        if (game.index >= game.turns.length) game.finished = true;
    }

    function isFirstOfGrade(game, index = game.index) {
        const turn = game.turns[index];
        const before = game.turns[index - 1];
        return Boolean(turn) && (!before || before.grade !== turn.grade || before.final !== turn.final);
    }

    function results(game) {
        const players = game.players.map(p => {
            const answered = p.correct + p.wrong;
            const strongest = Object.keys(p.bySubject)
                .map(key => ({ key, ...p.bySubject[key] }))
                .filter(s => s.correct > 0)
                .sort((a, b) => (b.correct / b.answered) - (a.correct / a.answered) || b.correct - a.correct || a.key.localeCompare(b.key))[0];
            return {
                name: p.name,
                score: p.score,
                correct: p.correct,
                wrong: p.wrong,
                accuracy: answered ? Math.round((p.correct / answered) * 100) : 0,
                highestGrade: p.highestGrade,
                strongest: strongest ? SUBJECTS[strongest.key].name : null,
                finalCorrect: p.finalCorrect === true,
                saved: p.saved,
                rescues: p.rescues,
                bestStreak: p.bestStreak
            };
        });
        const best = Math.max(...players.map(p => p.score));
        return {
            players: [...players].sort((a, b) => b.score - a.score),
            winners: players.filter(p => p.score === best).map(p => p.name),
            tie: players.filter(p => p.score === best).length > 1
        };
    }

    // Questions dealt for a game that was abandoned go back into the pool
    function releaseUnplayed(game) {
        if (!game) return;
        const unplayed = game.turns.slice(game.index + (current(game) && current(game).answered ? 1 : 0)).map(t => t.question.id);
        getEngine().release(game.sessionKey, unplayed);
    }


    // ==========================================
    // SAVED DATA (its own history; personal progress is never touched)
    // ==========================================

    let saved = null;

    function load() {
        if (saved) return saved;
        saved = { history: getEngine().createHistory(), setup: null };
        try {
            const raw = storage.get(STORAGE_KEY);
            if (raw) {
                const data = JSON.parse(raw);
                if (isPlainObject(data)) {
                    saved.history = getEngine().normalizeHistory(data.history);
                    if (isPlainObject(data.setup)) saved.setup = cleanSetup(data.setup);
                }
            }
        } catch (error) {
            console.error("Could not load game show data:", error);
        }
        return saved;
    }

    function persist() {
        storage.set(STORAGE_KEY, JSON.stringify(load()));
    }


    // ==========================================
    // SCREENS
    // ==========================================

    let state = { game: null, ui: null, message: "", finalIntroShown: false };

    function letter(i) {
        return String.fromCharCode(65 + i);
    }

    function gradeLabel(turn) {
        return turn.final ? "⭐ FINAL CHALLENGE" : "GRADE " + turn.grade;
    }

    function subjectLabel(turn) {
        const s = SUBJECTS[turn.question.subject];
        return s.icon + " " + s.name;
    }

    // ----- Setup -----

    function showSetup() {

        QuestionTimer.stop();
        screen = "grade-setup";

        const last = load().setup || cleanSetup({ mode: "teams", names: ["Team 1", "Team 2"], perGrade: 2, timerMode: "off" });
        const teamNames = last.mode === "teams" ? last.names : ["Team 1", "Team 2"];
        const soloName = last.mode === "solo" ? last.names[0] : (player.name || "");

        render(`
            <div class="gs-setup">
                <div class="gs-chalk-title">
                    <div class="gs-kicker">🎤 THE LIFE QUEST GAME SHOW</div>
                    <h2 tabindex="-1" data-autofocus>${escapeHTML(TITLE)}</h2>
                    <p>Climb from Grade 1 to Grade 5 (it gets harder as you go!), then take on the Final Challenge. 14 categories, from football to brain teasers.</p>
                </div>

                <div class="gs-setup-grid">
                    <div class="gs-setup-box" role="group" aria-labelledby="gs-mode-label">
                        <strong id="gs-mode-label">Who is playing?</strong>
                        <div class="gs-choice-row">
                            <button class="gs-choice ${last.mode === "solo" ? "is-selected" : ""}" data-gs-mode="solo" aria-pressed="${last.mode === "solo"}">🙋 One player</button>
                            <button class="gs-choice ${last.mode === "teams" ? "is-selected" : ""}" data-gs-mode="teams" aria-pressed="${last.mode === "teams"}">👥 Teams</button>
                        </div>

                        <div id="gs-solo" ${last.mode === "solo" ? "" : "hidden"}>
                            <label class="gs-label">Player name
                                <input class="gs-input" id="gs-solo-name" maxlength="24" value="${escapeHTML(soloName)}" placeholder="Name">
                            </label>
                        </div>

                        <div id="gs-teams" ${last.mode === "teams" ? "" : "hidden"}>
                            <div class="gs-label">Number of teams</div>
                            <div class="gs-choice-row">
                                ${[2, 3, 4, 5, 6].map(n => `
                                    <button class="gs-choice gs-small ${n === teamNames.length ? "is-selected" : ""}" data-gs-teams="${n}" aria-pressed="${n === teamNames.length}">${n}</button>
                                `).join("")}
                            </div>
                            <div class="gs-team-names" id="gs-team-names"></div>
                        </div>
                    </div>

                    <div class="gs-setup-box">
                        <div role="group" aria-labelledby="gs-per-label">
                            <strong id="gs-per-label">Questions per grade (for each ${last.mode === "teams" ? "team" : "player"})</strong>
                            <div class="gs-choice-row">
                                ${PER_GRADE_CHOICES.map(n => `
                                    <button class="gs-choice gs-small ${n === last.perGrade ? "is-selected" : ""}" data-gs-per="${n}" aria-pressed="${n === last.perGrade}">${n}</button>
                                `).join("")}
                            </div>
                        </div>

                        <div role="group" aria-labelledby="gs-timer-label">
                            <strong id="gs-timer-label">Timer</strong>
                            <div class="gs-choice-row">
                                ${[["off", "No timer"], ["standard", "45 seconds"], ["extra", "Extra time"]].map(([mode, label]) => `
                                    <button class="gs-choice gs-small ${mode === last.timerMode ? "is-selected" : ""}" data-gs-timer="${mode}" aria-pressed="${mode === last.timerMode}">${label}</button>
                                `).join("")}
                            </div>
                        </div>

                        <div role="group" aria-labelledby="gs-subj-label">
                            <strong id="gs-subj-label">Categories</strong>
                            <div class="gs-choice-row gs-subjects">
                                ${SUBJECT_KEYS.map(key => `
                                    <button class="gs-chip ${last.subjects.includes(key) ? "is-selected" : ""}" data-gs-subject="${key}" aria-pressed="${last.subjects.includes(key)}">
                                        ${SUBJECTS[key].icon} ${escapeHTML(SUBJECTS[key].name)}
                                    </button>
                                `).join("")}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="gs-rules">
                    <span>🍎 Grade 1 = 100 · Grade 2 = 200 · Grade 3 = 300 · Grade 4 = 400 · Grade 5 = 500</span>
                    <span>🔥 3+ correct in a row = +${STREAK_BONUS} streak bonus each</span>
                    <span>⭐ Final Challenge = ${FINAL_BONUS.toLocaleString("en-US")} bonus</span>
                    <span>👀 Peek · 📝 Copy · 🛟 Save: once each per game</span>
                </div>

                <p class="lq-message" id="lq-message" role="alert">${escapeHTML(state.message || "")}</p>

                <div class="lq-result-actions">
                    <button id="gs-start" class="gs-go">🎬 START THE SHOW</button>
                    <button id="gs-back">🏠 BACK TO LIFE QUEST</button>
                </div>
            </div>
        `);

        state.message = "";

        const form = {
            mode: last.mode,
            teams: teamNames.length,
            names: [...teamNames],
            perGrade: last.perGrade,
            timerMode: last.timerMode,
            subjects: [...last.subjects]
        };

        const pressed = (selector, button) => document.querySelectorAll(selector).forEach(b => {
            b.classList.toggle("is-selected", b === button);
            b.setAttribute("aria-pressed", b === button ? "true" : "false");
        });

        function drawTeamNames() {
            const box = document.getElementById("gs-team-names");
            const current = [...box.querySelectorAll("input")].map(input => input.value);
            current.forEach((value, i) => { form.names[i] = value; });
            box.innerHTML = Array.from({ length: form.teams }, (_, i) => `
                <label class="gs-label">Team ${i + 1}
                    <input class="gs-input" data-gs-name="${i}" maxlength="24" value="${escapeHTML(form.names[i] || "Team " + (i + 1))}">
                </label>
            `).join("");
        }
        drawTeamNames();

        document.querySelectorAll("[data-gs-mode]").forEach(button => button.addEventListener("click", () => {
            form.mode = button.dataset.gsMode;
            pressed("[data-gs-mode]", button);
            document.getElementById("gs-solo").hidden = form.mode !== "solo";
            document.getElementById("gs-teams").hidden = form.mode !== "teams";
            document.getElementById("gs-per-label").textContent =
                "Questions per grade (for each " + (form.mode === "teams" ? "team" : "player") + ")";
        }));
        document.querySelectorAll("[data-gs-teams]").forEach(button => button.addEventListener("click", () => {
            form.teams = Number(button.dataset.gsTeams);
            pressed("[data-gs-teams]", button);
            drawTeamNames();
        }));
        document.querySelectorAll("[data-gs-per]").forEach(button => button.addEventListener("click", () => {
            form.perGrade = Number(button.dataset.gsPer);
            pressed("[data-gs-per]", button);
        }));
        document.querySelectorAll("[data-gs-timer]").forEach(button => button.addEventListener("click", () => {
            form.timerMode = button.dataset.gsTimer;
            pressed("[data-gs-timer]", button);
        }));
        document.querySelectorAll("[data-gs-subject]").forEach(button => button.addEventListener("click", () => {
            const key = button.dataset.gsSubject;
            const on = !form.subjects.includes(key);
            form.subjects = on ? [...form.subjects, key] : form.subjects.filter(s => s !== key);
            button.classList.toggle("is-selected", on);
            button.setAttribute("aria-pressed", on ? "true" : "false");
        }));

        on("gs-start", () => {
            const names = form.mode === "solo"
                ? [document.getElementById("gs-solo-name").value]
                : [...document.querySelectorAll("[data-gs-name]")].map(input => input.value);
            begin({ mode: form.mode, names, perGrade: form.perGrade, timerMode: form.timerMode, subjects: form.subjects });
        });
        on("gs-back", showProfile);
    }

    function begin(setup) {
        QuestionTimer.stop();
        if (state.game) releaseUnplayed(state.game);

        const data = load();
        const made = createGame(setup, { history: data.history });

        if (made.error) {
            state.message = made.error;
            data.setup = cleanSetup(setup);
            showSetup();
            return;
        }

        data.setup = made.game.setup;
        persist();

        state = { game: made.game, ui: null, message: "", finalIntroShown: false };
        showTurn();
    }

    // ----- Playing -----

    function showTurn() {
        const game = state.game;
        if (!game) return showSetup();
        if (game.finished) return showResults();

        const turn = current(game);
        if (turn.final && !state.finalIntroShown) return showFinalIntro();

        state.ui = null;
        if (!turn.shown) {
            turn.shown = true;
            getEngine().noteShown(load().history, turn.question);
            persist();
        }
        renderQuestion(true);
    }

    function timerSeconds(turn) {
        const mode = state.game.setup.timerMode;
        return mode === "off" ? 0 : QuestionTimer.secondsFor(turn.final ? "final" : "easy", mode);
    }

    function renderQuestion(firstShow = false) {

        const game = state.game;
        const turn = current(game);
        if (!turn) return showTurn();

        screen = "grade-question";

        const who = game.players[turn.player];
        const total = game.turns.length;
        const ui = state.ui || {};
        const seconds = timerSeconds(turn);
        const timeLeft = QuestionTimer.isRunning() || QuestionTimer.isPaused() ? QuestionTimer.secondsLeft() : seconds;
        const pickingAnswer = !turn.answered || ui.mode === "save-answer";
        const correctIndex = turn.answers.findIndex(a => a.correct);

        const lifelineButton = (key, icon, name) => {
            const usable = canUse(game, key) && !ui.mode;
            const spent = !who.lifelines[key];
            return `
                <button class="gs-lifeline ${spent ? "is-spent" : ""}" data-gs-lifeline="${key}" ${usable ? "" : "disabled"}
                    aria-label="${name}${spent ? ", already used" : ""}">
                    <span aria-hidden="true">${icon}</span> ${name}
                </button>`;
        };

        render(`
            <div class="gs-stage ${turn.final ? "is-final" : ""} ${firstShow ? "is-new" : ""}">

                <div class="gs-topbar">
                    <ol class="gs-ladder" aria-label="Grade progress">
                        ${GRADE_SCHOOL_BANK.grades.map(g => `
                            <li class="gs-rung gs-g${g} ${!turn.final && g === turn.grade ? "is-current" : ""} ${turn.final || g < turn.grade ? "is-done" : ""}"
                                ${!turn.final && g === turn.grade ? 'aria-current="step"' : ""}>G${g}</li>
                        `).join("")}
                        <li class="gs-rung gs-final ${turn.final ? "is-current" : ""}" ${turn.final ? 'aria-current="step"' : ""}>⭐</li>
                    </ol>
                    <div class="gs-progress">Question ${game.index + 1} of ${total} • ${total - game.index - 1} left</div>
                </div>

                ${game.players.length > 1 ? `
                    <div class="gs-scores" aria-label="Scores">
                        ${game.players.map((p, i) => `
                            <span class="gs-score ${i === turn.player ? "is-up" : ""}">${escapeHTML(p.name)}: ${p.score.toLocaleString("en-US")}</span>
                        `).join("")}
                    </div>
                ` : ""}

                <div class="gs-board">
                    <div class="gs-board-head">
                        <span class="gs-grade-badge gs-g${turn.final ? "final" : turn.grade}">${gradeLabel(turn)}</span>
                        <span class="gs-subject">${subjectLabel(turn)}</span>
                        <span class="gs-up">🎤 ${escapeHTML(who.name)}${game.players.length === 1 ? " • " + who.score.toLocaleString("en-US") + " pts" : ""}</span>
                    </div>

                    ${isFirstOfGrade(game) && !turn.answered && !turn.final ? `<div class="gs-welcome">📚 Welcome to Grade ${turn.grade}!</div>` : ""}
                    ${turn.final ? `<div class="gs-welcome gs-final-note">Worth ${FINAL_BONUS.toLocaleString("en-US")} bonus points. No lifelines!</div>` : ""}

                    ${!turn.answered && seconds ? timerHTML(timeLeft, seconds) : ""}

                    <h2 class="gs-question" id="gs-question" tabindex="-1" ${!turn.answered ? "data-autofocus" : ""}>${escapeHTML(turn.question.question)}</h2>

                    <div class="gs-worth">${turn.final ? "⭐ " + FINAL_BONUS.toLocaleString("en-US") + " bonus points" : "🍎 " + GRADE_POINTS[turn.grade] + " points"}</div>
                </div>

                ${turn.peeked && turn.question.hint && !turn.answered ? `<div class="gs-note gs-peek" role="note">👀 <strong>Peek:</strong> ${escapeHTML(turn.question.hint)}</div>` : ""}
                ${ui.mode === "copy-pick" ? `
                    <div class="gs-note" role="note">📝 <strong>Copy:</strong> which team do you want to copy?
                        <div class="gs-choice-row">
                            ${ui.teams.map(i => `<button class="gs-choice gs-small" data-gs-copy-team="${i}">${escapeHTML(game.players[i].name)}</button>`).join("")}
                        </div>
                    </div>` : ""}
                ${ui.mode === "copy-answer" ? `<div class="gs-note" role="note">📝 <strong>Copying ${escapeHTML(game.players[ui.from].name)}:</strong> ask them for their answer, then tap it.</div>` : ""}
                ${turn.copy && turn.copy.suggestion !== undefined && !turn.answered ? `
                    <div class="gs-note" role="note">📝 <strong>A classmate thinks it's ${letter(turn.copy.suggestion)}: ${escapeHTML(turn.answers[turn.copy.suggestion].text)}</strong>
                        <div class="gs-choice-row"><button class="gs-choice gs-small" id="gs-copy-use">Use this answer</button></div>
                    </div>` : ""}
                ${ui.mode === "save-pick" ? `
                    <div class="gs-note" role="note">🛟 <strong>Save:</strong> which team will try to rescue ${escapeHTML(who.name)}?
                        <div class="gs-choice-row">
                            ${game.players.map((p, i) => i).filter(i => i !== turn.player).map(i => `<button class="gs-choice gs-small" data-gs-save-team="${i}">${escapeHTML(game.players[i].name)}</button>`).join("")}
                        </div>
                    </div>` : ""}
                ${ui.mode === "save-answer" ? `<div class="gs-note" role="note">🛟 <strong>${escapeHTML(game.players[ui.rescuer].name)} to the rescue:</strong> ask them for their answer, then tap it.</div>` : ""}

                <div class="gs-answers" role="group" aria-labelledby="gs-question">
                    ${turn.answers.map((a, i) => {
                        const showResult = turn.answered && ui.mode !== "save-answer";
                        const isRight = showResult && a.correct;
                        const isWrong = showResult && i === turn.picked && !a.correct;
                        const crossed = turn.removed === i && !turn.answered;
                        const disabled = !pickingAnswer || crossed || ui.mode === "copy-pick" || ui.mode === "save-pick" ||
                            (ui.mode === "save-answer" && i === turn.picked);
                        return `
                            <button class="gs-answer ${isRight ? "is-correct" : ""} ${isWrong ? "is-wrong" : ""} ${crossed ? "is-crossed" : ""}"
                                data-gs-answer="${i}" ${disabled ? "disabled" : ""}>
                                <span class="gs-letter" aria-hidden="true">${letter(i)}</span>
                                <span class="gs-answer-text">${escapeHTML(a.text)}</span>
                                ${isRight ? '<span class="gs-mark">✅ Correct</span>' : ""}
                                ${isWrong ? '<span class="gs-mark">❌ Picked</span>' : ""}
                            </button>`;
                    }).join("")}
                </div>

                ${turn.answered && ui.mode !== "save-pick" && ui.mode !== "save-answer" ? feedbackHTML(turn, who, correctIndex) : ""}

                <div class="gs-tools">
                    ${!turn.final ? `
                        ${lifelineButton("peek", "👀", "PEEK")}
                        ${lifelineButton("copy", "📝", "COPY")}
                        ${lifelineButton("save", "🛟", "SAVE")}
                    ` : ""}
                    <button class="lq-tool" id="gs-read">🔊 Read aloud</button>
                    <button class="lq-tool" id="gs-quit">🏠 Quit game</button>
                </div>

                <p class="lq-note lq-key-tip">Tip: press A–${letter(turn.answers.length - 1)} (or 1–${turn.answers.length}) to answer, R to hear it read aloud.</p>
            </div>
        `);

        document.querySelectorAll("[data-gs-answer]").forEach(button =>
            button.addEventListener("click", () => choose(Number(button.dataset.gsAnswer))));
        document.querySelectorAll("[data-gs-lifeline]").forEach(button =>
            button.addEventListener("click", () => lifeline(button.dataset.gsLifeline)));
        document.querySelectorAll("[data-gs-copy-team]").forEach(button => button.addEventListener("click", () => {
            state.ui = { mode: "copy-answer", from: Number(button.dataset.gsCopyTeam) };
            renderQuestion();
        }));
        document.querySelectorAll("[data-gs-save-team]").forEach(button => button.addEventListener("click", () => {
            state.ui = { mode: "save-answer", rescuer: Number(button.dataset.gsSaveTeam) };
            renderQuestion();
        }));
        on("gs-copy-use", () => choose(turn.copy.suggestion, { copiedFrom: "A classmate" }));
        on("gs-read", readAloud);
        on("gs-next", () => { stopSpeaking(); next(game); showTurn(); });
        on("gs-quit", quit);

        // The clock starts when the question first appears, and keeps going through re-draws
        if (!turn.answered && seconds && !turn.timerStarted) {
            turn.timerStarted = true;
            QuestionTimer.start(seconds, {
                onTick: (left, all) => updateTimerDisplay(left, all),
                onWarning: mark => { announce(mark + " seconds left."); playSound(mark === QuestionTimer.WARNING_AT ? "warning" : "urgent"); },
                onExpire: () => choose(-1, { timedOut: true })
            });
        } else if (!turn.answered) {
            QuestionTimer.resume();
        }

        if (firstShow && settings.autoRead) readAloud();
    }

    function feedbackHTML(turn, who, correctIndex) {
        const right = turn.answers[correctIndex];
        let title;
        if (turn.correct && turn.save) title = "🛟 SAVED! " + turn.save.by + " got it. +" + turn.points.toLocaleString("en-US") + " points";
        else if (turn.correct) title = (turn.final ? "🏆 FINAL CHALLENGE CORRECT! +" : "✅ Correct! +") + turn.points.toLocaleString("en-US") + " points";
        else if (turn.timedOut) title = "⏰ TIME'S UP!";
        else title = "❌ Not quite.";
        const saveFailed = turn.save && !turn.save.success;

        const nextTurn = state.game.turns[state.game.index + 1];
        const nextLabel = !nextTurn ? "🏁 SEE RESULTS"
            : nextTurn.final && !turn.final ? "⭐ ON TO THE FINAL CHALLENGE"
            : !nextTurn.final && nextTurn.grade !== turn.grade ? "📚 ON TO GRADE " + nextTurn.grade
            : "➡️ NEXT QUESTION";

        return `
            <div class="gs-feedback ${turn.correct ? "is-correct" : "is-wrong"}" id="gs-feedback" tabindex="-1" data-autofocus>
                ${turn.cheer ? `<div class="gs-cheer">${escapeHTML(turn.cheer)}</div>` : ""}
                <div class="gs-feedback-title">${escapeHTML(title)}</div>
                ${turn.bonus ? `<div class="gs-streak">🔥 ${who.streak} in a row! +${turn.bonus} streak bonus</div>` : ""}
                ${saveFailed ? `<div>🛟 ${escapeHTML(turn.save.by)} tried to save it, but that wasn't right either.</div>` : ""}
                ${!turn.correct ? `<div class="gs-right-answer">The answer is <strong>${letter(correctIndex)}: ${escapeHTML(right.text)}</strong></div>` : ""}
                ${turn.question.explanation ? `<div class="gs-explain">💡 ${escapeHTML(turn.question.explanation)}</div>` : ""}
                ${!turn.correct && canUse(state.game, "save") ? `<div class="gs-save-hint">🛟 ${escapeHTML(who.name)} can still use SAVE!</div>` : ""}
                <button id="gs-next" class="gs-go">${nextLabel}</button>
            </div>`;
    }

    function choose(index, info = {}) {
        const game = state.game;
        const turn = current(game);
        if (!turn) return;

        // Rescue answer for SAVE (team play)
        if (state.ui && state.ui.mode === "save-answer") {
            if (!turn.answers[index] || index === turn.picked) return;
            const result = useSave(game, { rescuer: state.ui.rescuer, choice: index });
            state.ui = null;
            afterSave(result);
            return;
        }

        if (turn.answered) return;
        // While picking a team to copy, answers wait (but time running out still counts)
        if (!info.timedOut && state.ui && (state.ui.mode === "copy-pick" || state.ui.mode === "save-pick")) return;

        // An answer can't sneak in after the clock ran out (e.g. a background tab)
        if (!info.timedOut && timerSeconds(turn)) {
            QuestionTimer.check();
            if (turn.answered) return;
        }

        if (state.ui && state.ui.mode === "copy-answer") info.copiedFrom = game.players[state.ui.from].name;

        QuestionTimer.stop();
        stopSpeaking();

        answer(game, index, info);
        getEngine().recordAnswer(load().history, turn.question, { correct: turn.correct, timedOut: turn.timedOut });
        persist();

        state.ui = null;
        playSound(turn.correct ? (turn.final ? "complete" : "correct") : turn.timedOut ? "timeup" : "miss");
        if (turn.correct && turn.final) launchConfetti();
        renderQuestion();
        announce(turn.correct
            ? "Correct! " + turn.points + " points."
            : (turn.timedOut ? "Time's up. " : "Not quite. ") + "The answer is " + turn.answers.find(a => a.correct).text + ".");
    }

    function afterSave(result) {
        if (!result) return renderQuestion();
        playSound(result.success ? "correct" : "miss");
        renderQuestion();
        announce(result.success ? "Saved! " + result.by + " got it right." : "The save didn't work this time.");
    }

    function lifeline(key) {
        const game = state.game;
        if (!canUse(game, key)) return;

        if (key === "peek") {
            const result = usePeek(game);
            renderQuestion();
            announce(result && result.hint ? "Peek: " + result.hint : "One wrong answer was crossed out.");
            return;
        }
        if (key === "copy") {
            const result = useCopy(game);
            if (result && result.teams) state.ui = { mode: "copy-pick", teams: result.teams };
            renderQuestion();
            if (result && result.suggestion !== undefined) {
                const turn = current(game);
                announce("A classmate thinks it's " + turn.answers[result.suggestion].text + ".");
            }
            return;
        }
        if (key === "save") {
            if (game.setup.mode === "teams") {
                state.ui = { mode: "save-pick" };
                renderQuestion();
            } else {
                afterSave(useSave(game));
            }
        }
    }

    function readAloud() {
        const turn = current(state.game);
        if (!turn) return;
        const subject = SUBJECTS[turn.question.subject].name;
        if (turn.answered) {
            const right = turn.answers.find(a => a.correct).text;
            speak((turn.correct ? "Correct! " : "The answer is " + right + ". ") + (turn.question.explanation || ""));
            return;
        }
        speak(
            (turn.final ? "Final Challenge. " : "Grade " + turn.grade + ". ") + subject + ". " +
            turn.question.question + " " +
            turn.answers.map((a, i) => letter(i) + ": " + a.text + ".").join(" ")
        );
    }

    function quit() {
        if (!window.confirm("Leave this game? The scores will not be saved.")) return;
        QuestionTimer.stop();
        stopSpeaking();
        releaseUnplayed(state.game);
        state = { game: null, ui: null, message: "", finalIntroShown: false };
        showProfile();
    }

    // ----- Final Challenge intro -----

    function showFinalIntro() {
        QuestionTimer.stop();
        screen = "grade-final-intro";
        const game = state.game;
        render(`
            <div class="gs-final-intro">
                <div class="gs-stars" aria-hidden="true">⭐ ⭐ ⭐</div>
                <h2 tabindex="-1" data-autofocus>5TH GRADE FINAL CHALLENGE</h2>
                <p>One last 5th-grade question for ${game.players.length > 1 ? "each team" : escapeHTML(game.players[0].name)}.</p>
                <p class="gs-final-big">Get it right for <strong>${FINAL_BONUS.toLocaleString("en-US")} BONUS POINTS!</strong></p>
                <p>No lifelines this time. Think carefully!</p>
                <div class="gs-scores">
                    ${game.players.map(p => `<span class="gs-score">${escapeHTML(p.name)}: ${p.score.toLocaleString("en-US")}</span>`).join("")}
                </div>
                <button id="gs-final-go" class="gs-go">🎤 WE'RE READY!</button>
            </div>
        `);
        on("gs-final-go", () => { state.finalIntroShown = true; showTurn(); });
    }

    // ----- Results -----

    function showResults() {
        QuestionTimer.stop();
        screen = "grade-results";
        const game = state.game;
        const r = results(game);
        const solo = game.players.length === 1;
        const top = r.players[0];

        const verdict = solo
            ? (top.finalCorrect ? "YES! You conquered the 5th Grade Final Challenge! 🎓" : "Not this time, but every question makes you smarter! 📚")
            : r.tie ? "It's a tie! 🤝" : "🏆 " + r.winners[0] + " wins!";

        render(`
            <div class="gs-results">
                <div class="gs-kicker">🏁 FINAL RESULTS</div>
                <h2 tabindex="-1" data-autofocus>${escapeHTML(TITLE.toUpperCase())}</h2>
                <div class="gs-verdict">${escapeHTML(verdict)}</div>
                ${r.tie ? `<p>Winners: ${r.winners.map(escapeHTML).join(" and ")}</p>` : ""}

                <div class="gs-result-list">
                    ${r.players.map((p, i) => `
                        <div class="gs-result-card ${r.winners.includes(p.name) ? "is-winner" : ""}">
                            <div class="gs-result-name">${r.winners.includes(p.name) ? "🏆 " : (i + 1) + ". "}${escapeHTML(p.name)}</div>
                            <div class="gs-result-score">${p.score.toLocaleString("en-US")} <span>points</span></div>
                            <dl class="gs-result-stats">
                                <div><dt>Correct</dt><dd>${p.correct}</dd></div>
                                <div><dt>Incorrect</dt><dd>${p.wrong}</dd></div>
                                <div><dt>Accuracy</dt><dd>${p.accuracy}%</dd></div>
                                <div><dt>Highest grade</dt><dd>${p.highestGrade ? "Grade " + p.highestGrade : "–"}</dd></div>
                                <div><dt>Final Challenge</dt><dd>${p.finalCorrect ? "✅ Correct" : "❌ Missed"}</dd></div>
                                <div><dt>Best category</dt><dd>${p.strongest ? escapeHTML(p.strongest) : "–"}</dd></div>
                                <div><dt>Best streak</dt><dd>🔥 ${p.bestStreak}</dd></div>
                            </dl>
                        </div>
                    `).join("")}
                </div>

                <div class="lq-result-actions">
                    <button id="gs-again" class="gs-go">🔄 PLAY AGAIN</button>
                    <button id="gs-setup-again">⚙️ CHANGE SETUP</button>
                    <button id="gs-home">🏠 BACK TO LIFE QUEST</button>
                </div>
            </div>
        `);

        if (!state.celebrated) {
            state.celebrated = true;
            playSound("complete");
            launchConfetti();
        }

        on("gs-again", () => begin(game.setup));
        on("gs-setup-again", showSetup);
        on("gs-home", () => { state = { game: null, ui: null, message: "", finalIntroShown: false }; showProfile(); });
    }

    // ----- Hooks used by game.js -----

    // Comes back to the right screen after Settings
    function restore(name) {
        if (name === "grade-setup") return showSetup();
        if (!state.game) return showSetup();
        if (name === "grade-final-intro") return showFinalIntro();
        if (name === "grade-results") return showResults();
        return renderQuestion();
    }

    // Keyboard: A–D or 1–4 answer, R reads aloud. Returns true when handled.
    function handleKey(event) {
        if (screen !== "grade-question" || !state.game) return false;
        const key = String(event.key || "").toLowerCase();
        const turn = current(state.game);
        if (!turn) return false;
        if (key === "r") { event.preventDefault(); readAloud(); return true; }
        let index = -1;
        if (/^[1-9]$/.test(key)) index = Number(key) - 1;
        else if (/^[a-z]$/.test(key)) index = key.charCodeAt(0) - 97;
        if (index >= 0 && index < turn.answers.length) {
            const button = document.querySelector('[data-gs-answer="' + index + '"]');
            if (button && !button.disabled) {
                event.preventDefault();
                choose(index);
                return true;
            }
        }
        return false;
    }

    return {
        TITLE,
        GRADE_POINTS,
        FINAL_BONUS,
        SAVE_BONUS,
        SUBJECT_KEYS,
        RUNG_DIFFICULTY,
        STREAK_BONUS,
        activeQuestions,
        // logic (tests)
        getEngine,
        cleanSetup,
        createGame,
        current,
        answer,
        canUse,
        usePeek,
        useCopy,
        useSave,
        next,
        isFirstOfGrade,
        results,
        releaseUnplayed,
        // screens
        showSetup,
        restore,
        handleKey
    };

})();
