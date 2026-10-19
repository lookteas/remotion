# I Ching Life Animation Implementation Plan

> **For agentic workers:** Execute inline with executing-plans; a code reviewer checks the completed implementation.

**Goal:** Deliver the approved eight-scene Chinese explainer as an interactive Remotion preview.

**Architecture:** A self-contained episode owns content JSON, measured timeline JSON, hexagram data, SVG objects, scene components and its composition. Existing registry discovers the episode. Theme tokens and licensed local fonts provide consistent rendering.

**Tech Stack:** React 18, TypeScript, Remotion 4.0.536, Python asset preparation, local/online Chinese speech.

**Spec:** `docs/superpowers/specs/2026-10-17-iching-life-design.md`

## Global Constraints

- 1920×1080 / 30fps. Preview only; no MP4 export.
- No formulas or prediction claims. Distinguish modern analogies from traditional text.
- Frame-driven animation; JSON-owned captions; resources through staticFile.
- Register episode and update category INDEX. Preserve existing video.

## Task 1: Content and accurate symbols

Files: episode `content.json`, `hexagrams.ts`, `content.test.mjs`, `README.md`.

- [x] Test 64 unique six-line patterns, 8 unique trigrams, and named examples against bottom-to-top known patterns.
- [x] Run the test before the data exists; confirm the missing-data failure.
- [x] Implement symbols with documented bottom-to-top orientation and the approved eight-scene script.
- [x] Read primary-source text for 屯、需、谦 and record source URLs and restrained interpretation.
- [x] Pass `node --experimental-strip-types --test videos/traditional-culture/02-iching-life/content.test.mjs`.

## Task 2: Measured speech and reproducible resources

Files: episode `prepare_assets.py`, `timeline.json`, public episode audio, fonts and license.

- [x] Generate speech per caption, measure actual durations, and store caption start/end times and scene offsets.
- [x] Export a subtitle SRT as a sidecar; verify caption coverage, no overlap, and exact sum matching video.json.
- [x] Download open licensed Chinese serif font, preserve license, subset to episode text with fonttools.

## Task 3: Animated story

Files: `Artwork.tsx`, `Chrome.tsx`, `Scenes.tsx`, `index.tsx`, `video.json`; modify `src/config/theme.ts`, `videos/registry.ts`, category INDEX.

- [x] Draw dimensional cooking pot, plant cross-section, notebook, and exact hexagram primitives with prefixed SVG IDs.
- [x] Animate eight scenes: life objects, yin/yang, stack/build atlas, narrative bridge, cooking mistakes/practice, roots growing, new recipe/blank page, closing questions.
- [x] Add grain, warm spotlight, large serif headings, explicit analogy markers, bottom subtitles and measured audio clips.
- [x] Use independent scene instances with timing derived from timeline; register metadata and update docs.

## Task 4: Review and verify

- [x] Run content tests, `npm run typecheck`, `npm run compositions`.
- [x] Capture representative frames from all eight scenes, early/mid/late states, inspect contact sheets, and fix legibility/overlap.
- [x] Run code review, address material findings, repeat affected checks.
- [x] Open Studio via its CLI; provide exact composition link. Browser automation surfaces unavailable, so verify actual composition frames through the Remotion renderer instead.

## Verification record

- 4 content/timing tests pass; initial missing-data assertions failed before implementation.
- TypeScript and composition discovery pass. Main timeline: 5457 frames / 181.9s; eight connected scene previews.
- 28 full-resolution stills checked; opening notebook repositioned away from subtitle area.
- All 42 voice clips measured; all caption text supported by the bundled font.
- Independent code review: no material findings. No MP4 export or remote push performed.
