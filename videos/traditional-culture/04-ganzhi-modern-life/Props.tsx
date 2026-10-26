import {useId} from 'react';
import {ganzhiTheme as C} from '../../../src/config/theme';
import {PaperSheet} from '../../../src/components/material/PaperSheet';
import {ease,mix,gengAt,phoneCalendarAt,pointAlong} from './motion';
import {fuDays} from './content';
import calligraphy from './calligraphy.json';
import {HORSE_SILHOUETTE} from './horse-silhouette';

export const Horse=({size=200,motion=0}:{size?:number;motion?:number})=>{
 const uid=useId().replace(/:/g,'');
 const sway=Math.sin(motion*1.15)*1.3,tilt=Math.sin(motion*.9)*.45;
 return <svg data-prop="zodiac-horse" role="img" aria-label="侧身腾跃的生肖马" width={size} height={size*.75} viewBox="0 0 400 300" style={{overflow:'visible'}}>
  <defs>
   <linearGradient id={`horse-coat-${uid}`} x1="0" y1="5" x2="0" y2="295" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor={C.ivory}/><stop offset=".3" stopColor={C.goldLight}/><stop offset=".74" stopColor={C.gold}/><stop offset="1" stopColor={C.bronze}/></linearGradient>
   <filter id={`horse-shadow-${uid}`} x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="9" stdDeviation="8" floodColor={C.black} floodOpacity=".42"/></filter>
  </defs>
  <g filter={`url(#horse-shadow-${uid})`} transform={`rotate(${tilt} 200 150) translate(0 ${sway})`}>
   <path data-part="silhouette" d={HORSE_SILHOUETTE} transform="translate(200 150) scale(-3 3) translate(-48.65 -48.65)" fill={`url(#horse-coat-${uid})`}/>
   <g transform="translate(200 150) scale(-3 3) translate(-48.65 -48.65)">
    <ellipse cx="80.6" cy="12.2" rx="1.45" ry="1.05" fill={C.bronzeDark}/>
    <circle cx="80.3" cy="11.9" r=".38" fill={C.ivory} opacity={.9}/>
    <circle cx="86.1" cy="21.2" r=".72" fill={C.bronzeDark} opacity={.9}/>
    <path d="M85.3 23.3 C86.2 23 87.1 23.1 87.8 23.4" fill="none" stroke={C.bronzeDark} strokeWidth={.62} strokeLinecap="round" opacity={.8}/>
   </g>
  </g>
 </svg>;
};

export const Greeting=({t}:{t:number})=>{const sent=ease(t,8.4,10.8),reveal=ease(t,.3,1.8),link=ease(t,1.6,2.6)*(1-ease(t,8.05,8.45));return <div style={{position:'relative',width:430,height:620,background:`linear-gradient(150deg, ${C.vermilion}, ${C.bronzeDark})`,border:`2px solid ${C.gold}`,borderRadius:12,overflow:'hidden',boxShadow:`0 22px 45px ${C.black}55`,transform:`scale(${mix(.8,1,reveal)*(1-sent*.72)}) translate(${sent*160}px,${sent*-650}px)`,transformOrigin:'50% 50%'}}>
 <div style={{position:'absolute',inset:19,border:`1px solid ${C.gold}77`,borderRadius:4}}/>
 <div style={{position:'absolute',left:45,top:44,color:C.goldLight,fontSize:26,letterSpacing:5}}>岁岁常安 · 新春贺卡</div>
 <div style={{position:'absolute',left:0,right:0,top:100,textAlign:'center',fontFamily:C.serif,fontSize:68,lineHeight:1.08,color:C.paperLight}}>丙午新春</div>
 <div style={{position:'absolute',left:115,top:184,width:200,height:200,borderRadius:'50%',border:`1px solid ${C.gold}99`,opacity:reveal,transform:`scale(${mix(.9,1,reveal)})`}}><div style={{position:'absolute',inset:7,border:`1px dashed ${C.gold}55`,borderRadius:'50%'}}/></div>
 <div data-role="main-horse" style={{position:'absolute',top:200,left:110,width:210,height:158,transform:`translateY(${(1-reveal)*65}px)`}}><Horse size={210} motion={t}/></div>
 <div style={{position:'absolute',left:0,right:0,bottom:30,textAlign:'center',fontSize:38,color:C.paperLight,letterSpacing:8}}>顺遂 · 安康</div>
 <div style={{position:'absolute',left:42,top:376,width:346,height:140,background:`${C.paperLight}f5`,border:`2px solid ${C.gold}`,borderRadius:12,opacity:link,transform:`translateY(${mix(45,0,ease(t,1.6,2.6))}px)`,boxShadow:`0 14px 30px ${C.black}66`,display:'flex',alignItems:'center',justifyContent:'center',gap:28}}>
  <div style={{textAlign:'center'}}><div style={{fontFamily:C.serif,fontSize:84,lineHeight:1,color:C.bronzeDark}}>午</div><div style={{fontSize:21,color:C.bronze,letterSpacing:3,marginTop:7}}>地支</div></div>
  <span style={{fontSize:32,color:C.bronze,lineHeight:1}}>↔</span>
  <div style={{textAlign:'center'}}><div style={{fontFamily:C.serif,fontSize:84,lineHeight:1,color:C.vermilion}}>马</div><div style={{fontSize:21,color:C.bronze,letterSpacing:2,marginTop:7}}>生肖马</div></div>
 </div>
 </div>;};

