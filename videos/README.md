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
├─ README.md              # 选题、脚本、分镜、数据/素材来源
├─ video.json             # 元数据：标题、概要、时长、状态、标签（唯一事实来源）
├─ index.tsx              # 导出该期的 Composition
├─ Scenes.tsx             # 本期专属场景
└─ assets/                # 旁白、BGM、配图
```

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

机制细节与 `Root.tsx` 写法见 [../README.md 第 5 节](../README.md#5-视频是怎么被注册的videosregistryts)。

## 新建一期视频

完整步骤见 [../README.md 第 6 节](../README.md#6-使用流程)。要点如下：

1. 复制 `videos/_template/` 到 `videos/<分类>/<序号>-<slug>/`
2. 改 `video.json` 和 `index.tsx`
3. 在 `videos/registry.ts` 里登记（import + 数组条目）
4. 在该期 `README.md` 写选题、脚本、素材来源
5. 在分类的 `INDEX.md` 表格增加一行
6. 预览与出片：

```bash
npx remotion studio
npx remotion render <composition-id> out/<slug>.mp4
```

## 状态取值

`构思` → `撰稿` → `制作` → `出片` → `已发布`

清单表、`video.json`、**目录实际内容**三者应保持一致；状态以 `video.json` 为准，清单表同步更新。
