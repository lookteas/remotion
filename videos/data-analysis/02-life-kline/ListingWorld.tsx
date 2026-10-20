import React from 'react';
import {useCurrentFrame} from 'remotion';
import {lifeListingTheme as C} from '../../../src/config/theme';
import {lerp,rand} from '../../../src/lib/anim';
import {Chart,step} from './ListingChart';
import {OpportunityGate} from './OpportunityGate';
import {ListingMaterials,LivingReserve,Portfolio,RestAndMove,Token} from './ListingObjects';

/** Connected lateral exits finish before the next caption starts. The chart persists. */
export const stagePose=(f:number,start:number,end:number)=>{
  const enter=step(f,start,start+30),exit=step(f,end-45,end);
  return {x:540+160*(1-enter)-760*exit,y:1110,s:1,opacity:f<start||f>=end?0:enter*(1-exit)};
};
const HtmlObject=({x,y,scale,width,height,opacity=1,children}:{x:number;y:number;scale:number;width:number;height:number;opacity?:number;children:React.ReactNode})=><div style={{position:'absolute',left:x-width/2,top:y-height/2,width,height,scale:String(scale),opacity,transformOrigin:'center'}}>{children}</div>;

/** One persistent chart and the actual results of self-investment, with no machine chassis. */
export const ListingWorld=()=>{
  const f=useCurrentFrame(),body=stagePose(f,630,990),skills=stagePose(f,990,1350),cash=stagePose(f,1350,1770);
  return <>
    <svg width="1080" height="1920" style={{position:'absolute',inset:0}}>
      <ListingMaterials/>
      <rect width="1080" height="1920" fill={C.ink}/>
      <ellipse cx="560" cy="1090" rx="650" ry="800" fill="url(#listing-light)"/>
      {Array.from({length:35},(_,i)=>{const x=rand(i,8)*1080,y=(rand(i,12)*1920-f*(.07+rand(i,6)*.09)+1920)%1920;return <circle key={i} cx={x} cy={y} r={.6+rand(i,3)} fill={C.goldLight} opacity={.03+rand(i,5)*.12}/>;})}
    </svg>
    <Chart frame={f}/>
    <svg width="1080" height="1920" style={{position:'absolute',inset:0,overflow:'visible'}}>
      <g opacity={step(f,240,275)*(1-step(f,400,435))}>
        <path d="M260,1350Q540,1307 820,1350" fill="none" stroke={C.gold} strokeWidth="2"/>
        <text x="540" y="1390" textAnchor="middle" fill={C.goldLight} fontSize="52">低价 ≠ 低价值</text>
      </g>
      {/* Actual input to the metaphor: time, effort, resources. They move into the first activity. */}
      <g opacity={step(f,450,480)*(1-step(f,620,670))}>
        {['时间','精力','资源'].map((label,i)=>{const move=step(f,550+i*15,650+i*7);return <Token key={label} label={label} x={lerp(300+i*240,540,move)} y={lerp(1120,1040,move)} scale={lerp(1.3,.65,move)}/>;})}
        <text x="540" y="1300" textAnchor="middle" fill={C.secondary} fontSize="39">把投入，转回自己身上</text>
      </g>
      <g opacity={body.opacity} transform={`translate(${body.x} ${body.y}) scale(${body.s})`}><RestAndMove frame={f}/></g>
      <g opacity={cash.opacity} transform={`translate(${cash.x} ${cash.y}) scale(${cash.s})`}><LivingReserve frame={f}/></g>
      <OpportunityGate frame={f}/>
      <g opacity={step(f,2310,2370)}>
        <path d="M830,1080Q830,1190 570,1210" fill="none" stroke={C.gold} strokeWidth="2"/>
        <text x="540" y="1250" textAnchor="middle" fill={C.goldLight} fontSize="36">仍在低位，也能开始投入自己</text>
      </g>
    </svg>
    <HtmlObject x={skills.x} y={skills.y} scale={skills.s} width={700} height={500} opacity={skills.opacity}><Portfolio frame={f}/></HtmlObject>

  </>;
};
