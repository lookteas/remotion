import {lifeListingTheme as C} from '../../../src/config/theme';
import {PaperSheet} from '../../../src/components/material/PaperSheet';
import {lerp} from '../../../src/lib/anim';
import {settle} from '../../../src/lib/physical-motion';
import {linear, step} from './ListingChart';

export const ListingMaterials=()=> <defs>
  <linearGradient id="listing-paper" x2=".8" y2="1"><stop stopColor={C.paperLight}/><stop offset=".6" stopColor={C.paper}/><stop offset="1" stopColor={C.edge}/></linearGradient>
  <linearGradient id="listing-bronze" x2=".8" y2="1"><stop stopColor={C.goldLight}/><stop offset=".4" stopColor={C.gold}/><stop offset="1" stopColor={C.soil}/></linearGradient>
  <radialGradient id="listing-light"><stop stopColor={C.gold} stopOpacity=".13"/><stop offset="1" stopColor={C.gold} stopOpacity="0"/></radialGradient>
  <filter id="listing-shadow" x="-30%" y="-40%" width="180%" height="200%"><feDropShadow dx="7" dy="16" stdDeviation="12" floodColor={C.black} floodOpacity=".7"/></filter>
</defs>;

export const Token=({x,y,label,scale=1,opacity=1}:{x:number;y:number;label?:string;scale?:number;opacity?:number})=><g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
  <ellipse cy="11" rx="69" ry="35" fill={C.edge}/><ellipse rx="69" ry="35" fill="url(#listing-bronze)" stroke={C.goldLight} strokeWidth="2"/>
  <ellipse rx="59" ry="27" fill="none" stroke={C.edge}/>
  {label&&<text y="9" textAnchor="middle" fill={C.char} fontSize="27" fontWeight="750">{label}</text>}
</g>;

/** Sleep takes the stage alone; exercise does not exist until its own entrance. */
export const RestAndMove=({frame:f}:{frame:number})=>{
  const sleep=settle(f,645),shift=step(f,770,820),shoe=settle(f,790);
  const stride=Math.sin((f-820)*.17),active=step(f,820,845);
  return <g filter="url(#listing-shadow)">
    <g opacity={step(f,640,660)} transform={`translate(${-180*shift} ${-25+(-180*(1-sleep))})`}>
      <g transform={`rotate(${-9+Math.sin(f*.045)*2}) scale(1 ${1+Math.sin(f*.08)*.025})`}>
        <path d="M-123,-65Q0,-90 123,-65Q104,0 123,68Q0,88 -123,68Q-106,0 -123,-65Z" fill="url(#listing-paper)" stroke={C.edge} strokeWidth="2"/>
        <path d="M-105,-51Q0,-71 105,-51Q92,0 105,54Q0,72 -105,54Q-92,0 -105,-51Z" fill="none" stroke={C.edge} strokeDasharray="3 4"/>
        <path d={`M-70,0Q-5,${22+Math.sin(f*.08)*5} 73,0`} fill="none" stroke={C.edge} opacity=".4"/>
      </g>
      <path transform={`translate(0 ${30*(1-step(f,665,720))})`} d="M-25,-230A58,58 0 1 0 34,-157A52,52 0 0 1 -25,-230" fill="url(#listing-bronze)"/>
      {[0,1,2].map(i=>{const p=((Math.max(0,f-685)+i*29)%95)/95;return <text key={i} x={80+p*40} y={-90-p*120} opacity={step(f,685,710)*Math.sin(p*Math.PI)} fontSize={24+p*14} fill={C.goldLight}>z</text>;})}
      <text y="128" textAnchor="middle" fill={C.ivory} fontSize="36">按时睡觉</text>
    </g>
    {f>=785&&<g opacity={step(f,785,802)} transform={`translate(${175+500*(1-shoe)} ${-15})`}>
      {[0,1].map(i=><g key={i} opacity={i===0?.25:1} transform={`translate(${i===0?-30:25+stride*28*active} ${-Math.max(0,(i===0?-1:1)*stride)*46*active}) rotate(${(i===0?-1:1)*stride*11*active})`}>
        <path d="M-100,-23L-70,-96L-23,-72L23,-20L89,0Q137,12 130,46L-114,46Q-130,15 -100,-23Z" fill="url(#listing-paper)" stroke={C.edge} strokeWidth="3"/>
        <path d="M-116,40H130V58Q20,77 -114,58Z" fill="url(#listing-bronze)"/>
        <path d="M-40,-63L4,-42M-50,-47L17,-26M-60,-31L31,-11" stroke={C.soil} strokeWidth="5"/>
      </g>)}
      {[0,1,2].map(i=><path key={i} d={`M${-155-i*30},${25+i*16}h-32`} stroke={C.gold} strokeWidth="3" opacity={.25+Math.max(0,stride)*.4}/>)}
      <text y="118" textAnchor="middle" fill={C.ivory} fontSize="36">规律运动</text>
    </g>}
    <path d="M-270,188H270" stroke={C.gold} strokeOpacity={.22*step(f,840,860)}/>
    {Array.from({length:7},(_,i)=><g key={i} opacity={step(f,845+i*12,855+i*12)}>
      <circle cx={-205+i*68} cy="188" r="16" fill={C.gold}/>
      <path d={`M${-213+i*68},188l6,6l11,-13`} fill="none" stroke={C.ink} strokeWidth="3"/>
    </g>)}
    <text y="266" textAnchor="middle" fontSize="40" fill={C.goldLight} opacity={step(f,910,935)}>精力恢复</text>
  </g>;
};

