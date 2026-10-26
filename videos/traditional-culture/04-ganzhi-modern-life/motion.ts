import {progress,lerp} from '../../../src/lib/anim';
export type Pose={x:number;y:number;scale:number;angle:number};
type Key=Pose & {at:number};
export const ease=(t:number,a:number,b:number)=>progress(t,a,Math.max(.001,b-a));
export const mix=(a:number,b:number,p:number)=>lerp(a,b,p);
export const pose=(t:number,keys:Key[]):Pose=>{
 if(t<=keys[0].at)return keys[0];
 for(let i=0;i<keys.length-1;i++){const a=keys[i],b=keys[i+1];if(t<=b.at){const p=ease(t,a.at,b.at);return {x:mix(a.x,b.x,p),y:mix(a.y,b.y,p),scale:mix(a.scale,b.scale,p),angle:mix(a.angle,b.angle,p)};}}
 return keys[keys.length-1];
};
const k=(at:number,x:number,y:number,scale=1,angle=0):Key=>({at,x,y,scale,angle});
export const posesAt=(t:number)=>{const poses={
 phone:pose(t,[k(0,550,1100,1.07,-5),k(1,540,1050,1.07,-3),k(10.7,540,1050,1.07,-3),k(13,215,1535,.34,-5),k(22.7,215,1535,.34,-5),k(23.5,275,1290,.55,-9),k(25,170,1395,.48,-14),k(41.9,170,1395,.48,-14),k(44,700,1110,.72,4),k(49,700,1110,.72,4),k(51,770,1350,.48,10),k(53,740,1120,.68,3),k(56,740,1120,.68,3),k(59,770,1390,.43,-7),k(63,780,1400,.43,-7)]),
 calendar:pose(t,[k(0,1510,1070,.8,7),k(10.8,1510,1070,.8,7),k(13,540,1030,1,0),k(23.8,540,1030,1,0),k(25,1510,1080,.55,12),k(66,1510,1080,.55,12)]),
 art:pose(t,[k(0,600,1070,.78,-4),k(23.8,600,1070,.78,-4),k(26,540,1050,1,0),k(32.5,540,1050,1,0),k(35,940,1280,.62,12),k(51,940,1280,.62,12),k(52,520,990,.55,0),k(53.5,520,1280,.48,0),k(56,520,1280,.48,0),k(59,850,1220,.48,-3),k(60,771.25,1430,.48,-.375),k(60.8,625,950,.58,0),k(61,600,950,.68,0),k(63,520,950,.90,0),k(66,520,950,.90,0)]),
 box:pose(t,[k(0,1550,1330,.8,-2),k(49,1550,1330,.8,-2),k(51,530,1280,.9,0),k(56,530,1280,.9,0),k(59,860,1220,.9,-3),k(61,770,1460,.7,0),k(66,770,1460,.7,0)]),
 camera:pose(t,[k(0,540,960,1,0),k(12,540,960,1,0),k(15,540,960,.97,0),k(24,540,960,.97,0),k(27,540,960,1,0),k(36,540,960,.98,0),k(57,540,960,.98,0),k(60,560,960,.94,0),k(66,540,950,.98,0)])
};
 if(t>=53.5&&t<=60)poses.art={x:poses.box.x-10,y:poses.box.y,scale:.48,angle:poses.box.angle};
 return poses;
};
export const gengAt=(t:number)=>({count:[15,17,19].filter(at=>t>=at).length,result:t>=21});
export const phoneCalendarAt=(t:number)=>({result:t>=21,saved:t>=23.3});
export const pointAlong=(points:number[][],fraction:number)=>{
 const lengths=points.slice(1).map((p,i)=>Math.hypot(p[0]-points[i][0],p[1]-points[i][1]));
 let distance=lengths.reduce((a,b)=>a+b,0)*Math.max(0,Math.min(1,fraction));
 for(let i=0;i<lengths.length;i++){if(distance<=lengths[i]){const p=lengths[i]?distance/lengths[i]:0;return {x:mix(points[i][0],points[i+1][0],p),y:mix(points[i][1],points[i+1][1],p)};}distance-=lengths[i];}
 const last=points[points.length-1];return {x:last[0],y:last[1]};
};
