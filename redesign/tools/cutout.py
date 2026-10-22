"""Split presentation boards into their separate elements.

Usage (from public/images/projects, in a venv with numpy, pillow, scipy):
    python cutout.py . ../../prototypes/cutouts /tmp/cutout-debug ribbon/ui-elements.webp chaotic/comments.webp ...

Two modes, picked per image:
- Boards that already have transparency (the artist cut them out): split on the alpha channel alone.
- Opaque boards: estimate the background from the border, mark what differs, close small gaps so
  one card stays one piece, and make background connected to each crop's edge transparent.

Writes one transparent .webp per piece, a manifest.json (positions on the original board, used by
the prototype's SETS data), and a debug overlay per image showing the cut lines.

Only run this on boards that really are several separate things. Single screens (dashboards,
explainer boards, game shots) fall apart into fragments; keep those whole.

The Ribbon three-phone board needed one more step: each phone piece was cropped to its screen
(inset 44px left/right, 36px top, 32px bottom at full size) and saved as ribbon-cashapp-screen-N.webp,
so the prototype can draw its own phone frame around it.
"""
import json, sys, os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as ndi

SRC, OUT, DBG = sys.argv[1], sys.argv[2], sys.argv[3]
names = sys.argv[4:]
os.makedirs(OUT, exist_ok=True); os.makedirs(DBG, exist_ok=True)

manifest = {}
for name in names:
    raw = Image.open(os.path.join(SRC, name)).convert('RGBA')
    has_alpha = (np.asarray(raw)[..., 3] < 250).mean() > 0.005
    # transparent areas become a colour no UI uses, so they read as background
    im = Image.alpha_composite(Image.new('RGBA', raw.size, (255, 0, 255, 255)), raw).convert('RGB') if has_alpha else raw.convert('RGB')
    W, H = im.size
    k = 4  # analyse at quarter scale, cut at full scale
    small = np.asarray(im.resize((W // k, H // k), Image.BILINEAR)).astype(int)
    border = np.concatenate([small[0], small[-1], small[:, 0], small[:, -1]])
    bg = np.median(border, axis=0)
    mask = np.abs(small - bg).max(axis=2) > 10
    if has_alpha:
        bg = np.array([255, 0, 255])
        mask = np.asarray(raw.resize((W // k, H // k), Image.BILINEAR))[..., 3] > 200
    # join the insides of a card without bridging separate cards
    closed = (ndi.binary_closing(mask, structure=np.ones((3, 3)), iterations=1) if has_alpha
              else ndi.binary_closing(mask, structure=np.ones((9, 9)), iterations=2))
    lab, n = ndi.label(ndi.binary_fill_holes(closed))
    pieces = []
    for sl in ndi.find_objects(lab):
        ys, xs = sl
        if (ys.stop - ys.start) * (xs.stop - xs.start) < 0.004 * small.shape[0] * small.shape[1]:
            continue
        pieces.append((xs.start * k, ys.start * k, xs.stop * k, ys.stop * k))
    pieces.sort(key=lambda b: (round(b[1] / 200), b[0]))
    full = np.asarray(im).astype(int)
    stem = os.path.splitext(name.replace('/', '-'))[0]
    out_pieces = []
    for j, (x0, y0, x1, y1) in enumerate(pieces):
        pad = 6
        x0, y0, x1, y1 = max(0, x0 - pad), max(0, y0 - pad), min(W, x1 + pad), min(H, y1 + pad)
        if has_alpha:
            sub = np.asarray(raw)[y0:y1, x0:x1]
            a = sub[..., 3]
            rgba = np.dstack([sub[..., :3], np.where(a > 200, 255, a).astype(np.uint8)])
            alpha = rgba[..., 3]
        else:
            crop = full[y0:y1, x0:x1]
            near = np.abs(crop - bg).max(axis=2) <= 10
            lab2, _ = ndi.label(near)
            edge = set(np.unique(np.concatenate([lab2[0], lab2[-1], lab2[:, 0], lab2[:, -1]]))) - {0}
            alpha = np.where(np.isin(lab2, list(edge)), 0, 255).astype(np.uint8)
            alpha = np.asarray(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.8)))
            rgba = np.dstack([crop.astype(np.uint8), alpha])
        ys_, xs_ = np.nonzero(alpha > 8)
        if len(xs_) == 0:
            continue
        tx0, ty0, tx1, ty1 = xs_.min(), ys_.min(), xs_.max() + 1, ys_.max() + 1
        fn = f'{stem}-{j}.webp'
        Image.fromarray(rgba[ty0:ty1, tx0:tx1], 'RGBA').save(os.path.join(OUT, fn), 'WEBP', quality=86, method=5)
        out_pieces.append({'src': fn, 'x': int(x0 + tx0), 'y': int(y0 + ty0), 'w': int(tx1 - tx0), 'h': int(ty1 - ty0)})
    manifest[name] = {'w': W, 'h': H, 'bg': [int(c) for c in bg], 'pieces': out_pieces}
    dbg = im.resize((W // k, H // k)); dr = ImageDraw.Draw(dbg)
    for p in out_pieces:
        dr.rectangle([p['x'] // k, p['y'] // k, (p['x'] + p['w']) // k, (p['y'] + p['h']) // k], outline=(255, 0, 80), width=3)
    dbg.save(os.path.join(DBG, f'dbg-{stem}.png'))
    print(name, '->', len(out_pieces), 'pieces')
json.dump(manifest, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=1)
