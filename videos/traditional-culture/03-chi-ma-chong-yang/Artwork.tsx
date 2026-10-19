import React, {useId} from 'react';
import {ichingTheme as C} from '../../../src/config/theme';
import {progress} from '../../../src/lib/anim';
import {FONT} from './Chrome';

export const alpha = (hex: string, opacity: number) => {
  const n = Math.round(Math.max(0, Math.min(1, opacity)) * 255).toString(16).padStart(2, '0');
  return `${hex}${n}`;
};

export const Artboard: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <svg viewBox="0 0 904 760" style={{width: '100%', height: '100%', overflow: 'visible', ...style}}>
    {children}
  </svg>
);

/** 六十格圆环，每一格是一年。highlight 为 0 时指向正上方。 */
export const Ring60: React.FC<{
  cx: number; cy: number; r: number; reveal: number;
  highlight?: number; color?: string; opacity?: number;
}> = ({cx, cy, r, reveal, highlight = 0, color = C.gold, opacity = 1}) => <g opacity={opacity}>
  {Array.from({length: 60}, (_, i) => {
    const p = Math.min(1, Math.max(0, reveal * 60 - i));
    const a = ((i * 6 - 90) * Math.PI) / 180;
    const inner = r - (i % 5 === 0 ? 18 : 9);
    const outer = r;
    return <line
      key={i}
      x1={cx + Math.cos(a) * inner} y1={cy + Math.sin(a) * inner}
      x2={cx + Math.cos(a) * outer} y2={cy + Math.sin(a) * outer}
      stroke={i === highlight ? C.goldLight : color}
      strokeWidth={i === highlight ? 3 : 1}
      opacity={p * (i === highlight ? 1 : i % 5 === 0 ? 0.42 : 0.2)}
    />;
  })}
  {(() => {
    const a = ((highlight * 6 - 90) * Math.PI) / 180;
    const p = Math.min(1, Math.max(0, reveal * 60 - highlight));
    return <circle cx={cx + Math.cos(a) * (r + 16)} cy={cy + Math.sin(a) * (r + 16)} r={6} fill={C.goldLight} opacity={p} />;
  })()}
</g>;

/** 10×12 的干支配对表：只有阴阳同性的 60 格成立。 */
export const ParityGrid: React.FC<{appear: number; lit: number; dim: number}> = ({appear, lit, dim}) => {
  const x = 110;
  const y = 84;
  const cellW = 64;
  const cellH = 46;
  const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  return <g opacity={appear}>
    {branches.map((b, j) => <text key={b} x={x + j * cellW + cellW / 2} y={y - 16} textAnchor="middle" fill={C.secondary} fontFamily={FONT} fontSize={21} opacity={0.75}>{b}</text>)}
    {stems.map((s, i) => <text key={s} x={x - 18} y={y + i * cellH + cellH / 2 + 8} textAnchor="end" fill={C.secondary} fontFamily={FONT} fontSize={21} opacity={0.75}>{s}</text>)}
    {stems.map((_, i) => branches.map((__, j) => {
      const on = i % 2 === j % 2;
      const order = i * 12 + j;
      const wave = on ? Math.min(1, Math.max(0, lit * 120 - order)) : 0;
      return <rect
        key={`${i}-${j}`}
        x={x + j * cellW + 3}
        y={y + i * cellH + 3}
        width={cellW - 6}
        height={cellH - 6}
        rx={2}
        fill={on ? alpha(C.gold, 0.1 + wave * 0.26) : alpha(C.ivory, 0.015)}
        stroke={on ? alpha(C.gold, 0.28 + wave * 0.55) : alpha(C.ivory, 0.07 * (1 - dim * 0.55))}
        strokeWidth={1}
        opacity={Math.max(0, Math.min(1, appear * 120 - order * 0.4))}
      />;
    }))}
    <text x={452} y={632} textAnchor="middle" fill={C.secondary} fontFamily={FONT} fontSize={25} letterSpacing="4">阳干配阳支 · 阴干配阴支</text>
  </g>;
};

