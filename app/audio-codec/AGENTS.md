# Instrument Codec Runtime

## Purpose

- Stores the self-contained classic Worker and pinned FLAC runtime used for compact saved instruments.

## Ownership

- `worker.js` owns KPI2 encoding/decoding, bounded expansion, FLAC block conversion and exact float32 fallback.
- `libflac.min.wasm.js` and `libflac.min.wasm.wasm` are unmodified libflacjs 5.6.0 assets. Keep upstream license files and README with them.
- `src/infrastructure/audio/instrument-codec.ts` owns each Worker lifetime and cancellation; this directory does not own playback or sound assignments.

## Local Contracts

- Keep codec URLs relative to this Worker for root and repository-subfolder hosting.
- FLAC level 8 is used only when every sample is exactly representable as signed PCM16. Preserve all other finite float32 values with byte grouping plus gzip, including negative zero.
- Validate sizes, stream framing, frequency, depth, frame count, CRC/MD5 and final expansion before returning data. Never resample or change SF2 parameters.
- KPI2 is the working packet envelope; keep PROJECT_JSON_FORMAT.md aligned. The signed 32-bit decoded-length bound is not a complete physical-memory budget.

## Verification

- Instrument storage tests execute this Worker source and bundled FLAC under a VM Worker fixture. Browser validation must use these shipped assets, not diagnostic codec copies.

## Child DOX Index

- No child contracts.
