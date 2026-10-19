import {Interactive, interpolate, useCurrentFrame} from 'remotion';
import {ichingTheme as C} from '../../../src/config/theme';
import {clamp, lerp, progress} from '../../../src/lib/anim';
import {alpha, Artboard, Hexagram, Notebook, Plant, Pot, Schoolbag} from './Artwork';
import {ArtArea, cueAt, ExampleHeading, Gold, Heading, Lift, SceneShell, Small, TextArea} from './Chrome';
import {EXAMPLES, HEXAGRAMS, TRIGRAMS} from './hexagrams';

const LifeInner = () => {
  const frame = useCurrentFrame();
  return <SceneShell index={0}>
    <TextArea style={{top: 252}}>
      <Lift><Small style={{color: C.gold, letterSpacing: 7, marginBottom: 28}}>从一件熟悉的小事说起</Small></Lift>
      <Heading size={92}>日子，总在<br /><Gold>发生变化</Gold></Heading>
      <Lift at={cueAt(0, 3)} style={{marginTop: 34}}><Small>刚开始 · 慢慢顺手 · 又遇到新问题</Small></Lift>
      <Lift at={cueAt(0, 4)} style={{marginTop: 54}}>
        <div style={{width: 380, height: 1, background: alpha(C.gold, 0.4)}} />
        <Small style={{fontSize: 25, marginTop: 23}}>几千年前，人们也在琢磨。</Small>
      </Lift>
    </TextArea>
    <ArtArea><Artboard>
      <path d="M15 568 C220 680 204 334 420 377 S722 703 943 580" fill="none" stroke={alpha(C.gold, 0.45)} strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress(frame, 30, 260)} />
      <g opacity={progress(frame, 15, 35)} transform={`translate(-110 ${40 + (1 - progress(frame, 15, 35)) * 40}) scale(.68)`}><Pot frame={frame} settle={0.9} small /></g>
      <g opacity={progress(frame, cueAt(0, 1), 35)} transform="translate(492 -20) scale(.55)"><Schoolbag frame={frame} /></g>
      <g opacity={progress(frame, cueAt(0, 2), 35)} transform="translate(245 275) scale(.60)"><Notebook frame={frame} opening={0.98} small /></g>
      <g fontFamily={C.font} fontSize="25" letterSpacing="5" fill={C.secondary}>
        <text x="217" y="494" textAnchor="middle" opacity={progress(frame, 40, 30)}>过日子</text>
        <text x="767" y="355" textAnchor="middle" opacity={progress(frame, cueAt(0, 1) + 20, 30)}>带孩子</text>
        <text x="550" y="700" textAnchor="middle" opacity={progress(frame, cueAt(0, 2) + 20, 30)}>学点新东西</text>
      </g>
    </Artboard></ArtArea>
  </SceneShell>;
};

const LinesInner = () => {
  const frame = useCurrentFrame();
  const yin = progress(frame, cueAt(1, 3), 40);
  const yang = progress(frame, cueAt(1, 2), 30);
  return <SceneShell index={1}>
    <TextArea style={{top: 236}}>
      <Heading size={82}>先认两个<br /><Gold>简单的样子</Gold></Heading>
      <Lift at={cueAt(1, 4)} style={{marginTop: 47}}>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 20}}>
          <span style={{fontSize: 98, color: C.ivory}}>爻</span>
          <span style={{fontSize: 30, color: C.gold, fontFamily: C.numberFont}}>yáo</span>
        </div>
        <Small>组成卦象的一笔。</Small>
      </Lift>
    </TextArea>
    <ArtArea><Artboard>
      <defs>
        <linearGradient id="iching-lines-material" x1="0" y1="0" x2="0" y2="1"><stop stopColor={C.ivory} /><stop offset="1" stopColor={C.gold} /></linearGradient>
      </defs>
      <ellipse cx="500" cy="520" rx="400" ry="34" fill={alpha(C.black, 0.45)} />
      <g transform={`translate(${lerp(290, 80, yin)} 270)`}>
        <rect width="345" height="38" y="10" fill={C.soil} rx="2" />
        <rect width="345" height="38" fill="url(#iching-lines-material)" rx="2" />
        <g opacity={yang}>
          <path d="M172 67 L172 129" stroke={alpha(C.gold, 0.5)} strokeWidth="1" />
          <text x="172" y="185" textAnchor="middle" fill={C.ivory} fontSize="51" fontFamily={C.font}>阳爻</text>
          <text x="172" y="231" textAnchor="middle" fill={C.secondary} fontSize="25" fontFamily={C.font}>一根完整的</text>
        </g>
      </g>
      <g opacity={yin} transform={`translate(565 ${270 + (1 - yin) * 45})`}>
        <rect width="146" height="38" y="10" fill={C.soil} rx="2" /><rect x="199" width="146" height="38" y="10" fill={C.soil} rx="2" />
        <rect width="146" height="38" fill="url(#iching-lines-material)" rx="2" /><rect x="199" width="146" height="38" fill="url(#iching-lines-material)" rx="2" />
        <path d="M172 67 L172 129" stroke={alpha(C.gold, 0.5)} strokeWidth="1" />
        <text x="172" y="185" textAnchor="middle" fill={C.ivory} fontSize="51" fontFamily={C.font}>阴爻</text>
        <text x="172" y="231" textAnchor="middle" fill={C.secondary} fontSize="25" fontFamily={C.font}>中间断开的</text>
      </g>
      <path d="M75 563 L925 563" stroke={alpha(C.gold, 0.18)} strokeWidth="1" />
      <text x="500" y="622" textAnchor="middle" fill={C.muted} fontFamily={C.font} fontSize="23" letterSpacing="5">不用背，先记住它们的样子</text>
    </Artboard></ArtArea>
  </SceneShell>;
};