export const Phone=({t}:{t:number})=>{const isGreeting=t<13;const cal=phoneCalendarAt(t);const married=t>=42&&t<51;const moving=t>=51&&t<60;return <div data-prop="phone" style={{width:500,height:850,position:'relative',borderRadius:62,background:`linear-gradient(125deg,${C.paperEdge},${C.bronzeDark} 15%,${C.black} 85%,${C.paperEdge})`,padding:13,boxSizing:'border-box',boxShadow:`12px 17px 0 ${C.black}, 0 40px 70px ${C.black}99`,border:`2px solid ${C.secondary}66`}}>
 <div style={{position:'absolute',left:-5,top:170,width:5,height:75,background:C.paperEdge,borderRadius:4}}/>
 <div style={{position:'absolute',inset:13,borderRadius:49,background:C.paperLight,overflow:'hidden',color:C.bronzeDark}}>
 <div style={{height:74,padding:'21px 29px',boxSizing:'border-box',fontSize:23,fontWeight:650}}>09:41 <span style={{float:'right',letterSpacing:4}}>▰ ▮</span></div>
 <div style={{position:'absolute',top:22,left:175,width:125,height:28,borderRadius:30,background:C.black}}/>
 <div style={{padding:'7px 27px 20px',fontSize:35,borderBottom:`1px solid ${C.paperEdge}88`,fontWeight:600}}>{isGreeting?(t>9?'亲友 · 贺卡':'新年 · 挑张贺卡'):married?'婚礼筹备':moving?'新家 · 家庭安排':'生活日历'}</div>
 {isGreeting?<div style={{position:'absolute',top:155,left:22}}><Greeting t={t}/>{t>9&&<div style={{position:'absolute',top:80,left:45,fontSize:31,color:C.blueDark,opacity:ease(t,9.4,10.3)}}>贺卡已送出</div>}</div>:<div style={{padding:30}}>
 <div style={{fontSize:25,letterSpacing:2,color:C.bronze,marginBottom:24}}>{married||moving?'传统民俗 · 界面示意':'丙午年 · 生活记录'}</div>
 <div style={{fontSize:56,fontFamily:C.serif,marginBottom:22}}>{married?'婚嫁择日':moving?'乔迁安排':'七月 · 夏日'}</div>
 {married||moving?<><div style={{padding:23,border:`1px solid ${C.paperEdge}`,fontSize:30,lineHeight:1.9}}>日干支 <span style={{float:'right'}}>查阅</span><hr style={{border:0,borderTop:`1px solid ${C.paperEdge}`}}/>民俗宜忌 <span style={{float:'right'}}>参考</span></div><div style={{marginTop:28,padding:24,background:C.paper,borderRadius:10,fontSize:33,lineHeight:1.6}}>{married?'婚礼日期：待商定':'入宅仪式：加入计划'}</div><div style={{marginTop:35,fontSize:26,color:C.bronze,lineHeight:1.7}}>传统习俗<br/>寄托祝愿</div></>:<><div style={{fontSize:112,lineHeight:1.3,color:C.vermilion}}>{cal.result?'15':'夏'}</div><div style={{fontSize:40}}>{cal.result?'庚寅日 · 初伏':'入伏日期 · 查看中'}</div><div style={{marginTop:40,padding:24,background:C.paper,borderRadius:12,fontSize:31}}>入伏提醒 <span style={{float:'right',color:C.blueDark}}>{cal.saved?'已保存':'待确认'}</span></div><div style={{marginTop:25,fontSize:25,color:C.bronze}}>新春贺卡 · 已送出</div></>}
 </div>}
 <div style={{position:'absolute',height:6,borderRadius:4,width:145,background:C.bronzeDark,bottom:14,left:165}}/></div>
 </div>;};

