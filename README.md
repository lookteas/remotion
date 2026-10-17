# 知识科普视频工坊（Remotion）

用 React + TypeScript 以代码方式制作知识科普视频。所有画面、动画、字幕、音轨都由组件和时间轴驱动，可版本化管理、可复用模板、可批量出片。

> 当前目录尚未初始化脚手架，第 2 节是第一步要做的事。

---

## 1. 为什么用 Remotion 做科普

| 传统剪辑 | Remotion |
| --- | --- |
| 手工拖时间轴，改一个字要重剪 | 文案即数据，改数据即出片 |
| 模板复用靠拷工程 | 组件化，一个 `<TitleCard />` 全系列通用 |
| 多语言/多尺寸要重做 | 一份内容，多个 `Composition` 输出不同比例 |
| 无法接入自动化 | CLI + 参数注入，可跑在 CI 里 |

适合的场景：数据可视化讲解、原理图解动画、系列化栏目片头、图文+旁白的知识短视频、程序化生成的教学动画。
不适合：需要真人实拍、复杂手绘逐帧、重度调色的片子。

---

## 2. 快速开始

### 环境要求

| 项 | 要求 | 说明 |
| --- | --- | --- |
| Node.js | **≥ 20**（建议 20 / 22 LTS） | 低于 20 会因依赖与工具链不兼容而失败，不要用 18 |
| npm | ≥ 10 | 或 pnpm ≥ 8，二者任选 |
| 网络 | 能访问外网 | 首次渲染会下载 Chrome Headless Shell 与 FFmpeg |

建议在仓库根放 `.nvmrc`（内容 `20`）或在 `package.json` 写 `"engines": { "node": ">=20" }`，让版本要求可被工具链校验。

```bash
node -v   # 先确认版本，v20.x 或更高
```

### 初始化

在当前目录执行（`--` 后的 `.` 表示装进当前目录）：

```bash
npx create-video@latest --blank .
npm install
npx remotion studio
```

Studio 会打开浏览器预览。确认能跑通后，再按第 3 节的结构改造。

初始化完成后请依次完成三件事：

1. 建 `videos/` 目录结构（见第 3 节），把 `videos/registry.ts` 接到 `src/Root.tsx`
2. 把 `src/Root.tsx` 改成遍历 registry 的写法（见第 5 节）
3. 复制 `videos/_template/` 跑通第一期视频，验证整条链路

> 如果当前目录非空或初始化失败，可先在一个空目录生成，再把 `package.json`、`tsconfig.json`、`remotion.config.ts`、`src/` 拷过来。

---

## 3. 目录结构（目标形态）

```text
remotion/
├─ videos/                    # 所有视频内容，按二级分类归档
│  ├─ README.md               # 分类总览（从这里开始看）
│  ├─ registry.ts             # 所有成片的登记处
│  ├─ _template/              # 视频骨架，复制即用
│  ├─ data-analysis/          # 数据分析科普
│  │  ├─ INDEX.md             # 该分类的视频清单
│  │  └─ 01-<slug>/           # 一期视频（独立目录）
│  ├─ traditional-culture/    # 传统文化科普
│  └─ ai-tools/               # AI 工具科普
├─ public/                    # 全片共用的静态素材
│  ├─ fonts/                  # 中文字体文件
│  └─ audio/                  # 通用 BGM、音效
├─ src/
│  ├─ index.ts                # 入口，registerRoot(RemotionRoot)
│  ├─ Root.tsx                # 读取 videos/registry.ts 注册 Composition
│  ├─ config/
│  │  ├─ theme.ts             # 配色、字号、间距、动效时长
│  │  └─ brand.ts             # 片头片尾、Logo、栏目名
│  ├─ components/             # 跨分类复用积木
│  │  ├─ Title.tsx
│  │  ├─ Subtitle.tsx         # 逐句字幕
│  │  ├─ BulletList.tsx       # 逐条浮现的要点
│  │  ├─ Diagram.tsx          # 示意图 / 流程图
│  │  ├─ Callout.tsx          # 重点强调框
│  │  ├─ Transition.tsx       # 转场
│  │  └─ charts/              # 数据类图表（数据分析分类专用）
│  ├─ scenes/                 # 通用场景（片头、章节页、片尾）
│  └─ lib/
│     ├─ timeline.ts          # 场景时长计算、时间轴工具
│     ├─ text.ts              # 断句、标点处理、CJK 换行
│     └─ fonts.ts             # 字体加载
├─ remotion.config.ts         # 渲染默认参数
├─ README.md                  # 本文件：工程与制作指南
└─ package.json
```

