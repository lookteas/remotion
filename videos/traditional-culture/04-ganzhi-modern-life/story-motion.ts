import {ease} from './motion';
export const STORY_DURATION=143;
export const weddingBackdropAt=(t:number)=>ease(t,87,88)*(1-ease(t,90,91));
export const sceneAt=(t:number)=>t<50?'legacy':t<64?'calligraphy':t<68?'bridge':'later';
export const openingAt=(t:number)=>({
 caption:t<2?'马年，为什么写“丙午”？':t<4?'丙是天干，午是地支。':t<6?'地支“午”，对应生肖马。':'丙午年名 → 午 → 马',
 split:ease(t,1.5,2.4),map:ease(t,3.5,4.6),join:ease(t,5.6,6.6),horse:ease(t,3.8,4.5),
});
export const legacyTime=(t:number)=>{
 if(t<8)return t;
 if(t<26)return 1.5+(t-8)*10/18;
 if(t<50)return 13+(t-26)*.5;
 if(t<64)return 25+(t-50)*10/14;
 return 35;
};
export const storyAt=(t:number)=>({
 stage:t<68?'examples':t<78?'compatibility':t<88?'wedding-date':t<95?'preparing':t<104?'ceremony':t<112?'moving-date':t<118?'packing':t<124?'loading':t<130?'transport':t<137?'entering':t<140?'settling':'discussion',
 camera:1250*ease(t,66,70)+1300*ease(t,102,106)+1250*ease(t,122,127)+1350*ease(t,130,135),
 ceremony:ease(t,88,95),ring:ease(t,96,100),embrace:ease(t,100,103),
 pack:ease(t,112,118),load:ease(t,118,124),drive:ease(t,124,130),
 enter:ease(t,130,137),settle:ease(t,137,140),question:ease(t,140,141),
 visibility:ease(t,64,65)
});
export const cargoAt=(t:number)=>{
 const starts=[118,120,122],duration=1.8;
 const loaded=starts.filter(start=>t>=start+duration).length;
 const active=starts.findIndex(start=>t>=start&&t<start+duration);
 const progress=active<0?0:Math.max(0,Math.min(1,(t-starts[active])/duration));
 return {active,loaded,progress};
};
export const unloadAt=(t:number)=>{
 const starts=[131,133,135],duration=1.2;
 const moved=starts.filter(start=>t>=start+duration).length;
 const active=starts.findIndex(start=>t>=start&&t<start+duration);
 const progress=active<0?0:Math.max(0,Math.min(1,(t-starts[active])/duration));
 return {active,moved,progress};
};
export const exteriorRevealAt=(t:number)=>ease(t,118,119);
export const exteriorOpacityAt=(t:number)=>1-ease(t,123,124);
export const roadRevealAt=(t:number)=>ease(t,123,124);
export const environmentAt=(t:number)=>t<118?'departure-home':t<130?'destination-exterior':t<140?'destination-interior':'settled-home';
