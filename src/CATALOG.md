# 动画组件与特效清单

更新日期：2026-10-25。根据当前源码盘点，是新动画制作前的统一检索入口。列出实现位置、参数与限制，不把留在单期中的效果当成已经解耦的公共组件。

## 先查、再复用、最后新建

1. 按下方效果关键词找清单条目，打开对应源码核对导出、参数、尺寸、字体、音频与时间轴依赖。
2. 再搜索 `src/` 和 `videos/`，查漏补缺。**已有实现优先引用**；不得先写一份同功能实现再回头登记。
3. 公共实现适用时直接import，通过参数配置。单期候选先检查依赖：需要跨期使用时，提取成公共实现，由原期兼容导出或引用，避免把新期绑定到旧期文案和音轨。
4. 现有实现确实不适用或缺失时才新建，先在本期 `ANIMATION.md` 写明搜索词、候选与不适用原因。新实现完成后补清单；待制作中的设想不能标成可用。
5. 改动共享实现时搜索全部引用，保持旧参数与旧效果兼容，完成类型检查、Composition检查及受影响画面的对比检查。差异较大的新效果使用独立名称，保留旧实现。

```powershell
# 从工程根搜索；替换关键词，也搜索英文符号
rg -n 'Lift|Mask|Heading|文字|遮罩' src videos -g '*.ts' -g '*.tsx'
rg -n 'particle|rand|Dust|粒子' src videos -g '*.ts' -g '*.tsx'
rg -n 'Ring60|Cycle|轮盘|cameraAt|Camera' src videos -g '*.ts' -g '*.tsx'
```

本期采用什么写在本期脚本；本清单维护跨期可发现的能力。清单ID用于追踪，移动源码时更新路径，ID不随文件移动改变。

## 公共创作参考（不是组件API）

| ID | 默认参考 | 文件与说明 | 使用范围与限制 |
| --- | --- | --- | --- |
| R01 | 用户指定《运气的形状》 | [原片](../references/luck-shape/source.mp4)、[方法与时间段](../references/luck-shape/REFERENCE.md)、[元数据与校验](../references/luck-shape/manifest.json) | 今后科普内容、脚本、分镜和动画的默认参考；学习物件机制、连续演变和结果生成，不默认复制内容、音轨或色板。不代表对应效果已实现，仍须检索源码 |

## 按画面需求查找

| 需求 / 关键词 | 首查条目 | 当前情况 |
| --- | --- | --- |
| 淡入淡出、时间进度、缓动 | U01、U02 | 公共工具可直接用 |
| 文字上浮、遮罩揭示、标题、强调字 | C02、L01—L04 | 章节标签公共；其他先查单期候选 |
| 暗角、胶片颗粒、漂浮粒子、场景容器 | C01、L05、L06 | 胶片层公共；其他与单期绑定 |
| 连续镜头、推拉、平移、竖向长卷 | M01、M02、F02 | 当前Camera针对横屏；竖卷候选与单期绑定 |
| 房屋剖面、太阳、光束、进深 | C03、W01 | 公共但有固定几何与模型条件 |
| 卡片错落飞入、汇聚、弹性印章 | F01、A08 | 单期候选，需解耦数据与时间 |
| 格子依次亮起、筛选、分组坠落 | A06、F03 | 干支主题候选，格数与标签固定 |
| 轮盘、刻度、周期、年份轴 | A05、A07、F04 | 60格与年份固定，需按新主题适配 |
| SVG路径描画、根须生长、结构逐步搭建 | U03、A02、W01 | 基础工具可复用；图形依赖各自几何 |
| 古籍、纸页、引用、印章 | A03、A08、L04、F05 | 已有候选，不要另画相同效果 |
| 卦象、锅、植物、笔记本、书包、菊花 | A01—A04、A09 | 主题图形候选，不等于通用图标库 |
| 数字滚动、比特条、群像分岔、预测记录卡 | N01、A10 | 实体人物与记录卡先查八字Props；数字滚动和比特条仍无独立组件 |

## 公共工具与组件

