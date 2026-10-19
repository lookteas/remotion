/** All line arrays run from the bottom (初爻) to the top (上爻). */
export type Line = 0 | 1;
export type Trigram = {name: string; image: string; lines: Line[]};

/** Teaching arrangement, not the King Wen or an asserted historical order. */
export const TRIGRAMS: Trigram[] = [
  {name: '乾', image: '天', lines: [1, 1, 1]},
  {name: '兑', image: '泽', lines: [1, 1, 0]},
  {name: '离', image: '火', lines: [1, 0, 1]},
  {name: '震', image: '雷', lines: [1, 0, 0]},
  {name: '巽', image: '风', lines: [0, 1, 1]},
  {name: '坎', image: '水', lines: [0, 1, 0]},
  {name: '艮', image: '山', lines: [0, 0, 1]},
  {name: '坤', image: '地', lines: [0, 0, 0]},
];

export const HEXAGRAMS = TRIGRAMS.flatMap(lower =>
  TRIGRAMS.map(upper => ({lower, upper, lines: [...lower.lines, ...upper.lines]})),
);

export const EXAMPLES = {
  zhun: {name: '屯', reading: 'zhūn', number: '03', lower: '震', upper: '坎', lines: [1, 0, 0, 0, 1, 0] as Line[]},
  xu: {name: '需', reading: 'xū', number: '05', lower: '乾', upper: '坎', lines: [1, 1, 1, 0, 1, 0] as Line[]},
  qian: {name: '谦', reading: 'qiān', number: '15', lower: '艮', upper: '坤', lines: [0, 0, 1, 0, 0, 0] as Line[]},
};
