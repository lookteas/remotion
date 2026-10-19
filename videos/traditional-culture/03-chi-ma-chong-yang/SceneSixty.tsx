import React, {useId} from 'react';
import {spring, useCurrentFrame} from 'remotion';
import {ichingTheme as C} from '../../../src/config/theme';
import {progress, rand} from '../../../src/lib/anim';
import {alpha, Artboard} from './Artwork';
import {cueAt, FONT, Gold, Heading, Kicker, SceneShell, TextArea} from './Chrome';

const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const BX = 140;
const BY = 180;
const CW = 54;
const CH = 46;
const SCALE_Y = 0.78;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const drop = (frame: number, delay: number) => spring({
  frame: Math.max(0, frame - delay),
  fps: 30,
  config: {damping: 17, stiffness: 55, mass: 1.3},
});

const stemDelay = (i: number) => 8 + i * 8;
const branchDelay = (j: number) => 12 + j * 8;

export const SixtyImpactScene: React.FC = () => {
  const frame = useCurrentFrame();
  const uid = useId().replace(/:/g, '');
  const boomStart = cueAt(3, 3);
  const scan = progress(frame, boomStart, 54);
  const ringIn = progress(frame, cueAt(3, 4), 52);
  const boardFade = 1 - progress(frame, cueAt(3, 4) - 8, 26);
  const counterFade = 1 - progress(frame, cueAt(3, 4), 20);
  const wave = progress(frame, boomStart, 44);
  const blast = progress(frame, cueAt(3, 4), 26);
  const remaining = 120 - Math.round(scan * 60);
  const sheenX = -420 + progress(frame, 0, 160) * 1100;
  const plateIn = progress(frame, 0, 26);

  const boardTransform = `translate(452 400) skewX(-12) scale(1 ${SCALE_Y}) translate(-452 -400)`;

  return <SceneShell index={3}>
    <TextArea style={{top: 268}}>
      <Kicker>干支纪年</Kicker>
      <Heading size={82} at={6} style={{marginTop: 22}}>十天干配十二地支，<br />为什么只有 <Gold>60</Gold> 种？</Heading>
    </TextArea>

    <div style={{position: 'absolute', left: 88, top: 735, width: 904, height: 760}}>
      <Artboard>
        <defs>
          <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FFFFFF" stopOpacity="0.16" />
            <stop offset="0.5" stopColor={C.ivory} stopOpacity="0.03" />
            <stop offset="1" stopColor={C.gold} stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id={`${uid}-plate`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={C.ivory} stopOpacity="0.1" />
            <stop offset="0.55" stopColor={C.ink} stopOpacity="0.62" />
            <stop offset="1" stopColor={C.gold} stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor={C.ivory} stopOpacity="0" />
            <stop offset="0.5" stopColor={C.ivory} stopOpacity="0.5" />
            <stop offset="1" stopColor={C.ivory} stopOpacity="0" />
          </linearGradient>
          <filter id={`${uid}-blur`}><feGaussianBlur stdDeviation="18" /></filter>
          <clipPath id={`${uid}-board`}><rect x={BX} y={BY} width={12 * CW} height={10 * CH} rx="12" /></clipPath>
        </defs>

        <ellipse cx="452" cy="600" rx="360" ry="54" fill={alpha(C.black, 0.6)} filter={`url(#${uid}-blur)`} />

        <g opacity={counterFade}>
          <text x="96" y="58" textAnchor="start" fill={remaining === 60 ? C.goldLight : C.secondary} fontFamily={C.numberFont} fontSize="54" letterSpacing="2">{remaining}</text>
          <text x="206" y="58" textAnchor="start" fill={C.muted} fontFamily={FONT} fontSize="24" letterSpacing="4">成立</text>
        </g>

        <g opacity={boardFade}>
          <g transform={boardTransform}>
            <g opacity={plateIn}>
              <rect x={BX} y={BY} width={12 * CW} height={10 * CH} rx="12" fill={`url(#${uid}-plate)`} stroke={alpha(C.ivory, 0.42)} strokeWidth="1.6" />
              <path d={`M${BX + 16} ${BY + 10} L${BX + 12 * CW - 16} ${BY + 10}`} stroke={alpha(C.ivory, 0.55)} strokeWidth="2" />
            </g>
            <text x={54} y={192} textAnchor="middle" fill={C.muted} fontFamily={FONT} fontSize="20" letterSpacing="4" opacity={progress(frame, 6, 18)}>十天干</text>
            <text x={452} y={160} textAnchor="middle" fill={C.muted} fontFamily={FONT} fontSize="20" letterSpacing="6" opacity={progress(frame, 10, 18)}>十二地支</text>
            <g clipPath={`url(#${uid}-board)`}>
              <rect x={sheenX} y={BY - 30} width="240" height={10 * CH + 60} fill={`url(#${uid}-sheen)`} opacity="0.65" />
            </g>

            {Array.from({length: 70}, (_, i) => {
              const x = (i * 37) % (12 * CW) + BX;
              const y = (i * 71) % (10 * CH) + BY;
              return <circle key={i} cx={x} cy={y} r={0.8} fill={alpha(C.ivory, 0.4)} />;
            })}

            {STEMS.map((_, i) => BRANCHES.map((__, j) => {
              const on = i % 2 === j % 2;
              const row = clamp01(drop(frame, stemDelay(i)));
              const col = clamp01(drop(frame, branchDelay(j)));
              const cell = Math.min(row, col);
              const blastP = on ? 0 : clamp01(scan * 12 - j);
              const cx = BX + j * CW + CW / 2;
              const cy = BY + i * CH + CH / 2;
              return <g key={`${i}-${j}`} opacity={cell * (1 - blastP)}>
                <rect
                  x={BX + j * CW + 2}
                  y={BY + i * CH + 2}
                  width={CW - 4}
                  height={CH - 4}
                  rx="3"
                  fill={on ? alpha(C.goldLight, 0.42 + 0.2 * cell) : `url(#${uid}-glass)`}
                  stroke={on ? C.goldLight : alpha(C.ivory, 0.2)}
                  strokeWidth={on ? 1.4 : 0.9}
                />
                <path d={`M${BX + j * CW + 6} ${BY + i * CH + 6} L${BX + (j + 1) * CW - 8} ${BY + i * CH + 6}`} stroke={alpha(C.ivory, on ? 0.6 : 0.28)} strokeWidth="1" />
                {!on && <path d={`M${cx - 7} ${cy} L${cx + 7} ${cy} M${cx} ${cy - 6} L${cx} ${cy + 6}`} stroke={alpha(C.vermilion, 0.28)} strokeWidth="1.2" />}
              </g>;
            }))}

            {STEMS.map((_, i) => BRANCHES.map((__, j) => {
              if (i % 2 === j % 2) return null;
              const order = i * 12 + j;
              const blastP = clamp01(scan * 12 - j);
              if (blastP <= 0 || blastP >= 1) return null;
              const cx = BX + j * CW + CW / 2;
              const cy = BY + i * CH + CH / 2;
              return <g key={`shard-${i}-${j}`} opacity={Math.sin(Math.PI * blastP)}>
                {Array.from({length: 3}, (_, k) => {
                  const a = (k / 3) * Math.PI * 2 + rand(order, 5);
                  const d = 20 + 70 * blastP;
                  return <rect
                    key={k}
                    x={cx - 8} y={cy - 6} width="16" height="12" rx="1"
                    fill={alpha(C.ivory, 0.3)}
                    stroke={alpha(C.ivory, 0.65)}
                    strokeWidth="0.8"
                    transform={`translate(${Math.cos(a) * d} ${Math.sin(a) * d}) rotate(${(rand(order, 6) - 0.5) * 360 * blastP} ${cx - 8} ${cy - 6})`}
                  />;
                })}
              </g>;
            }))}

            {scan > 0 && scan < 1 && <>
              <rect x={BX + scan * 12 * CW - 44} y={BY - 20} width="42" height={10 * CH + 40} fill={alpha(C.vermilion, 0.12)} />
              <rect x={BX + scan * 12 * CW - 2} y={BY - 20} width="4" height={10 * CH + 40} fill={C.vermilion} />
              <path d={`M${BX + scan * 12 * CW - 8} ${BY - 28} L${BX + scan * 12 * CW + 8} ${BY - 28} L${BX + scan * 12 * CW} ${BY - 14} Z`} fill={C.vermilion} />
            </>}
          </g>

          {/* 十天干：落到棋盘左侧 */}
          {STEMS.map((s, i) => {
            const delay = stemDelay(i);
            const p = drop(frame, delay);
            const target = {x: 54, y: 246 + i * 38};
            const q = clamp01(p);
            const y = target.y - (1 - q) * 300;
            const sway = Math.sin((1 - q) * Math.PI * 1.4 + i * 1.7) * 16 * (1 - q);
            const x = target.x + sway;
            const rp = progress(frame, delay + 6, 22);
            const opacity = Math.min(1, q * 3);
            return <g key={s} opacity={opacity} transform={`rotate(${(1 - q) * -6} ${x} ${y})`}>
              <line x1={x} y1={y - 30} x2={x} y2={target.y} stroke={alpha(C.goldLight, 0.14 * (1 - q))} strokeWidth="12" filter={`url(#${uid}-blur)`} />
              <circle cx={target.x} cy={target.y} r={18 + 30 * rp} fill={alpha(C.goldLight, 0.09 * (1 - rp))} filter={`url(#${uid}-blur)`} />
              <ellipse cx={target.x} cy={target.y + 4} rx={10 + 24 * rp} ry={4 + 10 * rp} fill="none" stroke={alpha(C.goldLight, 0.35 * (1 - rp))} strokeWidth="1.2" />
              <text x={x} y={y - 16} textAnchor="middle" fill={alpha(C.goldLight, 0.12)} fontFamily={FONT} fontSize="30">{s}</text>
              <text x={x} y={y} textAnchor="middle" fill={C.goldLight} fontFamily={FONT} fontSize="30">{s}</text>
            </g>;
          })}

          {/* 十二地支：落到棋盘上沿 */}
          {BRANCHES.map((b, j) => {
            const delay = branchDelay(j);
            const p = drop(frame, delay);
            const target = {x: 204 + j * 54, y: 204};
            const q = clamp01(p);
            const y = target.y - (1 - q) * 300;
            const sway = Math.sin((1 - q) * Math.PI * 1.4 + j * 2.1) * 16 * (1 - q);
            const x = target.x + sway;
            const rp = progress(frame, delay + 6, 22);
            const opacity = Math.min(1, q * 3);
            return <g key={b} opacity={opacity} transform={`rotate(${(1 - q) * 6} ${x} ${y})`}>
              <line x1={x} y1={y - 30} x2={x} y2={target.y} stroke={alpha(C.ivory, 0.12 * (1 - q))} strokeWidth="12" filter={`url(#${uid}-blur)`} />
              <circle cx={target.x} cy={target.y} r={18 + 30 * rp} fill={alpha(C.ivory, 0.08 * (1 - rp))} filter={`url(#${uid}-blur)`} />
              <ellipse cx={target.x} cy={target.y + 4} rx={10 + 24 * rp} ry={4 + 10 * rp} fill="none" stroke={alpha(C.ivory, 0.3 * (1 - rp))} strokeWidth="1.2" />
              <text x={x} y={y - 16} textAnchor="middle" fill={alpha(C.ivory, 0.12)} fontFamily={FONT} fontSize="28">{b}</text>
              <text x={x} y={y} textAnchor="middle" fill={C.ivory} fontFamily={FONT} fontSize="28">{b}</text>
            </g>;
          })}
        </g>

        <circle cx="452" cy="342" r={wave * 360} fill="none" stroke={alpha(C.vermilion, 0.6 * (1 - wave))} strokeWidth={3 + 6 * (1 - wave)} />

        <g opacity={ringIn} transform={`translate(452 356) scale(${0.72 + 0.28 * ringIn})`}>
          <circle r="292" fill={alpha(C.ink, 0.62)} stroke={alpha(C.gold, 0.22)} />
          <circle r="250" fill="none" stroke={alpha(C.gold, 0.1)} />
          <g transform={`rotate(${frame * 0.15})`}>
            {Array.from({length: 60}, (_, i) => {
              const a = ((i * 6 - 90) * Math.PI) / 180;
              const major = i % 5 === 0;
              return <line
                key={i}
                x1={Math.cos(a) * 252} y1={Math.sin(a) * 252}
                x2={Math.cos(a) * (major ? 278 : 264)} y2={Math.sin(a) * (major ? 278 : 264)}
                stroke={i === 0 ? C.goldLight : alpha(C.gold, major ? 0.62 : 0.28)}
                strokeWidth={i === 0 ? 4 : major ? 2.2 : 1}
              />;
            })}
          </g>
          {BRANCHES.map((b, j) => {
            const a = ((j * 30 - 90) * Math.PI) / 180;
            return <text key={b} x={Math.cos(a) * 312} y={Math.sin(a) * 312 + 8} textAnchor="middle" fill={C.secondary} fontFamily={FONT} fontSize="24">{b}</text>;
          })}
          {STEMS.map((s, i) => {
            const a = ((i * 36 - 90) * Math.PI) / 180;
            return <text key={s} x={Math.cos(a) * 208} y={Math.sin(a) * 208 + 8} textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize="26">{s}</text>;
          })}
          <text x="0" y="48" textAnchor="middle" fill={C.ivory} fontFamily={C.numberFont} fontSize="164" opacity={0.95}>60</text>
          <text x="0" y="104" textAnchor="middle" fill={C.gold} fontFamily={FONT} fontSize="26" letterSpacing="10">种成立</text>
          <circle r={292 + blast * 40} fill="none" stroke={alpha(C.goldLight, 0.6 * (1 - blast))} strokeWidth={4 * (1 - blast)} />
        </g>
      </Artboard>
    </div>
  </SceneShell>;
};
