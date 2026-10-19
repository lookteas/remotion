# 项目约定

Remotion 知识科普视频工程。详细规范见 [README.md](README.md)、[videos/README.md](videos/README.md)。

## 开始动画前：先检索与复用

- 写分镜、开始新一期或增加效果前，先阅读 [src/CATALOG.md](src/CATALOG.md)，再用 `rg` 搜索 `src/`、`videos/` 的相关实现；清单没有记录不代表源码不存在。
- 已有匹配公共能力直接import并配置参数。相近实现优先扩展；单期候选需要跨期时先解耦到公共模块，不把新期绑定到旧期的content、timeline或音轨，不复制同功能代码另起一份。
- 只有确认现有实现不适用或缺失后才新建。在本期 `ANIMATION.md` 的复用检查表记录搜索词、清单ID、源路径、选择结果与适配/新建原因。
- 新增、提取、移动或变更共享能力时同步清单；保留旧默认行为，搜索并检查受影响期次。共享工具放 `src/lib/`，通用组件放 `src/components/`，大型世界放 `src/world/`，专属叙事留在本期。按实际需求创建组件子目录，不为分类批量迁移旧路径。

## 硬性规则

- **Node.js ≥ 20**
- 视频按二级分类归档：`videos/<分类>/<序号>-<slug>/`，一期视频一个自包含目录
- **新增视频必须登记 `videos/registry.ts`**（import + 数组条目），否则 Remotion 发现不了它
- 同时更新该分类的 `INDEX.md` 表格与本期 `ANIMATION.md`
- 元数据以该期 `video.json` 为准，`durationInFrames` 必须等于 `index.tsx` 里各场景帧数之和
- 目录名、Composition ID 用 ASCII kebab-case；中文标题写在 `video.json` 与 `INDEX.md`
- 新建每一期项目只用 `ANIMATION.md` 作为说明入口，不再生成本期或其子目录的 `README.md`。选题、依据、素材来源、文案、分镜、动作、阅读停留、调试记录、复现命令与修改历史统一写入动画说明；既有README保留作历史记录，根目录和分类总览README继续使用。
- 调试截图和截图清单放该期 `debug/screenshots/<批次>/`，检查说明写入本期 `ANIMATION.md` 的调试记录；禁止放根 `out/`、根目录或其他期目录。`latest` 是可覆盖工作批次，重要确认稿使用独立批次保留。
- 根 `out/` 只放最终导出成品；打包、浏览器等可再生调试缓存放根 `.cache/<slug>/`，不得混入截图目录。
- 只有脚本的选题先建立该期 `ANIMATION.md`，在分类“脚本草案”区登记；进入编码后必须补齐元数据、组件与registry登记。

## 视觉与动画

- 配色、字体、留距统一取 `src/config/theme.ts`，不要在组件里写死色值
- 所有动画由 `useCurrentFrame()` 驱动；禁止 CSS transition / animation / setTimeout
- 音频用 `<Audio>`，图片用 `<Img>`，静态资源走 `staticFile()`
- 中文排版：字号偏大、每屏信息克制；字幕底部留出安全区
- 同屏多个 SVG 实例时，`<defs>` 的 id 必须加前缀区分

## 变更后自检

```bash
npm run typecheck          # 类型检查
npm run compositions       # 确认新 Composition 出现在列表里
npm run dev                # 预览
```
