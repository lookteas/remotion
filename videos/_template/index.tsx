import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import meta from './video.json';

/**
 * 视频骨架。复制本目录到 videos/<分类>/<序号>-<slug>/ 后：
 * 1. 改 video.json
 * 2. 把组件名改成自己的
 * 3. 在 videos/registry.ts 登记
 * 4. 在分类 INDEX.md 补一行
 */
export const TemplateVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f1115',
        color: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 120,
      }}
    >
      <h1 style={{ opacity, fontSize: 96, fontWeight: 700, margin: 0 }}>
        {meta.title}
      </h1>
      <p style={{ opacity, fontSize: 40, color: '#9aa4b2', marginTop: 32 }}>
        {meta.summary}
      </p>
    </AbsoluteFill>
  );
};
