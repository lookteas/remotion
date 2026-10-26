import {AbsoluteFill,useCurrentFrame,useVideoConfig} from 'remotion';
import {ganzhiTheme as C} from '../../../src/config/theme';
import {windowOpacity} from '../../../src/lib/anim';
import {captions} from './content';
import {ease} from './motion';
import {openingAt} from './story-motion';
import {Horse} from './Props';

const OpeningKnowledge=({t}:{t:number})=>{const o=openingAt(t),split=o.split,map=o.map,join=o.join;const ring=ease(t,1.8,3.8),glow=ease(t,3.2,4.8);return <AbsoluteFill style={{zIndex:30,pointerEvents:'none',fontFamily:C.font,color:C.ivory,background:`radial-gradient(circle at 50% 47%,${C.surface},${C.ink} 64%,${C.deskEdge})`,opacity:1-ease(t,7.65,8)}}>
 <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
  <defs><radialGradient id="openingGlow"><stop offset="0" stopColor={C.goldLight} stopOpacity=".32"/><stop offset="1" stopColor={C.gold} stopOpacity="0"/></radialGradient><linearGradient id="openingStroke" x1="0" x2="1"><stop stopColor={C.goldLight}/><stop offset=".5" stopColor={C.gold}/><stop offset="1" stopColor={C.vermilion}/></linearGradient></defs>
  <circle cx="540" cy="860" r="520" fill="url(#openingGlow)" opacity={glow}/><circle cx="540" cy="860" r="390" fill="none" stroke={C.gold} strokeOpacity=".22" strokeWidth="2" strokeDasharray="3 20" transform={`rotate(${ring*110} 540 860)`}/><circle cx="540" cy="860" r="470" fill="none" stroke={C.goldLight} strokeOpacity=".15" strokeWidth="2" strokeDasharray="2 34" transform={`rotate(${-ring*70} 540 860)`}/>
  {[0,1,2,3,4,5,6,7,8,9,10,11].map(i=><line key={i} x1="540" y1="365" x2="540" y2="405" stroke={i===5?C.vermilion:C.goldLight} strokeWidth={i===5?7:3} opacity={.25+ring*.5} transform={`rotate(${i*30+ring*60} 540 860)`}/>)}
  <path d="M130 1180 C330 1090 385 870 530 700 C690 510 760 560 950 445" fill="none" stroke="url(#openingStroke)" strokeWidth="5" strokeLinecap="round" strokeDasharray="900" strokeDashoffset={900*(1-split)} opacity={split}/>
 </svg>
 <div style={{position:'absolute',top:142,left:75,right:75,display:'flex',justifyContent:'space-between',alignItems:'baseline'}}><div style={{fontSize:26,letterSpacing:6,color:C.gold}}>干支年名 · 动态拆解</div><div style={{fontSize:24,color:C.secondary}}>01 / 05</div></div>
 <div style={{position:'absolute',top:245,left:75,right:75,fontSize:58,fontWeight:750,lineHeight:1.2}}>马年，为什么写「丙午」？</div>
 <div style={{position:'absolute',top:365,left:78,right:78,fontSize:34,color:C.goldLight,letterSpacing:2}}>{o.caption}</div>
 <div style={{position:'absolute',left:540,top:850,transform:`translate(-50%,-50%) scale(${1+ring*.12})`,opacity:1-split*.88,fontFamily:C.serif,fontSize:280,letterSpacing:28,color:C.paperLight,textShadow:`0 0 34px ${C.gold}88, 8px 10px 0 ${C.bronzeDark}`}}>丙午</div>
 <div style={{position:'absolute',left:540-mixOpening(split,225),top:850,transform:`translate(-50%,-50%) scale(${.76+split*.24})`,opacity:split,fontFamily:C.serif,fontSize:218,color:C.vermilion,textShadow:`0 0 28px ${C.vermilion}88`}}>丙<div style={{fontFamily:C.font,fontSize:28,letterSpacing:5,color:C.goldLight,textAlign:'center'}}>天干</div></div>
 <div style={{position:'absolute',left:540+mixOpening(split,225)-mixOpening(map,115),top:850,transform:`translate(-50%,-50%) scale(${.76+split*.24})`,opacity:split,fontFamily:C.serif,fontSize:218,color:C.blue,textShadow:`0 0 28px ${C.blue}88`}}>午<div style={{fontFamily:C.font,fontSize:28,letterSpacing:5,color:C.goldLight,textAlign:'center'}}>地支</div></div>
 <div data-role="zodiac-medallion" style={{position:'absolute',left:540+mixOpening(map,300),top:850,width:300,height:300,borderRadius:'50%',border:`4px solid ${C.gold}`,background:`${C.gold}18`,opacity:map,transform:`translate(-50%,-50%) scale(${.5+map*.5})`,display:'grid',placeItems:'center',boxShadow:`0 0 50px ${C.gold}55`}}><Horse size={286} motion={t}/></div>
 <div style={{position:'absolute',left:75,right:75,top:1395,borderTop:`2px solid ${C.gold}55`,paddingTop:28,display:'flex',justifyContent:'center',gap:24,alignItems:'center',fontSize:36,opacity:join}}><b style={{fontSize:50,color:C.goldLight}}>丙午</b><span>是这一年的干支年名</span><span style={{color:C.vermilion}}>·</span><b style={{fontSize:50,color:C.blue}}>午</b><span>对应</span><b style={{fontSize:50,color:C.goldLight}}>马</b></div>
 <div style={{position:'absolute',left:78,right:78,top:1650,height:4,background:`${C.gold}33`}}><div style={{height:4,width:`${t/8*100}%`,background:`linear-gradient(90deg,${C.gold},${C.vermilion})`}}/></div>
 </AbsoluteFill>;};
