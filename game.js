// ==========================================
// LIFE QUEST
// An accessible quiz adventure for American high school students.
//
// Files (loaded in this order by index.html):
//   questions.js  the question bank (see the top of that file to add questions)
//   engine.js     QuestionEngine: picks questions, stops repeats, keeps history
//   timer.js      QuestionTimer: the one countdown used by the game
//   voice-config.js / voice.js
//                 optional natural (ElevenLabs) reading voice, through the
//                 school's own voice server in voice-proxy/ (no key in the game)
//   game.js       screens, scoring, profiles, settings (this file)
//
// Modes:
//   ⚡ Quest Board       pick a category and a value, clear the board
//   🎓 Classroom Mode    teams take turns on a timed board (kept separate from
//                        personal progress)
//   🔁 Practice Mistakes revisits missed questions, no timer
//
// Accessibility: text size, high contrast, easy-to-read font, less movement,
// read-aloud (button or R key, optional auto-read, built-in or natural voice),
// keyboard play (keys 1-4), question timer (Standard / Extra time / Off),
// screen-reader support, gentle optional sounds.
// ==========================================

"use strict";


// ==========================================
// CONFIGURATION
// ==========================================

const STORAGE_KEYS = {
    legacyPlayer: "lifeQuestPlayer",        // V1/V2 single-player save (migrated automatically)
    profiles: "lifeQuestProfiles",
    activePlayer: "lifeQuestActivePlayer",
    settings: "lifeQuestSettings",
    classroom: "lifeQuestClassroom"
};

const MAX_NAME_LENGTH = 24;
const PRACTICE_SIZE = 5;
const PRACTICE_LABEL = "🔁 Practice Mistakes";

const questModes = {

    rookie: {
        name: "🟢 ROOKIE QUEST",
        icon: "🟢",
        title: "ROOKIE QUEST",
        label: "easy",
        questions: 5,
        difficulties: ["easy"],
        className: "rookie"
    },

    challenge: {
        name: "🟡 CHALLENGE QUEST",
        icon: "🟡",
        title: "CHALLENGE QUEST",
        label: "mixed",
        questions: 10,
        difficulties: ["easy", "medium"],
        className: "challenge"
    },

    championship: {
        name: "🔴 CHAMPIONSHIP",
        icon: "🔴",
        title: "CHAMPIONSHIP",
        label: "challenging",
        questions: 15,
        difficulties: ["easy", "medium", "hard"],
        className: "championship"
    }
};

// XP for a correct answer, by game type and question difficulty.
// Board points (100-500) are the game-show score; XP is personal progress and
// grows more slowly. A full 6-topic board is worth at most 840 XP plus the
// clearing bonus, so reaching Level 10 (10,000 XP) takes many boards.
const XP_TABLE = {
    board:        { easy: 20,  medium: 30,  hard: 40 },
    final:        { easy: 60,  medium: 90,  hard: 120 },   // Final Challenge: worth three times as much
    practice:     { easy: 10,  medium: 15,  hard: 20 },    // missed questions, repeated on purpose
    rookie:       { easy: 20,  medium: 20,  hard: 20 },
    challenge:    { easy: 20,  medium: 30,  hard: 30 },
    championship: { easy: 25,  medium: 35,  hard: 45 }
};

// Extra XP for clearing a whole Quest Board, and more for a perfect one
const BOARD_CLEAR_XP = 100;
const BOARD_PERFECT_XP = 50;

const LEVEL_XP = [0, 500, 1000, 1500, 2000, 3000, 4000, 5500, 7500, 10000];

const CORRECT_TITLES = [
    "CORRECT!", "NICE WORK!", "YOU GOT IT!", "AWESOME!", "GREAT JOB!", "EXACTLY RIGHT!"
];

const MISS_TITLES = [
    "GOOD TRY!", "ALMOST!", "THAT'S OKAY!", "YOU'RE LEARNING!"
];

const RESULT_MESSAGES = {
    3: "Amazing focus! You really know your stuff.",
    2: "Great work! You're getting stronger every quest.",
    1: "You finished the quest, and that takes effort. Every try makes you better."
};


// ==========================================
// ACHIEVEMENTS
// ==========================================

const achievements = {

    first_steps: {
        name: "🌱 FIRST STEPS",
        description: "Answer your first question.",
        test: p => p.questionsAnswered >= 1
    },

    sharp_shooter: {
        name: "🎯 SHARP SHOOTER",
        description: "Get 5 correct answers in a row.",
        test: p => p.bestStreak >= 5
    },

    on_fire: {
        name: "🔥 ON FIRE",
        description: "Get 10 correct answers in a row.",
        test: p => p.bestStreak >= 10
    },

    world_traveler: {
        name: "🌍 WORLD TRAVELER",
        description: "Complete a World Explorer quest.",
        test: (p, ctx) => ctx.questCompleted && ctx.category === "world"
    },

    life_ready: {
        name: "💰 LIFE READY",
        description: "Complete a Real Life quest.",
        test: (p, ctx) => ctx.questCompleted && ctx.category === "life"
    },

    work_ready: {
        name: "💼 WORK READY",
        description: "Complete a Work Ready quest.",
        test: (p, ctx) => ctx.questCompleted && ctx.category === "work"
    },

    good_communicator: {
        name: "🤝 GOOD COMMUNICATOR",
        description: "Complete a Social Skills quest.",
        test: (p, ctx) => ctx.questCompleted && ctx.category === "social"
    },

    brainiac: {
        name: "🧠 BRAINIAC",
        description: "Earn 1,000 Brain Power XP.",
        test: p => p.categoryXP.brain >= 1000
    },

    never_give_up: {
        name: "💪 NEVER GIVE UP",
        description: "Get a question right on your second try.",
        test: p => p.secondChanceWins >= 1
    },

    perfect_quest: {
        name: "⭐ PERFECT QUEST",
        description: "Get every question right in a quest.",
        test: (p, ctx) => ctx.questCompleted && ctx.perfect
    },

    mistake_master: {
        name: "🔁 MISTAKE MASTER",
        description: "Finish a Practice Mistakes quest.",
        test: (p, ctx) => ctx.questCompleted && ctx.category === "practice"
    },

    all_rounder: {
        name: "🧭 ALL-ROUNDER",
        description: "Earn XP in every world.",
        test: p => Object.keys(categories).every(key => (p.categoryXP[key] || 0) > 0)
    },

    quest_master: {
        name: "🏆 QUEST MASTER",
        description: "Complete 10 quests.",
        test: p => p.questsCompleted >= 10
    },

    legend: {
        name: "👑 LEGEND",
        description: "Reach Level 10.",
        test: p => getLevel(p.xp) >= 10
    }
};


// ==========================================
// GAME STATE
// ==========================================

let screen = "welcome";           // which screen is showing (used to come back from Settings)
let settingsReturnScreen = "profile";
let welcomeHTML = "";             // the sign-in form from index.html, kept so we can return to it

let profiles = Object.create(null);   // saved players, keyed by lower-case name
let activeKey = "";
let player = createDefaultPlayer();

let currentCategory = "";
let currentQuestion = null;
let currentQuestionIndex = 0;
let questScore = 0;
let questCorrect = 0;
let questQuestions = [];
let questMissedIds = [];
let currentQuestMode = "rookie";

let qState = null;                // per-question state: shuffled answers, hints, tries
let lastFeedback = null;
let lastResult = null;

let storageOK = true;


// ==========================================
// SAFE STORAGE
// School browsers sometimes block localStorage. The game keeps working;
// it just can't remember progress, and it tells the player so.
// ==========================================

const storage = {

    get(key, fallback = null) {
        try {
            const value = window.localStorage.getItem(key);
            return value === null ? fallback : value;
        } catch (error) {
            storageOK = false;
            return fallback;
        }
    },

    set(key, value) {
        try {
            window.localStorage.setItem(key, value);
            return true;
        } catch (error) {
            storageOK = false;
            return false;
        }
    },

    remove(key) {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            storageOK = false;
        }
    }
};


function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}


// ==========================================
// SETTINGS
// ==========================================

const TEXT_SIZES = ["normal", "large", "xlarge"];

// Question timer: normal time, 50% extra time, or no timer (see timer.js)
const TIMER_MODES = ["standard", "extra", "off"];
const VOICES = ["browser", "natural"];

const TIMER_MODE_LABELS = {
    standard: "Standard timer",
    extra: "Extra time (+50%)",
    off: "No timer"
};

