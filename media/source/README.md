# Source assets

Originals that web derivatives are generated from. Kept in the repo on the
owner's instruction so the derivatives can always be regenerated and the
sources are not lost.

| Source | Derivative | How |
|---|---|---|
| `saad-alam-portrait-lineart.png` (941×1671) | `public/team/saad-alam-portrait.webp`, `saad-alam-avatar.webp` | trim the white margin, pad to 3:4, resize, WebP q90 |
| `../Hero_sections_aniamtion.mp4` (12 MB, 1280×720, 24fps, h264+aac) | `public/media/hero-plexus.mp4`, `hero-plexus-poster.webp` | see below |

## Hero video

```sh
# 900px wide, no audio, CRF 34 -> 759 KB
ffmpeg -i media/Hero_sections_aniamtion.mp4 -an -vf "scale=900:-2" \
  -c:v libx264 -profile:v high -crf 34 -preset slower \
  -movflags +faststart -pix_fmt yuv420p public/media/hero-plexus.mp4

# poster, frame at 4s
ffmpeg -ss 4 -i media/Hero_sections_aniamtion.mp4 -frames:v 1 \
  -vf "scale=1024:-2" /tmp/poster.png
```

Encoder notes, so nobody redoes the measuring:

- **No WebM.** VP9 was consistently *larger* than h264 on this footage — 1.6 MB
  at CRF 44 against 768 KB for h264 at CRF 34 — so the second source element
  would have cost bytes and bought nothing. h264 is universal anyway.
- **CRF 34, not 28.** A plexus on black hides compression. CRF 28 is 1.7 MB,
  CRF 31 is 1.1 MB, CRF 34 is 768 KB, and at the size the panel actually
  renders there is nothing to see between them.
- **Audio stripped.** The source carries an AAC track. An autoplaying hero
  has no business with one, and muted autoplay is the only kind browsers
  allow.
