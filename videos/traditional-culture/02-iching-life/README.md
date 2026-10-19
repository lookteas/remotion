# 六十四卦，原来可以这样看

动画文字说明见 [ANIMATION.md](ANIMATION.md)，调试截图与检查记录见 [debug/README.md](debug/README.md)。截图保存在本期 `debug/screenshots/<批次>/`。

以普通人的做饭、种植物和学习经历，引出《周易》六十四卦。用户已确认生活化脚本与黑金微纪录片方向。

- Composition：`traditional-culture-iching-life`
- 1920×1080 / 30fps，5457帧，181.9秒。按逐句语音实测，保留自然停顿，未为凑150秒加速。
- 状态：制作中，提供Studio交互预览，不自动导出MP4。
- 八个独立场景也在Studio的 `iching-life-scenes` 文件夹中。

## 制作文件

| 文件 | 职责 |
| --- | --- |
| `content.json` | 旁白和字幕的权威文案 |
| `timeline.json` | 实测语音时长、各句音轨、字幕与场景起止 |
| `hexagrams.ts` | 自下而上的阴阳爻数据，八卦与64个唯一组合 |
| `Artwork.tsx` | 带材质的锅、花盆剖面、笔记本、书包与卦象SVG |
| `Chrome.tsx` | 标题、字幕、逐句音轨、环境光和颗粒 |
| `Scenes.tsx` | 八段独立动画，按语音事件推进 |
| `index.tsx` | 整片时间轴和本地字体加载 |
| `SceneCompositions.tsx` | 独立场景预览注册 |
| `prepare_assets.py` | 可复现的中文配音、测时、字幕和字体子集制作 |
| `subtitles.srt` | 与语音对齐的可导入字幕 |
| `PROMPTS.md` | 用户确认后的制作提示词 |

## 分镜

1. 日子里的变化：锅、书包与笔记本依次出现，引出生活中的起步与变化。
2. 两种爻：完整横线与断线，显示名称和爻字读音，不讲阴阳的泛化价值判断。
3. 结构：自下而上三层、八种图样、上下两组、六层、64个图样。仅作结构说明，不冒充历史形成过程；图谱注明非传统卦序。
4. 文字与故事：卦有名字和文字，生活比方用于辅助理解。
5. 屯：盐撒多、火过大、菜焦黑；逐渐调火、翻菜、尝味，提醒不要用一次失败给自己下结论。
6. 需：花盆土下根须成长，随后出现嫩芽、浇水，解释等待时仍可照料。
7. 谦：熟悉的菜谱翻开空白新页，提醒继续学习、留进步空间。
8. 收束：三个卦与三个问题，最后片名与“先把眼前的日子，看清一点”。

## 原文核对与解释边界

2026-10-17从汉籍リポジトリ（Kanripo）《周易》电子文本读取核对：

| 卦 | 原文中的上下卦 | 本片引用原文（简体呈现） | 白话说明 |
| --- | --- | --- | --- |
| 屯 | 震下坎上 | 刚柔始交而难生 | 初生之际伴随艰难 |
| 需 | 乾下坎上 | 需，须也 | 须在此有等待之意 |
| 谦 | 艮下坤上 | 人道恶盈而好谦 | 人们不喜欢自满，更愿意亲近谦逊 |

原文来源：[屯第三](https://github.com/kanripo/KR1a0001/blob/master/KR1a0001_003.txt)、[需第五](https://github.com/kanripo/KR1a0001/blob/master/KR1a0001_005.txt)、[谦第十五](https://github.com/kanripo/KR1a0001/blob/master/KR1a0001_015.txt)。引用均取《彖传》，同屏给出白话说明。

做饭、种子和菜谱是现代生活类比，不是古文原有故事，也不是对各卦全部含义的概括。没有固定“人生必经顺序”，不把阴阳编码等同计算机起源，不主张预测能力或经科学验证。

`hexagrams.ts`数组从初爻到上爻存储，SVG从下往上绘制。图谱为教学排列，不是文王卦序。屯 `[1,0,0,0,1,0]`，需 `[1,1,1,0,1,0]`，谦 `[0,0,1,0,0,0]`。

## 音频与字体

- 旁白：Microsoft在线中文神经语音 `zh-CN-YunxiNeural`，语速 `+5%`，通过edge-tts逐句生成。文本在 `content.json`，实际时长由ffprobe测量。
- 屯读zhūn；对语音使用同音“谆”避免多音字误读，字幕和卦名保留“屯”。这个替换仅用于合成，不是文案。
- 字体：Noto Serif SC，SIL Open Font License。来自 [Google Fonts字体源](https://github.com/google/fonts/tree/main/ofl/notoserifsc)，许可证位于 `public/fonts/iching-life/OFL.txt`。使用按本期字符裁剪的woff2，包含可变字重，不依赖观看机器的系统中文字体。
- 资源在 `public/audio/iching-life/` 与 `public/fonts/iching-life/`，通过 `staticFile()` 引用。
- 未添加背景音乐，优先让人听清旁白。

## 预览与复现

```powershell
npm run dev
# http://localhost:3000/traditional-culture-iching-life

node --experimental-strip-types --test videos/traditional-culture/02-iching-life/content.test.mjs
npm run typecheck
npm run compositions

# 改文案或画面文字后，重建相应资源（Python 3.10+ / ffprobe）
python -m pip install edge-tts fonttools brotli
python videos/traditional-culture/02-iching-life/prepare_assets.py --speech --font
```

字体全量下载仅作为本地再生成缓存，被.gitignore排除。语音缓存签名也被忽略。