function prefersReducedMotion() {
    return typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function defaultSettings() {
    return {
        textSize: "normal",
        highContrast: false,
        readableFont: false,
        reduceMotion: prefersReducedMotion(),
        sound: false,          // off by default: sudden sounds can be stressful
        secondChances: true,
        autoRead: false,       // read each new question aloud
        timerMode: "standard", // "standard", "extra" (+50%) or "off"
        voice: "browser"       // reading voice: "browser" (built-in) or "natural" (ElevenLabs, optional)
    };
}

let settings = defaultSettings();

function loadSettings() {

    const defaults = defaultSettings();
    const raw = storage.get(STORAGE_KEYS.settings);

    if (!raw) return defaults;

    try {
        const saved = JSON.parse(raw);
        const merged = { ...defaults };

        if (isPlainObject(saved)) {
            if (TEXT_SIZES.includes(saved.textSize)) merged.textSize = saved.textSize;
            if (TIMER_MODES.includes(saved.timerMode)) merged.timerMode = saved.timerMode;
            if (VOICES.includes(saved.voice)) merged.voice = saved.voice;
            ["highContrast", "readableFont", "reduceMotion", "sound", "secondChances", "autoRead"]
                .forEach(key => {
                    if (typeof saved[key] === "boolean") merged[key] = saved[key];
                });
        }

        return merged;

    } catch (error) {
        return defaults;
    }
}

function saveSettings() {
    storage.set(STORAGE_KEYS.settings, JSON.stringify(settings));
}

function applySettings() {

    const body = document.body;

    if (!body) return;

    body.classList.toggle("lq-text-large", settings.textSize === "large");
    body.classList.toggle("lq-text-xlarge", settings.textSize === "xlarge");
    body.classList.toggle("lq-high-contrast", settings.highContrast);
    body.classList.toggle("lq-readable-font", settings.readableFont);
    body.classList.toggle("lq-reduce-motion", settings.reduceMotion);
}


// ==========================================
// STYLES ADDED BY THE GAME
// Accessibility modes and the new V3 screens. Your own CSS file is untouched;
// everything here is prefixed with "lq-" so it can't clash with it.
// ==========================================

const LQ_CSS = `

.lq-sr-only {
    position: absolute !important;
    width: 1px; height: 1px;
    margin: -1px; padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* ----- keyboard focus you can actually see ----- */
#game-card:focus { outline: none; }
#game-card :focus-visible,
.lq-fab:focus-visible {
    outline: 4px solid #f59e0b;
    outline-offset: 3px;
}
/* headings we move focus to (for screen readers) don't need a ring */
#game-card [tabindex="-1"]:focus,
#game-card [tabindex="-1"]:focus-visible { outline: none; }

/* ----- comfortable tap targets ----- */
#game-card button { min-height: 48px; }

/* ----- text size ----- */
body.lq-text-large  #game-card { zoom: 1.15; }
body.lq-text-xlarge #game-card { zoom: 1.3; }
@supports not (zoom: 1) {
    body.lq-text-large  #game-card { font-size: 1.15em; }
    body.lq-text-xlarge #game-card { font-size: 1.3em; }
}

/* ----- easy-to-read font ----- */
body.lq-readable-font #game-card,
body.lq-readable-font #game-card * {
    font-family: "Atkinson Hyperlegible", "Lexend", Verdana, "Trebuchet MS", sans-serif !important;
    letter-spacing: 0.03em;
    word-spacing: 0.1em;
}
body.lq-readable-font #game-card { line-height: 1.6; }

/* ----- reduced motion ----- */
body.lq-reduce-motion *,
body.lq-reduce-motion *::before,
body.lq-reduce-motion *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
}

/* ----- high contrast ----- */
body.lq-high-contrast { background: #000 !important; }
body.lq-high-contrast #game-card {
    background: #000 !important;
    color: #fff !important;
    border: 3px solid #fff !important;
    box-shadow: none !important;
}
body.lq-high-contrast #game-card :is(div, section, p, h1, h2, h3, span, small, strong) {
    background: transparent !important;
    background-image: none !important;
    color: #fff !important;
    text-shadow: none !important;
}
body.lq-high-contrast #game-card button {
    background: #000 !important;
    background-image: none !important;
    color: #ffeb3b !important;
    border: 3px solid #ffeb3b !important;
    box-shadow: none !important;
}
body.lq-high-contrast #game-card button * { color: #ffeb3b !important; background: transparent !important; }
body.lq-high-contrast #game-card button:hover:not(:disabled) { background: #ffeb3b !important; color: #000 !important; }
body.lq-high-contrast #game-card button:hover:not(:disabled) * { color: #000 !important; }
body.lq-high-contrast #game-card :is(.profile-category, .rank-card) { border: 2px solid #fff !important; }
body.lq-high-contrast #game-card .progress-bar,
body.lq-high-contrast #game-card .lq-quest-progress,
body.lq-high-contrast #game-card .lq-report-bar { background: #333 !important; border: 2px solid #fff !important; }
body.lq-high-contrast #game-card .progress-fill,
body.lq-high-contrast #game-card .lq-quest-progress > span,
body.lq-high-contrast #game-card .lq-report-bar > span { background: #ffeb3b !important; }
body.lq-high-contrast #game-card .lq-switch[aria-checked="true"],
body.lq-high-contrast #game-card .lq-seg[aria-pressed="true"] { background: #ffeb3b !important; color: #000 !important; }
body.lq-high-contrast #game-card .lq-switch[aria-checked="true"] *,
body.lq-high-contrast #game-card .lq-seg[aria-pressed="true"] * { color: #000 !important; }
body.lq-high-contrast #game-card input { background: #000 !important; color: #fff !important; border: 3px solid #fff !important; }
body.lq-high-contrast #game-card .lq-answer-modal.is-correct { border: 5px solid #00ff66 !important; }
body.lq-high-contrast #game-card .lq-answer-modal.is-wrong { border: 5px dashed #ff5c5c !important; }
body.lq-high-contrast #game-card .lq-timer-ring { background: conic-gradient(#fff calc(var(--lq-timer-p, 1) * 360deg), #444 0) !important; }
body.lq-high-contrast #game-card .lq-timer.is-warning .lq-timer-ring { background: conic-gradient(#ffeb3b calc(var(--lq-timer-p, 1) * 360deg), #444 0) !important; }
body.lq-high-contrast #game-card .lq-timer.is-urgent .lq-timer-ring { background: conic-gradient(#ff5c5c calc(var(--lq-timer-p, 1) * 360deg), #444 0) !important; }
body.lq-high-contrast #game-card .lq-timer-num { background: #000 !important; }
body.lq-high-contrast #game-card .lq-clue-head { background: #000 !important; border-bottom: 2px solid #fff !important; }
body.lq-high-contrast #game-card .lq-timer.is-urgent .lq-timer-num { border: 3px solid #ff5c5c !important; }
body.lq-high-contrast #game-card .lq-clue.is-used { color: #999 !important; border-color: #666 !important; }
body.lq-high-contrast .lq-fab { background: #000; color: #ffeb3b; border-color: #ffeb3b; }
body.lq-high-contrast .lq-toast { background: #000 !important; border: 3px solid #ffeb3b; }
body.lq-high-contrast .lq-toast * { color: #fff !important; }

/* ----- settings button ----- */
.lq-fab {
    position: fixed; top: 14px; right: 14px; z-index: 900;
    width: 52px; height: 52px; padding: 0;
    display: grid; place-items: center;
    border-radius: 50%;
    border: 3px solid #172033;
    background: #fff; color: #172033;
    font-size: 26px; line-height: 1;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}
.lq-fab:hover { background: #eef2ff; }

/* ----- question screen ----- */
.lq-quest-progress {
    height: 12px; margin: 6px 0 10px;
    border-radius: 999px; background: #e2e8f0; overflow: hidden;
}
.lq-quest-progress > span {
    display: block; height: 100%;
    background: #7c3aed; border-radius: 999px;
}
#game-card .lq-answer {
    display: flex; align-items: center; justify-content: flex-start;
    gap: 0.7em; text-align: left;
}
/* Keyboard shortcut numbers: small and quiet, and only shown to keyboard users */
.lq-key {
    flex: none; display: inline-grid; place-items: center;
    width: 1.6em; height: 1.6em;
    border: 1.5px solid currentColor; border-radius: 6px;
    font-weight: 700; font-size: 0.75em; opacity: 0.6;
}
@media (hover: none), (pointer: coarse) {
    .lq-key, .lq-key-tip { display: none !important; }
}
#game-card .lq-answer.lq-eliminated { opacity: 0.35; text-decoration: line-through; }
#game-card .lq-answer.lq-tried { opacity: 0.55; }
.lq-tools { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin: 18px 0 6px; }
#game-card .lq-tool {
    min-height: 48px; padding: 10px 16px;
    border-radius: 14px; border: 2px solid #c7d2fe;
    background: #eef2ff; color: #1e293b;
    font: inherit; font-weight: 700; cursor: pointer;
}
#game-card .lq-tool:hover:not(:disabled) { background: #e0e7ff; }
#game-card .lq-tool:disabled { opacity: 0.5; cursor: not-allowed; }
.lq-message { min-height: 1.6em; margin: 8px 0; font-weight: 700; color: #b45309; text-align: center; }
.lq-note { margin: 8px 0; opacity: 0.85; }
.lq-warning { margin: 10px 0; padding: 10px 14px; border-radius: 12px; background: #fef3c7; color: #78350f; font-weight: 700; }
.lq-stars { margin: 6px 0; font-size: 2.6em; letter-spacing: 0.1em; }

/* ----- practice world ----- */
.quest-map .quest-world.world-practice {
    background: linear-gradient(135deg, #14b8a6, #0f766e); color: #fff;
}
.quest-map .quest-world.world-work {
    background: linear-gradient(135deg, #0ea5e9, #1d4ed8); color: #fff;
}
.quest-map .quest-world.world-social {
    background: linear-gradient(135deg, #f472b6, #be185d); color: #fff;
}

/* ----- settings screen ----- */
.lq-setting {
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    padding: 14px 4px; text-align: left;
    border-bottom: 1px solid rgba(100, 116, 139, 0.35);
}
.lq-setting-label { font-weight: 800; }
.lq-setting-help { font-size: 0.9em; opacity: 0.8; }
.lq-segment { display: flex; flex-wrap: wrap; gap: 8px; }
.lq-setting-wide { flex-wrap: wrap; }
.lq-setting-wide > div:first-child { flex: 1 1 260px; }
.lq-setting-wide .lq-segment { flex: 1 1 100%; }
.lq-setting-wide .lq-seg { flex: 1 1 0; }
#game-card .lq-seg, #game-card .lq-switch {
    min-height: 48px; padding: 8px 16px;
    border-radius: 12px; border: 3px solid #64748b;
    background: #e2e8f0; color: #0f172a;
    font: inherit; font-weight: 800; cursor: pointer;
}
#game-card .lq-switch { flex: none; min-width: 88px; border-radius: 999px; }
#game-card .lq-seg[aria-pressed="true"] { background: #4338ca; border-color: #312e81; color: #fff; }
#game-card .lq-switch[aria-checked="true"] { background: #16a34a; border-color: #166534; color: #fff; }
#game-card .lq-switch:disabled { opacity: 0.45; cursor: not-allowed; }

/* ----- progress report ----- */
.lq-stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin: 14px 0; }
.lq-stat { padding: 12px; border-radius: 14px; background: rgba(99, 102, 241, 0.12); text-align: center; }
.lq-stat b { display: block; font-size: 1.6em; }
.lq-report-row {
    display: grid; grid-template-columns: minmax(120px, 1.2fr) 2fr auto;
    gap: 12px; align-items: center; padding: 10px 0; text-align: left;
}
.lq-report-bar { height: 14px; border-radius: 999px; background: #e2e8f0; overflow: hidden; }
.lq-report-bar > span { display: block; height: 100%; background: #16a34a; }
@media (max-width: 560px) { .lq-report-row { grid-template-columns: 1fr; gap: 4px; } }

/* ----- player picker ----- */
.lq-player-list { display: grid; gap: 10px; margin: 16px 0; }
.lq-input {
    width: 100%; max-width: 360px; padding: 14px;
    border-radius: 12px; border: 3px solid #64748b;
    font: inherit; font-size: 1.1em;
}

/* ----- breathing break ----- */
.lq-breathe {
    width: 170px; height: 170px; margin: 22px auto;
    display: grid; place-items: center;
    border-radius: 50%; color: #fff; font-weight: 800;
    background: radial-gradient(circle at 35% 30%, #a5f3fc, #38bdf8 60%, #2563eb);
    animation: lq-breathe 10s ease-in-out infinite;
}
@keyframes lq-breathe {
    0%, 100% { transform: scale(0.7); }
    40%      { transform: scale(1.05); }
}

/* ----- toasts ----- */
#lq-toasts {
    position: fixed; top: 14px; left: 50%; transform: translateX(-50%);
    z-index: 9999; display: grid; gap: 10px;
    width: min(92vw, 460px); pointer-events: none;
}
.lq-toast {
    padding: 18px 24px; border-radius: 20px;
    background: #fff; color: #172033; text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
    animation: lq-pop 0.35s ease;
}
.lq-toast-eyebrow { font-weight: 800; color: #7c3aed; }
.lq-toast-title { margin-top: 4px; font-size: 1.5em; font-weight: 900; }
.lq-toast-body { margin-top: 6px; color: #475569; }
@keyframes lq-pop {
    from { opacity: 0; transform: translateY(-14px) scale(0.96); }
    to   { opacity: 1; transform: none; }
}

/* ----- confetti ----- */
.lq-confetti { position: fixed; inset: 0; z-index: 9998; overflow: hidden; pointer-events: none; }
.lq-confetti i {
    position: absolute; top: -16px; width: 10px; height: 16px; border-radius: 2px;
    animation: lq-fall linear forwards;
}
@keyframes lq-fall { to { transform: translate3d(var(--lq-x), 110vh, 0) rotate(720deg); } }

@media print {
    .lq-fab, #lq-toasts, #game-card button { display: none !important; }
}
`;

function injectStyles() {

    if (document.getElementById("lq-styles")) return;

    const style = document.createElement("style");

    style.id = "lq-styles";
    style.textContent = LQ_CSS;

    document.head.appendChild(style);
}


// ==========================================
// PLAYER DATA
// ==========================================

function createDefaultPlayer(name = "") {

    const categoryXP = {};
    const categoryStats = {};

    Object.keys(categories).forEach(key => {
        categoryXP[key] = 0;
        categoryStats[key] = { answered: 0, correct: 0 };
    });

    return {
        name: name,
        xp: 0,
        level: 1,
        questionsAnswered: 0,
        correctAnswers: 0,
        currentStreak: 0,
        bestStreak: 0,
        questsCompleted: 0,
        hintsUsed: 0,
        secondChanceWins: 0,
        categoryXP: categoryXP,
        categoryStats: categoryStats,
        achievements: [],
        bestStars: {},
        missed: [],
        history: QuestionEngine.createHistory()   // what this player has seen (engine.js)
    };
}


// Turns anything read from storage into a complete, safe player record.
// This is also how saves from older versions get upgraded.
function normalizePlayer(saved) {

    const name = String(saved.name || "").trim().slice(0, MAX_NAME_LENGTH);
    const base = createDefaultPlayer(name);
    const p = { ...base, ...saved, name: name };

    [
        "xp", "questionsAnswered", "correctAnswers", "currentStreak",
        "bestStreak", "questsCompleted", "hintsUsed", "secondChanceWins"
    ].forEach(field => {
        p[field] = Number.isFinite(p[field]) && p[field] >= 0 ? Math.floor(p[field]) : 0;
    });

    p.categoryXP = { ...base.categoryXP };
    p.categoryStats = { ...base.categoryStats };

    if (isPlainObject(saved.categoryXP)) {
        Object.keys(saved.categoryXP).forEach(key => {
            const value = saved.categoryXP[key];
            if (Number.isFinite(value) && value >= 0) p.categoryXP[key] = value;
        });
    }

    if (isPlainObject(saved.categoryStats)) {
        Object.keys(saved.categoryStats).forEach(key => {
            const s = saved.categoryStats[key];
            if (isPlainObject(s) && Number.isFinite(s.answered) && Number.isFinite(s.correct)) {
                p.categoryStats[key] = {
                    answered: Math.max(0, Math.floor(s.answered)),
                    correct: Math.max(0, Math.floor(s.correct))
                };
            }
        });
    }

    p.achievements = Array.isArray(saved.achievements)
        ? saved.achievements.filter(id => typeof id === "string")
        : [];

    // Only questions that still exist in the bank can be practised
    p.missed = Array.isArray(saved.missed)
        ? saved.missed.filter(id => typeof id === "string" && QuestionEngine.byId(id))
        : [];

    p.history = QuestionEngine.normalizeHistory(saved.history);

    p.bestStars = {};
    if (isPlainObject(saved.bestStars)) {
        Object.keys(saved.bestStars).forEach(key => {
            const stars = saved.bestStars[key];
            if (Number.isInteger(stars) && stars >= 1 && stars <= 3) p.bestStars[key] = stars;
        });
    }

    p.level = getLevel(p.xp);

    return p;
}


// ==========================================
// SAVE / LOAD (several players can share one computer)
// ==========================================

function profileKey(name) {
    return String(name).trim().toLowerCase();
}


function persistProfiles() {

    storage.set(STORAGE_KEYS.profiles, JSON.stringify(profiles));

    if (activeKey) {
        storage.set(STORAGE_KEYS.activePlayer, activeKey);
    } else {
        storage.remove(STORAGE_KEYS.activePlayer);
    }
}


function savePlayer() {

    if (!player.name) return;

    activeKey = activeKey || profileKey(player.name);
    profiles[activeKey] = player;

    persistProfiles();
}


function loadProfiles() {

    profiles = Object.create(null);

    const raw = storage.get(STORAGE_KEYS.profiles);

    if (raw) {

        try {

            const parsed = JSON.parse(raw);

            if (isPlainObject(parsed)) {
                Object.keys(parsed).forEach(key => {
                    if (isPlainObject(parsed[key]) && parsed[key].name) {
                        profiles[key] = normalizePlayer(parsed[key]);
                    }
                });
            }

        } catch (error) {
            console.error("Could not load profiles:", error);
        }
    }

    // Bring a V1/V2 save along so nobody loses their progress
    let migratedKey = "";

    if (Object.keys(profiles).length === 0) {

        const legacy = storage.get(STORAGE_KEYS.legacyPlayer);

        if (legacy) {

            try {

                const parsed = JSON.parse(legacy);

                if (isPlainObject(parsed) && parsed.name) {
                    migratedKey = profileKey(parsed.name);
                    profiles[migratedKey] = normalizePlayer(parsed);
                }

            } catch (error) {
                console.error("Could not read the old save:", error);
            }
        }
    }

    activeKey = storage.get(STORAGE_KEYS.activePlayer, "") || migratedKey;

    if (!profiles[activeKey]) activeKey = "";

    player = activeKey ? profiles[activeKey] : createDefaultPlayer();

    if (migratedKey) persistProfiles();
}


// ==========================================
// LEVEL SYSTEM
// ==========================================

function getLevel(xp) {

    for (let i = LEVEL_XP.length - 1; i >= 0; i--) {
        if (xp >= LEVEL_XP[i]) return i + 1;
    }

    return 1;
}


function getRank(level) {

    if (level >= 10) return "👑 LEGEND";
    if (level >= 8) return "💎 CHAMPION";
    if (level >= 6) return "🏆 ACHIEVER";
    if (level >= 4) return "🚀 CHALLENGER";
    if (level >= 2) return "⭐ ROOKIE";

    return "🌱 EXPLORER";
}


function getLevelProgress(xp, level) {

    if (level >= LEVEL_XP.length) return 100;

    const start = LEVEL_XP[level - 1];
    const end = LEVEL_XP[level];

    return Math.max(0, Math.min(100, Math.round(((xp - start) / (end - start)) * 100)));
}


function xpToNextLevel(xp, level) {

    return level >= LEVEL_XP.length ? 0 : LEVEL_XP[level] - xp;
}


// ==========================================
// SMALL HELPERS
// ==========================================

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}