/** 1966 → 2026 → 2086，同一个丙午，隔六十年。 */
export const YearTrack: React.FC<{reveal: number; nodes: number; bracket: number}> = ({reveal, nodes, bracket}) => {
  const x = 452;
  const ys = [150, 380, 610];
  const years = ['1966', '2026', '2086'];
  return <g>
    <line x1={x} y1={70} x2={x} y2={700} stroke={alpha(C.gold, 0.35)} strokeWidth={2} pathLength="1" strokeDasharray="1" strokeDashoffset={1 - reveal} />
    {[0, 1].map(i => <g key={i} opacity={bracket}>
      <path d={`M${x - 120} ${ys[i] + 40} L${x - 120} ${ys[i + 1] - 40}`} stroke={alpha(C.gold, 0.3)} strokeWidth={1} />
      <path d={`M${x - 126} ${ys[i] + 40} L${x - 114} ${ys[i] + 40} M${x - 126} ${ys[i + 1] - 40} L${x - 114} ${ys[i + 1] - 40}`} stroke={alpha(C.gold, 0.3)} strokeWidth={1} />
      <text x={x - 148} y={(ys[i] + ys[i + 1]) / 2} textAnchor="middle" fill={C.muted} fontFamily={FONT} fontSize={22} transform={`rotate(-90 ${x - 148} ${(ys[i] + ys[i + 1]) / 2})`}>六十年</text>
    </g>)}
    {ys.map((yy, i) => {
      const p = Math.min(1, Math.max(0, nodes * 3 - i));
      const major = i === 1;
      return <g key={yy} opacity={p}>
        <circle cx={x} cy={yy} r={major ? 15 : 8} fill={major ? C.gold : C.ink} stroke={C.goldLight} strokeWidth={major ? 2 : 1.5} />
        {major && <circle cx={x} cy={yy} r={30} fill="none" stroke={alpha(C.gold, 0.35)} strokeWidth={1} />}
        <text x={x + (major ? 62 : 42)} y={yy + (major ? 4 : 2)} fill={major ? C.goldLight : C.secondary} fontFamily={FONT} fontSize={major ? 54 : 34} letterSpacing={major ? 4 : 2}>{years[i]}</text>
        {major && <text x={x + 64} y={yy + 54} fill={C.vermilion} fontFamily={FONT} fontSize={25} letterSpacing={3}>丙午 · 赤马</text>}
        {!major && <text x={x + 44} y={yy + 30} fill={C.muted} fontFamily={FONT} fontSize={20}>丙午</text>}
      </g>;
    })}
  </g>;
};

/** 摊开的古籍：左页书名，右页二十一道记号，末了盖一方“谏”。 */
export const Book: React.FC<{open: number; marks: number; seal: number}> = ({open, marks, seal}) => {
  const id = useId().replace(/:/g, '');
  return <g>
    <defs>
      <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor={C.ivory} /><stop offset="1" stopColor={C.secondary} />
      </linearGradient>
    </defs>
    <ellipse cx="452" cy="548" rx="390" ry="20" fill={alpha(C.black, 0.55)} />
    <g opacity={open} transform={`translate(${(1 - open) * -120} 0)`}>
      <path d="M120 150 Q290 118 452 160 L452 520 Q290 486 120 516 Z" fill={`url(#${id}-paper)`} stroke={alpha(C.gold, 0.5)} strokeWidth={1.5} />
      <path d="M150 186 Q290 160 424 194 L424 486 Q290 456 150 480 Z" fill="none" stroke={alpha(C.soil, 0.18)} />
      <text x="250" y="230" textAnchor="middle" fill={C.char} fontFamily={FONT} fontSize={26} letterSpacing={8}>南 宋</text>
      <text x="250" y="286" textAnchor="middle" fill={C.char} fontFamily={FONT} fontSize={54} letterSpacing={6}>丙丁</text>
      <text x="250" y="352" textAnchor="middle" fill={C.char} fontFamily={FONT} fontSize={54} letterSpacing={6}>龟鉴</text>
      <text x="250" y="422" textAnchor="middle" fill={C.soil} fontFamily={FONT} fontSize={24} letterSpacing={3}>柴望 撰</text>
    </g>
    <g opacity={open} transform={`translate(${(1 - open) * 120} 0)`}>
      <path d="M452 160 Q614 118 784 150 L784 516 Q614 486 452 520 Z" fill={`url(#${id}-paper)`} stroke={alpha(C.gold, 0.5)} strokeWidth={1.5} />
      <path d="M480 194 Q614 160 754 186 L754 480 Q614 456 480 486 Z" fill="none" stroke={alpha(C.soil, 0.18)} />
      {Array.from({length: 21}, (_, k) => {
        const row = Math.floor(k / 7);
        const col = k % 7;
        const p = Math.min(1, Math.max(0, marks * 21 - k));
        return <g key={k} opacity={p}>
          <rect x={510 + col * 36} y={222 + row * 78} width={3} height={34} rx={1} fill={C.vermilion} />
          <circle cx={511.5 + col * 36} cy={266 + row * 78} r={2.6} fill={C.vermilion} />
        </g>;
      })}
      <text x="612" y="474" textAnchor="middle" fill={C.soil} fontFamily={FONT} fontSize={22} letterSpacing={2}>二十一个丙午丁未年</text>
    </g>
    <path d="M452 160 L452 520" stroke={alpha(C.soil, 0.5)} strokeWidth={2} opacity={open} />
    <Seal x={706} y={352} size={86} text="谏" rotation={-9} scale={0.6 + seal * 0.4} opacity={seal} />
  </g>;
};

