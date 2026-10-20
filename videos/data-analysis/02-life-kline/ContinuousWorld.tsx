import React from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {lifeKlineTheme as C} from '../../../src/config/theme';
import {lerp, progress, rand} from '../../../src/lib/anim';
import {cameraAt} from '../../../src/lib/camera';
import {Beam, LifeNode, OpportunityMatrix, project, rotate, Solid, V3, View} from './Geometry';

const ease=Easing.inOut(Easing.cubic);
const p=(f:number,at:number,duration:number)=>progress(f,at,duration,ease);

/** The same camera and objects survive every chapter boundary. */
export const worldState=(f:number)=>{
  const camera=cameraAt(f,[
    {at:0,x:570,y:1040,scale:1.25},{at:35,x:510,y:1080,scale:1.6},
    {at:72,x:540,y:1160,scale:1.45},{at:145,x:540,y:1010,scale:1.08},
    {at:250,x:540,y:1060,scale:1.15},{at:335,x:540,y:1030,scale:1.25},
    {at:450,x:580,y:1040,scale:1.50},{at:540,x:520,y:1080,scale:1.75},
    {at:630,x:530,y:1030,scale:1.45},{at:720,x:560,y:1020,scale:1.60},
    {at:810,x:550,y:1020,scale:1.38},{at:910,x:510,y:1070,scale:1.5},
    {at:980,x:430,y:1060,scale:1.05},{at:1034,x:340,y:1080,scale:.98},
    {at:1140,x:380,y:1100,scale:.95},{at:1240,x:470,y:1110,scale:1.02},
    {at:1319,x:490,y:1110,scale:1.06},
  ]);
  const yaw=-.38+p(f,150,830)*Math.PI*2;
  const pitch=.18+p(f,85,170)*.54-p(f,330,200)*.4+p(f,600,240)*.12;
  const tremble=(1-p(f,465,115))*p(f,160,80)*9;
  const drop=p(f,0,66);
  const rebound=f>66?Math.sin((f-66)/11)*Math.exp(-(f-66)/24)*35:0;
  const center:V3=[Math.sin(f*.19)*tremble,lerp(320,0,drop)+rebound+p(f,450,150)*35,0];
  const shake=f>=66&&f<90?Math.sin(f*2.5)*(1-(f-66)/24)*9:0;
  const view:View={x:camera.x+shake,y:camera.y+shake*.4,scale:camera.scale,yaw,pitch};
  return {view,center,drop};
};

/** Thick annular material: the fragments close into a load-bearing structure. */
const Ribbon:React.FC<{view:View;radius:number;rotation:V3;reveal:number;width?:number;color?:string;opacity?:number}>=({view,radius,rotation,reveal,width=24,color=C.green,opacity=1})=>{
  const segments=Array.from({length:64},(_,i)=>{
    const a=i/64*Math.PI*2,b=(i+.94)/64*Math.PI*2;
    const vertices:V3[]=[[Math.cos(a)*(radius-width/2),0,Math.sin(a)*(radius-width/2)],
      [Math.cos(b)*(radius-width/2),0,Math.sin(b)*(radius-width/2)],
      [Math.cos(b)*(radius+width/2),0,Math.sin(b)*(radius+width/2)],
      [Math.cos(a)*(radius+width/2),0,Math.sin(a)*(radius+width/2)]];
    const pts=vertices.map(v=>project(rotate(v,...rotation),view));
    const underside=vertices.slice().reverse().map(v=>project(rotate([v[0],v[1]-12,v[2]],...rotation),view));
    return {i,pts,underside,z:pts.reduce((s,v)=>s+v.z,0)/4};
  }).sort((a,b)=>b.z-a.z);
  return <g opacity={opacity}>{segments.map(({i,pts,underside})=><g key={i} opacity={Math.min(1,Math.max(0,(reveal-i/64)*64))}>
    <polygon points={[...pts,...underside].map(q=>`${q.x},${q.y}`).join(' ')} fill={C.steel}/>
    <polygon points={pts.map(q=>`${q.x},${q.y}`).join(' ')} fill={color} fillOpacity={.45+(Math.sin(i*.3)+1)*.2} stroke={C.blueLight} strokeWidth={.6}/>
  </g>)}</g>;
};

const Impact:React.FC<{frame:number;at:number;view:View;center?:V3;power?:number}>=({frame,at,view,center=[0,0,0],power=1})=>{
  const t=frame-at;if(t<0||t>65)return null;
  const origin=project(center,view);
  return <g opacity={(1-t/65)*power}>
    {[0,1,2].map(i=><ellipse key={i} cx={origin.x} cy={origin.y+40} rx={Math.max(0,t*17-i*100)} ry={Math.max(0,t*5-i*30)} fill="none" stroke={i?C.blue:C.green} strokeWidth={i?2:5}/>)}
    {Array.from({length:65},(_,i)=>{
      const a=rand(i,71)*Math.PI*2,d=t*(5+rand(i,72)*13);
      const x=origin.x+Math.cos(a)*d,y=origin.y+Math.sin(a)*d*.6+t*t*.06;
      return <line key={i} x1={x} y1={y} x2={x-Math.cos(a)*22} y2={y-Math.sin(a)*12} stroke={i%4?C.green:C.white} strokeWidth={1+rand(i,73)*3}/>;
    })}
  </g>;
};

