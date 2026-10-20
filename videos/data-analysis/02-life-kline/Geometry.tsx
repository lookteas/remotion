import React, {useId} from 'react';
import {lifeKlineTheme as C} from '../../../src/config/theme';

export type V3 = [number, number, number];
export type View = {x: number; y: number; scale: number; yaw?: number; pitch?: number};
export const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const rotate = (v: V3, rx = 0, ry = 0, rz = 0): V3 => {
  const [x, y, z] = v;
  const a = y * Math.cos(rx) - z * Math.sin(rx);
  const b = y * Math.sin(rx) + z * Math.cos(rx);
  const c = x * Math.cos(ry) + b * Math.sin(ry);
  const d = -x * Math.sin(ry) + b * Math.cos(ry);
  return [c * Math.cos(rz) - a * Math.sin(rz), c * Math.sin(rz) + a * Math.cos(rz), d];
};
export const project = (p: V3, view: View) => {
  const [x, y, z] = rotate(p, -(view.pitch ?? 0.48), view.yaw ?? -0.35);
  const perspective = 1800 / Math.max(420, 1800 + z);
  return {x: view.x + x * perspective * view.scale, y: view.y - y * perspective * view.scale, z, scale: perspective * view.scale};
};
const faces = [[0, 1, 2, 3], [4, 7, 6, 5], [0, 4, 5, 1], [3, 2, 6, 7], [0, 3, 7, 4], [1, 5, 6, 2]];

/** Episode-specific projected solids, with face depth sorting and real vertex rotation. */
export const Solid: React.FC<{center: V3; size: V3; view: View; rotation?: V3; accent?: string; opacity?: number; glass?: boolean}> = ({center, size, view, rotation = [0, 0, 0], accent = C.blue, opacity = 1, glass = false}) => {
  const [w, h, d] = size.map(n => n / 2);
  const vertices: V3[] = [[-w, -h, -d], [w, -h, -d], [w, h, -d], [-w, h, -d], [-w, -h, d], [w, -h, d], [w, h, d], [-w, h, d]];
  const points = vertices.map(v => project(add(rotate(v, ...rotation), center), view));
  const sorted = faces.map((indices, i) => ({indices, i, depth: indices.reduce((sum, j) => sum + points[j].z, 0) / 4})).sort((a, b) => b.depth - a.depth);
  const colors = [C.deep, C.steel, C.darkSteel, accent, C.surface, C.steel];
  return <g opacity={opacity}>{sorted.map(({indices, i}) => <polygon key={i} points={indices.map(j => `${points[j].x},${points[j].y}`).join(' ')} fill={colors[i]} fillOpacity={glass ? (i === 3 ? 0.28 : 0.12) : 1} stroke={accent} strokeOpacity={glass ? 0.65 : 0.6} strokeWidth={glass ? 1.6 : 1.3} strokeLinejoin="round"/>)}</g>;
};

export const Beam: React.FC<{a: V3; b: V3; view: View; width?: number; color?: string; opacity?: number}> = ({a, b, view, width = 5, color = C.green, opacity = 1}) => {
  const p = project(a, view); const q = project(b, view);
  return <g opacity={opacity}><line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={color} strokeWidth={width * p.scale + 5} opacity={0.07}/><line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={color} strokeWidth={width * p.scale} strokeLinecap="round"/><line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={C.white} strokeWidth={Math.max(0.8, width * p.scale * 0.22)} opacity={0.7}/></g>;
};