export const Seal: React.FC<{x: number; y: number; size: number; text: string; rotation?: number; scale?: number; opacity?: number}> = ({x, y, size, text, rotation = -8, scale = 1, opacity = 1}) => <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`} opacity={opacity}>
  <rect x={-size / 2} y={-size / 2} width={size} height={size} rx={5} fill={C.vermilion} />
  <rect x={-size / 2 + 6} y={-size / 2 + 6} width={size - 12} height={size - 12} rx={2} fill="none" stroke={alpha(C.ivory, 0.85)} strokeWidth={1.5} />
  <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fill={C.ivory} fontFamily={FONT} fontSize={size * 0.42} letterSpacing={2}>{text}</text>
</g>;

/** 重阳日历卡：一张卡，把“九月初九”按在画面上。 */
export const CalendarCard: React.FC<{reveal: number; stamp: number}> = ({reveal, stamp}) => <g opacity={reveal} transform={`translate(0 ${(1 - reveal) * 44})`}>
  <rect x="252" y="96" width="400" height="428" rx="6" fill={alpha(C.surface, 0.92)} stroke={alpha(C.gold, 0.42)} strokeWidth={1.5} />
  <path d="M252 96 L652 96 L652 152 L252 152 Z" fill={alpha(C.gold, 0.1)} />
  <text x="452" y="134" textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize={26} letterSpacing={10}>九月</text>
  <text x="452" y="352" textAnchor="middle" fill={C.ivory} fontFamily={FONT} fontSize={186} letterSpacing={8}>初九</text>
  <text x="452" y="424" textAnchor="middle" fill={C.secondary} fontFamily={C.numberFont} fontSize={30} letterSpacing={4}>2026.10.18</text>
  <text x="452" y="472" textAnchor="middle" fill={C.muted} fontFamily={FONT} fontSize={22} letterSpacing={6}>星期日 · 重阳</text>
  <Seal x={670} y={500} size={74} text="重阳" rotation={-11} scale={0.5 + stamp * 0.5} opacity={stamp} />
</g>;

export const Flame: React.FC<{x: number; y: number; scale?: number; opacity?: number}> = ({x, y, scale = 1, opacity = 1}) => <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
  <path d="M0 38 C-24 14 -9 -12 0 -38 C9 -12 24 14 0 38 Z" fill={C.vermilion} />
  <path d="M0 24 C-11 8 -4 -2 0 -16 C4 -2 11 8 0 24 Z" fill={C.goldLight} />
</g>;

/** 菊花：两层花瓣，逐瓣展开。 */
export const Chrysanthemum: React.FC<{cx: number; cy: number; r: number; reveal: number; petals?: number}> = ({cx, cy, r, reveal, petals = 14}) => <g>
  {Array.from({length: petals}, (_, i) => {
    const p = Math.min(1, Math.max(0, reveal * petals - i));
    return <ellipse key={i} cx={cx} cy={cy - r * 0.55} rx={r * 0.15} ry={r * 0.48} transform={`rotate(${i * 360 / petals} ${cx} ${cy})`} fill="none" stroke={C.gold} strokeWidth={1.6} opacity={p * 0.65} />;
  })}
  {Array.from({length: 8}, (_, i) => {
    const p = Math.min(1, Math.max(0, reveal * 16 - 8 - i));
    return <ellipse key={i} cx={cx} cy={cy - r * 0.28} rx={r * 0.1} ry={r * 0.26} transform={`rotate(${i * 45 + 22} ${cx} ${cy})`} fill={alpha(C.gold, 0.1)} stroke={C.goldLight} strokeWidth={1.2} opacity={p * 0.8} />;
  })}
  <circle cx={cx} cy={cy} r={r * 0.13} fill={alpha(C.goldLight, 0.9)} />
</g>;

/** 六十甲子里的一个名字，做成可翻阅的标签。 */
export const NameTag: React.FC<{x: number; y: number; name: string; at: number; frame: number}> = ({x, y, name, at, frame}) => {
  const p = progress(frame, at, 22);
  return <g opacity={p} transform={`translate(0 ${(1 - p) * 16})`}>
    <rect x={x} y={y} width={156} height={54} rx={27} fill="none" stroke={alpha(C.gold, 0.35)} />
    <text x={x + 78} y={y + 36} textAnchor="middle" fill={C.secondary} fontFamily={FONT} fontSize={24} letterSpacing={2}>{name}</text>
  </g>;
};
