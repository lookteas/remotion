import {Composition, Folder} from 'remotion';
import timeline from './timeline.json';
import {BingwuScene} from './Scenes';
import {HookStormScene} from './HookStormScene';
import {SixtyImpactScene} from './SceneSixty';
import {CycleWheelScene} from './SceneCycle';
import {ChimaCollisionScene} from './SceneChima';
import {ChongyangScrollScene} from './ScrollScene';
import {EndingBlessingScene} from './EndingBlessingScene';
import {ChiMaCover} from './Cover';

const durationOf = (id: string) => timeline.scenes.find((scene) => scene.id === id)!.durationInFrames;

/** Each scene can be inspected on its own in Studio. */
export const ChiMaSceneCompositions = () => <Folder name="chi-ma-chong-yang-scenes">
  <Composition id="chi-ma-01-hook" component={HookStormScene} width={1080} height={1920} fps={30} durationInFrames={durationOf('hook')} />
  <Composition id="chi-ma-02-bingwu" component={BingwuScene} width={1080} height={1920} fps={30} durationInFrames={durationOf('bingwu')} />
  <Composition id="chi-ma-03-sixty" component={SixtyImpactScene} width={1080} height={1920} fps={30} durationInFrames={durationOf('sixty')} />
  <Composition id="chi-ma-04-cycle" component={CycleWheelScene} width={1080} height={1920} fps={30} durationInFrames={durationOf('cycle')} />
  <Composition id="chi-ma-05-chima" component={ChimaCollisionScene} width={1080} height={1920} fps={30} durationInFrames={durationOf('chima')} />
  <Composition id="chi-ma-06-chongyang-v2" component={ChongyangScrollScene} width={1080} height={1920} fps={30} durationInFrames={durationOf('chongyang')} />
  <Composition id="chi-ma-cover" component={ChiMaCover} width={1080} height={1920} fps={30} durationInFrames={1} />`r`n  <Composition id="chi-ma-07-ending" component={EndingBlessingScene} width={1080} height={1920} fps={30} durationInFrames={durationOf('ending')} />
</Folder>;
