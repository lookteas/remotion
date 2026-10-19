import React, {useId} from 'react';
import {spring, useCurrentFrame} from 'remotion';
import {ichingTheme as C} from '../../../src/config/theme';
import {lerp, progress, rand} from '../../../src/lib/anim';
import {alpha, Artboard, Book} from './Artwork';
import {cueAt, FONT, Gold, Heading, Kicker, Lift, Quote, SceneShell, Small, TextArea} from './Chrome';

const YEARS = ['前255', '前195', '前135', '前75', '前15', '45', '105', '165', '225', '285', '345', '405', '465', '525', '585', '645', '705', '765', '825', '885', '947'];

export const ChimaCollisionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const uid = useId().replace(/:/g, '');
  const fly = progress(frame, 0, 55);
  const impact = progress(frame, 51, 5) * (1 - progress(frame, 60, 28));
  const wave = progress(frame, 51, 40);
  const titleIn = spring({frame: Math.max(0, frame - 58), fps: 30, config: {damping: 12, stiffness: 170}});
  const collisionFade = 1 - progress(frame, 112, 28);
  const bookIn = progress(frame, 100, 40);
  const close = progress(frame, cueAt(5, 6), 36);
  const open = progress(frame, 118, 40) * (1 - close);
  const marks = progress(frame, cueAt(5, 3), 80);
  
  const sealBig = progress(frame, cueAt(5, 6), 20);
  const zoom = 1 + 0.06 * progress(frame, 233, 320);
  const lineIn = progress(frame, cueAt(5, 3), 54);

  const leftX = lerp(40, 392, fly);
  const rightX = lerp(864, 512, fly);

  return <SceneShell index={5}>
    <TextArea style={{top: 264}}>
      <Kicker>丙午 · 丁未</Kicker>
      <Heading size={94} at={6} style={{marginTop: 22}}>赤马红羊，<br />到底<Gold>从哪来</Gold></Heading>
      <Lift at={cueAt(5, 2)} style={{marginTop: 24}}><Small style={{fontSize: 29}}>一本写给皇帝的谏书。</Small></Lift>
    </TextArea>

    <div style={{position: 'absolute', left: 88, top: 735, width: 904, height: 760, transform: `scale(${zoom})`, transformOrigin: '50% 35%'}}>
      <Artboard>
        <defs>
          <filter id={`${uid}-ink`}><feGaussianBlur stdDeviation="24" /></filter>
        </defs>

        <g opacity={progress(frame, 320, 40) * (1 - close)}>
          <path d="M120 74 L452 8 L784 74" fill="none" stroke={alpha(C.gold, 0.45)} strokeWidth="2" />
          <path d="M150 74 L452 22 L754 74" fill="none" stroke={alpha(C.gold, 0.25)} strokeWidth="1" />
          <path d="M170 80 L170 180 M734 80 L734 180" stroke={alpha(C.gold, 0.22)} strokeWidth="1.5" />
        </g>

        <g opacity={collisionFade}>
          <ellipse cx="452" cy="210" rx={180 * fly} ry={110 * fly} fill={alpha(C.vermilion, 0.14)} filter={`url(#${uid}-ink)`} />
          <ellipse cx="452" cy="210" rx={110 * fly} ry={70 * fly} fill={alpha(C.gold, 0.12)} filter={`url(#${uid}-ink)`} />

          <g opacity={1 - progress(frame, 58, 20)}>
            <text x={leftX - 26} y="212" textAnchor="middle" fill={alpha(C.goldLight, 0.22)} fontFamily={FONT} fontSize="184">午</text>
            <text x={leftX} y="212" textAnchor="middle" fill={C.goldLight} fontFamily={FONT} fontSize="184">午</text>
            <text x={leftX} y="268" textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize="26" letterSpacing="8">马</text>
          </g>
          <g opacity={1 - progress(frame, 58, 20)}>
            <text x={rightX + 26} y="212" textAnchor="middle" fill={alpha(C.vermilion, 0.3)} fontFamily={FONT} fontSize="184">未</text>
            <text x={rightX} y="212" textAnchor="middle" fill={C.vermilion} fontFamily={FONT} fontSize="184">未</text>
            <text x={rightX} y="268" textAnchor="middle" fill={C.vermilion} fontFamily={FONT} fontSize="26" letterSpacing="8">羊</text>
          </g>

          <circle cx="452" cy="210" r={40 + 220 * wave} fill="none" stroke={alpha(C.vermilion, 0.7 * (1 - wave))} strokeWidth={3 + 6 * (1 - wave)} />
          {Array.from({length: 18}, (_, i) => {
            const a = (i / 18) * Math.PI * 2 + rand(i, 2);
            const d = 30 + 150 * wave * (0.5 + rand(i, 3));
            return <line key={i} x1="452" y1="210" x2={452 + Math.cos(a) * d} y2={210 + Math.sin(a) * d} stroke={alpha(i % 3 === 0 ? C.goldLight : C.vermilion, 0.8 * (1 - wave))} strokeWidth={2} />;
          })}
          <circle cx="452" cy="210" r={50 + 120 * impact} fill={alpha(C.ivory, impact * 0.26)} filter={`url(#${uid}-ink)`} />

          <g opacity={Math.min(1, Math.max(0, titleIn * 1.6))} transform={`translate(0 ${(1 - titleIn) * 40})`}>
            <text x="452" y="200" textAnchor="middle" fill={C.goldLight} fontFamily={FONT} fontSize="84" letterSpacing="10">赤马红羊</text>
            <text x="452" y="262" textAnchor="middle" fill={C.secondary} fontFamily={FONT} fontSize="26" letterSpacing="6">丙午 · 丁未</text>
          </g>
        </g>

        <g opacity={bookIn * (1 - close)} transform={`translate(0 ${(1 - bookIn) * 150 - 46})`}>
          <Book open={open} marks={marks} seal={0} />
        </g>

        {Array.from({length: 21}, (_, i) => {
          const p = progress(frame, cueAt(5, 3) + i * 3, 22);
          if (p <= 0 || p >= 1) return null;
          const col = i % 7;
          const row = Math.floor(i / 7);
          const fromX = 511 + col * 36;
          const fromY = 176 + row * 78;
          const toX = 90 + i * (724 / 20);
          const toY = 532;
          const cx = lerp(fromX, toX, p);
          const cy = lerp(fromY, toY, p);
          return <g key={i} opacity={Math.sin(Math.PI * p)}>
            <circle cx={cx} cy={cy} r="3.5" fill={C.goldLight} />
            <circle cx={cx} cy={cy} r="9" fill="none" stroke={alpha(C.goldLight, 0.35)} />
          </g>;
        })}

        <g opacity={progress(frame, cueAt(5, 3) - 12, 20) * (1 - close)}>
          <text x="452" y="500" textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize="22" letterSpacing="4">1260 年 · 21 次</text>
          <line x1="90" y1="532" x2={90 + 724 * lineIn} y2="532" stroke={alpha(C.gold, 0.65)} strokeWidth="2" />
          {YEARS.map((year, i) => {
            const p = progress(frame, cueAt(5, 3) + i * 3, 16);
            const x = 90 + i * (724 / 20);
            return <g key={year} opacity={p}>
              <circle cx={x} cy="532" r="4.2" fill={i % 2 ? C.vermilion : C.goldLight} />
              {i % 5 === 0 && <text x={x} y="560" textAnchor="middle" fill={C.secondary} fontFamily={C.numberFont} fontSize="16">{year}</text>}
            </g>;
          })}
        </g>
      </Artboard>
      <Quote at={cueAt(5, 4)} quote="系乎君臣之贤否，政令之得失" gloss="灾异与祸患，取决于君臣是否贤明、政令是否得当。" source="《丙丁龟鉴》续序" style={{position: 'absolute', left: 24, top: 596, opacity: 1 - close}} />
      <svg width="904" height="760" style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}>
        <g transform={`translate(452 380) rotate(-8) scale(${0.7 + 0.3 * sealBig})`} opacity={sealBig}>
          <rect x="-56" y="-56" width="112" height="112" rx="6" fill={C.vermilion} />
          <rect x="-46" y="-46" width="92" height="92" rx="3" fill="none" stroke={alpha(C.ivory, 0.85)} strokeWidth="2" />
          <text x="0" y="4" textAnchor="middle" dominantBaseline="central" fill={C.ivory} fontFamily={FONT} fontSize="52">谏</text>
        </g>
        <circle cx="452" cy="380" r={40 + 120 * (1 - sealBig)} fill="none" stroke={alpha(C.vermilion, 0.55 * (1 - sealBig))} strokeWidth="3" opacity={sealBig} />
      </svg>
    </div>
  </SceneShell>;
};
