import React, {useId} from 'react';
import {Easing, spring, useCurrentFrame} from 'remotion';
import {ichingTheme as C} from '../../../src/config/theme';
import {lerp, progress} from '../../../src/lib/anim';
import {alpha, Artboard} from './Artwork';
import {cueAt, FONT, Gold, Heading, Kicker, SceneShell, TextArea} from './Chrome';

const CX = 452;
const CY = 440;
const R = 240;

const SEGMENTS = [
  {from: 0, to: 55, a: 0, b: 720},
  {from: 55, to: 75, a: 720, b: 720},
  {from: 75, to: 155, a: 720, b: 1080},
  {from: 155, to: 175, a: 1080, b: 1080},
  {from: 175, to: 255, a: 1080, b: 1440},
  {from: 255, to: 473, a: 1440, b: 1440},
];

const STOPS = [
  {at: 55, year: '1966'},
  {at: 155, year: '2026'},
  {at: 255, year: '2086'},
];

const angleAt = (frame: number) => {
  for (const s of SEGMENTS) {
    if (frame <= s.to) {
      const t = Math.max(0, Math.min(1, (frame - s.from) / (s.to - s.from)));
      return lerp(s.a, s.b, Easing.out(Easing.cubic)(t));
    }
  }
  return SEGMENTS[SEGMENTS.length - 1].b;
};

const spinning = (frame: number) => SEGMENTS.some(s => frame >= s.from && frame < s.to && s.b > s.a);
const strike = (frame: number, at: number) => progress(frame, at - 2, 10) * (1 - progress(frame, at + 8, 20));

export const CycleWheelScene: React.FC = () => {
  const frame = useCurrentFrame();
  const uid = useId().replace(/:/g, '');
  const angle = angleAt(frame);
  const blur = spinning(frame);
  const active = frame >= 255 ? 2 : frame >= 155 ? 1 : frame >= 55 ? 0 : -1;
  const current = active >= 0 ? STOPS[active].year : '';
  const joined = progress(frame, 255, 30);

  return <SceneShell index={4}>
    <TextArea style={{top: 276}}>
      <Kicker>一圈，六十年</Kicker>
      <Heading size={84} at={6} style={{marginTop: 24}}>六十年一遇，<br />遇的是<Gold>同一个位置</Gold></Heading>
    </TextArea>

    <div style={{position: 'absolute', left: 88, top: 735, width: 904, height: 760}}>
      <Artboard>
        <defs>
          <filter id={`${uid}-spin`}><feGaussianBlur stdDeviation="5" /></filter>
          <radialGradient id={`${uid}-wheel`}><stop stopColor={C.surface} /><stop offset="1" stopColor={C.ink} /></radialGradient>
        </defs>

        {STOPS.map((s, i) => {
          const p = spring({frame: Math.max(0, frame - s.at), fps: 30, config: {damping: 13, stiffness: 190}});
          const isActive = active === i;
          const x = i === 0 ? 240 : i === 1 ? 452 : 664;
          return <g key={s.year} opacity={Math.min(1, Math.max(0, p * 2))} transform={`translate(0 ${(1 - p) * 26})`}>
            <text x={x} y="88" textAnchor="middle" fill={isActive ? C.goldLight : C.muted} fontFamily={C.numberFont} fontSize={isActive ? 52 : 38} letterSpacing="2">{s.year}</text>
            <circle cx={x} cy="110" r="4" fill={isActive ? C.goldLight : C.muted} />
            <path d={`M${x} 116 C${x} 160 452 168 452 200`} fill="none" stroke={alpha(C.gold, isActive ? 0.55 : 0.18)} strokeDasharray="4 7" />
          </g>;
        })}

        <path d="M432 176 L452 200 L472 176 Z" fill={C.goldLight} opacity={1 - joined * 0.5} />

        <circle cx={CX} cy={CY} r={R + 14} fill={`url(#${uid}-wheel)`} stroke={alpha(C.gold, 0.24)} />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={alpha(C.gold, 0.28)} />

        <g transform={`rotate(${angle} ${CX} ${CY})`}>
          {Array.from({length: 60}, (_, i) => {
            const a = i * 6;
            const major = i % 5 === 0;
            const gold = i === 0;
            return <g key={i} transform={`rotate(${a} ${CX} ${CY})`}>
              <line
                x1={CX} y1={CY - R + 4}
                x2={CX} y2={CY - R + (major ? 34 : 20)}
                stroke={gold ? C.goldLight : alpha(C.gold, major ? 0.62 : 0.3)}
                strokeWidth={gold ? 5 : major ? 2.4 : 1.2}
              />
              {major && !gold && <circle cx={CX} cy={CY - R + 44} r="2.4" fill={alpha(C.secondary, 0.65)} />}
              {gold && <>
                <circle cx={CX} cy={CY - R + 62} r="31" fill={C.ink} stroke={C.goldLight} strokeWidth="2" />
                <text x={CX} y={CY - R + 70} textAnchor="middle" fill={C.goldLight} fontFamily={FONT} fontSize="24">丙午</text>
              </>}
            </g>;
          })}
        </g>

        {blur && <g filter={`url(#${uid}-spin)`} opacity={0.45}>
          {[0, 1, 2].map(i => <circle
            key={i}
            cx={CX} cy={CY} r={R + 6}
            fill="none"
            stroke={alpha(C.gold, 0.5 - i * 0.13)}
            strokeWidth={2}
            strokeDasharray="26 340"
            transform={`rotate(${angle - 10 - i * 9} ${CX} ${CY})`}
          />)}
        </g>}

        <text x={CX} y={CY - 78} textAnchor="middle" fill={C.vermilion} fontFamily={C.numberFont} fontSize="38" letterSpacing="4" opacity={current ? 1 : 0}>{current}</text>
        <text x={CX} y={CY + 34} textAnchor="middle" fill={C.ivory} fontFamily={C.numberFont} fontSize="128" letterSpacing="2">60</text>
        <text x={CX} y={CY + 96} textAnchor="middle" fill={C.goldLight} fontFamily={FONT} fontSize="32" letterSpacing="6" opacity={progress(frame, cueAt(4, 3), 20)}>同一个位置</text>

        {STOPS.map((s, i) => {
          const k = strike(frame, s.at);
          return <g key={s.year} opacity={k}>
            <circle cx={CX} cy={CY - R + 22} r={40 + 62 * (1 - k)} fill="none" stroke={alpha(C.goldLight, 0.7)} strokeWidth={3} />
            {Array.from({length: 10}, (_, j) => {
              const a = (j / 10) * Math.PI * 2;
              const d = 24 + 70 * (1 - k);
              return <line key={j} x1={CX + Math.cos(a) * 18} y1={CY - R + 22 + Math.sin(a) * 18} x2={CX + Math.cos(a) * d} y2={CY - R + 22 + Math.sin(a) * d} stroke={alpha(C.goldLight, 0.75)} strokeWidth={2} />;
            })}
          </g>;
        })}

        <g opacity={joined}>
          <path d="M240 112 C240 190 360 196 448 212" fill="none" stroke={alpha(C.goldLight, 0.5)} strokeWidth={1.4} />
          <path d="M664 112 C664 190 544 196 456 212" fill="none" stroke={alpha(C.goldLight, 0.5)} strokeWidth={1.4} />
        </g>
      </Artboard>
    </div>
  </SceneShell>;
};
