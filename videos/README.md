# 视频内容总目录

所有科普视频按二级分类归档，每期视频一个独立目录。分类内的详细清单见各自目录下的 `INDEX.md`。

| 分类 | 目录 | 清单 | 定位 |
| --- | --- | --- | --- |
| 数据分析科普 | `data-analysis/` | [INDEX.md](data-analysis/INDEX.md) | 用数据、图表、指标讲清一个现象或结论 |
| 传统文化科普 | `traditional-culture/` | [INDEX.md](traditional-culture/INDEX.md) | 节日、节气、器物、典籍、习俗的来龙去脉 |
| AI 工具科普 | `ai-tools/` | [INDEX.md](ai-tools/INDEX.md) | 工具怎么用、原理是什么、适合谁 |

## 目录结构

```text
videos/
├─ README.md              # 本文件：分类总览
├─ registry.ts            # 所有成片的登记处，Root.tsx 读取
├─ _template/             # 视频骨架，复制即用（不是真实视频）
├─ data-analysis/
│  ├─ INDEX.md            # 分类清单
│  └─ 01-<slug>/          # 一期视频
└─ ...
```

## 一期视频的目录

```text
01-<slug>/
├─ ANIMATION.md           # 本期唯一说明入口：选题、分镜、来源、调试与复现
├─ video.json             # 元数据：标题、概要、时长、状态、标签（唯一事实来源）
├─ index.tsx              # 导出该期的 Composition
├─ Scenes.tsx             # 本期专属场景
├─ debug/
│  └─ screenshots/        # 按批次归档调试截图与帧清单（本地保留）
└─ assets/                # 旁白、BGM、配图
```

## 先写动画说明，再进入制作

每期使用 `ANIMATION.md` 作为唯一说明入口，结构参见 [动画脚本模板](_template/ANIMATION.md)。它记录选题、上屏文案、逐镜画面与动作、时间轴、素材来源、内容边界、调试记录、复现命令和修改历史，便于后续基于说明生成视频、复制为新一期、回溯改动。新建期次及其子目录不再生成README；已有README保留作历史记录，工程和分类总览README继续使用。

写分镜与开始实现前，先查 [组件与特效清单](../src/CATALOG.md)，再搜索 `src/`、`videos/` 的相关实现；已有公共能力直接引用，单期候选先评估解耦，确认不适用或缺失后才新建。将检索结果与选用原因写入本期脚本的复用检查表；新增或提取能力后同步清单。

只有脚本的选题先建立 `ANIMATION.md`，在分类索引的“脚本草案”区登记；暂不创建可运行组件、`video.json` 或registry条目。进入实际制作时，再按下方流程补齐元数据、组件和注册，移入正式视频清单。草案状态以脚本文档为准；可运行视频元数据仍以 `video.json` 为准。

`ANIMATION.md` 记录制作意图；已有 `content.json` / `timeline.json` 的视频继续用它们管理实际文案与时间轴，调整时同步说明与版本记录。脚本本身不能替代复现所需的代码、依赖锁文件和素材。

## 调试文件归档

- 每期截图独立存放 `debug/screenshots/<批次>/`，调试说明写入本期 `ANIMATION.md`，不新增 `debug/README.md`，不把不同视频的图片混放在根 `out/`。
- 截图批次应附帧号清单和检查记录；当前可覆盖工作批次用 `latest/`，确认稿用日期或版本号单独保留。旧图未重新检查前，不标为当前版本验收通过。
- 原始截图目录被Git忽略，但留在本地该期目录；复制或交接目录时要一并带上它，单独Git克隆不会包含这些图片。调试说明和迁移清单正常保留。
- 根 `out/` 仅用于最终成片、正式封面等交付；打包缓存写根 `.cache/<slug>/`，不混入该期截图目录。

## 命名规则

| 对象 | 规则 | 示例 |
| --- | --- | --- |
| 分类目录 | 英文 kebab-case | `data-analysis` |
| 视频目录 | 两位序号 + slug | `01-sky-is-blue` |
| Composition ID | `<分类>-<slug>`，全局唯一 | `data-analysis-sky-is-blue` |
| 竖版 / 方版 | 后缀区分 | `data-analysis-sky-is-blue-vertical` |

> 目录名统一用 ASCII，中文标题写在 `video.json` 和 `INDEX.md` 里。路径带中文在 CLI、CI、资源 URL 上都容易出编码问题。

## 新建一个分类

1. 建目录 `videos/<kebab-name>/`
2. 复制任一现成的 `INDEX.md`，改标题、定位与收录范围
3. 在上面的总表里加一行
4. 分类顺序保持稳定（按字母序或栏目重要性），不要随手插队

## `registry.ts` 是什么

Remotion 在无头浏览器里执行打包后的代码，**没有文件系统**，无法扫描目录发现视频。所以每期视频必须被显式登记一次：`videos/registry.ts` 用静态 `import` 引入各期的 `video.json` 与组件，`src/Root.tsx` 遍历这份数组注册 `<Composition />`。

**不登记 = 视频不存在**：Studio 列表和 `remotion render` 都找不到它。

整片、独立场景与封面的注册方式见 [工程README：注册与文件职责](../README.md#registration)。

## 新建一期视频

完整步骤见 [工程README：新建与修改一期视频](../README.md#workflow)。要点如下：

1. 新建 `videos/<分类>/<序号>-<slug>/`，先复制模板中的 `ANIMATION.md`，填写并确认选题、文案、分镜与动作；不另建README
2. 仅撰稿时先在分类“脚本草案”区登记；开始制作时再从模板补 `video.json` 与 `index.tsx`，按需增加内容、时间轴和场景
3. 在 `videos/registry.ts` 里登记可运行整片（import + 数组条目）
4. 将草稿移入分类正式视频清单，同步元数据与制作状态
5. 调试截图保存本期 `debug/screenshots/<批次>/`，调试与复现记录写回 `ANIMATION.md`
6. 预览与出片：

```bash
npx remotion studio
npx remotion render <composition-id> out/<slug>.mp4
```

## 状态取值

`构思` → `撰稿` → `制作` → `出片` → `已发布`

清单表、`video.json`、**目录实际内容**三者应保持一致；状态以 `video.json` 为准，清单表同步更新。