function escapeHTML(text) {

    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function splitLabel(label) {

    const space = label.indexOf(" ");

    return space === -1
        ? { icon: "", text: label }
        : { icon: label.slice(0, space), text: label.slice(space + 1) };
}


function categoryLabel(key) {

    if (key === "practice") return PRACTICE_LABEL;

    return categories[key] ? categories[key].name : String(key);
}


function percent(part, whole) {

    return whole > 0 ? Math.round((part / whole) * 100) : 0;
}


function starString(count) {

    return "⭐".repeat(count) + "☆".repeat(3 - count);
}


function getStats(key) {

    const s = player.categoryStats[key];

    return s ? s : { answered: 0, correct: 0 };
}


function ensureStats(key) {

    if (!player.categoryStats[key]) {
        player.categoryStats[key] = { answered: 0, correct: 0 };
    }

    return player.categoryStats[key];
}


// Answers that are only numbers ("$17", "0°C", "1,000") read best from smallest to largest
function isNumericAnswer(text) {

    return /^\s*[$€£]?\s*-?\d[\d,]*(\.\d+)?\s*(%|°[CF])?\s*$/.test(String(text));
}


function numericValue(text) {

    return parseFloat(String(text).replace(/[^0-9.\-]/g, ""));
}


function buildAnswers(question) {

    const items = question.answers.map((text, index) => ({
        text: text,
        correct: index === question.correct
    }));

    if (question.keepOrder) return items;

    if (items.every(item => isNumericAnswer(item.text))) {
        return items.sort((a, b) => numericValue(a.text) - numericValue(b.text));
    }

    return shuffle(items);
}


function pick(list) {

    return list[Math.floor(Math.random() * list.length)];
}


// ==========================================
// XP RULES
// ==========================================

function getQuestionXP(question, mode = currentQuestMode) {

    const table = XP_TABLE[mode] || XP_TABLE.board;

    return table[question.difficulty] || 100;
}


// ==========================================
// SOUND (tiny, gentle, and OFF until the player turns it on)
// ==========================================

let audioContext = null;

const SOUNDS = {
    correct:     [[523.25, 0], [659.25, 0.12], [783.99, 0.24]],
    retry:       [[392.0, 0]],
    miss:        [[330.0, 0], [294.0, 0.16]],
    levelup:     [[523.25, 0], [659.25, 0.1], [783.99, 0.2], [1046.5, 0.32]],
    achievement: [[659.25, 0], [880.0, 0.14]],
    complete:    [[523.25, 0], [659.25, 0.14], [783.99, 0.28], [1046.5, 0.42]],
    // Timer: one soft note at 10 and at 5 seconds, a gentle two-note cue at zero.
    // Never a sound every second.
    warning:     [[440.0, 0]],
    urgent:      [[493.88, 0]],
    timeup:      [[392.0, 0], [329.63, 0.2]]
};

function soundSupported() {

    return typeof window.AudioContext === "function" ||
        typeof window.webkitAudioContext === "function";
}


function playSound(name) {

    if (!settings.sound || !SOUNDS[name] || !soundSupported()) return;

    try {

        const Context = window.AudioContext || window.webkitAudioContext;

        audioContext = audioContext || new Context();

        if (audioContext.state === "suspended") audioContext.resume();

        SOUNDS[name].forEach(([frequency, delay]) => {

            const start = audioContext.currentTime + delay;
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();

            oscillator.type = "sine";
            oscillator.frequency.value = frequency;

            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.exponentialRampToValueAtTime(0.06, start + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.28);

            oscillator.connect(gain);
            gain.connect(audioContext.destination);

            oscillator.start(start);
            oscillator.stop(start + 0.3);
        });

    } catch (error) {
        // Sound is a bonus; never let it break the game
    }
}


// ==========================================
// READ ALOUD
// ==========================================

function speechSupported() {

    return "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
}


// Any reading voice at all?
function readAloudSupported() {
    return speechSupported() || LifeQuestVoice.isConfigured();
}


function stopSpeaking() {

    if (speechSupported()) window.speechSynthesis.cancel();

    LifeQuestVoice.stop();
}


// A clear US English voice from the ones this computer has, if possible
// ------------------------------
// CHOOSING THE BUILT-IN VOICE
// Every computer has different voices, so no single voice name is required.
// Each English voice gets a score and the best one is used:
//   natural / neural voices (e.g. Edge's "Microsoft Aria Online (Natural)") first,
//   then female voices, then US English. A male voice is only used when no
//   female English voice exists.
// ------------------------------

const FEMALE_VOICE_NAMES = /\b(female|woman|aria|jenny|michelle|ana|emma|ava|sonia|libby|natasha|clara|zira|hazel|susan|samantha|allison|karen|moira|tessa|serena|fiona|victoria|kathy|nicky|joanna|salli|kimberly|kendra|ivy|ruth|olivia|amy|linda|heera|catherine|elizabeth|jane|nancy|sara|aurora|ashley|cora|elise|monica|paulina|google us english|google uk english female)\b/i;
const MALE_VOICE_NAMES = /\b(male|man|david|mark|guy|andrew|brian|christopher|eric|roger|steffan|ryan|thomas|george|alex|daniel|fred|aaron|arthur|tom|james|william|richard|matthew|justin|joey|russell|lee|ravi|oliver|rishi|gordon)\b/i;

let browserVoice = null;
let skippedVoices = new Set();      // voices that failed to speak (e.g. online voices when offline)

function scoreVoice(voice) {

    const lang = String(voice.lang || "").replace("_", "-");
    const name = String(voice.name || "");

    if (!/^en(-|$)/i.test(lang)) return null;        // English only

    let score = 0;

    if (/^en-US$/i.test(lang)) score += 30;          // American English first
    else score += 10;

    if (/natural|neural/i.test(name)) score += 40;   // modern, human-sounding voices
    else if (/online|google/i.test(name)) score += 20;

    if (/female/i.test(name) || (FEMALE_VOICE_NAMES.test(name) && !/\bmale\b/i.test(name))) score += 25;
    else if (MALE_VOICE_NAMES.test(name)) score -= 50;

    if (voice.default) score += 2;

    return score;
}

function pickBrowserVoice() {

    if (!speechSupported()) return null;

    const ranked = window.speechSynthesis.getVoices()
        .filter(voice => !skippedVoices.has(voice.name))
        .map(voice => ({ voice, score: scoreVoice(voice) }))
        .filter(item => item.score !== null)               // English voices only
        .sort((a, b) => b.score - a.score);

    browserVoice = ranked.length ? ranked[0].voice : null;

    return browserVoice;
}

// Short pieces: some browsers stop long speech part-way through
function speechChunks(text) {

    const sentences = String(text).replace(/\s+/g, " ").trim().match(/[^.!?]+[.!?]*\s*/g) || [];
    const chunks = [];

    sentences.forEach(sentence => {
        const last = chunks[chunks.length - 1];
        if (last && (last + sentence).length <= 180) chunks[chunks.length - 1] = last + sentence;
        else chunks.push(sentence);
    });

    return chunks.map(chunk => chunk.trim()).filter(Boolean);
}

// Calm, friendly and a little slower than conversation. Never touches the timer.
function speakWithBrowser(text, retried = false) {

    if (!speechSupported()) return;

    const voice = browserVoice || pickBrowserVoice();

    speechChunks(text).forEach((chunk, index) => {

        const utterance = new window.SpeechSynthesisUtterance(chunk);

        utterance.lang = voice ? voice.lang : "en-US";
        utterance.voice = voice;
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;

        // An online voice that can't speak (no internet): try the next best voice once
        if (index === 0 && voice && !retried) {
            utterance.onerror = event => {
                if (event.error === "canceled" || event.error === "interrupted") return;
                skippedVoices.add(voice.name);
                browserVoice = null;
                window.speechSynthesis.cancel();
                speakWithBrowser(text, true);
            };
        }

        window.speechSynthesis.speak(utterance);
    });
}

// The voice the game will use, for the Settings screen
function browserVoiceName() {
    const voice = browserVoice || pickBrowserVoice();
    return voice ? voice.name : "";
}


let voiceFallbackTold = false;

// Reads game text aloud. Callers only pass questions, answers and explanations,
// never names, so nothing personal goes to the natural-voice service.
// Reading never touches the question timer.
function speak(text) {

    if (!text) return;

    stopSpeaking();

    if (!readAloudSupported()) {
        announce("Read aloud isn't available in this browser.");
        return;
    }

    if (settings.voice === "natural" && LifeQuestVoice.isAvailable()) {

        LifeQuestVoice.speak(text).then(playing => {

            if (playing) return;

            // The natural voice couldn't play: use the built-in one, and say so once
            if (!voiceFallbackTold) {
                voiceFallbackTold = true;
                showToast("🔊 READ ALOUD", "Using the built-in voice", "The natural voice isn't available right now.");
            }

            speakWithBrowser(text);
        });

        return;
    }

    speakWithBrowser(text);
}


// ==========================================
// SCREEN HELPERS, LIVE ANNOUNCEMENTS, TOASTS, CONFETTI
// ==========================================

function getCard() {

    return document.getElementById("game-card");
}


function on(id, handler) {

    const element = document.getElementById(id);

    if (element) element.addEventListener("click", handler);
}


// Draws a screen, then moves keyboard / screen-reader focus to it
function render(html) {

    const card = getCard();

    if (!card) return;

    stopSpeaking();

    // Safety net: a countdown never keeps running behind another screen.
    // (Settings only pauses it; see openSettings.)
    if (screen !== "clue" && screen !== "settings") QuestionTimer.stop();

    card.innerHTML = html;

    const target = card.querySelector("[data-autofocus]") || card;

    target.focus({ preventScroll: true });

    // A new screen starts at the top. Questions start at the top of the game card,
    // so on a phone the question and answers get the whole screen.
    if (screen !== lastRenderedScreen) {
        const questionScreen = screen === "clue" || screen === "question";
        const top = questionScreen ? card.getBoundingClientRect().top + window.scrollY - 8 : 0;
        window.scrollTo(0, Math.max(0, top));
    }

    lastRenderedScreen = screen;
}

let lastRenderedScreen = "";


function announce(message) {

    const live = document.getElementById("lq-live");

    if (!live) return;

    live.textContent = "";

    setTimeout(() => { live.textContent = message; }, 40);
}


function showToast(eyebrow, title, body) {

    const stack = document.getElementById("lq-toasts");

    if (!stack) return;

    const toast = document.createElement("div");

    toast.className = "lq-toast";

    toast.innerHTML =
        '<div class="lq-toast-eyebrow">' + escapeHTML(eyebrow) + "</div>" +
        '<div class="lq-toast-title">' + escapeHTML(title) + "</div>" +
        (body ? '<div class="lq-toast-body">' + escapeHTML(body) + "</div>" : "");

    stack.appendChild(toast);

    while (stack.children.length > 3) stack.firstElementChild.remove();

    setTimeout(() => toast.remove(), 4500);
}


function showAchievementUnlocked(achievement) {

    showToast("🎉 ACHIEVEMENT UNLOCKED!", achievement.name, achievement.description);
}


function launchConfetti() {

    if (settings.reduceMotion) return;

    const layer = document.createElement("div");

    layer.className = "lq-confetti";
    layer.setAttribute("aria-hidden", "true");

    const colors = ["#7c3aed", "#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#ef4444"];

    for (let i = 0; i < 70; i++) {

        const piece = document.createElement("i");

        piece.style.left = Math.random() * 100 + "%";
        piece.style.background = pick(colors);
        piece.style.animationDuration = 2.4 + Math.random() * 2 + "s";
        piece.style.animationDelay = Math.random() * 0.6 + "s";
        piece.style.setProperty("--lq-x", (Math.random() * 160 - 80) + "px");

        layer.appendChild(piece);
    }

    document.body.appendChild(layer);

    setTimeout(() => layer.remove(), 5500);
}


// ==========================================
// PROFILE CREATION
// ==========================================

function createProfile() {

    const input = document.getElementById("student-name");

    if (!input) return;

    const name = input.value.trim().replace(/\s+/g, " ").slice(0, MAX_NAME_LENGTH);

    if (!name) {

        input.style.borderColor = "#ef4444";
        input.setAttribute("aria-invalid", "true");
        input.focus();

        announce("Please type your name to start.");

        return;
    }

    const key = profileKey(name);

    // Typing a name that already exists brings that player's progress back
    if (profiles[key]) {
        player = profiles[key];
    } else {
        player = createDefaultPlayer(name);
        profiles[key] = player;
    }

    activeKey = key;

    persistProfiles();

    showProfile();
}

window.createProfile = createProfile;


// ==========================================
// WELCOME + PLAYER PICKER
// ==========================================

function showWelcome() {

    screen = "welcome";

    const card = getCard();

    if (!card) return;

    stopSpeaking();
    QuestionTimer.stop();

    card.innerHTML = welcomeHTML;
}


function showPlayerPicker() {

    screen = "picker";

    const keys = Object.keys(profiles).sort();

    render(`

        <h2 tabindex="-1" data-autofocus>👥 Who's playing?</h2>

        <p>Pick your name to keep going, or start as a new player.</p>

        <div class="lq-player-list">

            ${keys.map(key => {

                const p = profiles[key];
                const level = getLevel(p.xp);

                return `
                    <button data-player="${escapeHTML(key)}">
                        👋 ${escapeHTML(p.name)} • Level ${level} • ${p.xp} XP
                    </button>
                `;

            }).join("")}

        </div>

        <h3>➕ New player</h3>

        <p>
            <label for="student-name">Type your name:</label>
            <br>
            <input
                id="student-name"
                class="lq-input"
                type="text"
                maxlength="${MAX_NAME_LENGTH}"
                autocomplete="off"
            >
        </p>

        <button id="create-player">🚀 START</button>

        ${player.name ? '<button id="picker-back">↩️ BACK</button>' : ""}

    `);

    document.querySelectorAll("[data-player]").forEach(button => {

        button.addEventListener("click", function () {

            const key = this.dataset.player;

            if (!profiles[key]) return;

            player = profiles[key];
            activeKey = key;

            persistProfiles();
            showProfile();
        });
    });

    on("create-player", createProfile);
    on("picker-back", showProfile);
}


function switchPlayer() {

    savePlayer();

    // A solo board belongs to the player who dealt it
    if (questBoard && questBoard.mode === "solo") endBoard();

    activeKey = "";
    persistProfiles();

    player = createDefaultPlayer();

    showPlayerPicker();
}


// ==========================================
// PROFILE SCREEN
// ==========================================

function showProfile() {

    screen = "profile";

    const level = getLevel(player.xp);

    player.level = level;

    const rank = getRank(level);
    const progress = getLevelProgress(player.xp, level);
    const toNext = xpToNextLevel(player.xp, level);

    render(`

        <div class="profile-header">

            <div class="profile-info">

                <div class="profile-name">
                    👋 ${escapeHTML(player.name)}
                </div>

                <div class="profile-level">
                    Level ${level}
                </div>

            </div>

            <div class="profile-xp">
                ${player.xp} XP
            </div>

        </div>

        ${storageOK ? "" : `
            <p class="lq-warning" role="alert">
                ⚠️ This browser is blocking saving, so your progress will be lost
                when you close the page. Ask a teacher if you need help.
            </p>
        `}

        <div class="level-section">

            <div class="level-label">

                <span>Level ${level}</span>

                <span>${progress}%</span>

            </div>

            <div
                class="progress-bar"
                role="progressbar"
                aria-label="Progress to the next level"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="${progress}"
            >

                <div
                    class="progress-fill"
                    style="width:${progress}%"
                ></div>

            </div>

            <p class="lq-note">
                ${toNext > 0
                    ? `${toNext} XP to reach Level ${level + 1}`
                    : "You reached the top level!"}
            </p>

        </div>

        <div class="rank-card">

            <div class="rank-title">
                CURRENT RANK
            </div>

            <div class="rank-name">
                ${rank}
            </div>

        </div>

        <h3 tabindex="-1" data-autofocus>📊 Your Progress</h3>

        <div class="profile-categories">

            ${Object.keys(categories).map(key => `

                <div class="profile-category">

                    <div class="profile-category-title">
                        ${escapeHTML(categories[key].name)}
                    </div>

                    <div class="profile-category-xp">
                        ${player.categoryXP[key] || 0} XP
                    </div>

                </div>

            `).join("")}

        </div>

        <p class="score">
            Questions: ${player.questionsAnswered}
            |
            Correct: ${player.correctAnswers}
            |
            Best Streak: ${player.bestStreak}
        </p>

        <br>

        <button id="play-quest">
            ⚡ PLAY QUEST BOARD
        </button>

        ${player.missed.length ? `
            <button id="practice-button">
                🔁 PRACTICE MISTAKES (${player.missed.length})
            </button>
        ` : `
            <p class="lq-note">
                🔁 Questions you miss are saved for Practice Mistakes.
            </p>
        `}

        <button id="classroom-mode">
            🎓 CLASSROOM MODE
        </button>

        <button id="achievements-button">
            🏆 ACHIEVEMENTS
        </button>

        <button id="report-button">
            📈 MY PROGRESS REPORT
        </button>

        <button id="switch-player">
            👥 SWITCH PLAYER
        </button>

    `);

    on("play-quest", showCategories);
    on("practice-button", startPractice);
    on("classroom-mode", showClassroomSetup);
    on("achievements-button", showAchievements);
    on("report-button", showReport);
    on("switch-player", switchPlayer);
}


// ==========================================
// QUEST BOARD (solo) + CLASSROOM MODE
// Pick a category, pick a value, answer the clue, clear the board.
// Questions come from QuestionEngine (engine.js).
// Classroom play never changes the signed-in student's XP, streaks,
// achievements or statistics. It keeps its own history and missed list.
// ==========================================

// Row difficulty, top to bottom. Works for both point scales.
const BOARD_ROW_DIFFICULTY = ["easy", "easy", "medium", "medium", "hard"];
const CLASSROOM_SESSION = "classroom";
const MAX_CLASSROOM_MISSED = 200;

let questBoard = null;
let activeClue = null;        // the clue on screen: answers, result, timing
let classroomData = null;     // loaded the first time Classroom Mode is used


function playerSession() {
    return "player:" + (activeKey || "guest");
}

function getClassroom() {

    if (classroomData) return classroomData;

    classroomData = { history: QuestionEngine.createHistory(), missed: [], timerMode: "standard" };

    const raw = storage.get(STORAGE_KEYS.classroom);

    if (raw) {
        try {
            const saved = JSON.parse(raw);
            if (isPlainObject(saved)) {
                classroomData.history = QuestionEngine.normalizeHistory(saved.history);
                classroomData.missed = Array.isArray(saved.missed)
                    ? saved.missed.filter(id => typeof id === "string").slice(-MAX_CLASSROOM_MISSED)
                    : [];
                if (TIMER_MODES.includes(saved.timerMode)) classroomData.timerMode = saved.timerMode;
            }
        } catch (error) {
            console.error("Could not load classroom data:", error);
        }
    }

    return classroomData;
}

function saveClassroom() {
    storage.set(STORAGE_KEYS.classroom, JSON.stringify(getClassroom()));
}

// Time spent in Settings or on a break doesn't count as answer time
function newTiming() {
    return { startedAt: Date.now(), awayMs: 0, awaySince: null };
}

function timingAway(timing) {
    if (timing && !timing.awaySince) timing.awaySince = Date.now();
}

function timingBack(timing) {
    if (timing && timing.awaySince) {
        timing.awayMs += Date.now() - timing.awaySince;
        timing.awaySince = null;
    }
}

function elapsedMs(timing) {
    return timing ? Date.now() - timing.startedAt - timing.awayMs : 0;
}


function showClassroomSetup() {
    screen = "classroom-setup";

    const inProgress = questBoard && questBoard.mode === "teams" && !questBoard.finished;
    const lastTimerMode = getClassroom().timerMode;

    render(`
        <div class="lq-classroom-setup">
            <div class="lq-result-kicker">🎓 CLASSROOM MODE</div>
            <h2 tabindex="-1" data-autofocus>SET UP YOUR CLASSROOM GAME</h2>
            <p class="lq-result-subtitle">
                The class plays in teams. Pick a category, pick a value, then beat the clock.
            </p>
            <p class="lq-board-caption">
                Classroom scores are kept separate. They don't change anyone's personal XP or progress.
            </p>

            ${inProgress ? `
                <div class="lq-result-actions">
                    <button id="classroom-continue">▶️ CONTINUE CURRENT GAME</button>
                </div>
            ` : ""}

            <div class="lq-team-setup-grid">
                <label>Team 1 <input class="lq-team-name" value="Team 1" maxlength="24"></label>
                <label>Team 2 <input class="lq-team-name" value="Team 2" maxlength="24"></label>
                <label>Team 3 <input class="lq-team-name" placeholder="Optional" maxlength="24"></label>
                <label>Team 4 <input class="lq-team-name" placeholder="Optional" maxlength="24"></label>
                <label>Team 5 <input class="lq-team-name" placeholder="Optional" maxlength="24"></label>
                <label>Team 6 <input class="lq-team-name" placeholder="Optional" maxlength="24"></label>
            </div>

            <div class="lq-board-options">
                <div class="lq-option-group" role="group" aria-label="Board size">
                    <strong>Board size</strong>
                    <button class="lq-board-size is-selected" data-count="6" aria-pressed="true">6 topics</button>
                    <button class="lq-board-size" data-count="5" aria-pressed="false">5 topics</button>
                </div>

                <div class="lq-option-group" role="group" aria-label="Point scale">
                    <strong>Point scale</strong>
                    <button class="lq-value-scale is-selected" data-scale="100" aria-pressed="true">100–500</button>
                    <button class="lq-value-scale" data-scale="200" aria-pressed="false">200–1,000</button>
                </div>
            </div>

            <div class="lq-time-options" role="group" aria-labelledby="lq-time-label">
                <strong id="lq-time-label">Answer time</strong>
                ${[
                    ["standard", "Standard (45 / 40 / 35s)"],
                    ["extra", "Extra time (+50%)"],
                    ["off", "No timer"]
                ].map(([mode, label]) => `
                    <button
                        class="lq-time-choice ${mode === lastTimerMode ? "is-selected" : ""}"
                        data-timer="${mode}"
                        aria-pressed="${mode === lastTimerMode ? "true" : "false"}"
                    >${label}</button>
                `).join("")}
            </div>
            <p class="lq-board-caption">
                Time depends on the question: 45 seconds for easy, 40 for medium, 35 for hard.
                Extra time gives everyone 50% longer. Pick what suits your class.
            </p>

            <p class="lq-board-caption">
                Correct answers add the clue value to the team's score. Wrong or timed-out answers score 0.
                The turn then moves to the next team.
            </p>

            <p class="lq-message" id="lq-message" role="alert"></p>

            <div class="lq-result-actions">
                <button id="launch-classroom">🎮 START NEW GAME</button>
                <button id="classroom-back">🏠 BACK TO MENU</button>
            </div>
        </div>
    `);

    let selectedTimerMode = lastTimerMode;
    let selectedCategoryCount = 6;
    let selectedValueScale = 100;

    // One selected button per group, announced to screen readers with aria-pressed
    const choose = (selector, button) => {
        document.querySelectorAll(selector).forEach(item => {
            item.classList.toggle("is-selected", item === button);
            item.setAttribute("aria-pressed", item === button ? "true" : "false");
        });
    };

    document.querySelectorAll(".lq-board-size").forEach(button => {
        button.addEventListener("click", () => {
            selectedCategoryCount = Number(button.dataset.count);
            choose(".lq-board-size", button);
        });
    });

    document.querySelectorAll(".lq-value-scale").forEach(button => {
        button.addEventListener("click", () => {
            selectedValueScale = Number(button.dataset.scale);
            choose(".lq-value-scale", button);
        });
    });

    document.querySelectorAll(".lq-time-choice").forEach(button => {
        button.addEventListener("click", () => {
            selectedTimerMode = button.dataset.timer;
            choose(".lq-time-choice", button);
        });
    });

    on("launch-classroom", () => {
        const names = [...document.querySelectorAll(".lq-team-name")]
            .map(input => input.value.trim().replace(/\s+/g, " ").slice(0, 24))
            .filter(Boolean);

        if (names.length < 2) {
            const message = document.getElementById("lq-message");
            if (message) message.textContent = "Enter at least two team names.";
            return;
        }

        // Remember the teacher's timing choice for next time
        getClassroom().timerMode = selectedTimerMode;
        saveClassroom();

        startQuestBoard({
            mode: "teams",
            teams: names,
            timerMode: selectedTimerMode,
            categoryCount: selectedCategoryCount,
            valueScale: selectedValueScale
        });
    });

    on("classroom-continue", renderQuestBoard);
    on("classroom-back", showProfile);
}

// Questions set aside for a board but never opened go back into the pool
function releaseUnusedClues() {

    if (!questBoard) return;

    const unused = Object.values(questBoard.cells)
        .filter(cell => !cell.used && cell.question)
        .map(cell => cell.question.id);

    QuestionEngine.release(questBoard.sessionKey, unused);
}

function boardOptions(board) {
    return board.mode === "teams"
        ? {
            mode: "teams",
            teams: board.teams.map(team => team.name),
            timerMode: board.timerMode,
            categoryCount: board.categoryCount,
            valueScale: board.valueScale
        }
        : { categoryCount: board.categoryCount, valueScale: board.valueScale };
}

function startQuestBoard(options = {}) {

    QuestionTimer.stop();
    releaseUnusedClues();
    activeClue = null;

    const teamMode = options.mode === "teams";
    const history = teamMode ? getClassroom().history : player.history;
    const sessionKey = teamMode ? CLASSROOM_SESSION : playerSession();

    const categoryCount = Math.min(
        Number(options.categoryCount) || 6,
        QuestionEngine.categoryKeys().length
    );
    const valueScale = Number(options.valueScale) === 200 ? 200 : 100;
    const values = BOARD_ROW_DIFFICULTY.map((_, row) => (row + 1) * valueScale);

    // Least recently played categories first, then shown in a random order
    const chosen = shuffle(QuestionEngine.pickCategories(categoryCount, history));

    questBoard = {
        categories: chosen,
        values,
        categoryCount,
        valueScale,
        cells: Object.create(null),
        score: 0,
        correct: 0,
        answered: 0,
        streak: 0,
        bestBoardStreak: 0,
        mode: teamMode ? "teams" : "solo",
        owner: teamMode ? "" : activeKey,
        sessionKey,
        teams: teamMode ? options.teams.map(name => ({ name, score: 0 })) : [],
        currentTeam: 0,
        xp: 0,                 // personal XP earned on this board (solo only)
        bonusXP: 0,
        // Classroom: the teacher's choice. Solo: the player's own setting, read per question.
        timerMode: teamMode && TIMER_MODES.includes(options.timerMode) ? options.timerMode : "standard",
        finished: false
    };

    chosen.forEach(key => {
        const column = QuestionEngine.pickColumn(key, BOARD_ROW_DIFFICULTY, {
            history,
            session: sessionKey
        });

        values.forEach((value, row) => {
            questBoard.cells[key + ":" + value] = {
                question: column[row],
                used: false,
                correct: false,
                earned: 0
            };
        });
    });

    renderQuestBoard();
}

function boardTotal() {
    return Object.values(questBoard.cells).filter(cell => cell.question).length;
}

function renderQuestBoard() {
    if (!questBoard) {
        startQuestBoard();
        return;
    }

    screen = "board";

    const keys = questBoard.categories;
    const total = boardTotal();
    const teamMode = questBoard.mode === "teams";
    const currentTeam = teamMode ? questBoard.teams[questBoard.currentTeam] : null;

    render(`
        <div class="lq-board-head">
            <div>
                <h2 class="lq-board-title" tabindex="-1" data-autofocus>
                    ${teamMode ? "🎓 CLASSROOM QUEST BOARD" : "⚡ QUEST BOARD"}
                </h2>
                <div class="lq-board-caption">
                    ${teamMode
                        ? "Pick a category and value." + (boardTimerMode() === "off" ? "" : " Answer before the clock hits zero.")
                        : "Pick a category. Pick a value. Answer the clue. Clear the board."}
                </div>
            </div>

            <div class="lq-board-meta">
                ${teamMode ? `
                    <span class="lq-pill lq-turn-pill">🎤 ${escapeHTML(currentTeam.name)}'s turn</span>
                    <span class="lq-pill">⏱️ ${TIMER_MODE_LABELS[boardTimerMode()]}</span>
                    ${questBoard.teams.map(team => `
                        <span class="lq-pill">🏆 ${escapeHTML(team.name)}: ${team.score}</span>
                    `).join("")}
                ` : `
                    <span class="lq-pill">👤 ${escapeHTML(player.name)}</span>
                    <span class="lq-pill">⭐ ${player.xp} XP</span>
                    <span class="lq-pill">🏆 Board score: ${questBoard.score}</span>
                    <span class="lq-pill">⏱️ ${TIMER_MODE_LABELS[boardTimerMode()]}</span>
                `}
            </div>
        </div>

        <div class="lq-board" style="--lq-cols:${keys.length}">
            ${keys.map(key => {
                const name = splitLabel(categories[key].name).text;

                return `
                    <div class="lq-board-col" role="group" aria-label="${escapeHTML(name)}">
                        <div class="lq-category">${escapeHTML(name)}</div>

                        ${questBoard.values.map(value => {
                            const id = key + ":" + value;
                            const cell = questBoard.cells[id];
                            const done = cell.used || !cell.question;
                            const label = name + ", " + value + " points" +
                                (done ? (cell.correct ? ", answered correctly" : ", already played") : "");

                            return `
                                <button
                                    class="lq-clue ${done ? "is-used" : ""}"
                                    data-clue="${escapeHTML(id)}"
                                    aria-label="${escapeHTML(label)}"
                                    ${done ? "disabled" : ""}
                                >${done ? (cell.correct ? "✓" : "–") : value}</button>
                            `;
                        }).join("")}
                    </div>
                `;
            }).join("")}
        </div>

        <p class="lq-board-caption">
            Cleared: ${questBoard.answered} / ${total}
            ${teamMode ? " • Next team takes the next clue." : ""}
        </p>

        <div class="lq-result-actions">
            <button id="lq-board-reset">🔄 NEW BOARD</button>
            ${teamMode ? '<button id="lq-board-fullscreen">⛶ FULL SCREEN</button>' : ""}
            <button id="lq-board-menu">🏠 BACK TO MENU</button>
        </div>
    `);

    document.querySelectorAll("[data-clue]").forEach(button => {
        button.addEventListener("click", () => openBoardClue(button.dataset.clue));
    });

    on("lq-board-reset", () => startQuestBoard(boardOptions(questBoard)));

    on("lq-board-menu", showProfile);

    on("lq-board-fullscreen", async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (error) {
            announce("Full screen is not available in this browser.");
        }
    });
}