const BuildInner = () => {
  const frame = useCurrentFrame();
  const eight = progress(frame, cueAt(2, 1), 42);
  const stack = progress(frame, cueAt(2, 2), 44);
  const atlas = progress(frame, cueAt(2, 3), 70);
  const initial = progress(frame, 18, 65);
  const last = progress(frame, cueAt(2, 5), 30);
  return <SceneShell index={2}>
    <TextArea style={{top: 241, width: 640}}>
      <div style={{opacity: 1 - atlas, position: 'absolute', top: 0}}>
        <Heading size={78}>一层一层，<br /><Gold>叠出不同图样</Gold></Heading>
        <Small style={{marginTop: 36}}>先叠三层，再把两组放在一起。</Small>
      </div>
      <div style={{opacity: atlas, translate: `0px ${(1 - atlas) * 25}px`}}>
        <Small style={{color: C.gold, letterSpacing: 7}}>不同的样子，一共</Small>
        <div style={{fontFamily: C.numberFont, fontSize: 192, color: C.goldLight, lineHeight: 1.25, fontWeight: 400, marginLeft: -8}}>64<span style={{fontFamily: C.font, fontSize: 48, marginLeft: 20}}>种</span></div>
        <Heading size={69}>六十四卦</Heading>
        <Small style={{marginTop: 27}}>每个卦，都有六层。</Small>
        <div style={{opacity: last, marginTop: 56, borderLeft: `2px solid ${alpha(C.gold, 0.5)}`, paddingLeft: 22}}>
          <Small style={{fontSize: 24}}>这里看的是结构。<br />历史上的形成，还有更多故事。</Small>
        </div>
      </div>
    </TextArea>
    <ArtArea><Artboard>
      <g opacity={1 - eight}>
        <Hexagram lines={[1, 0, 1]} x={330} y={205} width={310} height={210} reveal={initial} />
        <text x="485" y="490" fill={C.secondary} textAnchor="middle" fontFamily={C.font} fontSize="30">从下往上，叠三层</text>
      </g>
      <g opacity={eight * (1 - stack)}>
        {TRIGRAMS.map((t, i) => <g key={t.name} transform={`translate(${90 + i % 4 * 225}, ${110 + Math.floor(i / 4) * 285 + (1 - eight) * 35})`}>
          <Hexagram lines={t.lines} width={138} height={115} />
          <text x="69" y="172" fill={C.ivory} textAnchor="middle" fontFamily={C.font} fontSize="32">{t.name}</text>
          <text x="69" y="210" fill={C.muted} textAnchor="middle" fontFamily={C.font} fontSize="23">{t.image}</text>
        </g>)}
      </g>
      <g opacity={stack * (1 - atlas)}>
        <Hexagram lines={[0, 1, 0]} x={340} y={lerp(70, 145, stack)} width={270} height={150} color={C.goldLight} />
        <Hexagram lines={[1, 0, 0]} x={340} y={lerp(430, 330, stack)} width={270} height={150} color={C.ivory} />
        <path d="M680 145 L710 145 L710 440 L680 440" fill="none" stroke={C.gold} strokeWidth="2" />
        <text x="750" y="292" fill={C.ivory} fontFamily={C.font} fontSize="34">六层</text>
        <text x="476" y="565" fill={C.secondary} textAnchor="middle" fontFamily={C.font} fontSize="28">上下两组，组成一个卦</text>
      </g>
      <g opacity={atlas}>
        {HEXAGRAMS.map((h, i) => {
          const p = progress(frame, cueAt(2, 3) + i * 0.85, 28);
          return <g key={h.lines.join('')} transform={`translate(${64 + i % 8 * 115}, ${34 + Math.floor(i / 8) * 76 + (1 - p) * 20})`} opacity={p}>
            <Hexagram lines={h.lines} width={68} height={53} color={i % 9 === 0 ? C.ivory : C.gold} />
          </g>;
        })}
        <path d="M42 655 L955 655" stroke={alpha(C.gold, 0.25)} />
        <text x="500" y="697" textAnchor="middle" fill={C.muted} fontFamily={C.font} fontSize="22" letterSpacing="3">按组合展示 · 非传统卦序</text>
      </g>
    </Artboard></ArtArea>
  </SceneShell>;
};

