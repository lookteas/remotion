"""Subset the licensed Noto Serif SC to this episode's own text.

This episode has no narration, so only the font is a generated asset.
Requirements: Python 3.10+, fonttools[woff]. The 25 MB source TTF is reused from
the previous episode's local cache and stays gitignored.
"""

from pathlib import Path
import shutil
import urllib.request

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
SLUG = "chi-ma-chong-yang"

SHARED_FONT_DIR = ROOT / "public/fonts/iching-life"
FONT_SOURCE = SHARED_FONT_DIR / "NotoSerifSC-original.ttf"
FONT_LICENSE = SHARED_FONT_DIR / "OFL.txt"
FONT_DIR = ROOT / "public/fonts" / SLUG
OUTPUT = FONT_DIR / "NotoSerifSC-episode.woff2"

PINYIN = "āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ"
PUNCTUATION = "·，。！？：；、（）《》「」『』“”‘’—…～"


def prepare_font():
    from fontTools import subset
    from fontTools.ttLib import TTFont

    FONT_DIR.mkdir(parents=True, exist_ok=True)
    if not FONT_SOURCE.exists():
        urllib.request.urlretrieve(
            "https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf",
            FONT_SOURCE,
        )
    if not FONT_LICENSE.exists():
        urllib.request.urlretrieve(
            "https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifsc/OFL.txt",
            FONT_LICENSE,
        )
    shutil.copyfile(FONT_LICENSE, FONT_DIR / "OFL.txt")

    texts = "".join(
        path.read_text(encoding="utf-8")
        for path in HERE.iterdir()
        if path.suffix in {".tsx", ".ts", ".json", ".md"}
    )
    texts += "".join(chr(i) for i in range(32, 127)) + PINYIN + PUNCTUATION

    options = subset.Options()
    options.flavor = "woff2"
    font = subset.load_font(str(FONT_SOURCE), options)
    worker = subset.Subsetter(options)
    worker.populate(text=texts)
    worker.subset(font)
    subset.save_font(font, str(OUTPUT), options)

    covered = set(TTFont(str(OUTPUT)).getBestCmap())
    wanted = {ord(ch) for ch in texts if ord(ch) > 127 and not ch.isspace()}
    missing = "".join(sorted(chr(code) for code in wanted - covered))
    print(f"Font prepared: {OUTPUT.relative_to(ROOT).as_posix()}")
    print(f"Missing glyphs: {missing or 'none'}")


if __name__ == "__main__":
    prepare_font()
