# 赤马重阳 · 调试记录

## 历史归档

- 2026-10-19从根 `out/chi-ma-review/` 迁移到本期 `screenshots/legacy-2026-10-19/`。
- 共184张PNG图片及1份原始JSON清单；原文件名保留。
- [迁移清单](migration-2026-10-19.json)记录原路径、大小、SHA-256；迁移前后校验一致。
- 其中包含历次改版和成片抽帧，图片不一定对应当前实现，不能把它们全部当作最终确认稿。
- 原打包缓存已分离到根 `.cache/chi-ma-chong-yang/legacy-review-bundle/`。

## 后续抽帧

从工程根执行：`node videos/traditional-culture/03-chi-ma-chong-yang/verify-frames.mjs`。

输出本期 `debug/screenshots/latest/`；`frames.json`记录图片对应的场景与全片帧号。打包缓存写根 `.cache/chi-ma-chong-yang/review-bundle/`，不进入截图文件夹。

`latest/`可覆盖，重要版本请另存日期批次。原始截图被Git忽略，本地保留，交接时应连同目录复制。

| 批次 | 图片数 | 检查状态 |
| --- | --- | --- |
| legacy-2026-10-19 | 184 | 历史迁移，哈希已核对，未重做视觉验收 |
