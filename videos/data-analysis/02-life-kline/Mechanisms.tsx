import React, {useId} from 'react';
import {lifeKlineTheme as C} from '../../../src/config/theme';
import {assetState, ease, expenses, income, ramp, reserveAt} from './motion';

/** All mechanisms share one hinged chassis. Coordinates here are millimetre-like local units. */
export const Material=()=> <defs>
  <linearGradient id="asset-metal" x1="0" x2="1" y2="1"><stop stopColor={C.secondary}/><stop offset=".24" stopColor={C.steel}/><stop offset=".5" stopColor={C.blueLight}/><stop offset=".7" stopColor={C.darkSteel}/><stop offset="1" stopColor={C.secondary}/></linearGradient>
  <linearGradient id="asset-cell" x2="0" y2="1"><stop stopColor={C.white}/><stop offset=".18" stopColor={C.green}/><stop offset="1" stopColor={C.blue}/></linearGradient>
  <radialGradient id="asset-bg"><stop stopColor={C.steel}/><stop offset="1" stopColor={C.bg}/></radialGradient>
  <radialGradient id="life-matrix-glow"><stop stopColor={C.green} stopOpacity=".3"/><stop offset="1" stopColor={C.green} stopOpacity="0"/></radialGradient>
  <filter id="asset-shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="8" stdDeviation="9" floodColor={C.black} floodOpacity=".7"/></filter>
</defs>;

export const Panel=({name,children}:{name:string;children:React.ReactNode})=><g>
  <rect x="-153" y="-255" width="306" height="510" rx="14" fill={C.deep} stroke="url(#asset-metal)" strokeWidth="5"/>
  <path d="M-138,238V-239H138" fill="none" stroke={C.secondary} strokeOpacity=".26" strokeWidth="3"/>
  {[-133,133].flatMap(x=>[-232,232].map(y=><g key={`${x}-${y}`}><circle cx={x} cy={y} r="5" fill={C.secondary}/><path d={`M${x-3},${y}h6`} stroke={C.deep}/></g>))}
  <text y="-284" textAnchor="middle" fontSize="40" fontWeight="750" fill={C.white}>{name}</text>
  {children}
</g>;

export const Battery=({frame:f}:{frame:number})=>{
  const {charge}=assetState(f);const stable=ease(f,760,855);
  const drive=f<760?Math.max(0,Math.sin(f*.045))*ramp(f,610,760):1;
  return <Panel name="身体">
    <rect x="-30" y="-195" width="60" height="21" rx="5" fill="url(#asset-metal)"/>
    <rect x="-91" y="-178" width="182" height="333" rx="27" fill={C.deep} stroke="url(#asset-metal)" strokeWidth="10" filter="url(#asset-shadow)"/>
    <rect x="-77" y="-162" width="154" height="302" rx="15" fill={C.bg}/>
    <rect x="-70" y={133-286*charge} width="140" height={286*charge} rx="8" fill="url(#asset-cell)"/>
    {Array.from({length:7},(_,i)=><line key={i} x1="-70" x2="70" y1={-120+i*38} y2={-120+i*38} stroke={C.deep} strokeWidth="7"/>)}
    <path d="M-42,-151L-42,119" stroke={C.white} opacity=".2" strokeWidth="12"/>
    <path d="M0,160V191H144" fill="none" stroke={C.steel} strokeWidth="14"/>
    <path d="M0,160V191H144" fill="none" stroke={C.green} strokeWidth="5" opacity={.15+drive*.85}/>
    {Array.from({length:5},(_,i)=>{const x=((f*(stable?1.7:.5)+i*32)%160);return <circle key={i} cx={x} cy="191" r="4" fill={C.white} opacity={drive}/>;})}
    <text y="217" textAnchor="middle" fontSize="23" fill={C.secondary}>{f<855?'恢复':'持续供能'}</text>
  </Panel>;
};

const toothPath=()=>Array.from({length:80},(_,i)=>{const r=i%4===0||i%4===3?55:66;const a=i*Math.PI/40;return `${i?'L':'M'}${Math.cos(a)*r},${Math.sin(a)*r}`;}).join(' ')+'Z';
const Gear=({x,y,angle,opacity=1}:{x:number;y:number;angle:number;opacity?:number})=><g transform={`translate(${x} ${y}) rotate(${angle})`} opacity={opacity}>
  <path d={toothPath()} transform="translate(0 7)" fill={C.black}/>
  <path d={toothPath()} fill="url(#asset-metal)" stroke={C.secondary} strokeWidth="1.3"/>
  <circle r="43" fill={C.surface} stroke={C.muted} strokeWidth="3"/>
  {[0,120,240].map(a=><rect key={a} x="-10" y="-38" width="20" height="27" rx="6" fill={C.deep} transform={`rotate(${a})`}/>)}
  <circle r="13" fill="url(#asset-metal)" stroke={C.white}/><circle r="5" fill={C.darkSteel}/>
</g>;