核心思想：**内容与表现分离**，且**内容按分类归档**。

- 通用能力（主题、组件、场景、工具函数）放 `src/`，跨分类复用。
- 每期视频的全部内容、素材、脚本放自己的 `videos/<分类>/<序号>-<slug>/` 目录，互不干扰，删掉一期不影响其他。
- 分类的收录范围、视频清单写在 `videos/<分类>/INDEX.md`，是所有期次的索引入口。

> 完整结构与命名规则见 [videos/README.md](videos/README.md)。

---

## 4. 核心概念速查

```tsx
// Root.tsx —— 遍历 videos/registry.ts，把每一期登记成独立 Composition
import { videos } from '../videos/registry';

export const RemotionRoot: React.FC = () => (
  <>
    {videos.map(({ meta, component }) => (
      <Composition
        key={meta.id}
        id={meta.id}                        // 如 data-analysis-sky-is-blue
        component={component}
        durationInFrames={meta.durationInFrames}
        fps={meta.format.fps}
        width={meta.format.width}
        height={meta.format.height}
      />
    ))}
  </>
);
```

```tsx
// 帧驱动动画的三个基本件
const frame = useCurrentFrame();            // 当前帧
const { fps, durationInFrames, width } = useVideoConfig();

const opacity = interpolate(frame, [0, 20], [0, 1], {
  extrapolateRight: 'clamp',
});
const scale = spring({ frame, fps, config: { damping: 200 } });
```

```tsx
// 按帧排布多个场景，不必手算偏移
<Series>
  <Series.Sequence durationInFrames={120}><Intro /></Series.Sequence>
  <Series.Sequence durationInFrames={300}><Content /></Series.Sequence>
  <Series.Sequence durationInFrames={150}><Outro /></Series.Sequence>
</Series>

// 局部叠加（字幕、水印、贴图）
<Sequence from={60} durationInFrames={90}>
  <Callout text="注意这一点" />
</Sequence>
```

```tsx
// 图片/音频一律走 staticFile
<Img src={staticFile('images/cell.png')} />
<Audio src={staticFile('audio/narration.mp3')} />
```

常用 API 一览：

| API | 用途 |
| --- | --- |
| `useCurrentFrame()` | 取当前帧号，一切动画的起点 |
| `interpolate()` / `spring()` | 线性插值 / 弹性动效 |
| `Sequence` / `Series` | 时间偏移 / 顺序排布 |
| `AbsoluteFill` | 铺满画布的定位容器 |
| `staticFile()` | 引用 `public/` 下的资源 |
| `Img` / `Audio` / `OffthreadVideo` | 媒体组件（保证渲染期同步） |
| `delayRender()` / `continueRender()` | 字体、接口等异步资源就绪后再截图 |
| `calculateMetadata()` | 根据 props 动态算时长、尺寸 |
| `getInputProps()` | 渲染时通过 CLI 注入内容 |

---

## 5. 视频是怎么被注册的（`videos/registry.ts`）

这是整个工程最关键的一条机制，接手的人必须先理解它。

### 为什么不能"扫目录"