“可直接用”指存在公共导出，不代表任意画幅、参数与主题都已验证。参数与边界仍需看源码，并按本期效果检查。

| ID | 能力 / 导出 | 源码 | 参数与限制 |
| --- | --- | --- | --- |
| U01 | 归一化缓动 `progress`、`clamp` | [lib/anim.ts](lib/anim.ts) | `frame,start,duration,easing`；duration需大于0，返回钳制进度；不提供阅读停留预算 |
| U02 | 生命周期淡入淡出 `windowOpacity` | [lib/anim.ts](lib/anim.ts) | `frame,start,end,fade=18`；区间需足够容纳淡入淡出，短区间可能无法到完全不透明 |
| U03 | 几何与插值 `deg,lerp,arcPoints,arcMidpoint` | [lib/anim.ts](lib/anim.ts) | 圆弧采用数学角度、屏幕y方向转换；`arcPoints`输出点串，不是完整描边动画；steps需大于0 |
| U04 | 确定性伪随机 `rand` | [lib/anim.ts](lib/anim.ts) | `i,salt`；相同输入固定输出，用于粒子与散布；不是逐帧变化的随机源 |
| M01 | 摄影机关键帧插值 `cameraAt,CameraKey` | [lib/camera.tsx](lib/camera.tsx) | 关键帧`at,x,y,scale`；数组非空、时间有序且不要重复，输出中心与缩放 |
| M02 | 连续摄影机容器 `Camera` | [lib/camera.tsx](lib/camera.tsx) | `frame,keys,children`；固定960/540屏幕中心和1900×1200容器，内置轻微呼吸，直接复用限匹配横屏；竖屏先参数化并保留旧默认值 |
| C01 | 电影质感叠层 `FilmLook` | [components/Backdrop.tsx](components/Backdrop.tsx) | `grain=0.05,vignette=0.62`；含静态噪声、暗角与顶部压暗，顶部颜色取`palette.bg`，不是运动粒子 |
| C02 | 章节标签 `SectionLabel` | [components/SceneHeader.tsx](components/SceneHeader.tsx) | `index,title,frame,start,end?,align?`；22帧进入，可选退出；字号固定19，竖屏需先评估可读性 |
| C03 | 静态采光剖面 `RoomSection` | [components/RoomSection.tsx](components/RoomSection.tsx) | `elevation,accent?,idPrefix?`；角度单位度，避免0°等退化输入；多实例传不同前缀；viewBox1000×620，模型窗上沿离地2.4米 |
| C04 | 可配置材质纸张 `PaperSheet,SheetColors` | [components/material/PaperSheet.tsx](components/material/PaperSheet.tsx) | 从A10 Paper提取；显式传colors，支持w/h/mark/dark/style/children。默认340×430，外阴影和内边距；多页传独立children，不含字体加载或时间轴。原八字Paper包装保持默认主题；本期作品和来信复用 |
| W01 | 连续房屋世界 `HouseWorld` | [world/HouseWorld.tsx](world/HouseWorld.tsx) | `frame,elevation,build,protractor,beam,depth,grid,ghost?,ghostOpacity?,dust?`；多个0—1进度控制，固定1900×1400世界与建筑模型；光束、尘埃等内部组件未独立导出 |
| T01 | 共享主题 `palette,font,layout,ichingTheme,lifeKlineTheme,lifeListingTheme,ganzhiTheme` | [config/theme.ts](config/theme.ts) | 包含纸感/暖色、黑金、人生K线及干支生活独立主题；ganzhiTheme新增导出保留旧默认值，GanzhiSans/GanzhiSerif由本期加载；主题内字体族不等于完成字体加载 |

### 最小引用示例

以下为新一期组件中的代码片段，导入层级对应 `videos/<分类>/<期次>/`。引用同一实现，不把源码复制到每期。

```tsx
import {progress, windowOpacity, rand} from '../../../src/lib/anim';
import {FilmLook} from '../../../src/components/Backdrop';
import {SectionLabel} from '../../../src/components/SceneHeader';

// 在已有组件中取得frame后：
const reveal = progress(frame, 12, 24);
const opacity = windowOpacity(frame, 0, 150, 12);
const fixedX = rand(0, 7) * 800;

// 放入场景JSX：
<SectionLabel index="01" title="提出问题" frame={frame} start={0} end={150} />
<FilmLook grain={0.03} vignette={0.45} />
```

