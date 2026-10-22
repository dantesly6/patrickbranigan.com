#!/usr/bin/env bash
# Rebuilds public/prototypes/media from the originals in public/images/projects.
# Light 720p-ish H.264 copies, no audio, fast-start, for the prototype. Production should
# compress the originals properly; the Chaotic reel original is 22 MB.
set -euo pipefail
cd "$(dirname "$0")/../../public/images/projects"
OUT=../../prototypes/media
mkdir -p "$OUT"

for p in chaotic/reel moonfallen/site; do
  ffmpeg -loglevel error -y -i "$p.mp4" -an -vf "scale=1280:-2" -c:v libx264 -crf 27 -preset veryfast -movflags +faststart "$OUT/$(echo $p | tr / -).mp4"
done
ffmpeg -loglevel error -y -i workweek/07-linear.mov -an -vf "scale=1280:-2" -c:v libx264 -crf 27 -preset veryfast -movflags +faststart "$OUT/workweek-linear.mp4"

# Ribbon recordings contain a baked-in phone mockup. Crop to the screen only (measured on the
# 636x1280 source: screen spans x 41..593, y 67..1239) so the prototype draws its own phone frame.
for n in details-nav pages; do
  ffmpeg -loglevel error -y -i "ribbon/$n.mp4" -an -vf "crop=552:1172:41:67" -c:v libx264 -crf 25 -preset veryfast -movflags +faststart "$OUT/ribbon-$n-screen.mp4"
done
echo "done -> $OUT"