export const Skills=({frame:f}:{frame:number})=>{
  const id=useId().replace(/:/g,'');const assemble=ease(f,940,1060),engaged=ramp(f,1060,1072);
  // The gear angles start from a shared tooth phase; only the input rotates before engagement.
  const angle=Math.max(0,f-855)*.9,output=Math.max(0,f-1060)*.9;
  const push=ease(f,1100,1170);
  return <Panel name="技能">
    <path d="M-144,191H-110V-22H-104" fill="none" stroke={C.steel} strokeWidth="14"/>
    <path d="M-144,191H-110V-22H-104" fill="none" stroke={C.green} strokeWidth="4" opacity={ease(f,855,920)}/>
    <g transform="translate(0 -20) scale(.86)">
      <Gear x={-120} y={0} angle={angle}/><Gear x={120} y={0} angle={output}/>
      <circle r="57" fill="none" stroke={C.muted} strokeDasharray="5 7" opacity={1-assemble}/>
      {[0,1,2,3].map(i=>{const a=i*Math.PI/2,dist=95*(1-assemble),dx=Math.cos(a+.7)*dist,dy=Math.sin(a+.7)*dist;
        return <g key={i} transform={`translate(${dx} ${dy})`}>
          <defs><clipPath id={`${id}-${i}`}><path d={`M0,0L${Math.cos(a)*100},${Math.sin(a)*100}A100,100 0 0 1 ${Math.cos(a+Math.PI/2)*100},${Math.sin(a+Math.PI/2)*100}Z`}/></clipPath></defs>
          <g transform={`rotate(${-output+9})`} clipPath={`url(#${id}-${i})`}><Gear x={0} y={0} angle={0}/></g>
        </g>;
      })}
    </g>
    <path d="M103,-20V109H-80" fill="none" stroke={C.steel} strokeWidth="10"/>
    <path d="M103,-20V109H-80" fill="none" stroke={C.green} strokeWidth="3" opacity={engaged}/>
    <rect x="-110" y="143" width="220" height="13" rx="6" fill="url(#asset-metal)"/>
    <g transform={`translate(${-78+push*125} 109)`}>
      <rect x="-23" y="-22" width="46" height="50" rx="7" fill={C.blue} stroke={C.blueLight} strokeWidth="3"/>
      <path d="M-12,1L-2,11L15,-10" fill="none" stroke={C.white} strokeWidth="4" opacity={push}/>
    </g>
    <text y="217" textAnchor="middle" fontSize="23" fill={C.secondary}>{f<1060?'练习 · 组装':'可用 · 输出'}</text>
  </Panel>;
};

const Coin=({x,y,opacity=1}:{x:number;y:number;opacity?:number})=><g transform={`translate(${x} ${y})`} opacity={opacity}>
  <path d="M-16,-3V6A16,8 0 0 0 16,6V-3" fill={C.steel} stroke={C.blueLight}/>
  <ellipse rx="16" ry="8" cy="-3" fill="url(#asset-metal)" stroke={C.blueLight}/>
  <ellipse rx="10" ry="4" cy="-3" fill="none" stroke={C.white} strokeOpacity=".55"/>
</g>;

export const Cash=({frame:f}:{frame:number})=>{
  const reserve=reserveAt(f);const stopped=f>=1480;
  return <Panel name="现金流">
    <path d="M-117,-205V-125H-65V80" fill="none" stroke={C.steel} strokeWidth="18"/>
    <path d="M-117,-205V-125H-65V80" fill="none" stroke={stopped?C.muted:C.blueLight} strokeWidth="3"/>
    <path d="M64,90H115V177" fill="none" stroke={C.steel} strokeWidth="20"/>
    <path d="M64,90H115V177" fill="none" stroke={C.blueLight} strokeWidth="3"/>
    <rect x="-93" y="-87" width="186" height="227" rx="9" fill={C.bg} stroke="url(#asset-metal)" strokeWidth="8"/>
    {Array.from({length:reserve},(_,i)=><Coin key={i} x={-51+(i%3)*51} y={121-Math.floor(i/3)*26}/>)}
    {income.map((t,i)=>{const p=ramp(f,t,t+30),slot=reserveAt(t+29),x=-51+(slot%3)*51,y=121-Math.floor(slot/3)*26;
      return p>0&&p<1?<Coin key={i} x={-117+(x+117)*ease(f,t,t+30)} y={-200+(y+200)*p}/>:null;})}
    {expenses.map(t=>{const p=ramp(f,t,t+36),slot=reserveAt(t-1)-1,x=-51+(slot%3)*51,y=121-Math.floor(slot/3)*26;
      return p>0&&p<1?<Coin key={t} x={x+(115-x)*Math.min(1,p*2)} y={y+(90-y)*Math.min(1,p*2)+110*Math.max(0,p*2-1)}/>:null;})}
    <path d="M-80,-74V125M-72,-74V125" stroke={C.white} strokeOpacity=".12" strokeWidth="4"/>
    <text x="-115" y="-218" textAnchor="middle" fill={stopped?C.secondary:C.blueLight} fontSize="20">{stopped?'流入暂停':'流入'}</text>
    <text x="110" y="212" textAnchor="middle" fill={C.secondary} fontSize="23">支出</text>
    <text y="175" textAnchor="middle" fill={C.green} fontSize="23">留存</text>
    <path d="M-96,90H-116V191H-150" fill="none" stroke={C.steel} strokeWidth="8"/>
  </Panel>;
};