function openBoardClue(id) {
    const cell = questBoard && questBoard.cells[id];

    if (!cell || cell.used || !cell.question) return;

    const teamMode = questBoard.mode === "teams";
    const q = cell.question;

    activeClue = {
        id,
        cell,
        q,
        value: Number(id.split(":").pop()),
        categoryKey: id.split(":")[0],
        answers: buildAnswers(q),
        teamIndex: questBoard.currentTeam,
        answered: false,
        picked: -1,
        correct: false,
        timedOut: false,
        streakBonus: 0,
        xp: 0,
        timing: newTiming(),
        seconds: questionSeconds(q, boardTimerMode())   // 0 = no timer
    };

    if (teamMode) {
        QuestionEngine.noteShown(getClassroom().history, q);
        saveClassroom();
    } else {
        QuestionEngine.noteShown(player.history, q);
        savePlayer();
    }

    renderClue();

    // The clock starts once the question is on screen
    if (activeClue.seconds) startClueTimer(activeClue.seconds);

    if (settings.autoRead) readClueAloud();
}

// Classroom: the teacher's choice for the whole game. Solo: the player's own setting.
function boardTimerMode() {
    if (!questBoard) return settings.timerMode;
    return questBoard.mode === "teams" ? questBoard.timerMode : settings.timerMode;
}

