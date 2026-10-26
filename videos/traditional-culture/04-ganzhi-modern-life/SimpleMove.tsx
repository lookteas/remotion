import {staticFile} from 'remotion';
import {ganzhiTheme as C} from '../../../src/config/theme';
import {ease,mix} from './motion';

export type MoveOutfit='groom'|'bride';
type Pt={x:number;y:number};

const SKIN='#EBC5A3',SKIN_D='#D3A17B',HAIR='#2E2521',HAIR_L='#46352C';
const BLUE='#7E9BA6',BLUE_D='#5E7B86',CREAM='#E8D8BE',CREAM_D='#CDB79A',TROUSER='#3A3D3C',SHOE='#3B2A1F';

const ik=(s:Pt,t:Pt,l1:number,l2:number,bend=1)=>{
 const dx=t.x-s.x,dy=t.y-s.y,raw=Math.hypot(dx,dy)||.001,d=Math.min(raw,l1+l2-.5);
 const ux=dx/raw,uy=dy/raw,a=(l1*l1-l2*l2+d*d)/(2*d),h=Math.sqrt(Math.max(0,l1*l1-a*a));
 return {elbow:{x:s.x+ux*a-uy*h*bend,y:s.y+uy*a+ux*h*bend},wrist:{x:s.x+ux*d,y:s.y+uy*d}};
};

