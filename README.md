# 知识科普视频工坊

基于 Remotion、React 和 TypeScript 的科普动画工程。视频按分类和期次组织，以动画文字说明确定内容，再通过组件与帧时间轴制作、调试和导出。

当前工程已经可以运行，无需重新创建脚手架。新一期以 **`ANIMATION.md` 作为唯一说明入口**，代码、脚本与调试截图按期次归档。

开始动画前先查 [组件与特效清单](src/CATALOG.md)：已有实现优先复用，缺少时才新建。协作入口见 [AGENTS.md](AGENTS.md)。

## 快速开始

环境要求以 [package.json](package.json) 为准：Node.js ≥20；[.nvmrc](.nvmrc) 当前指定20。使用 npm 与仓库中的 `package-lock.json` 安装依赖。

在工程根目录执行：

```powershell
node --version
npm ci
npm run dev
```

打开终端显示的 Studio 地址，选择对应 Composition 预览。首次运行如果提示缺少渲染浏览器，执行 `npx remotion browser ensure` 后重试。部分素材准备脚本需要联网，首次安装与浏览器准备也需要网络。

常用检查：

```powershell
npm run typecheck
npm run compositions
```

`typecheck` 执行 TypeScript 检查；`compositions` 列出实际可渲染的视频、独立场景与封面。启动 Studio 或成功打包不能代替类型检查，也不能代替视觉验收。

## 项目结构

以下为当前工程的主要目录；各期可以按需要拆出更多场景文件。

```text
remotion/
├─ README.md                         # 工程入口与使用流程
├─ CLAUDE.md                         # 开发与归档约定
├─ package.json / package-lock.json  # 命令、依赖与锁定版本
├─ remotion.config.ts                # 渲染配置
├─ src/
│  ├─ index.ts                       # registerRoot入口
│  ├─ Root.tsx                       # 整片及独立预览注册
│  ├─ CATALOG.md                     # 公共组件、现有效果、单期候选与复用规则
│  ├─ config/theme.ts                # 共享配色、字体与布局
│  ├─ components/                    # 跨期复用的图形组件
│  ├─ lib/                           # 帧动画与摄影机工具
│  └─ world/                         # 房屋世界等复用场景模型
├─ videos/
│  ├─ README.md                      # 分类与归档说明
│  ├─ registry.ts                    # 整片登记表与元数据类型
│  ├─ _template/                     # 新一期模板，无README
│  ├─ traditional-culture/           # 传统文化科普
│  ├─ data-analysis/                 # 数据分析与统计概念科普
│  └─ ai-tools/                      # AI工具科普
├─ public/
│  ├─ fonts/<slug>/                  # 按期存放的本地字体与许可证
│  └─ audio/<slug>/                  # 按期存放的配音等音频
├─ docs/                             # 已有设计与实施记录
├─ .cache/<slug>/                    # 可再生的调试打包缓存
└─ out/                              # 最终交付：成片、正式封面
```

共享组件放 `src/`，只供某一期使用的场景、内容与工具留在该期目录。`public/` 也包含按期组织的资源；复制一期时需检查资源依赖，不能只复制TSX。

### 每期目录

```text
videos/<分类>/<序号>-<slug>/
├─ ANIMATION.md                      # 本期唯一说明入口
├─ video.json                        # 制作阶段的Composition元数据
├─ index.tsx                         # 本期组件导出与时间编排
├─ Scenes.tsx                        # 场景实现，可拆为多个文件
├─ content.json                      # 可选：文案与句子ID
├─ timeline.json                     # 可选：场景、字幕与音轨时间轴
├─ build_timeline.mjs                # 可选：时间轴生成工具
├─ prepare_assets.py                 # 可选：语音、字体等资源准备
├─ verify-frames.mjs                 # 可选：本期抽帧工具
└─ debug/
   └─ screenshots/
      ├─ latest/                     # 可覆盖的工作批次
      └─ <日期>-<版本>/               # 保留批次：截图与帧清单
```

