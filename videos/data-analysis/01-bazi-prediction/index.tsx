import {Sequence} from 'remotion';
import {BaziScene} from './Scenes';
import timeline from './timeline.json';

export const DURATION = timeline.scenes.reduce((sum, s) => sum + s.durationInFrames, 0);
export default function BaziPrediction() {
  return <>
    <Sequence from={timeline.scenes[0].from} durationInFrames={timeline.scenes[0].durationInFrames} name="B01"><BaziScene scene={1}/></Sequence>
    <Sequence from={timeline.scenes[1].from} durationInFrames={timeline.scenes[1].durationInFrames} name="B02"><BaziScene scene={2}/></Sequence>
    <Sequence from={timeline.scenes[2].from} durationInFrames={timeline.scenes[2].durationInFrames} name="B03"><BaziScene scene={3}/></Sequence>
    <Sequence from={timeline.scenes[3].from} durationInFrames={timeline.scenes[3].durationInFrames} name="B04"><BaziScene scene={4}/></Sequence>
    <Sequence from={timeline.scenes[4].from} durationInFrames={timeline.scenes[4].durationInFrames} name="B05"><BaziScene scene={5}/></Sequence>
    <Sequence from={timeline.scenes[5].from} durationInFrames={timeline.scenes[5].durationInFrames} name="B06"><BaziScene scene={6}/></Sequence>
    <Sequence from={timeline.scenes[6].from} durationInFrames={timeline.scenes[6].durationInFrames} name="B07"><BaziScene scene={7}/></Sequence>
    <Sequence from={timeline.scenes[7].from} durationInFrames={timeline.scenes[7].durationInFrames} name="B08"><BaziScene scene={8}/></Sequence>
    <Sequence from={timeline.scenes[8].from} durationInFrames={timeline.scenes[8].durationInFrames} name="B09"><BaziScene scene={9}/></Sequence>
    <Sequence from={timeline.scenes[9].from} durationInFrames={timeline.scenes[9].durationInFrames} name="B10"><BaziScene scene={10}/></Sequence>
    <Sequence from={timeline.scenes[10].from} durationInFrames={timeline.scenes[10].durationInFrames} name="B11"><BaziScene scene={11}/></Sequence>
    <Sequence from={timeline.scenes[11].from} durationInFrames={timeline.scenes[11].durationInFrames} name="B12"><BaziScene scene={12}/></Sequence>
  </>;
}