export const Calendar=({t}:{t:number})=>{const unfold=ease(t,13,15),state=gengAt(t);return <div data-prop="calendar" style={{width:780,height:620,position:'relative',perspective:1000}}>
 <div style={{position:'absolute',left:25,right:25,top:25,bottom:-12,background:C.black,opacity:.6,filter:'blur(22px)',borderRadius:20}}/>
 <PaperSheet colors={C} w={780} h={620} style={{borderRadius:12}}>
 <div style={{height:102,background:C.vermilion,color:C.paperLight,padding:'22px 35px',boxSizing:'border-box',fontSize:34,letterSpacing:5}}>夏日历 <span style={{float:'right',fontSize:28}}>2026</span></div>
 {[95,685].map(x=><div key={x} style={{position:'absolute',top:-15,left:x,width:16,height:48,borderRadius:10,border:`4px solid ${C.paperEdge}`,background:C.bronzeDark}}/>)}
 <div style={{padding:'24px 35px',display:'flex',justifyContent:'space-between',fontSize:32,color:C.bronze}}><span>6月21日 · 夏至</span><span>向后数「庚」日</span></div>
 <div style={{position:'absolute',left:63,right:62,top:300,height:3,background:C.paperEdge,transform:`scaleX(${unfold})`,transformOrigin:'0 0'}}/>
 <div style={{position:'absolute',left:63,top:240,height:120,width:mix(0,650,unfold),background:`linear-gradient(90deg,transparent,${C.gold}22)`,borderRadius:6}}/>
 {fuDays.map((d,i)=>{const hit=ease(t,d.at,d.at+.65),p=ease(t,d.at-.15,d.at+.45);return <div key={d.name} style={{position:'absolute',left:35+i*245,top:205,width:220,opacity:p,transform:`translateY(${(1-p)*20}px)`}}>
 <div style={{fontSize:28,textAlign:'center',color:C.bronze,marginBottom:25}}>第 {i+1} 个</div><div style={{margin:'0 auto',width:45,height:45,borderRadius:'50%',boxSizing:'border-box',background:hit>.01?C.vermilion:C.paper,border:`3px solid ${C.vermilion}`,transform:`scale(${1+Math.sin(hit*Math.PI)*.22})`}}/>
 <div style={{textAlign:'center',fontFamily:C.serif,fontSize:61,color:hit>.01?C.vermilion:C.bronze,marginTop:21}}>{d.name}</div><div style={{textAlign:'center',fontSize:37,marginTop:10}}>{d.date}</div>
 {i===2&&<div style={{marginTop:23,padding:'9px 4px',textAlign:'center',fontSize:37,background:C.vermilion,color:C.paperLight,borderRadius:8,opacity:ease(t,21,21.8),transform:`translateY(${(1-ease(t,21,21.8))*15}px)`}}>初伏</div>}</div>;})}
 <div style={{position:'absolute',bottom:32,left:35,right:35,fontSize:30,color:C.bronze}}>以2026年为例 <span style={{float:'right',color:C.vermilion}}>{state.count} / 3</span></div>
 </PaperSheet></div>;};

