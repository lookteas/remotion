import React from 'react';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {ganzhiTheme as C} from '../../../src/config/theme';
import {cameraAt} from '../../../src/lib/camera';
import {ease,pose,posesAt,Pose} from './motion';
import {Phone,Calendar,Calligraphy,BirthCard,Planner,MovingBox,Hand,Brush,writingAt} from './Props';
import {LaterScenes} from './LaterScenes';
import {CalligraphyFocus} from './CalligraphyFocus';
import {legacyTime,sceneAt} from './story-motion';

const Place=({p,w,h,children,opacity=1,z=1}:{p:Pose;w:number;h:number;children:React.ReactNode;opacity?:number;z?:number})=><div style={{position:'absolute',left:p.x-w/2,top:p.y-h/2,width:w,height:h,display:'flex',alignItems:'center',justifyContent:'center',transform:`rotate(${p.angle}deg) scale(${p.scale})`,opacity,zIndex:z}}>{children}</div>;
const key=(at:number,x:number,y:number,scale=1,angle=0)=>({at,x,y,scale,angle});
const LegacyWorld=({time}:{time:number})=>{
 const t=time,p=posesAt(t);
 const camera=cameraAt(t,[{at:0,x:540,y:960,scale:1},{at:12,x:540,y:960,scale:1},{at:15,x:540,y:960,scale:.97},{at:24,x:540,y:960,scale:.97},{at:27,x:540,y:960,scale:1},{at:36,x:540,y:960,scale:.98},{at:57,x:540,y:960,scale:.98},{at:60,x:560,y:960,scale:.94},{at:66,x:540,y:950,scale:.98}]);
 const home=ease(t,58,61),paperVisible=ease(t,23.8,25),marriage=ease(t,34,35.4)*(1-ease(t,50.5,51.5));
 const cardA=pose(t,[key(34,230,1600,.9,-6),key(36,315,1080,1,-3),key(41.5,315,1080,1,-3),key(44,230,1090,.63,-7),key(49,230,1090,.63,-7),key(51,220,1640,.55,-7)]);
 const cardB=pose(t,[key(34,850,1700,.9,6),key(36.4,745,1080,1,3),key(41.5,745,1080,1,3),key(44,390,1080,.63,7),key(49,390,1080,.63,7),key(51,330,1640,.55,7)]);
 const planner=pose(t,[key(0,560,1710,.65,0),key(34.5,560,1710,.65,0),key(36,540,1230,.9,-2),key(41.8,540,1230,.9,-2),key(45,410,1370,.64,-4),key(49,410,1370,.64,-4),key(51,280,1570,.52,-8),key(66,280,1570,.52,-8)]);
 const hand=pose(t,[key(0,860,1540,1,-18),key(.7,700,1130,1,-14),key(1.2,700,1155,1,-14),key(2.5,850,1530,1,-18),key(7.8,820,1530,1,-12),key(9.2,690,1390,1,-7),key(9.5,690,1405,1,-7),key(11,820,1520,1,-12),key(12.6,780,1190,.9,10),key(14,880,1490,.9,-10),key(15.4,300,1270,.86,12),key(16.7,500,1310,.86,5),key(17.4,545,1270,.86,8),key(18.8,740,1310,.86,-6),key(19.4,790,1270,.86,-12),key(21.5,875,1540,.9,-12),key(23.3,290,1375,.75,-15),key(24.5,1000,1300,.8,-15),key(26,920,1520,.9,-15),key(32,925,1520,.9,-15),key(33.5,820,1260,.9,-10),key(35,940,1400,.9,-10),key(36.4,850,1240,.8,-15),key(39,780,1290,.8,-8),key(41,850,1430,.8,-15),key(43.8,810,1260,.8,-10),key(46,650,1440,.8,-10),key(48.5,620,1430,.8,-12),key(50,640,1450,.8,-10),key(51.5,710,1360,.8,-10),key(53,790,1290,.8,-10),key(55,790,1310,.8,-10),key(56.5,750,1420,.9,-10),key(59,1030,1380,.9,-10),key(61,850,1320,.85,-20),key(63,800,1150,.85,-20),key(66,1150,1650,.8,-20)]);
 const other=pose(t,[key(0,-250,1550,.85,12),key(34.5,-250,1550,.85,12),key(36,150,1280,.85,18),key(38,200,1300,.85,18),key(41,120,1400,.85,10),key(44,-150,1550,.85,10),key(48,-150,1550,.85,10),key(50,210,1440,.85,12),key(52,-150,1600,.85,12),key(57,-150,1600,.85,12),key(59,650,1450,.9,12),key(61,600,1490,.9,12),key(63,290,1140,.8,15),key(66,-250,1600,.8,15)]);
 const brush=writingAt(t),brushVisible=ease(t,26.3,27)*(1-ease(t,31,32));
 return <div data-world='ganzhi' data-time={t.toFixed(3)} style={{position:'absolute',inset:0,transformOrigin:'0 0',transform:`translate(${540-camera.x*camera.scale}px,${960-camera.y*camera.scale}px) scale(${camera.scale})`}}>
  <div style={{position:'absolute',left:-800,top:555,width:2700,height:1400,background:`linear-gradient(135deg,${C.desk},${C.deskEdge})`,borderTop:`2px solid ${C.gold}33`,boxShadow:`0 -20px 100px ${C.black}88`,transform:`translateX(${-home*1000}px)`,opacity:1-home}}/>
  {[0,1,2,3,4,5,6].map(i=><div key={i} style={{position:'absolute',left:-500,top:690+i*190,width:2200,height:1,background:`${C.gold}0b`,transform:`rotate(-11deg) translateX(${-home*1000}px)`,opacity:1-home}}/>)}
  <div style={{position:'absolute',left:1150-home*1150,top:570,width:1300,height:1350,background:`linear-gradient(110deg,${C.surface},${C.desk})`,borderLeft:`18px solid ${C.bronze}`,opacity:home}}><div style={{position:'absolute',left:80,top:40,bottom:100,width:4,background:`${C.gold}33`}}/><div style={{position:'absolute',left:0,right:0,top:1050,height:35,background:C.bronzeDark}}/></div>
  <div style={{position:'absolute',left:1050-home*250,top:570,width:80,height:1300,background:C.bronzeDark,borderLeft:`5px solid ${C.gold}77`,opacity:Math.sin(home*Math.PI)}}/>
  <div style={{position:'absolute',left:160,top:1530,width:780,height:34,borderRadius:5,background:C.bronze,boxShadow:`0 18px 35px ${C.black}aa`,opacity:home}}/>
  <Place p={p.art} w={680} h={660} opacity={paperVisible} z={t>=60.8?8:2}><Calligraphy t={t}/></Place>
  <Place p={planner} w={730} h={540} opacity={ease(t,34.4,35.5)*(1-ease(t,51,52))} z={3}><Planner t={t}/></Place>
  <Place p={p.calendar} w={780} h={620} z={4}><Calendar t={t}/></Place>
  <Place p={p.box} w={650} h={570} z={5}><MovingBox t={t}/></Place>
  <Place p={p.phone} w={500} h={850} z={6}><Phone t={t}/></Place>
  <Place p={cardA} w={350} h={440} opacity={marriage} z={7}><BirthCard t={t} person={0}/></Place>
  <Place p={cardB} w={350} h={440} opacity={marriage} z={7}><BirthCard t={t} person={1}/></Place>
  <div style={{position:'absolute',inset:0,zIndex:10}}><Hand x={hand.x} y={hand.y} scale={hand.scale} angle={hand.angle}/></div>
  <div style={{position:'absolute',inset:0,zIndex:9}}><Hand x={other.x} y={other.y} scale={other.scale} angle={other.angle} side/></div>
  <div style={{position:'absolute',inset:0,zIndex:11}}><Brush x={p.art.x-340+brush.x} y={p.art.y-330+brush.y} opacity={brushVisible}/><div style={{opacity:brushVisible}}><Hand x={p.art.x-340+brush.x+130} y={p.art.y-330+brush.y-190} angle={-24} scale={.73}/></div></div>
  <div style={{position:'absolute',left:210,top:1490,width:660,textAlign:'center',fontSize:27,color:C.secondary,letterSpacing:2,opacity:marriage*(1-ease(t,42,43))}}>两份出生信息 · 年月日时各一组干支</div>
 </div>;
};
export const GanzhiWorld=()=>{const frame=useCurrentFrame(),{fps}=useVideoConfig(),t=frame/fps,kind=sceneAt(t);return <>
 {kind==='legacy'&&<LegacyWorld time={legacyTime(t)}/>} 
 {kind==='calligraphy'&&<CalligraphyFocus/>}
 {(kind==='bridge'||kind==='later')&&<LaterScenes/>}
 </>;};