`FilmLook`放置层级会影响整体画面；上述示例不是完整可渲染场景。先检查主题、字号与留白，不假定这些默认值适合所有新视频。

## 单期候选：已有实现，跨期前需核对或解耦

这些能力已经存在，不应从零重造；但目前保留在原期，**不承诺直接跨期import就能正确工作**。名称相同的横竖版组件也不能盲目互换。

### 文字、布局与背景

| ID | 能力 / 符号 | 源码 | 复用前需处理 |
| --- | --- | --- | --- |
| L01 | 上浮淡入 `Lift` | [公共Lift](components/motion/Lift.tsx)；易经/重阳Chrome兼容导出 | 已提取；at=10、duration=28、distance=46为旧默认，支持children/style；本期用duration=12/distance=0。无单期内容/音轨依赖 |
| L02 | 遮罩上推 `Mask` | [采光Scenes](../videos/traditional-culture/01-zuo-bei-chao-nan/Scenes.tsx) | 局部未导出；`frame,start,end?,duration?,out?,children,style?`，遮罩内位移112%；提取时保留当前显隐语义 |
| L03 | 标题/小字/强调 `Heading,Small,Gold,Kicker,Rule` | [易经Chrome](../videos/traditional-culture/02-iching-life/Chrome.tsx)、[重阳Chrome](../videos/traditional-culture/03-chi-ma-chong-yang/Chrome.tsx) | 字号、行高、字体与横竖版不同；Kicker和Rule在重阳模块。移除本期字体依赖后传主题与排版参数 |
| L04 | 引文与解释 `Quote,ExampleHeading` | [重阳Chrome](../videos/traditional-culture/03-chi-ma-chong-yang/Chrome.tsx)、[易经Chrome](../videos/traditional-culture/02-iching-life/Chrome.tsx) | Quote接收`quote,source,gloss,at`；ExampleHeading还绑定卦象数据、横屏布局；抽离通用引用样式，保留专题包装 |
| L05 | 场景容器、进度、字幕、漂浮粒子 `SceneShell` | [易经Chrome](../videos/traditional-culture/02-iching-life/Chrome.tsx)、[重阳Chrome](../videos/traditional-culture/03-chi-ma-chong-yang/Chrome.tsx) | 均直接读取本期timeline和content；易经版本会播放本期音频且底部字幕display:none，重阳版本无音轨、按句显示字幕；不可误把两者当相同壳 |
| L06 | 文图区域 `TextArea,ArtArea,Artboard` | [易经Chrome](../videos/traditional-culture/02-iching-life/Chrome.tsx)、[重阳Chrome](../videos/traditional-culture/03-chi-ma-chong-yang/Chrome.tsx)、[易经Artwork](../videos/traditional-culture/02-iching-life/Artwork.tsx)、[重阳Artwork](../videos/traditional-culture/03-chi-ma-chong-yang/Artwork.tsx) | 横屏与竖屏坐标不同，SVG viewBox分别1000×720和904×760；提取时显式传布局与viewBox |
| L07 | 关键词着色 `rich` 与颜色透明度 `alpha` | [重阳Chrome](../videos/traditional-culture/03-chi-ma-chong-yang/Chrome.tsx)、[易经Artwork](../videos/traditional-culture/02-iching-life/Artwork.tsx)、[重阳Artwork](../videos/traditional-culture/03-chi-ma-chong-yang/Artwork.tsx) | rich局部解析`*词*`并用金色渲染；alpha两期重复，假定输入六位hex，不能通用处理任意CSS颜色；跨期提取时保留输入约定 |

### 专题SVG与对象动画

