# Source assets

Originals that web derivatives are generated from. Kept in the repo on the
owner's instruction so the derivatives can always be regenerated and the
sources are not lost.

| Source | Derivative | How |
|---|---|---|
| `saad-alam-portrait-lineart.png` (941×1671) | `public/team/saad-alam-portrait.webp`, `saad-alam-avatar.webp` | trim the white margin, pad to 3:4, resize, WebP q90 |
| `../Hero_sections_aniamtion.mp4` (81 MB, 1920×1080, 30fps, h264+aac) | `public/media/hero-robot.mp4`, `hero-robot-poster.webp` | see below |

## Hero video

The owner replaced the source on 2026-09-22: it is a 34-second 1920x1080
presenter animation now, not the 12-second plexus loop, and it carries a
voiceover.

```sh
# 1000px wide, audio kept at 96k, CRF 28 -> 1.4 MB
ffmpeg -i media/Hero_sections_aniamtion.mp4 -vf "scale=1000:-2" \
  -c:v libx264 -profile:v high -crf 28 -preset slow \
  -c:a aac -b:a 96k -ac 2 \
  -movflags +faststart -pix_fmt yuv420p public/media/hero-robot.mp4

# poster, frame at 8s
ffmpeg -ss 8 -i media/Hero_sections_aniamtion.mp4 -frames:v 1 \
  -vf "scale=1000:-2" /tmp/poster.png
```

Notes, so nobody redoes the measuring:

- **Audio is kept this time.** The previous source had an incidental AAC
  track and it was stripped; this one has a voiceover the owner wants
  available. Autoplay is only permitted muted, so it starts muted and the
  player exposes a Sound control. Unmuting is the viewer choosing to hear
  it, which is the only decent way to ship audio on a landing page.
- **CRF 28, not 31.** 1.4 MB against 1.1 MB. A white studio background shows
  banding that a dark plexus hid, and the 300 KB is worth not seeing it.
- **No WebM.** VP9 measured larger than h264 on the previous source and
  there is no reason to expect otherwise here.
- **16:10, not 3:4.** The panel was portrait for the abstract loop, where
  cropping the sides costs nothing. A 3:4 crop of this 16:9 source cut the
  figure's arms off.
