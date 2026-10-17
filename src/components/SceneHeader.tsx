import React from 'react';
import { Easing } from 'remotion';
import { progress } from '../lib/anim';
import { font, palette } from '../config/theme';

/**
 * 章节编号标签：`01 / 方位`
 * 用作画面上的小量级标题，替代整屏标题卡。
 */
export const SectionLabel: React.FC<{
  index: string;
  title: string;
  frame: number;
  start: number;
  end?: number;
  align?: 'left' | 'right';
}> = ({ index, title, frame, start, end, align = 'left' }) => {
  const p = progress(frame, start, 22, Easing.out(Easing.cubic));
  const out = end === undefined ? 1 : 1 - progress(frame, end - 14, 14);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 12,
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        opacity: Math.min(p, out),
        transform: `translateY(${(1 - p) * 10}px)`,
        fontFamily: font.body,
      }}
    >
      <span style={{ fontSize: 19, letterSpacing: 6, color: palette.sun }}>{index}</span>
      <span style={{ fontSize: 19, letterSpacing: 6, color: palette.muted }}>/</span>
      <span style={{ fontSize: 19, letterSpacing: 8, color: palette.muted }}>{title}</span>
    </div>
  );
};