type StrokeData={strokes:string[];medians:number[][][]};
const glyphs=calligraphy as Record<string,StrokeData>;
export const writingAt=(t:number)=>{let n=Math.max(0,Math.min(18.9999,(t-27)/4*19));for(const [ci,ch] of ['丙','午','夏'].entries()){const d=glyphs[ch];if(n<d.strokes.length){const pts=d.medians[Math.min(d.medians.length-1,Math.floor(n))],point=pointAlong(pts,n-Math.floor(n));return {x:point.x/1024*64+78,y:(900-point.y)/1024*64+138+ci*80};}n-=d.strokes.length;}return {x:100,y:360};};
export const Calligraphy=({t}:{t:number})=>{const uid=useId().replace(/:/g,''),roll=ease(t,33,35)*(1-ease(t,60,63)),w=mix(680,150,roll),h=mix(660,570,roll);return <div data-prop="art" style={{width:w,height:h,position:'relative',margin:'0 auto',background:`linear-gradient(90deg,${C.paperEdge},${C.paperLight} 9%,${C.paper} 90%,${C.paperEdge})`,boxShadow:`0 18px 38px ${C.black}88`,border:`1px solid ${C.paperEdge}`,overflow:'hidden'}}>
 <div style={{position:'absolute',inset:26,border:`1px solid ${C.paperEdge}88`}}/>
 <div style={{position:'absolute',top:80,right:83,fontFamily:C.serif,fontSize:172,lineHeight:1.2,color:C.bronzeDark,writingMode:'vertical-rl',opacity:1-roll}}>安居</div>
 <svg width={680} height={660} viewBox="0 0 680 660" style={{position:'absolute',left:0,top:0,opacity:1-roll}}>{['丙','午','夏'].map((ch,ci)=>{const d=glyphs[ch],offset=ci===0?0:ci===1?5:9,n=Math.max(0,(t-27)/4*19-offset);return <g key={ch} transform={`translate(78 ${138+ci*80}) scale(.0625 -.0625) translate(0 -900)`}>{d.strokes.map((path,i)=>{const p=Math.max(0,Math.min(1,n-i)),median=d.medians[i];return <g key={i}><defs><clipPath id={`${uid}-${ci}-${i}`}><path d={path}/></clipPath></defs><path d={`M${median.map(v=>v.join(' ')).join(' L')}`} pathLength={1} strokeDasharray={1} strokeDashoffset={1-p} strokeWidth={190} strokeLinecap="round" fill="none" stroke={C.bronzeDark} clipPath={`url(#${uid}-${ci}-${i})`}/></g>;})}</g>;})}</svg>
 <div style={{position:'absolute',left:mix(85,35,roll),top:mix(445,245,roll),width:65,height:65,background:C.vermilion,border:`4px double ${C.paperLight}`,color:C.paperLight,display:'flex',alignItems:'center',justifyContent:'center',fontSize:25,fontFamily:C.serif,opacity:ease(t,31,32)}}>安</div>
 <div style={{position:'absolute',bottom:0,left:0,right:0,height:17,background:C.bronzeDark,boxShadow:`0 -3px 0 ${C.gold}`}}/>
 </div>;};

export const BirthCard=({t,person}:{t:number;person:0|1})=>{const open=ease(t,35+person*.25,37.7),read=ease(t,38,40.8);return <PaperSheet colors={C} w={350} h={440} style={{borderRadius:9}}>
 <div style={{padding:'27px 30px',fontSize:33,color:person?C.vermilion:C.blueDark,borderBottom:`1px solid ${C.paperEdge}`}}>双方出生信息 · {person?'乙':'甲'}</div>
  <div style={{position:'absolute',left:27,right:27,top:110,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:7}}>{['年','月','日','时'].map((v,i)=><div key={v} style={{textAlign:'center',transform:`rotateY(${(1-ease(t,35.5+i*.15,37.2+i*.15))*75}deg)`}}><div style={{fontSize:32,marginBottom:15}}>{v}</div>{['干','支'].map(g=><div key={g} style={{height:66,display:'flex',alignItems:'center',justifyContent:'center',fontSize:34,border:`1px solid ${C.paperEdge}`,background:i<=read*4?`${C.gold}33`:C.paperLight,marginBottom:8,opacity:open}}>{g}</div>)}</div>)}</div>
 <div style={{position:'absolute',bottom:35,left:30,fontSize:27,color:C.bronze}}>结构示意 · 非实际命盘</div>
 </PaperSheet>;};

export const Planner=({t}:{t:number})=>{const close=ease(t,49,51),chosen=ease(t,46,48);return <div data-prop="planner" style={{width:730,height:540,position:'relative',perspective:1200}}>
 <div style={{position:'absolute',inset:0,background:C.vermilion,borderRadius:12,boxShadow:`10px 14px 0 ${C.bronzeDark},0 30px 50px ${C.black}77`}}/>
 <div style={{position:'absolute',inset:15,background:C.paperLight,borderRadius:7,padding:35,boxSizing:'border-box',transformOrigin:'left',transform:`rotateY(${close*-86}deg)`,opacity:1-close*.9}}>
 <div style={{fontFamily:C.serif,fontSize:45,color:C.bronzeDark,borderBottom:`2px solid ${C.paperEdge}`,paddingBottom:20}}>婚礼筹备</div><div style={{marginTop:30,fontSize:30,color:C.bronze}}>双方出生信息　→　传统合婚参考</div>
 <div style={{marginTop:42,fontSize:40,color:C.bronzeDark}}>婚礼日期：____ 年 __ 月 __ 日</div>
 <div style={{marginTop:35,padding:20,background:C.paper,color:C.vermilion,fontSize:36,opacity:chosen,transform:`translateY(${(1-chosen)*70}px)`}}>婚期商定 · 记录安排</div>
 <div style={{position:'absolute',left:35,bottom:25,fontSize:26,color:C.bronze}}>婚期安排 · 家人共同商量</div></div>
 <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',color:C.goldLight,fontFamily:C.serif,fontSize:66,opacity:close}}>婚礼筹备</div>
 </div>;};

