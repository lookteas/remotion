import React, {useId} from 'react';
import {AbsoluteFill, Easing, useCurrentFrame} from 'remotion';
import {ichingTheme as C} from '../../../src/config/theme';
import {lerp, progress, rand} from '../../../src/lib/anim';
import {alpha, Chrysanthemum} from './Artwork';
import {FONT} from './Chrome';

const W = 1080;
const H = 4000;
const DURATION = 480;

/** 一镜到底：镜头沿竖卷自上而下走，不在场景之间硬切。 */
const CAMERA = [
  {at: 0, y: 0},
  {at: 90, y: 60},
  {at: 180, y: 300},
  {at: 270, y: 750},
  {at: 360, y: 1250},
  {at: 450, y: 1850},
  {at: 480, y: 2000},
];

const cameraY = (frame: number) => {
  for (let i = 0; i < CAMERA.length - 1; i += 1) {
    const a = CAMERA[i];
    const b = CAMERA[i + 1];
    if (frame <= b.at) {
      const t = Math.max(0, Math.min(1, (frame - a.at) / (b.at - a.at)));
      return lerp(a.y, b.y, Easing.inOut(Easing.cubic)(t));
    }
  }
  return CAMERA[CAMERA.length - 1].y;
};

const BEATS = [
  {from: 0, to: 95, text: '九月初九，两九相重。'},
  {from: 95, to: 185, text: '登高，是秋天里的一次出门。'},
  {from: 185, to: 275, text: '赏菊，看一整个秋天。'},
  {from: 275, to: 365, text: '插茱萸，驱蚊驱潮。'},
  {from: 365, to: 455, text: '九层重阳糕，步步高。'},
  {from: 455, to: 560, text: '重阳，本来就是把日子过好。'},
];

/** 山道：从山脚走到山脊。 */
const pathPoint = (t: number) => ({
  x: 140 + 700 * t,
  y: 1060 - 380 * t + Math.sin(Math.PI * t) * 70,
});

const Pine: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M0 0 L0 -86" stroke={C.soil} strokeWidth={5} />
  <path d="M0 -96 L-28 -44 L28 -44 Z" fill={C.char} stroke={alpha(C.gold, 0.28)} strokeWidth={1} />
  <path d="M0 -68 L-24 -22 L24 -22 Z" fill={C.char} stroke={alpha(C.gold, 0.28)} strokeWidth={1} />
  <path d="M0 -40 L-18 0 L18 0 Z" fill={C.char} stroke={alpha(C.gold, 0.28)} strokeWidth={1} />
</g>;

const Walker: React.FC<{x: number; y: number; frame: number}> = ({x, y, frame}) => {
  const swing = Math.sin(frame * 0.42) * 8;
  const bob = Math.sin(frame * 0.42) * 1.6;
  return <g transform={`translate(${x} ${y + bob}) scale(1.35)`}>
    <ellipse cx="0" cy="22" rx="14" ry="4" fill={alpha(C.black, 0.5)} />
    <path d="M-9 -22 C-13 0 -11 12 0 18 C11 12 13 0 9 -22 Z" fill={C.ivory} />
    <path d={`M-2 10 L${-7 + swing * 0.6} 22`} stroke={C.ivory} strokeWidth={4} strokeLinecap="round" />
    <path d={`M2 10 L${7 - swing * 0.6} 22`} stroke={C.ivory} strokeWidth={4} strokeLinecap="round" />
    <path d={`M-8 -16 L${-13 - swing * 0.4} -2`} stroke={C.ivory} strokeWidth={3} strokeLinecap="round" />
    <path d={`M8 -16 L${13 + swing * 0.4} -2`} stroke={C.ivory} strokeWidth={3} strokeLinecap="round" />
    <circle cx="0" cy="-30" r="6.5" fill={C.ivory} />
    <path d="M-17 -34 Q0 -50 17 -34 Z" fill={C.gold} />
    <path d="M0 -23 L9 -19" stroke={C.vermilion} strokeWidth={3} strokeLinecap="round" />
  </g>;
};

