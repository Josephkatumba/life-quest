# Life Quest voice server (optional)

Life Quest can read questions aloud with a natural ElevenLabs voice
(voice ID `Nhs7eitvQWFTQBsf0yiT`) for students who find reading difficult.
Without this server the game uses the browser's built-in voice, so nothing
here is required.

The server exists so the **ElevenLabs API key stays private**. Students'
browsers only ever talk to this server; the key never appears in the game.

## What it sends to ElevenLabs

Only the text being read: questions, answer choices and explanations.
The game never sends player names, team names or any other personal
information, and this server does not store or log the text.

## Run it

Needs Node.js 18 or newer. No packages to install.

```bash
ELEVENLABS_API_KEY=your-key ALLOWED_ORIGINS=https://your-game-site.example node voice-proxy/server.js
```

| Setting | What it does |
|---|---|
| `ELEVENLABS_API_KEY` | Your ElevenLabs key (required for the natural voice). Keep it out of Git. |
| `ALLOWED_ORIGINS` | Comma-separated addresses of the sites that may use the server, e.g. `https://school.github.io`. Set this so other websites can't spend your credits. |
| `PORT` | Port to listen on (default `8787`). |
| `ELEVENLABS_MODEL` | ElevenLabs model (default `eleven_multilingual_v2`). |

Host it anywhere that runs Node (a school server, Render, Railway, Fly.io…)
and serve it over HTTPS.

Check it: `GET /health` returns `{"ok": true, "configured": true}` when the key is set.

## Connect the game

Put the server's address in `voice-config.js`:

```js
window.LIFE_QUEST_VOICE = {
    endpoint: "https://voice.your-school.example/tts"
};
```

Then in the game: ⚙️ Settings → Reading voice → **Natural voice**.

If the server is down, slow (over 8 seconds) or out of credits, the game
switches to the built-in voice by itself and tells the student once.

## Limits

- Up to 600 characters per request.
- 40 requests per minute per computer.
- Recently read text is cached in memory, so repeated questions don't use credits again.
