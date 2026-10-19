// Run from the repository root: node videos/data-analysis/01-bazi-prediction/debug/render-check.cjs
const path = require('node:path');
const fs = require('node:fs');
const {bundle} = require('@remotion/bundler');
const {getCompositions, renderStill, openBrowser} = require('@remotion/renderer');
const timeline = require('../timeline.json');
const meta = require('../video.json');

(async () => {
  const root = process.cwd();
  const batch = path.resolve(__dirname, 'screenshots/comparison-v0.7');
  fs.mkdirSync(batch, {recursive: true});
  const serveUrl = await bundle({entryPoint: path.join(root, 'src/index.ts'), outDir: path.join(root, '.cache/bazi-prediction/review-bundle')});
  const browser = await openBrowser('chrome');
  try {
    const compositions = await getCompositions(serveUrl, {puppeteerInstance: browser});
    const composition = compositions.find(c => c.id === meta.id);
    if (!composition || composition.durationInFrames !== meta.durationInFrames) throw new Error('Composition metadata mismatch');
    let end = 0;
    for (const scene of timeline.scenes) {
      if (scene.from !== end) throw new Error(`Timeline gap at ${scene.id}`);
      end += scene.durationInFrames;
    }
    if (end !== meta.durationInFrames) throw new Error('Duration mismatch');
    const frames = timeline.scenes.map(s => ({id: s.id, frame: s.from + 75}));
    for (const index of [10, 11]) {
      const s = timeline.scenes[index];
      for (const offset of [0, 24, 45, 105, 150, s.durationInFrames - 1]) if (offset < s.durationInFrames) frames.push({id: s.id, frame: s.from + offset});
    }
    const manifest = [];
    for (const item of frames) {
      const filename = `${item.id}-f${String(item.frame).padStart(6, '0')}.png`;
      await renderStill({serveUrl, composition, frame: item.frame, output: path.join(batch, filename), imageFormat: 'png', puppeteerInstance: browser, logLevel: 'error'});
      manifest.push({...item, filename, scriptVersion: 'v0.7'});
    }
    // Regression smoke frames stay with their original episodes.
    for (const [id, folder] of [['iching-life-03-build', '02-iching-life'], ['chi-ma-01-hook', '03-chi-ma-chong-yang']]) {
      const dir = path.join(root, 'videos/traditional-culture', folder, 'debug/screenshots/motion-extraction-2026-10-19');
      fs.mkdirSync(dir, {recursive: true});
      await renderStill({serveUrl, composition: compositions.find(c => c.id === id), frame: 90, output: path.join(dir, 'f000090.png'), imageFormat: 'png', puppeteerInstance: browser, logLevel: 'error'});
    }
    fs.writeFileSync(path.join(batch, 'manifest.json'), JSON.stringify({composition: meta.id, node: process.version, frames: manifest, commit: null, note: 'Local working tree; visual review recorded in ANIMATION.md'}, null, 2));
    console.log(`Rendered ${frames.length} episode checks and 2 prior-episode smoke frames. Timeline: ${end} frames.`);
  } finally { await browser.close({silent: true}); }
})().catch(error => { console.error(error); process.exitCode = 1; });