`npx remotion studio` 和 `npx remotion render` 的执行流程是：**esbuild 打包 `src/index.ts` → 交给无头浏览器执行 → 逐帧截图**。浏览器里没有文件系统，所以"`videos/` 下面有哪些视频"必须在打包时就确定。Remotion 无法在运行时扫描目录发现视频。

解决办法是手写一份登记表：`videos/registry.ts` 用静态 `import` 把每期视频的元数据和组件引进来，`src/Root.tsx` 遍历这张表注册 `<Composition />`。

```ts
// videos/registry.ts
export type VideoEntry = {
  meta: VideoMeta;              // 来自该期的 video.json
  component: ComponentType;     // 该期目录下 index.tsx 的默认导出
};

export const videos: VideoEntry[] = [
  { meta: metaSkyIsBlue, component: SkyIsBlue },
];
```

```tsx
// src/Root.tsx —— 只需写一次，之后新增视频不用改这里
import { videos } from '../videos/registry';

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
  </>
);
```

### 它带来的三个结果

| 结果 | 说明 |
| --- | --- |
| 不登记就不会出现 | 目录建好了但没写进 registry，Studio 列表和 `remotion render` 都找不到它 |
| 打包时全量类型检查 | 所有期次都被静态引入，任何一期的 TS 错误会在 `npx remotion studio` 启动时报出 |
| 批量脚本的唯一索引 | `scripts/render-all.mjs` 直接 `import { videos }`，按 `status` / `category` 过滤后批量渲染 |

> 期数涨到几十上百、打包明显变慢时，再考虑把静态 `import` 换成 `lazyComponent` 按需加载。当前规模不需要。

### `video.json` 的要求

- `tsconfig.json` 需开启 `"resolveJsonModule": true`（`create-video` 生成的配置默认已有）。
- JSON 的字段必须与 `VideoMeta` 类型一致，否则 TS 报错。
- `id` 全局唯一，格式 `<分类>-<slug>`；重名会导致 Composition 冲突。

---

## 6. 使用流程

从零做一期视频的完整步骤。每一步都有明确的产出，漏掉后面对应编号的步骤就会出现"视频不在列表里"或"清单与实际不符"。

### A. 新增一期视频

**1. 复制模板**

```bash
cp -r videos/_template videos/<分类>/<序号>-<slug>
```

例：`videos/data-analysis/01-sky-is-blue`

**2. 改元数据** `video.json`

至少改 `id`、`title`、`category`、`slug`、`summary`、`status`、`createdAt`、`durationInFrames`。

**3. 改组件** `index.tsx`

把组件名改成有意义的名字（如 `SkyIsBlue`），并保持默认导出。

**4. 登记** `videos/registry.ts`

```ts
import metaSkyIsBlue from './data-analysis/01-sky-is-blue/video.json';
import SkyIsBlue from './data-analysis/01-sky-is-blue';

export const videos: VideoEntry[] = [
  { meta: metaSkyIsBlue, component: SkyIsBlue },
];
```

**5. 更新清单** `videos/<分类>/INDEX.md`

在表格里补一行：序号、目录、Composition ID、主题、内容概要、时长、状态。

**6. 重写本期** `README.md`

选题、目标观众、脚本分镜表、素材与来源。删掉模板里的"复制后要做的事"。

**7. 预览**

```bash
npx remotion studio
```

Studio 左侧列表应出现新的 Composition ID。**看不到 = 第 4 步没做对。**

**8. 出片**

```bash
npx remotion render data-analysis-sky-is-blue out/sky-is-blue.mp4
```

**9. 收尾**

- 状态改到 `出片`（`video.json` 与 `INDEX.md` 同步）
- 导出封面：`npx remotion still <id> out/cover.png --frame=45`

### B. 修改已有视频

只改该期目录内部的文件，**不需要动 registry**（除非改了 `id`）。改完直接重渲染即可。

要改 `id` 时，同步改 `video.json`、registry、`INDEX.md` 三处。

### C. 删除一期视频

