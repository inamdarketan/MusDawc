# MusDawc implementation decisions

- The product and visible branding are **MusDawc**, following the user request. Renamed the proposed `.tapeworks` extension to `.musdawc` for future project containers.
- This initial implementation is a first working slice, not a complete DAW. It includes local import/record, playback, drag arrangement, split/trim/duplicate/reverse/remove clip commands, undo/redo, timeline zoom/scroll/fullscreen, three playback effects, four visual theme palettes, a simple Sa/Pa tanpura drone, and stereo WAV export.
- The brief's model-based Sound Search conflicts with its zero-third-party-request privacy requirement and introduces a large model supply-chain surface. No model or remote resource is loaded.
- Browser decode support is intentionally delegated to `decodeAudioData`; format support differs by browser. Unsupported formats fail with a user-facing message.
- The feature list's 32-track limit is used as an import guard, but V1 currently renders all imported takes at timeline position zero; full multi-track arrangement is not implemented.
- Theme palettes are tokens in CSS. Fonts use local system fallbacks to preserve offline behavior; no external font CDN is used.
- The static security header file is a deployment starting point. Strict CSP and Trusted Types must be exercised against the production build before deployment; style attributes currently need `style-src-attr 'unsafe-inline'` because the UI uses React style values for waveform and meter visuals.
- The brief's full acceptance suite, storage backend, project container, undo stack, clip dragging, automation, Mix Doctor, VCS, AI features, and comprehensive responsive editing are future milestones.
