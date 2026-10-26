import {useCurrentFrame,useVideoConfig} from 'remotion';
import {ganzhiTheme as C} from '../../../src/config/theme';
import {PaperSheet} from '../../../src/components/material/PaperSheet';
import {ease,mix} from './motion';
import {WeddingPaperCut} from './PaperCutScenes';
import {SimpleMove} from './SimpleMove';
import {cargoAt,environmentAt,exteriorOpacityAt,exteriorRevealAt,roadRevealAt,storyAt,unloadAt,weddingBackdropAt} from './story-motion';

const Person=({x,y,bride=false,arm=0,step=0,carry=0,home=false,moving=false}:{x:number;y:number;bride?:boolean;arm?:number;step?:number;carry?:number;home?:boolean;moving?:boolean})=>{
 const skin='#F2C6A8';
 const hair='#6A432C';
 const formal=!moving&&!home;
 const wedding=formal&&bride;
 const casual=!formal;
 const sway=Math.sin(step*Math.PI)*2;
 return <svg width="300" height="650" viewBox="0 0 220 520" style={{position:'absolute',left:x,top:y-10,overflow:'visible',transform:`translateX(-50%) translateX(${sway}px)`,transformOrigin:'bottom center',filter:`brightness(0) drop-shadow(0 14px 18px ${C.black}38)`,zIndex:8}}>
  <ellipse cx="110" cy="506" rx="54" ry="10" fill={`${C.black}28`}/>
  {wedding&&<path d="M53 68 Q25 65 24 116 Q28 176 64 220 L80 190 Q55 145 57 92Z" fill={`${C.paperLight}cc`} stroke={C.paperEdge} strokeWidth="3"/>}
  <path d="M48 108 Q49 27 111 24 Q175 27 174 108 Q153 66 111 65 Q71 66 48 108Z" fill={hair}/>
  <path d="M61 92 Q61 49 111 44 Q161 49 161 92 L157 128 Q149 166 111 177 Q73 166 65 128Z" fill={skin}/>
  <path d="M72 104 Q83 99 94 104 M128 104 Q139 99 150 104" stroke="#4A3024" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
  <circle cx="83" cy="106" r="3.7" fill="#3D2B25"/><circle cx="139" cy="106" r="3.7" fill="#3D2B25"/>
  <circle cx="72" cy="126" r="8" fill="#EAA39A" opacity=".55"/><circle cx="150" cy="126" r="8" fill="#EAA39A" opacity=".55"/>
  <path d="M96 139 Q111 151 126 139" stroke={C.vermilion} strokeWidth="3.8" fill="none" strokeLinecap="round"/>
  {wedding&&<><path d="M47 50 Q64 16 92 26 L82 58Z" fill={hair}/><circle cx="63" cy="40" r="10" fill={C.paperLight}/><circle cx="63" cy="40" r="5" fill={C.gold}/></>}
  {wedding?<path d="M77 176 Q111 165 145 176 L181 452 Q111 490 41 452Z" fill={C.paperLight} stroke={C.paperEdge} strokeWidth="3"/>:formal?<path d="M76 176 H146 L158 310 H64Z" fill={C.ink} stroke={C.ink} strokeWidth="3"/>:casual&&bride?<path d="M78 178 Q111 168 144 178 L169 300 L52 300Z" fill="#F6D9C8" stroke={C.paperEdge} strokeWidth="3"/>:<path d="M76 176 H146 L168 310 H54Z" fill="#B7D8E5" stroke={C.paperEdge} strokeWidth="3"/>}
  {wedding?<><path d="M73 183 Q111 204 149 183" fill="none" stroke={C.vermilion} strokeWidth="11"/><path d="M87 197 L111 234 L135 197" fill="none" stroke={C.gold} strokeWidth="4"/><path d="M86 242 Q111 252 136 242" fill="none" stroke={C.vermilion} strokeWidth="4"/><path d="M78 440 Q111 462 144 440" fill="none" stroke={C.vermilion} strokeWidth="3"/></>:formal?<><path d="M76 176 L111 212 L146 176 L138 162 H84Z" fill={C.paperLight}/><path d="M101 204 L111 211 L121 204 L121 218 L111 224 L101 218Z" fill={C.black}/><path d="M111 232 V304" stroke={C.paperEdge} strokeWidth="3"/><path d="M64 306 H108 L104 455 H66Z" fill={C.blueDark} stroke={C.blueDark} strokeWidth="3"/><path d="M114 306 H158 L154 455 H116Z" fill={C.blueDark} stroke={C.blueDark} strokeWidth="3"/></>:casual&&bride?<path d="M52 300 Q111 322 169 300 L158 450 Q111 475 63 450Z" fill={C.vermilion} stroke={C.vermilion} strokeWidth="3"/>:<><path d="M76 176 L111 212 L146 176 L138 162 H84Z" fill={C.paperLight}/><path d="M103 206 L111 232 L119 206" fill="none" stroke={C.vermilion} strokeWidth="4"/><path d="M54 306 H168 L154 454 H68Z" fill={C.blueDark} stroke={C.blueDark} strokeWidth="3"/></>}
  <g style={{transformOrigin:'78px 190px',transform:`rotate(${mix(8,bride?-25:25,arm)}deg)`}}><path d="M78 190 Q48 236 62 293" fill="none" stroke={wedding?C.paperLight:formal?C.blueDark:bride?'#F6D9C8':'#B7D8E5'} strokeWidth="19" strokeLinecap="round"/><circle cx="62" cy="293" r="9" fill={skin}/></g>
  <g style={{transformOrigin:'144px 190px',transform:`rotate(${mix(-8,bride?25:-25,arm)}deg)`}}><path d="M144 190 Q174 236 160 293" fill="none" stroke={wedding?C.paperLight:formal?C.blueDark:bride?'#F6D9C8':'#B7D8E5'} strokeWidth="19" strokeLinecap="round"/><circle cx="160" cy="293" r="9" fill={skin}/></g>
  {wedding&&<g transform={`translate(${mix(176,194,carry)} ${mix(280,310,carry)})`}><path d="M0 22 Q-20 0 -4 -17 Q10 -5 0 22Z" fill={C.vermilion}/><path d="M0 22 Q20 0 4 -17 Q-10 -5 0 22Z" fill={C.vermilion}/><path d="M0 22 V63" stroke={C.green} strokeWidth="4"/></g>}
 </svg>;
};

