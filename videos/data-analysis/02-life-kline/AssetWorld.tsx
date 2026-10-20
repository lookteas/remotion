import React from 'react';
import {useCurrentFrame} from 'remotion';
import {lifeKlineTheme as C} from '../../../src/config/theme';
import {add, Beam, LifeNode, OpportunityMatrix, project, rotate, Solid, V3, View} from './Geometry';
import {Battery, Cash, Material, Skills} from './Mechanisms';
import {assetState, ease, viewAt} from './motion';

/** This drawing plane shares its physical shell's camera and hinge transform. */
const Plane=({center,view,angle=0,children}:{center:V3;view:View;angle?:number;children:React.ReactNode})=>{
  const p=project(center,view),x=project(add(center,rotate([1,0,0],0,angle)),view),y=project(add(center,[0,-1,0]),view);
  return <g transform={`matrix(${x.x-p.x} ${x.y-p.y} ${y.x-p.x} ${y.y-p.y} ${p.x} ${p.y})`}>{children}</g>;
};
const History=({frame:f,view}:{frame:number;view:View})=>{
  const opacity=(1-ease(f,210,360))*.72+.55*ease(f,2010,2160);
  return <g opacity={opacity}>{[[-860,850,210],[-650,740,180],[-440,650,140],[-230,510,190]].map(([x,y,h],i)=><g key={i}>
    <Beam a={[x,y-h,120]} b={[x,y+h,120]} view={view} color={C.muted} width={3}/>
    <Solid center={[x,y,120]} size={[105,h,75]} view={view} accent={C.muted}/>
  </g>)}</g>;
};
export const AssetWorld=()=>{
  const f=useCurrentFrame(),s=assetState(f),view=viewAt(f);
  const axis:V3=[0,s.height,0],front:V3=[0,s.height,-49];
  const reveal=ease(f,190,330),fold=Math.PI*(1-s.open);
  const leaves=[
    {i:0,angle:fold,center:add(axis,add([-165,0,0],rotate([-165,0,0],0,fold)))},
    {i:1,angle:0,center:axis},
    {i:2,angle:-fold,center:add(axis,add([165,0,0],rotate([165,0,0],0,-fold)))},
  ].sort((a,b)=>project(b.center,view).z-project(a.center,view).z);
  const opportunity=ease(f,1680,1790),matrix:V3=[1050*(1-opportunity),530+650*(1-opportunity),600*(1-opportunity)];
  return <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
    <Material/><rect width="1080" height="1920" fill="url(#asset-bg)"/>
    {Array.from({length:17},(_,i)=>{const z=i*150-600;const a=project([-1800,-325,z],view),b=project([1800,-325,z],view);return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.steel} opacity=".14"/>;})}
    <History frame={f} view={view}/>
    <Beam a={[0,s.height-410,0]} b={[0,s.height+370,0]} view={view} color={C.blueLight} width={3} opacity={1-.65*s.open}/>
    <g opacity={ease(f,60,105)*(1-ease(f,185,250))}>
      {[0,1,2].map(i=>{const radius=40+(f-65+i*16)*2;const p=project([0,-292,0],view);return radius>0?<ellipse key={i} cx={p.x} cy={p.y} rx={radius*view.scale} ry={radius*.12*view.scale} fill="none" stroke={C.blueLight} opacity={Math.max(0,.5-radius/650)}/>:null;})}
    </g>
    {leaves.map(({i,angle,center})=><g key={i}>
      <Solid center={center} size={[326,535,55]} rotation={[0,angle,0]} view={view} accent={C.muted}/>
      {Math.cos(angle)>.05&&<Plane center={add(center,rotate([0,0,-25],0,angle))} view={view} angle={angle}>
        <g opacity={reveal}>{i===0?<Battery frame={f}/>:i===1?<Skills frame={f}/>:<Cash frame={f}/>}</g>
      </Plane>}
    </g>)}
    <g opacity={1-reveal}>
      <Solid center={front} size={[335,550,18]} view={view} accent={C.muted}/>
      <Plane center={[0,s.height,-61]} view={view}>
        <rect x="-165" y="-273" width="330" height="546" fill={C.blue} opacity=".58"/>
        <path d="M-113,-226V220" stroke={C.blueLight} strokeWidth="12" opacity=".45"/>
        <text y="55" textAnchor="middle" fontSize="105" fontWeight="800" fill={C.white}>你</text>
        <text y="192" textAnchor="middle" fontSize="20" letterSpacing="6" fill={C.secondary}>人生资产</text>
      </Plane>
    </g>
    <LifeNode center={[0,s.height+203,-80]} view={view} frame={f} radius={28} stable={s.charge} orbit={false}/>
    {[-165,165].map(x=><Beam key={x} a={[x,s.height-240,0]} b={[x,s.height+240,0]} view={view} width={9} color={C.secondary} opacity={ease(f,360,420)}/>)}
    {f>=1670&&<g opacity={ease(f,1670,1715)}>
      {[-100,0,100].map((x,i)=><g key={x}>
        <Beam a={[x*2.4,240,0]} b={[x,320,0]} view={view} color={i===1?C.blueLight:C.green} width={5}/>
        <Solid center={[x,330,0]} size={[48,30,70]} view={view} accent={C.green}/>
      </g>)}
      <OpportunityMatrix center={matrix} size={174} view={view} angle={f*.025*(1-opportunity)+(.8+Math.sin((f-1790)/90)*.1)*opportunity} opacity={1-.55*ease(f,2010,2170)}/>
      {opportunity>.95&&<Plane center={[0,680,0]} view={view}><text textAnchor="middle" fontSize="34" fontWeight="700" fill={C.green}>机会</text></Plane>}
    </g>}
  </svg>;
};
