import {settle} from '../../../src/lib/physical-motion';
import React from 'react';
import {spring, useCurrentFrame} from 'remotion';
import {ichingTheme as C} from '../../../src/config/theme';
import {lerp, progress, rand} from '../../../src/lib/anim';
import {SceneShell, cueAt, FONT, Gold, Heading, Kicker, Lift} from './Chrome';

const NOTES = [
  {name: '王阿姨', text: '今年重阳不一般，60 年一遇，五个特点，早做准备', likes: '1.5 万', comments: '231', avatar: '#8a6a3a', tint: '#7a4f22'},
  {name: '表姐', text: '赤马重阳，转给家里人看看', likes: '9607', comments: '88', avatar: '#5f7f6a', tint: '#3d5a4a'},
  {name: '老同学', text: '1966 → 2026 → 2086，真的是 60 年一轮', likes: '2319', comments: '54', avatar: '#5f6f8a', tint: '#2f4058'},
  {name: '家人群', text: '霜降只剩 5 天，重阳糕安排上了', likes: '805', comments: '12', avatar: '#7a5a6a', tint: '#5a3a48'},
  {name: '同事小李', text: '赤马红羊，到底什么意思？', likes: '1100', comments: '36', avatar: '#6a6a4a', tint: '#4a4a2a'},
  {name: '邻居张姐', text: '重阳这天，运势特殊？', likes: '461', comments: '9', avatar: '#6a4a4a', tint: '#4a2a2a'},
  {name: '家族群', text: '重阳糕蒸好了，等你回来', likes: '2572', comments: '66', avatar: '#4a6a6a', tint: '#2a4a4a'},
  {name: '大学室友', text: '六十年一遇，是异象吗', likes: '9290', comments: '120', avatar: '#5a5a7a', tint: '#3a3a5a'},
  {name: '表妹', text: '九月初九，两个九叠在一起', likes: '615', comments: '15', avatar: '#7a6a4a', tint: '#5a4a2a'},
  {name: '小区群', text: '今年重阳，60 年才一次', likes: '385', comments: '7', avatar: '#4a5a6a', tint: '#2a3a4a'},
];

