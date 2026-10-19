# 六十四卦 · 调试记录

## 历史归档

- 2026-10-19从根 `out/iching-life-review/` 迁移到本期 `screenshots/legacy-2026-10-19/`。
- 共31张图片（28 PNG、3 JPG）及2份原始JSON清单；原文件名保留。
- [迁移清单](migration-2026-10-19.json)记录原路径、大小、SHA-256；迁移前后校验一致。
- 历史图片可能来自不同实现；没有重新检查，不作为当前 [动画脚本](../ANIMATION.md) 的通过凭据。
- 原打包缓存已分离到根 `.cache/iching-life/legacy-review-bundle/`。

## 后续抽帧

从工程根执行：`node videos/traditional-culture/02-iching-life/verify-frames.mjs`。

输出本期 `debug/screenshots/latest/`；`frames.json`记录图片对应的场景与全片帧号。`--life-only`仅更新生活段落，清单为 `life-frames.json`，不代表整片重新检查。打包缓存写根 `.cache/iching-life/review-bundle/`。

`latest/`可覆盖，重要版本请另存日期批次。原始截图被Git忽略，本地保留，交接时应连同目录复制。

| 批次 | 图片数 | 检查状态 |
| --- | --- | --- |
| legacy-2026-10-19 | 31 | 历史迁移，哈希已核对，未重做视觉验收 |
