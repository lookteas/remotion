import {lifeListingTheme as C} from '../../../src/config/theme';
import {step} from './ListingChart';

/** A concrete opening, followed by a choice. Footsteps stop outside the threshold. */
export const OpportunityGate=({frame:f}:{frame:number})=>{
  const appear=step(f,1785,1830),open=step(f,1860,1950);
  const angle=open*Math.PI*.43,w=255*Math.cos(angle),depth=55*Math.sin(angle);
  const exit=step(f,2140,2188);
  return <g opacity={appear*(1-exit)} transform={`translate(${(1-appear)*220-exit*180} 0)`}>
    <defs>
      <linearGradient id="opportunity-light" x1="1" y1="0" x2="0" y2="1"><stop stopColor={C.goldLight} stopOpacity=".55"/><stop offset="1" stopColor={C.gold} stopOpacity="0"/></linearGradient>
    </defs>
    <text x="125" y="1020" fontSize="46" fill={C.ivory}>一个新的机会，</text>
    <text x="125" y="1090" fontSize="46" fill={C.goldLight}>开始出现。</text>
    <path d="M670,1370L925,1370L365,1490L70,1410Z" fill="url(#opportunity-light)" opacity={open}/>
    <g filter="url(#listing-shadow)">
      <rect x="650" y="895" width="295" height="490" rx="6" fill={C.edge}/>
      <rect x="667" y="913" width="261" height="452" fill={C.goldLight}/>
      <rect x="680" y="925" width="235" height="430" fill={C.paper} opacity={.45}/>
      <path d={`M670,915L${670+w},${915+depth}V${1365+depth}L670,1365Z`} fill="url(#listing-paper)" stroke={C.soil} strokeWidth="3"/>
      <path d={`M${690},945L${670+w*.91},${945+depth*.91}V${1325+depth*.91}L690,1325Z`} fill="none" stroke={C.edge} strokeWidth="2" opacity={1-open*.8}/>
      <circle cx={670+w*.86} cy={1140+depth*.86} r="8" fill={C.bronzeDark}/>
      <path d="M644,1385H952" stroke={C.gold} strokeWidth="9"/>
    </g>
    <text x="797" y="862" textAnchor="middle" fill={C.goldLight} fontSize="42">转折点</text>
    {/* A finite sequence ends before the doorway: no automatic entry or promised offer. */}
    {Array.from({length:6},(_,i)=>{
      const p=step(f,1955+i*22,1970+i*22),x=230+i*72,y=1400-i*6+(i%2?17:-17);
      return <g key={i} opacity={p*.85} transform={`translate(${x} ${y-22*(1-p)}) rotate(77) scale(${.75+.25*p})`}>
        <path d="M-13,-24Q-17,-42 0,-43Q17,-42 13,-24L9,5H-9Z" fill={C.goldLight}/>
        <rect x="-9" y="11" width="18" height="16" rx="6" fill={C.goldLight}/>
        <path d="M-10,-22H10M-9,-14H9" stroke={C.edge} strokeWidth="2"/>
      </g>;
    })}
    <text x="540" y="1490" textAnchor="middle" fontSize="34" fill={C.goldLight} opacity={step(f,2090,2120)}>往前一步，需要你自己决定</text>
  </g>;
};
