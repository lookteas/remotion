import {spring} from 'remotion';

/** Extracted from F01's card entrance; old spring parameters are the defaults. */
export const settle = (frame: number, at = 0, fps = 30, damping = 13, stiffness = 150) =>
  spring({frame: Math.max(0, frame - at), fps, config: {damping, stiffness}});