export const Back=({x,ground,scale=1,outfit,dir=1,walk=0,tilt=0}:{x:number;ground:number;scale?:number;outfit:MoveOutfit;dir?:number;walk?:number;tilt?:number})=>{
 const top=outfit==='bride'?CREAM:BLUE, topD=outfit==='bride'?CREAM_D:BLUE_D;
 const bob=walk?Math.abs(Math.sin(walk*Math.PI*2))*2:0;
 const BrideFace=()=><>
  <path d="M120 52 C138 52 151 64 153 82 C154 97 149 110 141 120 C134 129 126 134 120 134 C114 134 106 129 99 120 C91 110 86 97 87 82 C89 64 102 52 120 52Z" fill={SKIN}/>
  <path d="M153 82 C154 97 149 110 141 120 C146 114 150 102 150 90Z" fill={SKIN_D} opacity=".22"/>
  <path d="M86 98 C84 62 100 44 120 44 C142 44 157 62 155 98 L148 92 C148 68 136 58 120 58 C104 58 92 70 90 94Z" fill={HAIR}/>
  <path d="M120 46 C102 46 90 60 88 82 C94 66 106 58 120 58 C134 58 146 66 152 82 C150 60 138 46 120 46Z" fill={HAIR}/>
  <path d="M92 80 Q108 64 128 66 Q140 68 148 76 Q136 72 124 72 Q108 72 96 86Z" fill={HAIR_L} opacity=".55"/>
  <path d="M88 86 Q86 110 94 126 L102 116 Q94 102 94 86Z" fill={HAIR}/>
  <path d="M152 86 Q154 110 146 126 L138 116 Q146 102 146 86Z" fill={HAIR}/>
  <ellipse cx="154" cy="112" rx="17" ry="18" fill={HAIR}/>
  <circle cx="86" cy="72" r="9" fill={C.goldLight} stroke={C.gold} strokeWidth="1.4"/>
  <circle cx="86" cy="72" r="3" fill={C.vermilion}/>
  <path d="M151 93 Q155 97 154 102" stroke={C.goldLight} strokeWidth="1.2" fill="none"/>
  <path d="M98 80 Q106 76 114 80" stroke={HAIR} strokeWidth="2" fill="none" strokeLinecap="round"/>
  <path d="M126 80 Q134 76 142 80" stroke={HAIR} strokeWidth="2" fill="none" strokeLinecap="round"/>
  <path d="M99 88 Q106 83 113 88 Q106 93 99 88Z" fill="#FBF7EE"/>
  <path d="M127 88 Q134 83 141 88 Q134 93 127 88Z" fill="#FBF7EE"/>
  <ellipse cx="106" cy="88" rx="3" ry="3.8" fill="#3A2A22"/><ellipse cx="134" cy="88" rx="3" ry="3.8" fill="#3A2A22"/>
  <path d="M99 88 Q106 83 113 88" stroke={HAIR} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  <path d="M127 88 Q134 83 141 88" stroke={HAIR} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  <path d="M113 88 L111 86 M141 88 L143 86" stroke={HAIR} strokeWidth="1" strokeLinecap="round"/>
  <path d="M120 92 Q117 102 121 103" stroke={SKIN_D} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
  <path d="M118 103 Q120 105 123 103" stroke={SKIN_D} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
  <path d="M112 114 Q120 111 128 114" stroke="#B06055" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  <path d="M112 116 Q120 123 128 116" fill="#C46A5E"/>
  <path d="M113 116 Q120 120 127 116" stroke="#A9594B" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
  <circle cx="100" cy="102" r="6" fill="#E89A8A" opacity=".2"/><circle cx="140" cy="102" r="6" fill="#E89A8A" opacity=".2"/>
  <path d="M108 132 Q120 139 132 132" stroke={SKIN_D} strokeWidth="2" fill="none" opacity=".3"/>
 </>;

 const GroomFace=()=><>
  <path d="M120 52 C140 52 154 64 155 83 C156 101 151 115 142 125 C135 132 127 135 120 135 C113 135 105 132 98 125 C89 115 84 101 85 83 C86 64 100 52 120 52Z" fill={SKIN}/>
  <path d="M155 83 C156 101 151 115 142 125 C148 118 152 105 152 92Z" fill={SKIN_D} opacity=".25"/>
  <path d="M86 92 C86 62 102 44 120 44 C140 44 156 62 156 92 C152 76 142 66 128 62 L124 56 L118 62 C102 62 92 74 86 92Z" fill={HAIR}/>
  <path d="M88 92 Q88 112 96 124 L104 116 Q96 104 96 90Z" fill={HAIR}/>
  <path d="M152 92 Q152 112 144 124 L136 116 Q144 104 144 90Z" fill={HAIR}/>
  <path d="M104 50 Q114 44 126 46 Q138 48 148 58" stroke={HAIR_L} strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7"/>
  <path d="M99 80 Q107 78 115 81" stroke={HAIR} strokeWidth="2.6" fill="none" strokeLinecap="round"/>
  <path d="M125 81 Q133 78 141 80" stroke={HAIR} strokeWidth="2.6" fill="none" strokeLinecap="round"/>
  <path d="M100 88 Q107 84 114 88 Q107 92 100 88Z" fill="#FBF7EE"/>
  <path d="M126 88 Q133 84 140 88 Q133 92 126 88Z" fill="#FBF7EE"/>
  <ellipse cx="107" cy="88" rx="2.8" ry="3.6" fill="#3A2A22"/><ellipse cx="133" cy="88" rx="2.8" ry="3.6" fill="#3A2A22"/>
  <path d="M100 88 Q107 84 114 88" stroke={HAIR} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
  <path d="M126 88 Q133 84 140 88" stroke={HAIR} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
  <path d="M120 92 Q118 102 122 104" stroke={SKIN_D} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  <path d="M118 104 Q120 106 123 104" stroke={SKIN_D} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
  <path d="M112 115 Q120 121 128 115" stroke="#8E4A42" strokeWidth="2" fill="none" strokeLinecap="round"/>
  <path d="M113 118 Q120 121 127 118" stroke="#C27A6C" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity=".6"/>
  <path d="M108 133 Q120 140 132 133" stroke={SKIN_D} strokeWidth="2" fill="none" opacity=".3"/>
 </>;
 const arm=(side:'near'|'far',hand:Pt)=>{
  const s={x:side==='near'?160:80,y:160},bend=side==='near'?-1:1;
  const {elbow,wrist}=ik(s,hand,78,70,bend);
  return <g opacity={side==='far'?.85:1}>
   <circle cx={s.x} cy={s.y} r="9" fill={top}/>
   <path d={`M${s.x} ${s.y} L${elbow.x} ${elbow.y}`} stroke={top} strokeWidth="18" strokeLinecap="round"/>
   <path d={`M${elbow.x-6} ${elbow.y} H${elbow.x+6}`} stroke={topD} strokeWidth="3" opacity=".7"/>
   <path d={`M${elbow.x} ${elbow.y} L${wrist.x} ${wrist.y}`} stroke={SKIN} strokeWidth="11" strokeLinecap="round"/>
   <ellipse cx={wrist.x} cy={wrist.y+2} rx="7" ry="6" fill={SKIN} stroke={SKIN_D} strokeWidth=".8"/>
  </g>;
 };
 return <g data-figure={outfit}>
  <ellipse cx={x} cy={ground} rx={58*scale} ry={9*scale} fill={C.black} opacity=".14"/>
  <g transform={`translate(${x} ${ground}) scale(${scale}) translate(-120 -540)`} style={{filter:`drop-shadow(0 8px 10px ${C.black}33)`}}>
   <g transform={dir<0?'translate(240 0) scale(-1 1)':''}>
    <g transform={`translate(0 ${bob}) rotate(${Math.sin(walk*Math.PI*2)*.5} 120 330)`}>
     <path d="M112 330 L108 430 L108 528" stroke={TROUSER} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M132 330 L132 430 L132 528" stroke={TROUSER} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M108 430 L108 528 M132 430 L132 528" stroke={TROUSER} strokeWidth="22" strokeLinecap="round" opacity=".65"/>
     <path d="M128 340 L128 520" stroke={C.black} strokeWidth="1.2" opacity=".18"/>
     <path d="M96 528 Q108 520 121 528 L122 543 H95Z" fill={SHOE}/>
     <path d="M125 528 Q138 520 150 528 L151 543 H124Z" fill={SHOE}/>
     <path d="M96 540 H122 M125 540 H151" stroke="#1E1B18" strokeWidth="3"/>
     <path d="M99 530 Q108 525 119 530" stroke="#6B4A33" strokeWidth="1.6" fill="none" opacity=".7"/>
     <path d="M128 530 Q138 525 148 530" stroke="#6B4A33" strokeWidth="1.6" fill="none" opacity=".7"/>
     <path d="M102 330 H144 L148 352 H98Z" fill={TROUSER}/>
     <path d="M78 158 Q120 146 162 158 L166 244 Q158 282 164 330 Q120 348 76 330 Q82 282 74 244Z" fill={top} stroke={topD} strokeWidth="1.5"/>
     <path d="M78 158 Q90 154 100 158 L94 330 Q84 330 76 330 Q82 282 74 244Z" fill={topD} opacity=".18"/>
     <path d="M78 162 Q120 150 162 162" stroke={topD} strokeWidth="2" fill="none" opacity=".6"/>
     {outfit==="groom"?<><path d="M112 158 L120 174 L128 158" stroke={C.paperLight} strokeWidth="5" fill="none"/><path d="M120 174 V326" stroke={topD} strokeWidth="1.4" opacity=".65"/>{[0,1,2].map(i=><circle key={i} cx="120" cy={198+i*40} r="2.6" fill={C.paperLight} opacity=".8"/>)}</>:<><path d="M112 158 Q120 169 128 158" stroke={C.paperLight} strokeWidth="4" fill="none"/>{[0,1,2].map(i=><circle key={i} cx="120" cy={192+i*40} r="2.4" fill={C.paper}/>)}</>}
     <path d="M112 154 Q120 170 128 154" stroke={topD} strokeWidth="1.4" fill="none" opacity=".5"/>
     <path d="M106 130 H132 V152 H106Z" fill={SKIN}/>
     <path d="M106 130 H116 V152 H106Z" fill={SKIN_D} opacity=".35"/>
     <g transform={`rotate(${tilt} 120 130)`}>{outfit==='bride'?<BrideFace/>:<GroomFace/>}</g>
     {arm('far',{x:90,y:340})}
     {arm('near',{x:150,y:340})}
    </g>
   </g>
  </g>
 </g>;
};

