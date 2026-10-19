/**
 * Silent-caption timeline. No narration: each card is held for a comfortable
 * reading speed (about 6 Chinese characters per second), plus a short beat.
 */
import {readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const content = JSON.parse(readFileSync(path.join(here, 'content.json'), 'utf8'));
const meta = JSON.parse(readFileSync(path.join(here, 'video.json'), 'utf8'));
const FPS = 30;

const visibleLength = (text) => Array.from(text.replace(/[*\n]/g, '')).length;
/** 5 frames per character ≈ 6 chars/s, plus 16 frames to land the line. */
const durationFor = (text) => Math.max(50, Math.round(visibleLength(text) * 5) + 16);

const stamp = (ms) => {
  const t = Math.round(ms);
  const hh = String(Math.floor(t / 3600000)).padStart(2, '0');
  const mm = String(Math.floor(t / 60000) % 60).padStart(2, '0');
  const ss = String(Math.floor(t / 1000) % 60).padStart(2, '0');
  const msPart = String(t % 1000).padStart(3, '0');
  return `${hh}:${mm}:${ss},${msPart}`;
};

const timeline = {fps: FPS, scenes: []};
const srt = [];
let absolute = 0;

for (const scene of content.scenes) {
  let cursor = 0;
  const captions = [];
  for (const line of scene.lines) {
    const durationInFrames = durationFor(line.text);
    captions.push({text: line.text, from: cursor, durationInFrames});
    const start = absolute + cursor;
    srt.push(`${srt.length + 1}\n${stamp(start / FPS * 1000)} --> ${stamp((start + durationInFrames) / FPS * 1000)}\n${line.text.replace(/\*/g, '')}\n`);
    cursor += durationInFrames;
  }
  const durationInFrames = cursor + (scene.id === 'ending' ? 40 : 18);
  timeline.scenes.push({id: scene.id, from: absolute, durationInFrames, captions});
  absolute += durationInFrames;
}

writeFileSync(path.join(here, 'timeline.json'), `${JSON.stringify(timeline, null, 2)}\n`, 'utf8');
writeFileSync(path.join(here, 'subtitles.srt'), srt.join('\n'), 'utf8');
meta.durationInFrames = absolute;
writeFileSync(path.join(here, 'video.json'), `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
console.log(`Timeline: ${absolute} frames / ${(absolute / FPS).toFixed(2)}s · ${srt.length} captions`);