const Atmosphere:React.FC<{frame:number;view:View}>=({frame:f,view})=>{
  const speed=(1-p(f,70,70))*14+p(f,965,40)*(1-p(f,1035,40))*12;
  const horizon=1040-p(f,140,190)*150;
  return <>
    <defs>
      <radialGradient id="life-space"><stop stopColor={C.steel}/><stop offset=".55" stopColor={C.deep}/><stop offset="1" stopColor={C.bg}/></radialGradient>
      <radialGradient id="life-matrix-glow"><stop stopColor={C.green} stopOpacity={.42}/><stop offset="1" stopColor={C.green} stopOpacity={0}/></radialGradient>
      <radialGradient id="life-impact-glow"><stop stopColor={C.blueLight} stopOpacity={.55}/><stop offset="1" stopColor={C.blue} stopOpacity={0}/></radialGradient>
    </defs>
    <rect width={1080} height={1920} fill={C.bg}/><ellipse cx={view.x} cy={view.y} rx={900} ry={1000} fill="url(#life-space)" opacity={.9}/>
    {Array.from({length:65},(_,i)=>{
      const x=rand(i,8)*1320-120,y=(rand(i,9)*2300+f*(.3+rand(i,10)*.5))%2300-180;
      return <line key={i} x1={x} y1={y} x2={x-speed*(x-540)/100} y2={y+speed*(8+rand(i,12)*11)} stroke={C.blueLight} strokeWidth={i%5?1:2} opacity={.07+rand(i,14)*.20}/>;
    })}
    <g opacity={p(f,85,100)*.2}>
      {Array.from({length:15},(_,i)=>{const x=(i-7)*130+Math.sin(view.yaw ?? 0)*80;return <path key={i} d={`M ${540+x*.1} ${horizon} Q ${540+x*.4} 1250 ${540+x*2} 1850`} fill="none" stroke={C.blue} strokeWidth={1.4}/>;})}
      {Array.from({length:10},(_,i)=>{const q=((i*100+f*.65)%1000)/1000;return <path key={i} d={`M -100 ${horizon+q*q*1000} Q 540 ${horizon+q*q*870} 1180 ${horizon+q*q*1000}`} fill="none" stroke={C.blueLight} strokeWidth={.8}/>;})}
    </g>
  </>;
};

const CandleDebris:React.FC<{frame:number;view:View}>=({frame:f,view})=>{
  const release=p(f,90,110),gather=p(f,240,185),fade=1-p(f,410,65);
  return <g opacity={fade}>{Array.from({length:22},(_,i)=>{
    const a=i/22*Math.PI*2,x=(i%7-3)*175,y=180+Math.sin(i*1.6)*270+(i%3)*140;
    const from:V3=[x,y,-250+Math.floor(i/7)*210];
    const far:V3=[Math.cos(a)*580,Math.sin(a)*340-70,Math.sin(a*2)*220];
    const dest=rotate([Math.cos(a)*225,0,Math.sin(a)*225],.7,.1,0);
    const pos=from.map((v,j)=>lerp(lerp(v,far[j],release),dest[j],gather)) as V3;
    const height=lerp(110+rand(i,22)*170,30,gather);
    return <g key={i} opacity={.35+rand(i,24)*.55}>
      <Beam a={[pos[0],pos[1]-height*.8,pos[2]]} b={[pos[0],pos[1]+height*.8,pos[2]]} view={view} width={1.4} color={C.blue} opacity={1-release}/>
      <Solid center={pos} size={[lerp(60,45,gather),height,55]} rotation={[release*i*.16,release*i*.2,release*i*.1]} view={view} accent={i%4?C.blue:C.green}/>
    </g>;
  })}</g>;
};

const Body:React.FC<{frame:number;view:View}>=({frame:f,view})=>{
  const r=p(f,340,180),lock=p(f,470,110);
  return <g opacity={p(f,330,60)}>
    <Ribbon view={view} radius={225} rotation={[.7+Math.sin(f*.009)*(1-lock)*.16,0,f*.0015]} reveal={r} width={30}/>
    {[-1,1].map(side=>{const arrival=p(f,450+(side+1)*10,80);const v:V3=[side*lerp(600,125,arrival),lerp(-180,-80,arrival),0];return <Solid key={side} center={v} size={[60,80,125]} rotation={[0,side*(1-arrival),side*(1-arrival)*.7]} view={view} accent={C.blueLight} opacity={p(f,445,25)}/>;})}
    <Impact frame={f} at={540} view={view} power={.35}/>
  </g>;
};