const Carton=({x,y,w=150,h=100,label,opacity=1,angle=0}:{x:number;y:number;w?:number;h?:number;label:string;opacity?:number;angle?:number})=><g transform={`rotate(${angle} ${x} ${y})`} opacity={opacity}>
 <path d={`M${x-w/2} ${y-h/2} H${x+w/2} V${y+h/2} H${x-w/2}Z`} fill={C.paper} stroke={C.bronzeDark} strokeWidth="2.4"/>
 <path d={`M${x-w/2} ${y-h/2} L${x-w/2+14} ${y-h/2-12} H${x+w/2+14} L${x+w/2} ${y-h/2}Z`} fill={C.paperLight} stroke={C.bronzeDark} strokeWidth="2"/>
 <path d={`M${x} ${y-h/2} V${y+h/2} M${x-w/2} ${y-h/4} H${x+w/2}`} stroke={C.gold} strokeWidth="6" opacity=".85"/>
 <rect x={x-34} y={y+2} width={68} height={26} fill={C.paperLight} stroke={C.bronze} strokeWidth="1.2"/>
 <text x={x} y={y+21} textAnchor="middle" fontFamily={C.font} fontSize={17} fill={C.bronzeDark}>{label}</text>
</g>;

const Van=({x,y,drive=0}:{x:number;y:number;drive?:number})=><g transform={`translate(${x} ${y})`}>
 <path d="M-300 0 Q-300 -70 -230 -80 H40 Q90 -80 120 -30 L150 40 H280 Q310 40 310 76 V150 H-300Z" fill={C.paperLight} stroke={C.blueDark} strokeWidth="8"/>
 <path d="M120 -30 L155 40 H60 V-68 H40 Q90 -68 120 -30Z" fill={C.blueDark}/>
 <rect x="-260" y="-40" width="260" height="100" fill={C.vermilion} opacity=".85"/>
 <text x="-130" y="26" textAnchor="middle" fontSize="34" fontWeight="700" fill={C.paperLight}>搬家</text>
 <path d="M-300 70 H310 V110 H-300Z" fill={C.paperEdge}/>
 <g transform={`translate(-190 150)`}><circle r="48" fill={C.black}/><circle r="22" fill={C.bronze}/><path d={`M0 -36 V-14`} stroke={C.paperLight} strokeWidth="7" strokeLinecap="round" transform={`rotate(${drive*720})`}/></g>
 <g transform={`translate(190 150)`}><circle r="48" fill={C.black}/><circle r="22" fill={C.bronze}/><path d={`M0 -36 V-14`} stroke={C.paperLight} strokeWidth="7" strokeLinecap="round" transform={`rotate(${drive*720})`}/></g>
