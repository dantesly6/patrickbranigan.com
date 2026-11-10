import json, sys, itertools, string
from collections import Counter
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.recordingPen import DecomposingRecordingPen
import uharfbuzz as hb
SRC, OUT = sys.argv[1], sys.argv[2]
NAME = 'patrickbranigan'
NAME_SET = sorted(set(NAME))
AXES = dict(opsz=144, SOFT=100, WONK=0)
def inst(w):
    f = TTFont(SRC)
    return instancer.instantiateVariableFont(f, {**AXES, 'wght': w}, overlap=instancer.OverlapMode.KEEP_AND_DONT_SET_FLAGS)
def contours(f, ch):
    upm = f['head'].unitsPerEm; k = 1000 / upm
    gs = f.getGlyphSet(); pen = DecomposingRecordingPen(gs)
    gs[f.getBestCmap()[ord(ch)]].draw(pen)
    out, cur, last = [], None, None
    P = lambda p: (round(p[0] * k), round(-p[1] * k))
    for op, a in pen.value:
        if op == 'moveTo':
            last = P(a[0]); cur = [*last]
        elif op == 'lineTo':
            p = P(a[0]); cur += [(last[0] + p[0]) // 2, (last[1] + p[1]) // 2, *p]; last = p
        elif op == 'qCurveTo':
            pts = [P(x) for x in a[:-1]]; end = P(a[-1])
            for i, c in enumerate(pts):
                on = end if i == len(pts) - 1 else ((c[0] + pts[i + 1][0]) // 2, (c[1] + pts[i + 1][1]) // 2)
                cur += [*c, *on]; last = on
        elif op in ('closePath', 'endPath'):
            if last != (cur[0], cur[1]):
                cur += [(last[0] + cur[0]) // 2, (last[1] + cur[1]) // 2, cur[0], cur[1]]
            out.append(cur); cur = None
        else:
            raise SystemExit('unexpected pen op ' + op)
    return out
adv = lambda f, ch: round(f['hmtx'][f.getBestCmap()[ord(ch)]][0] * 1000 / f['head'].unitsPerEm)
L, H = inst(300), inst(900)
data = {}
for ch in string.ascii_lowercase:
    c = contours(L, ch)
    if ch in NAME_SET:
        h = contours(H, ch)
        assert [len(x) for x in c] == [len(x) for x in h], ch
        data[ch] = dict(a=adv(L, ch), b=adv(H, ch), c=c, h=h)
    else:
        data[ch] = dict(a=adv(L, ch), c=c)
xh = L['OS/2'].sxHeight * 1000 / L['head'].unitsPerEm
# pair kerning at the resting weight, shaped by harfbuzz
blob = hb.Blob.from_file_path(SRC); face = hb.Face(blob); font = hb.Font(face)
font.set_variations({**AXES, 'wght': 480}); s = 1000 / face.upem
def w(t):
    b = hb.Buffer(); b.add_str(t); b.guess_segment_properties(); hb.shape(font, b, {'kern': True})
    return sum(p.x_advance for p in b.glyph_positions) * s
kern = {a + b: round(w(a + b) - w(a) - w(b)) for a, b in itertools.product(NAME_SET, NAME_SET)}
kern = {k: v for k, v in kern.items() if v}
json.dump(dict(xh=round(xh), g=data, k=kern), open(OUT, 'w'), separators=(',', ':'))
b = max(c for g in data['b']['c'] for c in g[1::2]); t = min(c for g in data['b']['c'] for c in g[1::2])
print('xh', round(xh), 'b top', t, 'kern pairs', len(kern))
print('bytes', len(open(OUT).read()), 'segments p:', sum((len(x)-2)//4 for x in data['p']['c']), 'g:', sum((len(x)-2)//4 for x in data['g']['c']))
print({k: data[k]['a'] for k in NAME_SET}, 'heavy', {k: data[k]['b'] for k in NAME_SET})