1. 从 `videos/registry.ts` 移除对应 import 与条目
2. 删掉 `videos/<分类>/<序号>-<slug>/` 整个目录
3. 从 `INDEX.md` 删掉那一行
4. 保留序号不复用（删了 `03-` 就空着，避免旧链接和成片文件名混乱）

### D. 新增一个分类

1. 建目录 `videos/<kebab-name>/`
2. 复制一份 `INDEX.md`，改标题、定位、收录范围
3. 在 `videos/README.md` 的分类总表加一行
4. 分类目录名、Composition 前缀、`video.json` 的 `category` 三者保持一致

### 状态一致性

同一期视频的状态同时存在于三处，容易漂移。约定：

| 位置 | 作用 | 权威性 |
| --- | --- | --- |
| `video.json` 的 `status` | 机器可读，脚本按它过滤 | **以此为准** |
| `INDEX.md` 表格 | 人看的索引 | 同步更新 |
| 目录实际内容 | 是否真有代码和素材 | 事实 |

---

## 7. 做科普视频的约定

### 节奏

- 默认 30fps，1080p。科普短视频 60–180 秒最常见。
- 一个信息点停留 3–6 秒；每个场景尽量只讲一件事。
- 文字入场动画 12–24 帧，转场 15–20 帧，别拖。
- 语速按旁白实测时长反推场景帧数，而不是先定时长再配音。

### 画面

- 安全边距至少 5%，竖版留出上下平台 UI 遮挡区。
- 正文优先大字少字：一行不超过 18 个汉字，一屏不超过 5 行。
- 同屏动画不超过 2 个焦点；背景动效降饱和、降速度。
- 配色统一在 `config/theme.ts`，只改一处全片生效。

### 字幕

- 字幕按句子切分并带时间戳，存进内容 JSON，不要硬编码在组件里。
- 中文没有空格，`text-wrap: balance` 效果有限，建议按标点手动断句后在组件里分行。
- 字幕安全区底部留 100–150px（横版）。

### 音频

- 旁白、BGM、音效分轨放 `public/audio/`，音量在组件里显式设置（BGM 建议 −18 ~ −24 dB）。
- 用 `<Audio>` 而非原生 `<audio>`，否则渲染时会丢帧。
- 音画对齐靠帧号，避免用 `setTimeout`。

### 多个平台版本

同一期内容注册多个尺寸的 Composition，用 id 后缀区分：

| id | 尺寸 | 用途 |
| --- | --- | --- |
| `data-analysis-sky-is-blue` | 1920×1080 | B站、YouTube |
| `data-analysis-sky-is-blue-vertical` | 1080×1920 | 抖音、小红书、Shorts |
| `data-analysis-sky-is-blue-square` | 1080×1080 | 视频号、朋友圈 |

同一期视频的多个尺寸共享同一个组件和素材，布局用响应式（读 `useVideoConfig()` 的 width/height 切换字号与排版），而不是各写一套。

---

## 8. 中文字体（最容易踩的坑）

Remotion 用无头浏览器截图，**系统字体不可靠**，中文尤其明显。推荐做法：

1. 把字体文件（`.woff2` / `.ttf`）放到 `public/fonts/`。
2. 用 `delayRender()` 等待加载完成：

```tsx
const [handle] = useState(() => delayRender());
useEffect(() => {
  const font = new FontFace('SourceHanSans', `url(${staticFile('fonts/SourceHanSansSC.woff2')})`);
  font.load().then((f) => {
    document.fonts.add(f);
    continueRender(handle);
  });
}, [handle]);
```

3. 全局样式里指定 `fontFamily: 'SourceHanSans'`。
4. 渲染机器和本地用同一份字体文件，避免“本地正常、导出错位”。

也可使用 `@remotion/google-fonts`（如 `loadFont('Noto Sans SC')`），但离线/内网环境仍需自托管。

---

## 9. 常用命令