只有脚本的选题先建立 `ANIMATION.md`，不创建占位组件或注册项。上面的JSON与工具按实际需要增加，不要求每期照搬全部文件。

新建期次及其子目录不再生成README。现有期次README和调试README保留作历史资料，工程与分类总览README继续使用。以后本期的选题、依据、素材来源、分镜、动作、调试结论、复现命令与修改历史统一写入 `ANIMATION.md`。

## 内容入口与现有视频

| 分类 | 清单 | 主要内容 |
| --- | --- | --- |
| 传统文化科普 | [INDEX.md](videos/traditional-culture/INDEX.md) | 节俗、历法、典籍及相关原理 |
| 数据分析科普 | [INDEX.md](videos/data-analysis/INDEX.md) | 数据口径、统计概念与预测检验 |
| AI工具科普 | [INDEX.md](videos/ai-tools/INDEX.md) | 工具使用与原理 |

当前整片登记如下；实际尺寸、帧数与状态以各期 `video.json` 为准。

| 主题 | 动画说明 | Composition ID | 画幅 / 帧率 | 帧数 |
| --- | --- | --- | --- | --- |
| 坐北朝南：从太阳高度角看采光 | [ANIMATION.md](videos/traditional-culture/01-zuo-bei-chao-nan/ANIMATION.md) | `traditional-culture-zuo-bei-chao-nan` | 1920×1080 / 30fps | 2180 |
| 六十四卦，原来可以这样看 | [ANIMATION.md](videos/traditional-culture/02-iching-life/ANIMATION.md) | `traditional-culture-iching-life` | 1920×1080 / 30fps | 5457 |
| 赤马重阳，六十年一遇？ | [ANIMATION.md](videos/traditional-culture/03-chi-ma-chong-yang/ANIMATION.md) | `traditional-culture-chi-ma-chong-yang` | 1080×1920 / 30fps | 3104 |

[八字预测科普](videos/data-analysis/01-bazi-prediction/ANIMATION.md)已按v0.7修订12段实体动态动画（87秒），可预览`data-analysis-bazi-prediction-vertical`及`bazi-b01`至`bazi-b12`分镜。第二、三期另有独立场景预览，第三期还有封面，完整ID通过 `npm run compositions` 查看。

<a id="registration"></a>

## 注册与文件职责

整片的注册链路是：

```text
src/index.ts → src/Root.tsx → videos/registry.ts
                                  ↓
                       本期video.json + index.tsx
```

`videos/registry.ts` 静态引入各期元数据和组件，`src/Root.tsx` 据此创建Composition。新增目录不会自动被发现，进入可运行制作阶段后必须登记。独立场景和封面目前另由 `Root.tsx` 引入的 `SceneCompositions.tsx` 注册。

| 文件 | 管理什么 |
| --- | --- |
| `ANIMATION.md` | 制作意图、准确文案、分镜与动作、依据、调试与复现记录 |
| `video.json` | Composition的ID、标题、分类、状态、尺寸、帧率与总帧数 |
| `content.json`（如采用） | 机器可读文案；修改后同步动画说明 |
| `timeline.json`（如采用） | 实际场景、字幕和音轨排期；生成后核对总帧数 |
| 分类 `INDEX.md` | 人可读清单，状态与元数据同步 |
| 场景与入口TSX | 按已确认脚本实现画面和时间编排 |

`video.json` 的 `durationInFrames` 必须等于实际场景总帧数；有时间轴时与时间轴一致。全片区间统一写作左闭右开 `[start, end)`，场景内使用局部帧，避免混淆。

状态对应：`idea`（构思）→ `writing`（撰稿）→ `animating`（制作）→ `done`（出片）→ `published`（已发布）。脚本草案未建立元数据前，以动画说明中的状态为准。

<a id="workflow"></a>

## 新建与修改一期视频

