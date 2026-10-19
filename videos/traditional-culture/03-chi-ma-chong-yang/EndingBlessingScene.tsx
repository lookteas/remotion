import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ichingTheme as C} from '../../../src/config/theme';
import {progress} from '../../../src/lib/anim';
import {alpha, Chrysanthemum} from './Artwork';
import {SceneShell, FONT} from './Chrome';

export const EndingBlessingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const ringFade = 1 - progress(frame, 172, 26);
  const titleIn = progress(frame, 172, 40);
  const labels = progress(frame, 196, 30);
  const kicker = progress(frame, 0, 30);

  return <SceneShell index={6}>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920">
      <defs>
        <radialGradient id="end-glow"><stop stopColor={C.goldLight} stopOpacity="0.28" /><stop offset="1" stopColor={C.gold} stopOpacity="0" /></radialGradient>
      </defs>

      <rect width="1080" height="1920" fill={C.ink} />

      {/* 秋天与丰收 */}
      <circle cx="800" cy="480" r="210" fill="url(#end-glow)" />
      <circle cx="800" cy="480" r="120" fill={alpha(C.goldLight, 0.18)} />
      <circle cx="800" cy="480" r="120" fill="none" stroke={alpha(C.gold, 0.3)} />
      <path d="M0 1040 C240 1010 420 1060 620 1030 C800 1000 960 1040 1080 1010" fill="none" stroke={alpha(C.gold, 0.22)} strokeWidth="1.5" />
      {Array.from({length: 9}, (_, i) => <path key={i} d={`M${-40 + i * 150} 1400 C${40 + i * 150} 1250 ${120 + i * 150} 1150 ${180 + i * 150} 1020`} fill="none" stroke={alpha(C.goldLight, 0.13)} strokeWidth="1.5" />)}

      {/* 六十齿：赤马年的那圈循环 */}
      <g opacity={ringFade} transform={`rotate(${frame * 0.08} 540 700)`}>
        <circle cx="540" cy="700" r="258" fill="none" stroke={alpha(C.gold, 0.18)} />
        <circle cx="540" cy="700" r="292" fill="none" stroke={alpha(C.gold, 0.08)} />
        {Array.from({length: 60}, (_, i) => {
          const a = ((i * 6 - 90) * Math.PI) / 180;
          const major = i % 5 === 0;
          return <line
            key={i}
            x1={540 + Math.cos(a) * 262} y1={700 + Math.sin(a) * 262}
            x2={540 + Math.cos(a) * (major ? 292 : 276)} y2={700 + Math.sin(a) * (major ? 292 : 276)}
            stroke={alpha(C.gold, major ? 0.5 : 0.24)} strokeWidth={major ? 2 : 1}
          />;
        })}
      </g>
      <text x="540" y="712" textAnchor="middle" dominantBaseline="central" fill={alpha(C.goldLight, 0.4)} fontFamily={C.numberFont} fontSize="130" opacity={ringFade}>60</text>
      <text x="540" y="790" textAnchor="middle" fill={alpha(C.goldLight, 0.55)} fontFamily={FONT} fontSize="26" letterSpacing="8" opacity={ringFade}>丙午 · 六十年一轮</text>

      <text x="540" y="300" textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize="28" letterSpacing="12" opacity={kicker}>二〇二六 · 九月初九</text>

      {/* 重阳 */}
      <text x="540" y="820" textAnchor="middle" fill={C.ivory} fontFamily={FONT} fontSize="220" letterSpacing={8 + (1 - titleIn) * 30} opacity={titleIn}>重阳</text>
      <line x1="280" y1="872" x2={280 + 520 * titleIn} y2="872" stroke={alpha(C.gold, 0.6)} strokeWidth="1.5" />

      <text x="540" y="950" textAnchor="middle" fill={C.goldLight} fontFamily={FONT} fontSize="34" letterSpacing="12" opacity={labels}>丰收 · 长寿 · 敬老</text>

      <g opacity={labels} transform="translate(240 1090) rotate(-6)">
        <rect x="-46" y="-46" width="92" height="92" rx="5" fill={C.vermilion} />
        <rect x="-38" y="-38" width="76" height="76" rx="3" fill="none" stroke={alpha(C.ivory, 0.85)} strokeWidth="2" />
        <text x="0" y="3" textAnchor="middle" dominantBaseline="central" fill={C.ivory} fontFamily={FONT} fontSize="42">寿</text>
      </g>
      <Chrysanthemum cx={850} cy={1080} r={92} reveal={labels} />
      <Chrysanthemum cx={920} cy={1150} r={56} reveal={labels} />
    </svg>
  </SceneShell>;
};
