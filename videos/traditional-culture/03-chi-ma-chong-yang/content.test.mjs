import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const directory = fileURLToPath(new URL('.', import.meta.url));

test('caption script and timeline agree', () => {
  const content = JSON.parse(readFileSync(`${directory}/content.json`, 'utf8'));
  const timeline = JSON.parse(readFileSync(`${directory}/timeline.json`, 'utf8'));
  const meta = JSON.parse(readFileSync(`${directory}/video.json`, 'utf8'));
  assert.equal(content.scenes.length, 7);
  assert.equal(timeline.scenes.length, 7);
  assert.equal(timeline.fps, 30);
  let end = 0;
  for (const [i, scene] of timeline.scenes.entries()) {
    assert.equal(scene.from, end);
    assert.equal(scene.id, content.scenes[i].id);
    assert.deepEqual(scene.captions.map(c => c.text), content.scenes[i].lines.map(l => l.text));
    let cursor = 0;
    for (const cue of scene.captions) {
      assert.equal(cue.from, cursor);
      assert.ok(cue.durationInFrames >= 50);
      cursor += cue.durationInFrames;
    }
    assert.equal(scene.durationInFrames, cursor + (scene.id === 'ending' ? 40 : scene.id === 'chongyang' ? 0 : 18));
    end += scene.durationInFrames;
  }
  assert.equal(end, meta.durationInFrames);
  assert.deepEqual(meta.format, {width: 1080, height: 1920, fps: 30});
});

test('emphasis markers are balanced and assets exist', () => {
  const content = JSON.parse(readFileSync(`${directory}/content.json`, 'utf8'));
  for (const scene of content.scenes) {
    for (const line of scene.lines) {
      assert.equal(line.text.split('*').length % 2, 1, line.text);
    }
  }
  assert.ok(existsSync(`${directory}/../../../public/fonts/chi-ma-chong-yang/NotoSerifSC-episode.woff2`));
  assert.ok(existsSync(`${directory}/subtitles.srt`));
});

test('no narration track is registered', () => {
  const meta = JSON.parse(readFileSync(`${directory}/video.json`, 'utf8'));
  assert.equal(meta.audio.narration, '');
  assert.equal(meta.audio.bgm, '');
});
