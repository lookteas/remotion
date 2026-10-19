import {Composition, Folder} from 'remotion';
import timeline from './timeline.json';
import {LifeScene, LinesScene, BuildScene, StoriesScene, CookingScene, SeedScene, LearningScene, EndingScene} from './Scenes';

/** Connected scenes can be inspected independently in Studio. */
export const IChingSceneCompositions = () => <Folder name="iching-life-scenes">
  <Composition id="iching-life-01-life" component={LifeScene} width={1920} height={1080} fps={30} durationInFrames={timeline.scenes[0].durationInFrames} />
  <Composition id="iching-life-02-lines" component={LinesScene} width={1920} height={1080} fps={30} durationInFrames={timeline.scenes[1].durationInFrames} />
  <Composition id="iching-life-03-build" component={BuildScene} width={1920} height={1080} fps={30} durationInFrames={timeline.scenes[2].durationInFrames} />
  <Composition id="iching-life-04-stories" component={StoriesScene} width={1920} height={1080} fps={30} durationInFrames={timeline.scenes[3].durationInFrames} />
  <Composition id="iching-life-05-cooking" component={CookingScene} width={1920} height={1080} fps={30} durationInFrames={timeline.scenes[4].durationInFrames} />
  <Composition id="iching-life-06-seed" component={SeedScene} width={1920} height={1080} fps={30} durationInFrames={timeline.scenes[5].durationInFrames} />
  <Composition id="iching-life-07-learning" component={LearningScene} width={1920} height={1080} fps={30} durationInFrames={timeline.scenes[6].durationInFrames} />
  <Composition id="iching-life-08-ending" component={EndingScene} width={1920} height={1080} fps={30} durationInFrames={timeline.scenes[7].durationInFrames} />
</Folder>;
