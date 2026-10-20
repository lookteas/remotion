"""Rebuild the local font subset and deterministic, original short animation SFX."""
from pathlib import Path
import json
import math
import random
import struct
import urllib.request
import wave
from fontTools import subset

ROOT = Path(__file__).resolve().parents[4]
EPISODE = Path(__file__).resolve().parents[1]
CACHE = ROOT / '.cache' / 'life-kline'
FONTS = ROOT / 'public' / 'fonts' / 'life-kline'
AUDIO = ROOT / 'public' / 'audio' / 'life-kline'
for directory in (CACHE, FONTS, AUDIO):
    directory.mkdir(parents=True, exist_ok=True)

source = CACHE / 'NotoSerifSC-original.ttf'
font_url = 'https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf'
if not source.exists():
    urllib.request.urlretrieve(font_url, source)
license_file = FONTS / 'OFL-serif.txt'
if not license_file.exists():
    urllib.request.urlretrieve('https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifsc/OFL.txt', license_file)
text = (EPISODE / 'content.json').read_text(encoding='utf-8')
text += ''.join(chr(i) for i in range(32, 127)) + '／·：，。？'
options = subset.Options()
options.flavor = 'woff2'
font = subset.load_font(str(source), options)
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=text)
subsetter.subset(font)
subset.save_font(font, str(FONTS / 'NotoSerifSC-life-kline.woff2'), options)

RATE = 48000
manifest = {'font': {'source': font_url, 'license': 'SIL Open Font License 1.1', 'licenseFile': 'OFL-serif.txt'}, 'sfx': []}
for name, length, seed in [('whoosh', 0.82, 7), ('impact', 0.72, 19), ('lock', 0.28, 31), ('pulse', 0.48, 41)]:
    rng = random.Random(seed)
    samples = []
    filtered = 0.0
    phase = 0.0
    for i in range(round(length * RATE)):
        t = i / RATE
        p = t / length
        noise = rng.uniform(-1, 1)
        filtered = filtered * 0.85 + noise * 0.15
        if name == 'whoosh':
            env = math.sin(math.pi * p) ** 1.8
            phase += 2 * math.pi * (850 - 650 * p) / RATE
            value = env * (filtered * 0.75 + math.sin(phase) * 0.075)
        elif name == 'impact':
            phase += 2 * math.pi * (48 + 140 * math.exp(-t * 30)) / RATE
            value = math.sin(phase) * math.exp(-t * 10) * 0.7 + filtered * math.exp(-t * 35) * 0.5
        elif name == 'lock':
            value = (math.sin(t * 2 * math.pi * 1400) * 0.18 + filtered * 0.8) * math.exp(-t * 35)
            value += math.sin(t * 2 * math.pi * 220) * math.exp(-t * 28) * 0.3
        else:
            value = (math.sin(t * 2 * math.pi * 540) + math.sin(t * 2 * math.pi * 810) * 0.25) * math.exp(-t * 13) * 0.24
        value *= min(1, t / 0.004) * min(1, (length - t) / 0.03)
        samples.append(value)
    peak = max(abs(v) for v in samples)
    scale = 0.68 / max(peak, 0.001)
    with wave.open(str(AUDIO / f'{name}.wav'), 'wb') as output:
        output.setnchannels(1)
        output.setsampwidth(2)
        output.setframerate(RATE)
        output.writeframes(b''.join(struct.pack('<h', round(v * scale * 32767)) for v in samples))
    manifest['sfx'].append({'file': f'{name}.wav', 'duration': length, 'seed': seed, 'source': 'original procedural synthesis; no speech or music samples'})
(EPISODE / 'assets.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('Prepared local Noto Serif SC subset and 4 short original SFX; no BGM.')
