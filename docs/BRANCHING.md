# Branching and release workflow

- `main` is the stable branch. Merge tested feature work here when it is ready for a release.
- Start each feature or release unit from the current `main` using `feature/<short-name>` (for example, `feature/zoom-fullscreen`).
- Keep unrelated work in separate feature branches. Avoid committing user audio, local session archives, secrets, build output, or dependency folders; `.gitignore` excludes these by default.
- Run `npm ci` and `npm run verify` before merging. Review the diff and dependency audit before pushing.
- Tag release commits after merging to `main`; do not develop directly on `main`.

This repository currently uses `main` plus `feature/autosave-editing` for the current editor phase. No remote or deployment is configured in this local checkout.