const Card: React.FC<{i: number; frame: number; suck: number}> = ({i, frame, suck}) => {
  const note = NOTES[i];
  const angle = rand(i, 1) * Math.PI * 2;
  const radius = 200 + rand(i, 2) * 190;
  const fx = 452 + Math.cos(angle) * radius;
  const fy = 372 + Math.sin(angle) * radius * 0.8;
  const sx = fx + (rand(i, 3) - 0.5) * 520;
  const sy = fy - 420 - rand(i, 4) * 260;
  const p = settle(frame, i * 5);
  const x = lerp(sx, fx, Math.min(1, p)) + (452 - fx) * suck;
  const y = lerp(sy, fy, Math.min(1, p)) + (372 - fy) * suck;
  const rot = (rand(i, 5) - 0.5) * 14 - suck * (rand(i, 6) - 0.5) * 50;
  const scale = (0.74 + 0.26 * Math.min(1, p)) * (1 - 0.85 * suck);

  return <div style={{
    position: 'absolute', zIndex: 1, left: x, top: y, width: 278, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`,
    opacity: Math.min(1, Math.max(0, p * 2)) * (1 - suck),
    padding: '13px 14px 12px', borderRadius: 14, background: '#1d2126',
    border: '1px solid rgba(255,255,255,0.14)', boxShadow: `0 18px 46px ${C.black}`,
  }}>
    <div style={{display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9}}>
      <div style={{width: 34, height: 34, borderRadius: 8, background: note.avatar, border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.ivory, fontSize: 15}}>{note.name[0]}</div>
      <div style={{flex: 1}}>
        <div style={{color: '#9fb6c8', fontSize: 13, letterSpacing: 1}}>{note.name}</div>
        <div style={{color: C.muted, fontSize: 10, marginTop: 2}}>刚刚</div>
      </div>
      <div style={{color: C.muted, fontSize: 14, letterSpacing: 2}}>···</div>
    </div>
    <div style={{color: C.ivory, fontFamily: FONT, fontSize: 15.5, lineHeight: 1.6, letterSpacing: 0.5}}>{note.text}</div>
    <div style={{position: 'relative', marginTop: 9, height: 92, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)'}}>
      <svg width="100%" height="92" viewBox="0 0 248 92" preserveAspectRatio="none">
        <rect width="248" height="92" fill={note.tint} />
        <circle cx="192" cy="26" r="14" fill="#F3D79C" opacity="0.9" />
        <path d="M0 82 L48 50 L88 72 L138 40 L190 74 L248 54 L248 92 L0 92 Z" fill="#2c2013" opacity="0.92" />
        <path d="M0 92 L60 66 L110 84 L170 58 L248 82 L248 92 Z" fill="#17110b" />
      </svg>
      <div style={{position: 'absolute', right: 7, bottom: 6, color: 'rgba(255,255,255,0.7)', fontSize: 10}}>2 图</div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 9, color: C.muted, fontSize: 11}}>
      <span><span style={{color: C.vermilion}}>♥</span> {note.likes}</span>
      <span>💬 {note.comments}</span>
    </div>
  </div>;
};

export const HookStormScene: React.FC = () => {
  const frame = useCurrentFrame();
  const suck = progress(frame, cueAt(1, 2), 42);
  const dateIn = progress(frame, cueAt(1, 2) + 18, 32);
  const stamp = spring({frame: Math.max(0, frame - cueAt(1, 3)), fps: 30, config: {damping: 12, stiffness: 220}});
  const mathIn = progress(frame, cueAt(1, 4), 26);
  const ring = progress(frame, cueAt(1, 4), 30);

  return <SceneShell index={1}>
    <div style={{position: 'absolute', left: 88, top: 272, width: 904}}>
      <Kicker>二〇二六 · 九月初九</Kicker>
      <Heading size={132} at={6} style={{marginTop: 26}}>赤马<Gold>重阳</Gold></Heading>
      <Lift at={cueAt(1, 2)} style={{marginTop: 16}}>
        <div style={{fontFamily: FONT, fontSize: 78, color: C.goldLight, letterSpacing: 4}}>六十年一遇？</div>
      </Lift>
    </div>

    <div style={{position: 'absolute', left: 88, top: 735, width: 904, height: 760}}>
      <div style={{position: 'absolute', zIndex: 30, left: 452, top: 24, transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 9, padding: '8px 16px', borderRadius: 22, background: '#1d2126', border: '1px solid rgba(255,255,255,0.16)', opacity: 1 - suck}}>
        <span style={{width: 8, height: 8, borderRadius: '50%', background: C.green}} />
        <span style={{color: C.ivory, fontSize: 14, letterSpacing: 3}}>朋友圈 · 刚刚更新</span>
      </div>

      {NOTES.map((_, i) => <Card key={i} i={i} frame={frame} suck={suck} />)}

      <div style={{
        position: 'absolute', zIndex: 10, left: 452, top: 372, width: 360, height: 252, transform: `translate(-50%, -50%) scale(${0.9 + 0.1 * dateIn})`,
        opacity: dateIn, borderRadius: 14, background: `linear-gradient(150deg, ${C.surface}, ${C.ink})`,
        border: `1px solid ${C.gold}66`, boxShadow: `0 30px 90px ${C.black}, 0 0 60px ${C.gold}14`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        <div style={{color: C.gold, fontSize: 18, letterSpacing: 8}}>农历九月初九</div>
        <div style={{color: C.ivory, fontFamily: FONT, fontSize: 64, letterSpacing: 6}}>九月初九</div>
        <div style={{color: C.secondary, fontFamily: C.numberFont, fontSize: 20, letterSpacing: 4}}>2026.10.18 · 星期日</div>
        <div style={{position: 'absolute', right: -18, bottom: -20, transform: `rotate(-9deg) scale(${0.5 + stamp * 0.5})`, opacity: Math.min(1, stamp * 2), padding: '8px 12px', background: C.vermilion, border: `2px solid ${C.ivory}cc`, color: C.ivory, fontFamily: FONT, fontSize: 20, letterSpacing: 2}}>六十年一遇</div>
      </div>

      <div style={{position: 'absolute', zIndex: 20, left: 452, top: 538, transform: 'translate(-50%, 0)', textAlign: 'center', opacity: mathIn}}>
        <div style={{color: C.goldLight, fontFamily: FONT, fontSize: 30, letterSpacing: 6}}>先别急着信</div>
        <div style={{width: 260 + 120 * mathIn, height: 1, background: `${C.gold}88`, margin: '14px auto 0'}} />
      </div>

      <div style={{position: 'absolute', left: 452, top: 372, width: 420, height: 420, transform: 'translate(-50%, -50%)', borderRadius: '50%', border: `1px solid ${C.vermilion}`, opacity: 0.4 * ring * (1 - ring)}} />
    </div>
  </SceneShell>;
};
