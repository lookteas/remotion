import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {ichingTheme as C} from '../../../src/config/theme';
import {rand} from '../../../src/lib/anim';
import timeline from './timeline.json';
import content from './content.json';

export const FONT = '"ChiMaSerif", "Songti SC", "SimSun", serif';

/** 1080×1920 竖版版心。左右各留 88，底部 320 给字幕与平台 UI。 */
export const L = {
  width: 1080,
  height: 1920,
  pad: 88,
  headerTop: 92,
  ruleTop: 168,
  titleTop: 292,
  artTop: 735,
  artWidth: 904,
  artHeight: 760,
  captionBottom: 320,
} as const;

export const cueAt = (scene: number, cue: number) => timeline.scenes[scene].captions[cue].from;

import {Lift} from '../../../src/components/motion/Lift';
export {Lift} from '../../../src/components/motion/Lift';

export const Heading: React.FC<{children: React.ReactNode; at?: number; size?: number; style?: React.CSSProperties}> = ({children, at = 12, size = 96, style}) => <Lift at={at} style={style}>
  <div style={{fontFamily: FONT, color: C.ivory, fontWeight: 500, fontSize: size, lineHeight: 1.34, letterSpacing: 2}}>{children}</div>
</Lift>;

export const Small: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => <div style={{fontFamily: FONT, color: C.secondary, fontSize: 31, lineHeight: 1.9, letterSpacing: 1.5, ...style}}>{children}</div>;

export const Gold: React.FC<{children: React.ReactNode}> = ({children}) => <span style={{color: C.goldLight}}>{children}</span>;

export const Kicker: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => <div style={{fontFamily: FONT, color: C.gold, fontSize: 25, letterSpacing: 7, ...style}}>{children}</div>;

export const Rule: React.FC<{width?: number; style?: React.CSSProperties}> = ({width = 300, style}) => <div style={{width, height: 1, background: `${C.gold}66`, ...style}} />;

export const TextArea: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => <div style={{position: 'absolute', left: L.pad, top: L.titleTop, width: 904, ...style}}>{children}</div>;

export const ArtArea: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => <div style={{position: 'absolute', left: L.pad, top: L.artTop, width: L.artWidth, height: L.artHeight, ...style}}>{children}</div>;

export const Quote: React.FC<{at: number; quote: string; source: string; gloss: string; style?: React.CSSProperties}> = ({at, quote, source, gloss, style}) => <Lift at={at} style={style}>
  <div style={{borderLeft: `2px solid ${C.gold}88`, paddingLeft: 26}}>
    <div style={{color: C.goldLight, fontSize: 33, lineHeight: 1.7, letterSpacing: 2}}>「{quote}」</div>
    <div style={{color: C.secondary, fontSize: 25, lineHeight: 1.8, marginTop: 8}}>{gloss}</div>
    <div style={{color: C.muted, fontSize: 21, marginTop: 12, letterSpacing: 2}}>{source}</div>
  </div>
</Lift>;

/** `*词*` 渲染成金色，让字幕里的关键词先被看到。 */
const rich = (text: string) => text.split(/(\*[^*]+\*)/g).filter(Boolean).map((part, i) =>
  part.startsWith('*') && part.endsWith('*')
    ? <span key={i} style={{color: C.goldLight}}>{part.slice(1, -1)}</span>
    : <span key={i}>{part}</span>,
);

export const SceneShell: React.FC<{index: number; children: React.ReactNode}> = ({index, children}) => {
  const frame = useCurrentFrame();
  const scene = timeline.scenes[index];
  const cue = scene.captions.find(c => frame >= c.from && frame < c.from + c.durationInFrames);
  return <AbsoluteFill style={{background: C.ink, fontFamily: FONT, color: C.ivory, overflow: 'hidden'}}>
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 36%, ${C.gold}1a, transparent 58%), radial-gradient(ellipse at 12% 82%, ${C.water}0a, transparent 42%)`}} />
    <svg width={L.width} height={L.height} style={{position: 'absolute', inset: 0}}>
      {Array.from({length: 58}, (_, i) => {
        const x = rand(i, 4) * L.width + Math.sin((frame + i * 70) / 210) * 14;
        const y = (rand(i, 7) * L.height - frame * (0.035 + rand(i, 9) * 0.05) + L.height) % L.height;
        return <circle key={i} cx={x} cy={y} r={0.8 + rand(i, 5) * 1.2} fill={C.goldLight} opacity={0.05 + rand(i, 6) * 0.13} />;
      })}
    </svg>
    <div style={{position: 'absolute', inset: 0}}>
      <div style={{position: 'absolute', top: L.headerTop, left: L.pad, right: L.pad, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <span style={{color: C.gold, fontSize: 24, letterSpacing: 7}}>历法里的中国</span>
        <span style={{color: C.secondary, fontSize: 23, letterSpacing: 3}}>{String(index + 1).padStart(2, '0')} / {content.scenes[index].label}</span>
      </div>
      <div style={{position: 'absolute', left: L.pad, right: L.pad, top: L.ruleTop, height: 1, background: `${C.ivory}22`}}>
        <div style={{height: 1, width: `${frame / scene.durationInFrames * 100}%`, background: C.gold}} />
      </div>
      {children}
    </div>
    <AbsoluteFill style={{pointerEvents: 'none', background: `linear-gradient(to top, ${C.ink} 2%, ${C.ink}d9 18%, ${C.ink}00 48%)`}} />
    <AbsoluteFill style={{pointerEvents: 'none', background: `radial-gradient(ellipse at 50% 44%, transparent 48%, ${C.black}88 100%)`}} />
    <AbsoluteFill
      style={{pointerEvents: 'none', opacity: 0.034, mixBlendMode: 'screen', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='2'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23g)' opacity='.5'/%3E%3C/svg%3E")`}}
    />
    {cue && <div style={{position: 'absolute', left: L.pad, right: L.pad, bottom: L.captionBottom, textAlign: 'center', whiteSpace: 'pre-line', fontFamily: FONT, fontSize: 44, lineHeight: 1.58, letterSpacing: 1, color: C.ivory, textShadow: `0 2px 14px ${C.black}`, opacity: Math.min(1, (frame - cue.from + 1) / 6)}}>{rich(cue.text)}</div>}
    <div style={{position: 'absolute', left: L.pad, bottom: 128, color: C.muted, fontSize: 15, letterSpacing: 4, fontFamily: '"Georgia", serif'}}>THE CALENDAR, NOT THE FATE</div>
  </AbsoluteFill>;
};