1. **选分类与目录名。** 使用 `videos/<分类>/<两位序号>-<slug>/`；目录名与ID使用ASCII，中文写入标题和文案。序号不复用，Composition ID全局唯一；新建多画幅版本可加 `-vertical`、`-square` 后缀，既有ID不为统一命名而改动。
2. **先写脚本。** 复制 [ANIMATION.md模板](videos/_template/ANIMATION.md)到本期，填写标题、受众、核心问题、完整文案、时间轴、逐镜动作和依据。分类“脚本草案”区登记即可，确认后再编码。
   编写分镜与进入实现前先查 [组件与特效清单](src/CATALOG.md)，再搜索相关源码；将直接复用、适配、提取或新建的选择记录在本期脚本。已有实现可用时直接引用，没有合适实现才新建。
3. **补齐制作文件。** 从模板取 `video.json` 和 `index.tsx`，按需增加场景、内容与时间轴；替换模板ID、日期、时长和画幅，默认导出本期组件。已有草稿目录只补缺失文件，避免覆盖已写脚本。
4. **登记整片。** 在 `videos/registry.ts` 增加本期元数据和组件import，再添加数组条目；将分类索引中的草稿移入视频清单。
5. **预览与调试。** 检查类型、注册、文字可读性、关键动作和音画同步；截图按下节放在本期，结论写回动画说明。
6. **导出与记录。** 用户确认制作结果后导出成片，补实际命令、参数、素材版本、输出位置和检查结果，同步状态。

修改已有期次时，先改动画说明与内容源，再更新资源、时间轴和画面。涉及ID或组件导出变化时同步注册引用；涉及帧数、尺寸或状态时同步元数据与分类索引。

复制为新一期时，重置ID、标题、目录、日期、状态、来源及检查记录；旧期README不作为新期文档带入。复用画面也需要重新核实本期事实与阅读时间。

## 调试截图、缓存与成品

| 文件类型 | 放置位置 | 约定 |
| --- | --- | --- |
| 调试截图、成片检查抽帧、帧清单 | 本期 `debug/screenshots/<批次>/` | 按镜头和帧号命名，不混放其他期图片 |
| 人工检查结论 | 本期 `ANIMATION.md` 的调试记录 | 写明版本、批次、发现与处理，不把生成成功当作验收通过 |
| 打包等调试缓存 | 根 `.cache/<slug>/` | 可再生，不混入截图目录 |
| 最终成片、正式封面 | 根 `out/` | 仅用于交付，不存调试图或测试片段 |

截图建议命名为 `S01-f000030.png`，同批 `frames.json` 记录图片文件名、镜头ID与全片帧号；已有抽帧工具沿用其文件名与清单格式。`latest/` 可覆盖，重要确认稿另存独立批次。历史截图可能来自旧实现，不能直接当作当前版本的验收依据。

当前第二、三期可从根目录运行抽帧工具：

```powershell
node videos/traditional-culture/02-iching-life/verify-frames.mjs
node videos/traditional-culture/03-chi-ma-chong-yang/verify-frames.mjs
```

输出在各期 `debug/screenshots/latest/`，缓存进入各自 `.cache/<slug>/review-bundle/`。这两条命令会生成截图，但仍需人工查看后记录结论。

## 预览、检查与导出

命令均从工程根目录执行。以下使用当前已注册ID：

```powershell
# 启动Studio
npm run dev

# 检查类型和可用Composition
npm run typecheck
npm run compositions

# 最终成片
npm run render -- traditional-culture-chi-ma-chong-yang out/chi-ma-chong-yang.mp4 --codec=h264

# 正式封面（独立Still）
npm run still -- chi-ma-cover out/chi-ma-chong-yang-cover.png

# 调试静帧：先准备本期目录，再输出图片
New-Item -ItemType Directory -Force videos/traditional-culture/03-chi-ma-chong-yang/debug/screenshots/latest
npm run still -- traditional-culture-chi-ma-chong-yang videos/traditional-culture/03-chi-ma-chong-yang/debug/screenshots/latest/manual-f000030.png --frame=30
```