const Skills:React.FC<{frame:number;view:View}>=({frame:f,view})=>{
  const arrival=p(f,640,155);
  return <g opacity={p(f,622,25)}>
    <Ribbon view={view} radius={280} rotation={[1.1,.4,f*.0012]} reveal={arrival} color={C.blueLight} width={19}/>
    {Array.from({length:8},(_,i)=>{
      const t=p(f,640+i*12,60),a=i/8*Math.PI*2,target=rotate([Math.cos(a)*278,0,Math.sin(a)*278],1.1,.4,f*.0012);
      const center:V3=[lerp((i%2?1:-1)*800,target[0],t),lerp(450-i*80,target[1],t),lerp(360,target[2],t)];
      return <Solid key={i} center={center} size={[42,54,58]} view={view} rotation={[a*(1-t),a+f*.0012,0]} accent={t>.9?C.green:C.blueLight}/>;
    })}
    <Impact frame={f} at={784} view={view} power={.28}/>
  </g>;
};

const CashFlow:React.FC<{frame:number;view:View}>=({frame:f,view})=>{
  const open=p(f,810,65),reserve=p(f,855,115);
  return <g opacity={open}>
    <Ribbon view={view} radius={340} rotation={[-.25,.6,0]} reveal={reserve} color={C.blue} width={40} opacity={.75}/>
    {Array.from({length:38},(_,i)=>{
      const age=f-810-i*2,enter=p(age,0,60),a=i/38*Math.PI*2+(f-810)*.004;
      const target=rotate([Math.cos(a)*340,0,Math.sin(a)*340],-.25,.6,0);
      const center:V3=[lerp(-950-i*10,target[0],enter),lerp(350,target[1],enter),lerp(0,target[2],enter)];
      return <Solid key={i} center={center} size={[20,15,42]} rotation={[0,-a,0]} view={view} accent={C.green} opacity={progress(age,0,15)}/>;
    })}
    {Array.from({length:6},(_,i)=>{const q=((f-810+i*18)%135)/135,a=q*Math.PI*2,v=rotate([Math.cos(a)*340,0,Math.sin(a)*340],-.25,.6,0);return <Beam key={i} a={v} b={[v[0]*.35,v[1]*.35+35,v[2]*.35]} view={view} width={1.5} opacity={reserve*.28}/>;})}
  </g>;
};

const Opportunity:React.FC<{frame:number;view:View}>=({frame:f,view})=>{
  const move=p(f,985,55),shrink=p(f,1140,120);
  const center:V3=[lerp(1700,430,move),lerp(700,135,move),lerp(1100,0,move)];
  const angle=lerp(-5,.7,move)+(f>1040?(f-1040)*.001:0),fade=p(f,970,25)*(1-shrink*.58);
  return <g opacity={fade}>
    {f<1040&&[1,2,3].map(i=><OpportunityMatrix key={i} center={[center[0]+i*100,center[1]+i*50,center[2]+i*90]} view={view} size={300} angle={angle-i*.1} opacity={.07*(1-move)}/>)}
    <OpportunityMatrix center={center} view={view} size={300} angle={angle}/>
    <Impact frame={f} at={1040} view={view} center={center} power={.55}/>
    <g opacity={p(f,1030,25)*(1-shrink)}><text x={project(center,view).x} y={project(center,view).y-220} fill={C.green} textAnchor="middle" fontSize={38} fontWeight={650}>机会</text></g>
  </g>;
};

export const ContinuousWorld:React.FC=()=>{
  const frame=useCurrentFrame(),{view,center,drop}=worldState(frame),node=project(center,view);
  return <svg width={1080} height={1920} style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Atmosphere frame={frame} view={view}/><CandleDebris frame={frame} view={view}/>
    <g opacity={1-p(frame,92,65)}>
      <Solid center={[0,center[1]-180,0]} size={[160,310,140]} rotation={[0,0,(1-drop)*-.13]} view={view} accent={C.green}/>
      <Beam a={[0,center[1]-390,0]} b={[0,center[1]+60,0]} view={view} width={4} color={C.green}/>
    </g>
    <ellipse cx={view.x} cy={view.y+250} rx={300+p(frame,70,180)*230} ry={60} fill="url(#life-impact-glow)" opacity={p(frame,55,20)*.6}/>
    <Body frame={frame} view={view}/><Skills frame={frame} view={view}/><CashFlow frame={frame} view={view}/>
    <Impact frame={frame} at={66} view={view}/>
    <LifeNode center={center} view={view} frame={frame} radius={92} stable={p(frame,465,115)}/>
    <text x={node.x} y={node.y-145*node.scale} textAnchor="middle" fill={C.white} fontSize={36} fontWeight={600} opacity={p(frame,40,20)*(1-p(frame,1190,90)*.5)}>你</text>
    <Opportunity frame={frame} view={view}/>
  </svg>;
};

