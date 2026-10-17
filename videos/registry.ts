import type { ComponentType } from 'react';
import metaZuoBeiChaoNan from './traditional-culture/01-zuo-bei-chao-nan/video.json';
import ZuoBeiChaoNan from './traditional-culture/01-zuo-bei-chao-nan';

/**
 * 一期视频的元数据。
 */
export type VideoMeta = {
  /** 全局唯一的 Composition ID：<分类>-<slug> */
  id: string;
  title: string;
  category: string;
  slug: string;
  status: 'idea' | 'writing' | 'animating' | 'done' | 'published';
  summary: string;
  tags: string[];
  /** ISO 日期 */
  createdAt: string;
  durationInFrames: number;
  format: { width: number; height: number; fps: number };
  audio?: { narration?: string; bgm?: string };
};

export type VideoEntry = {
  meta: VideoMeta;
  component: ComponentType;
};

/**
 * 所有成片在此登记，src/Root.tsx 遍历后逐个注册 <Composition />。
 * 未登记的视频不会被 Remotion 发现。
 *
 * 新增一期时：
 *   import metaXxx from './<分类>/<序号>-<slug>/video.json';
 *   import Xxx from './<分类>/<序号>-<slug>';
 *   export const videos: VideoEntry[] = [..., { meta: metaXxx, component: Xxx }];
 *
 * 注意：_template/ 只是骨架，不要登记。
 */
export const videos: VideoEntry[] = [
  { meta: metaZuoBeiChaoNan as VideoMeta, component: ZuoBeiChaoNan },
];
