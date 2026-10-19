import React from 'react';
import {baziTheme as C} from '../../../src/config/theme';
import {progress, lerp} from '../../../src/lib/anim';
import {settle} from '../../../src/lib/physical-motion';
import {BirthSeal, Block, Book, Burst, Figure, House, Suitcase} from './Props';
import {CameraRig, Place, StageLabel} from './Stage';
import content from './content.json';

export const Opening = ({frame}: {frame: number}) => {
  const p = settle(frame, 0, 30, 11, 130);
  const split = progress(frame, 36, 55);
  const zoom = progress(frame, 128, 52);
  return <>
    <div style={{position: 'absolute', left: 540, top: 620, width: 3 + split * 20, height: 560, opacity: split * (1 - zoom), background: `linear-gradient(transparent, ${C.goldLight}, transparent)`, boxShadow: `0 0 60px ${C.gold}`}}/>
    {[0, 1].map(i => <React.Fragment key={i}>
      <Place x={i ? 770 : 310} y={960} scale={1.15 - zoom * 0.3} opacity={1 - zoom * 0.8}><Figure size={245} variant={i}/></Place>
      <Place x={lerp(i ? 770 : 310, 540, zoom)} y={lerp(560 + p * 150, 870, zoom)} scale={lerp(0.9, 1.9, zoom)} rotate={(1 - p) * (i ? 40 : -40)} rx={(1 - p) * -80} opacity={i ? 1 - zoom : 1} z={4}><BirthSeal size={270}/></Place>
      <Place x={i ? 870 : 180} y={1000} scale={0.7} opacity={split * 0.28 * (1 - zoom)} z={0}>{i ? <Suitcase/> : <House size={230}/>}</Place>
    </React.Fragment>)}
    <Burst frame={frame} at={20} x={310} y={790}/><Burst frame={frame} at={20} x={770} y={790}/>
    <StageLabel y={1200} opacity={progress(frame, 95, 14) * (1 - zoom)}>{content[0].labels[0]}</StageLabel>
  </>;
};

export const Definition = ({frame}: {frame: number}) => {
  const spread = progress(frame, 0, 38) * (1 - progress(frame, 115, 55));
  return <>
    {[0, 1, 2, 3].map(i => <Place key={i} x={540 + (i - 1.5) * (149 + 48 * spread)} y={800 + Math.sin(i) * spread * 24} scale={1} ry={(1 - progress(frame, i * 7, 25)) * -150} rx={10}>
      <Block w={145} h={210} d={18}><div style={{position: 'absolute', inset: 18, border: `2px solid ${C.goldLight}77`, background: C.bronzeDark}}>{[0, 1].map(j => <div key={j} style={{margin: '28px 24px', height: 25, borderTop: `4px solid ${C.gold}`, borderBottom: `4px solid ${C.gold}`}}/>)}</div></Block>
    </Place>)}
    <div style={{position: 'absolute', left: 140 + progress(frame, 40, 65) * 680, top: 580, width: 130, height: 530, background: `linear-gradient(90deg, transparent, ${C.goldLight}22, transparent)`, transform: 'rotate(22deg)', opacity: 1 - progress(frame, 120, 20), filter: 'blur(15px)'}}/>
  </>;
};

export const LifeWorlds = ({frame, small = false}: {frame: number; small?: boolean}) => {
  const build = progress(frame, 20, 55);
  return <CameraRig frame={frame} keys={[{at: 0, x: 540, y: 800, scale: small ? 0.7 : 1.3}, {at: 65, x: 540, y: 800, scale: small ? 0.7 : 1}, {at: 180, x: 520, y: 800, scale: small ? 0.7 : 1.04}, {at: 270, x: 540, y: 800, scale: small ? 0.7 : 1}]}>
    {[0, 1].map(i => {
      const x = i ? 790 : 290;
      return <React.Fragment key={i}>
        <Place x={x} y={1050} rx={50}><Block w={430} h={320} d={32}/></Place>
        <Place x={x - 25} y={790} scale={Math.max(0.01, build)} rx={(1 - build) * -80} z={2}><House variant={i} size={330}/></Place>
        <Place x={x + (i ? 90 : -65)} y={1010} scale={progress(frame, 45 + i * 12, 35)} rotate={i ? 10 : -10} z={3}>{i ? <Suitcase size={230}/> : <Book size={250} open={0.5}/>}</Place>
        <Place x={x + 105} y={1000} scale={progress(frame, 65, 30)} z={4}><Figure size={125} variant={i}/></Place>
        <Place x={x} y={1180} scale={0.65} z={5}><BirthSeal size={245}/></Place>
      </React.Fragment>;
    })}
    <div style={{position: 'absolute', left: 539, top: 600, width: 2, height: 630, background: `linear-gradient(transparent, ${C.gold}55, transparent)`}}/>
  </CameraRig>;
};

export const Boundary = ({frame}: {frame: number}) => <>
  <div style={{opacity: 1 - progress(frame, 0, 30)}}><LifeWorlds frame={270} small/></div>
  <Place y={1050} scale={0.9 + progress(frame, 120, 60) * 0.35} ry={progress(frame, 120, 60) * 70} opacity={progress(frame, 12, 20)}><Book size={490} open={1 - progress(frame, 10, 30)}/></Place>
</>;
