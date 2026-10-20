import {lifeListingTheme as C} from '../../../src/config/theme';
import {lerp, progress, rand} from '../../../src/lib/anim';

export const step=(f:number,a:number,b:number)=>progress(f,a,b-a,t=>t*t*(3-2*t));
export const linear=(f:number,a:number,b:number)=>progress(f,a,b-a,t=>t);
// A hand-authored scenario, not prices, history, an estimate or a future forecast.
// Screen y grows downward: several sustained rebounds interrupt the lower lows.
const closes=[620,590,550,570,635,710,760,735,650,610,660,740,820,865,830,750,700,760,850,940,995,950,870,845,920,1030,1100,1148];
export const latest={x:830,y:1148};
export const Chart=({frame:f,showIncidents=true}:{frame:number;showIncidents?:boolean})=>{
  const compact=step(f,250,510)*(1-.78*step(f,2170,2370));
  const sx=lerp(1,.94,compact),sy=lerp(1,.39,compact),tx=540*(1-sx),ty=C.chartOffsetY*(1-compact)+lerp(0,300,compact);
  const label=(text:string,x:number,y:number,size:number,color:string=C.secondary,anchor:'start'|'middle'|'end'='start')=><text x={tx+x*sx} y={ty+y*sy} textAnchor={anchor} fontSize={size*lerp(1,.8,compact)} fill={color}>{text}</text>;
  return <svg width="1080" height="1920" style={{position:'absolute',inset:0,overflow:'visible'}}>
    <defs><linearGradient id="listing-gold"><stop stopColor={C.goldLight}/><stop offset=".5" stopColor={C.gold}/><stop offset="1" stopColor={C.edge}/></linearGradient></defs>
    <g transform={`translate(${tx} ${ty}) scale(${sx} ${sy})`}>
      {[600,800,1000,1200].map(y=><line key={y} x1="130" x2="965" y1={y} y2={y} stroke={C.gold} opacity=".12"/>)}
      <path d="M120,550V1260H976M964,1251L978,1260L964,1269" fill="none" stroke={C.muted} strokeWidth="2"/>
      {closes.map((close,i)=>{
        const open=i?closes[i-1]:640,amount=i<14?1:step(f,(i-14)*128/14,(i-13)*128/14),end=lerp(open,close,amount);
        const x=128+i*26,top=Math.min(open,end),height=Math.max(5,Math.abs(end-open));
        const down=close>open,color=i===27?C.goldLight:down?C.vermilion:C.ivory;
        return amount>0?<g key={i} opacity={i===27?1:.86}>
          <line x1={x} x2={x} y1={top-12-rand(i,2)*22} y2={top+height+12+rand(i,3)*17} stroke={color} strokeWidth="2"/>
          <rect x={x-8} y={top} width="16" height={height} fill={color}/>
          <path d={`M${x+8},${top}l3,-3v${height}l-3,3`} fill={C.edge} opacity=".65"/>
        </g>:null;
      })}
      <g opacity={step(f,108,145)}>
        <path d="M830,1185V1210" stroke={C.goldLight} strokeWidth="2"/>
        <line x1="846" x2="965" y1="1148" y2="1148" stroke={C.muted} strokeDasharray="5 9"/>
      </g>
      {/* Actual incident labels anchor the falling candles; not a mysterious isolated object. */}
      <g opacity={showIncidents?step(f,70,100)*(1-step(f,300,340)):0}>
        <path d="M650,890L674,820H810" fill="none" stroke={C.secondary}/>
        <text x="682" y="800" fill={C.ivory} fontSize="35">收入中断</text>
        <text x="610" y="1115" fill={C.secondary} fontSize="32">自我怀疑</text>
      </g>
    </g>
    {label('人生K线',130,458,42,C.goldLight)}
    {label('外在处境 · 情境示意',130,508+compact*25,26)}
    <g opacity={step(f,108,145)}>{label('现在',830,1240,31,C.goldLight,'middle')}{label('未来未写',920,1088,25,C.muted,'middle')}</g>
    {label('过去',150,1310,28)}{label('时间',940,1310,28,C.secondary,'end')}
  </svg>;
};
