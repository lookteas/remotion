import React from 'react';
import {lifeKlineTheme as C} from '../../../src/config/theme';
import {lerp, progress, rand} from '../../../src/lib/anim';
import {cameraAt} from '../../../src/lib/camera';
import {settle} from '../../../src/lib/physical-motion';
import {Beam, LifeNode, OpportunityMatrix, project, Ring, Solid, V3, View} from './Geometry';
import content from './content.json';

export const Atmosphere: React.FC<{frame: number}> = ({frame}) => <svg width={1080} height={1920} style={{position:'absolute',inset:0}}>
  <defs>
    <radialGradient id="life-bg"><stop stopColor={C.steel} stopOpacity={0.45}/><stop offset="1" stopColor={C.bg}/></radialGradient>
    <radialGradient id="life-floor-glow"><stop stopColor={C.blue} stopOpacity={0.2}/><stop offset="1" stopColor={C.bg} stopOpacity={0}/></radialGradient>
  </defs>
  <rect width={1080} height={1920} fill={C.bg}/>
  <ellipse cx={540} cy={1120} rx={790} ry={900} fill="url(#life-bg)"/>
  <ellipse cx={540} cy={1380} rx={640} ry={390} fill="url(#life-floor-glow)"/>
  {Array.from({length:38},(_,i) => <circle key={i} cx={rand(i,3)*1080} cy={(rand(i,4)*1900-frame*(0.08+rand(i,8)*0.16)+1900)%1900} r={i%7===0?2:1} fill={C.blueLight} opacity={0.08+rand(i,9)*0.22}/>)}
  {Array.from({length:13},(_,i) => <path key={i} d={`M ${540+(i-6)*40} 1000 L ${540+(i-6)*250} 1730`} stroke={C.blueLight} strokeWidth={0.8} opacity={0.075}/>)}
  {[1050,1110,1190,1300,1460,1660].map(y => <line key={y} x1={0} y1={y} x2={1080} y2={y} stroke={C.blueLight} opacity={0.06}/>)}
</svg>;

const Sparks: React.FC<{frame: number; at: number; x: number; y: number; count?: number; color?: string}> = ({frame,at,x,y,count=40,color=C.green}) => {
  const t=frame-at; if(t<0||t>32)return null;
  return <g opacity={1-t/32}>{Array.from({length:count},(_,i)=>{
    const a=rand(i,17)*Math.PI*2; const d=t*(3+rand(i,19)*9);
    const px=x+Math.cos(a)*d; const py=y+Math.sin(a)*d*.45+t*t*.06;
    return <line key={i} x1={px} y1={py} x2={px-Math.cos(a)*(5+rand(i,20)*12)} y2={py-Math.sin(a)*6} stroke={i%4===0?C.white:color} strokeWidth={1+rand(i,23)*2} opacity={0.4+rand(i,21)*.5}/>;
  })}<ellipse cx={x} cy={y} rx={10+t*15} ry={4+t*4} fill="none" stroke={color} strokeWidth={3-t*.07}/></g>;
};

const Chart: React.FC<{frame:number; view:View; opacity?:number}> = ({frame,view,opacity=1}) => {
  const ys=[170,260,370,320,135,-70];
  return <g opacity={opacity}>
    {ys.map((y,i)=>{
      const hero=i===5; const p=progress(frame,0,22);
      const cy=hero?lerp(430,-70,p):y;
      const center:V3=[-420+i*130,cy,(5-i)*60];
      return <g key={i} opacity={hero?1:.3+i*.09}>
        <Beam a={[center[0],cy-145,center[2]]} b={[center[0],cy+150,center[2]]} view={view} width={hero?3:2} color={hero?C.green:C.blue}/>
        <Solid center={center} size={[hero?138:72,hero?240:125,hero?112:62]} view={view} accent={hero?C.green:C.blue}/>
        {hero&&<><LifeNode center={[center[0],cy+140,center[2]]} view={view} radius={43} stable={.25} frame={frame}/><g opacity={progress(frame,10,12)}><text x={project([center[0]+100,cy+160,center[2]],view).x} y={project([center[0]+100,cy+160,center[2]],view).y} fill={C.white} fontSize={40} fontWeight={700}>{content.self}</text></g></>}
      </g>;
    })}
  </g>;
};

const StageBase: React.FC<{view:View; frame:number; spread?:number; active?:number; completion?:number; opacity?:number}> = ({view,frame,spread=1,active=-1,completion=1,opacity=1}) => {
  return <g opacity={opacity}>
    <Ring center={[0,-175,0]} radius={490} view={view} color={C.blue} opacity={.22}/>
    <Ring center={[0,-175,0]} radius={420} view={view} color={C.blueLight} opacity={.2} arc={Math.PI*1.55} phase={frame/400}/>
    {[-1,0,1].map((side,i)=>{
      const x=side*260*spread; const focused=active<0||active===i;
      const a=focused?1:.33;
      const lift=active===i?28:0;
      return <g key={i} opacity={a}>
        <Solid center={[x,-160+lift,0]} size={[238,35,230]} view={view} accent={C.blue}/>
        <Solid center={[x,-112+lift,0]} size={[220,48,210]} view={view} accent={focused?C.green:C.blue}/>
        <Solid center={[x,-77+lift,0]} size={[198,9,186]} view={view} accent={C.blueLight} glass/>
        <Beam a={[x-90,-80+lift,-95]} b={[x+90,-80+lift,-95]} view={view} width={3} color={focused?C.green:C.blue}/>
        {Array.from({length:5},(_,j)=><Solid key={j} center={[x-70+j*35,-160+lift,-117]} size={[18,6,5]} view={view} accent={j/5<completion?C.green:C.darkSteel}/>)}
      </g>;
    })}
  </g>;
};

