/**
 * 全局视觉系统。深色电影感 + 暖色阳光 + 宋体大标题。
 */

export const palette = {
  bg: '#0C0B09',
  bgSoft: '#16130E',
  cream: '#F4EBDC',
  creamDim: '#C3B6A2',
  muted: '#7A7060',
  line: 'rgba(244,235,220,0.13)',
  sun: '#F2A24A',
  sunDeep: '#C2641F',
  cold: '#7FB0C0',
} as const;

export const font = {
  /** 标题：宋体系，编辑感 */
  display: '"Songti SC", "SimSun", "STSong", "Noto Serif SC", serif',
  /** 正文：等线 / 雅黑 */
  body: '"DengXian", "Microsoft YaHei", "PingFang SC", sans-serif',
  /** 数字与技术标注 */
  num: '"Helvetica Neue", "Arial", sans-serif',
} as const;

export const layout = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;
