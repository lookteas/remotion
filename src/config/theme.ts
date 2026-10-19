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

/** 本期黑金科学微纪录片主题，独立于现有采光视频。 */
export const ichingTheme = {
  ink: '#090C0F',
  surface: '#151819',
  gold: '#C8A66A',
  goldLight: '#E4CB93',
  ivory: '#F1E8D7',
  secondary: '#B8AE9D',
  muted: '#827C70',
  vermilion: '#B65B4B',
  green: '#92A47A',
  water: '#8FAFB5',
  soil: '#554335',
  char: '#302A23',
  black: '#000000',
  font: '"IChingSerif", "SimSun", serif',
  numberFont: '"Georgia", "Times New Roman", serif',
  safe: 110,
} as const;

/** Sculpted-paper material palette for the Bazi film. */
export const baziTheme = {
  ...ichingTheme,
  paper: '#E9D9B5', paperLight: '#FFF2D2', paperEdge: '#907552',
  bronze: '#725532', bronzeDark: '#33281C', metal: '#E9C77F',
  blue: '#66858B', blueDark: '#273C43',
  font: '"BaziSerif", serif',
  width: 1080, height: 1920, left: 88, contentWidth: 832,
} as const;
