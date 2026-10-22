# Portfolio redesign: handoff

Everything needed to continue the patrickbranigan.com redesign in a fresh Claude session (any account). Start here, then open the prototype.

**The prototype:** `public/prototypes/signal-2.html`. Run `npm run dev` (Node 22, see below) and open http://localhost:4321/prototypes/signal-2.html. It is a single self-contained HTML file and is the source of truth. There is no separate source or build step anymore. Edit it directly.

Status as of 2026-10-22: the prototype direction is accepted and being refined by feel. The real Astro site (`src/`) has not been touched by the redesign yet.

---

## 1. Why this exists

Patrick (Head of Design at Workweek; designs and codes his own site) felt the current site reads as "a portfolio site of the past." In his words, it doesn't reflect "the forward thinking, creative, curious mind I have. The playful spirit that I have. And the fact that I'm not just making visual UI as my job anymore. I'm design engineering more, and writing more, and analyzing more."

He wants a home for small web games, pieces of work, written and spoken thought, and presence, with liveliness. Early references he liked: dannpetty.com (a bento of recent life), justinmezzell.com, rog.ie, zhenyary.com. The Dia browser's motion and type also came up (see section 7).

## 2. Hard rules learned along the way

These came from his reactions. Treat them as constraints.

- **Liveliness must not depend on visitors.** The test: a lone visitor at 3am, a month after his last post, still feels the site is alive. Liveliness comes from the system (a shared clock, time of day, procedural motion) and from his own signals (writing, games, what he's building). Social features are a bonus layer at most.
- **Not "Claude-ish."** No dark glass panels, no monospace uppercase labels, no coral accents. He rejected the first prototype (`signal.html`) partly for this.
- **Not antiquated.** He rejected a TV "station/channel" framing as dated.
- **No abstract generative backgrounds** (a flow field became "a weird amalgamation of lines").
- **More magical motion without risking clarity.** Animation should make things feel alive, but text at rest must be plainly readable. Every experimental view has a plain alternative (for example, Index on Thinking).
- **No presentation formats.** He rejected line-by-line reading on Thinking ("presentation-like") and slideshow-like cards on Built.
- **Gooey/liquid is the house material,** but use it only where something is born from or returns to something else (the dock family). Keep it out of text and content.
- **Working style:** terse responses, iterate by feel in the browser, keep changes small and reversible. He judges motion himself, so say plainly when you could only verify a still frame.
- **Older site rules still apply:** no X/Twitter links anywhere; contact is click-to-copy, never `mailto:`; lightboxes never use native pinch-zoom (iOS Safari crashes), only a controlled zoom toggle; copy follows his editorial rubric (specific and observable over generic and puffed; don't invent facts).

## 3. What the prototype is

A single screen with five "worlds," each its own color, switched from a liquid dock at the bottom.

| Tab | Color | What it is |
|---|---|---|
| Now | lilac `#cdc7ef` (press **C** on Now to cycle candidates: sky, butter, rose, apricot, paper; the choice is remembered) | Big two-line statements that rotate every 7s on a shared clock (see section 5) |
| Thinking | navy `#18233d` | His writing as a field of thoughts with four arrangements: **Index** (default, plain list), Nebula (3D cloud), Threads (linked by shared words), Timeline (a road into the past) |
| Built | clay `#b4512f` | Each project's real screen recordings and stills, in a frame that reshapes per medium (window, phone, bare board, or cut-apart pieces) |
| Playing | lime `#c9f06b` | **Arcade:** a self-playing game you can take over, full screen. **Library:** sortable bar chart of his collection plus "In rotation" |
| Newsletter | deep teal `#0f3b3a` | Pressing Pause signup; posts to the live Beehiiv function |

`?palette=mono` restores the older gray Now/Built colors for comparison.

### Signature behaviors (keep these)
- **Page switch:** the new color blooms out from the pressed tab with a feathered edge while the old page sinks and blurs (View Transitions plus an animated mask, about 1.25s).
- **Kinetic type:** characters roll up out of their word; old text rolls away first.
- **Liquid dock:** the dock surface is an SVG goo filter.
  - The black tab highlight is two drops that stretch apart and fuse.
  - Thinking (4) and Playing (2) bud icon droplets out of the dock for their sub-views; hover shows the name, and on touch the dock "drips" the name instead.
  - **Open/Read/Play** is a droplet that detaches beside the dock (above it on phones) only when the thing in focus can be opened, and is absorbed otherwise.
  - Messages (toasts) drip out of the dock's top edge.
- **Dive:** opening anything zooms into it and dissolves (the title or image morphs into the detail page); closing surfaces back out.
- **Thinking field:** idle, the camera turns to face one thought every 9s; drag to rotate, hover to trace threads (labeled with the shared word), click to dive in.
- **Built:**
  - Recordings play (no scrubbing; he asked for that to be removed).
  - Tall boards scroll top to bottom.
  - Boards that were several separate things are cut apart into floating pieces.
  - Phone screens sit in a drawn phone frame.
  - Project detail pages get the same treatments, plus a lightbox that zooms to full resolution on desktop.
- **Library:**
  - One bar per console: the outline is games owned, the dark fill is finished, with % inside.
  - Bars grow in.
  - Hovering spotlights a console.
  - Sort by Release, Most owned or Most finished; the bars slide into the new order.
  - Ratings in "In rotation" are small liquid-filled circles.

### Keyboard
1–5 switch tabs, ←/→ cycle, Enter opens, Esc closes, A cycles Thinking arrangements, C cycles Now colors, Space plays (Arcade). Shortcuts are ignored while typing in a field.

## 4. File map

```
public/prototypes/
  signal-2.html        THE prototype (≈130 KB, self-contained; writing entries are embedded as JSON)
  signal.html          v1, rejected (kept for reference only)
  type-goo.html        specimen of free "gooey" fonts + a liquid text filter (pending decision, see section 7)
  media/               light 720p copies of project videos; the Ribbon ones are cropped to the phone screen
  cutouts/             boards cut apart into pieces + manifest.json (made by redesign/tools/cutout.py)
  _backup/             dated snapshots before each round (gitignored)
redesign/
  HANDOFF.md           this file
  tools/cutout.py      splits boards into transparent pieces
  tools/media.sh       ffmpeg commands that made media/
  tools/shoot.cjs      headless screenshot + error check (see section 6)
```

Inside `signal-2.html` (search for these names):
- **Data:** `WRITING`, `PROJECTS`, `CHAPTERS`, `SETS`, `LIBRARY`, `GAMES`; also `TZ`/`CITY` and `LAST_SHIPPED`.
- **Core:** `STREAMS` (the five tabs), `tune()` (page switch), `render()` (per-frame), `kinetic()`, `vt()` (view transitions: `dive`, `surface`, `lb`, `game`).
- **Dock:** `moveBlob()`, `dockFrame()` (per-frame geometry for the liquid), `toast()`.
- **Thinking:** the `field` module (layouts, camera, projection).
- **Built:** `fitFrame()`, `showChapter()`, `figHTML()` (detail page), `lbOpen()` (lightbox).
- **Playing:** the `game` module, `setPlayMode()`, `buildBars()`.
- **Newsletter:** the `pform` submit handler.

## 5. Data: what's real vs. placeholder

- **Writing:** real, embedded from `src/content/writing` (published entries only; `_`-prefixed drafts excluded). **Re-export when entries are added:** the array is pasted in, so it is not live.
- **Now statements** (from `buildNow()`):
  - Welcome back (returning visitors only, with new pieces since their last visit)
  - "It's {time} in {city}," plus a guess by hour (asleep, coffee first, at Workweek, making things)
  - "Last wrote {latest}" (automatic from writing)
  - "Building the Builder Stack" (hardcoded)
  - "Playing {first game}" (hardcoded)
  - "{n} thoughts logged since May" (counted)
- **Assumptions to confirm with Patrick:**
  - `TZ = 'America/New_York'`, `CITY = 'New York'` (never confirmed)
  - `LAST_SHIPPED` is hardcoded (should come from git or deploys)
- **Projects:** copy from the current site; media from `public/images/projects/`.
- **Library:** per-console counts copied from `src/pages/index.astro` (no titles exist). If he exports his collection with titles, the library can get per-game detail.
- **Games in rotation:** copied from `index.astro`.
- **Newsletter:** posts to `/api/subscribe` (Cloudflare Pages Function → Beehiiv). That function does not run under `astro dev`, so the form shows "Couldn't subscribe" locally. Deployed, it creates real subscribers.

## 6. Working on it

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run dev   # http://localhost:4321/prototypes/signal-2.html
```

- **Before each round of edits,** copy `signal-2.html` into `public/prototypes/_backup/` with a date or round suffix, so any round can be reverted.
- **Verifying:**
  - `node redesign/tools/shoot.cjs` takes desktop and phone screenshots of every tab and reports page errors (see the file header for setup).
  - Headless screenshots catch single frames only; they can't judge motion. View Transition pseudo-layers don't show in them.
  - The Playwright MCP browser ran at about 2fps here and was unusable for this page.
- **Deploy safety:**
  - `public/prototypes/` deploys publicly if merged to `main` (Cloudflare Pages auto-deploys `main`).
  - Branch pushes get Cloudflare preview URLs.
  - Keep the prototype on the `redesign/signal` branch until it is meant to be seen.

## 7. Open threads and next steps

1. **Port to Astro.** The prototype becomes the real site: streams become components, the data comes from content collections (writing is already one), and the Now signals read real sources. This is the big next step; agree the plan with Patrick first.
2. **Typography.** He liked Dia's headline face: **Exposure** by 205TF (paid; trial available; its exposure setting can be animated). Free candidates in `type-goo.html`: **Fraunces** (soft setting, closest in spirit) and a liquid text filter on General Sans for motion only (melts during transitions, crisp at rest). The suggestion was Fraunces headlines plus melt-only transitions. Not yet tried in the prototype.
3. **Live Now signals:** deploys or commits for "last shipped," what he's building, playing and listening to.
4. **Built:**
   - Proposed but not built: rebuild one signature interaction per project as live code (Ribbon's offer dial, Chaotic's comment pins, the Workweek request flow, the Moonfallen HUD). Figma source files, if they exist, would make this faster.
   - Also not built: cell-division transitions between chapters and a liquid "bead strand" for chapter progress.
5. **Optional:** a Now statement that points to the Newsletter tab.
6. **Production video:** compress the originals (the Chaotic reel is 22 MB); the light copies are in `media/`.

## 8. Decision log (condensed)

1. **v1 `signal.html`:** dark UI, flow field, four streams. Rejected: the look, the abstract background, and the "station" framing. The dock and stream behavior were kept.
2. **v2:** each stream gets its own color world, plus kinetic type, the bloom page switch, and dive transitions.
3. **Thinking:** line-by-line reader rejected as presentation-like, replaced by the field. Index was later moved first and made the default.
4. **Dock:** the progress bars on the tabs were removed. Labels were centered. The gooey dock was liked, so the liquid was extended to the tab highlight, the droplets, Open and toasts. Submenus became icon droplets (an earlier pill tray read as flush/off-center).
5. **Built:** the static card deck was called boring. It became recordings plus reshaping frames; baked-in phone mockups were replaced with a drawn phone; boards were cut apart; scrubbing was added and then removed at his request.
6. **Colors:** apricot rejected for Now, so lilac is the default with C-to-cycle; clay for Built; lime kept ("surprising green").
7. **Playing library:**
   - Notched spines: rejected.
   - Liquid bubbles: rejected.
   - Bars: current version. He asked for something like the original bar graph but more striking and interactive.
8. **Newsletter:**
   - A droplet under Playing: rejected.
   - A persistent dock droplet: superseded.
   - Fifth nav tab: his call, current version.
