import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const directory = fileURLToPath(new URL('.', import.meta.url));

test('hexagram data exists before the episode can be built', () => {
  assert.ok(existsSync(`${directory}/hexagrams.ts`), 'Missing accurate hexagram dataset');
});

test('atlas contains all 64 distinct six-line patterns', async () => {
  const {HEXAGRAMS, TRIGRAMS} = await import('./hexagrams.ts');
  assert.equal(TRIGRAMS.length, 8);
  assert.equal(new Set(TRIGRAMS.map(t => t.lines.join(''))).size, 8);
  assert.equal(HEXAGRAMS.length, 64);
  assert.equal(new Set(HEXAGRAMS.map(h => h.lines.join(''))).size, 64);
  for (const h of HEXAGRAMS) {
    assert.equal(h.lines.length, 6);
    assert.ok(h.lines.every(v => v === 0 || v === 1));
    assert.deepEqual(h.lines.slice(0, 3), h.lower.lines);
    assert.deepEqual(h.lines.slice(3), h.upper.lines);
  }
});

test('named teaching examples match traditional bottom-to-top line patterns', async () => {
  const {EXAMPLES} = await import('./hexagrams.ts');
  assert.deepEqual(EXAMPLES.zhun.lines, [1, 0, 0, 0, 1, 0]);
  assert.deepEqual(EXAMPLES.xu.lines, [1, 1, 1, 0, 1, 0]);
  assert.deepEqual(EXAMPLES.qian.lines, [0, 0, 1, 0, 0, 0]);
});

test('measured narration fits a contiguous scene timeline with complete captions', () => {
  const content = JSON.parse(readFileSync(`${directory}/content.json`, 'utf8'));
  const timeline = JSON.parse(readFileSync(`${directory}/timeline.json`, 'utf8'));
  const meta = JSON.parse(readFileSync(`${directory}/video.json`, 'utf8'));
  assert.equal(content.scenes.length, 8);
  assert.equal(timeline.scenes.length, 8);
  let end = 0;
  for (const [i, scene] of timeline.scenes.entries()) {
    assert.equal(scene.from, end);
    assert.equal(scene.id, content.scenes[i].id);
    assert.deepEqual(scene.captions.map(c => c.text), content.scenes[i].lines.map(l => l.text));
    let captionEnd = 0;
    for (const cue of scene.captions) {
      assert.ok(cue.startMs >= captionEnd);
      assert.ok(cue.endMs > cue.startMs);
      assert.ok(cue.endMs <= scene.durationInFrames / 30 * 1000);
      assert.ok(existsSync(`${directory}/../../../public/${cue.audio}`), cue.audio);
      captionEnd = cue.endMs;
    }
    end += scene.durationInFrames;
  }
  assert.equal(end, meta.durationInFrames);
  assert.equal(meta.format.fps, 30);
});
