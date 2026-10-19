import React from 'react';
import {AbsoluteFill, useCurrentFrame, staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {baziTheme as C} from '../../../src/config/theme';
import {progress} from '../../../src/lib/anim';
import {FilmLook} from '../../../src/components/Backdrop';
import {Atmosphere, PageWipe} from './Stage';
import {Opening, Definition, LifeWorlds, Boundary} from './Opening';
import {ManyPeople, SelectiveMemory, FullRecord} from './Perception';
import {SealPrediction, SpecificPrediction, Decision, Compare, Finale} from './Experiment';
import content from './content.json';

if (typeof document !== 'undefined') void loadFont({family: 'BaziSerif', url: staticFile('fonts/bazi-prediction/NotoSerifSC-episode.woff2'), weight: '100 900'});

const highlight = (line: string, focus: string, onPaper: boolean) => {
  const i = line.indexOf(focus);
  return i < 0 ? line : <>{line.slice(0, i)}<span style={{color: onPaper ? C.bronze : C.goldLight}}>{focus}</span>{line.slice(i + focus.length)}</>;
};

export const BaziScene: React.FC<{scene: number}> = ({scene}) => {
  const f = useCurrentFrame();
  const data = content[scene - 1];
  const cue = [...data.cues].reverse().find(c => f >= c.at) ?? data.cues[0];
  const onPaper = false;
  const title = scene === 1;
  const conclusion = scene === 4 || scene === 12;
  const top = title ? 245 : scene === 4 ? 460 : scene === 12 ? 450 : scene === 5 && f < 105 ? 420 : 1370;
  const size = title ? 82 : scene === 12 ? 70 : onPaper ? 58 : 64;
  const opacity = scene === 12 ? 1 - progress(f, 141, 9) : 1;
  const visual = [<Opening frame={f}/>, <Definition frame={f}/>, <LifeWorlds frame={f}/>, <Boundary frame={f}/>, <ManyPeople frame={f}/>, <SelectiveMemory frame={f}/>, <FullRecord frame={f}/>, <SealPrediction frame={f}/>, <SpecificPrediction frame={f}/>, <Decision frame={f}/>, <Compare frame={f}/>, <Finale frame={f}/>][scene - 1];
  return <AbsoluteFill style={{background: C.ink, color: C.ivory, fontFamily: C.font, overflow: 'hidden'}}>
    <Atmosphere frame={f}/>
    <AbsoluteFill style={{opacity}}>
      {visual}
      {scene === 3 && <div style={{position: 'absolute', top: 1260, left: 0, right: 0, textAlign: 'center', color: C.secondary, fontSize: 36}}>{data.labels[0]}</div>}
      <FilmLook grain={0.022} vignette={0.25}/>
      <div data-main-text style={{position: 'absolute', zIndex: 25, left: onPaper ? 175 : C.left, top, width: onPaper ? 730 : C.contentWidth, fontSize: size, lineHeight: 1.5, textAlign: 'center', fontWeight: title || conclusion ? 600 : 500, color: onPaper ? C.bronzeDark : C.ivory, textShadow: onPaper ? 'none' : `0 4px 20px ${C.black}`, opacity: f === 0 || title ? 1 : 0.6 + progress(f, cue.at, 7) * 0.4}}>
        {cue.lines.map((line, i) => <div key={i} style={{whiteSpace: 'nowrap'}}>{highlight(line, cue.focus, onPaper)}</div>)}
      </div>
      {scene === 3 && <PageWipe frame={f} start={254} duration={16}/>}
      {scene === 4 && f < 14 && <div style={{position: 'absolute', inset: 0, zIndex: 30, background: C.paper, transform: `translateX(${-progress(f, 0, 14) * 1150}px)`}}/>}
    </AbsoluteFill>
  </AbsoluteFill>;
};