const StoriesInner = () => {
  const frame = useCurrentFrame();
  const unfold = progress(frame, cueAt(3, 1), 55);
  const objects = progress(frame, cueAt(3, 2), 45);
  return <SceneShell index={3} analogy>
    <TextArea style={{top: 224}}>
      <Heading size={83}>有了图样，<br /><Gold>还要有故事</Gold></Heading>
      <Lift at={cueAt(3, 1)} style={{marginTop: 36}}><Small>卦象，配上名字和文字。<br />谈处境，也谈行动。</Small></Lift>
      <Lift at={cueAt(3, 2)} style={{marginTop: 48}}><Small style={{fontSize: 33, color: C.goldLight}}>借今天的小事，体会一下。</Small></Lift>
    </TextArea>
    <ArtArea><Artboard>
      <g opacity={1 - objects}>
        <g transform={`translate(${lerp(360, 105, unfold)} 180)`}>
          <Hexagram lines={EXAMPLES.zhun.lines} width={165} height={210} reveal={progress(frame, 10, 40)} />
          <text x="82" y="285" textAnchor="middle" fontFamily={C.font} fontSize="76" fill={C.ivory}>屯</text>
        </g>
        <g opacity={unfold} transform={`translate(${lerp(600, 410, unfold)} 160)`}>
          <path d="M0 0 L400 0 L400 360 L0 360 Z" fill={alpha(C.gold, 0.035)} stroke={alpha(C.gold, 0.5)} />
          <path d="M25 25 L375 25 M25 335 L375 335" stroke={alpha(C.gold, 0.25)} />
          <text x="200" y="115" textAnchor="middle" fontFamily={C.font} fontSize="44" fill={C.goldLight}>开始的时候</text>
          <text x="200" y="188" textAnchor="middle" fontFamily={C.font} fontSize="44" fill={C.ivory}>难免有点难</text>
          <text x="200" y="275" textAnchor="middle" fontFamily={C.font} fontSize="23" fill={C.secondary}>先找准处境，再考虑行动</text>
        </g>
      </g>
      <g opacity={objects}>
        <g transform="translate(-170 -30) scale(.65)"><Pot frame={frame} settle={1} small /></g>
        <g transform="translate(430 -45) scale(.58)"><Plant frame={frame} growth={0.7} /></g>
        <g transform="translate(180 355) scale(.64)"><Notebook frame={frame} opening={1} small /></g>
      </g>
    </Artboard></ArtArea>
  </SceneShell>;
};

