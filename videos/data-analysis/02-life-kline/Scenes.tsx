import React from 'react';
import {loadFont} from '@remotion/fonts';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {lifeKlineTheme as C} from '../../../src/config/theme';
import {lerp, progress} from '../../../src/lib/anim';
import {Lift} from '../../../src/components/motion/Lift';
import content from './content.json';
import timeline from './timeline.json';

if(typeof document!=='undefined')void loadFont({family:'LifeKlineSans',url:staticFile('fonts/life-kline/NotoSansSC-life-kline.woff2'),weight:'100 900'});
const Emphasis:React.FC<{line:string;focus:string}>=({line,focus})=>{
  const i=line.indexOf(focus);return i<0?<>{line}</>:<>{line.slice(0,i)}<span style={{color:C.green}}>{focus}</span>{line.slice(i+focus.length)}</>;
};

/** Text overlays the continuing event, rather than mounting a new world/page. */
export const Narrative:React.FC<{scene:number}>=({scene})=>{
  const f=useCurrentFrame(),data=content.scenes[scene],duration=timeline.scenes[scene].durationInFrames;
  const exit=scene===7?1:1-progress(f,duration-16,16);
  if(scene===0)return <AbsoluteFill style={{color:C.white,fontFamily:C.font,opacity:exit}}>
    <div style={{position:'absolute',left:90,top:265,fontSize:84,fontWeight:750,textShadow:`0 4px 28px ${C.black}`}}>如果人生上市，</div>
    <div style={{position:'absolute',left:90,top:1320}}><Lift at={29} duration={19} distance={75}>
      <div style={{fontSize:66,fontWeight:600,lineHeight:1.35}}>你敢</div>
      <div style={{fontSize:116,fontWeight:850,color:C.green,lineHeight:1.3,letterSpacing:-2}}>抄底自己吗？</div>
    </Lift></div>
  </AbsoluteFill>;
  return <div style={{position:'absolute',left:90,top:scene===2?290:scene===7?320:270,width:800,color:C.white,fontFamily:C.font,opacity:exit,textShadow:`0 5px 36px ${C.black}`}}>
    {data.lines.map((line,i)=><Lift key={line} at={i*10} duration={19} distance={35}>
      <div style={{fontSize:scene===2?77:scene===7?98:88,fontWeight:780,lineHeight:1.45,whiteSpace:'nowrap',letterSpacing:-1}}><Emphasis line={line} focus={data.focus}/></div>
    </Lift>)}
  </div>;
};

/** A word enters once, then travels to its lasting position as the next one enters. */
export const FundamentalLabel:React.FC<{index:number}>=({index})=>{
  const f=useCurrentFrame(),shrink=progress(f,110,60),appear=progress(f,0,20);
  return <div style={{position:'absolute',left:lerp(90,155+index*285,shrink),top:lerp(280,1560,shrink),opacity:appear,color:C.green,fontFamily:C.font,textShadow:`0 5px 35px ${C.black}`}}>
    <div style={{fontSize:30,color:C.secondary,opacity:1-shrink,height:lerp(50,0,shrink),whiteSpace:'nowrap'}}>真正的抄底，是优化底层基本面</div>
    <div style={{fontSize:lerp(150,42,shrink),fontWeight:800,letterSpacing:lerp(7,2,shrink),whiteSpace:'nowrap'}}>{content.fundamentals[index]}</div>
  </div>;
};

export const Effects:React.FC=()=> <>
  <Sequence from={7} durationInFrames={26} name="下坠掠过" layout="none"><Audio src={staticFile('audio/life-kline/whoosh.wav')} volume={.38}/></Sequence>
  <Sequence from={66} durationInFrames={23} name="低点冲击" layout="none"><Audio src={staticFile('audio/life-kline/impact.wav')} volume={.45}/></Sequence>
  <Sequence from={355} durationInFrames={26} name="碎片汇聚" layout="none"><Audio src={staticFile('audio/life-kline/whoosh.wav')} volume={.15}/></Sequence>
  <Sequence from={520} durationInFrames={9} name="支撑闭合" layout="none"><Audio src={staticFile('audio/life-kline/lock.wav')} volume={.25}/></Sequence>
  <Sequence from={540} durationInFrames={15} name="核心稳定" layout="none"><Audio src={staticFile('audio/life-kline/pulse.wav')} volume={.22}/></Sequence>
  <Sequence from={705} durationInFrames={9} name="技能接入一" layout="none"><Audio src={staticFile('audio/life-kline/lock.wav')} volume={.16}/></Sequence>
  <Sequence from={741} durationInFrames={9} name="技能接入二" layout="none"><Audio src={staticFile('audio/life-kline/lock.wav')} volume={.19}/></Sequence>
  <Sequence from={784} durationInFrames={15} name="技能成环" layout="none"><Audio src={staticFile('audio/life-kline/pulse.wav')} volume={.24}/></Sequence>
  <Sequence from={860} durationInFrames={26} name="资源流入" layout="none"><Audio src={staticFile('audio/life-kline/whoosh.wav')} volume={.12}/></Sequence>
  <Sequence from={960} durationInFrames={15} name="缓冲成形" layout="none"><Audio src={staticFile('audio/life-kline/pulse.wav')} volume={.17}/></Sequence>
  <Sequence from={1008} durationInFrames={26} name="机会高速逼近" layout="none"><Audio src={staticFile('audio/life-kline/whoosh.wav')} volume={.4}/></Sequence>
  <Sequence from={1040} durationInFrames={23} name="机会悬停" layout="none"><Audio src={staticFile('audio/life-kline/impact.wav')} volume={.31}/></Sequence>
</>;
