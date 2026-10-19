import {loadFont} from '@remotion/fonts';
import {Sequence, staticFile, useVideoConfig} from 'remotion';
import timeline from './timeline.json';
import {BingwuScene} from './Scenes';
import {HookStormScene} from './HookStormScene';
import {SixtyImpactScene} from './SceneSixty';
import {CycleWheelScene} from './SceneCycle';
import {ChimaCollisionScene} from './SceneChima';
import {ChongyangScrollScene} from './ScrollScene';
import {EndingBlessingScene} from './EndingBlessingScene';

if (typeof document !== 'undefined') {
  void loadFont({
    family: 'ChiMaSerif',
    url: staticFile('fonts/chi-ma-chong-yang/NotoSerifSC-episode.woff2'),
    weight: '100 900',
  });
}

export const DURATION = timeline.scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0);

export default function ChiMaChongYangVideo() {
  const {fps} = useVideoConfig();
  const at = (n: number) => Math.round(timeline.scenes[n].from / timeline.fps * fps);
  const len = (n: number) => Math.round(timeline.scenes[n].durationInFrames / timeline.fps * fps);
  return <>
    <Sequence from={at(0)} durationInFrames={len(0)} name="01 重阳，怎么过"><ChongyangScrollScene /></Sequence>
    <Sequence from={at(1)} durationInFrames={len(1)} name="02 六十年一遇"><HookStormScene /></Sequence>
    <Sequence from={at(2)} durationInFrames={len(2)} name="03 丙午，赤马"><BingwuScene /></Sequence>
    <Sequence from={at(3)} durationInFrames={len(3)} name="04 为什么是六十"><SixtyImpactScene /></Sequence>
    <Sequence from={at(4)} durationInFrames={len(4)} name="05 六十年一轮"><CycleWheelScene /></Sequence>
    <Sequence from={at(5)} durationInFrames={len(5)} name="06 赤马红羊"><ChimaCollisionScene /></Sequence>
    <Sequence from={at(6)} durationInFrames={len(6)} name="07 把日子看清一点"><EndingBlessingScene /></Sequence>
  </>;
}
