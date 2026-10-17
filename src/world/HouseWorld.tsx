import React from 'react';
import { font, palette } from '../config/theme';
import { arcPoints, deg, lerp, rand } from '../lib/anim';

/**
 * 连续世界。整支片子只有这一张图，镜头在里面运动。
 * 坐标：单位 px，100 px ≈ 0.7 m（见 PX_PER_M）
 */

export const WORLD_W = 1900;
export const WORLD_H = 1400;

const GROUND_Y = 1050;
const WALL_X = 560;
const CEIL_Y = 620;
const WIN_TOP = 710; // 窗上沿：离地 2.4 m
const WIN_SILL = 908; // 窗台：离地 1.0 m
const ROOM_RIGHT = 1560;
const ARC_R = 280;
const PX_PER_M = 141.7;

const runTop = (t: number) => (GROUND_Y - WIN_TOP) / Math.tan(deg(t));
const runSill = (t: number) => (GROUND_Y - WIN_SILL) / Math.tan(deg(t));

const sunPos = (t: number) => ({
  x: WALL_X - ARC_R * Math.cos(deg(t)),
  y: WIN_TOP - ARC_R * Math.sin(deg(t)),
});

/** 描边生长 */
const GrowLine: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  p: number;
  color?: string;
  width?: number;
  opacity?: number;
}> = ({ x1, y1, x2, y2, p, color = palette.cream, width = 1.6, opacity = 1 }) => {
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (p <= 0) return null;
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={width}
      opacity={opacity}
      strokeDasharray={len}
      strokeDashoffset={len * (1 - p)}
      strokeLinecap="round"
    />
  );
};

const Beam: React.FC<{ elevation: number; opacity: number; id: string; ghost?: boolean }> = ({
  elevation,
  opacity,
  id,
  ghost = false,
}) => {
  const far = WALL_X + runTop(elevation);
  const near = WALL_X + runSill(elevation);
  const color = ghost ? palette.sunDeep : palette.sun;

  return (
    <g opacity={opacity}>
      <defs>
        <linearGradient
          id={`${id}-fill`}
          gradientUnits="userSpaceOnUse"
          x1={WALL_X}
          y1={WIN_TOP}
          x2={(far + near) / 2}
          y2={GROUND_Y}
        >
          <stop offset="0%" stopColor={color} stopOpacity={ghost ? 0.16 : 0.34} />
          <stop offset="55%" stopColor={color} stopOpacity={ghost ? 0.07 : 0.14} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} gradientUnits="userSpaceOnUse" cx={WALL_X} cy={WIN_TOP} r={220}>
          <stop offset="0%" stopColor={palette.sun} stopOpacity={0.5} />
          <stop offset="100%" stopColor={palette.sun} stopOpacity={0} />
        </radialGradient>
      </defs>

      <polygon
        points={`${WALL_X},${WIN_TOP} ${far},${GROUND_Y} ${near},${GROUND_Y} ${WALL_X},${WIN_SILL}`}
        fill={`url(#${id}-fill)`}
      />

      {/* 光束核心 */}
      <line
        x1={WALL_X}
        y1={WIN_TOP}
        x2={far}
        y2={GROUND_Y}
        stroke={color}
        strokeWidth={ghost ? 1.2 : 2.4}
        opacity={ghost ? 0.5 : 0.85}
      />
      <line
        x1={WALL_X}
        y1={WIN_SILL}
        x2={near}
        y2={GROUND_Y}
        stroke={color}
        strokeWidth={ghost ? 1 : 1.6}
        opacity={ghost ? 0.35 : 0.6}
      />

      {/* 窗边热斑 */}
      <circle cx={WALL_X} cy={WIN_TOP} r={220} fill={`url(#${id}-glow)`} />

      {/* 地面光斑 */}
      <ellipse
        cx={(far + near) / 2}
        cy={GROUND_Y}
        rx={Math.max((far - near) / 2, 6)}
        ry={ghost ? 6 : 10}
        fill={color}
        opacity={ghost ? 0.3 : 0.7}
      />
      <rect
        x={near}
        y={GROUND_Y - 210}
        width={Math.max(far - near, 1)}
        height={210}
        fill={`url(#${id}-vertical)`}
        opacity={ghost ? 0.3 : 0.8}
      />
      <defs>
        <linearGradient id={`${id}-vertical`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0} />
          <stop offset="100%" stopColor={color} stopOpacity={ghost ? 0.2 : 0.45} />
        </linearGradient>
      </defs>
    </g>
  );
};

