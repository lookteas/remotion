import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ichingTheme as C} from '../../../src/config/theme';
import {lerp, progress} from '../../../src/lib/anim';
import {SceneShell, FONT} from './Chrome';

const PHONE_X = 320;
const PHONE_Y = 330;

const CallIcon: React.FC<{size: number; color: string}> = ({size, color}) => <svg width={size} height={size} viewBox="0 0 48 48">
  <path d="M13 8 C9 8 7 12 8 17 C10 30 19 39 32 42 C37 43 40 40 40 36 L40 31 L31 27 L27 32 C21 29 18 26 16 20 L21 16 L17 8 Z" fill={color} />
</svg>;

export const EndingCallScene: React.FC = () => {
  const frame = useCurrentFrame();
  const tapAt = 172;
  const press = progress(frame, tapAt, 6) * (1 - progress(frame, tapAt + 8, 18));
  const ripple = progress(frame, tapAt, 26);
  const contactOut = progress(frame, tapAt + 6, 12);
  const callFade = progress(frame, tapAt + 18, 20);
  const tapHide = progress(frame, tapAt, 10);
  const connect = progress(frame, 242, 30);
  const titleIn = progress(frame, 270, 40);
  const lockOut = progress(frame, 78, 22);
  const contactIn = progress(frame, 78, 22);
  const cursorIn = progress(frame, 96, 18);
  const cursorMove = progress(frame, 104, 64);
  const cursorX = lerp(312, 206, cursorMove);
  const cursorY = lerp(700, 618, cursorMove);
  const phoneFade = 1 - titleIn;

  return <SceneShell index={6}>
    <div style={{position: 'absolute', left: PHONE_X, top: PHONE_Y, width: 440, height: 780, borderRadius: 54, background: `linear-gradient(160deg, ${C.surface}, ${C.ink})`, border: `1.5px solid ${C.gold}88`, boxShadow: `0 34px 90px ${C.black}, 0 0 60px ${C.gold}18`, opacity: phoneFade}}>
      <div style={{position: 'absolute', left: 16, top: 16, width: 406, height: 748, borderRadius: 44, background: C.ink, overflow: 'hidden', border: `1px solid ${C.ivory}12`}}>
        <div style={{position: 'absolute', top: 10, left: 158, width: 90, height: 22, borderRadius: 12, background: C.surface}} />

        {/* 锁屏：离霜降还有五天 */}
        <div style={{position: 'absolute', inset: 0, opacity: 1 - lockOut, transform: `translateX(${-lockOut * 100}%)`}}>
          <div style={{position: 'absolute', top: 68, left: 34, color: C.gold, fontSize: 20, letterSpacing: 6}}>农历 · 九月初九</div>
          <div style={{position: 'absolute', top: 104, left: 34, color: C.ivory, fontFamily: FONT, fontSize: 66, letterSpacing: 4}}>九月初九</div>
          <div style={{position: 'absolute', top: 190, left: 34, color: C.secondary, fontFamily: FONT, fontSize: 26, letterSpacing: 8}}>重阳</div>
          <div style={{position: 'absolute', top: 300, left: 34, width: 338, height: 150, borderRadius: 18, border: `1px solid ${C.gold}55`, background: `${C.surface}aa`}}>
            <div style={{position: 'absolute', top: 22, left: 24, color: C.muted, fontSize: 19, letterSpacing: 4}}>下一个节气</div>
            <div style={{position: 'absolute', top: 54, left: 24, color: C.ivory, fontFamily: FONT, fontSize: 34, letterSpacing: 4}}>霜降</div>
            <div style={{position: 'absolute', top: 104, left: 24, color: C.goldLight, fontFamily: C.numberFont, fontSize: 22, letterSpacing: 2}}>还有 5 天</div>
            <div style={{position: 'absolute', top: 46, right: 28, width: 58, height: 58, borderRadius: '50%', border: `1px solid ${C.gold}66`, background: `${C.gold}14`}} />
          </div>
          <div style={{position: 'absolute', top: 540, left: 34, right: 34, height: 1, background: `${C.ivory}16`}} />
          <div style={{position: 'absolute', top: 566, left: 34, color: C.secondary, fontFamily: FONT, fontSize: 23, lineHeight: 1.8}}>历法负责记日子，<br />不负责定吉凶。</div>
        </div>

        {/* 联系人 */}
        <div style={{position: 'absolute', inset: 0, opacity: contactIn * (1 - contactOut), background: C.ink, transform: `translateX(${(1 - contactIn) * 100}%)`}}>
          <div style={{position: 'absolute', top: 60, left: 0, right: 0, textAlign: 'center', color: C.muted, fontSize: 20, letterSpacing: 6}}>联系人</div>
          <div style={{position: 'absolute', top: 128, left: 141, width: 124, height: 124, borderRadius: '50%', background: `radial-gradient(circle at 38% 32%, ${C.goldLight}, ${C.gold}55)`, border: `1px solid ${C.goldLight}88`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.ink, fontFamily: FONT, fontSize: 58}}>家</div>
          <div style={{position: 'absolute', top: 274, left: 0, right: 0, textAlign: 'center', color: C.ivory, fontFamily: FONT, fontSize: 42, letterSpacing: 6}}>家</div>
          <div style={{position: 'absolute', top: 328, left: 0, right: 0, textAlign: 'center', color: C.muted, fontFamily: C.numberFont, fontSize: 21, letterSpacing: 3}}>138 ···· 0000</div>

          <div style={{position: 'absolute', top: 440, left: 34, right: 34, height: 1, background: `${C.ivory}16`}} />
          <div style={{position: 'absolute', top: 462, left: 34, color: C.muted, fontSize: 18, letterSpacing: 5}}>最近通话</div>
          <div style={{position: 'absolute', top: 496, left: 34, right: 34, display: 'flex', alignItems: 'center', gap: 16}}>
            <div style={{width: 34, height: 34, borderRadius: '50%', border: `1px solid ${C.gold}44`, background: `${C.gold}10`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <CallIcon size={16} color={C.gold} />
            </div>
            <div style={{color: C.secondary, fontFamily: FONT, fontSize: 21, letterSpacing: 2}}>家 · 3 天前</div>
          </div>

          <div style={{position: 'absolute', top: 572, left: 157, width: 92, height: 92, borderRadius: '50%', background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 - 0.14 * press})`, boxShadow: `0 0 ${28 + 18 * press}px ${C.green}55`}}>
            <CallIcon size={40} color={C.ink} />
          </div>
          <div style={{position: 'absolute', top: 676, left: 0, right: 0, textAlign: 'center', color: C.secondary, fontFamily: FONT, fontSize: 20, letterSpacing: 6}}>拨打</div>

          <div style={{position: 'absolute', top: 572 - 22, left: 157 - 22, width: 136 + 220 * ripple, height: 136 + 220 * ripple, marginLeft: -(110 * ripple), marginTop: -(110 * ripple), borderRadius: '50%', border: `2px solid ${C.green}`, opacity: ripple > 0.001 ? 0.85 * (1 - ripple) : 0}} />
        </div>

        {/* 通话中 */}
        <div style={{position: 'absolute', inset: 0, opacity: callFade, background: C.ink}}>
          {Array.from({length: 3}, (_, i) => {
            const p = ((frame + i * 20) % 60) / 60;
            return <div key={i} style={{position: 'absolute', left: 206 - 50 - p * 120, top: 250 - 50 - p * 120, width: 100 + p * 240, height: 100 + p * 240, borderRadius: '50%', border: `1px solid ${C.gold}`, opacity: (1 - p) * 0.4 * callFade}} />;
          })}
          <div style={{position: 'absolute', top: 78, left: 0, right: 0, textAlign: 'center', color: C.gold, fontSize: 21, letterSpacing: 6}}>{connect > 0.5 ? '已接通' : '正在呼叫'}</div>
          <div style={{position: 'absolute', top: 118, left: 0, right: 0, textAlign: 'center', color: C.ivory, fontFamily: FONT, fontSize: 64, letterSpacing: 8}}>家</div>
          <div style={{position: 'absolute', top: 204, left: 0, right: 0, textAlign: 'center', color: C.secondary, fontFamily: C.numberFont, fontSize: 24, letterSpacing: 4}}>{connect > 0.5 ? '00:01' : '……'}</div>
          <div style={{position: 'absolute', top: 268, left: 206, width: 2, height: 120, background: `linear-gradient(to bottom, ${C.gold}, transparent)`, opacity: 0.5}} />
          <div style={{position: 'absolute', top: 420, left: 0, right: 0, textAlign: 'center', color: C.secondary, fontFamily: FONT, fontSize: 22, letterSpacing: 3, opacity: connect}}>今天，给家里打个电话。</div>
        </div>
      </div>

      {/* 点击光标 */}
      <div style={{position: 'absolute', left: cursorX - 11, top: cursorY - 11, width: 22, height: 22, borderRadius: '50%', background: C.ivory, opacity: cursorIn * (1 - tapHide), transform: `scale(${1 - 0.25 * press})`, boxShadow: `0 0 0 9px ${C.ivory}22, 0 4px 18px ${C.black}`}} />
    </div>

    {/* 片名卡 */}
    <div style={{position: 'absolute', top: 300, left: 0, right: 0, bottom: 0, opacity: titleIn, textAlign: 'center', background: `linear-gradient(to bottom, transparent, ${C.ink} 26%, ${C.ink} 100%)`}}>
      <div style={{position: 'absolute', top: 190, left: 0, right: 0, color: C.gold, fontSize: 23, letterSpacing: 12}}>二〇二六 · 重阳</div>
      <div style={{position: 'absolute', top: 250, left: 0, right: 0, color: C.ivory, fontFamily: FONT, fontSize: 118, letterSpacing: 8}}>赤马重阳</div>
      <div style={{position: 'absolute', top: 410, left: 0, right: 0, color: C.goldLight, fontFamily: FONT, fontSize: 56, letterSpacing: 6}}>原来可以这样看</div>
      <svg width="700" height="80" viewBox="0 0 700 80" style={{position: 'absolute', top: 500, left: 190}}>
        <path d="M10 56 C120 56 150 16 250 16 S390 70 480 38 S620 26 690 56" fill="none" stroke={`${C.gold}88`} strokeWidth="1.5" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - titleIn} />
      </svg>
      <div style={{position: 'absolute', top: 590, left: 0, right: 0, color: C.secondary, fontFamily: FONT, fontSize: 30, letterSpacing: 3}}>历法负责记日子，不负责定吉凶。</div>
    </div>
  </SceneShell>;
};