const Box=({x,y,w=240,h=205,scale=1,label='厨房用品',opacity=1}:{x:number;y:number;w?:number;h?:number;scale?:number;label?:string;opacity?:number})=><div style={{position:'absolute',left:x,top:y,width:w,height:h,boxSizing:'border-box',transform:`translate(-50%,-50%) scale(${scale})`,background:`linear-gradient(135deg,${C.paperLight},${C.bronze})`,border:`4px solid ${C.bronzeDark}`,boxShadow:`0 18px 28px ${C.black}55`,display:'grid',placeItems:'center',color:C.bronzeDark,fontSize:32,zIndex:7,opacity}}><div style={{position:'absolute',top:0,bottom:0,left:'48%',width:22,background:`${C.gold}aa`}}/><div style={{position:'absolute',left:'20%',right:'20%',top:0,height:22,background:`${C.gold}aa`}}/><b style={{position:'relative',background:C.paperLight,padding:'8px 12px'}}>{label}</b></div>;

const Van=({x,y,scale=1,drive=0,cargoItems=[]}:{x:number;y:number;scale?:number;drive?:number;cargoItems?:number[]})=><svg width="730" height="390" viewBox="0 0 730 390" style={{position:'absolute',left:x,top:y,transform:`translate(-50%,-50%) scale(${scale})`,overflow:'visible',zIndex:5,filter:`drop-shadow(0 24px 24px ${C.black}55`}}>
 <path d="M36 100 Q36 74 70 74 H475 Q510 74 526 112 L562 183 H652 Q690 183 690 225 V296 H37Z" fill={C.paperLight} stroke={C.blueDark} strokeWidth="12"/><path d="M510 112 L548 183 H405 V93 H475 Q497 93 510 112Z" fill={C.blueDark}/><path d="M64 100 H365 V254 H64Z" fill={C.vermilion} opacity=".9"/>
 {cargoItems.map(i=><g key={i} transform={`translate(${92+i*91} 133)`}><rect width="78" height="82" rx="3" fill={i%2?C.paperLight:C.bronze} stroke={C.bronzeDark} strokeWidth="4"/><path d="M39 0 V82 M4 25 H74" stroke={C.goldLight} strokeWidth="8" opacity=".9"/><path d="M13 58 H65" stroke={C.bronzeDark} strokeWidth="3" opacity=".6"/></g>)}
 <text x="214" y="244" textAnchor="middle" fontSize="35" fontWeight="700" fill={C.paperLight}>搬 家</text><path d="M425 206 H492 V270 H425Z" fill={C.blueDark}/><path d="M554 207 H655 V269 H554Z" fill={C.paperEdge}/><g transform={`rotate(${drive*1440} 173 298)`}><circle cx="173" cy="298" r="65" fill={C.black}/><circle cx="173" cy="298" r="34" fill={C.bronze}/><path d="M173 235 V257" stroke={C.paperLight} strokeWidth="9" strokeLinecap="round"/></g><g transform={`rotate(${drive*1440} 573 298)`}><circle cx="573" cy="298" r="65" fill={C.black}/><circle cx="573" cy="298" r="34" fill={C.bronze}/><path d="M573 235 V257" stroke={C.paperLight} strokeWidth="9" strokeLinecap="round"/></g><path d="M690 221 L718 236 V274 H690Z" fill={C.vermilion}/><path d="M42 225 L14 244 V270 H42Z" fill={C.gold}/>
</svg>;

