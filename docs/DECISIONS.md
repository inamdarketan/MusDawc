# MusDawc implementation decisions

- The product and visible branding are **MusDawc**, following the user request. Renamed the proposed `.tapeworks` extension to `.musdawc` for future project containers.
- The current implementation is an evolving local audio editor. It includes local import/record, playback, clip editing, undo/redo, timeline zoom/scroll/fullscreen, per-clip controls, IndexedDB autosave and recovery, and stereo WAV rendering. Riyaz has been replaced with the temporary Cassette Case: drop audio files, select tapes into named folders, then export a folder as ZIP. Shelf contents are memory-only and are cleared on reload; there is no ZIP import.
- The brief's model-based Sound Search conflicts with its zero-third-party-request privacy requirement and introduces a large model supply-chain surface. No model or remote resource is loaded.
- Browser decode support is intentionally delegated to `decodeAudioData`; format support differs by browser. Unsupported formats fail with a user-facing message.
- The Cassette Case accepts at most 500 tapes and 2 GB total; ZIP export is capped at 200 MB per folder. ZIP paths are generated from sanitized names, and the app does not parse uploaded archives.
- The feature list's 32-track limit is used as an import guard, but V1 currently renders all imported takes at timeline position zero; full multi-track arrangement is not implemented.
- Theme palettes are tokens in CSS. Fonts use local system fallbacks to preserve offline behavior; no external font CDN is used.
- The static security header file is a deployment starting point. Strict CSP and Trusted Types must be exercised against the production build before deployment; style attributes currently need `style-src-attr 'unsafe-inline'` because the UI uses React style values for waveform and meter visuals.
- The brief's full acceptance suite, `.musdawc` project container, OPFS chunked recording/recovery, automation lanes, advanced effect rack, Mix Doctor, VCS, AI features, and comprehensive responsive editing are future milestones.
