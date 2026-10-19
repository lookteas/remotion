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
const serveUrl = await bundle({entryPoint: path.join(root, 'src/index.ts'), outDir: path.join(root, '.cache/iching-life/review-bundle')});
const browser = await openBrowser('chrome');
try {
  const composition = await selectComposition({serveUrl, id: 'traditional-culture-iching-life', puppeteerInstance: browser});
  const frames = [];
  for (const [i, scene] of timeline.scenes.entries()) {
    const localFrames = [65, Math.floor(scene.durationInFrames * 0.53), scene.durationInFrames - 65];
    for (const [j, local] of localFrames.entries()) frames.push({
      scene: scene.id, frame: scene.from + local,
      filename: `${String(i + 1).padStart(2, '0')}-${scene.id}-${j + 1}.png`,
    });
  }
  // Additional structure and question states catch changes between the thirds.
  for (const [sceneIndex, cueIndex] of [[2, 1], [2, 2], [7, 4], [7, 5]]) {
    const scene = timeline.scenes[sceneIndex];
    const frame = scene.from + scene.captions[cueIndex].from + 65;
    frames.push({scene: scene.id, frame, filename: `extra-${scene.id}-${cueIndex}.png`});
  }
  const selected = process.argv.includes('--life-only') ? frames.filter(f => f.scene === 'life') : frames;
  for (let i = 0; i < selected.length; i += 3) {
    await Promise.all(selected.slice(i, i + 3).map(async item => {
      await renderStill({serveUrl, composition, frame: item.frame, output: path.join(out, item.filename), puppeteerInstance: browser, imageFormat: 'png', logLevel: 'error'});
      console.log(`${item.filename} @ ${item.frame}`);
    }));
  }
  await writeFile(path.join(out, process.argv.includes('--life-only') ? 'life-frames.json' : 'frames.json'), JSON.stringify(selected, null, 2));
  console.log(`Verified ${selected.length} frames. ${out}`);
} finally {
  await browser.close({silent: true});
}