const CookingInner = () => {
  const frame = useCurrentFrame();
  const teach = progress(frame, cueAt(4, 2), 24);
  const settle = progress(frame, cueAt(4, 3), 90);
  return <SceneShell index={4} analogy>
    <div style={{opacity: 1 - teach}}><TextArea style={{top: 275}}>
      <Heading size={80}>第一次做饭，<br /><Gold>谁还没翻过车？</Gold></Heading>
      <Lift at={cueAt(4, 1)} style={{marginTop: 38}}><Small>一次没做好，就说明不适合吗？</Small></Lift>
    </TextArea></div>
    <div style={{opacity: teach}}><ExampleHeading example="zhun" at={cueAt(4, 2)} subtitle="开始，有点难。" description="先把一步学会，再接着学下一步。" quote="刚柔始交而难生" gloss="刚开始形成时，往往伴随困难。" /></div>
    <ArtArea><Artboard>
      <Pot frame={frame} settle={settle} />
      <g opacity={settle}>
        <path d="M245 647 L765 647" stroke={alpha(C.gold, 0.2)} />
        {['火调小', '慢慢翻', '再尝尝'].map((t, i) => <g key={t} opacity={progress(frame, cueAt(4, 3) + i * 28, 25)}>
          <circle cx={313 + i * 190} cy="646" r="4" fill={C.goldLight} />
          <text x={313 + i * 190} y="694" textAnchor="middle" fill={C.ivory} fontFamily={C.font} fontSize="28">{t}</text>
        </g>)}
      </g>
    </Artboard></ArtArea>
  </SceneShell>;
};

const SeedInner = () => {
  const frame = useCurrentFrame();
  const teach = progress(frame, cueAt(5, 2), 24);
  const growth = interpolate(frame, [35, cueAt(5, 2), cueAt(5, 4) + 65], [0.05, 0.35, 1], clamp);
  const water = progress(frame, cueAt(5, 3), 25);
  return <SceneShell index={5} analogy>
    <div style={{opacity: 1 - teach}}><TextArea style={{top: 250}}>
      <Heading size={81}>怎么，<br /><Gold>还没长出来？</Gold></Heading>
      <Lift at={cueAt(5, 1)} style={{marginTop: 42}}><Small>第二天 · 第三天……<br />总不能每天扒开土看看。</Small></Lift>
    </TextArea></div>
    <div style={{opacity: teach}}><ExampleHeading example="xu" at={cueAt(5, 2)} subtitle="等，也能做点事。" description="浇水，照料，把能做的先做好。" quote="需，须也" gloss="这里的“须”，有等待的意思。" /></div>
    <ArtArea><Artboard>
      <Plant frame={frame} growth={growth} water={water} />
      <g opacity={1 - teach}>
        <text x="505" y="92" textAnchor="middle" fill={C.secondary} fontFamily={C.font} fontSize="29">{frame < cueAt(5, 1) ? '土面上，好像没有动静。' : '别急，往土下面看一看。'}</text>
        <path d="M500 115 L500 160" stroke={alpha(C.gold, 0.45)} strokeDasharray="4 7" />
      </g>
      <g opacity={progress(frame, cueAt(5, 4), 35)}>
        <text x="505" y="83" textAnchor="middle" fill={C.goldLight} fontFamily={C.font} fontSize="33">有些进展，暂时还看不见。</text>
      </g>
    </Artboard></ArtArea>
  </SceneShell>;
};

const LearningInner = () => {
  const frame = useCurrentFrame();
  const teach = progress(frame, cueAt(6, 2), 24);
  const opening = progress(frame, cueAt(6, 3), 100);
  return <SceneShell index={6} analogy>
    <div style={{opacity: 1 - teach}}><TextArea style={{top: 267}}>
      <Heading size={79}>做得顺手，<br /><Gold>就什么都会了？</Gold></Heading>
      <Lift at={cueAt(6, 1)} style={{marginTop: 40}}><Small>换一道新菜，照样可能翻车。</Small></Lift>
    </TextArea></div>
    <div style={{opacity: teach}}><ExampleHeading example="qian" at={cueAt(6, 2)} subtitle="留一点进步的空间。" description="会做的认真做，不会的接着学。" quote="人道恶盈而好谦" gloss="人们不喜欢自满，更愿意亲近谦逊。" /></div>
    <ArtArea><Artboard>
      <Notebook frame={frame} opening={opening} />
      <g opacity={1 - opening}>
        <text x="500" y="90" textAnchor="middle" fontFamily={C.font} fontSize="32" fill={C.goldLight}>会做一道菜，不等于会做每一道。</text>
        <g transform="translate(345 92) scale(.30)"><Pot frame={frame} settle={1} small /></g>
      </g>
      <g opacity={opening}>
        <text x="500" y="101" textAnchor="middle" fill={C.goldLight} fontFamily={C.font} fontSize="34">这一页，留给下一次。</text>
        <path d="M290 648 L710 648" stroke={alpha(C.gold, 0.22)} />
      </g>
    </Artboard></ArtArea>
  </SceneShell>;
};

