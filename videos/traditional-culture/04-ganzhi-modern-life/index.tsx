import {AbsoluteFill,Sequence,Audio,staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {ganzhiTheme as C} from '../../../src/config/theme';
import {FilmLook} from '../../../src/components/Backdrop';
import {GanzhiWorld} from './World';
import {CaptionLayer} from './Scenes';
import timeline from './timeline.json';
if(typeof document!=='undefined'){
 void loadFont({family:'GanzhiSans',url:staticFile('ganzhi-modern-life/fonts/NotoSansSC.woff2'),weight:'100 900'});
 void loadFont({family:'GanzhiSerif',url:staticFile('ganzhi-modern-life/fonts/NotoSerifSC.woff2'),weight:'100 900'});
}
export const DURATION=timeline.scenes.reduce((sum,s)=>sum+s.durationInFrames,0);
export default function GanzhiModernLife(){return <AbsoluteFill style={{background:`radial-gradient(ellipse at 50% 60%,${C.surface},${C.ink} 72%)`,fontFamily:C.font,overflow:'hidden'}}>
 <Sequence name='持续生活空间 · 手机、纸张与新家' from={0} durationInFrames={DURATION}><GanzhiWorld/></Sequence>
 <Sequence name='上屏文案 · 五类生活应用' from={0} durationInFrames={DURATION}><CaptionLayer/></Sequence>
 <Sequence name='贺卡选中' from={22} durationInFrames={18}><Audio src={staticFile('ganzhi-modern-life/audio/tap.wav')} volume={.26}/></Sequence>
 <Sequence name='贺卡送出' from={740} durationInFrames={22}><Audio src={staticFile('ganzhi-modern-life/audio/paper.wav')} volume={.16}/></Sequence>
 <Sequence name='第一个庚日' from={915} durationInFrames={16}><Audio src={staticFile('ganzhi-modern-life/audio/tick.wav')} volume={.19}/></Sequence>
 <Sequence name='第二个庚日' from={1035} durationInFrames={16}><Audio src={staticFile('ganzhi-modern-life/audio/tick.wav')} volume={.19}/></Sequence>
 <Sequence name='第三个庚日' from={1155} durationInFrames={16}><Audio src={staticFile('ganzhi-modern-life/audio/tick.wav')} volume={.23}/></Sequence>
 <Sequence name='书写收笔' from={1935} durationInFrames={30}><Audio src={staticFile('ganzhi-modern-life/audio/paper.wav')} volume={.17}/></Sequence>
 <Sequence name='婚期落笔' from={2580} durationInFrames={20}><Audio src={staticFile('ganzhi-modern-life/audio/tap.wav')} volume={.16}/></Sequence>
 <Sequence name='婚礼交换戒指' from={2940} durationInFrames={28}><Audio src={staticFile('ganzhi-modern-life/audio/tick.wav')} volume={.15}/></Sequence>
 <Sequence name='搬箱落地' from={3570} durationInFrames={25}><Audio src={staticFile('ganzhi-modern-life/audio/tap.wav')} volume={.17}/></Sequence>
 <Sequence name='搬进新居' from={4140} durationInFrames={30}><Audio src={staticFile('ganzhi-modern-life/audio/paper.wav')} volume={.13}/></Sequence>
 <FilmLook grain={.025} vignette={.20}/>
 </AbsoluteFill>;}
