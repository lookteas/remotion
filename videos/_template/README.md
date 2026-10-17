# 视频项目模板

复制本目录到 `videos/<分类>/<序号>-<slug>/`，然后按下表逐项替换。

## 复制后要做的事

- [ ] `video.json`：改 `id` / `title` / `category` / `slug` / `summary` / `tags` / `status`
- [ ] `index.tsx`：把组件名改成有意义的名字，替换画面
- [ ] 重写本 README（见下方"本期说明"）
- [ ] 在 `videos/registry.ts` 登记
- [ ] 在所属分类的 `INDEX.md` 表格增加一行
- [ ] 删除本段"复制后要做的事"

## 文件说明

| 文件 | 作用 |
| --- | --- |
| `video.json` | 元数据，唯一事实来源；同时作为 Composition 的 defaultProps |
| `index.tsx` | 导出该期 Composition 组件 |
| `Scenes.tsx` | 本期专属场景（复制后按需新建） |
| `assets/` | 旁白、BGM、配图；代码里用 `import` / `require` 引用 |

> 如果某个资源需要在运行时拼路径（例如跟着 JSON 配置切换图片），把它放到 `public/` 下并用 `staticFile()` 引用，否则无法被解析。

## 本期说明（复制后重写）

### 选题

- 一句话问题：
- 目标观众：
- 看完要记住的一件事：

### 脚本

| 场景 | 旁白 / 字幕 | 画面要点 | 时长 |
| --- | --- | --- | --- |
| 片头 |  |  |  |
| 正文 |  |  |  |
| 片尾 |  |  |  |

### 素材与来源

- 数据来源：
- 参考链接：
- 字体 / 图片版权：
