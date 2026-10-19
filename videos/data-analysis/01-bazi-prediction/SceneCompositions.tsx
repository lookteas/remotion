import {Composition, Folder} from 'remotion';
import {BaziScene} from './Scenes';

export const BaziSceneCompositions = () => <Folder name="Bazi-scenes">
  <Composition id="bazi-b01" component={BaziScene} defaultProps={{scene: 1}} durationInFrames={180} width={1080} height={1920} fps={30}/>
  <Composition id="bazi-b02" component={BaziScene} defaultProps={{scene: 2}} durationInFrames={180} width={1080} height={1920} fps={30}/>
  <Composition id="bazi-b03" component={BaziScene} defaultProps={{scene: 3}} durationInFrames={270} width={1080} height={1920} fps={30}/>
  <Composition id="bazi-b04" component={BaziScene} defaultProps={{scene: 4}} durationInFrames={180} width={1080} height={1920} fps={30}/>
  <Composition id="bazi-b05" component={BaziScene} defaultProps={{scene: 5}} durationInFrames={210} width={1080} height={1920} fps={30}/>
  <Composition id="bazi-b06" component={BaziScene} defaultProps={{scene: 6}} durationInFrames={240} width={1080} height={1920} fps={30}/>
  <Composition id="bazi-b07" component={BaziScene} defaultProps={{scene: 7}} durationInFrames={240} width={1080} height={1920} fps={30}/>
  <Composition id="bazi-b08" component={BaziScene} defaultProps={{scene: 8}} durationInFrames={240} width={1080} height={1920} fps={30}/>
  <Composition id="bazi-b09" component={BaziScene} defaultProps={{scene: 9}} durationInFrames={240} width={1080} height={1920} fps={30}/>
  <Composition id="bazi-b10" component={BaziScene} defaultProps={{scene: 10}} durationInFrames={240} width={1080} height={1920} fps={30}/>
  <Composition id="bazi-b11" component={BaziScene} defaultProps={{scene: 11}} durationInFrames={240} width={1080} height={1920} fps={30}/>
  <Composition id="bazi-b12" component={BaziScene} defaultProps={{scene: 12}} durationInFrames={150} width={1080} height={1920} fps={30}/>
</Folder>;
