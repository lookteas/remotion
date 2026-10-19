import React from 'react';
import {baziTheme as C} from '../../../src/config/theme';
import {lerp, progress} from '../../../src/lib/anim';
import {settle} from '../../../src/lib/physical-motion';
import {BirthSeal, Block, Book, Burst, Envelope, Figure, Lock, Paper} from './Props';
import {Place, StageLabel} from './Stage';
import content from './content.json';

export const SealPrediction = ({frame}: {frame: number}) => {
  const insert = progress(frame, 48, 45); const closed = progress(frame, 93, 23);
  return <>
    <Place y={950} rx={15} z={0}><Book size={630} open={progress(frame, 0, 35)}/></Place>
    <Place x={480} y={lerp(600, 850, insert)} scale={0.95 - insert * 0.25} rotate={-7} opacity={1 - progress(frame, 87, 14)} z={2}><Paper w={390} h={440}/></Place>
    <StageLabel x={480} y={300} opacity={1 - progress(frame, 87, 14)}>{content[7].labels[0]}</StageLabel>
    <Place x={480} y={890} rotate={-7} z={3}><Envelope w={490} close={closed}/></Place>
    <StageLabel x={480} y={1220} opacity={closed}>{content[7].labels[1]}</StageLabel>
    <Place x={790} y={660} scale={0.7} opacity={progress(frame, 140, 28)} rotate={10} z={1}><Paper w={270} h={320}/></Place>
    <StageLabel x={790} y={490} opacity={progress(frame, 140, 28)}>{content[7].labels[2]}</StageLabel>
    <Place x={820} y={1050} opacity={progress(frame, 120, 20)} z={4}><svg width={160} height={160} viewBox="0 0 160 160"><circle cx={80} cy={80} r={70} fill={C.bronzeDark} stroke={C.gold} strokeWidth={5}/>{Array.from({length: 12}, (_, i) => <path key={i} d="M80 18 V27" stroke={C.goldLight} strokeWidth={3} transform={`rotate(${i * 30} 80 80)`}/>)}<path d="M80 80 V35" stroke={C.goldLight} strokeWidth={4} transform={`rotate(${progress(frame, 125, 65) * 270} 80 80)`}/><circle cx={80} cy={80} r={5} fill={C.goldLight}/></svg></Place>
    <Burst frame={frame} at={110} x={480} y={885} count={20}/>
  </>;
};

export const SpecificPrediction = ({frame}: {frame: number}) => {
  const clear = progress(frame, 50, 35);
  return <>
    {[0, 1].map(i => <React.Fragment key={i}>
      <Place y={600 + i * 420} scale={i ? 0.94 + clear * 0.06 : 1}>
        <Block w={760} h={300} d={18}><div style={{position: 'absolute', inset: 12, background: C.surface, padding: '45px 30px', textAlign: 'center', color: i ? C.goldLight : C.ivory, fontSize: 62, lineHeight: 1.5}}>{content[8].examples?.[i].map((line, j) => <div key={j}>{line}</div>)}</div></Block>
      </Place>
      <StageLabel y={385 + i * 420} size={42} color={i ? C.goldLight : C.secondary}>{content[8].labels[i]}</StageLabel>
    </React.Fragment>)}
    <div style={{position: 'absolute', left: 220, top: 1130, height: 5, width: 640 * clear, background: C.goldLight}}/>
    <StageLabel y={1270} size={34}>{content[8].labels[2]}</StageLabel>
  </>;
};

export const Decision = ({frame}: {frame: number}) => {
  const lock = progress(frame, 120, 40);
  return <>
    {[0, 1].map(i => {
      const p = settle(frame, i ? 80 : 42, 30, 14, 160);
      return <React.Fragment key={i}>
        <Place y={620 + i * 450} rx={18}><Block w={730} h={260} d={30}><div style={{position: 'absolute', inset: 20, background: C.bronzeDark, border: `1px solid ${C.gold}66`}}/></Block></Place>
        <StageLabel x={650} y={570 + i * 450} size={50} color={i ? C.goldLight : C.secondary}>{content[9].labels[i]}</StageLabel>
        <Place x={310} y={490 + i * 450 + p * 110} rotate={-8 + (1 - p) * 30} scale={0.53} opacity={progress(frame, i ? 80 : 42, 12)} z={4}><Paper w={280} h={300} mark={i && frame > 110 ? 'hit' : 'miss'}/></Place>
      </React.Fragment>;
    })}
    <div style={{position: 'absolute', left: 529, top: 745, height: 180, width: 18, background: `linear-gradient(90deg, ${C.bronze}, ${C.goldLight}, ${C.bronze})`, opacity: lock}}/>
    <Place y={840} scale={Math.max(0.01, settle(frame, 130))} z={8}><Lock closed={progress(frame, 138, 20)} size={115}/></Place>
    <StageLabel y={1270} size={36}>{content[9].labels[2]}</StageLabel><Burst frame={frame} at={151} y={880}/>
  </>;
};