const WeddingSilhouette=({t}:{t:number})=>{
 const enter=ease(t,88.8,94.4),hold=ease(t,94.8,96.2),embrace=ease(t,99.8,101.8);
 const brideX=mix(330,430,enter)+embrace*22,groomX=mix(750,650,enter)-embrace*22;
 return <div style={{position:'absolute',inset:0,zIndex:5,overflow:'hidden',background:'linear-gradient(180deg,#8E3028,#A84336 58%,#451A16)'}}>
  <div style={{position:'absolute',left:210,top:520,width:660,height:660,borderRadius:'50%',border:'2px solid #CEAB6B66'}}/>
  <div style={{position:'absolute',left:440,top:300,width:200,height:200,background:C.paperLight,border:'5px solid '+C.gold,display:'grid',placeItems:'center',fontFamily:C.serif,fontSize:112,color:C.vermilion}}>囍</div>
  {[0,1].map(i=><div key={i} style={{position:'absolute',left:i?920:110,top:420,width:70,height:120,borderRadius:'50%',background:'#6A201B',border:'3px solid '+C.gold,boxShadow:'0 0 24px '+C.gold+'33'}}><div style={{position:'absolute',left:31,top:-40,width:3,height:42,background:C.gold}}/><div style={{position:'absolute',left:28,top:120,width:12,height:38,background:C.gold}}/></div>)}
  <div style={{position:'absolute',left:0,right:0,top:1500,height:5,background:C.gold,opacity:.8}}/>
  <Person x={brideX} y={850} bride arm={hold} step={enter}/>
  <Person x={groomX} y={850} arm={hold} step={enter}/>
  {t>=96&&<div style={{position:'absolute',left:536,top:1050,width:34,height:34,borderRadius:'50%',border:'5px solid '+C.goldLight,boxShadow:'0 0 30px '+C.goldLight+'aa',opacity:ease(t,96,97)}}/>}
  <div style={{position:'absolute',left:330,right:330,bottom:155,height:80,background:C.paperLight,border:'4px solid '+C.gold,display:'grid',placeItems:'center',fontFamily:C.serif,fontSize:38,color:C.vermilion}}>新婚礼成 · 百年好合</div>
 </div>;
};
const Caption=({t}:{t:number})=><div style={{position:'absolute',left:72,right:72,top:95,padding:'26px 32px 30px',background:`linear-gradient(180deg,${C.ink}f5,${C.ink}bb)`,borderLeft:`6px solid ${C.gold}`,zIndex:20,color:C.ivory,boxShadow:`0 15px 35px ${C.black}55`}}>
 <div style={{fontSize:25,color:C.gold,letterSpacing:4,marginBottom:13}}>生活里的时间与祝愿</div>
 <div style={{fontSize:54,lineHeight:1.22,fontWeight:700}}>{t<68?'时间记号，接着进入婚事安排':t<78?'有些家庭，婚前会看双方八字':t<88?'查看传统日历，共同商量婚期':t<104?'婚礼仪式，寄托对新生活的祝愿':t<112?'搬家前，有些家庭会查看入宅日子':t<118?'搬家前，有些家庭会查看入宅日子':t<120?'查过的日子，写进家庭安排':t<124?'家中物件，一件件装进车厢':t<130?'按定下的日子，带上生活物件出发':t<137?'同一批箱子，一件件搬进新家':t<140?'挂起“安居”字画，完成入宅仪式':'你还知道哪些民俗会用到天干地支？'}</div>
 <div style={{fontSize:28,lineHeight:1.35,color:C.secondary,marginTop:14}}>{t<68?'同一件物件，从记录时间过渡到生活安排。':t<78?'传统习俗因家庭而异，不是科学判定。':t<88?'不展示所谓“必然吉日”，日期由家人商量。':t<104?'牵手、交换戒指、亲友见证。':t<118?'看传统日历里的日干支和民俗字段；这是民俗安排。':t<120?'家人把定下的入宅日期记入计划。':t<124?'先搬一箱、落稳，再轮到下一箱。':t<130?'纸箱和生活物件，按家庭安排进入新家。':t<137?'书籍、餐具和衣物逐件卸下，留在屋内。':t<140?'有人借此寄托安居祝愿，不是结果保证。':'评论区说说你家乡的习俗。'}</div>
 </div>;

