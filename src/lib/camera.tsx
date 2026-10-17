import React from 'react';
import { Easing } from 'remotion';
import { lerp } from './anim';

export type CameraKey = {
  at: number;
  /** 画面中心对准的世界坐标 */
  x: number;
  y: number;
  scale: number;
};

/**
 * 在关键帧之间做三次缓动插值。
 * 关键帧之间永远连续 —— 这正是"不像 PPT"的核心：
 * 整支片子只有一个镜头，从不硬切。
 */
export const cameraAt = (frame: number, keys: CameraKey[]) => {
  const first = keys[0];
  const last = keys[keys.length - 1];

  if (frame <= first.at) return first;
  if (frame >= last.at) return last;

  for (let i = 0; i < keys.length - 1; i += 1) {
    const a = keys[i];
    const b = keys[i + 1];
    if (frame >= a.at && frame <= b.at) {
      const t = (frame - a.at) / (b.at - a.at);
      const e = Easing.inOut(Easing.cubic)(t);
      return {
        x: lerp(a.x, b.x, e),
        y: lerp(a.y, b.y, e),
        scale: lerp(a.scale, b.scale, e),
      };
    }
  }
  return last;
};

export const Camera: React.FC<{
  frame: number;
  keys: CameraKey[];
  children: React.ReactNode;
}> = ({ frame, keys, children }) => {
  const c = cameraAt(frame, keys);
  // 极轻微的呼吸感，避免画面完全静止
  const breathe = 1 + Math.sin(frame / 74) * 0.0022;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 1900,
        height: 1200,
        transformOrigin: '0 0',
        transform: `translate(${960 - c.x * c.scale * breathe}px, ${
          540 - c.y * c.scale * breathe
        }px) scale(${c.scale * breathe})`,
      }}
    >
      {children}
    </div>
  );
};
