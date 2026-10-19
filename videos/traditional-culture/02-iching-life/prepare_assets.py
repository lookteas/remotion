"""Rebuild measured narration and captions. Run from any working directory.

Requirements: Python 3.10+, edge-tts, fonttools[woff], ffprobe on PATH.
Only authored public script text is sent to Microsoft's online neural voice.
The pronunciation substitution for 屯 is speech-only; displayed text stays 屯.
"""
import argparse
import asyncio
import hashlib
import json
import math
from pathlib import Path
import subprocess
import urllib.request

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
FPS = 30


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def seconds(path):
    return float(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", str(path),
    ], text=True).strip())


async def prepare_speech():
    import edge_tts
    content = read_json(HERE / "content.json")
    output = ROOT / "public/audio/iching-life"
    output.mkdir(parents=True, exist_ok=True)
    semaphore = asyncio.Semaphore(3)

    async def generate(scene, index, line):
        path = output / f"{scene['id']}-{index + 1:02}.mp3"
        spoken = line.get("spoken", line["text"])
        signature = hashlib.sha256((content["voice"] + content["rate"] + spoken).encode()).hexdigest()
        stamp = path.with_suffix(".sha256")
        async with semaphore:
            if not (path.exists() and stamp.exists() and stamp.read_text() == signature):
                for attempt in range(3):
                    try:
                        await asyncio.wait_for(edge_tts.Communicate(
                            spoken, content["voice"], rate=content["rate"],
                        ).save(str(path)), timeout=50)
                        seconds(path)  # Reject invalid/empty downloads before recording the cache.
                        stamp.write_text(signature)
                        print(f"speech: {path.name}", flush=True)
                        break
                    except Exception:
                        if attempt == 2:
                            raise
        return path, seconds(path)

    tasks = [(scene, i, line) for scene in content["scenes"] for i, line in enumerate(scene["lines"])]
    measured = await asyncio.gather(*(generate(*task) for task in tasks))
    iterator = iter(measured)
    timeline = {"fps": FPS, "voice": content["voice"], "rate": content["rate"], "scenes": []}
    absolute_frame = 0
    srt = []

    def timestamp(ms):
        ms = round(ms)
        return f"{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02},{ms % 1000:03}"

    for scene in content["scenes"]:
        cursor = 24
        captions = []
        for line in scene["lines"]:
            path, duration = next(iterator)
            duration_frames = math.ceil(duration * FPS)
            cue = {
                "text": line["text"], "startMs": round(cursor / FPS * 1000),
                "endMs": round((cursor + duration_frames) / FPS * 1000),
                "timestampMs": None, "confidence": None,
                "audio": path.relative_to(ROOT / "public").as_posix(),
                "from": cursor, "durationInFrames": duration_frames,
            }
            captions.append(cue)
            start_ms = (absolute_frame + cursor) / FPS * 1000
            end_ms = start_ms + duration_frames / FPS * 1000
            srt.append(f"{len(srt) + 1}\n{timestamp(start_ms)} --> {timestamp(end_ms)}\n{line['text']}\n")
            cursor += duration_frames + 7
        # A short visual hold lets each ending breathe without slowing the narration.
        duration = cursor + (45 if scene["id"] == "ending" else 20)
        timeline["scenes"].append({
            "id": scene["id"], "from": absolute_frame,
            "durationInFrames": duration, "captions": captions,
        })
        absolute_frame += duration
    write_json(HERE / "timeline.json", timeline)
    meta = read_json(HERE / "video.json")
    meta["durationInFrames"] = absolute_frame
    write_json(HERE / "video.json", meta)
    (HERE / "subtitles.srt").write_text("\n".join(srt), encoding="utf-8")
    print(f"Measured timeline: {absolute_frame} frames / {absolute_frame / FPS:.2f}s", flush=True)


def prepare_font():
    from fontTools import subset
    output = ROOT / "public/fonts/iching-life"
    output.mkdir(parents=True, exist_ok=True)
    original = output / "NotoSerifSC-original.ttf"
    if not original.exists():
        urllib.request.urlretrieve(
            "https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf",
            original,
        )
    license_path = output / "OFL.txt"
    if not license_path.exists():
        urllib.request.urlretrieve("https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifsc/OFL.txt", license_path)
    texts = "".join(p.read_text(encoding="utf-8") for p in HERE.iterdir() if p.suffix in {".tsx", ".ts", ".json", ".md"})
    texts += "".join(chr(i) for i in range(32, 127)) + "āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ·，。！？：；《》「」—…"
    options = subset.Options()
    options.flavor = "woff2"
    font = subset.load_font(str(original), options)
    worker = subset.Subsetter(options)
    worker.populate(text=texts)
    worker.subset(font)
    subset.save_font(font, str(output / "NotoSerifSC-episode.woff2"), options)
    print("Licensed episode font prepared", flush=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--speech", action="store_true")
    parser.add_argument("--font", action="store_true")
    args = parser.parse_args()
    if args.speech:
        asyncio.run(prepare_speech())
    if args.font:
        prepare_font()