const MarriageLetter=({t}:{t:number})=>{
 const open=ease(t,78,80.5),lines=ease(t,81,83),stamp=ease(t,83.5,84.5),date=ease(t,82,84),expand=ease(t,87,88),paper=1-ease(t,86.5,87.4);
 const scaleX=mix(.94,1,open)*mix(1,1.42,expand),scaleY=mix(.94,1,open)*mix(1,3.26,expand);
 return <div style={{position:'absolute',left:130,top:680,width:820,height:620,zIndex:7,transformOrigin:'center center',transform:`translateY(${mix(56,0,open)}px) scale(${scaleX},${scaleY})`,overflow:'hidden',background:C.vermilion,border:`8px double ${C.gold}`,boxShadow:`0 28px 60px ${C.black}55`}}>
  <div style={{position:'absolute',inset:24,opacity:paper}}>
   <PaperSheet colors={C} w={756} h={556} style={{borderRadius:0,border:`3px solid ${C.gold}`,boxShadow:'none'}}>
    <div style={{position:'absolute',inset:14,border:`1px solid ${C.vermilion}88`}}/>
    <div style={{position:'absolute',left:30,right:30,top:28,height:118,background:C.vermilion,border:`2px solid ${C.gold}`,color:C.goldLight}}>
     <div style={{position:'absolute',left:24,top:13,fontSize:21,letterSpacing:3}}>传统婚俗 · 家人共商</div>
     <div style={{position:'absolute',left:0,right:0,top:34,textAlign:'center',fontFamily:C.serif,fontSize:70,lineHeight:1.1,opacity:ease(t,79,80.5)}}>婚书</div>
     <div style={{position:'absolute',right:18,top:15,width:68,height:68,border:`3px double ${C.goldLight}`,display:'grid',placeItems:'center',fontFamily:C.serif,fontSize:38,transform:`rotate(${mix(-18,0,stamp)}deg) scale(${mix(.72,1,stamp)})`,opacity:stamp}}>囍</div>
    </div>
    <div style={{position:'absolute',left:52,right:52,top:175,textAlign:'center',fontSize:31,color:C.bronzeDark,opacity:ease(t,80,81.5)}}>婚礼筹备 · 家人共同商量</div>
    <div style={{position:'absolute',left:58,right:58,top:235,display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:30,opacity:lines}}>
     <span>传统日历参考</span><span style={{color:C.vermilion,fontFamily:C.serif,fontSize:34,borderBottom:`2px solid ${C.vermilion}`,padding:'0 8px 5px'}}>日干支</span>
    </div>
    <div style={{position:'absolute',left:54,right:54,top:302,height:110,boxSizing:'border-box',border:`2px solid ${C.gold}`,background:`${C.vermilion}0a`,display:'flex',alignItems:'center',justifyContent:'center',gap:26,transform:`translateY(${mix(20,0,date)}px)`,opacity:date}}>
     <span style={{fontSize:28,color:C.bronze}}>婚礼日期</span><span style={{width:2,height:48,background:`${C.gold}aa`}}/><strong style={{fontFamily:C.serif,fontSize:43,color:C.vermilion,fontWeight:600}}>双方商定</strong>
    </div>
    <div style={{position:'absolute',left:60,right:60,top:458,textAlign:'center',fontSize:25,color:C.bronze,opacity:ease(t,84,85)}}>择日习俗寄托祝愿，不是结果保证。</div>
    <div style={{position:'absolute',left:114,right:114,bottom:54,height:3,background:`${C.gold}88`,transform:`scaleX(${ease(t,84,86)})`,transformOrigin:'center'}}/>
    <div style={{position:'absolute',right:48,bottom:20,fontSize:18,color:C.bronze,letterSpacing:2,opacity:ease(t,84,85)}}>婚书样式示意</div>
   </PaperSheet>
  </div>
 </div>;
};

