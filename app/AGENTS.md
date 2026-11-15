# Static Runtime Assets Contract

## Purpose

- Contains browser assets required by the application and alphaTab at runtime.

## Ownership

- Original drawn add-bar-before/add-bar-after and repeat-start/repeat-end/alternate-endings SVGs supply Bars palette symbols. Keep their command mapping in toolbar-icons.ts and source record in the drawn icon README.

- `default.rcn` is the replaceable native template for New file. Keep it a valid project, with empty music allowed; a zero-byte file cannot be opened. The application gives each new copy a fresh project identity.
- `font/` contains the Bravura music font and its license files.
- `soundfont/` contains the built-in SONiVOX bank and its license files.
- `licenses/` contains license notices for the additional audio runtime dependencies shown in About and the bundled Framework7 and Qlementine icons.
- `licenses/CAPACITOR_UPDATER_LICENSE.txt` retains the pinned native update engine's MPL-2.0 license, copied unchanged from its installed package. It ships with the shared web assets used by all native wrappers.
- `audio-codec/` contains the compact-instrument Worker, pinned FLAC JS/WASM and their licenses.
- `icons/` contains application icons and favicons. The palette uses SVG only: `icons/toolbar/leland/` contains outlines from the pinned MuseScore Leland font, `icons/toolbar/bravura/` contains outlines from the bundled Bravura font, and `icons/toolbar/drawn/` contains original paths and compositions with Bravura glyphs. Keep source glyph records and licenses beside each set. src/frontend/editor/toolbar-icons.ts owns the explicit command/value mapping. Legacy PNG crops are not used by palette controls; do not infer command semantics from their filenames.
- `manifest.webmanifest` owns the installed PWA name, colors, icon paths, and fullscreen display mode.
- Its file_handlers register `.rcn` as application/x-rachana, Guitar Pro extensions, and `.mid`/`.midi` as audio/midi. Keep the list aligned with src/score-file-options.ts; receipt belongs to the application's launchQueue consumer. Browser support and user approval govern PWA OS integration.
- `service-worker-dev.js` owns development-only preparation and network-first offline fallback.
- `service-worker.js` is the production worker template. The Vite offline-cache plugin inserts all published application files and their content revision after output is written.

## Local Contracts

- icons/icon-512.png is also the canonical mark for native app icons. Native build scripts derive required sizes and containers; keep their generated files in ignored build/platform directories and retain this runtime source asset in Git.

- Keep the license and README files together with each distributed asset.
- Do not copy user banks from `../banks/` into this folder without a separate distribution-license check.
- Do not edit binary font or sound bank files by hand.
- `service-worker-dev.js` caches the transformed development module graph, native worker/worklet entries and public runtime files listed by the Vite offline-manifest endpoint. Prepare this cache before development editor startup on secure origins. Prefer fresh network responses online and cached responses after network failure; retain HMR requests and timestamped module URLs. Do not remove offline caches at development startup. Preparation failure permits online startup without claiming offline readiness. Log startup stages and use the independent translated startup-error screen if the application import fails.
- Keep the PWA theme and launch background black so iOS uses black outside the application viewport.
- Precache the complete production output, including lazy JavaScript, render and audio workers, fonts, built-in sounds, icons, and local license notices. Exclude the worker itself, source maps, and AGENTS.md from the file list. Installation must finish caching before activation.
- Serve the cached shell and resources from the same content revision. Automatic updates wait until all application windows close; never force activation or reload an open editor automatically. The explicit RACHANA_FORCE_UPDATE message may activate a fully prepared waiting worker after the application has preserved its current project. Delete only older caches for the same application scope. A cache:reload request fetches the network response, refreshes its own cached entry on success and propagates network failure instead of serving a stale response.
- An installed development worker waiting behind an active worker has completed preparation. Log that activation is pending instead of reporting a preparation failure or claiming the new version is active.
- Keep manifest URLs relative and use the configured Vite base for HTML and runtime asset URLs so root and repository-folder hosting both work.

## Work Guidance

- Update alphaTab assets through its package workflow. Update codec assets from the pinned upstream package with their licenses and source reference.

## Verification

- Run the application build when the user asks to verify that all runtime assets are available.

## Child DOX Index

- `audio-codec/AGENTS.md` - Compact instrument encoding/decoding and bundled codec assets.