const BodyModule: React.FC<{frame:number; view:View; completed?:boolean}> = ({frame,view,completed=false}) => {
  const p=completed?1:Math.min(1,settle(frame,6,30,17,110));
  return <g>
    {[-1,1].map((s,i)=><Solid key={s} center={[-260+s*lerp(210,77,p),-15,0]} size={[38,105,140]} view={view} accent={C.blueLight} rotation={[0,0,s*(1-p)*.3]}/>)}
    <Ring center={[-260,52,0]} radius={92} view={view} color={C.green} opacity={p*.85} width={3}/>
    <Beam a={[-260,45,0]} b={[0,180,0]} view={view} color={C.blueLight} width={2} opacity={p*.55}/>
    {!completed&&<Sparks frame={frame} at={36} x={project([-260,20,0],view).x} y={project([-260,20,0],view).y} count={18}/>}
  </g>;
};

const SkillsModule: React.FC<{frame:number; view:View; completed?:boolean}> = ({frame,view,completed=false}) => <g>
  {[0,1,2].map(i=>{
    const p=completed?1:Math.min(1,settle(frame,8+i*11,30,18,130));
    return <Solid key={i} center={[(i-1)*65+(1-p)*(i%2?-220:220),-12+(1-p)*180,0]} size={[54,92,120]} rotation={[0,(1-p)*(i+1),0]} view={view} accent={p>.9?C.green:C.blue}/>;
  })}
  <Beam a={[-95,0,-65]} b={[95,0,-65]} view={view} width={4} color={C.green} opacity={completed?1:progress(frame,52,16)}/>
  <Beam a={[0,34,0]} b={[0,180,0]} view={view} width={2} color={C.blueLight} opacity={completed ? .5 : progress(frame,54,16)*.5}/>
</g>;

const CashModule: React.FC<{frame:number; view:View; completed?:boolean}> = ({frame,view,completed=false}) => {
  const p=completed?1:progress(frame,8,65);
  return <g>
    <Solid center={[260,18,0]} size={[190,185,160]} view={view} accent={C.blueLight} glass/>
    {Array.from({length:12},(_,i)=>{
      const arrived=completed?1:progress(frame,12+i*4,18);
      return <Solid key={i} center={[260+(i%3-1)*43+(1-arrived)*170,-45+Math.floor(i/3)*28+(1-arrived)*170,(i%2)*24-25]} size={[33,16,75]} view={view} rotation={[0,(1-arrived)*1.6,0]} accent={C.green} opacity={arrived}/>;
    })}
    <Beam a={[260,105,0]} b={[0,180,0]} view={view} width={2} color={C.blueLight} opacity={p*.55}/>
    {!completed&&Array.from({length:5},(_,i)=>{
      const q=((frame+i*13)%75)/75;
      return <Solid key={i} center={[lerp(405,570,q),lerp(0,-130,q),0]} size={[16,8,28]} view={view} accent={C.blueLight} opacity={p*(1-q)*.5}/>;
    })}
  </g>;
};