</g>;

const CalendarCard=({x,y,opacity=1}:{x:number;y:number;opacity?:number})=><g opacity={opacity}>
 <rect x={x} y={y} width="250" height="300" fill={C.paperLight} stroke={C.gold} strokeWidth="3"/>
 <rect x={x+14} y={y+14} width="222" height="52" fill={C.vermilion}/>
 <text x={x+125} y={y+49} textAnchor="middle" fontFamily={C.serif} fontSize="28" fill={C.goldLight}>丙午年 · 入宅</text>
 {[0,1,2,3].map(r=>[0,1,2,3,4].map(c=><circle key={`${r}-${c}`} cx={x+34+c*46} cy={y+100+r*42} r="7" fill={C.paperEdge}/>))}
 <circle cx={x+172} cy={y+184} r="30" fill="none" stroke={C.vermilion} strokeWidth="4"/>
 <text x={x+172} y={y+192} textAnchor="middle" fontSize="20" fill={C.vermilion} fontFamily={C.serif}>吉</text>
 <circle cx={x+200} cy={y+268} r="22" fill={C.vermilion} opacity=".9"/>
 <text x={x+200} y={y+276} textAnchor="middle" fontSize="20" fill={C.goldLight}>丙午</text>
</g>;

const PhotoFigure=({which,x,ground,h=620,angle=0,bob=0}:{which:'man'|'woman';x:number;ground:number;h?:number;angle?:number;bob?:number})=>{
 const ratio=which==='woman'?318/1114:390/1111, w=h*ratio;
 return <g transform={`translate(0 ${bob}) rotate(${angle} ${x} ${ground-h/2})`} filter="url(#figShadow)">
  <image href={staticFile(`ganzhi-modern-life/2d/casual-${which}.png`)} x={x-w/2} y={ground-h} width={w} height={h} preserveAspectRatio="none" style={{filter:'saturate(.94) contrast(1.01)'}}/>
 </g>;
};

