// ==========================================
// LIFE QUEST: NATURAL VOICE (optional)
// Loaded after voice-config.js and before game.js (see index.html).
//
// Reads text with an ElevenLabs voice for students who find reading hard.
// It is always optional: the built-in browser voice is the default, and
// game.js falls back to it whenever this can't play.
//
// Safety:
//   • No API key here. The browser only talks to the school's own voice
//     server (see voice-proxy/), which holds the key.
//   • Only game text is sent (questions, answer choices, explanations).
//     game.js never passes names or other personal information.
//   • Every failure (not set up, offline, slow, blocked audio) resolves to
//     `false` so the game can use the built-in voice instead. It never throws.
// ==========================================

"use strict";

const LifeQuestVoice = (function () {

    const TIMEOUT_MS = 8000;          // give up and use the built-in voice after this
    const RETRY_AFTER_MS = 60000;     // after a failure, don't keep making students wait
    const MAX_CHARS = 600;
    const MAX_CACHED = 40;            // clips kept in memory, so "read again" is instant

    const cache = new Map();          // text -> object URL of the audio

    let audio = null;
    let controller = null;
    let requestId = 0;
    let unavailableUntil = 0;

    // Read on every call, so the address can be set without reloading scripts
    function endpoint() {
        const config = typeof window !== "undefined" && window.LIFE_QUEST_VOICE;
        const url = config && typeof config.endpoint === "string" ? config.endpoint.trim() : "";
        return /^https?:\/\//i.test(url) ? url : "";
    }

    function isConfigured() {
        return Boolean(endpoint()) &&
            typeof fetch === "function" &&
            typeof Audio === "function" &&
            typeof URL !== "undefined" && typeof URL.createObjectURL === "function";
    }

    // Set up, and not in a short pause after a failure
    function isAvailable() {
        return isConfigured() && Date.now() >= unavailableUntil;
    }

    function remember(text, url) {
        cache.set(text, url);
        while (cache.size > MAX_CACHED) {
            const oldest = cache.keys().next().value;
            URL.revokeObjectURL(cache.get(oldest));
            cache.delete(oldest);
        }
    }

    function stop() {
        requestId++;
        if (controller) {
            controller.abort();
            controller = null;
        }
        if (audio) {
            audio.pause();
            audio.removeAttribute("src");
            audio = null;
        }
    }

    // Resolves true when the natural voice is playing (or was deliberately
    // stopped), false when the caller should use the built-in voice.
    async function speak(text) {

        stop();

        const clean = String(text || "").replace(/\s+/g, " ").trim().slice(0, MAX_CHARS);

        if (!clean || !isAvailable()) return false;

        const id = requestId;
        let timer = null;

        try {
            let url = cache.get(clean);

            if (!url) {
                controller = new AbortController();
                timer = setTimeout(() => controller && controller.abort(), TIMEOUT_MS);

                const response = await fetch(endpoint(), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: clean }),
                    signal: controller.signal
                });

                if (!response.ok) throw new Error("Voice server answered " + response.status);

                const type = response.headers.get("Content-Type") || "";
                if (!/^audio\//i.test(type)) throw new Error("Voice server did not send audio");

                const blob = await response.blob();
                url = URL.createObjectURL(blob);
                remember(clean, url);
            }

            if (id !== requestId) return true;      // stopped while loading: stay quiet

            audio = new Audio(url);
            await audio.play();

            return true;

        } catch (error) {

            if (id !== requestId) return true;      // stopped on purpose, not a failure

            unavailableUntil = Date.now() + RETRY_AFTER_MS;
            return false;

        } finally {
            if (timer) clearTimeout(timer);
            if (id === requestId) controller = null;
        }
    }

    return {
        isConfigured,
        isAvailable,
        speak,
        stop
    };

})();
