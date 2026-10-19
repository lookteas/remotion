import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ichingTheme as C} from '../../../src/config/theme';
import {lerp, progress} from '../../../src/lib/anim';
import {alpha, Chrysanthemum} from './Artwork';
import {SceneShell, FONT} from './Chrome';

export const EndingFamilyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = lerp(1.26, 1, progress(frame, 0, 90));
  const labels = progress(frame, 196, 36);
  const tx = 540 * (1 - zoom);
  const ty = 640 * (1 - zoom);

  return <SceneShell index={6}>
    <div style={{position: 'absolute', left: 0, top: 240, width: 1080, height: 1200, transform: `translate(${tx}px, ${ty}px) scale(${zoom})`, transformOrigin: '0 0'}}>
      <svg width="1080" height="1200" viewBox="0 0 1080 1200">
        <defs>
          <linearGradient id="end-sky" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#2e2416" /><stop offset="0.45" stopColor="#7a4f22" /><stop offset="1" stopColor="#c98a3c" />
          </linearGradient>
          <radialGradient id="end-glow"><stop stopColor={C.goldLight} stopOpacity="0.5" /><stop offset="1" stopColor={C.gold} stopOpacity="0" /></radialGradient>
        </defs>

        <rect width="1080" height="1200" fill={C.ink} />

        {/* 窗外：丰收的田野 */}
        <rect x="100" y="70" width="880" height="600" rx="10" fill="url(#end-sky)" />
        <circle cx="700" cy="250" r="120" fill="url(#end-glow)" />
        <circle cx="700" cy="250" r="68" fill={C.goldLight} opacity="0.7" />
        <path d="M100 500 C260 450 380 500 520 470 C680 435 820 485 980 450 L980 670 L100 670 Z" fill="#6b4220" opacity="0.9" />
        <path d="M100 555 C280 515 420 560 560 530 C720 495 860 540 980 510 L980 670 L100 670 Z" fill="#432a16" />
        {Array.from({length: 9}, (_, i) => <path key={i} d={`M${120 + i * 100} 670 C${140 + i * 100} 600 ${180 + i * 100} 550 ${210 + i * 100} 520`} fill="none" stroke={C.goldLight} strokeWidth="2" opacity="0.38" />)}
        {Array.from({length: 46}, (_, i) => <circle key={i} cx={130 + (i * 67) % 840} cy={535 + (i * 37) % 115} r={2.4} fill={C.goldLight} opacity="0.55" />)}
        <rect x="100" y="70" width="880" height="600" rx="10" fill="none" stroke={C.soil} strokeWidth="18" />
        <path d="M540 79 L540 661 M109 380 L981 380" stroke={C.soil} strokeWidth="12" />

        {/* 饭桌 */}
        <rect x="40" y="744" width="1000" height="30" rx="6" fill={C.soil} stroke={alpha(C.gold, 0.4)} />
        <rect x="110" y="774" width="22" height="300" fill={C.soil} />
        <rect x="948" y="774" width="22" height="300" fill={C.soil} />

        {/* 九层重阳糕 */}
        {Array.from({length: 9}, (_, i) => <rect key={i} x="330" y={700 - i * 16} width="160" height="15" rx="2" fill={i % 2 ? C.ivory : C.goldLight} stroke={alpha(C.gold, 0.6)} />)}
        <path d="M410 556 L410 520" stroke={C.gold} strokeWidth="3" />
        <path d="M410 520 L450 530 L410 542 Z" fill={C.vermilion} />
        <circle cx="410" cy="552" r="5" fill={C.vermilion} />

        {/* 茶 */}
        <ellipse cx="720" cy="726" rx="54" ry="22" fill={C.secondary} opacity="0.9" />
        <path d="M668 722 L636 706" stroke={C.secondary} strokeWidth="7" strokeLinecap="round" />
        <path d="M772 726 C808 716 810 750 778 746" fill="none" stroke={C.secondary} strokeWidth="6" />
        <ellipse cx="720" cy="702" rx="28" ry="8" fill={C.ivory} opacity="0.7" />
        <ellipse cx="640" cy="738" rx="24" ry="9" fill={C.ivory} opacity="0.8" />
        <ellipse cx="800" cy="738" rx="24" ry="9" fill={C.ivory} opacity="0.8" />

        {/* 菊花与寿 */}
        <path d="M930 744 C920 700 940 660 930 620" fill="none" stroke={C.green} strokeWidth="3" />
        <Chrysanthemum cx={930} cy={598} r={52} reveal={labels} />
        <Chrysanthemum cx={978} cy={646} r={34} reveal={labels} />
        <g opacity={labels} transform="translate(1010 600) rotate(-7)">
          <rect x="-30" y="-30" width="60" height="60" rx="3" fill={C.vermilion} />
          <rect x="-25" y="-25" width="50" height="50" rx="2" fill="none" stroke={alpha(C.ivory, 0.8)} />
          <text x="0" y="2" textAnchor="middle" dominantBaseline="central" fill={C.ivory} fontFamily={FONT} fontSize="24">寿</text>
        </g>

        {/* 柿子 */}
        <g opacity={labels}>
          <circle cx="170" cy="716" r="26" fill={C.vermilion} />
          <circle cx="218" cy="726" r="21" fill={C.gold} />
          <path d="M170 692 L160 680 M170 692 L182 682" stroke={C.green} strokeWidth="3" />
          <path d="M218 708 L210 698 M218 708 L228 700" stroke={C.green} strokeWidth="3" />
        </g>

        {/* 老人 */}
        <g>
          <path d="M800 590 Q856 562 912 596 L930 770 L780 770 Z" fill={C.char} stroke={alpha(C.gold, 0.35)} strokeWidth="2" />
          <circle cx="856" cy="540" r="30" fill={C.char} stroke={alpha(C.gold, 0.4)} strokeWidth="2" />
          <circle cx="878" cy="518" r="13" fill={C.char} stroke={alpha(C.gold, 0.45)} strokeWidth="2" />
          <path d="M792 610 Q856 640 920 610" fill="none" stroke={alpha(C.goldLight, 0.55)} strokeWidth="2" />
          <path d="M930 630 L950 860" stroke={C.soil} strokeWidth="7" strokeLinecap="round" />
          <path d="M860 700 Q884 690 904 704" fill="none" stroke={C.char} strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* 年轻人 */}
        <g>
          <path d="M170 610 Q230 578 290 612 L310 770 L150 770 Z" fill={C.char} stroke={alpha(C.gold, 0.3)} strokeWidth="2" />
          <circle cx="230" cy="560" r="27" fill={C.char} stroke={alpha(C.gold, 0.35)} strokeWidth="2" />
          <circle cx="210" cy="540" r="11" fill={C.char} />
          <path d="M160 650 Q230 676 300 650" fill="none" stroke={alpha(C.goldLight, 0.4)} strokeWidth="2" />
        </g>

        {/* 长寿面 */}
        <g>
          <ellipse cx="560" cy="716" rx="60" ry="20" fill={C.soil} />
          <path d="M500 708 Q560 752 620 708" fill={C.ivory} opacity="0.92" stroke={alpha(C.gold, 0.45)} strokeWidth="1.5" />
          <ellipse cx="560" cy="704" rx="44" ry="12" fill={C.soil} opacity="0.85" />
          {Array.from({length: 5}, (_, i) => <path key={i} d={`M528 ${700 + i * 2} C545 ${692 + i * 2} 575 ${708 + i * 2} 592 ${698 + i * 2}`} fill="none" stroke={C.goldLight} strokeWidth="2" opacity="0.85" />)}
          <path d="M532 678 L596 664" stroke={C.soil} strokeWidth="4" strokeLinecap="round" />
          <path d="M534 688 L598 674" stroke={C.soil} strokeWidth="4" strokeLinecap="round" />
          <path d="M548 650 C540 630 556 620 548 600 M572 646 C564 626 580 616 572 596" fill="none" stroke={alpha(C.ivory, 0.25)} strokeWidth="2" />
        </g>

        {/* 三个词 */}
        <g opacity={labels}>
          <text x="160" y="470" fill={C.goldLight} fontFamily={FONT} fontSize="24" letterSpacing="8">丰收</text>
          <text x="824" y="494" fill={C.goldLight} fontFamily={FONT} fontSize="24" letterSpacing="8">长寿</text>
          <text x="462" y="470" fill={C.goldLight} fontFamily={FONT} fontSize="24" letterSpacing="8">敬老</text>
        </g>
      </svg>
    </div>
  </SceneShell>;
};