export const ChongyangScrollScene: React.FC = () => {
  const frame = useCurrentFrame();
  const uid = useId().replace(/:/g, '');
  const y = cameraY(frame);
  const walk = progress(frame, 95, 210);
  const point = pathPoint(walk);
  const beat = BEATS.find(b => frame >= b.from && frame < b.to);
  const captionOpacity = beat
    ? Math.min(progress(frame, beat.from, 10), 1 - progress(frame, beat.to - 10, 10))
    : 0;
  const berries = progress(frame, 300, 60);
  const closing = progress(frame, 445, 30);

  const pathPts = Array.from({length: 40}, (_, i) => pathPoint(i / 39));
  const pathD = `M${pathPts.map(p => `${p.x} ${p.y}`).join(' L')}`;

  return <AbsoluteFill style={{background: C.ink, fontFamily: FONT, color: C.ivory, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H, transform: `translateY(${-y}px)`}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor={C.surface} /><stop offset="0.45" stopColor={C.ink} />
          </linearGradient>
          <linearGradient id={`${uid}-ridge`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor={C.char} /><stop offset="1" stopColor={C.ink} />
          </linearGradient>
          <filter id={`${uid}-blur`}><feGaussianBlur stdDeviation="16" /></filter>
          <filter id={`${uid}-soft`}><feGaussianBlur stdDeviation="40" /></filter>
        </defs>

        <rect width={W} height={H} fill={`url(#${uid}-sky)`} />
        <circle cx="820" cy="210" r="150" fill={alpha(C.gold, 0.05)} filter={`url(#${uid}-soft)`} />
        <circle cx="820" cy="210" r="74" fill={alpha(C.gold, 0.16)} />
        <circle cx="820" cy="210" r="74" fill="none" stroke={alpha(C.gold, 0.24)} />

        {Array.from({length: 28}, (_, i) => <path
          key={i}
          d={`M${40 + rand(i, 5) * 1000} 0 L${40 + rand(i, 5) * 1000} ${H}`}
          stroke={alpha(C.ivory, 0.018)}
          strokeWidth={1}
        />)}

        {/* 卷轴轴杆 */}
        <rect x="28" y="3920" width="1024" height="20" rx="10" fill={C.soil} stroke={alpha(C.gold, 0.35)} />
        <circle cx="28" cy="3930" r="16" fill={C.char} stroke={C.gold} />
        <circle cx="1052" cy="3930" r="16" fill={C.char} stroke={C.gold} />

        {/* 题签 */}
        <g opacity={1 - progress(frame, 60, 30)}>
          <text x="156" y="370" textAnchor="middle" fill={C.goldLight} fontFamily={FONT} fontSize="104">重</text>
          <text x="156" y="484" textAnchor="middle" fill={C.goldLight} fontFamily={FONT} fontSize="104">阳</text>
          <text x="262" y="336" textAnchor="middle" fill={C.secondary} fontFamily={FONT} fontSize="24" letterSpacing="6">九</text>
          <text x="262" y="372" textAnchor="middle" fill={C.secondary} fontFamily={FONT} fontSize="24" letterSpacing="6">月</text>
          <text x="262" y="408" textAnchor="middle" fill={C.secondary} fontFamily={FONT} fontSize="24" letterSpacing="6">初</text>
          <text x="262" y="444" textAnchor="middle" fill={C.secondary} fontFamily={FONT} fontSize="24" letterSpacing="6">九</text>
          <path d="M206 316 L206 476" stroke={alpha(C.gold, 0.35)} />
          <g transform="translate(156 566) rotate(-6)">
            <rect x="-36" y="-36" width="72" height="72" rx="4" fill={C.vermilion} />
            <rect x="-30" y="-30" width="60" height="60" rx="2" fill="none" stroke={alpha(C.ivory, 0.8)} />
            <text x="0" y="2" textAnchor="middle" dominantBaseline="central" fill={C.ivory} fontFamily={FONT} fontSize="28">重九</text>
          </g>
        </g>

        {/* 远山与雾 */}
        <path d="M0 650 C180 580 330 650 500 600 C680 546 860 620 1080 570 L1080 980 L0 980 Z" fill={C.surface} opacity={0.55} />
        <path d="M0 810 C220 730 400 810 580 750 C780 680 940 760 1080 710 L1080 1200 L0 1200 Z" fill={`url(#${uid}-ridge)`} />
        {[420, 760, 1080, 1420, 1760, 2100, 2420].map((cy, i) => <ellipse
          key={cy}
          cx={540 + Math.sin(frame / 110 + i) * 90}
          cy={cy}
          rx={560}
          ry={70}
          fill={C.ivory}
          opacity={0.022}
          filter={`url(#${uid}-blur)`}
        />)}

        {/* 登高 */}
        <path d={pathD} fill="none" stroke={alpha(C.gold, 0.38)} strokeWidth={2.5} strokeDasharray="10 9" />
        <Pine x={196} y={1016} s={1.15} />
        <Pine x={320} y={918} s={0.9} />
        <Pine x={744} y={770} s={0.8} />
        <Walker x={point.x} y={point.y} frame={frame} />
        {Array.from({length: 14}, (_, i) => {
          const x = 80 + rand(i, 3) * 900 + Math.sin(frame / 38 + i) * 24;
          const yy = 640 + ((frame * 1.25 + i * 88) % 520);
          return <ellipse key={i} cx={x} cy={yy} rx={3.6} ry={8} fill={C.gold} opacity={0.28}
            transform={`rotate(${Math.sin(frame / 28 + i) * 50} ${x} ${yy})`} />;
        })}
        <text x="912" y="724" textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize="42" letterSpacing="10">登</text>
        <text x="912" y="782" textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize="42" letterSpacing="10">高</text>

        {/* 赏菊 */}
        <path d="M0 1520 C200 1470 380 1530 600 1486 C800 1448 960 1500 1080 1470 L1080 1720 L0 1720 Z" fill={C.char} />
        {[
          {x: 250, y: 1330, r: 84, at: 210},
          {x: 470, y: 1266, r: 64, at: 222},
          {x: 706, y: 1372, r: 98, at: 234},
          {x: 890, y: 1278, r: 56, at: 246},
          {x: 592, y: 1432, r: 50, at: 258},
        ].map((f, i) => <g key={i}>
          <circle cx={f.x} cy={f.y} r={f.r * 1.5} fill={alpha(C.gold, 0.07)} filter={`url(#${uid}-blur)`} />
          <path d={`M${f.x} ${f.y + 30} C${f.x - 30} ${f.y + 120} ${f.x + 26} ${f.y + 180} ${f.x - 10} 1520`} fill="none" stroke={C.green} strokeWidth={3} opacity={0.5} />
          {Array.from({length: 3}, (_, k) => {
            const lx = f.x + (k % 2 ? 20 : -20);
            const ly = f.y + 96 + k * 58;
            return <ellipse key={k} cx={lx} cy={ly} rx={11} ry={24} fill={C.green} opacity={0.42} transform={`rotate(${k % 2 ? 38 : -38} ${lx} ${ly})`} />;
          })}
          <Chrysanthemum cx={f.x} cy={f.y} r={f.r} reveal={progress(frame, f.at, 46)} />
        </g>)}
        <text x="946" y="1208" textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize="42" letterSpacing="10">赏</text>
        <text x="946" y="1266" textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize="42" letterSpacing="10">菊</text>

        {/* 茱萸 */}
        <g transform={`rotate(${Math.sin(frame / 55) * 2.2} 980 1730)`}>
          <path d="M1000 1704 C880 1760 780 1840 620 1880 C500 1910 390 1970 300 2034" fill="none" stroke={C.soil} strokeWidth={8} strokeLinecap="round" />
          <path d="M1000 1704 C910 1690 820 1740 750 1790" fill="none" stroke={C.soil} strokeWidth={5} strokeLinecap="round" />
          {Array.from({length: 16}, (_, i) => {
            const t = i / 15;
            const x = lerp(1000, 300, t) + Math.sin(i) * 22;
            const yy = lerp(1704, 2034, t) + Math.cos(i) * 16;
            return <ellipse key={i} cx={x} cy={yy} rx={9} ry={20} fill={C.green} opacity={0.55} transform={`rotate(${i * 37} ${x} ${yy})`} />;
          })}
          {[
            {x: 880, y: 1772}, {x: 760, y: 1836}, {x: 640, y: 1884},
            {x: 520, y: 1930}, {x: 410, y: 1980}, {x: 330, y: 2020},
          ].map((c, i) => <g key={i} opacity={Math.min(1, Math.max(0, berries * 6 - i))}>
            {Array.from({length: 7}, (_, k) => <circle
              key={k}
              cx={c.x + Math.cos((k / 7) * Math.PI * 2) * 14}
              cy={c.y + Math.sin((k / 7) * Math.PI * 2) * 14}
              r={5.5}
              fill={C.vermilion}
              stroke={alpha(C.black, 0.35)}
            />)}
            <circle cx={c.x - 3} cy={c.y - 4} r={1.8} fill={alpha(C.ivory, 0.65)} />
          </g>)}
        </g>
        <text x="132" y="1848" textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize="42" letterSpacing="10">茱</text>
        <text x="132" y="1906" textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize="42" letterSpacing="10">萸</text>

        {/* 重阳糕与茶 */}
        <rect x="180" y="2650" width="720" height="24" rx="6" fill={C.soil} stroke={alpha(C.gold, 0.4)} />
        <rect x="222" y="2674" width="18" height="132" fill={C.soil} />
        <rect x="840" y="2674" width="18" height="132" fill={C.soil} />
        <ellipse cx="540" cy="2540" rx="240" ry="170" fill={alpha(C.gold, 0.06)} filter={`url(#${uid}-soft)`} />
        {Array.from({length: 9}, (_, i) => {
          const p = progress(frame, 370 + i * 6, 24);
          const ly = 2622 - i * 20;
          return <g key={i} opacity={p} transform={`translate(${(1 - p) * (i % 2 ? 46 : -46)} 0)`}>
            <rect x="400" y={ly} width="280" height="18" rx="3" fill={i % 2 ? C.ivory : C.goldLight} stroke={alpha(C.gold, 0.55)} />
          </g>;
        })}
        <circle cx="540" cy="2454" r="8" fill={C.vermilion} />
        <path d="M540 2462 L540 2386" stroke={C.gold} strokeWidth={3} />
        <path d="M540 2386 L604 2404 L540 2422 Z" fill={C.vermilion} />
        <text x="552" y="2413" fill={C.ivory} fontFamily={FONT} fontSize="16">重</text>

        <ellipse cx="770" cy="2622" rx="46" ry="20" fill={C.secondary} opacity={0.9} />
        <path d="M726 2618 L700 2602" stroke={C.secondary} strokeWidth={7} strokeLinecap="round" />
        <path d="M814 2622 C846 2612 848 2646 818 2642" fill="none" stroke={C.secondary} strokeWidth={6} />
        <ellipse cx="770" cy="2600" rx="26" ry="7" fill={C.ivory} opacity={0.7} />
        <ellipse cx="690" cy="2638" rx="22" ry="8" fill={C.ivory} opacity={0.75} />
        <ellipse cx="850" cy="2638" rx="22" ry="8" fill={C.ivory} opacity={0.75} />

        {[0, 1, 2].map(i => <path
          key={i}
          d={`M${540 + i * 26} 2450 C${520 + i * 26} 2390 ${566 + i * 26} 2350 ${540 + i * 26} 2300`}
          fill="none"
          stroke={C.ivory}
          strokeWidth={3}
          opacity={0.26}
          transform={`translate(0 ${-((frame * 1.1 + i * 26) % 70)})`}
        />)}

        <g opacity={closing} transform="translate(858 2546) rotate(-6)">
          <rect width="54" height="100" rx="8" fill={C.char} stroke={C.gold} />
          <rect x="5" y="8" width="44" height="76" rx="3" fill={alpha(C.goldLight, 0.9)} />
          <text x="27" y="50" textAnchor="middle" fill={C.char} fontFamily={FONT} fontSize="16">重阳</text>
        </g>
        <text x="936" y="2394" textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize="42" letterSpacing="8">重</text>
        <text x="936" y="2452" textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize="42" letterSpacing="8">阳</text>
        <text x="936" y="2510" textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize="42" letterSpacing="8">糕</text>

        {/* 收束 */}
        <path d="M300 2880 L780 2880" stroke={alpha(C.gold, 0.32)} />
        <text x="540" y="2950" textAnchor="middle" fill={C.goldLight} fontFamily={FONT} fontSize="44" letterSpacing="2">都是过日子的小办法。</text>
        <g transform="translate(540 3040) rotate(-6)">
          <rect x="-40" y="-40" width="80" height="80" rx="4" fill={C.vermilion} />
          <rect x="-34" y="-34" width="68" height="68" rx="2" fill="none" stroke={alpha(C.ivory, 0.8)} />
          <text x="0" y="2" textAnchor="middle" dominantBaseline="central" fill={C.ivory} fontFamily={FONT} fontSize="30">重阳</text>
        </g>

        <rect x="28" y="3920" width="1024" height="20" rx="10" fill={C.soil} stroke={alpha(C.gold, 0.35)} />
        <circle cx="28" cy="3930" r="16" fill={C.char} stroke={C.gold} />
        <circle cx="1052" cy="3930" r="16" fill={C.char} stroke={C.gold} />
      </svg>
    </div>

    <AbsoluteFill style={{pointerEvents: 'none', background: `linear-gradient(to top, ${C.ink} 2%, ${C.ink}d9 18%, ${C.ink}00 46%), linear-gradient(to bottom, ${C.ink} 0%, ${C.ink}ee 10%, ${C.ink}00 24%)`}} />
    <AbsoluteFill style={{pointerEvents: 'none', background: `radial-gradient(ellipse at 50% 45%, transparent 48%, ${C.black}99 100%)`}} />

    <div style={{position: 'absolute', top: 92, left: 88, right: 88, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
      <span style={{color: C.gold, fontSize: 24, letterSpacing: 7}}>历法里的中国</span>
      <span style={{color: C.secondary, fontSize: 23, letterSpacing: 3}}>01 / 重阳</span>
    </div>
    <div style={{position: 'absolute', left: 88, right: 88, top: 168, height: 1, background: `${C.ivory}22`}}>
      <div style={{height: 1, width: `${Math.min(100, (frame / DURATION) * 100)}%`, background: C.gold}} />
    </div>

    <div style={{position: 'absolute', left: 88, right: 88, bottom: 320, textAlign: 'center', fontSize: 44, lineHeight: 1.55, letterSpacing: 1, color: C.ivory, textShadow: `0 2px 14px ${C.black}`, opacity: captionOpacity}}>
      {beat?.text}
    </div>

    {Array.from({length: 22}, (_, i) => <div
      key={i}
      style={{
        position: 'absolute',
        left: rand(i, 4) * W,
        top: (rand(i, 7) * 1920 + frame * (0.18 + rand(i, 9) * 0.2)) % 1920,
        width: 2 + rand(i, 5) * 2,
        height: 2 + rand(i, 5) * 2,
        borderRadius: '50%',
        background: C.goldLight,
        opacity: 0.06 + rand(i, 6) * 0.16,
        pointerEvents: 'none',
      }}
    />)}

    <AbsoluteFill
      style={{pointerEvents: 'none', opacity: 0.04, mixBlendMode: 'screen', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='2'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23g)' opacity='.5'/%3E%3C/svg%3E")`}}
    />
  </AbsoluteFill>;
};
