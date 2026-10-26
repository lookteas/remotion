import {Img,staticFile} from 'remotion';
import {ganzhiTheme as C} from '../../../src/config/theme';
import {ease} from './motion';

const Grain=()=><Img src={staticFile('ganzhi-modern-life/2d/paper-grain.png')} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',mixBlendMode:'multiply',opacity:.16,pointerEvents:'none'}}/>;

const Petals=({t}:{t:number})=><div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'}}>
 {Array.from({length:16},(_,i)=>{
  const speed=.05+(i%5)*.012, start=(i*137)%900, y=((t*30*speed+start)%1150)-150;
  const x=80+(i*67)%920+Math.sin(t*.7+i)*24, rot=t*20+i*37;
  return <div key={i} style={{position:'absolute',left:x,top:y,width:10+(i%3)*5,height:26+(i%4)*7,background:i%4===0?C.goldLight:i%3===0?C.vermilion:C.paperLight,opacity:.55,transform:`rotate(${rot}deg)`,boxShadow:`0 3px 6px ${C.black}22`}}/>;
 })}
</div>;

export const WeddingPaperCut=({t}:{t:number})=>{
 const p=ease(t,88,104);
 return <div data-scene="wedding-papercut" style={{position:'absolute',inset:0,overflow:'hidden',zIndex:15,background:'#8E3028',opacity:1-ease(t,103.2,104.6)}}>
  <Img src={staticFile('ganzhi-modern-life/2d/wedding-papercut.png')} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',transform:`scale(${1.02+p*.08}) translateY(${-p*8}px)`,transformOrigin:'50% 55%'}}/>
  <Petals t={t}/>
  <div style={{position:'absolute',left:530,top:1130,width:30,height:30,borderRadius:'50%',border:`4px solid ${C.goldLight}`,boxShadow:`0 0 22px ${C.goldLight}aa`,opacity:ease(t,95.6,96.4)*(1-ease(t,100,101))}}/>
  <Grain/>
 </div>;
};
