// Diagnostic full-motion preview, kept in the regenerable episode cache.
const path = require('node:path');
const {bundle} = require('@remotion/bundler');
const {selectComposition, renderMedia} = require('@remotion/renderer');
const meta = require('../video.json');
(async () => {
  const cache = path.resolve('.cache/bazi-prediction');
  const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), outDir: path.join(cache, 'motion-bundle')});
  const composition = await selectComposition({serveUrl, id: meta.id});
  let last = -1;
  await renderMedia({serveUrl, composition, codec: 'h264', scale: 0.5, crf: 23,
    outputLocation: path.join(cache, 'bazi-v0.7-preview.mp4'), concurrency: 3,
    onProgress: ({progress}) => {const step = Math.floor(progress * 10); if (step !== last) {last = step; console.log(`${step * 10}%`);}},
  });
  console.log('Motion preview complete: .cache/bazi-prediction/bazi-v0.7-preview.mp4');
})().catch(e => {console.error(e); process.exitCode = 1;});
