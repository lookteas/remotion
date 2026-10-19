import React, {useId} from 'react';
import {baziTheme as C} from '../../../src/config/theme';
import {progress, rand} from '../../../src/lib/anim';

/** One material vocabulary. Actual geometry, side faces and contact shadows. */
export const Block: React.FC<{w: number; h: number; d?: number; children?: React.ReactNode; style?: React.CSSProperties; paper?: boolean}> = ({w, h, d = 18, children, style, paper = false}) => {
  const front = paper ? C.paper : C.bronze;
  return <div style={{position: 'relative', width: w, height: h, transformStyle: 'preserve-3d', ...style}}>
    <div style={{position: 'absolute', width: w, height: d, bottom: 0, background: paper ? C.paperEdge : C.bronzeDark, transformOrigin: 'bottom', transform: 'rotateX(90deg)', border: `1px solid ${C.bronzeDark}`}}/>
    <div style={{position: 'absolute', width: d, height: h, right: 0, background: paper ? C.paperEdge : C.bronzeDark, transformOrigin: 'right', transform: 'rotateY(-90deg)'}}/>
    <div style={{position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${paper ? C.paperLight : C.goldLight}, ${front} 48%, ${paper ? C.paper : C.bronzeDark})`, border: `2px solid ${paper ? C.paperEdge : C.gold}`, borderRadius: 5, boxShadow: `inset 0 2px 2px ${C.paperLight}88, inset 0 -3px 4px ${C.black}44, 0 35px 45px ${C.black}66`, transform: `translateZ(${d}px)`, overflow: 'hidden'}}>{children}</div>
  </div>;
};

export const BirthSeal = ({size = 300, frame = 0, flip = false}: {size?: number; frame?: number; flip?: boolean}) => <Block w={size} h={size * 0.6} d={24} style={{transform: 'rotateX(12deg) rotateY(-14deg)'}}>
  <div style={{position: 'absolute', inset: size * 0.07, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: size * 0.025}}>
    {Array.from({length: 4}, (_, i) => <div key={i} style={{display: 'grid', gap: 5, transform: `perspective(500px) rotateX(${flip ? (1 - progress(frame, i * 7, 25)) * -165 : 0}deg)`, transformOrigin: '50% 50%'}}>
      {[0, 1].map(j => <div key={j} style={{border: `1px solid ${C.goldLight}88`, background: C.bronzeDark, boxShadow: `inset 2px 3px 4px ${C.black}88`, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 7, padding: '0 20%'}}><div style={{height: 3, background: C.gold}}/><div style={{height: 3, background: C.gold, width: '75%'}}/></div>)}
    </div>)}
  </div>
</Block>;

export const Figure = ({size = 220, variant = 0}: {size?: number; variant?: number}) => {
  const id = useId().replace(/:/g, '');
  const coat = variant % 2 ? C.blue : C.bronze;
  return <svg width={size} height={size * 1.7} viewBox="0 0 200 340" style={{overflow: 'visible'}}>
    <defs><linearGradient id={`${id}coat`}><stop stopColor={C.bronzeDark}/><stop offset="0.4" stopColor={coat}/><stop offset="0.64" stopColor={variant % 2 ? C.water : C.gold}/><stop offset="1" stopColor={C.bronzeDark}/></linearGradient><radialGradient id={`${id}head`} cx="35%" cy="25%"><stop stopColor={C.paperLight}/><stop offset="0.65" stopColor={C.paper}/><stop offset="1" stopColor={C.paperEdge}/></radialGradient></defs>
    <ellipse cx="100" cy="320" rx="78" ry="18" fill={C.black} opacity="0.55"/>
    <path d="M61 237 L66 305 Q78 316 87 304 L99 242 L112 304 Q124 315 135 304 L141 237Z" fill={C.bronzeDark}/>
    <path d="M75 105 Q40 113 35 148 L22 229 Q21 244 35 244 L53 185 L52 252 Q99 271 150 252 L148 180 L166 241 Q181 247 177 228 L163 146 Q157 112 125 105Z" fill={`url(#${id}coat)`}/>
    <path d="M74 110 L99 159 L127 109 L118 198 L100 239 L82 197Z" fill={C.paper} opacity="0.35"/>
    <path d="M100 158 V249" stroke={C.goldLight} strokeWidth="2" opacity="0.55"/>
    <ellipse cx="100" cy="66" rx="37" ry="43" fill={`url(#${id}head)`}/>
    {variant % 3 === 1 && <path d="M57 50 Q61 8 102 13 Q137 12 143 50Z" fill={C.blueDark}/>}
    {variant % 3 === 2 && <><path d="M124 128 L63 231" stroke={C.goldLight} strokeWidth="7"/><rect x="45" y="204" width="53" height="45" rx="9" fill={C.bronzeDark} stroke={C.gold}/></>}
    <ellipse cx="100" cy="322" rx="72" ry="13" fill={C.bronze}/><ellipse cx="100" cy="316" rx="72" ry="13" fill={C.gold}/>
  </svg>;
};

export const Paper: React.FC<{w?: number; h?: number; children?: React.ReactNode; mark?: 'hit' | 'miss'; dark?: boolean; style?: React.CSSProperties}> = ({w = 340, h = 430, children, mark, dark = false, style}) => <div style={{width: w, height: h, position: 'relative', background: dark ? C.surface : `linear-gradient(125deg, ${C.paperLight}, ${C.paper} 65%, ${C.paperEdge})`, color: dark ? C.ivory : C.bronzeDark, borderRadius: '2px 16px 3px 3px', boxShadow: `5px 5px 0 ${C.paperEdge}, 9px 9px 0 ${C.bronzeDark}, 0 24px 45px ${C.black}88`, overflow: 'hidden', ...style}}>
  <div style={{position: 'absolute', inset: 15, border: `1px solid ${dark ? C.gold : C.bronze}66`}}/>
  <div style={{position: 'absolute', inset: 0, opacity: 0.08, background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${C.bronzeDark} 4px)`}}/>
  {children || <div style={{position: 'absolute', left: '17%', right: '17%', top: '23%'}}>{[0, 1, 2, 3, 4].map(i => <div key={i} style={{height: 3, background: dark ? C.secondary : C.bronze, opacity: 0.3, marginBottom: h * 0.09, width: i === 4 ? '55%' : '100%'}}/>)}</div>}
  {mark && <div style={{position: 'absolute', right: '12%', bottom: '10%', width: w * 0.26, height: w * 0.26, borderRadius: mark === 'hit' ? '50%' : 5, border: `5px solid ${mark === 'hit' ? C.bronze : C.vermilion}`, transform: 'rotate(-13deg)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{mark === 'miss' && <svg width="75%" height="75%" viewBox="0 0 60 60"><path d="M10 10 L50 50 M50 10 L10 50" stroke={C.vermilion} strokeWidth="6"/></svg>}{mark === 'hit' && <div style={{width: '65%', height: '65%', borderRadius: '50%', border: `2px solid ${C.bronze}`}}/>}</div>}
</div>;

export const Book = ({open = 0, size = 470}: {open?: number; size?: number}) => <div style={{width: size, height: size * 0.68, position: 'relative', perspective: 1000, transformStyle: 'preserve-3d', transform: 'rotateX(18deg) rotateZ(-7deg)'}}>
  <Block w={size} h={size * 0.68} d={25} paper><div style={{position: 'absolute', inset: '12%', border: `2px solid ${C.paperEdge}`}}/></Block>
  <div style={{position: 'absolute', inset: 0, background: `linear-gradient(100deg, ${C.bronzeDark}, ${C.bronze} 10%, ${C.bronzeDark})`, border: `3px solid ${C.gold}`, boxShadow: `inset 0 0 0 15px ${C.bronzeDark}, inset 0 0 0 17px ${C.gold}88`, transformOrigin: '0 50%', transform: `translateZ(30px) rotateY(${-open * 145}deg)`}}><div style={{position: 'absolute', left: '37%', top: '30%', width: '30%', height: '40%', border: `1px solid ${C.gold}`}}/></div>
</div>;

export const House = ({variant = 0, size = 300}: {variant?: number; size?: number}) => <svg width={size} height={size} viewBox="0 0 300 300" style={{overflow: 'visible', filter: `drop-shadow(0 20px 15px ${C.black}88)`}}>
  <path d="M30 120 L175 78 L272 130 L128 178Z" fill={C.goldLight}/>
  <path d="M30 120 V250 L128 290 V178Z" fill={C.paperEdge}/><path d="M128 178 L272 130 V248 L128 290Z" fill={variant ? C.blue : C.paper}/>
  {variant ? <><path d="M30 120 V47 L175 5 L272 57 V130 L128 178Z" fill={C.blue}/><path d="M30 47 L175 5 L272 57 L128 105Z" fill={C.paper}/><path d="M30 47 L128 105 V178 L30 120Z" fill={C.blueDark}/>{[0, 1].map(i => <path key={i} d={`M${153 + i * 58} ${110 - i * 17} v35 l32 -10 v-35Z`} fill={C.bronzeDark}/>)}</> : <><path d="M12 124 L84 34 L186 74 L129 179Z" fill={C.gold}/><path d="M84 34 L186 74 L290 124 L175 80Z" fill={C.bronze}/></>}
  {[0, 1].map(i => <path key={i} d={`M${153 + i * 58} ${185 - i * 17} v41 l32 -10 v-41Z`} fill={C.bronzeDark}/>)}
  <path d="M65 172 L96 186 V270 L65 258Z" fill={C.bronzeDark}/><path d="M162 200 L177 195" stroke={C.goldLight} strokeWidth="2"/>
</svg>;

export const Suitcase = ({size = 210}: {size?: number}) => <svg width={size} height={size} viewBox="0 0 220 220" style={{filter: `drop-shadow(0 18px 12px ${C.black}88)`}}>
  <path d="M80 48 V20 Q80 8 95 8 H137 Q150 8 150 20 V48" fill="none" stroke={C.gold} strokeWidth="12"/>
  <path d="M24 60 L171 35 L204 53 V180 L52 207 L24 186Z" fill={C.bronze}/><path d="M52 78 L204 53 V180 L52 207Z" fill={C.blueDark}/><path d="M52 78 L24 60" stroke={C.goldLight}/>
  <path d="M82 72 V200 M174 59 V187" stroke={C.gold} strokeWidth="9"/><rect x="112" y="102" width="40" height="40" rx="3" fill={C.paper} transform="rotate(-10 132 122)"/>
  <circle cx="76" cy="206" r="9" fill={C.bronzeDark}/><circle cx="180" cy="188" r="9" fill={C.bronzeDark}/>
</svg>;

export const Lock = ({closed = 1, size = 140}: {closed?: number; size?: number}) => <svg width={size} height={size * 1.25} viewBox="0 0 140 175" style={{overflow: 'visible', filter: `drop-shadow(0 14px 14px ${C.black}99)`}}>
  <path d={`M35 80 V${30 - (1 - closed) * 24} C35 ${-10 - (1 - closed) * 24} 105 ${-10 - (1 - closed) * 24} 105 ${30 - (1 - closed) * 24} V${80 - (1 - closed) * 28}`} fill="none" stroke={C.goldLight} strokeWidth="13"/>
  <path d="M15 77 L122 65 L137 79 V155 L30 171 L15 155Z" fill={C.bronze}/><path d="M30 91 L137 79 V155 L30 171Z" fill={C.gold}/><path d="M15 77 L122 65 L137 79 L30 91Z" fill={C.goldLight}/>
  <circle cx="82" cy="119" r="12" fill={C.bronzeDark}/><path d="M78 122 L74 145 H91 L86 122" fill={C.bronzeDark}/>
</svg>;

export const Envelope = ({close = 1, w = 430}: {close?: number; w?: number}) => <div style={{position: 'relative', width: w, height: w * 0.64, perspective: 800}}>
  <div style={{position: 'absolute', inset: 0, background: C.paperEdge, boxShadow: `0 28px 40px ${C.black}77`}}/>
  <div style={{position: 'absolute', inset: 0, background: `linear-gradient(30deg, ${C.paperEdge}, ${C.paper})`, clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)'}}/>
  <div style={{position: 'absolute', inset: 0, background: C.paperLight, clipPath: 'polygon(0 100%, 50% 35%, 100% 100%)', opacity: 0.7}}/>
  <div style={{position: 'absolute', left: 0, top: 0, width: w, height: w * 0.34, background: `linear-gradient(${C.paperLight}, ${C.paperEdge})`, clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transformOrigin: 'top', transform: `rotateX(${(1 - close) * 160}deg)`}}/>
  <div style={{position: 'absolute', left: '42%', top: '38%', width: '16%', aspectRatio: '1', borderRadius: '50%', background: `radial-gradient(circle at 35% 25%, ${C.goldLight}, ${C.bronze})`, opacity: progress(close, 0.8, 0.2), boxShadow: `2px 5px 8px ${C.black}66`, border: `4px double ${C.goldLight}`}}/>
</div>;

export const Burst = ({frame, at, x = 540, y = 950, count = 36}: {frame: number; at: number; x?: number; y?: number; count?: number}) => {
  const t = frame - at;
  if (t < 0 || t > 34) return null;
  return <>{Array.from({length: count}, (_, i) => {
    const angle = rand(i, 12) * Math.PI * 2;
    const distance = t * (3 + rand(i, 7) * 7);
    return <div key={i} style={{position: 'absolute', left: x + Math.cos(angle) * distance, top: y + Math.sin(angle) * distance * 0.4 + t * t * 0.1, width: 2 + rand(i, 9) * 5, height: 3 + rand(i, 4) * 9, background: C.goldLight, opacity: (1 - t / 34) * 0.8, transform: `rotate(${i * 19 + t * 7}deg)`, boxShadow: `0 0 9px ${C.gold}`}}/>;
  })}</>;
};
