# Instrument codec runtime

`libflac.min.wasm.js` and `libflac.min.wasm.wasm` are the unmodified ready-to-use `min.wasm` runtime from libflacjs 5.6.0 (libFLAC 1.3.4). [Source](https://github.com/mmig/libflac.js). The bundled notices are in LICENSE, FLAC-LICENSE and OGG-LICENSE.

`worker.js` is application source. It owns one encode/decode request, uses FLAC level 8 for exactly representable signed PCM16 and gzip over shuffled float32 bytes otherwise. It preserves the original sample rate and frame counts. The caller terminates the worker after completion, cancellation or error. All URLs are relative so repository-subfolder hosting works.

KPI2 packets contain a 12-byte envelope: magic, codec byte, three zero reserved bytes and decoded byte length as uint32 little endian. Codec 0 contains the raw header length, gzip header length, gzip header, then length-prefixed mono FLAC streams. Codec 1 contains gzip over byte-shuffled raw instrument data. The sample arrays and parameters still use the version 1 instrument model. Decoded packets are restricted to the signed 32-bit array-length range; this is a format implementation bound, not a complete browser memory budget.
