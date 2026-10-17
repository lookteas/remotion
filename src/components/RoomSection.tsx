import React from 'react';
import { font, palette } from '../config/theme';

/**
 * 轻量版单页剖面图（不含动画）。
 * 连续镜头版本见 src/world/HouseWorld.tsx；本组件保留给需要静态示意图的期次。
 */

const FLOOR_Y = 520;
const CEIL_Y = 230;
const WALL_X = 250;
const WINDOW_TOP_Y = 280;
const WINDOW_SILL_Y = 420;
const ROOM_RIGHT = 950;
const PX_PER_M = 100;

const runOfTop = (elevation: number) =>
  (FLOOR_Y - WINDOW_TOP_Y) / Math.tan((elevation * Math.PI) / 180);

export const RoomSection: React.FC<{
  elevation: number;
  accent?: string;
  idPrefix?: string;
}> = ({ elevation, accent = palette.sun, idPrefix = 'room' }) => {
  const litFar = WALL_X + runOfTop(elevation);
  const litNear = WALL_X + runOfTop(elevation) * 0.3;
  const depthMeters = (litFar - WALL_X) / PX_PER_M;

  return (
    <svg
      viewBox="0 0 1000 620"
      style={{ width: '100%', height: 'auto', display: 'block', fontFamily: font.body }}
    >
      <defs>
        <linearGradient id={`${idPrefix}-beam`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity={0.34} />
          <stop offset="100%" stopColor={accent} stopOpacity={0.04} />
        </linearGradient>
      </defs>

      <line
        x1={ROOM_RIGHT}
        y1={CEIL_Y}
        x2={ROOM_RIGHT}
        y2={FLOOR_Y}
        stroke={palette.line}
        strokeWidth={2}
        strokeDasharray="10 10"
      />
      <line x1={WALL_X} y1={FLOOR_Y} x2={ROOM_RIGHT} y2={FLOOR_Y} stroke={palette.cream} strokeWidth={2.4} opacity={0.7} />
      <line x1={WALL_X} y1={CEIL_Y} x2={ROOM_RIGHT} y2={CEIL_Y} stroke={palette.cream} strokeWidth={1.4} opacity={0.3} />

      <rect x={WALL_X - 12} y={CEIL_Y} width={12} height={WINDOW_TOP_Y - CEIL_Y} fill={palette.cream} opacity={0.32} />
      <rect x={WALL_X - 12} y={WINDOW_SILL_Y} width={12} height={FLOOR_Y - WINDOW_SILL_Y} fill={palette.cream} opacity={0.32} />

      <polygon
        points={`${WALL_X},${WINDOW_TOP_Y} ${litFar},${FLOOR_Y} ${litNear},${FLOOR_Y} ${WALL_X},${WINDOW_SILL_Y}`}
        fill={`url(#${idPrefix}-beam)`}
      />
      <line x1={WALL_X} y1={WINDOW_TOP_Y} x2={litFar} y2={FLOOR_Y} stroke={accent} strokeWidth={2.2} opacity={0.85} />
      <ellipse cx={(litFar + litNear) / 2} cy={FLOOR_Y} rx={(litFar - litNear) / 2} ry={8} fill={accent} opacity={0.6} />

      <text
        x={(WALL_X + litFar) / 2}
        y={FLOOR_Y + 62}
        fill={accent}
        fontSize={30}
        fontWeight={600}
        textAnchor="middle"
        fontFamily={font.num}
      >
        {depthMeters.toFixed(1)} m
      </text>
    </svg>
  );
};