内容或时间轴改动后的检查按期执行。当前赤马重阳使用：

```powershell
node videos/traditional-culture/03-chi-ma-chong-yang/build_timeline.mjs
python videos/traditional-culture/03-chi-ma-chong-yang/prepare_assets.py
node --experimental-strip-types --test videos/traditional-culture/03-chi-ma-chong-yang/content.test.mjs
```

最后一条测试命令需要支持 `--experimental-strip-types` 的Node版本，Node20不适用；该测试环境需Node22.6+。Python素材工具各有依赖，先查看本期说明与脚本；易经一期的语音准备还用到edge-tts、ffprobe。无需为每期执行所有其他期的资源生成脚本。

当前没有统一的 `build:all` 或批量出片脚本；批量任务需要另外实现，不能将构想当作已提供命令。

## 动画与素材约定

- 复用优先：制作前先查 `src/CATALOG.md` 与源码。公共能力直接引用，单期候选解耦后复用；新增或提取后更新清单。共享能力改动需检查旧期，避免默认值变化影响既有画面。
- 所有动画由当前帧驱动，使用项目动画工具或 `interpolate()` / `spring()`；禁用CSS animation、transition和定时器驱动的画面。
- 共享配色、字体与留距从 `src/config/theme.ts` 获取；独有场景保留在本期。
- 中文文字控制信息量、手动断行，按“完整显示后的阅读时间”验收；入场顿点不代替阅读停留。有配音按实际语音测时，无声片按实播阅读调整。
- 图形、字幕、旁白与音效按帧同步；使用Remotion媒体组件，`public/`中的资源通过 `staticFile()` 引用。
- 字体优先本地加载并等待就绪；字符子集需覆盖本期全部文案、标题和图形标签。修改文字后按需重建字体，不能直接借用其他期子集。
- 同屏多个SVG的定义ID需区分，避免渐变、遮罩互相串用。
- 事实论断、数字、年份和口径写入动画说明，演示数据、类比和虚构人物明确标注；不把动效当成证据。

## 复制、交接与回溯

[.gitignore](.gitignore)目前忽略 `node_modules/`、根 `out/`、根 `.cache/`、各期原始截图目录、字体原始下载缓存及特定语音签名文件。**Git克隆不会自动带回被忽略的本地文件**；交接时另行复制需要保留的截图、成片和资源，或记录重建方法。

每次关键确认或主线改动，记录对应代码commit；尚无提交时，可先将旧脚本归档到本期 `history/ANIMATION-v<版本>.md` 再修改。复现记录至少包含脚本版本、实际文案与时间轴、依赖锁文件、Node版本、字体和音频、渲染命令与输出参数。

`ANIMATION.md`说明制作意图；精确复现还需要对应代码和资源。复制期次目录时检查 `public/`资源与 `src/`共享组件依赖，不承诺仅凭一份Markdown就能逐像素复现。

## 常见排查

| 现象 | 先检查 |
| --- | --- |
| Studio找不到新视频 | 是否还在脚本阶段；registry是否登记；独立预览是否接入Root |
| 中文缺字、换行或导出布局异常 | 本地字体是否加载、字体子集是否更新、实际画幅与安全区 |
| 字幕或旁白错位 | 文案变更后是否重建资源与时间轴，元数据帧数是否同步 |
| 调试图片混入out | 抽帧工具与手动命令是否使用本期截图路径 |
| 更换电脑后缺素材 | 被忽略文件是否另行交接，public资源是否带齐，重建依赖是否就绪 |

项目约定见 [CLAUDE.md](CLAUDE.md)，分类与归档说明见 [videos/README.md](videos/README.md)。Remotion API细节可查 [官方文档](https://www.remotion.dev/docs)。