const EndingInner = () => {
  const frame = useCurrentFrame();
  const questions = progress(frame, cueAt(7, 2), 28);
  const finale = progress(frame, cueAt(7, 6), 36);
  return <SceneShell index={7}>
    <div style={{opacity: 1 - questions}}>
      <TextArea style={{top: 235}}>
        <Heading size={84}>先认识样子，<br /><Gold>再慢慢体会。</Gold></Heading>
        <Small style={{marginTop: 43}}>开始的难 · 等待的事 · 进步的空间</Small>
      </TextArea>
      <ArtArea><Artboard>
        {[EXAMPLES.zhun, EXAMPLES.xu, EXAMPLES.qian].map((h, i) => <g key={h.name} transform={`translate(${100 + i * 300} 208)`}>
          <Hexagram lines={h.lines} width={150} height={210} />
          <text x="75" y="300" textAnchor="middle" fill={C.ivory} fontFamily={C.font} fontSize="60">{h.name}</text>
        </g>)}
      </Artboard></ArtArea>
    </div>
    <div style={{position: 'absolute', inset: 0, opacity: questions * (1 - finale)}}>
      <div style={{position: 'absolute', left: 176, top: 220}}>
        <Small style={{color: C.gold, fontSize: 25, letterSpacing: 7}}>下次遇到变化，先问问自己</Small>
        {['我现在，是什么处境？', '有什么，值得留心？', '下一步，能做点什么？'].map((q, i) => <Lift key={q} at={cueAt(7, 3 + i)} style={{marginTop: i === 0 ? 48 : 32}}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 34}}>
            <span style={{fontFamily: C.numberFont, fontSize: 26, color: C.gold}}>0{i + 1}</span>
            <span style={{fontSize: 65, color: i === 2 ? C.goldLight : C.ivory, letterSpacing: 3}}>{q}</span>
          </div>
        </Lift>)}
      </div>
      <div style={{position: 'absolute', left: 1150, top: 170, width: 640, height: 640, opacity: 0.20}}><Artboard>
        {HEXAGRAMS.map((h, i) => <Hexagram key={i} lines={h.lines} x={i % 8 * 125} y={Math.floor(i / 8) * 85} width={65} height={52} />)}
      </Artboard></div>
    </div>
    <div style={{position: 'absolute', inset: 0, opacity: finale, textAlign: 'center'}}>
      <div style={{position: 'absolute', top: 213, left: 0, right: 0, fontSize: 24, color: C.gold, letterSpacing: 12}}>生活里的易经</div>
      <div style={{position: 'absolute', top: 299, left: 0, right: 0, fontSize: 106, lineHeight: 1.5, color: C.ivory, letterSpacing: 8}}>六十四卦</div>
      <div style={{position: 'absolute', top: 470, left: 0, right: 0, fontSize: 53, color: C.goldLight, letterSpacing: 7}}>原来可以这样看</div>
      <svg width="940" height="100" viewBox="0 0 940 100" style={{position: 'absolute', top: 567, left: 490}}>
        <path d="M20 70 C170 70 215 20 340 20 S520 87 655 47 S813 32 920 70" fill="none" stroke={alpha(C.gold, 0.6)} strokeWidth="1.5" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - finale} />
      </svg>
      <div style={{position: 'absolute', top: 715, left: 0, right: 0, color: C.secondary, fontSize: 31, letterSpacing: 5}}>先把眼前的日子，看清一点。</div>
      <div style={{position: 'absolute', top: 813, left: 0, right: 0, fontSize: 21, color: C.muted}}>本片以生活类比入门，卦义参照《周易》原文。</div>
    </div>
  </SceneShell>;
};

export const LifeScene = Interactive.create({Component: LifeInner, layout: 'absolute-fill'});
export const LinesScene = Interactive.create({Component: LinesInner, layout: 'absolute-fill'});
export const BuildScene = Interactive.create({Component: BuildInner, layout: 'absolute-fill'});
export const StoriesScene = Interactive.create({Component: StoriesInner, layout: 'absolute-fill'});
export const CookingScene = Interactive.create({Component: CookingInner, layout: 'absolute-fill'});
export const SeedScene = Interactive.create({Component: SeedInner, layout: 'absolute-fill'});
export const LearningScene = Interactive.create({Component: LearningInner, layout: 'absolute-fill'});
export const EndingScene = Interactive.create({Component: EndingInner, layout: 'absolute-fill'});