| ID | 能力 / 符号 | 源码 | 参数与边界 |
| --- | --- | --- | --- |
| A01 | 卦象逐层显现 `Hexagram`，卦象数据 | [易经Artwork](../videos/traditional-culture/02-iching-life/Artwork.tsx)、[hexagrams](../videos/traditional-culture/02-iching-life/hexagrams.ts) | `lines,x,y,width,height,color,opacity,reveal,focus`；lines非空，自下而上存储；绘制需SVG容器，图谱为教学排列 |
| A02 | 植物、根须描画、浇水 `Plant` | [易经Artwork](../videos/traditional-culture/02-iching-life/Artwork.tsx) | `frame,growth,water?`；内部SVG剪裁与固定几何，增长进度而非真实生物模型 |
| A03 | 笔记本开合 `Notebook` | [易经Artwork](../videos/traditional-culture/02-iching-life/Artwork.tsx) | `frame,opening,small?`；颜色和图形固定，需SVG上下文 |
| A04 | 锅与蒸汽 `Pot`、书包呼吸 `Schoolbag` | [易经Artwork](../videos/traditional-culture/02-iching-life/Artwork.tsx) | Pot接收`frame,settle?,small?`；Schoolbag接收frame；不是已参数化的任意物体动画 |
| A05 | 六十格刻度圆环 `Ring60` | [重阳Artwork](../videos/traditional-culture/03-chi-ma-chong-yang/Artwork.tsx) | `cx,cy,r,reveal,highlight?,color?,opacity?`；格数固定60，高亮色仍取主题；不是任意分段圆环 |
| A06 | 10×12格筛选 `ParityGrid` | [重阳Artwork](../videos/traditional-culture/03-chi-ma-chong-yang/Artwork.tsx) | `appear,lit,dim`；固定干支配对逻辑；不能当任意数据网格直接用 |
| A07 | 年份轴描线 `YearTrack` | [重阳Artwork](../videos/traditional-culture/03-chi-ma-chong-yang/Artwork.tsx) | `reveal,nodes,bracket`；年份与坐标固定，先参数化数据 |
| A08 | 古籍、印章、日历 `Book,Seal,CalendarCard` | [重阳Artwork](../videos/traditional-culture/03-chi-ma-chong-yang/Artwork.tsx) | Book用`open,marks,seal`，Seal支持文字/位置/缩放/旋转，CalendarCard用`reveal,stamp`；古籍内容与日历日期有本期语境 |
| A09 | 菊花花瓣生长、火焰、人物标签 `Chrysanthemum,Flame,NameTag` | [重阳Artwork](../videos/traditional-culture/03-chi-ma-chong-yang/Artwork.tsx) | Chrysanthemum用`cx,cy,r,reveal,petals?`；Flame是图形，不等于独立火焰模拟；NameTag用`name,at,frame` |

| A10 | 八格、实体人物、纸张、书本、封套、规则锁和接触碎片 | [八字Props](../videos/data-analysis/01-bazi-prediction/Props.tsx)、[Stage](../videos/data-analysis/01-bazi-prediction/Stage.tsx) | v0.5替代旧薄线Artwork（归档zip内）；CSS透视/SVG材质，受baziTheme与1080×1920布局约束；Place、CameraRig适合本期空间演示，跨期复用先参数化主题与画幅 |

### 完整场景里的效果配方

以下是组合效果参考，**不是已存在的独立公共API**。抽离动作与视觉参数，文案、时间轴与专题数据留在本期。

