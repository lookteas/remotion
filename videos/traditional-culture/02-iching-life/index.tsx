import {loadFont} from '@remotion/fonts';
import {staticFile, Track, useVideoConfig} from 'remotion';
import timeline from './timeline.json';
import {LifeScene, LinesScene, BuildScene, StoriesScene, CookingScene, SeedScene, LearningScene, EndingScene} from './Scenes';

if (typeof document !== 'undefined') {
  void loadFont({
    family: 'IChingSerif',
    url: staticFile('fonts/iching-life/NotoSerifSC-episode.woff2'),
    weight: '100 900',
  });
}

export const DURATION = timeline.scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0);

export default function IChingLifeVideo() {
  const {fps} = useVideoConfig();
  const frameAt = (n: number) => Math.round(timeline.scenes[n].from / timeline.fps * fps);
  const duration = (n: number) => Math.round(timeline.scenes[n].durationInFrames / timeline.fps * fps);
  return <Track name="生活里的易经 · 八段故事">
    <LifeScene name="01 日子里的变化" from={frameAt(0)} durationInFrames={duration(0)} />
    <LinesScene name="02 先认两个样子" from={frameAt(1)} durationInFrames={duration(1)} />
    <BuildScene name="03 六十四卦怎样组成" from={frameAt(2)} durationInFrames={duration(2)} />
    <StoriesScene name="04 符号也讲生活" from={frameAt(3)} durationInFrames={duration(3)} />
    <CookingScene name="05 屯 · 开始有点难" from={frameAt(4)} durationInFrames={duration(4)} />
    <SeedScene name="06 需 · 等待也有事可做" from={frameAt(5)} durationInFrames={duration(5)} />
    <LearningScene name="07 谦 · 留一点进步的空间" from={frameAt(6)} durationInFrames={duration(6)} />
    <EndingScene name="08 把问题带回生活" from={frameAt(7)} durationInFrames={duration(7)} />
  </Track>;
}