const StageOld=({t}:{t:number})=><>
 <rect width="1080" height="1920" fill={C.paperLight}/>
 <rect x="0" y="1500" width="1080" height="420" fill={C.paperEdge}/>
 <rect x="90" y="620" width="250" height="280" fill={`${C.blue}33`} stroke={C.bronzeDark} strokeWidth="9"/>
 <path d="M215 620 V900 M90 760 H340" stroke={C.bronzeDark} strokeWidth="7"/>
 <rect x="70" y="1240" width="360" height="220" rx="32" fill={C.blue} opacity=".55"/>
 <CalendarCard x={760} y={430} opacity={ease(t,112,113.4)}/>
 <PhotoFigure which="woman" x={mix(300,390,ease(t,112.6,116.4))} ground={1500} h={620}/>
 <PhotoFigure which="man" x={mix(720,620,ease(t,112.6,116.4))} ground={1500} h={640}/>
 <Carton x={470} y={1410} w={150} h={105} label="书籍"/>
 <Carton x={640} y={mix(1430,1360,ease(t,114,116.5))} w={145} h={100} label="餐具"/>
 <Carton x={310} y={1440} w={140} h={95} label="衣物"/>
</>;

const StageDay=({t}:{t:number})=><>
 <rect width="1080" height="1920" fill={C.paperLight}/>
 <rect y="1500" width="1080" height="420" fill={C.paperEdge}/>
 <rect y="1060" width="1080" height="14" fill={C.bronzeDark}/>
 {[0,1,2,3].map(i=><rect key={i} x={mix(0,-1080,ease(t,126,131))+i*360} y={1490} width="190" height="18" fill={C.gold}/>)}
 <path d="M0 900 H1080 V1500 H0Z" fill={C.paper}/>
 <rect x="730" y="620" width="350" height="500" fill={C.paperEdge} stroke={C.bronzeDark} strokeWidth="4"/>
 <Van x={mix(900,1220,ease(t,126,131))} y={1180} drive={t}/>
 <PhotoFigure which="woman" x={mix(280,360,ease(t,119.2,123.2))} ground={1500} h={620}/>
 <PhotoFigure which="man" x={mix(540,630,ease(t,123.2,126.4))} ground={1500} h={640}/>
 <Carton x={mix(420,820,ease(t,119.5,123.5))} y={mix(1430,1280,ease(t,119.5,123.5))} w={150} h={100} label="书籍" opacity={1-ease(t,123.4,124.2)}/>
 <Carton x={mix(250,780,ease(t,123.6,126.6))} y={mix(1420,1280,ease(t,123.6,126.6))} w={145} h={95} label="餐具" opacity={1-ease(t,126.5,127.2)}/>
 <CalendarCard x={760} y={430} opacity={1-ease(t,126,128)}/>