| ID | 效果 / 关键词 | 当前实现 | 主要绑定 |
| --- | --- | --- | --- |
| F01 | 卡片弹性飞入 → 错落悬浮 → 吸入汇聚 → 印章落定 | [HookStormScene.tsx](../videos/traditional-culture/03-chi-ma-chong-yang/HookStormScene.tsx) | 虚构朋友圈NOTES、本期cueAt、固定画板、30fps弹簧参数 |
| F02 | 竖卷一镜到底、镜头沿内容移动 | [ScrollScene.tsx](../videos/traditional-culture/03-chi-ma-chong-yang/ScrollScene.tsx) | 固定1080×4000世界、摄影机关键帧、重阳图形与字幕节拍 |
| F03 | 配对棋盘、格子弹性坠落与筛选 | [SceneSixty.tsx](../videos/traditional-culture/03-chi-ma-chong-yang/SceneSixty.tsx) | 十干十二支、固定网格与句子事件，使用SVG剪裁 |
| F04 | 周期轮盘转动、停靠、年份标记 | [SceneCycle.tsx](../videos/traditional-culture/03-chi-ma-chong-yang/SceneCycle.tsx) | 60格、年份、固定半径中心和时间段；不能替代A05的小图形组件 |
| F05 | 碰撞标题、古籍年份标记、印章强调 | [SceneChima.tsx](../videos/traditional-culture/03-chi-ma-chong-yang/SceneChima.tsx) | 赤马红羊文案、历史年份、原始局部帧，需拆出动作与数据 |
| F06 | 刻度环淡出、祝福字出现、秋景收尾 | [EndingBlessingScene.tsx](../videos/traditional-culture/03-chi-ma-chong-yang/EndingBlessingScene.tsx) | 本期第七段索引、重阳文案与固定时间；其他Ending文件不等于当前整片正在使用 |

### 人生K线单期候选（2026-10-20）

| ID | 能力 / 导出 | 源码 | 参数与限制 |
| --- | --- | --- | --- |
| A11 | 投影实体、光束、核心球体、空间圆环、旋转机会矩阵 `Solid,Beam,LifeNode,Ring,OpportunityMatrix,project,rotate` | [Geometry.tsx](../videos/data-analysis/02-life-kline/Geometry.tsx) | 显式传center/size/view/frame等；SVG上下文与lifeKlineTheme绑定；Matrix光晕依赖父级life-matrix-glow定义（当前Mechanisms.Material提供）；LifeNode可传orbit=false，默认true保留旧稿行为。逐实体面片排序，非场景级物理/遮挡引擎；跨期先参数化主题、defs与字体，不导入专题content |
| F09 | 历史稿（用户否定，不作默认风格）：K线急坠→底座展开→身体嵌合/技能拼装/现金缓冲→机会急刹 | [Artwork.tsx](../videos/data-analysis/02-life-kline/Artwork.tsx)、[Scenes.tsx](../videos/data-analysis/02-life-kline/Scenes.tsx) | 专题1080×1920/30fps/44秒，绑定content和scene索引；Sparks是SVG方向火花与椭圆冲击波，非通用粒子系统；复用前提取动作参数及素材依赖 |
| A12 | 历史稿（用户反馈像维修宣传，非默认方案）：铰接资产、电池供能、分片齿轮装配、现金流缓冲 `AssetWorld,Battery,Skills,Cash,reserveAt` | [AssetWorld.tsx](../videos/data-analysis/02-life-kline/AssetWorld.tsx)、[Mechanisms.tsx](../videos/data-analysis/02-life-kline/Mechanisms.tsx)、[motion.ts](../videos/data-analysis/02-life-kline/motion.ts) | v2.1 / 1080×1920 / 30fps / 2220帧；专题候选，依赖A11、lifeKlineTheme、固定世界坐标与事件表；Material的asset-* defs仅挂载一次。收支事件守恒、断流后消耗留存；齿轮属示意传动，非物理引擎；跨期先解耦尺寸、主题、时间轴与defs |
| A13 | 人生K线、睡眠运动、练习成作品、生活备用金、招聘窗口 `Chart,RestAndMove,Portfolio,LivingReserve,OpportunityGate,ListingWorld,stagePose` | [ListingChart.tsx](../videos/data-analysis/02-life-kline/ListingChart.tsx)、[ListingObjects.tsx](../videos/data-analysis/02-life-kline/ListingObjects.tsx)、[ListingWorld.tsx](../videos/data-analysis/02-life-kline/ListingWorld.tsx)、[OpportunityGate.tsx](../videos/data-analysis/02-life-kline/OpportunityGate.tsx) | v3.3暖金/米白，1080×1920/30fps/2520帧；持续真实形态蜡烛图，多段反弹后震荡下行到低点，手工情境非真实价格；收支事件守恒，PaperSheet复用C04、回弹复用U05；睡眠先于运动，stagePose保证前段退出；招聘门开合与脚步停在门外，不保证录用。专题坐标、帧区间、字体与文案绑定；跨期先提取参数，不把本期数据当预测模型 |

