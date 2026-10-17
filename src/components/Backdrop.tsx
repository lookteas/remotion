import React from 'react';
import { AbsoluteFill } from 'remotion';
import { palette } from '../config/theme';

/**
 * 电影感收尾层：暗角 + 细颗粒。
 * 压在画面最上方，用来压住大色块渐变与数字边缘。
 */
export const FilmLook: React.FC<{ grain?: number; vignette?: number }> = ({
  grain = 0.05,
  vignette = 0.62,
}) => (
  <>
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 48%, transparent 36%, rgba(0,0,0,${vignette}) 100%)`,
        pointerEvents: 'none',
      }}
    />
    <AbsoluteFill
      style={{
        opacity: grain,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
      }}
    />
    {/* 顶部压暗，保证标题可读 */}
    <AbsoluteFill
      style={{
        background: `linear-gradient(to bottom, ${palette.bg} 0%, transparent 22%)`,
        opacity: 0.75,
        pointerEvents: 'none',
      }}
    />
  </>
);