const Dust: React.FC<{ frame: number; elevation: number; opacity: number }> = ({
  frame,
  elevation,
  opacity,
}) => {
  const far = WALL_X + runTop(elevation);
  const near = WALL_X + runSill(elevation);

  return (
    <g opacity={opacity * 0.75}>
      {Array.from({ length: 46 }).map((_, i) => {
        const t = rand(i, 1);
        const u = rand(i, 2);
        const drift = (frame * (0.25 + rand(i, 3) * 0.5)) % 420;
        const x = lerp(near, far, u) + drift * 0.55 + Math.sin((frame + i * 40) / 62) * 10;
        const y = GROUND_Y - 40 - drift * 1.15 + Math.sin((frame + i * 21) / 51) * 8;
        const r = 0.9 + rand(i, 4) * 2.1;
        const a = 0.14 + rand(i, 5) * 0.5;
        return <circle key={i} cx={x} cy={y} r={r} fill={palette.cream} opacity={a * (1 - t * 0.3)} />;
      })}
    </g>
  );
};

export const HouseWorld: React.FC<{
  frame: number;
  elevation: number;
  /** 结构绘制的整体进度 */
  build: number;
  protractor: number;
  beam: number;
  depth: number;
  grid: number;
  ghost?: number | null;
  ghostOpacity?: number;
  dust?: number;
}> = ({
  frame,
  elevation,
  build,
  protractor,
  beam,
  depth,
  grid,
  ghost = null,
  ghostOpacity = 0,
  dust = 0,
}) => {
  const sun = sunPos(elevation);
  const far = WALL_X + runTop(elevation);
  const depthM = (far - WALL_X) / PX_PER_M;

  // 分步生长：地面 → 墙体 → 刻度，避免零散线段先冒出来
  const groundP = Math.min(build / 0.32, 1);
  const wallP = Math.max(0, (build - 0.24) / 0.76);
  const labelsP = Math.max(0, (build - 0.78) / 0.22);

  return (
    <svg
      width={WORLD_W}
      height={WORLD_H}
      viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
      style={{ position: 'absolute', left: 0, top: 0, fontFamily: font.body }}
    >
      <defs>
        <radialGradient id="sun-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={palette.sun} stopOpacity={0.55} />
          <stop offset="45%" stopColor={palette.sun} stopOpacity={0.16} />
          <stop offset="100%" stopColor={palette.sun} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* 地面 */}
      <GrowLine x1={-40} y1={GROUND_Y} x2={WORLD_W + 40} y2={GROUND_Y} p={groundP} color={palette.cream} opacity={0.28} width={1.4} />

      {/* 1 米刻度网格 */}
      <g opacity={grid * 0.5 * labelsP}>
        {Array.from({ length: 12 }).map((_, i) => {
          const x = WALL_X + i * PX_PER_M;
          if (x > ROOM_RIGHT) return null;
          return (
            <g key={i}>
              <line x1={x} y1={GROUND_Y} x2={x} y2={GROUND_Y + 16} stroke={palette.cream} strokeWidth={1} opacity={0.35} />
              <text x={x} y={GROUND_Y + 44} fontSize={17} fill={palette.muted} textAnchor="middle" fontFamily={font.num}>
                {i}
              </text>
            </g>
          );
        })}
      </g>

      {/* 房屋结构 */}
      <g>
        <GrowLine x1={WALL_X} y1={GROUND_Y} x2={ROOM_RIGHT} y2={GROUND_Y} p={wallP} color={palette.cream} opacity={0.7} width={2.4} />
        <GrowLine x1={WALL_X} y1={CEIL_Y} x2={ROOM_RIGHT} y2={CEIL_Y} p={wallP} color={palette.cream} opacity={0.38} width={1.6} />
        <GrowLine x1={ROOM_RIGHT} y1={CEIL_Y} x2={ROOM_RIGHT} y2={GROUND_Y} p={wallP} color={palette.cream} opacity={0.22} width={1.4} />
        <GrowLine x1={WALL_X} y1={CEIL_Y} x2={WALL_X} y2={WIN_TOP} p={wallP} color={palette.cream} opacity={0.75} width={3} />
        <GrowLine x1={WALL_X} y1={WIN_SILL} x2={WALL_X} y2={GROUND_Y} p={wallP} color={palette.cream} opacity={0.75} width={3} />
        {/* 墙体剖面线 */}
        <GrowLine x1={WALL_X - 9} y1={CEIL_Y} x2={WALL_X - 9} y2={WIN_TOP} p={wallP} color={palette.muted} opacity={0.5} width={1} />
        <GrowLine x1={WALL_X - 9} y1={WIN_SILL} x2={WALL_X - 9} y2={GROUND_Y} p={wallP} color={palette.muted} opacity={0.5} width={1} />
      </g>

      {/* 量角器弧 */}
      <g opacity={protractor}>
        <polyline
          points={arcPoints(WALL_X, WIN_TOP, ARC_R, 0, 90)}
          fill="none"
          stroke={palette.cream}
          strokeWidth={1.1}
          opacity={0.26}
          strokeDasharray="3 6"
        />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = i * 10;
          const major = a % 30 === 0;
          const r1 = ARC_R - (major ? 22 : 10);
          return (
            <line
              key={a}
              x1={WALL_X + r1 * Math.cos(deg(a))}
              y1={WIN_TOP - r1 * Math.sin(deg(a))}
              x2={WALL_X + ARC_R * Math.cos(deg(a))}
              y2={WIN_TOP - ARC_R * Math.sin(deg(a))}
              stroke={palette.cream}
              strokeWidth={major ? 1.6 : 1}
              opacity={major ? 0.5 : 0.24}
            />
          );
        })}
        {[0, 30, 60, 90].map((a) => {
          const r = ARC_R - 62;
          return (
            <text
              key={a}
              x={WALL_X + r * Math.cos(deg(a))}
              y={WIN_TOP - r * Math.sin(deg(a)) + 6}
              fontSize={19}
              fill={palette.muted}
              textAnchor="middle"
              fontFamily={font.num}
            >
              {a}°
            </text>
          );
        })}
        {/* 至日位置刻度 */}
        {[26.6, 73.5].map((a) => (
          <line
            key={a}
            x1={WALL_X + (ARC_R - 34) * Math.cos(deg(a))}
            y1={WIN_TOP - (ARC_R - 34) * Math.sin(deg(a))}
            x2={WALL_X + (ARC_R + 12) * Math.cos(deg(a))}
            y2={WIN_TOP - (ARC_R + 12) * Math.sin(deg(a))}
            stroke={palette.sun}
            strokeWidth={2}
            opacity={0.55}
          />
        ))}
      </g>

      {/* 太阳 */}
      <g>
        <circle cx={sun.x} cy={sun.y} r={215} fill="url(#sun-halo)" />
        <circle cx={sun.x} cy={sun.y} r={46} fill={palette.sun} opacity={0.16} />
        <circle cx={sun.x} cy={sun.y} r={20} fill={palette.cream} opacity={0.95} />
        <circle cx={sun.x} cy={sun.y} r={30} fill={palette.sun} opacity={0.45} />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * 360 + frame * 0.25;
          const long = i % 2 === 0;
          const r1 = long ? 44 : 38;
          const r2 = long ? 62 : 52;
          return (
            <line
              key={i}
              x1={sun.x + r1 * Math.cos(deg(a))}
              y1={sun.y - r1 * Math.sin(deg(a))}
              x2={sun.x + r2 * Math.cos(deg(a))}
              y2={sun.y - r2 * Math.sin(deg(a))}
              stroke={palette.sun}
              strokeWidth={1.6}
              opacity={0.5}
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* 阳光入射线 */}
      <line
        x1={sun.x}
        y1={sun.y}
        x2={WALL_X}
        y2={WIN_TOP}
        stroke={palette.sun}
        strokeWidth={1.6}
        strokeDasharray="9 9"
        opacity={beam * 0.65}
      />

      {/* 光束 */}
      {ghost !== null && <Beam elevation={ghost} opacity={ghostOpacity} id="ghost" ghost />}
      <Beam elevation={elevation} opacity={beam} id="live" />

      {/* 浮尘 */}
      <Dust frame={frame} elevation={elevation} opacity={dust} />

      {/* 窗上沿夹角 */}
      <g opacity={beam}>
        <polyline
          points={arcPoints(WALL_X + 26, WIN_TOP, 96, 0, -elevation)}
          fill="none"
          stroke={palette.cream}
          strokeWidth={1.4}
          opacity={0.6}
        />
        <line
          x1={WALL_X + 26}
          y1={WIN_TOP}
          x2={WALL_X + 150}
          y2={WIN_TOP}
          stroke={palette.cream}
          strokeWidth={1}
          strokeDasharray="6 7"
          opacity={0.3}
        />
        {(() => {
          const a = -elevation / 2;
          const r = 132;
          return (
            <text
              x={WALL_X + 26 + r * Math.cos(deg(a))}
              y={WIN_TOP - r * Math.sin(deg(a)) + 7}
              fontSize={24}
              fill={palette.sun}
              textAnchor="middle"
              fontFamily={font.num}
              fontWeight={600}
            >
              {elevation.toFixed(1)}°
            </text>
          );
        })()}
      </g>

      {/* 进深标注 */}
      <g opacity={depth}>
        <line x1={WALL_X} y1={GROUND_Y + 78} x2={far} y2={GROUND_Y + 78} stroke={palette.sun} strokeWidth={1.6} opacity={0.8} />
        <line x1={WALL_X} y1={GROUND_Y + 66} x2={WALL_X} y2={GROUND_Y + 90} stroke={palette.sun} strokeWidth={1.6} />
        <line x1={far} y1={GROUND_Y + 66} x2={far} y2={GROUND_Y + 90} stroke={palette.sun} strokeWidth={1.6} />
        <text
          x={(WALL_X + far) / 2}
          y={GROUND_Y + 128}
          fontSize={30}
          fill={palette.sun}
          textAnchor="middle"
          fontFamily={font.num}
          fontWeight={600}
          letterSpacing={1}
        >
          {depthM.toFixed(1)} m
        </text>
        <text
          x={(WALL_X + far) / 2}
          y={GROUND_Y + 160}
          fontSize={18}
          fill={palette.muted}
          textAnchor="middle"
          letterSpacing={4}
        >
          进深
        </text>
      </g>

      {/* 方位：南在窗侧 */}
      <g opacity={labelsP * 0.8}>
        <text x={470} y={GROUND_Y - 24} fontSize={24} fill={palette.sun} opacity={0.8} letterSpacing={4} textAnchor="end">
          南
        </text>
        <text x={1600} y={GROUND_Y - 24} fontSize={24} fill={palette.muted} opacity={0.45} letterSpacing={4}>
          北
        </text>
        <line x1={480} y1={GROUND_Y - 32} x2={1580} y2={GROUND_Y - 32} stroke={palette.cream} strokeWidth={1} opacity={0.12} strokeDasharray="2 12" />
      </g>

      {/* 房间尺度 */}
      <text x={ROOM_RIGHT - 30} y={GROUND_Y - 34} fontSize={17} fill={palette.muted} textAnchor="end" letterSpacing={3} opacity={labelsP * 0.7}>
        室内
      </text>
    </svg>
  );
};