```bash
# 预览（Studio 左侧会按 Composition ID 列出所有视频）
npx remotion studio

# 渲染某一期
npx remotion render data-analysis-sky-is-blue out/sky-is-blue.mp4

# 指定帧范围 / 并发 / 质量
npx remotion render data-analysis-sky-is-blue out/clip.mp4 \
  --frames=0-150 --concurrency=4 --crf=18

# 导出静帧（做封面、检查排版）
npx remotion still data-analysis-sky-is-blue out/cover.png --frame=45

# 渲染竖版
npx remotion render data-analysis-sky-is-blue-vertical out/sky-is-blue-vertical.mp4

# 列出所有已注册的 Composition
npx remotion compositions
```

建议在 `package.json` 里封装脚本：

```json
{
  "scripts": {
    "dev": "remotion studio",
    "compositions": "remotion compositions",
    "still": "remotion still data-analysis-sky-is-blue out/cover.png --frame=45",
    "build": "remotion render data-analysis-sky-is-blue out/sky-is-blue.mp4 --crf=18",
    "build:all": "node scripts/render-all.mjs"
  }
}
```

---

## 10. 批量生产

每期视频的元数据就是它目录下的 `video.json`：

```json
{
  "id": "data-analysis-sky-is-blue",
  "title": "为什么天空是蓝色的",
  "category": "data-analysis",
  "slug": "sky-is-blue",
  "status": "animating",
  "summary": "瑞利散射的一分钟解释",
  "tags": ["物理", "光学"],
  "createdAt": "2026-10-17",
  "durationInFrames": 1800,
  "format": { "width": 1920, "height": 1080, "fps": 30 },
  "audio": { "narration": "", "bgm": "" }
}
```

因为所有成片都在 `videos/registry.ts` 里登记过，批量渲染只需遍历这份清单：

```ts
// scripts/render-all.mjs 思路
// 1. import registry，拿到 [{ meta }]
// 2. 按 status / category 过滤（例如只渲染 status === 'animating'）
// 3. 对每个 id 调 renderMedia() 或 spawn `npx remotion render`
// 4. 输出到 out/<category>/<slug>.mp4
```

这样能实现：一条命令出整季、只重渲染改过的期次、CI 里按分类并行。

---

## 11. 渲染与性能

- 渲染耗时 ≈ 帧数 × 单帧成本。1080p 30fps 的 90 秒视频，普通笔记本约 2–6 分钟。
- 提升手段：`--concurrency` 调到 CPU 核数附近；减少大面积模糊/阴影/滤镜；静态背景用图片而非实时绘制。
- 需要 GPU 加速可加 `--gl=angle`（Windows 上通常有效）。
- 长视频先分段渲染再拼接，便于定位出问题的场景。
- CI 环境注意：需要装 Chrome Headless Shell，可用 `npx remotion browser ensure`。

---

## 12. 常见问题

**中文变方块 / 字体不对**
见第 8 节。检查是否用 `FontFace` 加载并 `continueRender`。

**导出的视频掉帧或音画不同步**
不要用 `setTimeout` / CSS 动画 / 原生 `<audio>`；所有动画必须由 `useCurrentFrame()` 驱动，媒体用 Remotion 组件。

**首帧空白**
异步资源（图片、字体）没等加载完就截图。用 `delayRender()` 包起来，`continueRender()` 释放。

**画面在本地和导出后不一致**
通常是字体回退或窗口尺寸差异；确保布局基于 `useVideoConfig()`，不读浏览器窗口。

**渲染报 Chrome 相关错误**
删除 `node_modules/.remotion` 后重试，或执行 `npx remotion browser ensure` 重新下载。

---

## 参考

- 官方文档：https://www.remotion.dev/docs
- API 索引：https://www.remotion.dev/docs/api
- 示例合集：https://www.remotion.dev/templates
- 中文排版与字体：https://www.remotion.dev/docs/fonts