// How long a question gets. Quest Run's Final Challenge will pass { final: true } (60 seconds).
function questionSeconds(q, mode, options = {}) {
    if (mode === "off") return 0;
    return QuestionTimer.secondsFor(options.final ? "final" : q.difficulty, mode);
}

// Turning the timer Off in Settings also stops the clock on the question you are on
function applyTimerOffToClue() {
    const c = activeClue;
    if (!c || c.answered || !c.seconds || boardTimerMode() !== "off") return;
    QuestionTimer.stop();
    c.seconds = 0;
    announce("Timer turned off for this question.");
}

const TIMER_STATE_LABELS = {
    normal: "seconds left",
    warning: "Time check",
    urgent: "Last few seconds"
};

// A ring that empties as time runs out, with the seconds in the middle.
// Screen readers are not told every second: see the announcements in startClueTimer.
function timerHTML(left, total) {
    const state = QuestionTimer.stateFor(left);
    return `
        <div
            id="lq-timer"
            class="lq-timer is-${state}"
            role="timer"
            aria-label="${left} seconds left"
            style="--lq-timer-p:${total ? Math.max(0, Math.min(1, left / total)) : 0}"
        >
            <div class="lq-timer-ring" aria-hidden="true">
                <span class="lq-timer-num" id="lq-timer-num">${left}</span>
            </div>
            <span class="lq-timer-label" id="lq-timer-label" aria-hidden="true">${TIMER_STATE_LABELS[state]}</span>
        </div>
    `;
}

function updateTimerDisplay(left, total) {
    const timer = document.getElementById("lq-timer");
    if (!timer) return;
    const state = QuestionTimer.stateFor(left);
    timer.className = "lq-timer is-" + state;
    timer.style.setProperty("--lq-timer-p", total ? Math.max(0, Math.min(1, left / total)) : 0);
    timer.setAttribute("aria-label", left + " seconds left");
    document.getElementById("lq-timer-num").textContent = left;
    document.getElementById("lq-timer-label").textContent = TIMER_STATE_LABELS[state];
}

function startClueTimer(seconds) {

    QuestionTimer.start(seconds, {

        onTick(left, total) {
            updateTimerDisplay(left, total);
        },

        // Only at 10 and 5 seconds: never every second
        onWarning(mark) {
            announce(mark + " seconds left.");
            playSound(mark === QuestionTimer.WARNING_AT ? "warning" : "urgent");
        },

        onExpire() {
            answerClue(-1, true);
        }
    });
}

function clueFeedbackText(c) {

    const teamMode = questBoard.mode === "teams";
    const team = teamMode ? questBoard.teams[c.teamIndex] : null;

    if (c.timedOut) return "⏰ TIME'S UP! No points this time.";

    if (!c.correct) return "❌ Not quite. No points this time.";

    return teamMode
        ? "✅ Correct! " + team.name + " +" + c.value + " points"
        : "✅ Correct! +" + c.value + " points" + (c.streakBonus ? " + " + c.streakBonus + " streak bonus" : "") +
          " • +" + c.xp + " XP";
}

function renderClue() {

    const c = activeClue;

    if (!c || !questBoard) {
        renderQuestBoard();
        return;
    }

    screen = "clue";
    timingBack(c.timing);

    const teamMode = questBoard.mode === "teams";
    const team = teamMode ? questBoard.teams[c.teamIndex] : null;
    const correctText = c.answers.find(answer => answer.correct).text;
    const secondsLeft = QuestionTimer.isRunning() || QuestionTimer.isPaused()
        ? QuestionTimer.secondsLeft()
        : c.seconds;

    render(`
        <div class="lq-clue-panel">
            <!-- On phones this bar stays pinned at the top so the timer is always visible -->
            <div class="lq-clue-head">
                ${!c.answered && c.seconds ? timerHTML(secondsLeft, c.seconds) : ""}

                <div class="lq-clue-info">
                    <div class="lq-clue-value">
                        ${escapeHTML(splitLabel(categories[c.categoryKey].name).text)} • ${c.value} points
                    </div>

                    ${teamMode ? `
                        <div class="lq-active-team">
                            🎤 ${escapeHTML(team.name)}
                            <span>• ${team.score} points</span>
                        </div>
                    ` : ""}
                </div>
            </div>

            <h2
                class="lq-clue-question"
                id="lq-clue-question"
                tabindex="-1"
                ${c.answered ? "" : "data-autofocus"}
            >${escapeHTML(c.q.question)}</h2>

            <div class="lq-clue-controls" role="group" aria-labelledby="lq-clue-question">
                ${c.answers.map((answer, index) => {
                    const isRight = c.answered && answer.correct;
                    const isWrongPick = c.answered && !answer.correct && index === c.picked;

                    return `
                        <button
                            class="lq-answer-modal ${isRight ? "is-correct" : ""} ${isWrongPick ? "is-wrong" : ""}"
                            data-choice="${index}"
                            ${c.answered ? "disabled" : ""}
                        >
                            <span class="lq-key" aria-hidden="true">${index + 1}</span>
                            <span class="lq-answer-text">${escapeHTML(answer.text)}</span>
                            ${isRight ? '<span class="lq-mark">✅ Correct answer</span>' : ""}
                            ${isWrongPick ? '<span class="lq-mark">❌ Your answer</span>' : ""}
                        </button>
                    `;
                }).join("")}
            </div>

            ${c.answered ? `
                <div
                    id="lq-clue-feedback"
                    class="lq-clue-feedback ${c.correct ? "is-success" : c.timedOut ? "is-timeout" : "is-wrong"}"
                    tabindex="-1"
                    data-autofocus
                >${escapeHTML(clueFeedbackText(c))}</div>

                <div class="lq-clue-answer">Correct answer: ${escapeHTML(correctText)}</div>

                ${c.q.explanation ? `
                    <div class="lq-clue-explanation">
                        <strong>Why:</strong> ${escapeHTML(c.q.explanation)}
                    </div>
                ` : ""}

                <div class="lq-result-actions">
                    <button class="lq-tool" id="lq-read">🔊 Read aloud</button>
                    <button id="lq-clue-close">BACK TO BOARD ➡️</button>
                </div>
            ` : `
                <div class="lq-tools">
                    <button class="lq-tool" id="lq-read">🔊 Read aloud</button>
                </div>

                <p class="lq-note lq-key-tip">
                    Tip: press 1–${c.answers.length} to answer, or R to hear it read aloud.
                </p>
            `}
        </div>
    `);

    document.querySelectorAll("[data-choice]").forEach(button => {
        button.addEventListener("click", () => answerClue(Number(button.dataset.choice)));
    });

    on("lq-read", readClueAloud);
    on("lq-clue-close", closeClue);

    // Coming back from Settings: the clock carries on from where it stopped
    if (!c.answered) QuestionTimer.resume();
}

function readClueAloud() {

    const c = activeClue;

    if (!c) return;

    if (c.answered) {
        // Spoken result without team or player names (see speak)
        const correctText = c.answers.find(answer => answer.correct).text;
        const result = c.timedOut ? "Time's up." : c.correct ? "Correct!" : "Not quite.";
        speak(result + " The correct answer is " + correctText + ". " + (c.q.explanation || ""));
        return;
    }

    const choices = c.answers
        .map((answer, index) => "Choice " + (index + 1) + ": " + answer.text + ".")
        .join(" ");

    speak(
        splitLabel(categories[c.categoryKey].name).text + ", for " + c.value + " points. " +
        c.q.question + " " + choices
    );
}

function answerClue(index, timedOut = false) {

    const c = activeClue;

    if (!c || c.answered) return;
    if (!timedOut && !c.answers[index]) return;

    // Is time already up? (A background tab may not have caught up yet.)
    // If so this answer doesn't count: the check ends the question as timed out.
    if (!timedOut && c.seconds) {
        QuestionTimer.check();
        if (c.answered) return;
    }

    QuestionTimer.stop();
    stopSpeaking();

    const teamMode = questBoard.mode === "teams";
    const q = c.q;
    const ms = elapsedMs(c.timing);

    c.answered = true;
    c.timedOut = timedOut;
    c.picked = timedOut ? -1 : index;
    c.correct = !timedOut && c.answers[index].correct;

    c.cell.used = true;
    c.cell.correct = c.correct;
    c.cell.earned = 0;

    questBoard.answered++;

    if (c.correct) {
        questBoard.correct++;
        questBoard.streak++;
        questBoard.bestBoardStreak = Math.max(questBoard.bestBoardStreak, questBoard.streak);
    } else {
        questBoard.streak = 0;
    }

    if (teamMode) {

        // Classroom: team score and the classroom's own records only
        const classroom = getClassroom();

        if (c.correct) {
            questBoard.teams[c.teamIndex].score += c.value;
            c.cell.earned = c.value;
            classroom.missed = classroom.missed.filter(id => id !== q.id);
        } else if (!classroom.missed.includes(q.id)) {
            classroom.missed.push(q.id);
            classroom.missed = classroom.missed.slice(-MAX_CLASSROOM_MISSED);
        }

        QuestionEngine.recordAnswer(classroom.history, q, { correct: c.correct, ms, timedOut });
        saveClassroom();

    } else {

        const levelBefore = getLevel(player.xp);
        const stats = ensureStats(c.categoryKey);

        player.questionsAnswered++;
        stats.answered++;

        if (c.correct) {
            player.correctAnswers++;
            stats.correct++;
            player.currentStreak++;
            player.bestStreak = Math.max(player.bestStreak, player.currentStreak);

            c.streakBonus = questBoard.streak >= 3
                ? Math.min(100, (questBoard.streak - 2) * 25)
                : 0;

            c.cell.earned = c.value + c.streakBonus;
            questBoard.score += c.cell.earned;

            c.xp = getQuestionXP(q, "board");
            questBoard.xp += c.xp;

            player.xp += c.xp;
            player.categoryXP[c.categoryKey] = (player.categoryXP[c.categoryKey] || 0) + c.xp;

            // Answered it right, so it no longer needs practice
            player.missed = player.missed.filter(id => id !== q.id);
        } else {
            player.currentStreak = 0;
            if (!player.missed.includes(q.id)) player.missed.push(q.id);
        }

        QuestionEngine.recordAnswer(player.history, q, { correct: c.correct, ms, timedOut });

        player.level = getLevel(player.xp);
        savePlayer();
        checkAchievements({});

        if (player.level > levelBefore) {
            showToast("⬆️ LEVEL UP!", "Level " + player.level, getRank(player.level));
            playSound("levelup");
        }
    }

    playSound(c.correct ? "correct" : timedOut ? "timeup" : "miss");

    renderClue();

    const feedback = document.getElementById("lq-clue-feedback");
    if (feedback && feedback.scrollIntoView) feedback.scrollIntoView({ block: "center" });

    announce(timedOut
        ? "Time's up. The correct answer is " + c.answers.find(answer => answer.correct).text + "."
        : clueFeedbackText(c));
}