</>;

const StageHome=({t}:{t:number})=><>
 <rect width="1080" height="1920" fill={C.paperLight}/>
 <rect y="1490" width="1080" height="430" fill={C.paperEdge}/>
 <rect x="120" y="580" width="300" height="300" fill={`${C.blue}33`} stroke={C.bronzeDark} strokeWidth="9"/>
 <path d="M270 580 V880 M120 730 H420" stroke={C.bronzeDark} strokeWidth="7"/>
 <rect x="700" y="700" width="260" height="760" fill={C.bronzeDark}/>
 <rect x="730" y="740" width="200" height="690" fill={C.paper}/>
 <rect x="70" y="1220" width="330" height="230" rx="30" fill={C.blue} opacity=".45"/>
 <g opacity={ease(t,137,139)}><title>安居</title><g transform={`translate(570 590) scale(1 ${ease(t,137,139)}) translate(-570 -590)`}>
  <rect x="480" y="400" width="180" height="380" fill={C.paperLight} stroke={C.gold} strokeWidth="6"/>
  <text x="570" y="480" textAnchor="middle" fontFamily={C.serif} fontSize="82" fill={C.ink}>安</text>
  <text x="570" y="570" textAnchor="middle" fontFamily={C.serif} fontSize="82" fill={C.ink}>居</text>
  <text x="570" y="640" textAnchor="middle" fontFamily={C.serif} fontSize="24" fill={C.vermilion}>丙午年</text>
  <rect x="612" y="670" width="52" height="52" fill={C.vermilion}/>
  <text x="638" y="706" textAnchor="middle" fontFamily={C.serif} fontSize="24" fill={C.goldLight}>安</text>
  </g>
 </g>
 <g opacity={1-ease(t,132.4,133.2)}>
  {[0,1,2].map(i=><rect key={i} x={900+i*80} y={1050+i*150} width={220} height={7} rx={3} fill={C.paperLight} opacity={.55} transform={`rotate(-6 ${900+i*80} ${1050+i*150})`}/>)}
 </g>
 <PhotoFigure which="woman" x={mix(1220,560,ease(t,130.8,132.4))} ground={1500} h={620}/>
 <PhotoFigure which="man" x={mix(1340,790,ease(t,131.0,132.6))} ground={1500} h={640}/>
 <Carton x={mix(760,420,ease(t,131,136))} y={1420} w={150} h={100} label="书籍"/>
 <Carton x={mix(890,590,ease(t,131,136))} y={1440} w={145} h={95} label="餐具"/>
 <Carton x={760} y={1450} w={140} h={90} label="衣物"/>
</>;

export const SimpleMove=({t}:{t:number})=>{
 const old=1-ease(t,118.2,119.8), day=Math.min(ease(t,118.2,119.8),1-ease(t,130.2,131.8)), home=ease(t,130.2,131.8);
 return <div data-scene="simple-move" style={{position:'absolute',inset:0,overflow:'hidden',zIndex:15,background:C.paperLight}}>
  <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position:'absolute',inset:0}}>
   <defs><filter id="figShadow" x="-30%" y="-20%" width="160%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="7" floodColor="#201A16" floodOpacity=".3"/></filter></defs>
   {old>0&&<g opacity={old}><StageOld t={t}/></g>}
   {day>0&&<g opacity={day}><StageDay t={t}/></g>}
   {home>0&&<g opacity={home}><StageHome t={t}/></g>}
  </svg>
  <div style={{position:'absolute',inset:0,backgroundImage:`url(${staticFile('ganzhi-modern-life/2d/paper-grain.png')})`,backgroundSize:'cover',opacity:.22,mixBlendMode:'multiply',pointerEvents:'none'}}/>
  <div style={{position:'absolute',inset:0,background:`linear-gradient(180deg,${C.black}18 0%,transparent 20%,transparent 76%,${C.black}33 100%)`}}/>
 </div>;
};
