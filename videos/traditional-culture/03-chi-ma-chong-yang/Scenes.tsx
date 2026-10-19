import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ichingTheme as C} from '../../../src/config/theme';
import {progress} from '../../../src/lib/anim';
import {ArtArea, cueAt, FONT, Gold, Heading, Kicker, Lift, Quote, SceneShell, Small, TextArea} from './Chrome';
import {alpha, Artboard, Book, CalendarCard, Chrysanthemum, ParityGrid, Ring60, Seal, YearTrack} from './Artwork';

const SidePanel: React.FC<{
  x: number; label: string; char: string; footer: string; color: string;
  at: number; frame: number; children?: React.ReactNode;
}> = ({x, label, char, footer, color, at, frame, children}) => {
  const p = progress(frame, at, 34);
  return <g opacity={p} transform={`translate(${x} ${(1 - p) * 36})`}>
    <rect x="0" y="0" width="392" height="520" rx="6" fill={alpha(C.surface, 0.72)} stroke={alpha(color, 0.42)} strokeWidth={1.5} />
    <text x="196" y="74" textAnchor="middle" fill={color} fontFamily={FONT} fontSize="25" letterSpacing="7">{label}</text>
    <text x="196" y="344" textAnchor="middle" fill={C.ivory} fontFamily={FONT} fontSize="214">{char}</text>
    <text x="196" y="498" textAnchor="middle" fill={C.secondary} fontFamily={FONT} fontSize="27" letterSpacing="4">{footer}</text>
    {children}
  </g>;
};

const HookInner = () => {
  const frame = useCurrentFrame();
  const ring = progress(frame, 10, 70);
  const card = progress(frame, cueAt(0, 1), 40);
  const stamp = progress(frame, cueAt(0, 2), 26);
  return <SceneShell index={0}>
    <TextArea style={{top: 272}}>
      <Kicker>二〇二六 · 九月初九</Kicker>
      <Heading size={132} at={6} style={{marginTop: 26}}>赤马<Gold>重阳</Gold></Heading>
      <Lift at={cueAt(0, 2)} style={{marginTop: 16}}>
        <div style={{fontFamily: FONT, fontSize: 78, color: C.goldLight, letterSpacing: 4}}>六十年一遇？</div>
      </Lift>
    </TextArea>
    <ArtArea>
      <Artboard>
        <Ring60 cx={452} cy={360} r={292} reveal={ring} highlight={0} />
        <CalendarCard reveal={card} stamp={stamp} />
      </Artboard>
    </ArtArea>
  </SceneShell>;
};

const BingwuInner = () => {
  const frame = useCurrentFrame();
  return <SceneShell index={2}>
    <TextArea style={{top: 276}}>
      <Kicker>天干 · 地支</Kicker>
      <Heading size={96} at={6} style={{marginTop: 24}}>丙午，<br />为什么叫<Gold>赤马</Gold></Heading>
    </TextArea>
    <ArtArea>
      <Artboard>
        <SidePanel x={24} label="天干 · 丙" char="丙" footer="五行 · 火 · 色赤" color={C.vermilion} at={cueAt(2, 0)} frame={frame} />
        <SidePanel x={488} label="地支 · 午" char="午" footer="十二生肖 · 马" color={C.gold} at={cueAt(2, 1)} frame={frame}>
          <Seal x={196} y={414} size={82} text="马" rotation={-8} />
        </SidePanel>
        <text x="452" y="300" textAnchor="middle" fill={C.muted} fontFamily={C.numberFont} fontSize="56">+</text>
      </Artboard>
    </ArtArea>
  </SceneShell>;
};

const SixtyInner = () => {
  const frame = useCurrentFrame();
  const appear = progress(frame, 8, 60);
  const lit = progress(frame, cueAt(2, 1), 80);
  const dim = progress(frame, cueAt(2, 3), 40);
  return <SceneShell index={2}>
    <TextArea style={{top: 268}}>
      <Kicker>一道算术</Kicker>
      <Heading size={92} at={6} style={{marginTop: 22}}>一百二十种，<br />只剩<Gold>六十</Gold></Heading>
    </TextArea>
    <ArtArea>
      <Artboard>
        <ParityGrid appear={appear} lit={lit} dim={dim} />
      </Artboard>
    </ArtArea>
  </SceneShell>;
};