function closeClue() {

    const c = activeClue;

    if (!c || !c.answered) return;

    stopSpeaking();

    if (questBoard.mode === "teams") {
        questBoard.currentTeam = (c.teamIndex + 1) % questBoard.teams.length;
    }

    activeClue = null;

    if (questBoard.answered >= boardTotal()) {
        finishBoard();
    } else {
        renderQuestBoard();
    }
}

// Runs once when the last clue is answered
function finishBoard() {

    const total = boardTotal();

    if (!questBoard.finished) {

        questBoard.finished = true;

        if (questBoard.mode === "solo") {

            const levelBefore = getLevel(player.xp);
            const perfect = total > 0 && questBoard.correct === total;

            questBoard.bonusXP = BOARD_CLEAR_XP + (perfect ? BOARD_PERFECT_XP : 0);
            questBoard.xp += questBoard.bonusXP;
            player.xp += questBoard.bonusXP;
            player.level = getLevel(player.xp);

            player.questsCompleted++;
            savePlayer();

            if (player.level > levelBefore) {
                showToast("⬆️ LEVEL UP!", "Level " + player.level, getRank(player.level));
                playSound("levelup");
            }

            // Clearing a board counts as completing a quest in each of its worlds
            questBoard.categories.forEach(key => {
                checkAchievements({ questCompleted: true, category: key, perfect: false });
            });
            checkAchievements({
                questCompleted: true,
                category: "board",
                perfect: total > 0 && questBoard.correct === total
            });
        }

        playSound("complete");
        if (total > 0 && questBoard.correct / total >= 0.6) launchConfetti();
    }

    showBoardResult();
}

