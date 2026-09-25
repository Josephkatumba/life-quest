// ==========================================
// LIFE QUEST: VOICE SERVER
// A tiny server that lets the game use an ElevenLabs voice without the API
// key ever reaching students' browsers. No packages needed (Node 18+).
//
//   ELEVENLABS_API_KEY=... ALLOWED_ORIGINS=https://your-game-site node voice-proxy/server.js
//
// See voice-proxy/README.md for set-up.
//
// Privacy: it only accepts plain text to read, never stores or logs it, and
// always uses the one Life Quest voice. The game only sends question text.
// ==========================================

"use strict";

const http = require("http");

const VOICE_ID = "Nhs7eitvQWFTQBsf0yiT";
const MAX_CHARS = 600;
const MAX_BODY_BYTES = 8 * 1024;
const RATE_LIMIT = 40;                 // requests per minute, per computer
const MAX_CACHED = 300;                // repeated questions don't cost credits again

// Calm and clear: steady delivery, no dramatic styling
const VOICE_SETTINGS = {
    stability: 0.6,
    similarity_boost: 0.8,
    style: 0.1,
    use_speaker_boost: true
};

function createServer(env = process.env) {

    const apiKey = env.ELEVENLABS_API_KEY || "";
    const model = env.ELEVENLABS_MODEL || "eleven_multilingual_v2";
    const apiBase = (env.ELEVENLABS_API_BASE || "https://api.elevenlabs.io").replace(/\/+$/, "");
    const allowed = String(env.ALLOWED_ORIGINS || "")
        .split(",").map(origin => origin.trim()).filter(Boolean);

    const cache = new Map();           // text -> { type, audio }
    const hits = new Map();            // ip -> timestamps in the last minute

    function corsHeaders(origin) {
        if (!origin) return {};
        if (allowed.length && !allowed.includes(origin)) return null;
        return {
            "Access-Control-Allow-Origin": allowed.length ? origin : "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "600",
            "Vary": "Origin"
        };
    }

    function send(res, status, headers, body) {
        res.writeHead(status, { "X-Content-Type-Options": "nosniff", ...headers });
        res.end(body);
    }

    function sendJSON(res, status, cors, data) {
        send(res, status, { ...cors, "Content-Type": "application/json" }, JSON.stringify(data));
    }

    function tooMany(ip) {
        const now = Date.now();
        const recent = (hits.get(ip) || []).filter(time => now - time < 60000);
        recent.push(now);
        hits.set(ip, recent);
        return recent.length > RATE_LIMIT;
    }

    function readBody(req) {
        return new Promise((resolve, reject) => {
            let size = 0;
            const chunks = [];
            req.on("data", chunk => {
                size += chunk.length;
                if (size > MAX_BODY_BYTES) {
                    reject(Object.assign(new Error("too large"), { status: 413 }));
                    req.destroy();
                    return;
                }
                chunks.push(chunk);
            });
            req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
            req.on("error", reject);
        });
    }

    return http.createServer(async (req, res) => {

        const origin = req.headers.origin || "";
        const cors = corsHeaders(origin);
        const path = (req.url || "").split("?")[0];

        if (cors === null) return sendJSON(res, 403, {}, { error: "This site may not use the voice server." });

        if (req.method === "OPTIONS") return send(res, 204, cors, "");

        if (req.method === "GET" && path === "/health") {
            return sendJSON(res, 200, cors, { ok: true, configured: Boolean(apiKey) });
        }

        if (req.method !== "POST" || path !== "/tts") return sendJSON(res, 404, cors, { error: "Not found" });

        if (!apiKey) return sendJSON(res, 503, cors, { error: "The voice server has no ElevenLabs key set." });

        const ip = req.socket.remoteAddress || "unknown";
        if (tooMany(ip)) return sendJSON(res, 429, cors, { error: "Too many requests. Try again in a minute." });

        let text = "";

        try {
            const body = JSON.parse(await readBody(req));
            text = typeof body.text === "string" ? body.text : "";
        } catch (error) {
            return sendJSON(res, error.status || 400, cors, { error: "Send JSON like {\"text\": \"...\"}." });
        }

        // Plain readable text only
        text = text.replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim();

        if (!text) return sendJSON(res, 400, cors, { error: "Nothing to read." });
        if (text.length > MAX_CHARS) return sendJSON(res, 413, cors, { error: "Text is too long." });

        const cached = cache.get(text);
        if (cached) {
            return send(res, 200, { ...cors, "Content-Type": cached.type, "Cache-Control": "private, max-age=86400" }, cached.audio);
        }

        try {
            const upstream = await fetch(
                apiBase + "/v1/text-to-speech/" + VOICE_ID + "?output_format=mp3_44100_128",
                {
                    method: "POST",
                    headers: {
                        "xi-api-key": apiKey,
                        "Content-Type": "application/json",
                        "Accept": "audio/mpeg"
                    },
                    body: JSON.stringify({ text, model_id: model, voice_settings: VOICE_SETTINGS }),
                    signal: AbortSignal.timeout(15000)
                }
            );

            if (!upstream.ok) {
                // The reason goes to the server log; the text being read does not
                console.error("[voice] ElevenLabs answered " + upstream.status);
                return sendJSON(res, 502, cors, { error: "The voice service is not available right now." });
            }

            const type = upstream.headers.get("content-type") || "audio/mpeg";
            const audio = Buffer.from(await upstream.arrayBuffer());

            cache.set(text, { type, audio });
            while (cache.size > MAX_CACHED) cache.delete(cache.keys().next().value);

            return send(res, 200, { ...cors, "Content-Type": type, "Cache-Control": "private, max-age=86400" }, audio);

        } catch (error) {
            console.error("[voice] Could not reach ElevenLabs: " + error.name);
            return sendJSON(res, 502, cors, { error: "The voice service is not available right now." });
        }
    });
}

module.exports = { createServer, VOICE_ID };

if (require.main === module) {
    const port = Number(process.env.PORT) || 8787;
    if (!process.env.ELEVENLABS_API_KEY) {
        console.warn("[voice] ELEVENLABS_API_KEY is not set: the game will use the built-in voice.");
    }
    if (!process.env.ALLOWED_ORIGINS) {
        console.warn("[voice] ALLOWED_ORIGINS is not set: any website could use this server. Set it to your game's address.");
    }
    createServer().listen(port, () => console.log("[voice] Life Quest voice server on port " + port));
}
