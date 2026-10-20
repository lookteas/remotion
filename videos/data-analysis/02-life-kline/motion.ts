import {cameraAt} from '../../../src/lib/camera';
import {progress} from '../../../src/lib/anim';
import {project, View} from './Geometry';

export const ramp=(f:number,start:number,end:number)=>progress(f,start,end-start,t=>t);
export const ease=(f:number,start:number,end:number)=>progress(f,start,end-start,t=>t*t*(3-2*t));
export const income=Array.from({length:12},(_,i)=>1240+i*18);
export const expenses=[1320,1380,1440,1510,1570,1630];
export const reserveAt=(f:number)=>2+income.filter(t=>f>=t+30).length-expenses.filter(t=>f>=t).length;
export const assetState=(f:number)=>({
  height:650*(1-ease(f,0,78)),
  open:ease(f,300,570)*(1-.26*ease(f,2010,2180)),
  charge:.16+.72*ease(f,630,855),
  assembled:ease(f,940,1060),
  reserve:reserveAt(f),
});
const keys=[
  [0,0,650,1.05],[90,0,220,1.1],[180,0,0,1.1],[300,0,0,1.18],
  [360,0,0,1.18],[560,0,0,.88],[610,-220,0,1.25],[690,-330,0,1.66],
  [855,-300,0,1.6],[930,-150,0,1.4],[1030,0,0,1.68],[1160,100,0,1.5],
  [1260,330,0,1.65],[1460,330,0,1.65],[1600,330,0,1.55],
  [1710,0,80,.88],[1850,0,80,.88],[1980,0,50,.88],[2180,0,50,.96],[2219,0,50,.96],
].map(([at,x,y,scale])=>({at,x,y,scale}));
export const viewAt=(f:number):View=>{
  const c=cameraAt(f,keys);
  const view:View={x:0,y:0,scale:c.scale,yaw:-.24+.40*ease(f,150,310)-.40*ease(f,310,580),pitch:.23};
  const q=project([c.x,c.y,0],view);
  const impact=Math.max(0,1-(f-78)/30)*(f>=78?1:0);
  return {...view,x:540-q.x+Math.sin(f*1.3)*impact*7,y:1000-q.y+Math.cos(f*1.5)*impact*9};
};