当前预览：`data-analysis-life-kline-vertical`，活跃入口为ListingWorld，复用U01/U03/U04/L01/C04/T01。F09/A12均为用户否定的历史方案；旧Geometry、AssetWorld保留追溯，不在入口导入。

### 干支生活单期候选（2026-10-25）

| ID | 能力 / 导出 | 源码 | 参数与限制 |
| --- | --- | --- | --- |
| A14 | 手机、生肖贺卡、精密干支开场、金色奔马图形、逐日累积台历、笔顺落款、出生信息结构卡、婚书式婚期安排、参考图式婚礼、搬家货车与入户空间 | [Props.tsx](../videos/traditional-culture/04-ganzhi-modern-life/Props.tsx)、[motion.ts](../videos/traditional-culture/04-ganzhi-modern-life/motion.ts)、[World.tsx](../videos/traditional-culture/04-ganzhi-modern-life/World.tsx)、[LaterScenes.tsx](../videos/traditional-culture/04-ganzhi-modern-life/LaterScenes.tsx)、[Scenes.tsx](../videos/traditional-culture/04-ganzhi-modern-life/Scenes.tsx) | 1080×1920、30fps；v0.7为143秒。绑定ganzhiTheme、本期时间轴及已核实2026日期。马形用侧面头颈、躯干、鬃尾与四肢的本期矢量图，大图小图共用；婚书纸页复用C04 PaperSheet，边框、囍印与时序留在A14；其余复用U01/U02/M01/C01；笔顺数据带Arphic许可。本期开场、婚礼与搬家场景是局部矢量叙事，不是通用动物图标、历史文物复刻、命盘／择日引擎或物理系统；跨期前需解耦数据、动作与时序 |

## 尚未实现的需求（缺口记录）

| ID | 需求 | 核对结论 |
| --- | --- | --- |
| N01 | 数字滚动、BitBar、通用文字打字机 | 尚无独立导出；人物/路径和预测卡已有单期实现见A10，不能再视为源码缺失 |

此区只记录缺口，不是待办承诺。安装了某个依赖也不等于项目已有对应组件。

## 现有预览与核对方式

运行 `npm run dev`，通过 `npm run compositions` 查看准确ID。当前可参考：

| 效果 | 现有Composition |
| --- | --- |
| 连续摄影机、采光世界 | `traditional-culture-zuo-bei-chao-nan` |
| 卦象搭建 | `iching-life-03-build` |
| 锅、根须与笔记本 | `iching-life-05-cooking`、`iching-life-06-seed`、`iching-life-07-learning` |
| 卡片汇聚 | `chi-ma-01-hook` |
| 棋盘坠落 | `chi-ma-03-sixty` |
| 周期轮盘 | `chi-ma-04-cycle` |
| 古籍与碰撞 | `chi-ma-05-chima` |
| 竖卷 | `chi-ma-06-chongyang-v2` |
| 收尾 | `chi-ma-07-ending` |

现有截图归各期 `debug/screenshots/`，旧图只作参考，不能代替提取后的对比验收。此清单尚未建立独立公共效果展示Composition，不要把上述单期预览称为组件展示库。

## 目录分工与扩展规则

当前 `src/` 与 `videos/` 分工适合继续使用。本次新增清单与规则入口，不搬动运行时代码或改变导入路径，避免为分类重排打断历史期次。

| 能力 | 当前 / 后续放置规则 |
| --- | --- |
| 共享数值、几何、帧进度 | `src/lib/`；现有anim与camera路径保持 |
| 共享布局、文字与视觉组件 | `src/components/`；现有文件保持；首次抽离成组能力时可建`motion/`、`text/`、`layout/`子目录 |
| 共享专题图形 | 有跨期实际需求时在`src/components/illustrations/`增加对应模块，不提前创建空目录 |
| 大型连续场景模型 | `src/world/`，例如HouseWorld |
| 共享主题与布局令牌 | `src/config/` |
| 专属叙事、数据、素材准备、时间轴 | 留在`videos/<分类>/<期次>/` |

