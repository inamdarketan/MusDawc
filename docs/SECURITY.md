# Security notes

## Current controls

- No application backend, account system, analytics, or third-party runtime requests.
- Audio file magic-byte check before decoding; decoded file size, duration, sample rate and channel count are limited.
- React renders user-provided names as text. Names are length-limited. No `eval` or HTML injection sink is used.
- Microphone access is requested only after the user activates Record, with browser echo cancellation, suppression, and automatic gain disabled by default.
- Production header template includes CSP, framing restrictions, MIME sniff prevention, referrer policy, permissions policy, COOP/COEP/CORP and HSTS.
- Exact dependency versions and npm lifecycle scripts disabled by `.npmrc`.

## Remaining exposure

The browser's audio decoder is a large attack surface and cannot be sandboxed in a worker in this first slice. The editor stores source blobs and snapshots in local IndexedDB, but decoded audio stays in memory and recording is not incrementally persisted during a take. OPFS chunked recovery, ZIP project import, zip-bomb validation, decode timeouts, complete production CSP/Trusted Types validation, CI, and a malformed-file security corpus remain unimplemented. A lockfile is committed and the current npm audit reports no advisories; future dependency updates still need review. Do not deploy this as a hardened production DAW until the remaining controls and the spec's test plan are implemented and reviewed.

No system can be described as safe against every possible threat. Keep browsers and dependencies updated, and report a security issue privately to the repository maintainer before public disclosure.
