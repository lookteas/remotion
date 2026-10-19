import React, {useId} from 'react';
import {ichingTheme as C} from '../../../src/config/theme';
import {clamp, lerp, progress, rand} from '../../../src/lib/anim';
import {interpolate} from 'remotion';
import type {Line} from './hexagrams';

export const alpha = (hex: string, opacity: number) => {
  const n = Math.round(Math.max(0, Math.min(1, opacity)) * 255).toString(16).padStart(2, '0');
  return `${hex}${n}`;
};

export const Artboard: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <svg viewBox="0 0 1000 720" style={{width: '100%', height: '100%', overflow: 'visible', ...style}}>
    {children}
  </svg>
);

/** The SVG display reverses the bottom-to-top data order, never the data itself. */
export const Hexagram: React.FC<{
  lines: readonly Line[]; x?: number; y?: number; width?: number; height?: number;
  color?: string; opacity?: number; reveal?: number; focus?: number;
}> = ({lines, x = 0, y = 0, width = 150, height = 180, color = C.goldLight, opacity = 1, reveal = 1, focus = -1}) => {
  const pitch = height / lines.length;
  const thick = pitch * 0.44;
  const split = width * 0.16;
  return (
    <g opacity={opacity}>
      {lines.map((line, i) => {
        const p = Math.max(0, Math.min(1, reveal * lines.length - i));
        const top = y + (lines.length - 1 - i) * pitch;
        const fill = i === focus ? C.vermilion : color;
        return <g key={i} opacity={p} transform={`translate(0, ${(1 - p) * 16})`}>
          {line ? <rect x={x} y={top} width={width * p} height={thick} rx={1.5} fill={fill} /> : <>
            <rect x={x} y={top} width={(width - split) / 2 * p} height={thick} rx={1.5} fill={fill} />
            <rect x={x + (width + split) / 2} y={top} width={(width - split) / 2 * p} height={thick} rx={1.5} fill={fill} />
          </>}
        </g>;
      })}
    </g>
  );
};

