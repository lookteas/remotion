import {bundle} from '@remotion/bundler';
import {openBrowser, selectComposition, renderStill} from '@remotion/renderer';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const out = path.join(here, 'debug/screenshots/latest');
await mkdir(out, {recursive: true});
const timeline = JSON.parse(await readFile(path.join(here, 'timeline.json'), 'utf8'));
const serveUrl = await bundle({entryPoint: path.join(root, 'src/index.ts'), outDir: path.join(root, '.cache/chi-ma-chong-yang/review-bundle')});
const browser = await openBrowser('chrome');
try {
  const composition = await selectComposition({serveUrl, id: 'traditional-culture-chi-ma-chong-yang', puppeteerInstance: browser});
  const selected = [];
  for (const [i, scene] of timeline.scenes.entries()) {
    const locals = [0.18, 0.55, 1].map(ratio => ratio === 1 ? scene.durationInFrames - 24 : Math.round(scene.durationInFrames * ratio));
    for (const [j, local] of locals.entries()) {
      selected.push({
        scene: scene.id,
        frame: scene.from + local,
        filename: `${String(i + 1).padStart(2, '0')}-${scene.id}-${j + 1}.png`,
      });
    }
  }
  for (const item of selected) {
    await renderStill({
      serveUrl,
      composition,
      frame: item.frame,
      output: path.join(out, item.filename),
      puppeteerInstance: browser,
      imageFormat: 'png',
      logLevel: 'error',
    });
    console.log(`${item.filename} @ ${item.frame}`);
  }
  await writeFile(path.join(out, 'frames.json'), JSON.stringify(selected, null, 2));
  console.log(`Verified ${selected.length} frames in ${out}`);
} finally {
  await browser.close({silent: true});
}
