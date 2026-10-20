import React from 'react';

export type SheetColors = Record<'paper'|'paperLight'|'paperEdge'|'surface'|'ivory'|'bronzeDark'|'black'|'gold'|'bronze'|'secondary'|'vermilion', string>;

/** Theme-neutral sheet extracted from Bazi Paper, preserving its geometry and defaults. */
export const PaperSheet: React.FC<{colors: SheetColors; w?: number; h?: number; children?: React.ReactNode; mark?: 'hit' | 'miss'; dark?: boolean; style?: React.CSSProperties}> = ({colors: C, w = 340, h = 430, children, mark, dark = false, style}) => <div style={{width: w, height: h, position: 'relative', background: dark ? C.surface : `linear-gradient(125deg, ${C.paperLight}, ${C.paper} 65%, ${C.paperEdge})`, color: dark ? C.ivory : C.bronzeDark, borderRadius: '2px 16px 3px 3px', boxShadow: `5px 5px 0 ${C.paperEdge}, 9px 9px 0 ${C.bronzeDark}, 0 24px 45px ${C.black}88`, overflow: 'hidden', ...style}}>
  <div style={{position: 'absolute', inset: 15, border: `1px solid ${dark ? C.gold : C.bronze}66`}}/>
  <div style={{position: 'absolute', inset: 0, opacity: 0.08, background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${C.bronzeDark} 4px)`}}/>
  {children || <div style={{position: 'absolute', left: '17%', right: '17%', top: '23%'}}>{[0, 1, 2, 3, 4].map(i => <div key={i} style={{height: 3, background: dark ? C.secondary : C.bronze, opacity: 0.3, marginBottom: h * 0.09, width: i === 4 ? '55%' : '100%'}}/>)}</div>}
  {mark && <div style={{position: 'absolute', right: '12%', bottom: '10%', width: w * 0.26, height: w * 0.26, borderRadius: mark === 'hit' ? '50%' : 5, border: `5px solid ${mark === 'hit' ? C.bronze : C.vermilion}`, transform: 'rotate(-13deg)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{mark === 'miss' && <svg width="75%" height="75%" viewBox="0 0 60 60"><path d="M10 10 L50 50 M50 10 L10 50" stroke={C.vermilion} strokeWidth="6"/></svg>}{mark === 'hit' && <div style={{width: '65%', height: '65%', borderRadius: '50%', border: `2px solid ${C.bronze}`}}/>}</div>}
</div>;
