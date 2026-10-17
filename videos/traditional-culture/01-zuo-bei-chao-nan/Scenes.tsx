import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { HouseWorld, WORLD_H, WORLD_W } from '../../../src/world/HouseWorld';
import { Camera, type CameraKey } from '../../../src/lib/camera';
import { clamp, progress, rand, windowOpacity } from '../../../src/lib/anim';
import { font, palette } from '../../../src/config/theme';

const SUMMER = 73.5;
const WINTER = 26.6;

/**
 * 整支片子只有一个镜头，从不硬切。
 * 约束：窗（世界坐标 x=560）始终落在屏幕 x≈980–1080，
 * 这样太阳弧线不会越过屏幕 x=700 的文字列。
 */
const CAMERA: CameraKey[] = [
  { at: 0, x: 430, y: 700, scale: 0.74 },
  { at: 170, x: 448, y: 725, scale: 0.8 },
  { at: 420, x: 462, y: 780, scale: 0.94 },
  { at: 700, x: 482, y: 824, scale: 1.15 },
  { at: 940, x: 490, y: 800, scale: 1.08 },
  { at: 1180, x: 455, y: 780, scale: 0.96 },
  { at: 1420, x: 448, y: 745, scale: 0.84 },
  { at: 1700, x: 440, y: 730, scale: 0.78 },
  { at: 2020, x: 435, y: 720, scale: 0.76 },
  { at: 2180, x: 430, y: 705, scale: 0.73 },
];

