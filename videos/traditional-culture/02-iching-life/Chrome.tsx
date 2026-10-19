import React from 'react';
import {AbsoluteFill, Audio, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {staticFile} from 'remotion';
import {ichingTheme as C} from '../../../src/config/theme';
import {progress, rand} from '../../../src/lib/anim';
import timeline from './timeline.json';
import content from './content.json';
import {alpha, Hexagram} from './Artwork';
import {EXAMPLES} from './hexagrams';

export const cueAt = (scene: number, cue: number) => timeline.scenes[scene].captions[cue].from;

import {Lift} from '../../../src/components/motion/Lift';
export {Lift} from '../../../src/components/motion/Lift';

export const Heading: React.FC<{children: React.ReactNode; at?: number; size?: number; style?: React.CSSProperties}> = ({children, at = 12, size = 88, style}) => <Lift at={at} style={style}>
  <div style={{fontFamily: C.font, color: C.ivory, fontWeight: 500, fontSize: size, lineHeight: 1.42, letterSpacing: 3}}>{children}</div>
</Lift>;

export const Small: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => <div style={{fontFamily: C.font, color: C.secondary, fontSize: 27, lineHeight: 1.9, letterSpacing: 2, ...style}}>{children}</div>;

export const Gold: React.FC<{children: React.ReactNode}> = ({children}) => <span style={{color: C.goldLight}}>{children}</span>;

export const ArtArea: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => <div style={{position: 'absolute', left: 825, top: 170, width: 1000, height: 720, ...style}}>{children}</div>;
export const TextArea: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => <div style={{position: 'absolute', left: 130, top: 247, width: 700, ...style}}>{children}</div>;

export const ExampleHeading: React.FC<{example: keyof typeof EXAMPLES; subtitle: string; at: number; description: string; quote: string; gloss: string}> = ({example, subtitle, at, description, quote, gloss}) => {
  const entry = EXAMPLES[example];
  return <TextArea style={{top: 190, width: 685}}>
    <Lift at={at}>
      <div style={{display: 'flex', alignItems: 'center', gap: 38}}>
        <div style={{fontFamily: C.font, fontSize: 170, lineHeight: 1.24, color: C.goldLight}}>{entry.name}</div>
        <div>
          <div style={{fontFamily: C.numberFont, color: C.secondary, fontSize: 34, letterSpacing: 4}}>{entry.reading}</div>
          <svg width="116" height="115" viewBox="0 0 116 115" style={{marginTop: 16}}><Hexagram lines={entry.lines} width={105} height={110} /></svg>
        </div>
      </div>
    </Lift>
    <Heading at={at + 16} size={64} style={{marginTop: 20}}>{subtitle}</Heading>
    <Lift at={at + 28} style={{marginTop: 25}}><Small>{description}</Small></Lift>
    <Lift at={at + 44} style={{marginTop: 48}}>
      <div style={{height: 1, width: 460, background: alpha(C.gold, 0.25), marginBottom: 22}} />
      <div style={{color: C.goldLight, fontSize: 25, lineHeight: 1.8, letterSpacing: 2}}>「{quote}」</div>
      <div style={{color: C.secondary, fontSize: 23, lineHeight: 1.8, marginTop: 4}}>{gloss}</div>
      <div style={{color: C.muted, fontSize: 19, marginTop: 14}}>《周易》 · {entry.name}卦《彖传》节选</div>
    </Lift>
  </TextArea>;
};

export const SceneShell: React.FC<{index: number; children: React.ReactNode; analogy?: boolean}> = ({index, children, analogy = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scene = timeline.scenes[index];
  const fade = Math.min(progress(frame, 0, 16), 1 - progress(frame, scene.durationInFrames - 16, 16));
  const cue = scene.captions.find(c => frame >= c.from && frame < c.from + c.durationInFrames);
  return <AbsoluteFill
    style={{background: C.ink, fontFamily: C.font, color: C.ivory, overflow: 'hidden'}}
  >
    <AbsoluteFill
      style={{background: `radial-gradient(ellipse at 67% 47%, ${alpha(C.gold, 0.105)}, transparent 55%), radial-gradient(ellipse at 10% 80%, ${alpha(C.water, 0.025)}, transparent 40%)`}}
    />
    <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
      {Array.from({length: 42}, (_, i) => {
        const x = rand(i, 4) * 1920 + Math.sin((frame + i * 80) / 200) * 12;
        const y = (rand(i, 7) * 1080 - frame * (0.02 + rand(i, 9) * 0.035) + 1080) % 1080;
        return <circle key={i} cx={x} cy={y} r={0.7 + rand(i, 5) * 1.1} fill={C.goldLight} opacity={0.055 + rand(i, 6) * 0.14} />;
      })}
    </svg>
    <div style={{position: 'absolute', inset: 0, opacity: fade}}>
      <div style={{position: 'absolute', top: 57, left: 110, color: C.gold, fontSize: 24, letterSpacing: 7}}>生活里的易经</div>
      <div style={{position: 'absolute', top: 60, right: 110, color: C.secondary, fontSize: 23, letterSpacing: 3}}>{String(index + 1).padStart(2, '0')} / {content.scenes[index].label}</div>
      <div style={{position: 'absolute', left: 110, right: 110, top: 112, height: 1, background: alpha(C.gold, 0.19)}} />
      {analogy && <div style={{position: 'absolute', right: 112, top: 148, fontSize: 21, color: C.vermilion, letterSpacing: 4, border: `1px solid ${alpha(C.vermilion, 0.5)}`, padding: '6px 12px'}}>生活比方</div>}
      {children}
    </div>
    <AbsoluteFill
      style={{pointerEvents: 'none', background: `radial-gradient(ellipse at 50% 45%, transparent 47%, ${alpha(C.black, 0.42)} 100%)`}}
    />
    <AbsoluteFill
      style={{pointerEvents: 'none', opacity: 0.032, mixBlendMode: 'screen', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='2'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23g)' opacity='.5'/%3E%3C/svg%3E")`}}
    />
    <div style={{position: 'absolute', bottom: 112, left: 130, right: 130, minHeight: 58, display: 'none', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
      {cue && <div style={{fontSize: cue.text.length > 30 ? 35 : 38, letterSpacing: 1.2, lineHeight: 1.55, color: C.ivory, textShadow: `0 2px 12px ${C.black}`, opacity: Math.min(1, (frame - cue.from + 1) / 5)}}>{cue.text}</div>}
    </div>
    <div style={{position: 'absolute', left: 110, bottom: 49, fontFamily: C.numberFont, color: C.muted, fontSize: 14, letterSpacing: 4}}>THE SHAPE OF CHANGE</div>
    <div style={{position: 'absolute', bottom: 55, right: 110, width: 100, height: 1, background: alpha(C.gold, 0.2)}}>
      <div style={{height: 1, width: `${frame / scene.durationInFrames * 100}%`, background: C.gold}} />
    </div>
    {scene.captions.map((caption, i) => <Sequence
      key={i}
      name={`${scene.id} · ${i + 1}`}
      from={Math.round(caption.startMs * fps / 1000)}
      durationInFrames={caption.durationInFrames}
      layout="none"
    >
      <Audio src={staticFile(caption.audio)} volume={0.95} />
    </Sequence>)}
  </AbsoluteFill>;
};