export const LifeArtwork: React.FC<{scene:number; frame:number; globalFrame:number}> = ({scene,frame,globalFrame}) => {
  const f=frame;
  const camera=cameraAt(f,[{at:0,x:540,y:scene===0?1250:scene===1?1240:1190,scale:scene===0?1.4:1.08},{at:scene===0?28:38,x:540,y:scene===0?1240:1190,scale:scene===0?1.08:1.08}]);
  const view:View={x:camera.x,y:camera.y,scale:camera.scale,yaw:-.36+Math.sin(globalFrame/230)*.025,pitch:.48};
  const active=scene>=3&&scene<=5?scene-3:-1;
  const opacityStage=scene===1?progress(f,10,26):1;
  const focus=scene===3?.3:scene===4?.65:1;
  const jitter=scene===3?(1-progress(f,0,85))*5:0;
  const nodePos:V3=scene>=6?[scene===6?lerp(0,-150,progress(f,0,28)):-150,scene===6?lerp(230,200,progress(f,0,28)):200,0]:[Math.sin(f*1.7)*jitter,230+Math.cos(f*1.2)*jitter,0];
  const node=scene===1?[lerp(230,0,progress(f,0,38)),lerp(70,230,progress(f,0,38)),0] as V3:nodePos;
  const matrixP=progress(f,0,30);
  const matrixCenter:V3=scene===6?[lerp(1150,235,matrixP),lerp(650,300,matrixP),lerp(900,0,matrixP)]:[235,300,0];
  const angle=scene===6?lerp(-3.8,.6,progress(f,0,30))+.18*progress(f,30,75):.78;
  const circle=project(scene===0?[230,-190,0]:[0,-170,0],view);
  return <svg width={1080} height={1920} style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <defs>
      <radialGradient id="life-matrix-glow"><stop stopColor={C.green} stopOpacity={.22}/><stop offset="1" stopColor={C.green} stopOpacity={0}/></radialGradient>
      <linearGradient id="life-column" x1="0" y1="0" x2="0" y2="1"><stop stopColor={C.blue} stopOpacity={0}/><stop offset=".6" stopColor={C.blueLight} stopOpacity={.3}/><stop offset="1" stopColor={C.blue} stopOpacity={0}/></linearGradient>
    </defs>
    {scene===0&&<>
      <ellipse cx={circle.x} cy={circle.y+65} rx={230} ry={75} fill={C.green} opacity={.035}/>
      <Chart frame={f} view={view}/>
      <Sparks frame={f} at={22} x={circle.x} y={circle.y} count={60}/>
      {f<25&&Array.from({length:10},(_,i)=><line key={i} x1={680+i*10} y1={800+i*30} x2={680+i*10} y2={1100+i*30} stroke={C.green} strokeWidth={1} opacity={.1*(1-progress(f,12,13))}/>)}
    </>}
    {scene>0&&<>
      {scene===1&&<Chart frame={150} view={view} opacity={1-progress(f,14,28)}/>}
      <StageBase view={view} frame={globalFrame} spread={scene===2?lerp(.55,1,progress(f,0,24)):1} active={scene===5&&f>80?-1:active} completion={scene<3?.15:focus} opacity={opacityStage*(scene===7?.75:1)}/>
      {scene>=3&&<BodyModule frame={scene===3?f:180} view={view} completed={scene>3}/>}
      {scene>=4&&<SkillsModule frame={scene===4?f:180} view={view} completed={scene>4}/>}
      {scene>=5&&<CashModule frame={scene===5?f:180} view={view} completed={scene>5}/>}
      {scene===2&&<Sparks frame={f} at={22} x={540} y={1370} count={30}/>}
      <Ring center={[0,-60,0]} radius={190} view={view} color={C.blueLight} opacity={opacityStage*.2} phase={globalFrame/80} arc={Math.PI*1.3}/>
      <LifeNode center={node} view={view} frame={globalFrame} stable={scene===3?lerp(.2,1,progress(f,0,90)):scene>3?1:.4} radius={scene>=6?76:72} opacity={scene===1?progress(f,12,20):1}/>
      <g opacity={scene===1?progress(f,28,12):1}><text x={project(node,view).x} y={project(node,view).y-125} textAnchor="middle" fontSize={36} fontWeight={600} fill={C.white}>{content.self}</text></g>
      {scene>=6&&<>
        {scene===6&&<g opacity={.16*progress(f,6,18)}>{Array.from({length:7},(_,i)=>{
          const p=project(matrixCenter,view);const offset=(i-3)*54;
          return <path key={i} d={`M ${p.x-240} ${p.y+offset} Q ${p.x} ${p.y+offset*1.65} ${p.x+240} ${p.y+offset}`} fill="none" stroke={C.green} strokeWidth={1.2}/>;
        })}</g>}
        {scene===6&&f<32&&[0,1,2,3].map(i=><OpportunityMatrix key={i} center={[matrixCenter[0]+i*55,matrixCenter[1]+i*28,matrixCenter[2]+i*100]} view={view} size={230} angle={angle-i*.12} opacity={.06*(1-i/4)*(1-progress(f,16,16))}/>)}
        <OpportunityMatrix center={matrixCenter} view={view} size={255} angle={angle} opacity={scene===7?.2:1}/>
        {scene===6&&<>
          <g opacity={progress(f,25,12)}><text x={project(matrixCenter,view).x} y={project(matrixCenter,view).y-175} fill={C.green} fontSize={36} textAnchor="middle" fontWeight={600}>{content.opportunity}</text></g>
          <Sparks frame={f} at={30} x={project(matrixCenter,view).x} y={project(matrixCenter,view).y} count={30}/>
          <Ring center={matrixCenter} radius={200+Math.sin(f/17)*8} view={view} opacity={.15} color={C.green} phase={f/80}/>
        </>}
      </>}
      {scene>=2&&<g opacity={scene===7?.5:1}>{content.fundamentals.map((label,i)=><g key={label} opacity={active<0||active===i||(scene===5&&f>80)?1:.35}>
        <text x={250+i*270} y={1550} fill={active===i?C.green:C.secondary} fontSize={40} textAnchor="middle" fontWeight={600}>{label}</text>
        <line x1={220+i*270} x2={280+i*270} y1={1575} y2={1575} stroke={active===i?C.green:C.blue} strokeWidth={3}/>
      </g>)}</g>}
    </>}
  </svg>;
};