export const LaterScenes=()=>{const f=useCurrentFrame(),{fps}=useVideoConfig(),t=f/fps,s=storyAt(t),environment=environmentAt(t);const wedding=ease(t,88,90)*(1-ease(t,103,105)),cargo=cargoAt(t);
 const packing=ease(t,112,118),drive=ease(t,124,130),arrive=ease(t,130,137),settle=ease(t,137,140);
 const truckX=t<116?1300:t<118?mix(1300,810,ease(t,116,118)):t<124?810:t<130?mix(810,1040,drive):t<138?1040:mix(1040,1450,ease(t,138,140));
 const unload=unloadAt(t),truckItems=[0,1,2].filter(i=>i>=unload.moved&&i!==unload.active);
 const alpha=s.visibility;
 return <div style={{position:'absolute',inset:0,overflow:'hidden',opacity:alpha,background:`linear-gradient(180deg,${C.paperLight} 0%,${C.paperLight} 69%,${C.paperEdge} 69%,${C.paperEdge})`,color:C.bronzeDark}}>
  <div style={{position:'absolute',left:0,right:0,bottom:300,height:11,background:`linear-gradient(90deg,${C.bronzeDark},${C.gold},${C.bronzeDark})`}}/>
  {t>=64&&t<68&&<div style={{position:'absolute',inset:0,zIndex:12,background:`radial-gradient(circle at 50% 48%,${C.surface},${C.ink} 70%)`,opacity:ease(t,64,65)}}>
   <div style={{position:'absolute',left:540,top:990,width:470,height:680,transform:`translate(-50%,-50%) translateX(${mix(230,0,ease(t,64,67))}px) rotate(${mix(7,0,ease(t,64,67))}deg)`,background:`linear-gradient(110deg,${C.paperEdge},${C.paperLight} 12%,${C.paper} 88%,${C.paperEdge})`,boxShadow:`0 28px 80px ${C.black}99`,border:`2px solid ${C.gold}`,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
    <div style={{fontFamily:C.serif,fontSize:88,letterSpacing:17,color:C.bronzeDark,writingMode:'vertical-rl'}}>安居</div><div style={{fontFamily:C.serif,fontSize:34,letterSpacing:8,color:C.vermilion,writingMode:'vertical-rl',marginLeft:24}}>丙午夏</div><div style={{position:'absolute',left:35,bottom:30,width:62,height:62,border:`4px double ${C.vermilion}`,color:C.vermilion,fontFamily:C.serif,fontSize:25,display:'grid',placeItems:'center'}}>安</div>
   </div>
   <div style={{position:'absolute',left:150,right:150,top:1480,height:3,background:`${C.gold}66`}}><div style={{width:`${ease(t,64,67)*100}%`,height:3,background:C.gold}}/></div>
   <div style={{position:'absolute',left:0,right:0,top:1560,textAlign:'center',color:C.ivory,fontSize:38,letterSpacing:4}}>时间记号，接着进入婚事安排</div>
  </div>}
  {t>=68&&t<78&&[0,1].map((person)=>{const p=ease(t,68+person*.35,71+person*.35);return <div key={person} style={{position:'absolute',top:700,left:person?570:110,width:400,height:540,padding:32,boxSizing:'border-box',border:`4px solid ${person?C.vermilion:C.gold}`,background:C.paperLight,color:C.bronzeDark,transform:`translateX(${(1-p)*(person?250:-250)}px) rotate(${person?2:-2}deg)`,opacity:p,boxShadow:`0 25px 45px ${C.black}66`,zIndex:6}}><div style={{fontSize:33,marginBottom:28}}>双方出生信息 · {person?'乙':'甲'}</div><div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>{['年','月','日','时'].map((v,i)=><div key={v} style={{textAlign:'center'}}><b style={{fontSize:29}}>{v}</b><div style={{height:115,marginTop:14,border:`1px solid ${C.paperEdge}`,display:'grid',placeItems:'center',fontSize:27,color:i%2?C.vermilion:C.blueDark}}>{i%2?'支':'干'}<br/>{i%2?'支':'干'}</div></div>)}</div><div style={{position:'absolute',bottom:28,fontSize:24,color:C.bronze}}>结构示意 · 不作婚配判定</div></div>;})}
  {weddingBackdropAt(t)>0&&<div style={{position:'absolute',inset:0,zIndex:4,opacity:weddingBackdropAt(t),background:C.vermilion}}/>}
  {t>=78&&t<88&&<MarriageLetter t={t}/>}

  {false&&wedding>.001&&<div style={{position:'absolute',inset:0,zIndex:5,opacity:wedding}}><WeddingSilhouette t={t}/></div>}

  {t>=104&&t<112&&<div style={{position:'absolute',left:130,top:740,width:820,height:600,padding:42,boxSizing:'border-box',background:C.paperLight,border:`5px solid ${C.gold}`,zIndex:8,boxShadow:`0 24px 45px ${C.black}55`}}><div style={{fontSize:44}}>乔迁安排 · 看日子</div><div style={{marginTop:45,padding:30,border:`2px solid ${C.paperEdge}`,fontSize:35}}>传统日历 · 查看日干支</div><div style={{marginTop:28,padding:26,background:`${C.vermilion}22`,fontSize:33}}>入宅仪式　加入家庭计划</div><div style={{marginTop:28,fontSize:28,color:C.bronze}}>有些家庭借此表达对新居安稳的祝愿。</div></div>}
  {t>=104&&t<124&&<div style={{position:'absolute',inset:0,zIndex:1,background:`linear-gradient(180deg,${C.paperLight} 0%,${C.paper} 70%,${C.paperEdge} 70%,${C.paperEdge})`}}>
   <div style={{position:'absolute',left:85,top:610,width:260,height:300,border:`10px solid ${C.bronzeDark}`,background:`linear-gradient(135deg,${C.blue}55,${C.paperLight}aa)`}}><div style={{position:'absolute',left:'50%',top:0,bottom:0,width:8,background:C.bronzeDark}}/><div style={{position:'absolute',left:0,right:0,top:'50%',height:8,background:C.bronzeDark}}/></div>
   <div style={{position:'absolute',left:50,top:1250,width:440,height:250,borderRadius:'50px 50px 12px 12px',background:`linear-gradient(145deg,${C.blue},${C.blueDark})`,boxShadow:`0 25px 38px ${C.black}55`}}><div style={{position:'absolute',left:26,right:26,top:-60,height:100,borderRadius:35,background:C.blue}}/><div style={{position:'absolute',left:65,bottom:-52,width:24,height:52,background:C.bronzeDark}}/><div style={{position:'absolute',right:65,bottom:-52,width:24,height:52,background:C.bronzeDark}}/></div>
   <div style={{position:'absolute',right:90,top:690,width:72,height:430,background:C.bronzeDark}}/><div style={{position:'absolute',right:55,top:640,width:145,height:65,borderRadius:'50%',background:C.gold}}/><div style={{position:'absolute',right:80,top:1080,width:100,height:220,background:C.vermilion}}/>
   <div style={{position:'absolute',left:0,right:0,bottom:300,height:15,background:`linear-gradient(90deg,${C.bronzeDark},${C.gold},${C.bronzeDark})`}}/>
  </div>}

  {false&&t>=112&&t<140&&<>
   <div style={{position:'absolute',right:54,top:650,width:350,padding:'22px 24px',boxSizing:'border-box',background:`${C.ink}e8`,border:`2px solid ${C.gold}`,borderRadius:12,zIndex:6,color:C.ivory,boxShadow:`0 14px 28px ${C.black}55`,transform:`translateX(${(1-ease(t,112,114))*40}px)`,opacity:ease(t,112,114)*(1-ease(t,117,118))}}>
    <div style={{fontSize:25,color:C.gold,letterSpacing:3}}>乔迁看日子</div>
    <div style={{marginTop:12,fontSize:30,fontWeight:700}}>传统日历 / 日干支 · 已查阅</div>
    <div style={{marginTop:12,fontSize:24,color:C.secondary}}>家庭安排　→　入宅仪式</div>
    <div style={{marginTop:14,height:5,background:`${C.gold}55`}}><div style={{width:`${Math.min(100,Math.max(0,(t-112)/28*100))}%`,height:5,background:C.gold}}/></div>
    <div style={{marginTop:10,fontSize:21,color:C.secondary}}>民俗安排 · 寄托祝愿</div>
   </div>
   {t>=123&&t<130&&<div style={{position:'absolute',inset:0,zIndex:0,opacity:roadRevealAt(t),background:`linear-gradient(180deg,${C.blue} 0%,${C.blue} 38%,${C.paperEdge} 38%,${C.paperEdge} 70%,${C.paper} 70%,${C.paper})`}}/>}
   {t<124&&<>
    <div style={{position:'absolute',left:35,top:1210,width:405,height:235,borderRadius:'45px 45px 12px 12px',background:`linear-gradient(145deg,${C.blue},${C.blueDark})`,boxShadow:`0 25px 38px ${C.black}55`,zIndex:2}}><div style={{position:'absolute',left:25,right:25,top:-60,height:100,borderRadius:35,background:C.blue}}/><div style={{position:'absolute',left:55,bottom:-50,width:24,height:50,background:C.bronzeDark}}/><div style={{position:'absolute',right:55,bottom:-50,width:24,height:50,background:C.bronzeDark}}/></div><div style={{position:'absolute',left:365,top:790,width:110,height:490,background:`linear-gradient(90deg,${C.bronzeDark},${C.bronze})`,zIndex:2}}/><div style={{position:'absolute',left:510,top:1130,width:260,height:35,background:C.bronzeDark,zIndex:2}}/><div style={{position:'absolute',left:510,top:1165,width:260,height:135,background:C.blueDark,borderRadius:'10px 10px 0 0',zIndex:2}}/><div style={{position:'absolute',left:74,top:785,width:180,height:115,borderRadius:'50%',background:C.gold,opacity:.8,zIndex:2}}/>
    {t<118&&<><Person x={285} y={810} bride arm={cargo.active===0?cargo.progress:0} step={packing} carry={cargo.active===0?cargo.progress:0} moving/><Person x={455} y={810} arm={cargo.active>0?cargo.progress:0} step={packing} carry={cargo.active>0?cargo.progress:0} moving/></>}
    <div style={{position:'absolute',left:110,top:720,width:130,height:250,border:`8px solid ${C.bronzeDark}`,borderRadius:'60px 60px 0 0',zIndex:3}}><div style={{position:'absolute',left:-35,top:-15,width:180,height:45,borderRadius:'50%',background:C.gold}}/></div>
   </>}
   {environment==='destination-exterior'&&<div style={{position:'absolute',inset:0,zIndex:2,overflow:'hidden',opacity:exteriorOpacityAt(t),clipPath:`inset(0 0 0 ${(1-exteriorRevealAt(t))*100}%)`,background:`linear-gradient(180deg,${C.blue} 0%,${C.blue} 34%,${C.paperEdge} 34%,${C.paperEdge} 71%,${C.bronzeDark} 71%,${C.bronzeDark})`}}>
    <div style={{position:'absolute',left:0,right:0,top:635,height:3,background:`${C.paperLight}bb`}}/>
    <div style={{position:'absolute',left:0,right:0,bottom:360,height:16,background:C.paperLight}}/>
    <div style={{position:'absolute',left:0,right:0,bottom:300,height:8,background:C.gold}}/>
    <div style={{position:'absolute',left:25,top:500,width:900,height:1040,background:C.paperLight,boxShadow:`0 24px 50px ${C.black}33`}}>
     <div style={{position:'absolute',left:-48,right:-48,top:-78,height:92,background:C.blueDark,boxShadow:`0 12px 22px ${C.black}33`}}/>
     <div style={{position:'absolute',left:0,right:0,top:24,height:8,background:C.gold}}/>
     <div style={{position:'absolute',left:45,top:180,width:230,height:820,boxSizing:'border-box',border:`14px solid ${C.bronzeDark}`,background:`linear-gradient(180deg,${C.blueDark},${C.surface})`,boxShadow:`inset 0 0 0 8px ${C.gold}`}}>
      <div style={{position:'absolute',left:0,right:0,bottom:0,height:18,background:C.vermilion}}/>
      <div style={{position:'absolute',right:18,top:60,bottom:60,width:18,background:`${C.gold}aa`}}/>
     </div>
     <div style={{position:'absolute',left:475,top:190,width:290,height:260,border:`14px solid ${C.bronzeDark}`,background:`linear-gradient(135deg,${C.blue}77,${C.paperLight})`,boxShadow:`inset 0 0 0 8px ${C.gold}`}}><div style={{position:'absolute',left:'50%',top:0,bottom:0,width:8,background:C.bronzeDark}}/><div style={{position:'absolute',left:0,right:0,top:'50%',height:8,background:C.bronzeDark}}/></div>
     <div style={{position:'absolute',left:300,top:520,width:360,height:520,background:C.blueDark,opacity:.18}}/>
     <div style={{position:'absolute',right:55,top:500,width:42,height:92,borderRadius:'50% 50% 4px 4px',background:C.gold}}/>
     <div style={{position:'absolute',left:45,top:490,width:230,height:90,background:C.vermilion,color:C.paperLight,fontFamily:C.serif,fontSize:32,writingMode:'vertical-rl',display:'grid',placeItems:'center',letterSpacing:8}}>安居</div>
    </div>
    <div style={{position:'absolute',left:130,top:1335,width:470,height:500,background:`linear-gradient(180deg,${C.paperEdge},${C.bronzeDark})`,clipPath:'polygon(28% 0,72% 0,100% 100%,0 100%)',opacity:.92}}/>
    <div style={{position:'absolute',left:25,top:1040,width:115,height:340,background:C.blueDark,borderRadius:'54px 54px 6px 6px'}}><div style={{position:'absolute',left:18,top:-46,width:78,height:88,background:C.green,clipPath:'polygon(50% 0,100% 45%,72% 100%,28% 100%,0 45%)'}}/></div>
    <div style={{position:'absolute',right:34,top:1120,width:130,height:285,background:C.vermilion,borderRadius:'56px 56px 6px 6px'}}><div style={{position:'absolute',left:22,top:-40,width:86,height:76,background:C.green,clipPath:'polygon(50% 0,100% 45%,72% 100%,28% 100%,0 45%)'}}/></div>
   </div>}
   {t>=118&&t<124&&<><Person x={285} y={810} bride arm={cargo.active===0?cargo.progress:0} step={packing} carry={cargo.active===0?cargo.progress:0} moving/><Person x={455} y={810} arm={cargo.active>0?cargo.progress:0} step={packing} carry={cargo.active>0?cargo.progress:0} moving/></>}
   <Van x={truckX} y={t<130?1320:1370} scale={t<130?.92:.88} drive={drive} cargoItems={t<124?Array.from({length:cargo.loaded},(_,i)=>i):truckItems}/>
   {t>=118&&t<124&&[
    {label:'字画',from:150,slot:130},
    {label:'餐具',from:340,slot:220},
    {label:'衣物',from:530,slot:310},
   ].map((item,index)=>{
    if(index<cargo.loaded)return null;
    const active=index===cargo.active,p=active?ease(cargo.progress,0,1):0;
    const scale=.48;
    const targetX=truckX+(item.slot-365)*.92;
    const targetY=1320+(174-195)*.92;
    const x=active?mix(item.from,targetX,p):item.from;
    const y=active?mix(1540,targetY,p)-Math.sin(p*Math.PI)*145:1540;
    return <Box key={item.label} x={x} y={y} w={150} h={120} scale={active?mix(.78,scale,p):.78} label={item.label}/>;
   })}
   {t>=124&&t<130&&<><div style={{position:'absolute',left:0,right:0,top:1510,height:12,background:C.bronzeDark}}/>{[0,1,2,3].map(i=><div key={i} style={{position:'absolute',left:mix(0,-1200,drive)+i*450,top:1470,width:200,height:22,background:C.gold}}/>)}{[0,1,2,3].map(i=><div key={`b${i}`} style={{position:'absolute',left:mix(0,-900,drive)+i*450,top:700+i%2*90,width:220,height:400,background:i%2?C.paper:C.paperLight,border:`5px solid ${C.bronzeDark}`,boxShadow:`0 18px 26px ${C.black}22`,display:'grid',gridTemplateColumns:'repeat(2,1fr)',gridTemplateRows:'repeat(3,1fr)',gap:22,padding:22,boxSizing:'border-box'}}>{[0,1,2,3,4,5].map(j=><i key={j} style={{border:`3px solid ${C.bronzeDark}`,background:C.blue}}/>)}</div>)}</>}
   {t>=129&&<>
    <div style={{position:'absolute',inset:0,zIndex:3,background:`linear-gradient(180deg,${C.paperLight} 0%,${C.paper} 70%,${C.paperEdge} 70%,${C.paperEdge})`,opacity:ease(t,129,131)}}>
     <div style={{position:'absolute',left:70,top:680,width:230,height:870,boxSizing:'border-box',border:`14px solid ${C.bronzeDark}`,background:`linear-gradient(180deg,${C.blueDark},${C.surface})`,boxShadow:`inset 0 0 0 8px ${C.gold}`}}><div style={{position:'absolute',left:14,right:14,bottom:0,height:14,background:C.vermilion}}/></div>
     <div style={{position:'absolute',right:72,top:560,width:165,height:190,border:`10px solid ${C.bronzeDark}`,background:`linear-gradient(135deg,${C.blue}44,${C.paperLight})`}}><div style={{position:'absolute',left:'50%',top:0,bottom:0,width:7,background:C.bronzeDark}}/><div style={{position:'absolute',left:0,right:0,top:'50%',height:7,background:C.bronzeDark}}/></div>
     <div style={{position:'absolute',right:55,top:1200,width:310,height:220,borderRadius:'38px 38px 10px 10px',background:`linear-gradient(145deg,${C.blue},${C.blueDark})`,boxShadow:`0 18px 28px ${C.black}33`}}><div style={{position:'absolute',left:24,right:24,top:-48,height:86,borderRadius:26,background:C.blue}}/><div style={{position:'absolute',left:40,bottom:-38,width:20,height:38,background:C.bronzeDark}}/><div style={{position:'absolute',right:40,bottom:-38,width:20,height:38,background:C.bronzeDark}}/></div>
    </div>
    <Person x={mix(560,620,arrive)} y={810} bride arm={ease(t,137,138)} step={arrive} moving/><Person x={mix(720,840,arrive)} y={810} arm={ease(t,137,138)} step={arrive} moving/>
    {[{label:'字画',x:170,y:1490},{label:'餐具',x:335,y:1520},{label:'衣物',x:500,y:1490}].map((item,index)=>{
     const moved=index<unload.moved,active=index===unload.active;
     if(moved){
      if(index===0&&t>=137)return null;
      return <Box key={item.label} x={item.x} y={item.y} w={180} h={140} scale={.7} label={item.label} opacity={index===0?1-ease(t,137,137.4):1}/>;
     }
     if(!active)return null;
     const p=ease(unload.progress,0,1),scale=.7;
     const startX=truckX+([131,222,313][index]-365)*.88,startY=1370-195+174*.88;
     const controlX=430,controlY=1120;
     const inv=1-p;
     const x=inv*inv*startX+2*inv*p*controlX+p*p*item.x;
     const y=inv*inv*startY+2*inv*p*controlY+p*p*item.y;
     return <Box key={item.label} x={x} y={y} w={180} h={140} scale={scale} label={item.label}/>;
    })}
    {t>=137&&<>
     <div style={{position:'absolute',left:230,top:1555,width:300,height:55,background:C.vermilion,border:`4px solid ${C.gold}`,boxShadow:`0 12px 20px ${C.black}33`,display:'grid',placeItems:'center',fontSize:28,color:C.paperLight,opacity:ease(t,137,137.5),zIndex:7}}>入宅 · 安居</div>
     <div style={{position:'absolute',left:80,top:1070,width:180,height:410,boxSizing:'border-box',background:C.paperLight,border:`6px solid ${C.gold}`,boxShadow:`0 12px 24px ${C.black}33`,transformOrigin:'bottom center',transform:`translate(${270*ease(t,137,139)}px,${-350*ease(t,137,139)}px) scaleY(${ease(t,137,139)})`,zIndex:6,display:'flex',justifyContent:'center',alignItems:'center',gap:14,color:C.bronzeDark}}>
      <div style={{fontFamily:C.serif,fontSize:58,writingMode:'vertical-rl'}}>安居</div><div style={{fontFamily:C.serif,fontSize:24,writingMode:'vertical-rl',color:C.vermilion}}>丙午夏</div>
     </div>
     <div style={{position:'absolute',left:90,top:1160,fontSize:34,color:C.vermilion,zIndex:10,opacity:ease(t,138,139)}}>字画挂起 · 入宅仪式完成</div>
    </>}
   </>}
  </>}
  {t>=140&&<div style={{position:'absolute',inset:0,zIndex:1,overflow:'hidden',background:`linear-gradient(180deg,${C.paperLight} 0%,${C.paper} 70%,${C.paperEdge} 70%,${C.paperEdge})`,opacity:ease(t,139,140)}}>
   <div style={{position:'absolute',left:70,top:680,width:230,height:870,boxSizing:'border-box',border:`14px solid ${C.bronzeDark}`,background:`linear-gradient(180deg,${C.blueDark},${C.surface})`,boxShadow:`inset 0 0 0 8px ${C.gold}`}}><div style={{position:'absolute',left:14,right:14,bottom:0,height:14,background:C.vermilion}}/></div>
   <div style={{position:'absolute',right:72,top:560,width:165,height:190,border:`10px solid ${C.bronzeDark}`,background:`linear-gradient(135deg,${C.blue}44,${C.paperLight})`}}><div style={{position:'absolute',left:'50%',top:0,bottom:0,width:7,background:C.bronzeDark}}/><div style={{position:'absolute',left:0,right:0,top:'50%',height:7,background:C.bronzeDark}}/></div>
   <div style={{position:'absolute',right:55,top:1200,width:310,height:220,borderRadius:'38px 38px 10px 10px',background:`linear-gradient(145deg,${C.blue},${C.blueDark})`,boxShadow:`0 18px 28px ${C.black}33`}}><div style={{position:'absolute',left:24,right:24,top:-48,height:86,borderRadius:26,background:C.blue}}/><div style={{position:'absolute',left:40,bottom:-38,width:20,height:38,background:C.bronzeDark}}/><div style={{position:'absolute',right:40,bottom:-38,width:20,height:38,background:C.bronzeDark}}/></div>
   <div style={{position:'absolute',left:350,top:720,width:180,height:410,boxSizing:'border-box',background:C.paperLight,border:`6px solid ${C.gold}`,boxShadow:`0 12px 24px ${C.black}33`,display:'flex',justifyContent:'center',alignItems:'center',gap:14,color:C.bronzeDark,zIndex:6}}><div style={{fontFamily:C.serif,fontSize:58,writingMode:'vertical-rl'}}>安居</div><div style={{fontFamily:C.serif,fontSize:24,writingMode:'vertical-rl',color:C.vermilion}}>丙午夏</div></div>
   <div style={{position:'absolute',left:230,top:1555,width:300,height:55,background:C.vermilion,border:`4px solid ${C.gold}`,display:'grid',placeItems:'center',fontSize:28,color:C.paperLight,zIndex:7}}>入宅 · 安居</div>
   <Person x={620} y={810} bride home arm={settle} step={settle}/><Person x={840} y={810} home arm={settle} step={settle}/>
   {[{label:'餐具',x:335,y:1520},{label:'衣物',x:500,y:1490}].map(item=><Box key={item.label} x={item.x} y={item.y} w={180} h={140} scale={.7} label={item.label}/>)}
  </div>}
  {t>=88&&t<105&&<WeddingPaperCut t={t}/>}
  {t>=112&&<SimpleMove t={t}/>}
  <Caption t={t}/>
 </div>;
};