/** Same case, different information, identical locked evaluation. No invented outcomes. */
export const Compare = ({frame}: {frame: number}) => {
  const divide = progress(frame, 12, 40);
  const seal = progress(frame, 82, 28);
  const travel = progress(frame, 124, 36);
  const reveal = progress(frame, 165, 35);
  return <>
    <StageLabel y={260} size={40} opacity={1 - progress(frame, 80, 18)}>{content[10].labels[3]}</StageLabel>
    <Place y={440} scale={0.52 * (1 - progress(frame, 75, 25))} z={5}><Paper w={360} h={300}><div style={{position: 'absolute', left: 118, top: 18}}><Figure size={120}/></div></Paper></Place>
    <svg width={1080} height={1300} style={{position: 'absolute', left: 0, top: 0}}>
      {[0, 1].map(i => <g key={i}><path d={`M540 520 C540 575 ${i ? 770 : 310} 535 ${i ? 770 : 310} 650`} fill="none" stroke={C.gold} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - divide} opacity={0.6 * (1 - travel)}/><path d={`M${i ? 770 : 310} 910 Q${i ? 900 : 180} 1100 ${i ? 660 : 420} 1140`} fill="none" stroke={C.gold} strokeWidth={3} pathLength={1} strokeDasharray="0.03 0.03" strokeDashoffset={-frame * 0.004} opacity={progress(frame, 100, 15) * 0.5}/></g>)}
    </svg>
    {[0, 1].map(i => {
      const x = i ? 770 : 310;
      const lift = Math.max(0.01, settle(frame, i * 5, 30, 17, 130));
      return <React.Fragment key={i}>
        <Place x={x} y={815 + (1 - lift) * 130} scale={lift} rx={16} z={1}><Block w={365} h={310} d={28}><div style={{position: 'absolute', inset: 16, background: C.surface, boxShadow: `inset 0 0 45px ${C.gold}15`}}/></Block></Place>
        <StageLabel x={x} y={590} size={43}>{content[10].labels[i]}</StageLabel>
        <Place x={lerp(540, x, divide)} y={lerp(440, 800, divide)} scale={0.47} opacity={divide * (1 - seal)} ry={Math.sin(divide * Math.PI) * (i ? -35 : 35)} z={4}><Paper w={300} h={320}/></Place>
        {i === 0 && <Place x={x} y={690} scale={0.44 * progress(frame, 45, 16)} opacity={1 - progress(frame, 110, 18)} z={6}><BirthSeal size={330}/></Place>}
        {i === 1 && <Place x={x} y={690} scale={0.44 * progress(frame, 45, 16)} opacity={1 - progress(frame, 110, 18)} z={6}><Block w={330} h={198} d={24}><div style={{position: 'absolute', inset: 5, background: C.bronzeDark}}/></Block></Place>}
        <Place x={lerp(x, i ? 660 : 420, travel) + Math.sin(travel * Math.PI) * (i ? 80 : -80)} y={lerp(815, 1140, travel)} scale={0.62} rotate={Math.sin(travel * Math.PI) * (i ? 15 : -15)} opacity={progress(frame, 75, 15)} z={7}><Envelope w={370} close={seal}/></Place>
        {[0, 1, 2].map(j => {
          const p = progress(frame, 140 + j * 12, 30);
          return <Place key={j} x={lerp(x, i ? 660 : 420, p)} y={lerp(800, 1140 - j * 8, p)} scale={0.35 + p * 0.12} rotate={(1 - p) * (i ? 18 : -18)} opacity={progress(frame, 140 + j * 12, 8) * (1 - progress(frame, 212, 15))} z={5-j}><Paper w={300} h={260}/></Place>;
        })}
        <div style={{position: 'absolute', left: x - 140, top: 660 + progress(frame, 55, 26) * 270, width: 280, height: 4, background: C.goldLight, boxShadow: `0 0 24px ${C.gold}`, opacity: progress(frame, 52, 5) * (1 - progress(frame, 81, 6)), zIndex: 8}}/>
      </React.Fragment>;
    })}
    <Place y={1160} rx={20} scale={progress(frame, 110, 20)} z={0}><Block w={720} h={210} d={25}/></Place>
    <StageLabel y={1010} size={40} opacity={progress(frame, 110, 20)}>{content[10].labels[4]}</StageLabel>
    <Place y={1130} scale={reveal * 0.62} z={10}><Lock size={115} closed={progress(frame, 177, 16)}/></Place>
    <Burst frame={frame} at={192} y={1160} count={22}/>
    <StageLabel y={1290} size={32}>{content[10].labels[2]}</StageLabel>
  </>;
};

export const Finale = ({frame}: {frame: number}) => {
  const withdraw = progress(frame, 0, 40);
  return <>
    <Place y={1070} scale={1.12} rotate={-5 + progress(frame, 0, 70) * 5}><Envelope w={530}/></Place>
    <Place x={lerp(540, 180, withdraw)} y={lerp(820, 740, withdraw)} scale={0.8 * (1 - withdraw * 0.4)} ry={withdraw * -65} opacity={1 - withdraw}><BirthSeal size={340}/></Place>
    <StageLabel y={745} size={150} opacity={progress(frame, 30, 30)}>{content[11].labels[0]}</StageLabel>
    <div style={{position: 'absolute', left: 330, top: 1230, width: 420, height: 40, borderRadius: '50%', background: C.gold, opacity: 0.06 + Math.sin(frame / 45) * 0.02, filter: 'blur(20px)'}}/>
  </>;
};