const mixOpening=(p:number,d:number)=>p*d;
export const CaptionLayer=()=>{const f=useCurrentFrame(),{fps}=useVideoConfig(),t=f/fps;if(t<8)return <OpeningKnowledge t={t}/>;if(t>=50)return null;const cue=captions.find(v=>t>=v.from&&t<v.to)||captions[captions.length-1];const alpha=windowOpacity(t,cue.from,cue.to,.35);return <AbsoluteFill style={{pointerEvents:'none',fontFamily:C.font,color:C.ivory}}>
 <div style={{position:'absolute',top:150,left:90,right:170,display:'flex',alignItems:'center',gap:22,color:C.gold,fontSize:27,letterSpacing:3}}><span style={{width:32,height:1,background:C.gold}}/>{cue.chapter}<span style={{marginLeft:'auto',fontFamily:C.numberFont,fontSize:23}}>{cue.index?`${cue.index} / 05`:''}</span></div>
 <div data-caption='main' style={{position:'absolute',top:237,left:90,width:860,fontSize:t>=35&&t<42?66:74,fontWeight:650,lineHeight:1.4,letterSpacing:1,opacity:alpha}}>{cue.lines.map((line,i)=><div key={line} style={{color:i===0?C.ivory:C.goldLight,opacity:t>=60&&i===1?ease(t,61.8,62.5):1}}>{line}</div>)}</div>
 <div data-caption='note' style={{position:'absolute',left:95,top:478,width:805,fontSize:35,lineHeight:1.6,color:C.secondary,opacity:alpha*ease(t,cue.from+.5,cue.from+1.1)}}>{cue.note}</div>
 <div style={{position:'absolute',left:90,top:1730,width:840,height:2,background:`${C.gold}22`}}><div style={{height:2,width:`${Math.min(100,t/143*100)}%`,background:C.gold}}/></div>
 <div style={{position:'absolute',left:90,top:1750,fontSize:21,color:C.muted,letterSpacing:3}}>天干地支 · 生活中的时间与祝愿</div>
 </AbsoluteFill>;};
