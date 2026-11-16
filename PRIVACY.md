# MusDawc privacy

MusDawc has no accounts, analytics, cookies, or server-side audio processing. Imported and recorded audio is decoded and previewed in the current browser tab. The microphone is requested only when the user starts recording. The app does not upload audio.

MusDawc stores imported/recorded source audio and the current edit snapshot in this browser’s IndexedDB for autosave and crash recovery. Use the in-app discard option to remove a saved session and its unreferenced audio. Audio held in the temporary Cassette Case is kept in memory only, is not included in autosave, and clears when the tab is reloaded or closed. Folder ZIPs are generated locally when requested. A selected visual theme is stored in localStorage. Browser storage and microphone permissions remain under browser control.

This policy describes the current client code. Hosting providers may keep ordinary web request logs; configure the hosting account and domain accordingly before publishing.
