const invalid = () => { throw new Error("Cannot read the saved instrument. Restore a complete project copy or import and apply the sound again."); };
const check = value => { if (!value) invalid(); };
let codecPromise;
function codec() {
  return codecPromise ??= new Promise(resolve => {
    self.FLAC_SCRIPT_LOCATION = new URL("./", self.location.href).href;
    importScripts("libflac.min.wasm.js");
    if (self.Flac.isReady()) resolve(self.Flac); else self.Flac.on("ready", () => resolve(self.Flac));
  });
}
async function compress(bytes) { return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream("gzip"))).arrayBuffer()); }
async function expand(bytes, length) {
  check(Number.isSafeInteger(length) && length >= 4 && length <= 0x7fffffff);
  const reader = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip")).getReader();
  try {
    const result = new Uint8Array(length);
    let written = 0;
    while (true) { const part = await reader.read(); if (part.done) break; check(part.value.length <= length - written); result.set(part.value, written); written += part.value.length; }
    check(written === length);
    return result;
  } finally { await reader.cancel(); }
}
function headerOf(raw) {
  check(raw.length >= 4);
  const headerEnd = 4 + new DataView(raw.buffer, raw.byteOffset, raw.byteLength).getUint32(0, true);
  check(headerEnd <= raw.length);
  const data = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(raw.subarray(4, headerEnd)));
  check(data.version === 1 && Array.isArray(data.resources) && data.resources.length > 0);
  const samples = data.resources.flatMap(resource => { check(Array.isArray(resource.samples)); return resource.samples; });
  let frames = 0;
  for (const sample of samples) { check(Number.isSafeInteger(sample.pcm?.frames) && sample.pcm.frames >= 0); frames += sample.pcm.frames; check(Number.isSafeInteger(frames)); }
  return { headerEnd, samples, frames };
}
function reorder(raw, reverse) {
  const { headerEnd } = headerOf(raw);
  const frames = (raw.length - headerEnd) / 4;
  check(Number.isSafeInteger(frames));
  const result = raw.slice();
  for (let plane = 0; plane < 4; plane++) for (let idx = 0; idx < frames; idx++) {
    const packed = headerEnd + plane * frames + idx;
    const interleaved = headerEnd + idx * 4 + plane;
    result[reverse ? interleaved : packed] = raw[reverse ? packed : interleaved];
  }
  return result;
}
function envelope(mode, length, body) {
  const result = new Uint8Array(12 + body.length);
  result.set([75, 80, 73, 50, mode, 0, 0, 0]);
  new DataView(result.buffer).setUint32(8, length, true);
  result.set(body, 12);
  return result;
}
async function encode(raw) {
  const { headerEnd, samples, frames } = headerOf(raw);
  check(raw.length <= 0x7fffffff && headerEnd + frames * 4 === raw.length);
  const view = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);
  let compatible = true;
  for (let offset = headerEnd; offset < raw.length; offset += 4) {
    const frame = view.getFloat32(offset, true);
    check(Number.isFinite(frame));
    const integer = frame * 32768;
    if (!Number.isInteger(integer) || integer < -32768 || integer > 32767 || !Object.is((integer === 0 ? 0 : integer) / 32768, frame)) compatible = false;
  }
  if (!compatible) return envelope(1, raw.length, await compress(reorder(raw, false)));
  const flac = await codec();
  const streams = [];
  let offset = headerEnd;
  for (const sample of samples) {
    const integers = new Int32Array(sample.pcm.frames);
    for (let idx = 0; idx < integers.length; idx++) { integers[idx] = view.getFloat32(offset, true) * 32768; offset += 4; }
    const encoder = flac.create_libflac_encoder(sample.rate, 1, 16, 8, integers.length, true);
    check(encoder !== 0);
    const chunks = [];
    let metadata;
    try {
      check(flac.init_encoder_stream(encoder, chunk => chunks.push(chunk.slice()), data => { metadata = data; }) === 0);
      check(flac.FLAC__stream_encoder_process_interleaved(encoder, integers, integers.length));
      check(flac.FLAC__stream_encoder_finish(encoder));
      check(metadata?.md5sum?.length === 32);
      const stream = new Uint8Array(chunks.reduce((total, chunk) => total + chunk.length, 0));
      let written = 0;
      for (const chunk of chunks) { stream.set(chunk, written); written += chunk.length; }
      check(stream.length >= 42);
      for (let idx = 0; idx < 16; idx++) stream[26 + idx] = parseInt(metadata.md5sum.slice(idx * 2, idx * 2 + 2), 16);
      streams.push(stream);
    } finally { flac.FLAC__stream_encoder_delete(encoder); }
  }
  const header = await compress(raw.subarray(0, headerEnd));
  const body = new Uint8Array(8 + header.length + streams.reduce((total, stream) => total + 4 + stream.length, 0));
  const bodyView = new DataView(body.buffer);
  bodyView.setUint32(0, headerEnd, true); bodyView.setUint32(4, header.length, true); body.set(header, 8);
  offset = 8 + header.length;
  for (const stream of streams) { bodyView.setUint32(offset, stream.length, true); body.set(stream, offset + 4); offset += 4 + stream.length; }
  return envelope(0, raw.length, body);
}
async function decode(bytes) {
  check(bytes.length >= 12 && bytes[0] === 75 && bytes[1] === 80 && bytes[2] === 73 && bytes[3] === 50 && bytes[4] <= 1 && bytes[5] === 0 && bytes[6] === 0 && bytes[7] === 0);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const length = view.getUint32(8, true);
  check(length >= 4 && length <= 0x7fffffff);
  if (bytes[4] === 1) { const result = reorder(await expand(bytes.subarray(12), length), true); const header = headerOf(result); check(header.headerEnd + header.frames * 4 === length); return result; }
  check(bytes.length >= 20);
  const headerLength = view.getUint32(12, true);
  const compressedLength = view.getUint32(16, true);
  check(headerLength <= length && 20 + compressedLength <= bytes.length);
  const header = await expand(bytes.subarray(20, 20 + compressedLength), headerLength);
  const { headerEnd, samples, frames } = headerOf(header);
  check(headerEnd === header.length && headerEnd + frames * 4 === length);
  let offset = 20 + compressedLength;
  const streams = samples.map(() => { check(offset + 4 <= bytes.length); const size = view.getUint32(offset, true); const start = offset + 4; check(size >= 42 && start + size <= bytes.length); offset = start + size; return bytes.subarray(start, offset); });
  check(offset === bytes.length);
  const result = new Uint8Array(length);
  const resultView = new DataView(result.buffer);
  result.set(header);
  let outputOffset = headerEnd;
  const flac = await codec();
  for (let idx = 0; idx < samples.length; idx++) {
    const sample = samples[idx];
    const stream = streams[idx];
    const decoder = flac.create_libflac_decoder(true);
    check(decoder !== 0);
    let readOffset = 0;
    let written = 0;
    let valid = true;
    let metadataSeen = false;
    try {
      check(flac.init_decoder_stream(decoder, count => { const size = Math.min(count, stream.length - readOffset); const buffer = stream.subarray(readOffset, readOffset + size); readOffset += size; return { buffer, readDataLength: size, error: false }; }, (channels, frame) => {
        if (!valid || !metadataSeen || frame.channels !== 1 || frame.bitsPerSample !== 16 || frame.sampleRate !== sample.rate || channels.length !== 1 || channels[0].length !== frame.blocksize * 2 || written + frame.blocksize > sample.pcm.frames) { valid = false; return false; }
        const pcm = channels[0]; const pcmView = new DataView(pcm.buffer, pcm.byteOffset, pcm.byteLength);
        for (let frameIdx = 0; frameIdx < frame.blocksize; frameIdx++) { resultView.setFloat32(outputOffset, pcmView.getInt16(frameIdx * 2, true) / 32768, true); outputOffset += 4; }
        written += frame.blocksize;
        return true;
      }, () => { valid = false; }, metadata => { metadataSeen = true; valid &&= metadata.sampleRate === sample.rate && metadata.channels === 1 && metadata.bitsPerSample === 16 && metadata.total_samples === sample.pcm.frames; }) === 0);
      const processed = flac.FLAC__stream_decoder_process_until_end_of_stream(decoder);
      const finished = flac.FLAC__stream_decoder_finish(decoder);
      check(processed && finished && valid && metadataSeen && written === sample.pcm.frames);
    } finally { flac.FLAC__stream_decoder_delete(decoder); }
  }
  check(outputOffset === length);
  return result;
}
self.onmessage = async ({ data }) => {
  try { const bytes = await (data.kind === "encode" ? encode(new Uint8Array(data.buffer)) : decode(new Uint8Array(data.buffer))); self.postMessage({ buffer: bytes.buffer }, [bytes.buffer]); }
  catch { self.postMessage({ error: "Cannot read the saved instrument. Restore a complete project copy or import and apply the sound again." }); }
};
