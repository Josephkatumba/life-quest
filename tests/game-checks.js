// ==========================================
// LIFE QUEST: XP, VOICE AND VOICE-SERVER TESTS
// Run from the project folder:   node tests/game-checks.js
// No ElevenLabs key needed: the voice server is tested against a stand-in.
// ==========================================

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const http = require("http");

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

function load(files, globals) {
    const context = vm.createContext(globals);
    files.forEach(file => {
        vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
    });
    return context;
}


(async function () {

    // ------------------------------------------------------------
    console.log("\n1. XP progression");
    {
        const noop = () => {};
        const voiceList = [];
        const windowStub = {
            addEventListener: noop,
            matchMedia: () => ({ matches: false }),
            speechSynthesis: { getVoices: () => voiceList, speak: noop, cancel: noop },
            SpeechSynthesisUtterance: function () {}
        };
        const game = load(
            ["questions.js", "starter-questions.js", "engine.js", "timer.js", "voice-config.js", "voice.js", "game.js"],
            {
                console: { ...console, warn: noop },
                window: windowStub,
                document: { readyState: "loading", addEventListener: noop, getElementById: () => null },
                performance, setTimeout, clearTimeout, setInterval, clearInterval, URL
            }
        );
        const g = expr => vm.runInContext(expr, game);

        const rows = g("BOARD_ROW_DIFFICULTY");
        const xp = (d, mode) => g(`getQuestionXP({ difficulty: "${d}" }, "${mode}")`);
        const clear = g("BOARD_CLEAR_XP");
        const perfect = g("BOARD_PERFECT_XP");
        const perfect6 = 6 * rows.reduce((sum, d) => sum + xp(d, "board"), 0) + clear + perfect;
        const level = n => g(`getLevel(${n})`);

        check("harder questions give more XP (20 / 30 / 40)",
            [xp("easy", "board"), xp("medium", "board"), xp("hard", "board")].join() === "20,30,40");
        check("Final Challenge gives more XP (60 / 90 / 120)",
            xp("hard", "final") === 3 * xp("hard", "board") && xp("easy", "final") > xp("hard", "board"));
        check("a perfect 6-topic board is worth " + perfect6 + " XP (was about 9,000)", perfect6 < 1000, perfect6);
        check("after one perfect board a new player is Level " + level(perfect6) + ", not Level 10",
            level(perfect6) <= 2, level(perfect6));
        check("Level 10 takes at least 10 perfect boards",
            Math.ceil(g("LEVEL_XP[9]") / perfect6) >= 10, Math.ceil(g("LEVEL_XP[9]") / perfect6));
        check("the 200–1,000 point scale gives the same XP (points and XP are separate)",
            !g("String(getQuestionXP)").includes("value"));
        check("practice XP is smaller (missed questions are repeated on purpose)",
            xp("hard", "practice") < xp("easy", "board") + 1);

        const old = g(`normalizePlayer({ name: "Old Board Player", xp: 42350, missed: ["world-yv76y6", "gone-123"] })`);
        check("old save with high XP loads safely (keeps XP, Level " + old.level + ")", old.xp === 42350 && old.level === 10);
        check("old save gets a history and drops removed questions", old.history.v === 1 && old.missed.join() === "world-yv76y6");
        const junk = g(`normalizePlayer({ name: "X", xp: "lots", history: 7, missed: "nope" })`);
        check("damaged save loads with safe values", junk.xp === 0 && junk.missed.length === 0 && junk.history.v === 1);

        console.log("\n1b. Choosing the built-in voice (no voice name is required)");
        const pick = voices => {
            voiceList.length = 0;
            voices.forEach(([name, lang, isDefault]) => voiceList.push({ name, lang, default: Boolean(isDefault) }));
            const v = g("skippedVoices = new Set(); browserVoice = null; pickBrowserVoice()");
            return v ? v.name : null;
        };
        check("Edge on Windows: natural female US voice",
            pick([["Microsoft David - English (United States)", "en-US", 1], ["Microsoft Zira - English (United States)", "en-US"],
                  ["Microsoft Guy Online (Natural) - English (United States)", "en-US"], ["Microsoft Aria Online (Natural) - English (United States)", "en-US"],
                  ["Microsoft Sonia Online (Natural) - English (United Kingdom)", "en-GB"], ["Microsoft Denise Online (Natural) - French (France)", "fr-FR"]])
            === "Microsoft Aria Online (Natural) - English (United States)");
        check("Chrome on Windows: Google US English (female) over local voices",
            pick([["Microsoft David - English (United States)", "en-US", 1], ["Microsoft Mark - English (United States)", "en-US"],
                  ["Microsoft Zira - English (United States)", "en-US"], ["Google US English", "en-US"], ["Google UK English Male", "en-GB"]])
            === "Google US English");
        check("Windows without online voices: Zira (female) over David and Mark",
            pick([["Microsoft David - English (United States)", "en-US", 1], ["Microsoft Mark - English (United States)", "en-US"],
                  ["Microsoft Zira - English (United States)", "en-US"]]) === "Microsoft Zira - English (United States)");
        check("Mac / iPad: Samantha",
            pick([["Alex", "en-US", 1], ["Daniel", "en-GB"], ["Samantha", "en-US"], ["Thomas", "fr-FR"]]) === "Samantha");
        check("no US voice: best English female voice (Hazel, UK)",
            pick([["Microsoft George - English (United Kingdom)", "en-GB", 1], ["Microsoft Hazel - English (United Kingdom)", "en-GB"]])
            === "Microsoft Hazel - English (United Kingdom)");
        check("only male English voices: still reads (David)",
            pick([["Microsoft David - English (United States)", "en-US", 1], ["Microsoft Pablo - Spanish (Spain)", "es-ES"]])
            === "Microsoft David - English (United States)");
        check("no English voice at all: browser default, no crash",
            pick([["Microsoft Pablo - Spanish (Spain)", "es-ES", 1]]) === null);
        check("a voice that failed (offline online voice) is skipped next time",
            (() => { pick([["Microsoft Aria Online (Natural) - English (United States)", "en-US"], ["Microsoft Zira - English (United States)", "en-US"]]);
                     g('skippedVoices.add("Microsoft Aria Online (Natural) - English (United States)"); browserVoice = null');
                     return g("pickBrowserVoice().name") === "Microsoft Zira - English (United States)"; })());
        const sample = "Social Skills, for 300 points. What is assertive communication? Choice 1: Clearly stating needs while respecting others. Choice 2: Getting your way by force.";
        check("reading in pieces keeps every word exactly",
            g("speechChunks(" + JSON.stringify(sample) + ")").join(" ") === sample,
            g("speechChunks(" + JSON.stringify(sample) + ")").join(" | "));
        check("long text is read in short pieces (no cut-off)",
            g('speechChunks("First sentence here. " + "Second sentence is a bit longer than the first one. ".repeat(6) + "Last?")').every(c => c.length <= 200));
    }


    // ------------------------------------------------------------
    console.log("\n2. Natural voice in the browser (voice.js)");
    {
        const played = [];
        const fetched = [];
        let fetchImpl = null;

        class FakeAudio {
            constructor(src) { this.src = src; }
            play() { played.push(this.src); return FakeAudio.fail ? Promise.reject(new Error("blocked")) : Promise.resolve(); }
            pause() {}
            removeAttribute() {}
        }

        const windowStub = {};
        const voice = load(["voice.js"], {
            window: windowStub,
            fetch: (url, options) => { fetched.push({ url, options }); return fetchImpl(url, options); },
            Audio: FakeAudio, AbortController, URL, Blob, setTimeout, clearTimeout, Date, console
        });
        const V = vm.runInContext("LifeQuestVoice", voice);

        const audioResponse = () => new Response(new Blob([new Uint8Array([1, 2, 3])]), { headers: { "Content-Type": "audio/mpeg" } });

        check("not set up: reports not configured", !V.isConfigured());
        check("not set up: speak() says 'use the built-in voice' without calling anything",
            (await V.speak("Hello")) === false && fetched.length === 0);

        windowStub.LIFE_QUEST_VOICE = { endpoint: "javascript:alert(1)" };
        check("only http(s) addresses are accepted", !V.isConfigured());

        windowStub.LIFE_QUEST_VOICE = { endpoint: "https://voice.example/tts" };
        fetchImpl = async () => audioResponse();
        check("set up: plays the natural voice", (await V.speak("What is 12 × 5? Choice 1: 60.")) === true && played.length === 1);
        const body = JSON.parse(fetched[0].options.body);
        check("sends only the text to read (no key, no names)", Object.keys(body).join() === "text" && !JSON.stringify(fetched[0]).match(/key|xi-api/i));
        check("same text again plays from memory (no second request)",
            (await V.speak("What is 12 × 5? Choice 1: 60.")) === true && fetched.length === 1 && played.length === 2);

        let release;
        fetchImpl = (url, options) => new Promise((resolve, reject) => {
            release = () => resolve(audioResponse());
            options.signal.addEventListener("abort", () => reject(Object.assign(new Error("aborted"), { name: "AbortError" })));
        });
        const pending = V.speak("A new question");
        V.stop();
        check("stopping while loading stays quiet (no built-in fallback)", (await pending) === true);

        FakeAudio.fail = true;
        fetchImpl = async () => audioResponse();
        check("audio blocked by the browser: fall back", (await V.speak("Blocked audio")) === false);
        FakeAudio.fail = false;
        check("after a failure, waits a minute before trying the natural voice again", !V.isAvailable());

        const V2 = vm.runInContext("LifeQuestVoice", load(["voice.js"], {
            window: { LIFE_QUEST_VOICE: { endpoint: "https://voice.example/tts" } },
            fetch: async () => new Response("{}", { status: 500, headers: { "Content-Type": "application/json" } }),
            Audio: FakeAudio, AbortController, URL, Blob, setTimeout, clearTimeout, Date, console
        }));
        check("server error: fall back, never throw", (await V2.speak("Hello")) === false);

        const V3 = vm.runInContext("LifeQuestVoice", load(["voice.js"], {
            window: { LIFE_QUEST_VOICE: { endpoint: "https://voice.example/tts" } },
            fetch: async () => new Response("<html>", { headers: { "Content-Type": "text/html" } }),
            Audio: FakeAudio, AbortController, URL, Blob, setTimeout, clearTimeout, Date, console
        }));
        check("answer that isn't audio: fall back", (await V3.speak("Hello")) === false);

        const V4 = vm.runInContext("LifeQuestVoice", load(["voice.js"], {
            window: { LIFE_QUEST_VOICE: { endpoint: "https://voice.example/tts" } },
            fetch: async () => { throw new TypeError("Failed to fetch"); },
            Audio: FakeAudio, AbortController, URL, Blob, setTimeout, clearTimeout, Date, console
        }));
        check("offline: fall back, never throw", (await V4.speak("Hello")) === false);
    }


    // ------------------------------------------------------------
    console.log("\n3. Voice server (voice-proxy/server.js) against a stand-in for ElevenLabs");
    {
        const { createServer, VOICE_ID } = require(path.join(root, "voice-proxy", "server.js"));
        const upstreamCalls = [];
        let upstreamStatus = 200;

        const fakeElevenLabs = http.createServer((req, res) => {
            let body = "";
            req.on("data", chunk => { body += chunk; });
            req.on("end", () => {
                upstreamCalls.push({ url: req.url, key: req.headers["xi-api-key"], body: JSON.parse(body || "{}") });
                if (upstreamStatus !== 200) {
                    res.writeHead(upstreamStatus, { "Content-Type": "application/json" });
                    return res.end('{"detail":"quota exceeded"}');
                }
                res.writeHead(200, { "Content-Type": "audio/mpeg" });
                res.end(Buffer.from([73, 68, 51]));
            });
        });
        await new Promise(resolve => fakeElevenLabs.listen(0, resolve));
        const upstreamBase = "http://127.0.0.1:" + fakeElevenLabs.address().port;

        const start = async env => {
            const server = createServer(env);
            await new Promise(resolve => server.listen(0, resolve));
            return { server, base: "http://127.0.0.1:" + server.address().port };
        };

        const origin = "https://game.example";
        const { server, base } = await start({
            ELEVENLABS_API_KEY: "sk-test-secret", ELEVENLABS_API_BASE: upstreamBase, ALLOWED_ORIGINS: origin
        });
        const post = (text, headers = {}) => fetch(base + "/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json", Origin: origin, ...headers },
            body: typeof text === "string" && text.startsWith("{") ? text : JSON.stringify({ text })
        });

        const health = await (await fetch(base + "/health")).json();
        check("/health says the key is set (without showing it)", health.configured === true && !JSON.stringify(health).includes("sk-"));

        const ok = await post("Which planet is closest to the Sun?");
        const audio = Buffer.from(await ok.arrayBuffer());
        check("returns audio", ok.status === 200 && ok.headers.get("content-type") === "audio/mpeg" && audio.length === 3);
        check("uses the Life Quest voice " + VOICE_ID, upstreamCalls[0].url.startsWith("/v1/text-to-speech/Nhs7eitvQWFTQBsf0yiT"));
        check("the key goes only to ElevenLabs, never back to the browser",
            upstreamCalls[0].key === "sk-test-secret" && ![...ok.headers.values()].join().includes("sk-"));
        check("sends calm voice settings and the text only",
            upstreamCalls[0].body.text === "Which planet is closest to the Sun?" && upstreamCalls[0].body.voice_settings.stability >= 0.5);
        check("allowed site gets CORS permission", ok.headers.get("access-control-allow-origin") === origin);

        await post("Which planet is closest to the Sun?");
        check("repeated text is served from memory (no extra ElevenLabs cost)", upstreamCalls.length === 1);

        const other = await post("Hello", { Origin: "https://evil.example" });
        check("other websites are refused", other.status === 403 && upstreamCalls.length === 1);

        const preflight = await fetch(base + "/tts", { method: "OPTIONS", headers: { Origin: origin } });
        check("browser pre-check (OPTIONS) is answered", preflight.status === 204);

        check("empty text is refused", (await post("   ")).status === 400);
        check("very long text is refused", (await post("a".repeat(700))).status === 413);
        check("broken request is refused", (await post("{not json")).status === 400);

        await post("Read <b>this</b>\u0000 please");
        check("markup and control characters are stripped", upstreamCalls[upstreamCalls.length - 1].body.text === "Read b this /b please");

        upstreamStatus = 401;
        const failing = await post("A different question");
        const failBody = await failing.text();
        check("ElevenLabs problem: clear 502, no details leaked", failing.status === 502 && !failBody.includes("quota") && !failBody.includes("sk-"));
        upstreamStatus = 200;

        const { server: noKey, base: noKeyBase } = await start({ ELEVENLABS_API_BASE: upstreamBase });
        const noKeyRes = await fetch(noKeyBase + "/tts", { method: "POST", body: JSON.stringify({ text: "Hi" }) });
        check("no key set: 503 (the game then uses the built-in voice)", noKeyRes.status === 503);

        let limited = 0;
        for (let i = 0; i < 45; i++) {
            const r = await post("Rate test " + i);
            if (r.status === 429) limited++;
        }
        check("too many requests from one computer are slowed down", limited > 0, limited);

        server.close(); noKey.close(); fakeElevenLabs.close();
    }


    // ------------------------------------------------------------
    console.log("\n4. No secrets in the game files");
    {
        const files = ["index.html", "questions.js", "engine.js", "timer.js", "voice-config.js", "voice.js", "game.js", "style.css"];
        const leaks = files.filter(file => /sk_[a-z0-9]{20,}|xi-api-key|ELEVENLABS_API_KEY/i.test(fs.readFileSync(path.join(root, file), "utf8")));
        check("no API key or key header in any file the browser loads", leaks.length === 0, leaks.join(", "));
        const config = fs.readFileSync(path.join(root, "voice-config.js"), "utf8");
        check("voice-config.js ships empty (natural voice off until a school sets it up)", /endpoint:\s*""/.test(config));
    }

    console.log("\n" + passed + " passed, " + failed + " failed\n");
    process.exitCode = failed ? 1 : 0;
})();