export const Pot: React.FC<{frame: number; settle?: number; small?: boolean}> = ({frame, settle = 0, small = false}) => {
  const id = useId().replace(/:/g, '');
  const shake = Math.sin(frame * 0.12) * 3 * (1 - settle);
  const flame = lerp(1, 0.4, settle);
  const smoke = lerp(0.78, 0.1, settle);
  return <g transform={`translate(${shake}, 0)`}>
    <defs>
      <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="0">
        <stop stopColor={C.secondary} /><stop offset="0.32" stopColor={C.ivory} />
        <stop offset="0.65" stopColor={C.goldLight} /><stop offset="1" stopColor={C.secondary} />
      </linearGradient>
      <linearGradient id={`${id}-pan`} x1="0" y1="0" x2="0" y2="1">
        <stop stopColor={C.char} /><stop offset="1" stopColor={C.ink} />
      </linearGradient>
      <radialGradient id={`${id}-heat`}>
        <stop stopColor={C.gold} stopOpacity={0.24} /><stop offset="1" stopColor={C.gold} stopOpacity={0} />
      </radialGradient>
    </defs>
    <ellipse cx="510" cy="595" rx="340" ry="110" fill={`url(#${id}-heat)`} />
    <ellipse cx="510" cy="620" rx="290" ry="22" fill={alpha(C.black, 0.65)} />
    <rect x="280" y="544" width="460" height="46" rx="9" fill={C.surface} stroke={alpha(C.gold, 0.35)} />
    <ellipse cx="510" cy="542" rx="150" ry="24" fill={C.char} />
    {Array.from({length: 7}, (_, i) => {
      const x = 370 + i * 46;
      const h = (52 + Math.sin(frame / 5 + i) * 14) * flame;
      return <path key={i} d={`M${x - 15} 533 Q${x - 20} ${520 - h / 2} ${x} ${528 - h} Q${x + 25} 507 ${x + 15} 533 Z`} fill={i % 2 ? C.goldLight : C.gold} opacity={0.9} />;
    })}
    <path d="M295 373 Q310 520 510 521 Q710 520 725 373 Z" fill={`url(#${id}-metal)`} />
    <path d="M292 378 L190 338 Q175 333 172 345 Q170 354 185 360 L299 415" fill={C.char} stroke={C.secondary} strokeWidth="4" />
    <path d="M724 378 L827 343 Q840 339 843 350 Q846 362 832 366 L720 411" fill={C.char} stroke={C.secondary} strokeWidth="4" />
    <ellipse cx="510" cy="375" rx="218" ry="71" fill={`url(#${id}-pan)`} stroke={C.ivory} strokeWidth="5" />
    <ellipse cx="510" cy="386" rx="174" ry="44" fill={settle > 0.5 ? alpha(C.gold, 0.22) : C.char} />
    {Array.from({length: 13}, (_, i) => {
      const x = 385 + rand(i, 2) * 250;
      const y = 363 + rand(i, 3) * 51;
      const move = Math.sin(frame / 16 + i * 2) * 4;
      return <g key={i} transform={`translate(${x}, ${y + move}) rotate(${i * 42})`}>
        <ellipse rx={13 + rand(i, 4) * 8} ry="7" fill={i % 3 === 0 ? C.vermilion : settle > 0.5 ? C.green : C.soil} />
        <path d="M-6 0 L7 0" stroke={alpha(C.ivory, 0.35)} strokeWidth="1.5" />
      </g>;
    })}
    {Array.from({length: 5}, (_, i) => {
      const x = 395 + i * 58;
      const drift = (frame * 0.75 + i * 31) % 150;
      return <path key={i} d={`M${x} ${337 - drift} C${x - 30} ${290 - drift},${x + 32} ${261 - drift},${x} ${218 - drift}`} fill="none" stroke={C.secondary} strokeWidth={8 - i * 0.7} opacity={smoke * (1 - drift / 180)} strokeLinecap="round" />;
    })}
    {!small && <g opacity={1 - settle} transform={`translate(705 194) rotate(${-25 + Math.sin(frame / 11) * 6})`}>
      <rect x="-34" y="-80" width="68" height="107" rx="12" fill={alpha(C.ivory, 0.85)} />
      <rect x="-37" y="17" width="74" height="27" rx="5" fill={C.gold} />
      <text x="0" y="-21" textAnchor="middle" fill={C.char} fontSize="25" fontFamily={C.font}>盐</text>
      {Array.from({length: 15}, (_, i) => {
        const t = (frame * 2 + i * 11) % 135;
        return <circle key={i} cx={-8 + Math.sin(i) * (t / 9)} cy={52 + t} r="2.3" fill={C.ivory} opacity={1 - t / 150} />;
      })}
    </g>}
    <circle cx="680" cy="566" r="9" fill={C.gold} />
    <path d={`M680 566 l${Math.cos(lerp(-1, 1, settle)) * 6} ${Math.sin(lerp(-1, 1, settle)) * 6}`} stroke={C.char} strokeWidth="2" />
  </g>;
};

