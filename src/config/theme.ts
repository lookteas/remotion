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

/** Life K-line: independent cool-material system; existing episodes keep their defaults. */
export const lifeKlineTheme = {
  bg: '#030811', surface: '#081629', deep: '#071020',
  blue: '#277BFF', blueLight: '#70BFFF', green: '#65FFD2',
  white: '#F0F8FF', secondary: '#9DB4CB', muted: '#52718B',
  steel: '#123D59', darkSteel: '#081D31', black: '#000000',
  font: '"LifeKlineSans", "Microsoft YaHei", sans-serif',
  numberFont: '"Consolas", monospace',
  width: 1080, height: 1920, left: 90, textWidth: 800,
} as const;

/** R01 material direction, isolated from the rejected blue machinery draft. */
export const lifeListingTheme = {
  ...ichingTheme,
  ink: '#090907', surface: '#19170F',
  paper: '#EEE5CA', paperLight: '#FFF7DD', edge: '#8F7951',
  paperEdge: '#8F7951', bronze: ichingTheme.gold, bronzeDark: ichingTheme.char,
  font: '"LifeListingSerif", "SimSun", serif',
  width: 1080, height: 1920, left: 90, textWidth: 900,
  headingTop: 180, headingLineHeight: 1.4, chartOffsetY: 25,
} as const;

/** Ganzhi daily life: independent paper, dark desk and restrained red. */
export const ganzhiTheme = {
  ...baziTheme, ink:'#101311', surface:'#20241F', desk:'#22251F', deskEdge:'#101711',
  paper:'#F0E4CC', paperLight:'#FFF7E6', paperEdge:'#B8A27C', bronzeDark:'#302C25',
  gold:'#CEAB6B', goldLight:'#F1D5A0', ivory:'#F5EFDF', secondary:'#BAAF99', muted:'#898976',
  vermilion:'#A84336', redLight:'#D27859', blue:'#8DA9A3', blueDark:'#354640',
  font:'"GanzhiSans", "Microsoft YaHei", sans-serif', serif:'"GanzhiSerif", "SimSun", serif',
  numberFont:'"Arial", sans-serif', width:1080,height:1920,left:90,textWidth:840,
} as const;
