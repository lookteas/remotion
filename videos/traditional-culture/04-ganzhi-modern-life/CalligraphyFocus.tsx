import {useCurrentFrame,useVideoConfig} from 'remotion';
import {ganzhiTheme as C} from '../../../src/config/theme';
import {ease} from './motion';

export const CalligraphyFocus=()=>{const f=useCurrentFrame(),{fps}=useVideoConfig(),t=f/fps;const reveal=ease(t,50,53),write=ease(t,53,58),date=ease(t,56,59),seal=ease(t,58.5,60),roll=ease(t,61,64);return <div style={{position:'absolute',inset:0,overflow:'hidden',background:`radial-gradient(circle at 50% 47%,${C.surface},${C.ink} 72%)`,fontFamily:C.font,color:C.ivory}}>
 <div style={{position:'absolute',left:80,right:80,top:135,display:'flex',justifyContent:'space-between',alignItems:'baseline'}}><div style={{fontSize:26,color:C.gold,letterSpacing:5}}>书画落款 · 时间的记录</div><div style={{fontSize:24,color:C.secondary}}>03 / 05</div></div>
 <div style={{position:'absolute',left:80,top:240,fontSize:58,lineHeight:1.2,fontWeight:700}}>用干支，记下这幅字的年份</div>
 <div style={{position:'absolute',left:82,top:355,fontSize:31,color:C.secondary}}>写下、落款、盖印；每一步都留下创作时间。</div>
 <div style={{position:'absolute',left:540+230*roll,top:1080,width:470,height:680,transform:`translate(-50%,-50%) rotate(${7*(1-roll)}deg) scale(${.84+.16*reveal})`,transformOrigin:'center center',background:`linear-gradient(110deg,${C.paperEdge},${C.paperLight} 12%,${C.paper} 88%,${C.paperEdge})`,boxShadow:`0 28px 80px ${C.black}99`,border:`2px solid ${C.gold}`,opacity:reveal,display:'flex',justifyContent:'center',alignItems:'center',gap:18}}>
  <div style={{fontFamily:C.serif,fontSize:112,letterSpacing:17,color:C.bronzeDark,writingMode:'vertical-rl',clipPath:`inset(0 0 ${(1-write)*100}% 0)`}}>安居</div>
  <div style={{fontFamily:C.serif,fontSize:40,letterSpacing:9,color:C.vermilion,writingMode:'vertical-rl',opacity:date}}>丙午夏</div>
  <div style={{position:'absolute',left:35,bottom:30,width:62,height:62,border:`4px double ${C.vermilion}`,color:C.vermilion,fontFamily:C.serif,fontSize:25,display:'grid',placeItems:'center',opacity:seal,transform:`scale(${.6+.4*seal})`}}>安</div>
  <div style={{position:'absolute',left:0,top:0,width:16,height:'100%',background:`linear-gradient(180deg,${C.gold},${C.vermilion},${C.gold})`,opacity:.75}}/>
 </div>
 <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d="M150 1370 C340 1280 470 1180 655 1030" fill="none" stroke={C.gold} strokeWidth="4" strokeLinecap="round" strokeDasharray="700" strokeDashoffset={700*(1-roll)} opacity={roll}/><circle cx="655" cy="1030" r="12" fill={C.vermilion} opacity={roll}/></svg>
 <div style={{position:'absolute',left:90,right:90,top:1680,height:4,background:`${C.gold}33`}}><div style={{width:`${Math.min(100,(t-50)/14*100)}%`,height:4,background:`linear-gradient(90deg,${C.gold},${C.vermilion})`}}/></div>
 </div>;
};
