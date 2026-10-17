import { Easing, interpolate } from 'remotion';

export const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;

export const deg = (d: number) => (d * Math.PI) / 180;

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** 0 → 1 进度，带缓动 */
export const progress = (
  frame: number,
  start: number,
  duration: number,
  easing: (t: number) => number = Easing.out(Easing.cubic),
) => interpolate(frame, [start, start + duration], [0, 1], { ...clamp, easing });

/** 区间淡入淡出，用于屏幕文字的生命周期 */
export const windowOpacity = (frame: number, start: number, end: number, fade = 18) =>
  Math.min(
    interpolate(frame, [start, start + fade], [0, 1], clamp),
    interpolate(frame, [end - fade, end], [1, 0], clamp),
  );

/** 圆弧上的点串（数学角度，y 轴向上） */
export const arcPoints = (
  cx: number,
  cy: number,
  r: number,
  fromDeg: number,
  toDeg: number,
  steps = 48,
) => {
  const points: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const a = deg(lerp(fromDeg, toDeg, i / steps));
    points.push(`${cx + r * Math.cos(a)},${cy - r * Math.sin(a)}`);
  }
  return points.join(' ');
};

export const arcMidpoint = (
  cx: number,
  cy: number,
  r: number,
  fromDeg: number,
  toDeg: number,
) => {
  const a = deg((fromDeg + toDeg) / 2);
  return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) };
};

/** 确定性伪随机，保证每帧渲染一致 */
export const rand = (i: number, salt = 1) => {
  const v = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return v - Math.floor(v);
};