export const Plant: React.FC<{frame: number; growth: number; water?: number}> = ({frame, growth, water = 0}) => {
  const id = useId().replace(/:/g, '');
  const stem = progress(growth, 0.35, 0.65);
  const root = progress(growth, 0.02, 0.9);
  const sway = Math.sin(frame / 45) * 7;
  return <g>
    <defs>
      <linearGradient id={`${id}-soil`} x1="0" y1="0" x2="0" y2="1">
        <stop stopColor={C.soil} stopOpacity={0.58} /><stop offset="1" stopColor={C.soil} stopOpacity={0.1} />
      </linearGradient>
      <clipPath id={`${id}-pot`}><path d="M300 334 L350 650 L660 650 L710 334 Z" /></clipPath>
    </defs>
    <ellipse cx="505" cy="672" rx="240" ry="18" fill={alpha(C.black, 0.5)} />
    <path d="M300 334 L350 650 L660 650 L710 334 Z" fill={`url(#${id}-soil)`} stroke={alpha(C.gold, 0.65)} strokeWidth="2" />
    <g clipPath={`url(#${id}-pot)`}>
      {Array.from({length: 85}, (_, i) => <circle key={i} cx={310 + rand(i, 7) * 390} cy={350 + rand(i, 9) * 300} r={0.8 + rand(i, 2)} fill={C.goldLight} opacity={0.12 + rand(i, 3) * 0.13} />)}
      {Array.from({length: 15}, (_, i) => {
        const side = i % 2 ? 1 : -1;
        const y = 399 + i * 12;
        const length = 48 + rand(i, 8) * 110;
        const path = `M${505 + Math.sin(i) * 7} ${y} Q${505 + side * length * 0.4} ${y + 25} ${505 + side * length} ${y + 40 + rand(i, 5) * 35}`;
        return <path key={i} d={path} fill="none" stroke={C.goldLight} strokeWidth={1.2 + rand(i, 4)} strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - Math.max(0, Math.min(1, root * 2 - i * 0.07))} opacity={0.75} />;
      })}
      <path d="M505 358 C485 405 532 448 500 486 S526 556 505 610" fill="none" stroke={C.ivory} strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - root} opacity={0.85} />
    </g>
    <ellipse cx="505" cy="333" rx="207" ry="32" fill={C.soil} stroke={C.gold} strokeWidth="2" />
    <ellipse cx="505" cy="354" rx="12" ry="18" fill={C.goldLight} transform="rotate(22 505 354)" />
    <g opacity={Math.min(1, stem * 4)}>
      <path d={`M505 332 Q${500 + sway} 260 ${505 + sway} ${332 - stem * 190}`} stroke={C.green} strokeWidth="6" fill="none" strokeLinecap="round" />
      <g transform={`translate(${505 + sway * stem}, ${332 - stem * 165}) scale(${stem})`}>
        <path d="M0 18 C-98 30 -127 -20 -129 -64 C-45 -72 -3 -33 0 18 Z" fill={C.green} />
        <path d="M0 0 C24 -74 91 -75 132 -108 C155 -17 74 27 0 0 Z" fill={C.green} />
        <path d="M0 18 L-105 -48 M0 0 L112 -85" stroke={alpha(C.ivory, 0.4)} strokeWidth="2" fill="none" />
      </g>
    </g>
    <path d="M740 177 Q780 172 791 204 L727 235" stroke={C.gold} strokeWidth="7" fill="none" />
    <g opacity={water}>
      {Array.from({length: 12}, (_, i) => {
        const t = (frame * 3 + i * 23) % 180;
        return <ellipse key={i} cx={706 - t * 0.6 + rand(i, 4) * 24} cy={217 + t * 0.58} rx="2.4" ry="5" fill={C.water} opacity={1 - t / 210} transform={`rotate(35 ${706 - t * 0.6} ${217 + t * 0.58})`} />;
      })}
    </g>
    <g transform="translate(779 120) rotate(24)">
      <path d="M-28 17 Q-56 -47 -15 -49 Q28 -48 20 3" fill="none" stroke={C.secondary} strokeWidth="9" />
      <path d="M-75 0 L63 0 L47 110 Q-3 128 -62 104 Z" fill={C.secondary} />
      <ellipse cx="-6" cy="0" rx="69" ry="13" fill={C.ivory} />
      <path d="M-72 58 L-144 98 L-143 75 L-78 26" fill={C.secondary} />
    </g>
    <path d="M282 335 L237 335 L237 651 L330 651" stroke={alpha(C.gold, 0.4)} strokeWidth="1" fill="none" />
    <text x="219" y="496" textAnchor="middle" fill={C.secondary} fontFamily={C.font} fontSize="21" transform="rotate(-90 219 496)">土下，也在发生变化</text>
  </g>;
};

