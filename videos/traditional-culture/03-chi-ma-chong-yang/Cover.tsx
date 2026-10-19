import React from 'react';
import {AbsoluteFill} from 'remotion';
import {ichingTheme as C} from '../../../src/config/theme';
import {alpha, Chrysanthemum} from './Artwork';
import {FONT} from './Chrome';

export const ChiMaCover: React.FC = () => {
  return <AbsoluteFill style={{background: C.ink, fontFamily: FONT, color: C.ivory, overflow: 'hidden'}}>
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 32%, ${C.gold}24, transparent 62%)`}} />
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
      <defs>
        <radialGradient id="cover-sun"><stop stopColor={C.vermilion} stopOpacity="0.32" /><stop offset="1" stopColor={C.vermilion} stopOpacity="0" /></radialGradient>
      </defs>

      <circle cx="782" cy="430" r="210" fill="url(#cover-sun)" />
      <circle cx="782" cy="430" r="126" fill={alpha(C.vermilion, 0.2)} />
      <circle cx="782" cy="430" r="126" fill="none" stroke={alpha(C.gold, 0.45)} strokeWidth="1.5" />

      <g transform="rotate(-8 540 700)">
        <circle cx="540" cy="700" r="326" fill="none" stroke={alpha(C.gold, 0.22)} strokeWidth="1.5" />
        <circle cx="540" cy="700" r="286" fill="none" stroke={alpha(C.gold, 0.09)} strokeWidth="1" />
        {Array.from({length: 60}, (_, i) => {
          const a = ((i * 6 - 90) * Math.PI) / 180;
          const major = i % 5 === 0;
          return <line
            key={i}
            x1={540 + Math.cos(a) * 330} y1={700 + Math.sin(a) * 330}
            x2={540 + Math.cos(a) * (major ? 368 : 350)} y2={700 + Math.sin(a) * (major ? 368 : 350)}
            stroke={alpha(C.gold, major ? 0.55 : 0.24)} strokeWidth={major ? 2.5 : 1.2}
          />;
        })}
      </g>
      <text x="540" y="700" textAnchor="middle" dominantBaseline="central" fill={alpha(C.goldLight, 0.07)} fontFamily={C.numberFont} fontSize="330">60</text>

      <Chrysanthemum cx={172} cy={900} r={96} reveal={1} />
      <g transform="translate(862 900) rotate(-8)">
        <rect x="-58" y="-58" width="116" height="116" rx="5" fill={C.vermilion} />
        <rect x="-49" y="-49" width="98" height="98" rx="3" fill="none" stroke={alpha(C.ivory, 0.85)} strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" dominantBaseline="central" fill={C.ivory} fontFamily={FONT} fontSize="38" letterSpacing="2">丙午</text>
      </g>

      <line x1="200" y1="1010" x2="880" y2="1010" stroke={alpha(C.gold, 0.35)} strokeWidth="1" />
    </svg>

    <div style={{position: 'absolute', top: 268, left: 0, right: 0, textAlign: 'center', color: C.gold, fontSize: 25, letterSpacing: 12}}>历法里的中国 · 二〇二六</div>

    <div style={{position: 'absolute', top: 500, left: 0, right: 0, textAlign: 'center'}}>
      <div style={{fontSize: 188, letterSpacing: 18, color: C.goldLight, lineHeight: 1.05}}>赤马</div>
      <div style={{fontSize: 188, letterSpacing: 18, color: C.ivory, lineHeight: 1.05, marginTop: -24}}>重阳</div>
    </div>

    <div style={{position: 'absolute', top: 920, left: 0, right: 0, textAlign: 'center', color: C.goldLight, fontSize: 82, letterSpacing: 4}}>六十年一遇？</div>

    <div style={{position: 'absolute', top: 1052, left: 0, right: 0, textAlign: 'center', color: C.secondary, fontSize: 33, lineHeight: 1.65, letterSpacing: 2}}>
      十天干配十二地支<br />为什么只有 60 种
    </div>

    <div style={{position: 'absolute', left: 100, right: 100, bottom: 226, borderTop: `1px solid ${C.ivory}22`, paddingTop: 22, display: 'flex', justifyContent: 'space-between', color: C.muted, fontSize: 22, letterSpacing: 2}}>
      <span>2026.10.18 · 重阳</span>
      <span>从丙午到《丙丁龟鉴》</span>
    </div>
  </AbsoluteFill>;
};