export const MovingBox=({t}:{t:number})=>{const close=ease(t,56,58),open=ease(t,60,61);const lid=1-close+open;return <svg data-prop="box" width={650} height={570} viewBox="0 0 650 570" style={{overflow:'visible',filter:`drop-shadow(0 25px 25px ${C.black}88)`}}>
 <path d="M52 140 L450 90 L610 190 L210 245Z" fill={C.bronzeDark}/><path d="M52 140 L210 245 V530 L52 424Z" fill={C.paperEdge}/><path d="M210 245 L610 190 V477 L210 530Z" fill={C.bronze}/><path d="M235 260 L582 215 V450 L235 500Z" fill={C.paperEdge}/><path d="M52 140 L450 90 L480 190 L210 245Z" fill={C.bronzeDark} opacity={.6}/>
 <g style={{transformOrigin:'210px 245px',transform:`rotateX(${mix(0,-55,lid)}deg)`}}><path d={`M52 140 L210 245 L${mix(210,100,lid)} ${mix(245,70,lid)} L${mix(52,-55,lid)} ${mix(140,-30,lid)}Z`} fill={C.paper} stroke={C.paperEdge} strokeWidth={2}/><path d={`M210 245 L610 190 L${mix(610,710,lid)} ${mix(190,80,lid)} L${mix(210,310,lid)} ${mix(245,130,lid)}Z`} fill={C.paper} stroke={C.paperEdge} strokeWidth={2}/></g>
 <path d="M360 240 L405 234 V502 L360 509Z" fill={C.gold} opacity={.55}/><path d="M275 325 L515 293 V420 L275 452Z" fill={C.paperLight}/><text x={320} y={384} fontFamily={C.font} fontSize={51} fill={C.bronzeDark} transform="rotate(-7 320 384)">新家</text><text x={321} y={422} fontFamily={C.font} fontSize={22} fill={C.bronze} transform="rotate(-7 321 422)">小心轻放</text></svg>;};

export const Hand=({x,y,angle=0,scale=1,side=false}:{x:number;y:number;angle?:number;scale?:number;side?:boolean})=><svg width={235} height={440} viewBox="0 0 235 440" style={{position:'absolute',left:x-80,top:y-30,transformOrigin:'80px 30px',transform:`rotate(${angle}deg) scale(${side?-scale:scale},${scale})`,overflow:'visible',filter:`drop-shadow(7px 14px 10px ${C.black}44)`}}><path d="M28 440 L42 272 Q23 253 27 219 L43 130 Q48 112 58 124 L60 179 L65 35 Q65 12 79 14 Q91 16 89 38 L89 154 L99 104 Q103 87 114 91 Q124 96 119 115 L112 172 L126 122 Q131 108 141 114 Q150 120 144 136 L130 188 L145 154 Q154 143 163 151 Q170 159 163 173 L143 227 Q132 258 115 278 L126 440Z" fill={C.paperEdge}/><path d="M31 440 L42 300 L120 302 L140 440Z" fill={side?C.blueDark:C.surface}/><path d="M41 302 L119 306 L120 333 L37 329Z" fill={side?C.blue:C.bronze}/><path d="M65 178 Q82 170 96 190 M87 218 Q105 216 121 227" fill="none" stroke={C.bronze} strokeWidth={2} opacity={.45}/><path d="M72 24 L82 24 L81 46 L71 46Z" fill={C.paper} opacity={.65}/></svg>;

export const Brush=({x,y,opacity=1}:{x:number;y:number;opacity?:number})=><svg width={115} height={440} viewBox="0 0 115 440" style={{position:'absolute',left:x-50,top:y-395,transform:'rotate(22deg)',transformOrigin:'50px 395px',opacity,overflow:'visible',filter:`drop-shadow(8px 12px 6px ${C.black}55)`}}><path d="M42 20 Q50 6 60 20 L63 323 L38 323Z" fill={C.bronze}/><path d="M45 25 V320" stroke={C.goldLight} strokeWidth={4} opacity={.5}/><path d="M38 323 L63 323 L65 346 L36 346Z" fill={C.bronzeDark}/><path d="M36 346 Q27 374 50 403 Q76 372 65 346Z" fill={C.paperEdge}/><path d="M35 365 Q35 385 50 403 Q66 385 66 365Z" fill={C.bronzeDark}/></svg>;
