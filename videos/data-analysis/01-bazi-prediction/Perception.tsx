import React from 'react';
import {baziTheme as C} from '../../../src/config/theme';
import {lerp, progress, rand} from '../../../src/lib/anim';
import {Paper, Figure, Book, Burst} from './Props';
import {Place, CameraRig, StageLabel} from './Stage';
import content from './content.json';

export const ManyPeople = ({frame}: {frame: number}) => {
  const expand = progress(frame, 75, 55);
  return <>
    <div style={{position: 'absolute', left: 138, top: 365, width: 804, height: 300, borderRadius: 24, background: `linear-gradient(135deg, ${C.surface}, ${C.bronzeDark})`, border: `2px solid ${C.gold}`, boxShadow: `0 25px 65px ${C.black}88`}}/>
    {frame >= 105 && <div style={{position: 'absolute', left: 150, top: 420, width: 780, textAlign: 'center', fontSize: 64, lineHeight: 1.5, color: C.ivory}}>{content[4].cues[0].lines.map((line, i) => <div key={i}>{line}</div>)}</div>}
    <StageLabel y={285} size={38}>{content[4].labels[0]}</StageLabel>
    {[0, 1, 2].map(i => {
      const x = i === 1 ? 540 : lerp(540, i === 0 ? 260 : 820, expand);
      return <React.Fragment key={i}>
        <svg width={1080} height={1200} style={{position: 'absolute', top: 0, left: 0}}><path d={`M540 665 Q540 730 ${x} 805`} fill="none" stroke={C.goldLight} strokeWidth={4} opacity={i===1?0.8:expand*0.8}/><circle cx={x} cy={805} r={7} fill={C.goldLight} opacity={i===1?1:expand}/></svg>
        <Place x={x} y={1030} scale={i===1 ? 1 : expand} opacity={i===1?1:expand}><Figure size={210} variant={i}/></Place>
      </React.Fragment>;
    })}
    <StageLabel y={1250} size={38} opacity={expand}>{content[4].labels[1]}</StageLabel>
  </>;
};

/** Same world positions for B06/B07: the pullback reveals records that already existed. */
const RecordWorld = ({frame, gather = 0, visible = 1}: {frame: number; gather?: number; visible?: number}) => <>
  {Array.from({length: 15}, (_, i) => {
    const col = i % 5; const row = Math.floor(i / 5);
    const hit = i % 3 === 0;
    const tx = 140 + col * 200; const ty = 550 + row * 245;
    const p = progress(frame, 50 + i * 3, 42) * gather;
    return <Place key={i} x={lerp(tx, 540 + (i % 3) * 3, p)} y={lerp(ty, 1000 - i * 2, p)} scale={lerp(0.52, 0.65, p)} rotate={lerp((rand(i, 4) - 0.5) * 30, -7, p)} rx={p * 50} opacity={hit ? 1 : visible} z={i + 1}>
      <Paper w={280} h={340} mark={hit ? 'hit' : 'miss'}/>
    </Place>;
  })}
</>;

export const SelectiveMemory = ({frame}: {frame: number}) => {
  const reveal = progress(frame, 150, 80);
  return <>
    <div style={{position: 'absolute', left: 30, top: 300, width: 1000, height: 1000, background: `radial-gradient(ellipse at 44% 45%, ${C.gold}35, transparent 65%)`, transform: `translateX(${reveal * 110}px)`}}/>
    <div style={{position: 'absolute', inset: 0, clipPath: 'inset(230px 0 740px 0)'}}><CameraRig frame={frame} keys={[{at: 0, x: 140, y: 550, scale: 1.35}, {at: 95, x: 140, y: 550, scale: 2.05}, {at: 140, x: 140, y: 550, scale: 2.05}, {at: 239, x: 210, y: 620, scale: 1.6}]}>
      <RecordWorld frame={0} visible={0.07 + reveal * 0.24}/>
    </CameraRig></div>
    <StageLabel x={300} y={1190}>{content[5].labels[0]}</StageLabel><StageLabel x={750} y={1190} opacity={reveal} color={C.vermilion}>{content[5].labels[1]}</StageLabel>
    <StageLabel y={1270} size={34}>{content[5].labels[2]}</StageLabel>
  </>;
};

export const FullRecord = ({frame}: {frame: number}) => {
  const gather = progress(frame, 100, 65);
  return <>
    <div style={{position: 'absolute', inset: 0, clipPath: 'inset(230px 0 740px 0)'}}><CameraRig frame={frame} keys={[{at: 0, x: 210, y: 620, scale: 1.6}, {at: 45, x: 540, y: 820, scale: 0.94}, {at: 110, x: 540, y: 820, scale: 0.94}, {at: 200, x: 540, y: 820, scale: 1}]}>
      <Place y={1010} opacity={progress(frame, 110, 25)} z={0}><Book open={1 - progress(frame, 190, 28)} size={550}/></Place>
      <div style={{opacity: 1 - progress(frame, 180, 35)}}><RecordWorld frame={frame} gather={gather} visible={0.31 + progress(frame, 0, 40) * 0.69}/></div>
    </CameraRig></div>
    <StageLabel x={280} y={1200} opacity={1 - gather}>{content[6].labels[0]}</StageLabel><StageLabel x={780} y={1200} color={C.vermilion} opacity={1 - gather}>{content[6].labels[1]}</StageLabel>
    <StageLabel y={1280} size={34}>{content[6].labels[2]}</StageLabel><Burst frame={frame} at={210} y={1120}/>
  </>;
};