export const LifeNode: React.FC<{center: V3; view: View; radius?: number; stable?: number; frame: number; opacity?: number; orbit?: boolean}> = ({center, view, radius = 73, stable = 1, frame, opacity = 1, orbit = true}) => {
  const id = useId().replace(/:/g, '');
  const p = project(center, view); const r = radius * p.scale;
  const breathe = 1 + Math.sin(frame / 36) * (0.018 + (1 - stable) * 0.045);
  return <g opacity={opacity}>
    <defs>
      <radialGradient id={`${id}glow`}><stop stopColor={C.blueLight} stopOpacity={0.5}/><stop offset="0.35" stopColor={C.blue} stopOpacity={0.22}/><stop offset="1" stopColor={C.blue} stopOpacity={0}/></radialGradient>
      <radialGradient id={`${id}sphere`} cx="35%" cy="28%" r="76%"><stop stopColor={C.white}/><stop offset="0.24" stopColor={C.white}/><stop offset="0.5" stopColor={C.blueLight}/><stop offset="0.76" stopColor={C.blue}/><stop offset="1" stopColor={C.darkSteel}/></radialGradient>
    </defs>
    <circle cx={p.x} cy={p.y} r={r * 3.6 * breathe} fill={`url(#${id}glow)`}/>
    <ellipse cx={p.x} cy={p.y + r * 1.8} rx={r * 1.4} ry={r * 0.2} fill={C.blue} opacity={0.1 + stable * 0.08}/>
    <circle cx={p.x} cy={p.y} r={r * breathe} fill={`url(#${id}sphere)`} stroke={C.blueLight} strokeWidth={1.5}/>
    <ellipse cx={p.x - r * 0.2} cy={p.y - r * 0.3} rx={r * 0.36} ry={r * 0.15} fill={C.white} opacity={0.5} transform={`rotate(-32 ${p.x} ${p.y})`}/>
    {orbit&&<ellipse cx={p.x} cy={p.y} rx={r * 1.22} ry={r * 0.32} fill="none" stroke={C.blueLight} strokeWidth={1} opacity={0.48} transform={`rotate(-26 ${p.x} ${p.y})`}/>}
  </g>;
};

export const Ring: React.FC<{center: V3; radius: number; view: View; color?: string; opacity?: number; width?: number; phase?: number; arc?: number}> = ({center, radius, view, color = C.blue, opacity = 0.5, width = 2, phase = 0, arc = Math.PI * 2}) => {
  const points = Array.from({length: 81}, (_, i) => project(add(center, [Math.cos(phase + i / 80 * arc) * radius, 0, Math.sin(phase + i / 80 * arc) * radius]), view));
  return <polyline points={points.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke={color} strokeWidth={width} opacity={opacity}/>;
};

/** Thick glass shells and rotating edge beams; no flat card or human figure. */
export const OpportunityMatrix: React.FC<{center: V3; view: View; size: number; angle: number; opacity?: number}> = ({center, view, size, angle, opacity = 1}) => {
  const p = project(center, view);
  const corners: V3[] = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
  const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
  return <g opacity={opacity}>
    <circle cx={p.x} cy={p.y} r={size * p.scale * 1.3} fill="url(#life-matrix-glow)"/>
    {[1, 0.64].map((s, layer) => {
      const rot: V3 = [angle * 0.63 + layer * 0.5, angle * (layer ? -1 : 1), 0.3];
      const nodes = corners.map(v => add(rotate(v.map(n => n * size * s / 2) as V3, ...rot), center));
      return <g key={layer}><Solid center={center} size={[size*s,size*s,size*s]} view={view} rotation={rot} accent={layer ? C.blueLight : C.green} glass/>{edges.map(([a,b], i) => <Beam key={i} a={nodes[a]} b={nodes[b]} view={view} width={layer ? 3.2 : 7} color={layer ? C.blueLight : C.green}/>)}{nodes.map((node, i) => {const n=project(node,view); return <circle key={i} cx={n.x} cy={n.y} r={4*n.scale} fill={C.white}/>;})}</g>;
    })}
    {[-1, 1].flatMap(side => [0, 1, 2].map(axis => {
      const rot: V3 = [angle * .63, angle, .3];
      const offset: V3 = [0, 0, 0]; offset[axis] = side * size * .39;
      const dimensions: V3 = [size * .48, size * .48, size * .48]; dimensions[axis] = size * .08;
      return <Solid key={`${side}-${axis}`} center={add(center, rotate(offset, ...rot))} size={dimensions} rotation={rot} view={view} accent={axis === 1 ? C.green : C.blueLight}/>;
    }))}
    <Solid center={center} size={[size*.34,size*.34,size*.34]} rotation={[angle*.3,angle,0.7]} view={view} accent={C.white}/>
  </g>;
};
