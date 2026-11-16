# MusDawc

MusDawc is a private, browser-based audio workshop for listening, shaping and arranging recordings. This project follows the TAPEWORKS_SPEC.md product brief while using MusDawc as the product name throughout. The `.musdawc` project format is reserved for local project portability; project-container import/export is not implemented yet.

## Run locally

Requires Node.js 20.19 or newer and npm.

```sh
npm install
npm run dev
```

The current editor can import WAV, MP3, OGG, FLAC and M4A when the browser decoder supports the format, record a microphone take, play and edit clips (drag to arrange, split, trim, duplicate, reverse, remove), undo/redo edits, zoom and scroll the timeline, and open the timeline in fullscreen. Per-take controls include gain, fades, pan, mute and solo. Sessions autosave to local IndexedDB, with a recovery prompt on the next visit. The listening rack previews warmth, echo, air and compression; it also includes a selectable Sa/Pa tanpura drone. Export renders a 24-bit stereo WAV with clip fades, gain, pan, mute/solo and the listening rack. All audio stays in the browser. No account, analytics, or audio upload is used.

## Security and privacy

The browser validates file signatures and enforces 200 MB/file, 60 minute, 192 kHz and 8 channel limits before accepting a decoded buffer. Microphone permission is requested only after pressing REC. See [docs/SECURITY.md](docs/SECURITY.md) and [PRIVACY.md](PRIVACY.md) for implementation limits and the threat model.

The project has no backend. No claim can guarantee safety against every threat: browser decoder vulnerabilities, compromised build tools and host compromise remain relevant risks. Use current browsers and review dependency updates before release.

## Status

This is the first usable slice of a multi-milestone DAW, not a complete implementation of every feature in the source brief. Current limitations and decisions are tracked in [docs/DECISIONS.md](docs/DECISIONS.md).