function showBoardResult() {
    screen = "board-result";

    const total = boardTotal();
    const accuracy = percent(questBoard.correct, total);
    const teamMode = questBoard.mode === "teams";

    const missedCells = Object.values(questBoard.cells).filter(cell => cell.used && !cell.correct);

    const teamRows = teamMode
        ? [...questBoard.teams]
            .sort((a, b) => b.score - a.score)
            .map((team, index) => `
                <div class="lq-team-result-row">
                    <span>${index + 1}. ${escapeHTML(team.name)}</span>
                    <strong>${team.score.toLocaleString("en-US")}</strong>
                </div>
            `).join("")
        : "";

    render(`
        <div class="lq-board-result">
            <div class="lq-result-kicker">${teamMode ? "🎓 CLASSROOM COMPLETE" : "⚡ BOARD COMPLETE"}</div>
            <h2 tabindex="-1" data-autofocus>${teamMode ? "THE BOARD IS CLEARED!" : "YOU CLEARED THE BOARD!"}</h2>
            <p class="lq-result-subtitle">
                ${teamMode
                    ? "Final classroom scores are below."
                    : `Nice run, ${escapeHTML(player.name)}. Here's how you played.`}
            </p>

            ${teamMode ? `
                <div class="lq-team-results">
                    ${teamRows}
                </div>
            ` : `
                <div class="lq-result-score">
                    <span>BOARD SCORE</span>
                    <strong>${questBoard.score.toLocaleString("en-US")}</strong>
                </div>
            `}

            <div class="lq-result-grid">
                <div><strong>${questBoard.correct}/${total}</strong><span>Correct</span></div>
                <div><strong>${accuracy}%</strong><span>Accuracy</span></div>
                <div><strong>${questBoard.bestBoardStreak}</strong><span>Best streak</span></div>
                ${teamMode
                    ? `<div><strong>${questBoard.teams.length}</strong><span>Teams</span></div>`
                    : `<div><strong>+${questBoard.xp}</strong><span>XP earned</span></div>`}
            </div>

            ${teamMode ? "" : `
                <p class="lq-board-caption lq-center">
                    Includes +${questBoard.bonusXP} XP for clearing the board${questBoard.bonusXP > BOARD_CLEAR_XP ? " perfectly" : ""}.
                    You're Level ${getLevel(player.xp)} with ${player.xp.toLocaleString("en-US")} XP.
                </p>
            `}

            ${teamMode && missedCells.length ? `
                <details class="lq-review">
                    <summary>🔁 Review the ${missedCells.length} clue${missedCells.length === 1 ? "" : "s"} we missed</summary>
                    <ol>
                        ${missedCells.map(cell => `
                            <li>
                                <strong>${escapeHTML(cell.question.question)}</strong><br>
                                Answer: ${escapeHTML(cell.question.answers[cell.question.correct])}
                            </li>
                        `).join("")}
                    </ol>
                </details>
            ` : ""}

            <div class="lq-result-actions">
                <button id="board-play-again">🎮 PLAY AGAIN</button>
                ${!teamMode && player.missed.length ? `
                    <button id="board-practice">🔁 PRACTICE MISTAKES (${player.missed.length})</button>
                ` : ""}
                <button id="board-menu">🏠 BACK TO MENU</button>
            </div>
        </div>
    `);

    on("board-play-again", () => startQuestBoard(boardOptions(questBoard)));
    on("board-practice", startPractice);
    on("board-menu", showProfile);
}

// "Play" from the menu: carry on with this player's own board, or deal a new one
function showCategories() {

    const ownBoard = questBoard &&
        questBoard.mode === "solo" &&
        questBoard.owner === activeKey &&
        !questBoard.finished;

    if (ownBoard) {
        renderQuestBoard();
    } else {
        startQuestBoard();
    }
}

function chooseCategory(category) {
    if (!categories[category]) return;
    currentCategory = category;
    startQuestBoard();
}

// Leaves any board that is in progress (switching player, resetting progress)
function endBoard() {
    QuestionTimer.stop();
    releaseUnusedClues();
    questBoard = null;
    activeClue = null;
}


// The questions a quest mode can draw from in the current world
function questPool(modeKey, categoryKey = currentCategory) {

    const mode = questModes[modeKey];

    return categories[categoryKey].questions.filter(
        q => mode.difficulties.includes(q.difficulty)
    );
}


function showQuestModes() {

    screen = "modes";

    const categoryName = categories[currentCategory].name;
    const label = splitLabel(categoryName);

    render(`

        <div class="quest-mode-header">

            <div class="quest-mode-icon">
                ${label.icon}
            </div>

            <h2 tabindex="-1" data-autofocus>
                ${escapeHTML(categoryName)}
            </h2>

            <p>
                Choose your quest!
            </p>

        </div>


        <div class="quest-modes">

            ${Object.keys(questModes).map(modeKey => {

                const mode = questModes[modeKey];
                const pool = questPool(modeKey);
                const count = Math.min(mode.questions, pool.length);

                // The most XP this quest could possibly give
                const maxXP = pool
                    .map(q => getQuestionXP(q, modeKey))
                    .sort((a, b) => b - a)
                    .slice(0, count)
                    .reduce((total, xp) => total + xp, 0);

                const best = player.bestStars[currentCategory + ":" + modeKey] || 0;

                return `

                    <button
                        class="quest-mode ${mode.className}-mode"
                        data-mode="${modeKey}"
                        ${count === 0 ? "disabled" : ""}
                    >

                        <div class="mode-icon">
                            ${mode.icon}
                        </div>

                        <div class="mode-content">

                            <strong>
                                ${mode.title}
                            </strong>

                            <span>
                                ${count} ${mode.label} questions
                            </span>

                            <span>
                                ⭐ Up to ${maxXP.toLocaleString("en-US")} XP
                            </span>

                            ${best ? `
                                <span aria-label="Your best: ${best} out of 3 stars">
                                    Your best: ${starString(best)}
                                </span>
                            ` : ""}

                        </div>

                        <div class="mode-arrow">
                            →
                        </div>

                    </button>

                `;

            }).join("")}

        </div>


        <button id="back-to-board">⚡ BACK TO BOARD</button>

    `);


    document.querySelectorAll("[data-mode]").forEach(button => {

        button.addEventListener("click", function () {

            startQuestMode(this.dataset.mode);
        });
    });

    on("back-to-board", showCategories);
}


// ==========================================
// STARTING A QUEST
// ==========================================

function beginQuest(questions) {

    questScore = 0;
    questCorrect = 0;
    currentQuestionIndex = 0;
    questMissedIds = [];
    qState = null;
    lastFeedback = null;
    lastResult = null;
    questQuestions = questions;

    showQuestion();
}


function startQuestMode(mode) {

    if (!questModes[mode] || !categories[currentCategory]) return;

    currentQuestMode = mode;

    // Hardest allowed difficulty first; the engine falls back to easier ones
    beginQuest(QuestionEngine.pickMany(questModes[mode].questions, {
        categories: [currentCategory],
        difficulties: [...questModes[mode].difficulties].reverse(),
        history: player.history,
        session: playerSession()
    }));
}


// Practice Mistakes repeats missed questions on purpose. No timer.
function startPractice() {

    // Tidy the list: questions that were removed from the bank can't be practised
    player.missed = player.missed.filter(id => QuestionEngine.byId(id));

    const questions = QuestionEngine.pickPractice(player.missed, PRACTICE_SIZE, player.history);

    if (questions.length === 0) {

        savePlayer();
        showProfile();
        announce("No mistakes to practice right now. Great job!");

        return;
    }

    currentCategory = "practice";
    currentQuestMode = "practice";

    beginQuest(questions);
}


// ==========================================
// SHOW QUESTION
// ==========================================

function newQuestionState(question) {

    return {
        question: question,
        answers: buildAnswers(question),
        eliminated: new Set(),   // removed by the hint
        tried: new Set(),        // wrong answers already picked
        hintUsed: false,
        wrongCount: 0,
        locked: false,
        firstShow: true,
        timing: newTiming()      // answer time, not counting Settings or breaks
    };
}


function showQuestion() {

    if (currentQuestionIndex >= questQuestions.length) {

        finishQuest();

        return;
    }

    screen = "question";

    currentQuestion = questQuestions[currentQuestionIndex];

    if (!qState || qState.question !== currentQuestion) {
        qState = newQuestionState(currentQuestion);
    }

    // Coming back from Settings or a break
    timingBack(qState.timing);

    const firstShow = qState.firstShow;

    if (firstShow) {
        qState.firstShow = false;
        QuestionEngine.noteShown(player.history, currentQuestion);
        savePlayer();
    }

    const total = questQuestions.length;

    render(`

        <p class="category-name">
            ${escapeHTML(categoryLabel(currentCategory))}
        </p>

        <div
            class="lq-quest-progress"
            role="progressbar"
            aria-label="Quest progress"
            aria-valuemin="0"
            aria-valuemax="${total}"
            aria-valuenow="${currentQuestionIndex}"
        >
            <span style="width:${percent(currentQuestionIndex, total)}%"></span>
        </div>

        <p>
            Question ${currentQuestionIndex + 1}
            of ${total}
        </p>

        <h2
            class="question-text"
            id="lq-question-text"
            tabindex="-1"
            data-autofocus
        >
            ${escapeHTML(currentQuestion.question)}
        </h2>

        <div
            class="answers"
            role="group"
            aria-labelledby="lq-question-text"
        >

            ${qState.answers.map((answer, index) => `

                <button class="lq-answer" data-answer="${index}">
                    <span class="lq-key" aria-hidden="true">${index + 1}</span>
                    <span>${escapeHTML(answer.text)}</span>
                </button>

            `).join("")}

        </div>

        <p class="lq-message" id="lq-message"></p>

        <div class="lq-tools">

            <button class="lq-tool" id="lq-read">🔊 Read aloud</button>

            <button
                class="lq-tool"
                id="lq-hint"
                ${qState.answers.length < 3 ? "disabled" : ""}
            >💡 Hint</button>

            <button class="lq-tool" id="lq-break">🌿 Break</button>

        </div>

        <p class="score">
            Quest XP: ${questScore}
        </p>

        ${currentCategory === "practice" ? `
            <p class="lq-note">⏱️ No timer in Practice Mistakes. Take your time.</p>
        ` : ""}

        <p class="lq-note lq-key-tip">
            Tip: press the number keys ${
                qState.answers.length > 1 ? "1–" + qState.answers.length : "1"
            } to answer, R to hear it read aloud, H for a hint.
        </p>

    `);

    document.querySelectorAll("[data-answer]").forEach(button => {

        button.addEventListener("click", function () {

            handleAnswer(Number(this.dataset.answer));
        });
    });

    on("lq-read", readQuestionAloud);
    on("lq-hint", useHint);
    on("lq-break", showBreak);

    if (firstShow && settings.autoRead) readQuestionAloud();

    refreshAnswerButtons();

}


// Keeps the answer buttons in sync with what the player has already tried
function refreshAnswerButtons() {

    if (!qState) return;

    document.querySelectorAll("[data-answer]").forEach(button => {

        const index = Number(button.dataset.answer);
        const eliminated = qState.eliminated.has(index);
        const tried = qState.tried.has(index);

        button.classList.toggle("lq-eliminated", eliminated);
        button.classList.toggle("lq-tried", tried);
        button.disabled = eliminated || tried || qState.locked;
    });

    const hint = document.getElementById("lq-hint");

    if (hint) {
        hint.disabled = qState.hintUsed || qState.locked || qState.answers.length < 3;
    }
}


function readQuestionAloud() {

    if (!qState) return;

    const choices = qState.answers
        .map((answer, index) => ({ answer, index }))
        .filter(item => !qState.eliminated.has(item.index) && !qState.tried.has(item.index))
        .map(item => "Choice " + (item.index + 1) + ": " + item.answer.text + ".")
        .join(" ");

    speak(currentQuestion.question + " " + choices);
}


// ==========================================
// HINTS AND SECOND CHANCES
// We never take XP away for asking for help.
// ==========================================

function useHint() {

    if (!qState || qState.locked || qState.hintUsed || qState.answers.length < 3) return;

    const wrongOnes = qState.answers
        .map((answer, index) => ({ answer, index }))
        .filter(item =>
            !item.answer.correct &&
            !qState.tried.has(item.index) &&
            !qState.eliminated.has(item.index)
        );

    // Always leave one wrong answer so the hint narrows things down without giving it away
    const toRemove = shuffle(wrongOnes).slice(0, Math.max(0, Math.min(2, wrongOnes.length - 1)));

    toRemove.forEach(item => qState.eliminated.add(item.index));

    qState.hintUsed = true;
    player.hintsUsed++;

    savePlayer();
    refreshAnswerButtons();

    const message = document.getElementById("lq-message");

    if (message) message.textContent = "💡 Hint: some wrong answers were crossed out.";

    announce("Hint used. Some wrong answers were crossed out.");

    const firstOpen = document.querySelector("[data-answer]:not(:disabled)");

    if (firstOpen) firstOpen.focus();
}


function handleAnswer(index) {

    if (!qState || qState.locked) return;

    const choice = qState.answers[index];

    if (!choice || qState.eliminated.has(index) || qState.tried.has(index)) return;

    stopSpeaking();

    if (choice.correct) {

        resolveQuestion(true);

        return;
    }

    qState.wrongCount++;
    qState.tried.add(index);

    // First mistake: offer another try (unless a hint already helped)
    if (settings.secondChances && qState.wrongCount === 1 && !qState.hintUsed) {

        playSound("retry");
        refreshAnswerButtons();

        const message = document.getElementById("lq-message");

        if (message) message.textContent = "Not this one. Try again, you can do it!";

        announce("Not this one. Try again, you can do it!");

        const firstOpen = document.querySelector("[data-answer]:not(:disabled)");

        if (firstOpen) firstOpen.focus();

        return;
    }

    resolveQuestion(false);
}


// ==========================================
// SCORING AN ANSWER
// ==========================================

function resolveQuestion(correct) {

    qState.locked = true;

    const q = currentQuestion;
    const categoryKey = q.category;
    const levelBefore = getLevel(player.xp);
    const stats = ensureStats(categoryKey);

    let xp = 0;
    let secondTry = false;

    player.questionsAnswered++;
    stats.answered++;

    if (correct) {

        secondTry = qState.wrongCount > 0;

        xp = getQuestionXP(q);

        if (secondTry) {
            xp = Math.round(xp / 2);
            player.secondChanceWins++;
        }

        player.correctAnswers++;
        stats.correct++;

        player.currentStreak++;

        if (player.currentStreak > player.bestStreak) {
            player.bestStreak = player.currentStreak;
        }

        player.xp += xp;
        player.categoryXP[categoryKey] = (player.categoryXP[categoryKey] || 0) + xp;

        questScore += xp;
        questCorrect++;

        // Answered it right, so it no longer needs practice
        player.missed = player.missed.filter(id => id !== q.id);

    } else {

        player.currentStreak = 0;

        if (!player.missed.includes(q.id)) player.missed.push(q.id);

        questMissedIds.push(q.id);
    }

    QuestionEngine.recordAnswer(player.history, q, {
        correct: correct,
        ms: elapsedMs(qState.timing)
    });

    const levelAfter = getLevel(player.xp);

    player.level = levelAfter;

    lastFeedback = {
        correct: correct,
        secondTry: secondTry,
        xp: xp,
        streak: player.currentStreak,
        title: pick(correct ? CORRECT_TITLES : MISS_TITLES)
    };

    playSound(correct ? "correct" : "miss");

    savePlayer();

    checkAchievements({});

    if (levelAfter > levelBefore) {

        showToast("⬆️ LEVEL UP!", "Level " + levelAfter, getRank(levelAfter));

        playSound("levelup");
    }

    showFeedback();
}


// ==========================================
// FEEDBACK
// ==========================================

function showFeedback() {

    screen = "feedback";

    const f = lastFeedback;
    const q = currentQuestion;

    const correctText = qState
        ? qState.answers.find(answer => answer.correct).text
        : q.answers[q.correct];

    const readButton = '<button class="lq-tool" id="lq-read-feedback">🔊 Read aloud</button>';


    if (f.correct) {

        render(`

            <div class="feedback-correct">

                <div class="feedback-icon">
                    ${f.secondTry ? "💪" : "🎉"}
                </div>

                <h2>
                    ${escapeHTML(f.title)}
                </h2>

                <div class="xp-animation">
                    +${f.xp} XP
                </div>

                ${f.secondTry ? `
                    <p class="lq-note">
                        Second try earns half XP. Great persistence!
                    </p>
                ` : ""}

                ${f.streak >= 3 ? `
                    <p class="lq-note">
                        🔥 ${f.streak} in a row!
                    </p>
                ` : ""}

                <p>
                    ${escapeHTML(q.explanation)}
                </p>

                ${readButton}

                <button id="continue-button" data-autofocus>
                    ➡️ CONTINUE
                </button>

            </div>

        `);

    } else {

        render(`

            <div class="feedback-wrong">

                <div class="feedback-icon">
                    💡
                </div>

                <h2>
                    ${escapeHTML(f.title)}
                </h2>

                <p>
                    The correct answer was:
                </p>

                <h3>
                    ${escapeHTML(correctText)}
                </h3>

                <p>
                    ${escapeHTML(q.explanation)}
                </p>

                <p class="lq-note">
                    We saved this one so you can practice it later.
                </p>

                ${readButton}

                <button id="continue-button" data-autofocus>
                    ➡️ CONTINUE
                </button>

            </div>

        `);
    }


    on("continue-button", nextQuestion);
    on("lq-read-feedback", readFeedbackAloud);



}


function readFeedbackAloud() {

    const f = lastFeedback;
    const q = currentQuestion;

    if (!f || !q) return;

    const correctText = qState
        ? qState.answers.find(answer => answer.correct).text
        : q.answers[q.correct];

    speak(
        f.title + " " +
        (f.correct ? "" : "The correct answer was " + correctText + ". ") +
        q.explanation
    );
}


function nextQuestion() {

    currentQuestionIndex++;

    qState = null;

    showQuestion();
}


// ==========================================
// END OF QUEST
// ==========================================

function getStars(percentage) {

    if (percentage >= 90) return 3;
    if (percentage >= 60) return 2;

    return 1;    // finishing a quest always earns at least one star
}


function finishQuest() {

    player.questsCompleted++;

    const total = questQuestions.length;
    const percentage = percent(questCorrect, total);
    const stars = getStars(percentage);
    const starKey = currentCategory + ":" + currentQuestMode;
    const previousBest = player.bestStars[starKey] || 0;

    if (stars > previousBest) player.bestStars[starKey] = stars;

    checkAchievements({
        questCompleted: true,
        category: currentCategory,
        perfect: total > 0 && questCorrect === total
    });

    savePlayer();

    lastResult = {
        total: total,
        correct: questCorrect,
        percentage: percentage,
        stars: stars,
        xp: questScore,
        newBest: stars > previousBest && previousBest > 0,
        missedCount: questMissedIds.length
    };

    showQuestResult();
}


function showQuestResult() {

    screen = "result";

    const r = lastResult;

    render(`

        <div class="final-result">

            <div class="feedback-icon">
                🏆
            </div>

            <h2 tabindex="-1" data-autofocus>
                ${currentCategory === "practice" ? "PRACTICE COMPLETE!" : "QUEST COMPLETE!"}
            </h2>

            <p>
                Great work, ${escapeHTML(player.name)}!
            </p>

            <div
                class="lq-stars"
                role="img"
                aria-label="${r.stars} out of 3 stars"
            >
                ${starString(r.stars)}
            </div>

            <p>
                ${RESULT_MESSAGES[r.stars]}
                ${r.newBest ? "That's a new personal best!" : ""}
            </p>

            <div class="final-xp">
                +${r.xp} XP
            </div>

            <h3>
                ${r.correct}
                /
                ${r.total}
                Correct
            </h3>

            <p>
                Accuracy: ${r.percentage}%
            </p>

            <p>
                🔥 Current Streak:
                ${player.currentStreak}
            </p>

            ${player.missed.length > 0 ? `
                <button id="practice-missed">
                    🔁 PRACTICE MISTAKES (${player.missed.length})
                </button>
            ` : ""}

            <button id="another-quest">
                ⚡ PLAY QUEST BOARD
            </button>

            <button id="view-profile">
                👤 VIEW PROFILE
            </button>

        </div>

    `);

    on("another-quest", showCategories);
    on("practice-missed", startPractice);
    on("view-profile", showProfile);

    playSound("complete");

    if (r.stars >= 2) launchConfetti();

    announce(
        "Quest complete. " + r.correct + " out of " + r.total +
        " correct. " + r.stars + " out of 3 stars."
    );
}


// ==========================================
// BREATHING BREAK
// ==========================================

function showBreak() {

    if (qState) timingAway(qState.timing);

    screen = "break";

    render(`

        <div class="lq-break">

            <h2 tabindex="-1" data-autofocus>🌿 Take a break</h2>

            <p>Your quest is paused. Your XP is saved. Take all the time you need.</p>

            <div class="lq-breathe" aria-hidden="true">Breathe</div>

            <p>Breathe in for 4 seconds, then out for 6 seconds.</p>

            <button id="resume-quest">▶️ I'M READY</button>

            <button id="leave-quest">🏠 LEAVE AND GO TO MENU</button>

        </div>

    `);

    on("resume-quest", showQuestion);

    on("leave-quest", () => {

        qState = null;

        showProfile();
    });
}


// ==========================================
// ACHIEVEMENT SYSTEM
// ==========================================

function checkAchievements(context = {}) {

    let unlockedSomething = false;

    Object.keys(achievements).forEach(id => {

        if (player.achievements.includes(id)) return;

        let earned = false;

        try {
            earned = achievements[id].test(player, context);
        } catch (error) {
            console.error("Achievement check failed for", id, error);
        }

        if (earned) {

            player.achievements.push(id);

            showAchievementUnlocked(achievements[id]);

            unlockedSomething = true;
        }
    });

    if (unlockedSomething) {

        playSound("achievement");

        savePlayer();
    }
}


// ==========================================
// ACHIEVEMENT SCREEN
// ==========================================

function showAchievements() {

    screen = "achievements";

    const ids = Object.keys(achievements);
    const unlockedCount = ids.filter(id => player.achievements.includes(id)).length;

    render(`

        <h2 tabindex="-1" data-autofocus>🏆 Achievements</h2>

        <p>
            ${unlockedCount} of ${ids.length} unlocked. Keep playing to unlock them all!
        </p>

        <div class="profile-categories">

            ${ids.map(id => {

                const achievement = achievements[id];
                const unlocked = player.achievements.includes(id);

                return `

                    <div
                        class="profile-category"
                        style="opacity:${unlocked ? "1" : "0.6"};"
                    >

                        <div class="profile-category-title">
                            ${escapeHTML(achievement.name)}
                        </div>

                        <div class="profile-category-xp">
                            ${unlocked ? "✅ UNLOCKED" : "🔒 LOCKED"}
                        </div>

                        <small>
                            ${escapeHTML(achievement.description)}
                        </small>

                    </div>

                `;

            }).join("")}

        </div>

        <button id="back-profile-achievements">
            👤 BACK TO PROFILE
        </button>

    `);

    on("back-profile-achievements", showProfile);
}


// ==========================================
// PROGRESS REPORT (for students, teachers, and families)
// ==========================================

function showReport() {

    screen = "report";

    const totalAnswered = player.questionsAnswered;
    const accuracy = percent(player.correctAnswers, totalAnswered);
    const level = getLevel(player.xp);

    const keys = Object.keys(categories);

    // Suggest one world to revisit: the lowest accuracy with a fair number of answers
    const needsPractice = keys
        .map(key => ({ key, stats: getStats(key) }))
        .filter(item => item.stats.answered >= 3 && percent(item.stats.correct, item.stats.answered) < 70)
        .sort((a, b) =>
            percent(a.stats.correct, a.stats.answered) - percent(b.stats.correct, b.stats.answered)
        )[0];

    const trackedAnswers = keys.reduce((sum, key) => sum + getStats(key).answered, 0);

    // Answer times and difficulty results from the question history (engine.js)
    const insights = QuestionEngine.summarize(player.history);
    const seconds = ms => ms === null ? "–" : (ms / 1000).toFixed(1) + "s";

    render(`

        <h2 tabindex="-1" data-autofocus>📈 ${escapeHTML(player.name)}'s Progress</h2>

        <div class="lq-stat-grid">

            <div class="lq-stat"><b>${level}</b>Level</div>
            <div class="lq-stat"><b>${player.xp}</b>Total XP</div>
            <div class="lq-stat"><b>${totalAnswered}</b>Questions</div>
            <div class="lq-stat"><b>${accuracy}%</b>Accuracy</div>
            <div class="lq-stat"><b>${player.bestStreak}</b>Best streak</div>
            <div class="lq-stat"><b>${player.questsCompleted}</b>Quests done</div>
            <div class="lq-stat"><b>${seconds(insights.overall.avgMs)}</b>Avg answer time</div>
            <div class="lq-stat"><b>${player.missed.length}</b>To practice</div>

        </div>

        <h3>By world</h3>

        <div>

            ${keys.map(key => {

                const stats = getStats(key);
                const pct = percent(stats.correct, stats.answered);

                return `

                    <div class="lq-report-row">

                        <div>${escapeHTML(categories[key].name)}</div>

                        <div
                            class="lq-report-bar"
                            role="img"
                            aria-label="${escapeHTML(splitLabel(categories[key].name).text)}: ${pct}% correct"
                        >
                            <span style="width:${pct}%"></span>
                        </div>

                        <div>
                            ${stats.answered > 0
                                ? stats.correct + "/" + stats.answered + " • " + pct + "%"
                                : "Not played yet"}
                        </div>

                    </div>

                `;

            }).join("")}

        </div>

        <h3>By difficulty</h3>

        <div>
            ${QuestionEngine.DIFFICULTIES.map(d => {

                const stats = insights.byDifficulty[d];
                const pct = stats.accuracy || 0;
                const name = d.charAt(0).toUpperCase() + d.slice(1);

                return `
                    <div class="lq-report-row">
                        <div>${name}</div>
                        <div class="lq-report-bar" role="img" aria-label="${name}: ${pct}% correct">
                            <span style="width:${pct}%"></span>
                        </div>
                        <div>
                            ${stats.answered > 0
                                ? stats.correct + "/" + stats.answered + " • " + pct + "% • " + seconds(stats.avgMs)
                                : "Not played yet"}
                        </div>
                    </div>
                `;
            }).join("")}
        </div>

        ${needsPractice ? `
            <p class="lq-note">
                💡 A great next step: play more of
                <strong>${escapeHTML(splitLabel(categories[needsPractice.key].name).text)}</strong>
                to build confidence.
            </p>
        ` : ""}

        ${trackedAnswers < totalAnswered ? `
            <p class="lq-note">
                Detailed world-by-world results start counting from this update.
            </p>
        ` : ""}

        <button id="download-report">⬇️ DOWNLOAD REPORT (CSV)</button>

        <button id="print-report">🖨️ PRINT</button>

        <button id="back-profile-report">👤 BACK TO PROFILE</button>

    `);

    on("download-report", downloadReport);
    on("print-report", () => window.print());
    on("back-profile-report", showProfile);
}


function csvCell(value) {

    if (typeof value === "number") return String(value);

    let text = String(value);

    // Stops spreadsheet programs from running a name like "=SUM(...)" as a formula
    if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;

    if (/[",\r\n]/.test(text)) text = '"' + text.replace(/"/g, '""') + '"';

    return text;
}


function downloadFile(filename, content, type) {

    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}


function downloadReport() {

    const date = new Date().toISOString().slice(0, 10);

    const rows = [[
        "Report date", "Player", "World", "Questions answered", "Correct", "Accuracy (%)", "XP earned",
        "Avg answer time (s)"
    ]];

    const insights = QuestionEngine.summarize(player.history);
    const seconds = ms => ms === null ? "" : Math.round(ms / 100) / 10;

    Object.keys(categories).forEach(key => {

        const stats = getStats(key);

        rows.push([
            date,
            player.name,
            splitLabel(categories[key].name).text,
            stats.answered,
            stats.correct,
            stats.answered > 0 ? percent(stats.correct, stats.answered) : "",
            player.categoryXP[key] || 0,
            seconds(insights.byCategory[key].avgMs)
        ]);
    });

    rows.push([
        date,
        player.name,
        "All worlds",
        player.questionsAnswered,
        player.correctAnswers,
        player.questionsAnswered > 0 ? percent(player.correctAnswers, player.questionsAnswered) : "",
        player.xp,
        seconds(insights.overall.avgMs)
    ]);

    const csv = "\uFEFF" + rows.map(row => row.map(csvCell).join(",")).join("\r\n");

    const safeName = player.name.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "player";

    downloadFile(safeName + "-life-quest-report.csv", csv, "text/csv;charset=utf-8");
}


// ==========================================
// SETTINGS SCREEN
// ==========================================

function openSettings() {

    if (screen === "settings") {

        closeSettings();

        return;
    }

    settingsReturnScreen = screen;

    // Pause the question: the clock stops and answer time stops counting
    if (screen === "clue" && activeClue && !activeClue.answered) {
        timingAway(activeClue.timing);
        QuestionTimer.pause();
    }

    if (screen === "question" && qState && !qState.locked) timingAway(qState.timing);

    showSettings();
}


function closeSettings() {

    restoreScreen(settingsReturnScreen);
}


function switchRow(key, label, help, disabled) {

    const isOn = settings[key];

    return `

        <div class="lq-setting">

            <div>
                <div class="lq-setting-label" id="lq-label-${key}">${label}</div>
                <div class="lq-setting-help">${help}</div>
            </div>

            <button
                type="button"
                class="lq-switch"
                role="switch"
                aria-checked="${isOn ? "true" : "false"}"
                aria-labelledby="lq-label-${key}"
                data-setting="${key}"
                ${disabled ? "disabled" : ""}
            >${isOn ? "ON" : "OFF"}</button>

        </div>
    `;
}


function showSettings() {

    screen = "settings";

    // Settings opened from Classroom Mode: keep personal-progress controls out of reach
    const classroomInUse = settingsReturnScreen === "classroom-setup" ||
        (questBoard && questBoard.mode === "teams" &&
            ["board", "clue", "board-result"].includes(settingsReturnScreen));

    const sizes = [
        ["normal", "Normal"],
        ["large", "Large"],
        ["xlarge", "Extra large"]
    ];

    render(`

        <h2 tabindex="-1" data-autofocus>⚙️ Settings</h2>

        <p>Make the game work best for you. Changes save automatically.</p>

        <div class="lq-setting">

            <div>
                <div class="lq-setting-label" id="lq-label-size">Text size</div>
            </div>

            <div class="lq-segment" role="group" aria-labelledby="lq-label-size">
                ${sizes.map(([value, label]) => `
                    <button
                        type="button"
                        class="lq-seg"
                        data-size="${value}"
                        aria-pressed="${settings.textSize === value ? "true" : "false"}"
                    >${label}</button>
                `).join("")}
            </div>

        </div>

        <div class="lq-setting lq-setting-wide">

            <div>
                <div class="lq-setting-label" id="lq-label-timer">Question timer</div>
                <div class="lq-setting-help">
                    Standard: 45 / 40 / 35 seconds for easy / medium / hard questions.
                    Off also stops the timer on the current question.
                    Practice Mistakes has no timer. Classroom Mode uses the teacher's choice.
                </div>
            </div>

            <div class="lq-segment" role="group" aria-labelledby="lq-label-timer">
                ${TIMER_MODES.map(mode => `
                    <button
                        type="button"
                        class="lq-seg"
                        data-timer-mode="${mode}"
                        aria-pressed="${settings.timerMode === mode ? "true" : "false"}"
                    >${{ standard: "Standard", extra: "Extra time (+50%)", off: "Off" }[mode]}</button>
                `).join("")}
            </div>

        </div>

        ${switchRow("highContrast", "High contrast", "Black background with bright text")}

        ${switchRow("readableFont", "Easy-to-read font", "Clearer letters with extra spacing")}

        ${switchRow("reduceMotion", "Less movement", "Turns off animations and confetti")}


        ${switchRow(
            "sound",
            "Sound effects",
            soundSupported() ? "Soft, gentle sounds" : "Not available in this browser",
            !soundSupported()
        )}

        ${switchRow("secondChances", "Second chances", "Get one more try on a question for half XP")}

        ${switchRow(
            "autoRead",
            "Read questions aloud automatically",
            readAloudSupported() ? "Each new question is read out loud. Press R to hear it again." : "Not available in this browser",
            !readAloudSupported()
        )}

        <div class="lq-setting lq-setting-wide">

            <div>
                <div class="lq-setting-label" id="lq-label-voice">Reading voice</div>
                <div class="lq-setting-help">
                    ${LifeQuestVoice.isConfigured()
                        ? "The natural voice sounds more like a real person. If it can't play, the built-in voice reads instead."
                        : "Uses the best voice on this computer."}
                    ${browserVoiceName() ? `<br>Built-in voice: <strong>${escapeHTML(browserVoiceName())}</strong>` : ""}
                </div>
            </div>

            <div class="lq-segment" role="group" aria-labelledby="lq-label-voice">
                <button
                    type="button"
                    class="lq-seg"
                    data-voice="browser"
                    aria-pressed="${settings.voice !== "natural" || !LifeQuestVoice.isConfigured() ? "true" : "false"}"
                    ${speechSupported() ? "" : "disabled"}
                >Built-in voice</button>
                <button
                    type="button"
                    class="lq-seg"
                    data-voice="natural"
                    aria-pressed="${settings.voice === "natural" && LifeQuestVoice.isConfigured() ? "true" : "false"}"
                    ${LifeQuestVoice.isConfigured() ? "" : "disabled"}
                >Natural voice</button>
                <button type="button" class="lq-seg" id="lq-voice-test">🔊 Try it</button>
            </div>

        </div>

        <div class="lq-tools">


            ${player.name && !classroomInUse ? `
                <button class="lq-tool" id="reset-progress">🗑️ Reset my progress</button>
            ` : ""}

            ${player.name && classroomInUse ? `
                <p class="lq-note">🎓 "Reset my progress" is hidden during Classroom Mode.</p>
            ` : ""}

        </div>

        <button id="close-settings">✅ DONE</button>

    `);

    document.querySelectorAll("[data-setting]").forEach(button => {

        button.addEventListener("click", function () {

            const key = this.dataset.setting;

            settings[key] = !settings[key];

            saveSettings();
            applySettings();

            this.setAttribute("aria-checked", settings[key] ? "true" : "false");
            this.textContent = settings[key] ? "ON" : "OFF";

            // Give instant feedback when sound effects are enabled
            if (key === "sound" && settings.sound) playSound("correct");
        });
    });

    document.querySelectorAll("[data-size]").forEach(button => {

        button.addEventListener("click", function () {

            settings.textSize = this.dataset.size;

            saveSettings();
            applySettings();

            document.querySelectorAll("[data-size]").forEach(other => {
                other.setAttribute("aria-pressed", other === this ? "true" : "false");
            });
        });
    });

    document.querySelectorAll("[data-voice]").forEach(button => {

        button.addEventListener("click", function () {

            settings.voice = this.dataset.voice;
            voiceFallbackTold = false;

            saveSettings();

            document.querySelectorAll("[data-voice]").forEach(other => {
                other.setAttribute("aria-pressed", other === this ? "true" : "false");
            });
        });
    });

    on("lq-voice-test", () => speak("Welcome to Life Quest. Here is your next question."));

    document.querySelectorAll("[data-timer-mode]").forEach(button => {

        button.addEventListener("click", function () {

            settings.timerMode = this.dataset.timerMode;

            saveSettings();

            document.querySelectorAll("[data-timer-mode]").forEach(other => {
                other.setAttribute("aria-pressed", other === this ? "true" : "false");
            });
        });
    });


    on("reset-progress", () => {

        const sure = window.confirm(
            "Reset all of " + player.name + "'s progress? This cannot be undone."
        );

        if (!sure) return;

        endBoard();

        player = createDefaultPlayer(player.name);
        profiles[activeKey] = player;
        QuestionEngine.resetSession(playerSession());

        savePlayer();

        showProfile();
    });

    on("close-settings", closeSettings);
}


// Goes back to whatever the player was looking at before opening Settings
function restoreScreen(name) {

    const hasPlayer = Boolean(player.name);

    switch (name) {

        case "welcome":
            showWelcome();
            break;

        case "picker":
            showPlayerPicker();
            break;

        case "categories":
            hasPlayer ? showCategories() : showWelcome();
            break;

        case "board":
            !hasPlayer ? showWelcome() : questBoard ? renderQuestBoard() : showCategories();
            break;

        case "classroom-setup":
            hasPlayer ? showClassroomSetup() : showWelcome();
            break;

        case "clue":
            if (activeClue && questBoard) {
                applyTimerOffToClue();
                renderClue();
            } else {
                showCategories();
            }
            break;

        case "board-result":
            questBoard ? showBoardResult() : showProfile();
            break;

        case "modes":
            categories[currentCategory] ? showQuestModes() : showCategories();
            break;

        case "question":
            questQuestions.length ? showQuestion() : showCategories();
            break;

        case "feedback":
            lastFeedback && currentQuestion ? showFeedback() : showProfile();
            break;

        case "result":
            lastResult ? showQuestResult() : showProfile();
            break;

        case "achievements":
            showAchievements();
            break;

        case "report":
            showReport();
            break;

        case "break":
            showBreak();
            break;

        default:
            hasPlayer ? showProfile() : showWelcome();
    }
}


// ==========================================
// KEYBOARD SUPPORT
// 1-4 answer, H = hint, R = read aloud, Esc closes Settings
// ==========================================

function handleKeydown(event) {

    if (event.altKey || event.ctrlKey || event.metaKey) return;

    const target = event.target;
    const tag = target && target.tagName ? target.tagName.toLowerCase() : "";

    if (tag === "input" || tag === "textarea" || tag === "select") {

        if (event.key === "Enter" && target.id === "student-name") {

            event.preventDefault();

            createProfile();
        }

        return;
    }

    if (event.key === "Escape" && screen === "settings") {

        closeSettings();

        return;
    }

    const key = String(event.key || "").toLowerCase();

    // Quest Board clue: 1-4 answer, R reads the clue (or the result) aloud
    if (screen === "clue" && activeClue) {

        if (key === "r") {
            event.preventDefault();
            readClueAloud();
        } else if (!activeClue.answered && /^[1-9]$/.test(key) && activeClue.answers[Number(key) - 1]) {
            event.preventDefault();
            answerClue(Number(key) - 1);
        }

        return;
    }

    if (screen === "feedback" && key === "r") {
        event.preventDefault();
        readFeedbackAloud();
        return;
    }

    if (screen !== "question" || !qState || qState.locked) return;

    if (key === "r") {

        event.preventDefault();
        readQuestionAloud();

    } else if (/^[1-9]$/.test(event.key)) {

        const index = Number(event.key) - 1;

        if (qState.answers[index]) {

            event.preventDefault();

            handleAnswer(index);
        }

    } else if (event.key === "h" || event.key === "H") {

        useHint();

    }
}


// ==========================================
// START GAME
// ==========================================

function startGame() {

    if (!document.documentElement.lang) document.documentElement.lang = "en";

    injectStyles();

    settings = loadSettings();

    applySettings();

    const card = getCard();

    if (card) {

        // Keep the sign-in form from index.html so Settings can return to it
        welcomeHTML = card.innerHTML;

        card.setAttribute("tabindex", "-1");
        card.setAttribute("role", "region");
        card.setAttribute("aria-label", "Life Quest game");
    }

    // Settings button, message area for screen readers, and a spot for pop-up messages
    const fab = document.createElement("button");

    fab.type = "button";
    fab.className = "lq-fab";
    fab.id = "lq-settings-button";
    fab.title = "Settings";
    fab.setAttribute("aria-label", "Settings and accessibility");
    fab.textContent = "⚙️";
    fab.addEventListener("click", openSettings);

    const live = document.createElement("div");

    live.id = "lq-live";
    live.className = "lq-sr-only";
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");

    const toasts = document.createElement("div");

    toasts.id = "lq-toasts";
    toasts.setAttribute("role", "status");
    toasts.setAttribute("aria-live", "polite");

    document.body.append(fab, live, toasts);

    document.addEventListener("keydown", handleKeydown);

    window.addEventListener("pagehide", stopSpeaking);

    if (speechSupported() && "onvoiceschanged" in window.speechSynthesis) {
        window.speechSynthesis.addEventListener("voiceschanged", pickBrowserVoice);
    }

    loadProfiles();

    if (player.name) {

        showProfile();

    } else if (Object.keys(profiles).length > 0) {

        // Someone used "Switch player" last, so ask who is playing now
        showPlayerPicker();
    }
}


if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", startGame);

} else {

    startGame();
}
