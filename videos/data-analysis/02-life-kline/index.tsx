import {loadFont} from '@remotion/fonts';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {lifeListingTheme as C} from '../../../src/config/theme';
import {Lift} from '../../../src/components/motion/Lift';
import {ListingWorld} from './ListingWorld';
import {step} from './ListingChart';
import content from './content.json';
import timeline from './timeline.json';

if(typeof document!=='undefined')void loadFont({family:'LifeListingSerif',url:staticFile('fonts/life-kline/NotoSerifSC-life-kline.woff2'),weight:'100 900'});
export const DURATION=timeline.scenes.reduce((sum,s)=>sum+s.durationInFrames,0);
const Caption=({scene}:{scene:number})=>{
  const f=useCurrentFrame(),data=content.scenes[scene],duration=timeline.scenes[scene].durationInFrames;
  const note=scene===3?(f<155?'先按时睡觉，恢复精力。':'再规律运动，让身体动起来。'):data.note;
  const opacity=scene===7?1:1-step(f,duration-24,duration);
  return <AbsoluteFill style={{opacity,color:C.ivory,fontFamily:C.font,pointerEvents:'none'}}>
    <div style={{position:'absolute',top:C.headingTop,left:C.left,width:C.textWidth,fontSize:scene===0?78:72,fontWeight:650,lineHeight:C.headingLineHeight}}>
      {data.lines.map((line,i)=><Lift key={line} at={i*10} duration={22} distance={22}><div style={{color:i===0?C.ivory:C.goldLight}}>{line}</div></Lift>)}
    </div>
    <div style={{position:'absolute',top:scene===0?1480:1500,left:90,width:900,fontSize:scene===0?87:76,fontWeight:650,lineHeight:1.5,color:C.goldLight}}>
      {data.bottom.map((line,i)=><Lift key={line} at={scene===7?140+i*12:20+i*12} duration={22} distance={20}><div>{line}</div></Lift>)}
    </div>
    {note&&<div style={{position:'absolute',top:1550,left:90,width:850,fontSize:37,lineHeight:1.7,color:C.secondary,opacity:step(f,45,75)}}>{note}</div>}
  </AbsoluteFill>;
};
export default function LifeKline(){
  return <AbsoluteFill style={{background:C.ink,fontFamily:C.font,overflow:'hidden'}}>
    <Sequence from={0} durationInFrames={DURATION} name="连续人生K线与投入过程"><ListingWorld/></Sequence>
    <Sequence from={0} durationInFrames={210} name="K01 真正的K线下跌"><Caption scene={0}/></Sequence>
    <Sequence from={210} durationInFrames={210} name="K02 处境与价值"><Caption scene={1}/></Sequence>
    <Sequence from={420} durationInFrames={210} name="K03 解释抄底自己"><Caption scene={2}/></Sequence>
    <Sequence from={630} durationInFrames={360} name="K04 睡眠运动与精力"><Caption scene={3}/></Sequence>
    <Sequence from={990} durationInFrames={360} name="K05 练习形成作品"><Caption scene={4}/></Sequence>
    <Sequence from={1350} durationInFrames={420} name="K06 生活备用金"><Caption scene={5}/></Sequence>
    <Sequence from={1770} durationInFrames={420} name="K07 招聘窗口打开与主动选择"><Caption scene={6}/></Sequence>
    <Sequence from={2190} durationInFrames={330} name="K08 低位与选择"><Caption scene={7}/></Sequence>
    <Sequence from={115} durationInFrames={30} name="K线下行落定"><Audio src={staticFile('audio/life-kline/impact.wav')} volume={.15}/></Sequence>
    <Sequence from={365} durationInFrames={30} name="图表让出解释空间"><Audio src={staticFile('audio/life-kline/whoosh.wav')} volume={.1}/></Sequence>
    <Sequence from={1255} durationInFrames={20} name="作品完成"><Audio src={staticFile('audio/life-kline/lock.wav')} volume={.12}/></Sequence>
    <Sequence from={1875} durationInFrames={30} name="招聘门打开"><Audio src={staticFile('audio/life-kline/whoosh.wav')} volume={.1}/></Sequence>
    <div style={{position:'absolute',left:90,top:125,color:C.muted,fontSize:25,letterSpacing:1}}>{content.disclosure}</div>
  </AbsoluteFill>;
}