不另开一套与 `components/` 语义重叠的 `effects/` 顶层目录，不建立引入所有单期代码的运行时“大总表”。本清单是文档索引，实际import指向具体公共模块。

### 新增或提取后的登记要求

- 给条目分配稳定ID；记录用途、导出名、真实路径、参数、画幅和依赖限制。
- 参数、默认值或路径变动时同步清单与本期脚本；提取候选成功后将其指向公共实现，不能只留下旧路径。
- 不扩写现有能力：例如固定60格不能记成任意格数，组件内部绘制的粒子不能记成已导出的粒子系统。
- 抽离时去除单期content、timeline、字体资源与文案导入；无法去除的依赖需在条目里明确保留。
- 保留原期默认行为与调用方式，必要时原路径兼容导出；搜索引用后复验旧期关键画面。兼容导出不是版本冻结，若需永久保留不同视觉，应明确分版本并记录。

## 修改记录

| 日期 | 变化 | 验证边界 |
| --- | --- | --- |
| 2026-10-19 | 首次盘点公共能力、单期候选和缺口；补复用优先流程 | 源码核对；本次不改运行时实现、不声称所有效果已跨期验证 |

- 2026-10-19：L01提取公共模块，A10登记本期图形。两期旧默认保持并各渲染1帧检查；未做旧全片像素回归。当时的八字预览为`bazi-s01`至`bazi-s18`（现已由B01—B12替换）。

### 2026-10-19 · 八字动态重做

- U05：[settle](lib/physical-motion.ts)，从F01提取的弹性进度，参数frame/at/fps/damping/stiffness；默认13/150，HookStormScene继续引用相同默认。
- A10转为本期2.5D物件实现，旧Artwork在本期history/code-v0.4.zip；不是全局3D或物理引擎。
- F07：[Perception](../videos/data-analysis/01-bazi-prediction/Perception.tsx)，纸片复制、选择性聚光、镜头拉远与记录归档；本期content/位置绑定，复用前解耦。预览bazi-b05/bazi-b06/bazi-b07。
- F08：[Experiment](../videos/data-analysis/01-bazi-prediction/Experiment.tsx)，预测封存、翻面、判定锁合与成对比较；绑定本期流程和文案，预览bazi-b08至bazi-b12。

- v0.7：F08的Compare已改为同案例分流、两侧信息处理、封存及共同规则台；Finale提供信息撤去与未揭晓封套的悬念构图。仍绑定本期content与时间轴，公共物件无改动。

- 2026-10-20：登记A11投影几何与F09人生K线配方，T01追加独立lifeKlineTheme。新片关键帧检查，旧Composition列表可用；未声称旧片全帧回归。

- 2026-10-20：登记A12连续剖面专题候选；A11 LifeNode增加默认兼容的orbit选项。v2.1工程及抽帧检查，完整动态实播与音效验收尚未完成。

- 2026-10-20：v3.0登记A13暖金K线与具体自我投入；提取C04 PaperSheet，八字Paper保留包装，6种输入下纸张HTML/样式相同，旧片900帧整体画面提取前后像素一致。新增独立lifeListingTheme，完整动态与音效验收尚未完成。

- 2026-10-20：A13升级v3.1，修正旧道具永久保留造成串场；顺序睡眠/运动、练习翻成作品、钱包弧线收支、招聘门替换邀请卡。复用U05/C04，未修改公共实现；2520帧可见状态和库存检查、30张抽帧，完整播放及音效待验收。

- 2026-10-20：A13/T01本期标题与K线间距集中配置，收拢图表保留原位置，仅展开时渐增25px偏移；没有修改共享动画组件或其他期主题。

- 2026-10-21：A13增加showIncidents可选参数（默认true，正片兼容）；本期[Cover.tsx](../videos/data-analysis/02-life-kline/Cover.tsx)复用Chart、T01和本地宋体，提供1080×1920手机与1920×1080PC两种Still独立排版。专题固定文案与坐标，跨期先参数化；原有正片导出不变。