const CycleInner = () => {
  const frame = useCurrentFrame();
  const track = progress(frame, 10, 60);
  const nodes = progress(frame, cueAt(3, 0), 40);
  const bracket = progress(frame, cueAt(3, 2), 40);
  return <SceneShell index={3}>
    <TextArea style={{top: 276}}>
      <Kicker>一圈，六十年</Kicker>
      <Heading size={84} at={6} style={{marginTop: 24}}>六十年一遇，<br />遇的是<Gold>同一个位置</Gold></Heading>
    </TextArea>
    <ArtArea>
      <Artboard>
        <YearTrack reveal={track} nodes={nodes} bracket={bracket} />
      </Artboard>
    </ArtArea>
  </SceneShell>;
};

const ChimaInner = () => {
  const frame = useCurrentFrame();
  const open = progress(frame, cueAt(4, 2), 40);
  const marks = progress(frame, cueAt(4, 3), 80);
  const seal = progress(frame, cueAt(4, 6), 24);
  return <SceneShell index={4}>
    <TextArea style={{top: 264}}>
      <Kicker>丙午 · 丁未</Kicker>
      <Heading size={94} at={6} style={{marginTop: 22}}>赤马红羊，<br />到底<Gold>从哪来</Gold></Heading>
      <Lift at={cueAt(4, 2)} style={{marginTop: 24}}><Small style={{fontSize: 29}}>一本写给皇帝的谏书。</Small></Lift>
    </TextArea>
    <ArtArea>
      <Artboard>
        <g transform="translate(0 -50)">
          <Book open={open} marks={marks} seal={seal} />
        </g>
      </Artboard>
      <Quote at={cueAt(4, 5)} quote="系乎君臣之贤否，政令之得失" gloss="灾异与祸患，取决于君臣是否贤明、政令是否得当。" source="《丙丁龟鉴》续序" style={{position: 'absolute', left: 24, top: 530}} />
    </ArtArea>
  </SceneShell>;
};

const ChongyangInner = () => {
  const frame = useCurrentFrame();
  const first = progress(frame, cueAt(5, 1), 36);
  const second = progress(frame, cueAt(5, 2), 36);
  const flower = progress(frame, cueAt(5, 4), 50);
  return <SceneShell index={5}>
    <TextArea style={{top: 268}}>
      <Kicker>九月初九</Kicker>
      <Heading size={96} at={6} style={{marginTop: 22}}>两个九，<br />为什么叫<Gold>重阳</Gold></Heading>
    </TextArea>
    <ArtArea>
      <Artboard>
        <text x="238" y="340" textAnchor="middle" fill="none" stroke={alpha(C.gold, 0.65)} strokeWidth="2" fontFamily={FONT} fontSize="300" opacity={first}>九</text>
        <text x="418" y="520" textAnchor="middle" fill={alpha(C.ivory, 0.82)} fontFamily={FONT} fontSize="300" opacity={second}>九</text>
        <text x="330" y="634" textAnchor="middle" fill={C.goldLight} fontFamily={FONT} fontSize="28" letterSpacing="12" opacity={second}>九 月 初 九</text>
        <Chrysanthemum cx={706} cy={278} r={112} reveal={flower} />
      </Artboard>
    </ArtArea>
  </SceneShell>;
};

const EndingInner = () => {
  const frame = useCurrentFrame();
  const titleIn = progress(frame, 0, 40);
  return <SceneShell index={6}>
    <div style={{position: 'absolute', inset: 0, textAlign: 'center', opacity: titleIn}}>
      <div style={{position: 'absolute', top: 520, left: 0, right: 0, fontSize: 24, color: C.gold, letterSpacing: 12, fontFamily: FONT}}>二〇二六 · 重阳</div>
      <div style={{position: 'absolute', top: 588, left: 0, right: 0, fontSize: 132, color: C.ivory, letterSpacing: 8, fontFamily: FONT}}>赤马重阳</div>
      <div style={{position: 'absolute', top: 766, left: 0, right: 0, fontSize: 62, color: C.goldLight, letterSpacing: 6, fontFamily: FONT}}>原来可以这样看</div>
      <svg width="760" height="90" viewBox="0 0 760 90" style={{position: 'absolute', top: 866, left: 160}}>
        <path d="M10 62 C130 62 165 18 270 18 S420 78 520 42 S660 30 750 62" fill="none" stroke={alpha(C.gold, 0.55)} strokeWidth="1.5" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress(frame, 40, 80)} />
      </svg>
    </div>
  </SceneShell>;
};

export const HookScene = HookInner;
export const BingwuScene = BingwuInner;
export const SixtyScene = SixtyInner;
export const CycleScene = CycleInner;
export const ChimaScene = ChimaInner;
export const ChongyangScene = ChongyangInner;
export const EndingScene = EndingInner;
