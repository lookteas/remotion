import {loadFont} from '@remotion/fonts';
import {AbsoluteFill, Still, staticFile} from 'remotion';
import {lifeListingTheme as C} from '../../../src/config/theme';
import {Chart} from './ListingChart';

if(typeof document!=='undefined')void loadFont({family:'LifeListingSerif',url:staticFile('fonts/life-kline/NotoSerifSC-life-kline.woff2'),weight:'100 900'});

/** Independently composed covers, sharing the actual episode chart and palette. */
export const LifeKlineCover=({landscape=false}:{landscape?:boolean})=>{
  const left=landscape?110:90;
  return <AbsoluteFill style={{background:C.ink,color:C.ivory,fontFamily:C.font,overflow:'hidden'}}>
    <AbsoluteFill style={{background:`radial-gradient(ellipse at ${landscape?'73% 55%':'55% 66%'}, ${C.gold}22, transparent 65%)`}}/>
    <div style={{position:'absolute',left,top:landscape?95:170,fontSize:landscape?27:30,letterSpacing:5,color:C.gold}}>人生K线</div>
    <div style={{position:'absolute',left,top:landscape?195:270,fontSize:landscape?66:78,fontWeight:600,whiteSpace:'nowrap'}}>如果你的人生上市</div>
    <div style={{position:'absolute',left,top:landscape?320:400,fontSize:landscape?126:144,fontWeight:750,lineHeight:1.2,letterSpacing:2,color:C.goldLight}}>
      <div>你敢抄底</div><div>自己吗？</div>
    </div>
    <div style={{position:'absolute',left:landscape?900:54,top:landscape?140:780,width:1080,height:1000,transform:'scale(.9)',transformOrigin:'top left'}}>
      <div style={{position:'absolute',top:-400,width:1080,height:1920}}><Chart frame={145} showIncidents={false}/></div>
    </div>
    <div style={{position:'absolute',left,width:landscape?700:900,bottom:landscape?132:180,borderTop:`1px solid ${C.gold}55`,paddingTop:25,color:C.secondary,fontSize:landscape?30:34,letterSpacing:landscape?3:5}}>
      身体 / 技能 / 现金流
    </div>
  </AbsoluteFill>;
};

const MobileCover=()=> <LifeKlineCover/>;
const DesktopCover=()=> <LifeKlineCover landscape/>;
export const LifeKlineCovers=()=> <>
  <Still id="life-kline-cover-mobile" component={MobileCover} width={1080} height={1920}/>
  <Still id="life-kline-cover-desktop" component={DesktopCover} width={1920} height={1080}/>
</>;
