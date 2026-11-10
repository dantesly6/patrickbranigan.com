# Portfolio redesign: handoff

Everything needed to continue the patrickbranigan.com redesign in a fresh Claude session (any account). Start here, then open the prototype.

**The prototype:** `public/prototypes/signal-2.html`. Run `npm run dev` (Node 22, see below) and open http://localhost:4321/prototypes/signal-2.html. It is a single self-contained HTML file and is the source of truth. There is no separate source or build step anymore. Edit it directly.

Status as of 2026-11-09: the prototype direction is accepted and being refined by feel. The real Astro site (`src/`) has not been touched by the redesign yet. The repo being public is fine; the work just has to stay independent of Workweek (no Workweek Claude account, no Workweek repos).

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
- **Gooey/liquid is the house material,** but use it only where something is born from or returns to something else (the dock family). Keep it out of text and content. The one exception, at his request: headlines melt while they move and are crisp at rest.
- **Working style:** terse responses, iterate by feel in the browser, keep changes small and reversible. He judges motion himself, so say plainly when you could only verify a still frame.
- **Older site rules still apply:** no X/Twitter links anywhere; contact is click-to-copy, never `mailto:`; lightboxes never use native pinch-zoom (iOS Safari crashes), only a controlled zoom toggle; copy follows his editorial rubric (specific and observable over generic and puffed; don't invent facts).

## 3. What the prototype is

A single screen with five "worlds," each its own color, switched from a liquid dock at the bottom.

| Tab | Color | What it is |
|---|---|---|
| Now | lilac `#cdc7ef` | The page is his name. Fifteen soft letters to press, throw and spell with; some words do what they say (see below) |
| Thinking | navy `#18233d` | His writing as a field of thoughts with three arrangements: **Index** (default, plain list), Nebula (3D cloud), Threads (linked by shared words) |
| Built | clay `#b4512f` | Each project's real screen recordings and stills, in a frame that reshapes per medium (window, phone, bare board, or cut-apart pieces) |
| Playing | lime `#c9f06b` | **Arcade:** a self-playing game you can take over, full screen. **Library:** sortable bar chart of his collection plus "In rotation" |
| Newsletter | deep teal `#0f3b3a` | Pressing Pause signup; posts to the live Beehiiv function |

`?palette=mono` restores the older gray Now/Built colors for comparison. `?palette=bw` tries Patrick's question "should color be reserved for play?": Now, Thinking, Built and Newsletter go paper (one neutral; alternating paper and black read as arbitrary in review), Playing stays lime, Now's words still repaint the room, and the question overlay shows the page's original color as the reward. Undecided. `?type=sans` restores General Sans headlines and turns the melt off, to compare with Fraunces.

### Signature behaviors (keep these)
- **Page switch:** the new color blooms out from the pressed tab with a feathered edge while the old page sinks and blurs (View Transitions plus an animated mask, about 1.25s).
- **Kinetic type:** characters roll up out of their word; old text rolls away first.
- **Liquid dock:** the dock surface is an SVG goo filter.
  - The black tab highlight is two drops that stretch apart and fuse.
  - Thinking (3) and Playing (2) bud icon droplets out of the dock for their sub-views; hover shows the name, and on touch the dock "drips" the name instead.
  - Actions sit with their content (round 15; they used to bud off the dock and got lost): **Read** under Built's stepper, **Play** centered on the arcade preview. Thinking entries open by clicking them; Enter still opens whatever is in focus.
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

### Now: fifteen letters

Patrick asked for something "really experimental and boundary pushing" that has nothing to do with work and is about interacting with the page, using type and his name. It replaced the rotating statements.

- **Soft bodies.** Each letter is its real Fraunces outline (opsz 144, SOFT 100, light and heavy masters embedded as `GLYPHS`), held as rings of points on springs. Nothing depends on the web font loading. Weight is interpolated between the masters, so a letter can swell under the cursor or turn heavy.
- **The name at rest.** The p's descender runs into the b's ascender on desktop; `STEMFIX` lines the two stems up so it reads as one long stem. `KERN` holds the hand kerning (Fraunces' own kerning didn't survive extraction).
- **Hands.** Hover swells and dents. Drag stretches like taffy and shoves other letters aside. Throw and it bounces off the walls and the dock, lands on the word, then goes home.
- **Spelling.** Type (desktop) or tap letters. The word moves to the center and the rest shrink to a rack. Backspace removes, Enter commits, Esc resets. Letters that are not in the name fall through the page (`No z in Patrick Branigan.`); a second b gets `Only one b.`
- **Words that do what they say (24, the `FX` table).** Gags, over in a few seconds: rain, banana, brick, panic, train, paint, nap, big, ink, prank, trick, king, art, bargain, pink, nag, atari, bang, grain. `WORDS` is the 647 other words that count but only make the letters hop. Found words persist in `localStorage` (`pb-words`).
- **Games (round 15).** Paint was his favorite because it hands you something to do, so five words are small games with a goal and an end. Each takes input through `fx.tap`/`fx.key` and keeps a best in `localStorage` (`pb-best`). **tag:** the letters run from the pointer, catch all fifteen in 15s. **gnat:** a gnat darts and lands on letters, swat it in 15s. **brain:** letters light up in a sequence, play it back, one longer each round. **ping:** the word is a paddle, the rest of the name are bumpers, keep the ball up. **pinata:** p-i-n / a-t-a hangs on a rope, hit it until it breaks into candy. Patrick's idea was every word a game; my position is that gags stay gags (they're funny because they're short) and new words get the games. Test hook: `room.debug.game` reads a running game's state.
- **The list is locked.** The lower-left note (instructions, words found, which do something) only shows after the cheat code: ↑ ↑ ↓ ↓ ← → ← → B A. Keys on desktop; on phones, swipes on empty space then tap the b and an a. While it's half entered, ←/→ and horizontal swipes stop changing pages. Unlock persists (`pb-cheat`). The code turns up among the questions in the header, as on the current site.
- **Plays by itself.** Between words, one letter fidgets: it hops, leans, dents or swells. It's mostly the same letter for 40s at a time, picked from the shared clock, so the name has a troublemaker. After 8s idle the page spells a word from `ATTRACT`, also picked from the clock, so two visitors see the same one. Prank and nag never play in attract. Any input takes over.
- **Night.** 11pm-6am in New York the letters droop, the room goes dusk and z's rise. The first input wakes them: `It's 3:12am in New York. They were asleep.`
- **Reduced motion:** letters snap, no jelly or attract; words only change the color.
- Copy on Now (note, toasts, the museum label on `art`) is a first pass for him to tune.

### Ask (upper right)

Replaces "last shipped." The current site's easter egg, restyled: a question from `QA` rolls by in the header every 8s, shuffled per visit. Pressing it blooms an answer page in the current world's colors turned inside out, with the answer in big melting Fraunces. Another or → advances; Esc closes. Closing moves on to the next question. On phones the question sits under the name. The header clock was removed in round 15 (night mode says the time when it matters). The Konami code is back among the questions; it unlocks the list on Now.

### Keyboard
1–5 switch tabs, ←/→ cycle, Enter opens, Esc closes, A cycles Thinking arrangements, Space plays (Arcade). On Now, letters spell (or answer, in brain). ↑ ↑ ↓ ↓ ← → ← → B A unlocks the list. Shortcuts are ignored while typing in a field.

## 4. File map

```
public/prototypes/
  signal-2.html        THE prototype (≈210 KB, self-contained; writing entries and glyph outlines are embedded as JSON)
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
  tools/glyphs.py      extracts the Fraunces outlines for GLYPHS (args: Fraunces.ttf out.json; needs fonttools, uharfbuzz)
  tools/words.py       builds WORDS, the words spellable from the name (args: out.txt)
```

Inside `signal-2.html` (search for these names):
- **Data:** `WRITING`, `PROJECTS`, `CHAPTERS`, `SETS`, `LIBRARY`, `GAMES`, `QA`, `GLYPHS`, `WORDS`; also `TZ`/`CITY`.
- **Core:** `STREAMS` (the five tabs), `tune()` (page switch), `render()` (per-frame), `kinetic()`, `melt()`, `vt()` (view transitions: `dive`, `surface`, `lb`, `game`).
- **Dock:** `moveBlob()`, `dockFrame()` (per-frame geometry for the liquid), `toast()`.
- **Now:** the `room` module (`shape()` outlines, `body()`/`jelly()` physics, `FX` words, `step()`, `frame()`). **Ask:** the `ask` module.
- **Thinking:** the `field` module (layouts, camera, projection).
- **Built:** `fitFrame()`, `showChapter()`, `figHTML()` (detail page), `lbOpen()` (lightbox).
- **Playing:** the `game` module, `setPlayMode()`, `buildBars()`.
- **Newsletter:** the `pform` submit handler.

## 5. Data: what's real vs. placeholder

- **Writing:** real, embedded from `src/content/writing` (published entries only; `_`-prefixed drafts excluded). **Re-export when entries are added:** the array is pasted in, so it is not live.
- **Time:** `TZ = 'America/New_York'`, `CITY = 'New York'` (confirmed by Patrick, 2026-11-06). No visible clock since round 15; it drives night mode and the wake toast.
- **Questions:** `QA` is copied from `src/layouts/Layout.astro`. Keep the two in sync until the port.
- **Projects:** copy from the current site; media from `public/images/projects/`. **Workweek is parked:** Patrick is rethinking it around tangible product features, so it's out of `PROJECTS` and `CHAPTERS`. Its media and cut-outs stay on disk, and the old entries are in commit 0657b26.
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
  - Headless screenshots catch single frames only; they can't judge motion. View Transition pseudo-layers don't show in them. On Now, moving the browser window also moves the letters, which can't be tested headless.
  - Test hooks: `room.spell('rain')` in the console runs a word; `room.debug` reads letter state; `?hour=3` starts the page asleep.
  - The Playwright MCP browser ran at about 2fps here and was unusable for this page.
- **Deploy safety:**
  - `public/prototypes/` deploys publicly if merged to `main` (Cloudflare Pages auto-deploys `main`).
  - Branch pushes get Cloudflare preview URLs.
  - Keep the prototype on the `redesign/signal` branch until it is meant to be seen.

## 7. Open threads and next steps

1. **Port to Astro.** The prototype becomes the real site: streams become components, the data comes from content collections (writing is already one), and the Now signals read real sources. This is the big next step; agree the plan with Patrick first.
2. **Typography.** Trying Fraunces headlines (SOFT 100) with melt during transitions, crisp at rest; `?type=sans` compares. He hasn't decided. He also liked Dia's headline face: **Exposure** by 205TF (paid; trial available; its exposure setting can be animated). `type-goo.html` holds the other free candidates.
3. **Workweek in Built:** bring it back around tangible product features when he's ready.
4. **Built:**
   - Proposed but not built: rebuild one signature interaction per project as live code (Ribbon's offer dial, Chaotic's comment pins, the Moonfallen HUD). Figma source files, if they exist, would make this faster.
   - Also not built: cell-division transitions between chapters and a liquid "bead strand" for chapter progress.
5. **Now copy and words:** tune the note, the toasts and which words do something by feel. More game candidates spellable from the name: catnip (letters chase the pointer), racing, trap, crab, tank, captain, airbag, baking, print, grin.
7. **Color:** decide between the colored pages and `?palette=bw`.
6. **Production video:** compress the originals (the Chaotic reel is 22 MB); the light copies are in `media/`.

## 8. Decision log (condensed)

1. **v1 `signal.html`:** dark UI, flow field, four streams. Rejected: the look, the abstract background, and the "station" framing. The dock and stream behavior were kept.
2. **v2:** each stream gets its own color world, plus kinetic type, the bloom page switch, and dive transitions.
3. **Thinking:** line-by-line reader rejected as presentation-like, replaced by the field. Index was later moved first and made the default.
4. **Dock:** the progress bars on the tabs were removed. Labels were centered. The gooey dock was liked, so the liquid was extended to the tab highlight, the droplets, Open and toasts. Submenus became icon droplets (an earlier pill tray read as flush/off-center).
5. **Built:** the static card deck was called boring. It became recordings plus reshaping frames; baked-in phone mockups were replaced with a drawn phone; boards were cut apart; scrubbing was added and then removed at his request.
6. **Colors:** apricot rejected for Now, so lilac is the default; clay for Built; lime kept ("surprising green"). The C-to-cycle Now colors were removed in round 14 because letters now spell.
7. **Playing library:**
   - Notched spines: rejected.
   - Liquid bubbles: rejected.
   - Bars: current version. He asked for something like the original bar graph but more striking and interactive.
8. **Newsletter:**
   - A droplet under Playing: rejected.
   - A persistent dock droplet: superseded.
   - Fifth nav tab: his call, current version.
9. **Round 14 (2026-11-06):**
   - **Now:** rotating statements called uninteresting; replaced with the fifteen letters. `?returning`, `LAST_SHIPPED`, `buildNow()` and the "Building the Builder Stack" statement went with them.
   - **Thinking:** Timeline removed ("the index option alludes to a timeline anyway").
   - **Built:** Workweek moved out for now.
   - **Header:** "last shipped" replaced with the question-and-answer easter egg.
   - **Type:** Fraunces and melt-in-motion added to try.
10. **Round 15 (2026-11-09):**
   - **Now:** paint called the best interaction; five game words added (tag, gnat, brain, ping, pinata). The list at lower left now unlocks with the Konami code instead of showing at once.
   - **Header:** clock removed ("what does it add?").
   - **Actions:** the dock's Open button removed; Read moved under Built's stepper, Play onto the game preview.
   - **Color:** `?palette=bw` added to compare; default unchanged.
