import React from 'react';
import {useCurrentFrame} from 'remotion';
import {progress} from '../../lib/anim';

/** Existing episode defaults preserved; all timings are local frames. */
export const Lift: React.FC<{
  at?: number; duration?: number; distance?: number;
  children: React.ReactNode; style?: React.CSSProperties;
}> = ({at = 10, duration = 28, distance = 46, children, style}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, at, duration);
  return <div style={{overflow: 'hidden', ...style}}>
    <div style={{opacity: p, translate: `0px ${(1 - p) * distance}px`}}>{children}</div>
  </div>;
};
