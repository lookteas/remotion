import React from 'react';
import { Composition } from 'remotion';
import { videos } from '../videos/registry';

export const RemotionRoot: React.FC = () => (
  <>
    {videos.map(({ meta, component }) => (
      <Composition
        key={meta.id}
        id={meta.id}
        component={component}
        durationInFrames={meta.durationInFrames}
        fps={meta.format.fps}
        width={meta.format.width}
        height={meta.format.height}
      />
    ))}
  </>
);
