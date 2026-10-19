import React from 'react';
import {baziTheme as C} from '../../../src/config/theme';
import {progress, rand} from '../../../src/lib/anim';
import {cameraAt, CameraKey} from '../../../src/lib/camera';

export const Place: React.FC<{x?: number; y?: number; scale?: number; rotate?: number; rx?: number; ry?: number; opacity?: number; z?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x = 540, y = 750, scale = 1, rotate = 0, rx = 0, ry = 0, opacity = 1, z = 1, children, style}) => <div style={{position: 'absolute', left: x, top: y, zIndex: z, opacity, transform: `translate(-50%, -50%) perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rotate}deg) scale(${scale})`, transformStyle: 'preserve-3d', ...style}}>{children}</div>;

export const CameraRig: React.FC<{frame: number; keys: CameraKey[]; children: React.ReactNode}> = ({frame, keys, children}) => {
  const c = cameraAt(frame, keys);
  return <div style={{position: 'absolute', inset: 0, transformOrigin: '0 0', transform: `translate(${540 - c.x * c.scale}px, ${820 - c.y * c.scale}px) scale(${c.scale})`}}>{children}</div>;
};

export const StageLabel = ({children, x = 540, y, color = C.goldLight, size = 42, opacity = 1}: {children: React.ReactNode; x?: number; y: number; color?: string; size?: number; opacity?: number}) => <div style={{position: 'absolute', left: x, top: y, transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: size, letterSpacing: 3, color, opacity, zIndex: 20, textShadow: `0 2px 12px ${C.black}`}}>{children}</div>;

export const Atmosphere = ({frame}: {frame: number}) => <>
  <div style={{position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 45% 43%, ${C.bronze}45, transparent 58%), linear-gradient(125deg, ${C.ink}, ${C.blueDark}25 55%, ${C.ink})`}}/>
  <div style={{position: 'absolute', left: -300, top: -400, width: 900, height: 1800, transform: 'rotate(-24deg)', background: `linear-gradient(90deg, transparent 20%, ${C.gold}09 49%, transparent 80%)`, filter: 'blur(35px)'}}/>
  <div style={{position: 'absolute', top: 1120, left: -200, width: 1480, height: 900, transform: 'perspective(600px) rotateX(70deg)', background: `radial-gradient(ellipse, ${C.gold}18, transparent 65%)`}}/>
  {Array.from({length: 42}, (_, i) => <div key={i} style={{position: 'absolute', left: rand(i, 3) * 1080 + Math.sin(frame / 80 + i) * 14, top: (rand(i, 6) * 1920 - frame * (0.1 + rand(i, 2) * 0.15) + 1920) % 1920, width: i % 5 === 0 ? 4 : 2, height: i % 5 === 0 ? 4 : 2, borderRadius: '50%', background: C.goldLight, opacity: 0.1 + rand(i, 8) * 0.16}}/>)}
</>;

export const PageWipe = ({frame, start, duration = 14}: {frame: number; start: number; duration?: number}) => {
  const p = progress(frame, start, duration);
  if (p === 0) return null;
  return <div style={{position: 'absolute', zIndex: 30, left: 1080 - p * 1500, top: -100, width: 1550, height: 2200, transform: `rotateY(${70 * (1 - p)}deg) rotateZ(${-12 * (1 - p)}deg)`, background: `linear-gradient(95deg, ${C.paperEdge}, ${C.paperLight} 25%, ${C.paper} 80%, ${C.paperEdge})`, boxShadow: `-40px 0 70px ${C.black}88`}}/>;
};