/** 遮罩上推式文字入场，替代淡入 */
const Mask: React.FC<{
  frame: number;
  start: number;
  end?: number;
  duration?: number;
  out?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ frame, start, end, duration = 26, out = 16, children, style }) => {
  const p = progress(frame, start, duration, Easing.out(Easing.cubic));
  const o = end === undefined ? 1 : windowOpacity(frame, start + duration, end, out);
  return (
    <div
      style={{
        overflow: 'hidden',
        opacity: end === undefined ? 1 : Math.max(o, 0),
        ...style,
      }}
    >
      <div
        style={{
          transform: `translateY(${(1 - p) * 112}%)`,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** 上方压住画面的文字层 */
const Overlay: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ fontFamily: font.body, pointerEvents: 'none' }}>{children}</AbsoluteFill>
);

/* =============================== 主组件 =============================== */

export const ZuoBeiChaoNan: React.FC = () => {
  const frame = useCurrentFrame();

  /* ---- 世界的连续参数 ---- */
  const build = progress(frame, 12, 120, Easing.out(Easing.cubic));
  const grid = progress(frame, 90, 70);
  const protractor = progress(frame, 260, 100);
  const beam = progress(frame, 330, 90);
  const depth = progress(frame, 1160, 90);
  const dust = progress(frame, 700, 80);

  const elevation = interpolate(frame, [780, 1180], [SUMMER, WINTER], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  const ghost = frame > 1240 ? WINTER : null;
  const ghostOpacity = progress(frame, 1240, 90) * (frame > 1240 ? 1 : 0);

  /* ---- 文字层 ---- */
  const introOut = 210;

  return (
    <AbsoluteFill style={{ backgroundColor: palette.bg }}>
      {/* 世界 */}
      <Camera frame={frame} keys={CAMERA}>
        <HouseWorld
          frame={frame}
          elevation={elevation}
          build={build}
          grid={grid}
          protractor={protractor}
          beam={beam}
          depth={depth}
          dust={dust}
          ghost={ghost}
          ghostOpacity={ghostOpacity}
        />
      </Camera>

      {/* 文字衬底：左侧压暗，右侧留出图纸 */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(96deg, rgba(12,11,9,0.96) 0%, rgba(12,11,9,0.93) 30%, rgba(12,11,9,0.62) 44%, rgba(12,11,9,0.12) 54%, transparent 64%)',
          opacity: Math.max(
            windowOpacity(frame, 236, 470),
            windowOpacity(frame, 470, 790),
            windowOpacity(frame, 790, 1200) * 0.96,
            windowOpacity(frame, 1200, 1540),
          ),
          pointerEvents: 'none',
        }}
      />
      {/* 结论与清单：整屏轻压暗 */}
      <AbsoluteFill
        style={{
          background: `rgba(12,11,9,0.66)`,
          opacity: Math.max(
            windowOpacity(frame, 1540, 1810) * 0.85,
            windowOpacity(frame, 1810, 2070) * 0.92,
          ),
          pointerEvents: 'none',
        }}
      />

      {/* 环境光 */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 62% 34%, rgba(242,162,74,0.10), transparent 58%)`,
          opacity: build,
        }}
      />
      {/* 暗角 */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 48%, transparent 38%, rgba(0,0,0,0.62) 100%)',
        }}
      />

      <Overlay>
        {/* ============ 0–210 片头 ============ */}
        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 300,
            opacity: windowOpacity(frame, 24, introOut, 26),
          }}
        >
          <Mask frame={frame} start={30} duration={30}>
            <div
              style={{
                fontSize: 21,
                letterSpacing: 12,
                color: palette.sun,
                marginBottom: 30,
              }}
            >
              传统文化 · 居住智慧
            </div>
          </Mask>

          <Mask frame={frame} start={42} duration={34}>
            <div
              style={{
                fontFamily: font.display,
                fontSize: 132,
                lineHeight: 1.12,
                letterSpacing: 10,
                color: palette.cream,
              }}
            >
              坐北朝南
            </div>
          </Mask>

          <Mask frame={frame} start={58} duration={34}>
            <div
              style={{
                marginTop: 26,
                fontSize: 34,
                letterSpacing: 3,
                color: palette.creamDim,
                fontWeight: 300,
              }}
            >
              从太阳高度角，看一间屋子能进多少光
            </div>
          </Mask>

          <div
            style={{
              marginTop: 54,
              height: 1,
              width: 620,
              background: palette.line,
              transform: `scaleX(${progress(frame, 86, 40, Easing.out(Easing.cubic))})`,
              transformOrigin: 'left',
            }}
          />

          <Mask frame={frame} start={100} duration={28}>
            <div style={{ marginTop: 26, fontSize: 20, letterSpacing: 5, color: palette.muted }}>
              以北京（北纬约 40°）正午为例
            </div>
          </Mask>
        </div>

        {/* ============ 210–460 悬念 ============ */}
        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 236,
            width: 760,
            opacity: windowOpacity(frame, 236, 470),
          }}
        >
          <Mask frame={frame} start={240} end={470}>
            <div
              style={{
                fontFamily: font.display,
                fontSize: 76,
                lineHeight: 1.42,
                color: palette.cream,
                letterSpacing: 2,
              }}
            >
              长辈总说
              <br />
              一定要坐北朝南
            </div>
          </Mask>

          <Mask frame={frame} start={290} end={470}>
            <div
              style={{
                marginTop: 30,
                fontSize: 28,
                lineHeight: 1.85,
                color: palette.creamDim,
                fontWeight: 300,
              }}
            >
              可朝向东西，同样晒得到太阳。
              <br />
              为什么偏偏是南？
            </div>
          </Mask>

          {/* 三个朝向：排字，不用卡片 */}
          <div style={{ marginTop: 56, display: 'flex', alignItems: 'baseline', gap: 54 }}>
            {[
              { t: '朝东', on: false, d: 320 },
              { t: '朝南', on: true, d: 344 },
              { t: '朝西', on: false, d: 368 },
            ].map((o) => (
              <Mask key={o.t} frame={frame} start={o.d} end={470}>
                <div
                  style={{
                    fontSize: o.on ? 56 : 40,
                    fontWeight: o.on ? 600 : 300,
                    color: o.on ? palette.sun : palette.muted,
                    letterSpacing: o.on ? 6 : 3,
                    position: 'relative',
                  }}
                >
                  {o.t}
                  {o.on && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: -12,
                        height: 2,
                        background: palette.sun,
                        transform: `scaleX(${progress(frame, 400, 34, Easing.out(Easing.cubic))})`,
                        transformOrigin: 'left',
                      }}
                    />
                  )}
                </div>
              </Mask>
            ))}
          </div>
        </div>

        {/* ============ 470–780 正午方位 ============ */}
        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 170,
            width: 700,
            opacity: windowOpacity(frame, 470, 790),
          }}
        >
          <Mask frame={frame} start={474} end={790}>
            <div style={{ fontSize: 19, letterSpacing: 9, color: palette.sun, marginBottom: 24 }}>
              01 / 方位
            </div>
          </Mask>

          <Mask frame={frame} start={486} end={790}>
            <div
              style={{
                fontFamily: font.display,
                fontSize: 68,
                lineHeight: 1.45,
                color: palette.cream,
                letterSpacing: 2,
              }}
            >
              一年四季的正午
              <br />
              太阳<span style={{ color: palette.sun }}>都挂在正南</span>
            </div>
          </Mask>

          <Mask frame={frame} start={540} end={790}>
            <div
              style={{
                marginTop: 28,
                fontSize: 27,
                lineHeight: 1.9,
                color: palette.creamDim,
                fontWeight: 300,
              }}
            >
              窗开在南墙，取光口就正对着
              <br />
              太阳每天最高的那个位置。
            </div>
          </Mask>
        </div>

        {/* ============ 780–1180 高度角与季节 ============ */}
        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 214,
            width: 560,
            opacity: windowOpacity(frame, 790, 1200),
          }}
        >
          <Mask frame={frame} start={794} end={1200}>
            <div style={{ fontSize: 19, letterSpacing: 9, color: palette.sun, marginBottom: 24 }}>
              02 / 高度角
            </div>
          </Mask>

          <Mask frame={frame} start={806} end={1200}>
            <div
              style={{
                fontFamily: font.display,
                fontSize: 58,
                lineHeight: 1.5,
                color: palette.cream,
                letterSpacing: 2,
              }}
            >
              太阳与地面的夹角
            </div>
          </Mask>

          <Mask frame={frame} start={830} end={1200}>
            <div
              style={{
                marginTop: 22,
                fontSize: 26,
                lineHeight: 1.9,
                color: palette.creamDim,
                fontWeight: 300,
              }}
            >
              角度越小，光越平<br />
              照进屋里的深度就越大
            </div>
          </Mask>

          {/* 大数字 */}
          <div style={{ marginTop: 44, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <div
              style={{
                fontFamily: font.num,
                fontSize: 150,
                lineHeight: 0.9,
                fontWeight: 200,
                color: frame > 1000 ? palette.cold : palette.sun,
                letterSpacing: -6,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {elevation.toFixed(1)}
            </div>
            <div
              style={{
                fontSize: 46,
                fontWeight: 200,
                paddingBottom: 16,
                color: frame > 1000 ? palette.cold : palette.sun,
              }}
            >
              °
            </div>
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 22,
              letterSpacing: 4,
              color: palette.muted,
            }}
          >
            {frame < 940 ? '夏至 · 正午' : frame < 1090 ? '正在滑向冬至' : '冬至 · 正午'}
          </div>
        </div>

        {/* ============ 1180–1520 进深 ============ */}
        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 128,
            width: 640,
            opacity: windowOpacity(frame, 1200, 1540),
          }}
        >
          <Mask frame={frame} start={1204} end={1540}>
            <div style={{ fontSize: 19, letterSpacing: 9, color: palette.sun, marginBottom: 22 }}>
              03 / 进深
            </div>
          </Mask>

          <Mask frame={frame} start={1216} end={1540}>
            <div
              style={{
                fontFamily: font.display,
                fontSize: 62,
                lineHeight: 1.42,
                color: palette.cream,
                letterSpacing: 2,
              }}
            >
              同一扇窗
              <br />
              冬天的光能进到
              <br />
              夏天的<span style={{ color: palette.sun }}>七倍深</span>
            </div>
          </Mask>

          <div style={{ marginTop: 44, display: 'flex', gap: 66 }}>
            {[
              { k: '夏至', v: '0.7', c: palette.sun, d: 1300 },
              { k: '冬至', v: '4.8', c: palette.cold, d: 1336 },
            ].map((s) => (
              <Mask key={s.k} frame={frame} start={s.d} end={1540}>
                <div>
                  <div style={{ fontSize: 20, letterSpacing: 5, color: palette.muted, marginBottom: 8 }}>
                    {s.k}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <div
                      style={{
                        fontFamily: font.num,
                        fontSize: 78,
                        fontWeight: 200,
                        color: s.c,
                        letterSpacing: -2,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {s.v}
                    </div>
                    <div style={{ fontSize: 26, color: s.c, fontWeight: 300 }}>m</div>
                  </div>
                </div>
              </Mask>
            ))}
          </div>
        </div>

        {/* ============ 1520–1800 结论 ============ */}
        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 300,
            width: 900,
            opacity: windowOpacity(frame, 1540, 1810),
          }}
        >
          <Mask frame={frame} start={1544} end={1810}>
            <div style={{ fontSize: 19, letterSpacing: 9, color: palette.sun, marginBottom: 26 }}>
              04 / 结论
            </div>
          </Mask>

          <Mask frame={frame} start={1560} end={1810} duration={34}>
            <div
              style={{
                fontFamily: font.display,
                fontSize: 82,
                lineHeight: 1.44,
                color: palette.cream,
                letterSpacing: 3,
              }}
            >
              不是朝南更吉利
              <br />
              是朝南刚好顺应了
              <br />
              <span style={{ color: palette.sun }}>太阳的角度</span>
            </div>
          </Mask>

          <Mask frame={frame} start={1652} end={1810}>
            <div
              style={{
                marginTop: 32,
                fontSize: 25,
                lineHeight: 1.9,
                color: palette.creamDim,
                fontWeight: 300,
              }}
            >
              古人没说过「高度角」，却把这条几何规律，
              <br />
              用一个朝向固定了下来。
            </div>
          </Mask>
        </div>

        {/* ============ 1800–2060 实用清单 ============ */}
        <div
          style={{
            position: 'absolute',
            left: 150,
            right: 150,
            top: 210,
            opacity: windowOpacity(frame, 1810, 2070),
          }}
        >
          <Mask frame={frame} start={1814} end={2070}>
            <div style={{ fontSize: 19, letterSpacing: 9, color: palette.sun, marginBottom: 40 }}>
              05 / 看房时用得上的三件事
            </div>
          </Mask>

          {[
            {
              n: '01',
              t: '楼间距，比朝向更容易被忽略',
              b: '冬至正午太阳最低，前楼投影约是楼高的两倍。看低层房，最好冬至前后实地走一趟。',
              d: 1838,
            },
            {
              n: '02',
              t: '窗上沿越高，光进得越深',
              b: '进深由窗顶高度决定。同样朝向，窗顶更高，冬季采光更长。',
              d: 1892,
            },
            {
              n: '03',
              t: '朝南不等于没有西晒',
              b: '夏季太阳从西北落下，西侧窗户照样晒得厉害。别只看主卧朝向。',
              d: 1946,
            },
          ].map((it, i) => (
            <div key={it.n} style={{ marginTop: i === 0 ? 0 : 30 }}>
              <Mask frame={frame} start={it.d} end={2070} duration={30}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 34 }}>
                  <div
                    style={{
                      fontFamily: font.num,
                      fontSize: 26,
                      color: palette.sun,
                      fontWeight: 300,
                      letterSpacing: 2,
                    }}
                  >
                    {it.n}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 38, color: palette.cream, letterSpacing: 1 }}>{it.t}</div>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 24,
                        lineHeight: 1.8,
                        color: palette.creamDim,
                        fontWeight: 300,
                      }}
                    >
                      {it.b}
                    </div>
                  </div>
                </div>
              </Mask>
              <div
                style={{
                  marginTop: 26,
                  height: 1,
                  background: palette.line,
                  transform: `scaleX(${progress(frame, it.d + 18, 40, Easing.out(Easing.cubic))})`,
                  transformOrigin: 'left',
                }}
              />
            </div>
          ))}
        </div>

        {/* ============ 2060–2180 片尾 ============ */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 380,
            textAlign: 'center',
            opacity: windowOpacity(frame, 2070, 2180, 14),
          }}
        >
          <Mask frame={frame} start={2074} duration={30}>
            <div style={{ fontSize: 20, letterSpacing: 12, color: palette.sun, marginBottom: 30 }}>
              一句话带走
            </div>
          </Mask>

          <Mask frame={frame} start={2090} duration={36}>
            <div
              style={{
                fontFamily: font.display,
                fontSize: 72,
                lineHeight: 1.6,
                color: palette.cream,
                letterSpacing: 4,
              }}
            >
              坐北朝南，是用朝向
              <br />
              买下了一整年的<span style={{ color: palette.sun }}>光的角度</span>
            </div>
          </Mask>

          <Mask frame={frame} start={2136} duration={28}>
            <div
              style={{
                marginTop: 46,
                fontSize: 19,
                letterSpacing: 8,
                color: palette.muted,
              }}
            >
              传统文化 · 居住智慧
            </div>
          </Mask>
        </div>
      </Overlay>

      {/* 极细颗粒，压住数字渐变 */}
      <AbsoluteFill
        style={{
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
    </AbsoluteFill>
  );
};

/** 供 index.tsx 使用 */
export const TOTAL_DURATION = 2180;
export const WORLD = { width: WORLD_W, height: WORLD_H };
export const _unusedRand = rand;
