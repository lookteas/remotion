# 项目约定

Remotion 知识科普视频工程。详细规范见 [README.md](README.md)、[videos/README.md](videos/README.md)。

## 硬性规则

- **Node.js ≥ 20**
- 视频按二级分类归档：`videos/<分类>/<序号>-<slug>/`，一期视频一个自包含目录
- **新增视频必须登记 `videos/registry.ts`**（import + 数组条目），否则 Remotion 发现不了它
- 同时更新该分类的 `INDEX.md` 表格与本期 `README.md`
- 元数据以该期 `video.json` 为准，`durationInFrames` 必须等于 `index.tsx` 里各场景帧数之和
- 目录名、Composition ID 用 ASCII kebab-case；中文标题写在 `video.json` 与 `INDEX.md`

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
