import {BaziSceneCompositions} from '../videos/data-analysis/01-bazi-prediction/SceneCompositions';
import {LifeKlineCovers} from '../videos/data-analysis/02-life-kline/Cover';
import React from 'react';
import { Composition } from 'remotion';
import { videos } from '../videos/registry';
import { IChingSceneCompositions } from '../videos/traditional-culture/02-iching-life/SceneCompositions';
import { ChiMaSceneCompositions } from '../videos/traditional-culture/03-chi-ma-chong-yang/SceneCompositions';

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
    <BaziSceneCompositions />
    <LifeKlineCovers />
    <IChingSceneCompositions />
    <ChiMaSceneCompositions />
  </>
);
