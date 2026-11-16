# MusDawc

MusDawc is a private, browser-based audio workshop for listening, shaping and arranging recordings. This project follows the TAPEWORKS_SPEC.md product brief while using MusDawc as the product name throughout. The `.musdawc` project format is reserved for local project portability; project-container import/export is not implemented yet.

## Run locally

Requires Node.js 20.19 or newer and npm.

```sh
npm install
npm run dev
```

The editor imports WAV, MP3, OGG, FLAC and M4A when the browser decoder supports the format, records microphone takes, and supports clip arrangement, split, trim, duplicate, reverse, undo/redo, timeline zoom and fullscreen. Per-take controls include gain, fades, pan, mute and solo. Sessions autosave to local IndexedDB with a recovery prompt. Export renders a 24-bit stereo WAV. The temporary Cassette Case accepts audio by drag and drop, organizes selected tapes into named folders, and downloads each folder as a ZIP. Cassette Case contents live only in memory and clear on reload; ZIP export is limited to 200 MB per folder. All audio stays in the browser.

## Security and privacy

The browser validates file signatures and enforces 200 MB/file, 60 minute, 192 kHz and 8 channel limits before accepting a decoded buffer. Microphone permission is requested only after pressing REC. See [docs/SECURITY.md](docs/SECURITY.md) and [PRIVACY.md](PRIVACY.md) for implementation limits and the threat model.

The project has no backend. No claim can guarantee safety against every threat: browser decoder vulnerabilities, compromised build tools and host compromise remain relevant risks. Use current browsers and review dependency updates before release.

## Status

This is the first usable slice of a multi-milestone DAW, not a complete implementation of every feature in the source brief. Current limitations and decisions are tracked in [docs/DECISIONS.md](docs/DECISIONS.md).