export const Portfolio=({frame:f}:{frame:number})=>{
  const writing=linear(f,1040,1170),reveal=step(f,1180,1240),land=settle(f,1190);
  return <div style={{position:'relative',width:700,height:500,perspective:1400}}>
    {[2,1,0].map(i=>{const enter=settle(f,1000+i*20),merge=step(f,1170+i*8,1230+i*8);return <div key={i} style={{position:'absolute',left:45+i*18-620*(1-enter)+merge*100,top:40-i*14-merge*30,transform:`rotate(${(-12+i*8)*(1-merge)}deg) scale(${1-.3*merge})`,opacity:step(f,1000+i*20,1015+i*20)*(1-merge)}}>
      <PaperSheet colors={C} w={300} h={390}>
        <div style={{padding:'38px 35px',fontSize:36,fontWeight:600}}>练习稿</div>
        <svg width="300" height="240" style={{position:'absolute',top:105}}>{Array.from({length:5},(_,j)=><path key={j} d={`M35,${j*35+20}q90,-12 220,0`} fill="none" stroke={C.soil} strokeWidth="4" strokeDasharray="225" strokeDashoffset={225*(1-Math.max(0,Math.min(1,writing*5-j)))}/>)}</svg>
      </PaperSheet>
    </div>;})}
    <div style={{position:'absolute',left:lerp(80,185,reveal),top:lerp(-200,10,land),transform:`rotateY(${lerp(-85,0,reveal)}deg) rotate(${lerp(-18,2,reveal)}deg) scale(${lerp(1.7,1,land)})`,opacity:step(f,1180,1198)}}>
      <PaperSheet colors={C} w={330} h={410}>
        <div style={{padding:'35px',fontSize:48,fontWeight:700}}>作品</div>
        <div style={{margin:'0 35px',fontSize:29,lineHeight:1.8}}>解决一个问题<br/>做出一个结果</div>
        <svg width="110" height="110" style={{position:'absolute',right:28,bottom:35,transform:`scale(${settle(f,1250)})`}}><circle cx="55" cy="55" r="45" fill="none" stroke={C.bronze} strokeWidth="4"/><path d="M29,55L48,74L82,33" fill="none" stroke={C.bronze} strokeWidth="7"/></svg>
      </PaperSheet>
    </div>
    <div style={{position:'absolute',left:80+((f-1040)%28)/28*150,top:145+writing*150,rotate:'-25deg',opacity:step(f,1040,1055)*(1-step(f,1160,1180))}}><svg width="120" height="30"><path d="M0,5H95L119,15L95,25H0Z" fill={C.gold}/><path d="M102,8L119,15L102,22" fill={C.char}/></svg></div>
    <div style={{position:'absolute',top:450,width:700,textAlign:'center',fontSize:35,color:C.goldLight,opacity:step(f,1260,1280)}}>练习，变成拿得出的作品</div>
  </div>;
};

export const savingsIncome=[1390,1420,1450,1480,1510,1540,1570,1600];
export const savingsOut=[1480,1560,1660,1700];
export const savingsAt=(f:number)=>3+savingsIncome.filter(t=>f>=t+26).length-savingsOut.filter(t=>f>=t).length;
export const LivingReserve=({frame:f}:{frame:number})=>{
  const count=savingsAt(f),stopped=f>=1640;
  return <g transform={`translate(0 ${180*(1-settle(f,1358))}) rotate(${-12*(1-settle(f,1358))})`}>
    <path d="M-265,90V-60Q-265,-97 -225,-97H105V118H-230Q-265,118 -265,90Z" fill={C.soil} stroke={C.gold} strokeWidth="3" filter="url(#listing-shadow)"/>
    <path d="M-244,-78H82V98H-233Q-244,98 -244,82Z" fill={C.char} stroke={C.edge} strokeDasharray="3 5"/>
    <path d="M25,-10H127V58H25Q0,23 25,-10Z" fill="url(#listing-bronze)"/><circle cx="41" cy="24" r="10" fill={C.soil}/>
    <text x="-85" y="-12" textAnchor="middle" fill={C.ivory} fontSize="34">生活备用金</text>
    {Array.from({length:count},(_,i)=><Token key={i} x={-185+(i%4)*64} y={75-Math.floor(i/4)*31} scale={.48}/>)}
    <text x="240" y="-55" textAnchor="middle" fill={C.secondary} fontSize="32">必要支出</text>
    <text x="240" y="-8" textAnchor="middle" fill={C.secondary} fontSize="26">房租 · 吃饭</text>
    <path d="M100,97Q180,130 255,65" fill="none" stroke={C.gold} opacity=".4"/>
    {savingsIncome.map(t=>{const p=linear(f,t,t+26),slot=savingsAt(t+25),x=-185+(slot%4)*64,y=75-Math.floor(slot/4)*31;return p>0&&p<1?<Token key={t} x={lerp(-210,x,p)} y={lerp(-280,y,p)-Math.sin(p*Math.PI)*100} scale={.48+Math.sin(p*Math.PI)*.3}/>:null;})}
    {savingsOut.map(t=>{const p=linear(f,t,t+36),slot=savingsAt(t-1)-1,x=-185+(slot%4)*64,y=75-Math.floor(slot/4)*31;return p>0&&p<1?<Token key={t} x={lerp(x,260,p)} y={lerp(y,75,p)+Math.sin(p*Math.PI)*50} scale={.48} opacity={1-step(f,t+28,t+36)}/>:null;})}
    <text x="-195" y="-250" textAnchor="middle" fill={C.goldLight} fontSize="30">{stopped?'收入暂时中断':'留下一部分收入'}</text>
    <text y="205" textAnchor="middle" fill={C.goldLight} fontSize="36">{stopped?'仍能支付必要支出':'积攒生活缓冲'}</text>
  </g>;
};