export const Notebook: React.FC<{frame: number; opening: number; small?: boolean}> = ({frame, opening, small = false}) => {
  const id = useId().replace(/:/g, '');
  const page = interpolate(opening, [0, 0.75, 1], [1, 0.12, 0], clamp);
  return <g transform={`translate(0 ${Math.sin(frame / 75) * 3})`}>
    <defs>
      <linearGradient id={`${id}-paper`}><stop stopColor={C.secondary} /><stop offset="0.45" stopColor={C.ivory} /><stop offset="1" stopColor={C.goldLight} /></linearGradient>
    </defs>
    <ellipse cx="500" cy="592" rx="330" ry="27" fill={alpha(C.black, 0.5)} />
    <path d="M170 194 Q336 160 500 200 Q664 160 830 194 L830 571 Q666 540 500 584 Q336 540 170 571 Z" fill={C.soil} stroke={C.gold} strokeWidth="2" />
    <path d="M179 188 Q336 153 500 192 L500 568 Q336 529 179 558 Z" fill={`url(#${id}-paper)`} />
    <path d="M500 192 Q665 153 821 188 L821 558 Q665 529 500 568 Z" fill={C.ivory} />
    <path d="M500 192 L500 568" stroke={C.soil} strokeWidth="3" opacity="0.5" />
    <g opacity={1 - opening}>
      <text x="235" y="247" fill={C.char} fontFamily={C.font} fontSize="27">拿手菜 · 第一页</text>
      {Array.from({length: 8}, (_, i) => <g key={i} opacity={0.45 + rand(i, 4) * 0.3}>
        <path d={`M235 ${280 + i * 28} Q320 ${276 + i * 28} ${405 + rand(i, 2) * 35} ${283 + i * 28}`} stroke={C.soil} strokeWidth="2" fill="none" />
        <path d={`M555 ${247 + i * 32} Q638 ${239 + i * 32} ${707 + rand(i, 3) * 55} ${244 + i * 32}`} stroke={C.soil} strokeWidth="2" fill="none" />
      </g>)}
    </g>
    <path d={`M500 192 Q${500 + page * 160} ${158 - opening * 60} ${500 + page * 321} 188 L${500 + page * 321} 558 Q${500 + page * 160} 529 500 568 Z`} fill={C.goldLight} opacity={opening > 0.97 ? 0 : 0.85} />
    <g opacity={progress(opening, 0.6, 0.4)}>
      <text x="555" y="253" fill={C.soil} fontFamily={C.font} fontSize="29">新的菜，慢慢学。</text>
      <path d="M555 279 L761 279" stroke={alpha(C.soil, 0.25)} strokeWidth="1" />
      {!small && <text x="657" y="465" textAnchor="middle" fill={alpha(C.soil, 0.4)} fontFamily={C.font} fontSize="21">这一页，留给下一次。</text>}
    </g>
    <g transform="translate(825 470) rotate(-28)">
      <rect width="12" height="145" rx="3" fill={C.gold} />
      <path d="M0 145 L6 165 L12 145" fill={C.ivory} /><path d="M4 158 L6 165 L8 158" fill={C.char} />
    </g>
  </g>;
};

export const Schoolbag: React.FC<{frame: number}> = ({frame}) => <g transform={`translate(0 ${Math.sin(frame / 50) * 5})`}>
  <ellipse cx="500" cy="600" rx="180" ry="20" fill={alpha(C.black, 0.55)} />
  <path d="M420 252 L420 204 Q500 136 580 204 L580 252" fill="none" stroke={C.gold} strokeWidth="17" />
  <path d="M355 263 Q500 208 645 263 L674 565 Q500 621 326 565 Z" fill={C.secondary} />
  <path d="M365 267 Q500 228 635 267 L635 331 Q500 377 365 331 Z" fill={C.ivory} />
  <rect x="398" y="389" width="205" height="140" rx="22" fill={C.soil} stroke={C.gold} strokeWidth="3" />
  <path d="M420 416 L582 416" stroke={C.goldLight} strokeWidth="3" />
  <circle cx="577" cy="426" r="5" fill={C.ivory} />
  <rect x="405" y="306" width="18" height="58" rx="6" fill={C.gold} /><rect x="578" y="306" width="18" height="58" rx="6" fill={C.gold} />
</g>;
